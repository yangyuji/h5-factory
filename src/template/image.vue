<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="image-box">
      <img v-if="getImg" :src="getImg">
      <div v-else class="image-placeholder"><i class="fa fa-image"></i></div>
    </div>
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
        const ret = []
        this.component.option.style.forEach((val) => {
          const unit = val.unit ? val.unit : ''
          val.val && ret.push(val.attr + ':' + val.val + unit)
        })
        return ret.join(';')
      },
      getImg() {
        this.component.option.style[0].val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .image-box {
    position: relative;
    overflow: hidden;
    background-color: #f9f9f9;

    .image-placeholder {
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;

      > .fa {
        color: #83c0ff;
        font-size: 40px;
      }
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      margin: 0;
      border: 0;
    }
  }
</style>
