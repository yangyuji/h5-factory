<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="page-intro">
      <div class="intro-logo">
        <svg viewBox="0 0 22 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-503.000000, -667.000000)" :fill="component.style[0].val">
              <g transform="translate(487.000000, 659.000000)"><path d="M21.5,17.3646677 L24.8,17.3646677 L24.8,26 L16,26 L16,19.465154 C16,12.3273549 18.933304,8.50567514 24.8,8 L24.8,11.2382496 C22.599989,11.84117 21.5,13.5721089 21.5,16.4311183 L21.5,17.3646677 Z M34.7,17.3646677 L38,17.3646677 L38,26 L29.2,26 L29.2,19.465154 C29.2,12.3273549 32.133304,8.50567514 38,8 L38,11.2382496 C35.799989,11.84117 34.7,13.5721089 34.7,16.4311183 L34.7,17.3646677 Z"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div class="intro-text" v-html="getText"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageIntro',
    props: {
      component: {
        type: Object
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          const unit = item.unit || ''
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
  .comp-content {
    background-repeat: no-repeat;
  }
  .page-intro {
    display: flex;

    .intro-logo {
      width: 36px;

      > svg {
        width: 22px;
        height: 18px;
      }
    }

    .intro-text {
      flex: 1;
    }
  }
</style>
