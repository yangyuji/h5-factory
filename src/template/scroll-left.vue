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
    height: 352px;
    padding: 0 28px;
    overflow: hidden;

    #indicator {
      position: relative;
      width: 670px;
      height: 8px;
      margin: 24px auto 0 auto;
      background-color: #e7e8e9;
    }

    #dotty {
      position: absolute;
      width: 140px;
      height: 8px;
      border-radius: 0;
      background: #409eff;
    }

    .scroll-wrapper {
      width: 694px;
      height: 320px;

      .scroll-content {
        position: absolute;
        height: 320px;
        white-space: nowrap;
        overflow: hidden;
        transform: translateZ(0);
        text-size-adjust: none;
        font-size: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        z-index: 1;

        > .slide {
          display: inline-block;
          width: 694px;
          height: 320px;
          padding: 0 12px;
          box-sizing: border-box;
          vertical-align: top;

          > img {
            display: block;
            width: 670px;
            height: 320px;
            -webkit-user-drag: none;
          }

          > .image-placeholder {
            width: 100%;
            height: 318px;
            line-height: 318px;
            text-align: center;
            border: 1px solid #e8e8e8;

            > .fa {
              color: #83c0ff;
              font-size: 40px;
            }
          }
        }
      }
    }
  }

  .no-scroll {
    position: relative;
    width: 708px;
    padding: 40px 0 0 40px;
    height: 236px;
    box-sizing: content-box;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    text-align: center;

    .scroll-content {
      position: absolute;
      white-space: nowrap;
      height: 236px;
      padding-right: 40px;
      box-sizing: content-box;
      transform: translateZ(0);
      text-size-adjust: none;
      font-size: 0;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      z-index: 1;

      .scroll-item {
        display: inline-block;
        width: 192px;
        height: 192px;
        flex-shrink: 0;
        margin-right: 16px;
        vertical-align: top;
        background: #FFF;
        box-shadow: 16px 16px 24px 0 rgba(0,0,0,0.15);
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
          height: 192px;
          line-height: 192px;
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
