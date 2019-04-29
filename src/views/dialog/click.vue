<template>
  <el-dialog id="click"
             title="页面预览"
             :close-on-click-modal="false"
             :append-to-body="false"
             :visible.sync="visible"
             @close="$emit('update:show', false)"
             width="680px">

      <el-tabs v-model="currentTab" type="card" @tab-click="clickTab">

        <el-tab-pane v-if="showTabs.indexOf('outside') > -1" label="链接地址" name="outside">
          <el-form label-width="100px" style="margin-top:20px;">
            <el-form-item label="链接地址：">
              <el-input placeholder="请输入链接地址，例：https://www.example.com/" v-model="link"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane v-if="showTabs.indexOf('page') > -1" label="页内位置" name="page">

          <el-tabs tab-position="left">
            <el-tab-pane label="全部">
              <div class="choose-panel smaller">
                <template v-for="contrl in controls">
                  <el-button size="mini"
                             :class="[currentTab == 'page' && link == contrl.id ? 'el-button--primary' : '']"
                             round @click="setPageAction(contrl.id)">{{contrl.name || contrl.id}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="图片">
              <div class="choose-panel smaller">
                <template v-for="contrl in controls">
                  <el-button v-if="contrl.type == 'img'" size="mini"
                             :class="[currentTab == 'page' && link == contrl.id ? 'el-button--primary' : '']"
                             round @click="setPageAction(contrl.id)">{{contrl.name || contrl.id}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文本">
              <div class="choose-panel smaller">
                <template v-for="contrl in controls">
                  <el-button v-if="contrl.type == 'text'" size="mini"
                             :class="[currentTab == 'page' && link == contrl.id ? 'el-button--primary' : '']"
                             round @click="setPageAction(contrl.id)">{{contrl.name || contrl.id}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="表单">
              <div class="choose-panel smaller">
                <template v-for="contrl in controls">
                  <el-button v-if="contrl.type == 'img-hot-area'" size="mini"
                             :class="[currentTab == 'page' && link == contrl.id ? 'el-button--primary' : '']"
                             round @click="setPageAction(contrl.id)">{{contrl.name || contrl.id}}
                  </el-button>
                </template>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>

        <el-tab-pane v-if="showTabs.indexOf('coupon') > -1" label="领取优惠券" name="coupon">
          <el-form label-width="100px">
            <el-form-item label="优惠券码：">
              <el-input placeholder="请输入券码" v-model="link" :maxlength="32"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane v-if="showTabs.indexOf('tel') > -1" label="拨打电话" name="tel">
          <el-form label-width="100px">
            <el-form-item label="电话号码：">
              <el-input placeholder="请输入电话号码" v-model="link" :maxlength="11"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>


      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cancel">确 定</el-button>
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
      }
    },
    data() {
      return {
        visible: this.show,
        controls: [],
        showTabs: ['page', 'coupon', 'tel', 'outside'],
        currentTab: 'outside',
        link: ''
      }
    },
    watch: {
      show() {
        this.visible = this.show
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
        this.visible = false
      }
    }
  }
</script>

<style lang="scss">
  #click {

    .el-dialog__body {
      padding: 0px 10px 50px 10px !important;
    }
  }
</style>
