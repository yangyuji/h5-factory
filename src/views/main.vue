<template>
  <div class="app-body">
    <app-sidebar></app-sidebar>
    <div class="app-main">
      <app-toolbar v-on:showPageSet="showPageSet"
                   v-on:savePageSet="savePageSet"></app-toolbar>
      <div class="scroll-y">
        <div class="app-phone"
             @dragover.self="dragPhoneOver"
             @dragleave.self="dragPhoneLeave"
             @drop.self="dropPhone"
             @dragover.prevent>

          <template v-for="(comp, idx) in compList">

            <!--占位提示控件-->
            <div v-if="comp.type === 'placeholder'"
                 class="place-holder"
                 @dragover.stop="dragover"
                 @dragleave.stop="dragleave"
                 @drop.stop="drop"
                 @dragover.prevent
                 :data-index="idx">放在这里</div>

            <div v-else :class="['tpl-container', comp.active ? 'current' : '']"
                 :data-index="idx" @click.capture="clickComp">
              <!--文本控件-->
              <text-tpl v-if="comp.type === 'text'" :component="comp"></text-tpl>
              <!--图片控件-->
              <img-tpl v-if="comp.type === 'img'" :component="comp"></img-tpl>
              <!--表单控件-->
              <form-tpl v-if="comp.type === 'form'" :component="comp"></form-tpl>
              <!--轮播图控件-->
              <swiper-tpl v-if="comp.type === 'swiper-banner'" :component="comp"></swiper-tpl>
              <!--横向滚动控件-->
              <scroll-left v-if="comp.type === 'scroll-left'" :component="comp"></scroll-left>
              <!--倒计时控件-->
              <timeout v-if="comp.type === 'timeout'" :component="comp"></timeout>

              <!--控件操作-->
              <div class="comp-menu">
                <a href="javascript:void(0)"
                   :class="[idx == 1 ? 'disabled' : '']"
                   @click="upComp(idx)">
                  <span class="tips">上移</span>
                  <i class="fa fa-arrow-circle-up"></i>
                </a>
                <a href="javascript:void(0)"
                   :class="[idx == compList.length - 2 ? 'disabled' : '']"
                   @click="downComp(idx)">
                  <span class="tips">下移</span>
                  <i class="fa fa-arrow-circle-down"></i>
                </a>
                <a href="javascript:void(0)"
                   @click="delComp(idx)">
                  <span class="tips">删除</span>
                  <i class="fa fa-trash"></i>
                </a>
              </div>
            </div>

          </template>
        </div>
      </div>
    </div>

    <app-opt v-if="currentConfig" :option="currentConfig"></app-opt>
    <app-page-opt v-else :option="pageConfig"></app-page-opt>

    <click-config :show="clickShow" :option="currentConfig" :comps="compList"></click-config>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import appSidebar from '@/views/layout/sidebar.vue'
  import appToolbar from '@/views/layout/toolbar.vue'
  import appOpt from '@/views/layout/option.vue'
  import appPageOpt from '@/views/layout/pageOption.vue'
  import clickConfig from '@/views/common/click.vue'
  // 页面默认配置
  import pageOption from '@/config/page.config.js'
  // 组件默认配置
  import compConfig from '@/config/comp.config.js'
  // 组件模板
  import textTpl from '@/template/text.vue'
  import imgTpl from '@/template/image.vue'
  import formTpl from '@/template/form.vue'
  import swiperTpl from '@/template/swiper-banner.vue'
  import scrollLeft from '@/template/scroll-left.vue'
  import timeout from '@/template/timeout.vue'

  export default {
    name: 'AppMain',
    components: {
      appSidebar,
      appToolbar,
      appOpt,
      appPageOpt,
      clickConfig,
      textTpl,
      imgTpl,
      formTpl,
      swiperTpl,
      scrollLeft,
      timeout
    },
    data() {
      return {
        clickShow: false,
        compList: [{
          type: 'placeholder'
        }],
        pageConfig: util.copyObj(pageOption),
        currentConfig: null
      }
    },
    mounted() {
      this.$bus.$on('click:show', (type, idx) => {
        console.log(idx)
        this.clickShow = true
      })
      this.$bus.$on('click:hide', () => {
        this.clickShow = false
      })
      this.$bus.$on('click:submit', (type, idx, list) => {
        this.clickShow = false
      })
      this.getLocalData()
      this.showPageSet()
    },
    watch: {
      compList: {
        handler(val) {
          localStorage.setItem('pageDateSet', JSON.stringify({
            time: Date.now(),
            config: val
          }))
        },
        deep: true
      }
    },
    methods: {
      showPageSet() {
        this.resetCompUnchecked()
        this.currentConfig = null
      },
      savePageSet() {
        console.warn('save Info: ', JSON.stringify(this.compList))
        this.$message({
          message: '打开chomre devtool查看保存的信息！',
          type: 'success'
        })
      },
      getLocalData() {
        const tmp = localStorage.getItem('pageDateSet')
        if (tmp) {
          const localData = JSON.parse(tmp)
          const t = util.parseTime(localData.time)
          this.$confirm('您有一份【' + t + '】未保存的编辑内容, 是否恢复到当前编辑界面？', '提示', {
            confirmButtonText: '载入',
            cancelButtonText: '丢弃',
            type: 'warning',
            center: true
          }).then(() => {
            this.compList = localData.config
            this.resetCompUnchecked()
          }).catch(() => {
            localStorage.setItem('pageDateSet', '')
          })
        }
      },
      resetCompUnchecked() {
        this.compList.forEach((val) => {
          if (val.active) {
            val.active = false
          }
        })
      },
      replacePlaceholderWithComp(index, key) {
        const comp = util.copyObj(compConfig[key])
        const config = {
          type: key,
          active: true,
          domId: key + '-' + util.createDomID()
        }
        Object.assign(comp, config)
        this.compList.splice(index + 1, 0, comp)
        // 再插入一个占位控件
        this.compList.splice(index + 2, 0, {
          type: 'placeholder'
        })
        // 显示配置项
        this.currentConfig = comp
      },
      clickComp(e) {
        const idx = parseInt(e.currentTarget.dataset.index)
        this.compList.forEach((val, index) => {
          if (index === idx) {
            val.active = true
            this.currentConfig = val
          } else {
            val.active = false
          }
        })
      },
      upComp(idx) {
        if (idx < 2) {
          return false
        }
        // 复制当前控件
        const tmp = util.copyObj(this.compList[idx])
        // 再删除控件+占位坑
        this.compList.splice(idx, 2)
        // 再插入控件
        this.compList.splice(idx - 2, 0, tmp)
        // 最后插入一个占位控件
        this.compList.splice(idx - 1, 0, {
          type: 'placeholder'
        })
        // 显示当前组件配置
        this.currentConfig = this.compList[idx - 2]
      },
      downComp(idx) {
        if (idx === this.compList.length - 2) {
          return false
        }
        // 复制当前控件
        const tmp = util.copyObj(this.compList[idx])
        // 再删除控件+占位坑
        this.compList.splice(idx, 2)
        // 再插入控件
        this.compList.splice(idx + 2, 0, tmp)
        // 最后插入一个占位控件
        this.compList.splice(idx + 3, 0, {
          type: 'placeholder',
          active: false
        })
        // 显示当前组件配置
        this.currentConfig = this.compList[idx + 2]
      },
      delComp(idx) {
        // 删除控件
        this.compList.splice(idx, 2)
        // 显示页面配置参数
        this.showPageSet()
      },
      dragover(e) {
        const target = e.target
        if (!target.classList.contains('active')) target.classList.add('active')
      },
      drop(e) {
        const target = e.target
        target.classList.remove('active')
        const key = e.dataTransfer.getData('cmp-type')
        const idx = parseInt(target.dataset.index)
        if (compConfig[key]) {
          this.resetCompUnchecked()
          this.replacePlaceholderWithComp(idx, key)
        } else {
          this.$message.warning('没有查询到该组件的配置信息。。。')
        }
      },
      dragleave(e) {
        e.target.classList.remove('active')
      },
      dragPhoneOver() {
        const target = document.querySelector('.place-holder:last-child')
        if (!target.classList.contains('active')) target.classList.add('active')
      },
      dropPhone(e) {
        const target = document.querySelector('.place-holder:last-child')
        target.classList.remove('active')
        const key = e.dataTransfer.getData('cmp-type')
        const idx = parseInt(target.dataset.index)
        if (compConfig[key]) {
          this.resetCompUnchecked()
          this.replacePlaceholderWithComp(idx, key)
        } else {
          this.$message.warning('没有查询到该组件的配置信息。。。')
        }
      },
      dragPhoneLeave() {
        const target = document.querySelector('.place-holder:last-child')
        target.classList.remove('active')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    position: relative;
    flex: 1;
    min-width: 752px;
    background-color: #f2f3f4;

    .scroll-y {
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      overflow-y: auto;
    }

    .app-phone {
      position: relative;
      box-sizing: border-box;
      width: 752px;
      min-height: 1334px;
      margin: 0 auto;
      background-color: #fff;
      transform: translateX(-30px);

      .place-holder {
        position: relative;
        display: block;
        height: 10px;
        text-align: center;
        font-size: 0;
        background: #fff;
        background-image: linear-gradient(#fff 2px, transparent 0), linear-gradient(90deg, #999 1px, transparent 0);
        background-size: 3px 3px, 3px 3px;

        &.active {
          height: 40px;
          line-height: 40px;
          border: 1px dashed #f32e37;
          background-color: #ffe800;
          background-image: none;
          color: #333;
          font-size: 14px;
          margin: 0;
        }
      }

      .tpl-container {
        position: relative;
        width: 100%;
        background-color: transparent;
        position: relative;
        border: 1px solid #f2f3f4;
        transition: opacity .1s ease-out;
        user-select: none;
        box-sizing: border-box;
        z-index: auto;
        opacity: 1;
        cursor: pointer;

        &.current {
          border: 1px solid #2aa7ff;

          .comp-menu {
            display: block;
          }
        }

        .comp-content {
          position: relative;
        }

        .comp-menu {
          position: absolute;
          display: none;
          top: 0;
          right: -38px;
          width: 32px;

          > a {
            display: inline-block;
            position: relative;
            width: 36px;
            height: 36px;
            margin-bottom: 2px;
            text-align: center;
            color: #666;
            background: #fff;
            font-size: 18px;
            line-height: 36px;

            &.disabled {
              color: #e4e4e4;
            }

            &:hover {
              &.disabled {
                color: #e4e4e4;
              }
              color: #333;
              .tips {
                display: block;
              }
            }

            .tips {
              font-size: 12px;
              position: absolute;
              left: 120%;
              background-color: #111;
              height: 18px;
              padding: 0 5px;
              line-height: 19px;
              border-radius: 2px;
              white-space: nowrap;
              display: none;
              color: #eee;
              top: 5px;

              &::before {
                content: ' ';
                display: block;
                position: absolute;
                left: -5px;
                top: 4.5px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 5px 6px 5px 0;
                border-color: transparent #111 transparent transparent;
              }
            }
          }
        }
      }
    }
  }
</style>
