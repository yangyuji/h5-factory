<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="style">
    <div class="form-box">
      <div class="image-placeholder"><i class="fa fa-list"></i></div>
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
    data() {
      return {
        style: this.getStyle()
      }
    },
    methods: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          if (item.val) {
            if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              const unit = item.unit ? item.unit : ''
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      }
    },
    watch: {
      component: {
        handler() {
          this.style = this.getStyle()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .form-box {
    position: relative;
    overflow: hidden;

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
      -webkit-user-drag: none;
    }
  }
</style>
