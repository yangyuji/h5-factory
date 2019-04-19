var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd hh:mm:ss'

function padding(s, len) {
  var len = len - (s + '').length
  for (var i = 0; i < len; i++) {
    s = '0' + s
  }
  return s
}

function getScroll(scrollProp, offsetProp) {
  if (typeof window[offsetProp] !== 'undefined') {
    return window[offsetProp]
  }
  if (document.documentElement.clientHeight) {
    return document.documentElement[scrollProp]
  }
  return document.body[scrollProp]
}

export default {
  createDomID: function (len) {
    return Number(Math.random().toString().substr(3, len)).toString(36)
  },
  getOffset: function (el) {
    var rect = el.getBoundingClientRect()
    return {
      left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
      top: rect.top + getScroll('scrollTop', 'pageYOffset'),
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }
  },
  copyObj: function (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  getRepeatStyle: function (id) {
    switch (id) {
      case 1:
        return 'no-repeat'
      case 2:
        return 'repeat-x'
      case 3:
        return 'repeat-y'
      case 4:
        return 'repeat'
      default:
        return 'no-repeat'
    }
  },
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'h':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int)
              break;
            case 'M':
              _date.setMonth(_int - 1)
              break;
            case 'd':
              _date.setDate(_int)
              break;
            case 'h':
              _date.setHours(_int)
              break;
            case 'm':
              _date.setMinutes(_int)
              break;
            case 's':
              _date.setSeconds(_int)
              break;
          }
        }
        return _date
      }
      return null
    }
  }
}
