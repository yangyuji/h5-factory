<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">

    <section v-show="component.style[0].val === 'scroll-x'" class="scroll-left">
      <div id="scroll-one" class="scroll-wrapper">
        <div class="scroll-content">
          <div class="slide" v-for="(item, idx) in scrolls">
            <img v-if="item.val" :src="item.val">
            <div v-else class="image-placeholder"><i class="fa fa-image"></i></div>
          </div>
        </div>
      </div>
      <div id="indicator">
        <div id="dotty"></div>
      </div>
    </section>

    <section v-show="component.style[0].val === 'no-scroll'" class="no-scroll" id="scroll-two">
      <div class="scroll-content">
        <div v-for="(item) in scrolls" class="scroll-item">
          <img v-if="item.val" :src="item.val">
          <div v-else class="image-placeholder"><i class="fa fa-image"></i></div>
          <!--p>{{item.text || '默认文字'}}</p-->
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import IScroll from 'iscroll'

  export default {
    name: 'ScrollLeft',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        leftScroll: null,
        noScroll: null,
        scrolls: this.component.action.config
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
      }
    },
    watch: {
      component: {
        handler() {
          this.scrolls = this.component.action.config
          // 每改变项都需要重新初始化iscroll对象
          this.initScroll()
        },
        deep: true
      }
    },
    methods: {
      initScroll() {
        this.leftScroll = null
        this.noScroll = null
        if (this.component.style[0].val === 'scroll-x') {
          setTimeout(() => {
            this.leftScroll = new IScroll('#scroll-one', {
              scrollX: true,
              scrollY: false,
              eventPassthrough: true,
              preventDefault: false,
              bounceEasing: false,
              momentum: false,
              snap: true,
              snapSpeed: 400,
              indicators: {
                el: document.getElementById('indicator'),
                resize: false
              }
            })
          }, 0)
        } else if (this.component.style[0].val === 'no-scroll') {
          setTimeout(() => {
            this.noScroll = new IScroll('#scroll-two', {
              scrollX: true,
              scrollY: false,
              eventPassthrough: true,
              preventDefault: false
            })
          }, 0)
        }
      }
    },
    mounted() {
      this.initScroll()
    }
  }
</script>

<style lang="scss" scoped>
  .comp-content {
    overflow-x: hidden;
  }

  .scroll-left {
    position: relative;
    height: 176px;
    padding: 0 14px;
    overflow: hidden;

    #indicator {
      position: relative;
      width: 335px;
      height: 4px;
      margin: 12px auto 0 auto;
      background-color: #e7e8e9;
    }

    #dotty {
      position: absolute;
      width: 70px;
      height: 4px;
      border-radius: 0;
      background: #409eff;
    }

    .scroll-wrapper {
      width: 347px;
      height: 160px;

      .scroll-content {
        position: absolute;
        height: 160px;
        white-space: nowrap;
        overflow: hidden;
        transform: translateZ(0);
        text-size-adjust: none;
        font-size: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        z-index: 1;

        > .slide {
          display: inline-block;
          width: 347px;
          height: 160px;
          padding: 0 6px;
          box-sizing: border-box;
          vertical-align: top;

          > img {
            display: block;
            width: 335px;
            height: 160px;
            -webkit-user-drag: none;
          }

          > .image-placeholder {
            width: 100%;
            height: 158px;
            line-height: 158px;
            text-align: center;
            border: 1px solid #e8e8e8;

            > .fa {
              color: #83c0ff;
              font-size: 20px;
            }
          }
        }
      }
    }
  }

  .no-scroll {
    position: relative;
    width: 354px;
    padding: 20px 0 0 20px;
    height: 118px;
    box-sizing: content-box;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    text-align: center;

    .scroll-content {
      position: absolute;
      white-space: nowrap;
      // height: 118px;
      padding-right: 20px;
      box-sizing: content-box;
      transform: translateZ(0);
      text-size-adjust: none;
      font-size: 0;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      z-index: 1;

      .scroll-item {
        display: inline-block;
        width: 96px;
        height: 96px;
        flex-shrink: 0;
        margin-right: 8px;
        vertical-align: top;
        background: #FFF;
        box-shadow: 8px 8px 12px 0 rgba(0,0,0,0.15);
        font-size: 0;

        > img {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          -webkit-user-drag: none;
        }

        > .image-placeholder {
          width: 100%;
          height: 96px;
          line-height: 96px;
          text-align: center;
          border: 1px solid #e8e8e8;
          box-sizing: border-box;

          > .fa {
            color: #83c0ff;
            font-size: 32px;
          }
        }

        /* > p {
          margin-top: 16px;
          font-size: 28px;
          line-height: 1;
          color: #000;
        } */
      }
    }
  }
</style>
