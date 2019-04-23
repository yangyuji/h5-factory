<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="img-box"></div>
  </div>
</template>

<script>
  export default {
    props: {
      component: {
        type: Object
      }
    },
    computed: {
      getStyle() {
        console.log(this.component)
        return this.component.style
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .img-box {
    display: block;
  }
</style>
