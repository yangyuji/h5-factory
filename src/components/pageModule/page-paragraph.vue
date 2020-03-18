<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="page-paragraph__title">
      <span class="title-icon">
        <i :class="component.base[0].val"></i>
      </span>
      <span class="title-h1">{{ component.base[1].val }}</span>
    </div>
    <div class="page-paragraph" v-for="item in component.action.config">
      <label class="page-paragraph__label">
        {{ item.label }}
      </label>
      <div class="page-paragraph__content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageParagraph',
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
            if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .page-paragraph__title {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .title-icon {
      margin-right: 10px;
      display: flex;
      align-items: center;

      > i.theme-1 {
        display: block;
        width: 4px;
        height: 14px;
        background-color: #007aff;
      }
      > i.theme-2 {
        display: block;
        width: 8px;
        height: 8px;
        border: 2px solid #007aff;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .title-h1 {
      display: block;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .page-paragraph {
    display: flex;

    .page-paragraph__label {
      display: block;
      text-align: left;
      width: 20px;
      line-height: 1.5;
    }

    .page-paragraph__content {
      flex: 1;
      line-height: 1.5;
      font-size: 14px;
    }
  }
</style>
