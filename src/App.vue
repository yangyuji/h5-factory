<template>
  <div id="app" class="app-wrapper">
    <app-header></app-header>
    <app-body></app-body>
  </div>
</template>

<script>
  import appHeader from '@/views/layout/header.vue'
  import appBody from '@/views/main.vue'
  export default {
    name: 'app',
    components: {
      appHeader,
      appBody
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    min-width: 1000px;

    .app-body {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 100%;
    }
  }
</style>
