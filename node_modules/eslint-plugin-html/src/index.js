"use strict"

const path = require("path")
const extract = require("./extract")
const utils = require("./utils")
const splatSet = utils.splatSet
const getSettings = require("./settings").getSettings

const BOM = "\uFEFF"
const GET_SCOPE_RULE_NAME = "__eslint-plugin-html-get-scope"
const DECLARE_VARIABLES_RULE_NAME = "__eslint-plugin-html-declare-variables"
const LINTER_ISPATCHED_PROPERTY_NAME =
  "__eslint-plugin-html-verify-function-is-patched"

// Disclaimer:
//
// This is not a long term viable solution. ESLint needs to improve its processor API to
// provide access to the configuration before actually preprocess files, but it's not
// planed yet. This solution is quite ugly but shouldn't alter eslint process.
//
// Related github issues:
// https://github.com/eslint/eslint/issues/3422
// https://github.com/eslint/eslint/issues/4153

const needle = path.join("lib", "linter.js")

iterateESLintModules(patch)

function getModuleFromRequire() {
  return require("eslint/lib/linter")
}

function getModuleFromCache(key) {
  if (!key.endsWith(needle)) return

  const module = require.cache[key]
  if (!module || !module.exports) return

  const Linter = module.exports
  if (
    typeof Linter === "function" &&
    typeof Linter.prototype.verify === "function"
  ) {
    return Linter
  }
}

function iterateESLintModules(fn) {
  if (!require.cache || Object.keys(require.cache).length === 0) {
    // Jest is replacing the node "require" function, and "require.cache" isn't available here.
    fn(getModuleFromRequire())
    return
  }

  let found = false

  for (const key in require.cache) {
    const Linter = getModuleFromCache(key)
    if (Linter) {
      fn(Linter)
      found = true
    }
  }

  if (!found) {
    let eslintPath, eslintVersion
    try {
      eslintPath = require.resolve("eslint")
    } catch (e) {
      eslintPath = "(not found)"
    }
    try {
      eslintVersion = require("eslint/package.json").version
    } catch (e) {
      eslintVersion = "n/a"
    }

    const parentPaths = module =>
      module ? [module.filename].concat(parentPaths(module.parent)) : []

    throw new Error(
      `eslint-plugin-html error: It seems that eslint is not loaded.
If you think this is a bug, please file a report at https://github.com/BenoitZugmeyer/eslint-plugin-html/issues

In the report, please include *all* those informations:

* ESLint version: ${eslintVersion}
* ESLint path: ${eslintPath}
* Plugin version: ${require("../package.json").version}
* Plugin inclusion paths: ${parentPaths(module).join(", ")}
* NodeJS version: ${process.version}
* CLI arguments: ${JSON.stringify(process.argv)}
* Content of your lock file (package-lock.json or yarn.lock) or the output of \`npm list\`
* How did you run ESLint (via the command line? an editor plugin?)
* The following stack trace:
    ${new Error().stack.slice(10)}


      `
    )
  }
}

function patch(Linter) {
  const verify = Linter.prototype.verify

  // ignore if verify function is already been patched sometime before
  if (Linter[LINTER_ISPATCHED_PROPERTY_NAME] === true) {
    return
  }
  Linter[LINTER_ISPATCHED_PROPERTY_NAME] = true
  Linter.prototype.verify = function(
    textOrSourceCode,
    config,
    filenameOrOptions,
    saveState
  ) {
    const localVerify = code =>
      verify.call(this, code, config, filenameOrOptions, saveState)

    let messages
    const filename =
      typeof filenameOrOptions === "object"
        ? filenameOrOptions.filename
        : filenameOrOptions
    const extension = path.extname(filename || "")

    const pluginSettings = getSettings(config.settings || {})
    const isHTML = pluginSettings.htmlExtensions.indexOf(extension) >= 0
    const isXML =
      !isHTML && pluginSettings.xmlExtensions.indexOf(extension) >= 0

    if (typeof textOrSourceCode === "string" && (isHTML || isXML)) {
      messages = []

      const pushMessages = (localMessages, code) => {
        messages.push.apply(
          messages,
          remapMessages(localMessages, textOrSourceCode.startsWith(BOM), code)
        )
      }

      const currentInfos = extract(
        textOrSourceCode,
        pluginSettings.indent,
        isXML,
        pluginSettings.isJavaScriptMIMEType
      )

      if (pluginSettings.reportBadIndent) {
        currentInfos.badIndentationLines.forEach(line => {
          messages.push({
            message: "Bad line indentation.",
            line,
            column: 1,
            ruleId: "(html plugin)",
            severity: pluginSettings.reportBadIndent,
          })
        })
      }

      if (
        config.parserOptions &&
        config.parserOptions.sourceType === "module"
      ) {
        for (const code of currentInfos.code) {
          pushMessages(localVerify(String(code)), code)
        }
      } else {
        verifyWithSharedScopes.call(
          this,
          localVerify,
          config,
          currentInfos,
          pushMessages
        )
      }

      messages.sort((ma, mb) => {
        return ma.line - mb.line || ma.column - mb.column
      })
    } else {
      messages = localVerify(textOrSourceCode)
    }

    return messages
  }
}

function verifyWithSharedScopes(
  localVerify,
  config,
  currentInfos,
  pushMessages
) {
  // First pass: collect needed globals and declared globals for each script tags.
  const firstPassValues = []
  const originalRules = config.rules
  config.rules = { [GET_SCOPE_RULE_NAME]: "error" }

  for (const code of currentInfos.code) {
    this.rules.define(GET_SCOPE_RULE_NAME, context => {
      return {
        Program() {
          firstPassValues.push({
            code,
            sourceCode: context.getSourceCode(),
            exportedGlobals: context
              .getScope()
              .through.map(node => node.identifier.name),
            declaredGlobals: context
              .getScope()
              .variables.map(variable => variable.name),
          })
        },
      }
    })

    pushMessages(localVerify(String(code)), code)
  }

  config.rules = Object.assign(
    { [DECLARE_VARIABLES_RULE_NAME]: "error" },
    originalRules
  )

  // Second pass: declare variables for each script scope, then run eslint.
  for (let i = 0; i < firstPassValues.length; i += 1) {
    this.rules.define(DECLARE_VARIABLES_RULE_NAME, context => {
      return {
        Program() {
          const exportedGlobals = splatSet(
            firstPassValues
              .slice(i + 1)
              .map(nextValues => nextValues.exportedGlobals)
          )
          for (const name of exportedGlobals) context.markVariableAsUsed(name)

          const declaredGlobals = splatSet(
            firstPassValues
              .slice(0, i)
              .map(previousValues => previousValues.declaredGlobals)
          )
          const scope = context.getScope()
          scope.through = scope.through.filter(variable => {
            return !declaredGlobals.has(variable.identifier.name)
          })
        },
      }
    })

    const values = firstPassValues[i]
    pushMessages(localVerify(values.sourceCode), values.code)
  }

  config.rules = originalRules
}

function remapMessages(messages, hasBOM, code) {
  const newMessages = []
  const bomOffset = hasBOM ? -1 : 0

  for (const message of messages) {
    const location = code.originalLocation({
      line: message.line,
      // eslint-plugin-eslint-comments is raising message with column=0 to bypass ESLint ignore
      // comments. Since messages are already ignored at this time, just reset the column to a valid
      // number. See https://github.com/BenoitZugmeyer/eslint-plugin-html/issues/70
      column: message.column || 1,
    })

    // Ignore messages if they were in transformed code
    if (location) {
      Object.assign(message, location)
      message.source = code.getOriginalLine(location.line)

      // Map fix range
      if (message.fix && message.fix.range) {
        message.fix.range = [
          code.originalIndex(message.fix.range[0]) + bomOffset,
          // The range end is exclusive, meaning it should replace all characters  with indexes from
          // start to end - 1. We have to get the original index of the last targeted character.
          code.originalIndex(message.fix.range[1] - 1) + 1 + bomOffset,
        ]
      }

      // Map end location
      if (message.endLine && message.endColumn) {
        const endLocation = code.originalLocation({
          line: message.endLine,
          column: message.endColumn,
        })
        if (endLocation) {
          message.endLine = endLocation.line
          message.endColumn = endLocation.column
        }
      }

      newMessages.push(message)
    }
  }

  return newMessages
}
