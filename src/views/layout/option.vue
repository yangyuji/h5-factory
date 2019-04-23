<template>
  <div class="app-option">
    <el-form ref="options-form" label-width="70px" size="mini">
      <h2>【{{name}}】</h2>

      <template v-if="domId !== 'page'">
        <el-form-item class="small" label="组件编号：">
          <span>{{domId}}</span>
        </el-form-item>
        <el-form-item class="small" label="组件名称：">
          <el-input v-model="domName"
                    maxlength="30"
                    placeholder="非必填，页内跳转配置使用"></el-input>
        </el-form-item>
      </template>
      <template v-if="option.base && option.base.length">
        <template v-for="item in option.base">
          <form-item :item="item"></form-item>
        </template>
      </template>

      <template v-if="option.style && option.style.length">

        <h3><i class="el-icon-setting"></i> 样式配置</h3>

        <template v-for="(item, idx) in option.style">

          <form-item :item="item"></form-item>

          <upload v-if="item.type === 'upload'"
                  :id="idx"
                  :label="item.label"
                  :item="item"
                  v-on:uploadSuccess="uploadSuccess">
          </upload>

        </template>

      </template>

    </el-form>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import formItem from '@/components/formItem.vue'
  import upload from '@/components/upload.vue'
  export default {
    name: 'AppOption',
    data() {
      return {
      }
    },
    components: {
      upload,
      formItem
    },
    props: {
      name: {
        type: String
      },
      domId: {
        type: String
      },
      domName: {
        type: String
      },
      option: {
        type: Object
      }
    },
    methods: {
      uploadSuccess(res, item, img, list, idx) {
        const width = 750
        const height = img.height * (750 / img.width).toFixed(4)
        item.width = width
        item.height = height
        if (list && list.length) {
          const cp = util.copyObj(item)
          list.splice(idx, 1, cp)
        }
        console.log('uploadSuccess', item)
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
