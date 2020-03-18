<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="timeout-box">
      <div v-if="!imgUrl" class="image-placeholder"><i class="fa fa-hourglass-start"></i></div>
      <div class="timeout-item day"
           :style="dayStyl">
        {{countTime('day', component.action.config[0])}}
      </div>
      <div class="timeout-item hour"
           :style="hourStyl">
        {{countTime('hour', component.action.config[1])}}
      </div>
      <div class="timeout-item minute"
           :style="minuteStyl">
        {{countTime('minute', component.action.config[2])}}
      </div>
      <div class="timeout-item second"
           :style="secondStyl">
        {{countTime('second', component.action.config[3])}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Timeout',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        dayStyl: this.getTimeStyle(0),
        hourStyl: this.getTimeStyle(1),
        minuteStyl: this.getTimeStyle(2),
        secondStyl: this.getTimeStyle(3),
        imgUrl: this.component.style[1].val
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          if (item.attr === 'background-image' && item.val) {
            ret.push(item.attr + ':url(' + item.val + ')')
            ret.push('height:' + item.height / 2 + 'px')
            ret.push('background-size:contain')
          } else {
            const unit = item.unit || ''
            item.val && ret.push(item.attr + ':' + item.val + unit)
          }
        })
        return ret.join(';')
      }
    },
    watch: {
      component: {
        handler() {
          this.dayStyl = this.getTimeStyle(0)
          this.hourStyl = this.getTimeStyle(1)
          this.minuteStyl = this.getTimeStyle(2)
          this.secondStyl = this.getTimeStyle(3)
          this.imgUrl = this.component.style[1].val
        },
        deep: true
      }
    },
    methods: {
      getTimeStyle(idx) {
        const ret = []
        if (this.component.action.config[idx].show) {
          ret.push('left:' + this.component.action.config[idx].x + 'px')
          ret.push('top:' + this.component.action.config[idx].y + 'px')
          ret.push('width:' + this.component.action.config[idx].w + 'px')
          ret.push('height:' + this.component.action.config[idx].h + 'px')
          ret.push('line-height:' + this.component.action.config[idx].h + 'px')
          ret.push('font-size:' + this.component.action.config[idx].font + 'px')
          ret.push('font-weight:' + this.component.action.config[idx].weight)
          ret.push('color:' + this.component.action.config[idx].color)
          return ret.join(';')
        } else {
          return 'display:none;'
        }
      },
      countTime(key, config) {
        const end = this.component.style[0].val
        if (end) {
          const time = new Date().getTime()
          const sTime = new Date(end.replace(/-/g, '/')).getTime()
          const ms = sTime - time
          if (ms < 0) {
            return '00'
          } else {
            let day, hour, all_hour, minute, all_minute, second, all_second
            day = Math.floor(ms / 1000 / 60 / 60 / 24)
            day = day < 10 ? '0' + day : day

            hour = Math.floor(ms / 1000 / 60 / 60 % 24)
            hour = hour < 10 ? '0' + hour : hour
            all_hour = Math.floor(ms / 1000 / 60 / 60)
            all_hour = all_hour < 10 ? '0' + all_hour : all_hour

            minute = Math.floor(ms / 1000 / 60 % 60)
            minute = minute < 10 ? '0' + minute : minute
            all_minute = Math.floor(ms / 1000 / 60)
            all_minute = all_minute < 10 ? '0' + all_minute : all_minute

            second = Math.floor(ms / 1000 % 60)
            second = second < 10 ? '0' + second : second
            all_second = Math.floor(ms / 1000)
            all_second = all_second < 10 ? '0' + all_second : all_second

            switch (key) {
              case 'day':
                return day
              case 'hour':
                return config.show ? hour : all_hour
              case 'minute':
                return config.show ? minute : all_minute
              case 'second':
                return config.show ? second : all_second
            }
          }
        }
        return '00'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .timeout-box {
    position: relative;

    .timeout-item {
      position: absolute;
      text-align: center;
    }

    .image-placeholder {
      width: 100%;
      height: 100px;
      line-height: 100px;
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
