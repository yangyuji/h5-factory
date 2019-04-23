<template>
  <div class="app-body">
    <app-sidebar></app-sidebar>
    <div class="app-main">
      <app-toolbar></app-toolbar>
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

            <div v-else :class="['tpl-container', comp.active ? 'current' : '']">
              <!--文本控件-->
              <text-tpl v-if="comp.type === 'text'" :component="comp"></text-tpl>
              <!--图片控件-->
              <img-tpl v-if="comp.type === 'img'" :component="comp"></img-tpl>

              <!--控件操作-->
              <div class="comp-menu">
                <a href="javascript:void(0)" :data-index="idx"
                   :class="[idx == 1 ? 'disabled' : '']" @click="upComp">
                  <span class="tips">上移</span>
                  <i class="fa fa-arrow-circle-up"></i>
                </a>
                <a href="javascript:void(0)" :data-index="idx"
                   :class="[idx == compList.length - 2 ? 'disabled' : '']"
                   @click="downComp">
                  <span class="tips">下移</span>
                  <i class="fa fa-arrow-circle-down"></i>
                </a>
                <a href="javascript:void(0)" :data-index="idx" @click="delComp">
                  <span class="tips">删除</span>
                  <i class="fa fa-trash"></i>
                </a>
              </div>
            </div>

          </template>
        </div>
      </div>
    </div>
    <app-opt v-if="currentConfig.name"
             :name="currentConfig.name"
             :domId="currentConfig.domId"
             :domName="currentConfig.domName"
             :option="currentConfig.option">
    </app-opt>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import appSidebar from '@/views/layout/sidebar.vue'
  import appToolbar from '@/views/layout/toolbar.vue'
  import appOpt from '@/views/layout/option.vue'
  // 页面默认配置
  import pageOption from '@/config/page.config.js'
  // 组件模板
  import textTpl from '@/template/text.vue'
  import imgTpl from '@/template/image.vue'

  export default {
    name: 'AppMain',
    components: {
      appSidebar,
      appToolbar,
      appOpt,
      textTpl,
      imgTpl
    },
    data() {
      return {
        compList: [{
          type: 'placeholder'
        }],
        currentConfig: {
          name: '',
          domId: '',
          domName: '',
          option: null
        }
      }
    },
    mounted() {
      this.showPageSet()
    },
    methods: {
      showPageSet() {
        this.currentConfig.name = '页面配置'
        this.currentConfig.domId = 'page'
        this.currentConfig.option = util.copyObj(pageOption)
      },
      upComp(floors, idx) {
        const tmp = util.copyObj(floors[idx])
        floors.splice(idx, 1)
        floors.splice(idx - 1, 0, tmp)
      },
      downComp(floors, idx) {
        const tmp = util.copyObj(floors[idx])
        floors.splice(idx, 1)
        floors.splice(idx + 1, 0, tmp)
      },
      delComp(floors, idx) {
        floors.splice(idx, 1)
      },
      dragover(e) {
        e.target.classList.add('active')
      },
      drop(e) {
        e.target.classList.remove('active')
        const key = e.dataTransfer.getData('cmp-type')
        const config = util.copyObj(compConfig[key])
        config.type = key
        config.active = true
        this.compList.push(config)
        this.compList.push({
          type: 'placeholder'
        })
        this.currentConfig.name = config.title
        this.currentConfig.domId = key + '-' + util.createDomID()
        this.currentConfig.option = config
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
