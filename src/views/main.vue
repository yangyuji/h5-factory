<template>
  <div class="app-body">
    <app-sidebar></app-sidebar>
    <div class="app-main">
      <app-toolbar></app-toolbar>
      <div class="app-phone">

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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    flex: 1;
    min-width: 750px;
  }
</style>
