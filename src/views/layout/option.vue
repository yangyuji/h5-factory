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

      <template v-if="option.action">
        <h3><i class="el-icon-setting"></i> 点击配置</h3>

      </template>

    </el-form>
  </div>
</template>

<script>
  import formItem from '@/components/formItem.vue'
  export default {
    name: 'AppOption',
    data() {
      return {
      }
    },
    components: {
      formItem
    },
    props: {
      option: {
        type: Object
      }
    },
    methods: {
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
      }
    }
  }
}
</style>
