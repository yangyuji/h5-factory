<template>
  <div :class="['comp-content', component.active ? 'active' : '']">
    <div class="floor-menu" :style="{ backgroundColor: backgroundColor }">
      <div class="floor-menu-list">
        <div class="floor-menu-inner">
          <a class="floor-item"
             href="javascript:;"
             :style="getItemStyle(idx)"
             v-for="(item, idx) in items">{{item.text}}</a>
        </div>
      </div>
      <div class="floor-menu-down">
        <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon :fill="fillColor"
                     fill-rule="nonzero"
                     points="28 15.1144797 28.7045635 15.8241207 20.4099341 24.0594021 12 15.709641 12.7045635 15 20.4099341 22.6502388"></polygon>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FloorMenu',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        items: this.component.action.config,
        backgroundColor: this.component.style[0].val,
        fillColor: this.component.style[2].val
      }
    },
    watch: {
      component: {
        handler() {
          this.items = this.component.action.config
          this.backgroundColor = this.component.style[0].val
          this.fillColor = this.component.style[2].val
        },
        deep: true
      }
    },
    methods: {
      getItemStyle(idx) {
        const ret = []
        if (idx === 0) {
          ret.push('background-color:' + this.component.style[1].val)
          ret.push('color:' + this.component.style[3].val)
        } else {
          ret.push('background-color:' + this.component.style[0].val)
          ret.push('color:' + this.component.style[2].val)
        }
        return ret.join(';')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .floor-menu {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

    .floor-menu-list {
      width: 335px;
      height: 40px;
      overflow-y: hidden;
      overflow-x: auto;

      .floor-menu-inner {
        position: relative;
        display: flex;
        padding: 0 8px;
        height: 40px;
        white-space: nowrap;

        .floor-item {
          display: block;
          line-height: 40px;
          padding: 0 16px;
          font-size: 14px;
          text-decoration: none;
        }
      }
    }

    .floor-menu-down {
      width: 40px;
      height: 40px;
      text-align: center;
      box-shadow: -5px 0 5px -5px #333;
    }
  }
</style>
