<template>
  <div class="app-body">
    <app-sidebar></app-sidebar>
    <div class="app-main">
      <app-toolbar v-on:showPageSet="showPageSet"></app-toolbar>
      <div class="scroll-y">
        <div class="app-phone">

          <template v-for="(comp, idx) in compList">

            <!--占位提示控件-->
            <div v-if="comp.type === 'placeholder'"
                 class="place-holder"
                 @dragover="dragover"
                 @dragleave="dragleave"
                 @drop="drop"
                 @dragover.prevent
                 :data-index="idx">放在这里</div>

            <div v-else :class="['tpl-container', comp.active ? 'current' : '']"
                 :data-index="idx" @click.capture="clickComp">
              <!--文本控件-->
              <text-tpl v-if="comp.type === 'text'" :component="comp"></text-tpl>
              <!--图片控件-->
              <img-tpl v-if="comp.type === 'img'" :component="comp"></img-tpl>

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

  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import appSidebar from '@/views/layout/sidebar.vue'
  import appToolbar from '@/views/layout/toolbar.vue'
  import appOpt from '@/views/layout/option.vue'
  import appPageOpt from '@/views/layout/pageOption.vue'
  // 页面默认配置
  import pageOption from '@/config/page.config.js'
  // 组件默认配置
  import compConfig from '@/config/comp.config.js'
  // 组件模板
  import textTpl from '@/template/text.vue'
  import imgTpl from '@/template/image.vue'

  export default {
    name: 'AppMain',
    components: {
      appSidebar,
      appToolbar,
      appOpt,
      appPageOpt,
      textTpl,
      imgTpl
    },
    data() {
      return {
        compList: [{
          type: 'placeholder'
        }],
        pageConfig: util.copyObj(pageOption),
        currentConfig: null
      }
    },
    mounted() {
      this.showPageSet()
    },
    methods: {
      showPageSet() {
        this.resetCompUnchecked()
        this.currentConfig = null
      },
      resetCompUnchecked() {
        this.compList.forEach((val) => {
          if (val.active) {
            val.active = false
          }
        })
      },
      // 用控件替换 Placeholder
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
        e.target.classList.add('active')
      },
      drop(e) {
        e.target.classList.remove('active')
        const key = e.dataTransfer.getData('cmp-type')
        const idx = parseInt(e.target.dataset.index)
        if (compConfig[key]) {
          this.resetCompUnchecked()
          this.replacePlaceholderWithComp(idx, key)
        } else {
          this.$message.warning('没有查询到该组件的配置信息。。。')
        }
      },
      dragleave(e) {
        e.target.classList.remove('active')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    position: relative;
    flex: 1;
    min-width: 750px;
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
      width: 750px;
      min-height: 1334px;
      margin: 0 auto;
      background-color: #fff;

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
              left: 134%;
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
