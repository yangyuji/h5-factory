<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <ul class="marquee-box" id="line-marquee">
      <li :style="{ lineHeight: component.style[1].val + 'px' }" v-for="mq in marquees" class="marquee-item">{{mq.text}}</li>
    </ul>
  </div>
</template>

<script>
  import NewsMarquee from '@/utils/news-marquee.js'
  export default {
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        marquee: null,
        marquees: this.component.action.config
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          if (item.val) {
            if (Array.isArray(item.attr)) {
              item.attr.forEach((atr, i) => {
                ret.push(atr + ':' + item.val[i])
              })
            } else if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              const unit = item.unit || ''
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
          this.marquees = this.component.action.config
          // 需要重新初始化marquee对象
          if (this.marquee) {
            this.marquee.destroy()
            this.marquee = null
          }
          this.marquee = new NewsMarquee('#line-marquee')
        },
        deep: true
      }
    },
    mounted() {
      this.marquee = new NewsMarquee('#line-marquee')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .marquee-box {
    position: relative;
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;

    .marquee-item {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
