<template>
  <div class="app-option">
    <el-form ref="options-form" label-width="70px" size="mini">

      <h2>【{{option.title}}】</h2>
      <el-form-item class="small" label="组件编号：">
        <span>{{option.domId}}</span>
      </el-form-item>
      <el-form-item class="small" label="组件名称：">
        <el-input v-model="option.domName"
                  maxlength="30"
                  placeholder="非必填，页内跳转配置使用"></el-input>
      </el-form-item>

      <template v-if="option.base && option.base.length">
        <template v-for="(item, idx) in option.base">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.style && option.style.length">
        <h3><i class="el-icon-setting"></i> 样式配置</h3>
        <template v-for="(item, idx) in option.style">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.others && option.others.config.length">
        <h3><i class="el-icon-setting"></i> {{option.others.title}}</h3>
        <template v-for="(item, idx) in option.others.config">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.action">
        <h3><i class="el-icon-setting"></i> {{option.action.title}}</h3>

        <template v-if="option.action.type === 'image-click'">
          <image-click :show.sync="imageClickShow"
                       :img="option.style[1].val"
                       :clicks="option.action.config"></image-click>
          <el-button icon="el-icon-plus" :disabled="!option.style[1].val" round
                     @click="imageClickShow = true">点击区域配置</el-button>
        </template>

        <template v-if="option.action.type === 'swiper-click'">
          <banner-item :banners="option.action.config"></banner-item>
        </template>

        <template v-if="option.action.type === 'bottom-menu-click'">
          <bottom-menu-item :items="option.action.config"></bottom-menu-item>
        </template>

        <template v-if="option.action.type === 'floor-menu-click'">
          <floor-menu-item :menus="option.action.config"></floor-menu-item>
        </template>

        <template v-if="option.action.type === 'left-scroll-click'">
          <scroll-item :scrolls="option.action.config"></scroll-item>
        </template>

        <template v-if="option.action.type === 'form-submit'">
          <input-item :forms="option.action.config"></input-item>
        </template>

        <template v-if="option.action.type === 'timeout-click'">
          <timeout-item :show.sync="timeoutClickShow"
                        :end="option.style[0].val"
                        :img="option.style[1].val"
                        :times="option.action.config"></timeout-item>
          <el-button icon="el-icon-plus" :disabled="!option.style[1].val" round
                     @click="timeoutClickShow = true">时间项配置</el-button>
        </template>

        <template v-if="option.action.type === 'marquee-click'">
          <marquee-item :marquees="option.action.config"></marquee-item>
        </template>
      </template>

    </el-form>
  </div>
</template>

<script>
  import formItem from '@/components/formItem.vue'
  import imageClick from '@/views/option/imageClick.vue'
  import timeoutItem from '@/views/option/timeoutItem.vue'
  import bannerItem from '@/views/option/bannerItem.vue'
  import bottomMenuItem from '@/views/option/bottomMenuItem.vue'
  import floorMenuItem from '@/views/option/floorMenuItem.vue'
  import scrollItem from '@/views/option/scrollItem.vue'
  import inputItem from '@/views/option/inputItem.vue'
  import marqueeItem from '@/views/option/marqueeItem.vue'
  export default {
    name: 'AppOption',
    data() {
      return {
        imageClickShow: false,
        timeoutClickShow: false
      }
    },
    components: {
      formItem,
      imageClick,
      timeoutItem,
      bannerItem,
      bottomMenuItem,
      floorMenuItem,
      scrollItem,
      inputItem,
      marqueeItem
    },
    props: {
      option: {
        type: Object
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.app-option {
  width: 260px;
  padding: 0 10px;
  overflow: auto;
  border-left: 1px solid #e8e8e8;

  h2 {
    margin: 13px 0;
    font-size: 14px;
  }

  .el-form {
    padding-bottom: 30px;

    > h3 {
      background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }

    .el-form-item.small {
      margin-bottom: 5px;

      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }

      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .el-textarea__inner {
        padding: 5px 10px;
      }

      .el-form-item__label {
        padding-right: 0;
        font-size: 13px;
      }
    }

    .form-list-panel {
      margin-top: 15px;
      border: 1px solid #e8e8e8;
      padding: 15px 15px 10px 15px;

      &:first-child {
        margin-top: 0;
      }

      .list-item-opt {
        text-align: right;

        > a {
          margin-left: 10px;
          color: #2aa7ff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
