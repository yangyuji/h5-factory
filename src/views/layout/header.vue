<template>
  <header class="app-header">
    <img class="header-logo" src="https://yangyuji.github.io/vue-element-admin/static/img/logo.png">cms admin
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-header {
    position: relative;
    height: 60px;
    line-height: 60px;
    padding-left: 40px;
    background: rgba(38, 38, 38, 1);
    font-size: 18px;
    color: #fff;

    .header-logo {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 15px;
    }
  }
</style>
