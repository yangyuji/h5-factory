<template>
  <div class="app-body">
    <app-sidebar></app-sidebar>
    <div class="app-main">
      <app-toolbar></app-toolbar>
      <div class="scroll-y">
        <div class="app-phone">
          <div class="place-holder"
               @dragover="dragover"
               @dragleave="dragleave"
               @drop="drop"
               @dragover.prevent>
          </div>
        </div>
      </div>
    </div>
    <app-opt :name="currentConfig.name"
             :domId="currentConfig.domId"
             :domName="currentConfig.domName"
             :forms="currentConfig.forms"></app-opt>
  </div>
</template>

<script>
  import appSidebar from '@/views/layout/sidebar.vue'
  import appToolbar from '@/views/layout/toolbar.vue'
  import appOpt from '@/views/layout/option.vue'
  // 页面默认配置
  import pageOption from '@/config/page.config.js'

  export default {
    name: 'AppMain',
    components: {
      appSidebar,
      appToolbar,
      appOpt
    },
    data() {
      return {
        currentConfig: {
          name: '',
          domId: '',
          domName: '',
          forms: []
        }
      }
    },
    mounted() {
      console.log(pageOption)
      this.showPageSet()
    },
    methods: {
      showPageSet() {
        this.currentConfig.name = '页面配置'
        this.currentConfig.domId = 'page'
        this.currentConfig.forms = pageOption
      },
      dragover(e) {
        e.target.classList.add('active')
      },
      drop(e) {
        e.target.classList.remove('active')
        console.log(e.dataTransfer.getData('cmp-type'))
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
    }
  }
</style>
