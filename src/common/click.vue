<template>
  <el-dialog id="click"
             title="点击配置"
             :close-on-click-modal="false"
             :append-to-body="false"
             :visible.sync="dialogShow"
             @close="$emit('update:show', false)"
             width="680px">

    <el-tabs v-model="currentTab" type="card" @tab-click="clickTab">

      <el-tab-pane v-if="showTabs.indexOf('outside') > -1" label="链接地址" name="outside">
        <el-form label-width="100px" style="margin-top:20px;">
          <el-form-item label="链接地址：">
            <el-input placeholder="请输入链接地址，例：https://www.example.com/" v-model="outsideVal"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="showTabs.indexOf('code') > -1" label="自定义脚本" name="jsCode">
        <el-form label-width="100px" style="margin-top:20px;">
          <el-form-item label="自定义脚本：">
            <el-input type="textarea" placeholder="javascript代码，例：location.href='https://www.baidu.com'" v-model="codeVal"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="showTabs.indexOf('page') > -1" label="页内位置" name="page">

        <el-tabs tab-position="left">
          <el-tab-pane label="全部">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button v-if="comp.type !== 'placeholder'"
                           size="mini" round
                           :class="[currentTab === 'page' && pageVal === comp.domId ?
                             'el-button--primary' : '']"
                           @click="setPageAction(comp.domId)">
                  {{comp.domName || comp.domId}}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图片">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button v-if="comp.type == 'base-img'"
                           size="mini" round
                           :class="[currentTab == 'page' && pageVal === comp.domId ?
                             'el-button--primary' : '']"
                           @click="setPageAction(comp.domId)">
                  {{comp.domName || comp.domId}}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文本">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button v-if="comp.type == 'base-text'"
                           size="mini" round
                           :class="[currentTab == 'page' && pageVal === comp.domId ?
                             'el-button--primary' : '']"
                           @click="setPageAction(comp.domId)">
                  {{comp.domName || comp.domId}}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="表单">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button v-if="comp.type == 'base-form'"
                           size="mini" round
                           :class="[currentTab == 'page' && pageVal == comp.domId ?
                             'el-button--primary' : '']"
                           @click="setPageAction(comp.domId)">
                  {{comp.domName || comp.domId}}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>

      <el-tab-pane v-if="showTabs.indexOf('tel') > -1" label="拨打电话" name="tel">
        <el-form label-width="100px">
          <el-form-item label="电话号码：">
            <el-input placeholder="请输入电话号码" v-model="telVal" :maxlength="11"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      option: {
        type: Object
      },
      tabs: {
        type: Array
      },
      index: {
        type: Number
      },
      comps: {
        type: Array
      }
    },
    data() {
      return {
        dialogShow: this.show,
        config: this.option,
        showTabs: this.tabs,
        currentTab: this.getCurrentTab(),
        returnVal: this.getOldVal(),
        outsideVal: this.getVal('outside'),
        pageVal: this.getVal('page'),
        telVal: this.getVal('tel'),
        codeVal: ''
      }
    },
    watch: {
      option() {
        this.config = this.option
      },
      tabs() {
        this.showTabs = this.tabs
      },
      show() {
        this.dialogShow = this.show
        if (this.dialogShow) {
          this.currentTab = this.getCurrentTab()
          this.outsideVal = this.getVal('outside')
          this.pageVal = this.getVal('page')
          this.telVal = this.getVal('tel')
          this.returnVal = null
        }
      }
    },
    methods: {
      getVal(type) {
        if (this.config && this.config.action && this.config.action.config.length && this.config.action.config[this.index].click) {
          if (this.config.action.config[this.index].click.type === type) {
            return this.config.action.config[this.index].click.href
          }
        }
        return ''
      },
      getOldVal() {
        return this.config && this.config.action.config && this.config.action.config.length ? this.config.action.config[this.index].click : null
      },
      getCurrentTab() {
        if (this.showTabs && this.showTabs.length === 1) {
          return this.showTabs[0]
        }
        return this.config && this.config.action.config && this.config.action.config.length && this.config.action.config[this.index].click ? this.config.action.config[this.index].click.type : 'outside'
      },
      setPageAction(id) {
        this.pageVal = id
        this.returnVal = {
          type: 'page',
          href: id
        }
      },
      clickTab(tab) {
        this.currentTab = tab.name
      },
      sure() {
        this.dialogShow = false
        if (this.currentTab === 'outside' && this.outsideVal) {
          this.returnVal = {
            type: 'outside',
            href: this.outsideVal
          }
        }
        if (this.currentTab === 'tel' && this.telVal) {
          this.returnVal = {
            type: 'tel',
            href: this.telVal
          }
        }
        this.$bus.$emit('click:submit', this.index, this.returnVal)
      }
    }
  }
</script>

<style lang="scss">
  #click {

    .el-dialog__body {
      padding-top: 10px;

      .choose-panel {
        line-height: 2.8;
      }
    }
  }
</style>
