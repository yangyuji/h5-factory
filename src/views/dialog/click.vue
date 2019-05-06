<template>
  <el-dialog id="click"
             title="点击配置"
             :close-on-click-modal="false"
             :append-to-body="false"
             :visible="show"
             @close="cancel"
             width="680px">

      <el-tabs v-model="currentTab" type="card" @tab-click="clickTab">

        <el-tab-pane label="链接地址" name="outside">
          <el-form label-width="100px" style="margin-top:20px;">
            <el-form-item label="链接地址：">
              <el-input placeholder="请输入链接地址，例：https://www.example.com/" v-model="link"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="页内位置" name="page">

          <el-tabs tab-position="left">
            <el-tab-pane label="全部">
              <div class="choose-panel smaller">
                <template v-for="comp in comps">
                  <el-button v-if="comp.type!=='placeholder'"
                             size="mini" round
                             :class="[currentTab == 'page' && link == comp.domId ?
                             'el-button--primary' : '']"
                             @click="setPageAction(comp.domId)">
                    {{comp.domName || comp.domId}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="图片">
              <div class="choose-panel smaller">
                <template v-for="comp in comps">
                  <el-button v-if="comp.type == 'img'"
                             size="mini" round
                             :class="[currentTab == 'page' && link == comp.domId ?
                             'el-button--primary' : '']"
                             @click="setPageAction(comp.domId)">
                    {{comp.domName || comp.domId}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文本">
              <div class="choose-panel smaller">
                <template v-for="comp in comps">
                  <el-button v-if="comp.type == 'text'"
                             size="mini" round
                             :class="[currentTab == 'page' && link == comp.domId ?
                             'el-button--primary' : '']"
                             @click="setPageAction(comp.domId)">
                    {{comp.domName || comp.domId}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="表单">
              <div class="choose-panel smaller">
                <template v-for="comp in comps">
                  <el-button v-if="comp.type == 'img-hot-area'"
                             size="mini" round
                             :class="[currentTab == 'page' && link == comp.domId ?
                             'el-button--primary' : '']"
                             @click="setPageAction(comp.domId)">
                    {{comp.domName || comp.domId}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>

        <el-tab-pane label="拨打电话" name="tel">
          <el-form label-width="100px">
            <el-form-item label="电话号码：">
              <el-input placeholder="请输入电话号码" v-model="link" :maxlength="11"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
      text: {
        type: String
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
        showTabs: ['outside', 'page', 'tel'],
        currentTab: 'outside',
        link: ''
      }
    },
    methods: {
      setPageAction(id) {
        this.link = id
      },
      clickTab(tab, event) {
        this.currentTab = tab.name
      },
      cancel() {
        this.$bus.$emit('click:hide')
      },
      sure() {
        this.$bus.$emit('click:submit', this.index)
      }
    }
  }
</script>

<style lang="scss">
  #click {

    .el-dialog__body {
      padding-top: 10px;
    }
  }
</style>
