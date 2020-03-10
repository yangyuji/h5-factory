<template>
  <div class="bottom-menu" :style="getStyle">
    <div class="menu-item" :style="{width: 750 / menus.length + 'px'}" v-for="item in menus">
      <img v-if="item.val" :src="item.val">
      <div v-else class="image-placeholder"><i class="fa fa-adjust"></i></div>
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
        menus: this.component.action.config
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          if (item.val) {
            const unit = item.unit || ''
            ret.push(item.attr + ':' + item.val + unit)
          }
        })
        return ret.join(';')
      }
    },
    watch: {
      component: {
        handler() {
          this.menus = this.component.action.config
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bottom-menu {
    display: flex;
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    justify-content: space-between;
    align-content: center;

    .menu-item {
      display: block;
      flex: 1;
      text-align: center;
      box-sizing: border-box;

      > img {
        height: 100%;
        width: auto;
      }

      > .image-placeholder {
        width: 100%;
        height: 100%;
        text-align: center;
        border-left: 1px solid #e8e8e8;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &:first-child {
          border-left: 0;
        }

        > .fa {
          color: #83c0ff;
          font-size: 40px;
          vertical-align: middle;
        }
      }
    }
  }

</style>

