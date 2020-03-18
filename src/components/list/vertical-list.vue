<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="page-list">
      <div v-for="(item, idx) in list" class="page-list-item"
           :key="idx" :style="getItemStyle('vertical-list-item')">
        <div class="page-list-item__hd" :style="getItemStyle('vertical-list-logo_')">
          <div class="page-list-item__img" :style="{backgroundImage: 'url(' + item.val + ')'}"></div>
        </div>
        <div class="page-list-item__bd">
          <div class="page-list-item__title" :style="getItemStyle('vertical-list-title_')">{{ item.title }}</div>
          <p class="page-list-item__desc" :style="getItemStyle('vertical-list-desc_')">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VerticalList',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        list: this.component.action.config
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          const unit = item.unit || ''
          if (item.val) {
            if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      }
    },
    methods: {
      getItemStyle(key) {
        const ret = []
        this.component.others.config.forEach((item) => {
          const isItem = item.attr.indexOf(key)
          const idx = item.attr.indexOf('_')
          if (isItem === 0) {
            const unit = item.unit || ''
            item.val && ret.push(item.attr.substring(idx + 1, item.attr.length) + ':' + item.val + unit)
          }
        })
        return ret.join(';')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .comp-content {
    background-repeat: no-repeat;
  }
  .page-list {
    background-color: #fff;

    .page-list-item {
      position: relative;
      display: inline-block;
      text-align: center;
      width: 50%;
      box-sizing: border-box;

      &:after {
        content: " ";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 1px;
        background-color: #E5E5E5;
        color: #E5E5E5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
      }

      &:nth-child(2n) {
        &:after {
          display: none;
        }
      }

      .page-list-item__hd {
        margin-bottom: .8em;
        text-align: center;

        .page-list-item__img {
          margin: 0 auto;
          width: 100%;
          height: 100%;
          background-color: #e9e9eb;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      .page-list-item__bd {
        min-width: 60px;

        .page-list-item__title {
          margin-bottom: .3em;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          word-wrap: break-word;
          word-break: break-all;
        }

        .page-list-item__desc {
          margin: 0;
          line-height: 1.5;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
</style>
