<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <ul class="grid-menu">
      <li class="grid-menu-item"
           :style="getItemStyle"
           v-for="item in items">
        <img v-if="item.val" :src="item.val">
        <div v-else class="image-placeholder"><i class="fa fa-image"></i></div>
        <span v-if="item.text">{{item.text}}</span>
      </li>
    </ul>
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
        items: this.component.action.config
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          const unit = item.unit || ''
          item.val && ret.push(item.attr + ':' + item.val + unit)
        })
        return ret.join(';')
      },
      getItemStyle() {
        const column = parseInt(this.component.base[0].val)
        const num = this.items.length > column ? 100 / column : 100 / this.items.length
        return 'width:' + num + '%;'
      }
    },
    watch: {
      'component.action.config': {
        handler(val) {
          this.items = val
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .grid-menu {
    position: relative;
    margin: 0;
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;

    .grid-menu-item {
      display: inline-block;
      margin-top: 20px;
      vertical-align: baseline;
      text-align: center;
      font-size: 0;
      text-decoration: none;
      list-style-type: none;

      > .image-placeholder {
        margin: 0 auto;
        width: 80px;
        height: 80px;
        line-height: 80px;
        border: 1px solid #e8e8e8;
        text-align: center;

        > .fa {
          color: #83c0ff;
          font-size: 30px;
          vertical-align: middle;
        }
      }

      > img {
        display: block;
        margin: 0 auto;
        width: 80px;
        height: 80px;
      }
      > span {
        display: block;
        margin: 10px auto 0 auto;
        font-size: 24px;
        color: #0a1b2b;
      }
    }
  }
</style>
