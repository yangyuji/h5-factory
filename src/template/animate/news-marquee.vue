<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <ul class="marquee-box" id="line-marquee">
      <li :style="{lineHeight: component.style[2].val + 'px'}" v-for="mq in marquees" class="marquee-item">{{mq.text}}</li>
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
        marqueeOption: {
          successive: this.component.style[0].val, // 是否连续
          speed: 1000 / 60, // 滚动速度
          pause: 3500 // 停顿时间
        },
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
          this.marqueeOption.successive = this.component.style[0].val
          // 需要重新初始化marquee对象
          if (this.marquee) {
            this.marquee.destroy()
            this.marquee = null
          }
          this.marquee = new NewsMarquee('#line-marquee', this.marqueeOption)
        },
        deep: true
      }
    },
    mounted() {
      this.marquee = new NewsMarquee('#line-marquee', this.marqueeOption)
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
