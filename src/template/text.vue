<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="text-box" v-html="getText"></div>
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
        this.component.style.forEach((item) => {
          const unit = item.unit ? item.unit : ''
          if (item.val) {
            if (Array.isArray(item.attr)) {
              item.attr.forEach((atr, i) => {
                ret.push(atr + ':' + item.val[i])
              })
            } else {
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      },
      getText() {
        const arr = this.component.base[0].val.split('\n')
        if (arr.length) {
          return arr.join('<br/>')
        }
        return this.component.base[0].val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text-box {
    display: block;
  }
</style>
