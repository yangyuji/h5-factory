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
      <template v-if="option.base && option.base.length" v-for="item in option.base">
        <el-form-item class="small" v-if="item.type === 'text'" :label="item.label + '：'">
          <el-input v-model="item.val"
                    :maxlength="item.maxLength || 128"
                    :placeholder="item.placeholder ? item.placeholder : item.isNecessary ? '必填' : '非必填'"
                    @blur="item.rules ? inputBlur(item.rules, item) : null">
          </el-input>
        </el-form-item>
      </template>

      <template v-if="option.style && option.style.length">

        <h3><i class="el-icon-setting"></i> 样式配置</h3>

        <template v-for="(item, idx) in option.style">

          <el-form-item class="small"
                        v-if="item.type === 'text'"
                        :label="item.label + '：'">
            <el-input v-model="item.val"
                      :maxlength="item.maxLength || 128"
                      :placeholder="item.placeholder ? item.placeholder : item.isNecessary ? '必填' : '非必填'"
                      @blur="item.rules ? inputBlur(item.rules, item) : null">
            </el-input>
          </el-form-item>

          <el-form-item class="small"
                        v-if="item.type === 'color-picker'"
                        :label="item.label + '：'">
            <el-color-picker v-model="item.val"></el-color-picker>
          </el-form-item>

          <el-form-item class="small" v-if="item.type === 'font'" :label="item.label + '：'">
            <div :class="['font-set', item.val[0] === '600' ? 'checked' : '']"
                 @click="setFont(item, item.attr[0])"><i class="fa fa-bold"></i></div>
            <div :class="['font-set', item.val[1] === 'underline' ? 'checked' : '']"
                 @click="setFont(item, item.attr[1])"><i class="fa fa-underline"></i></div>
            <div :class="['font-set', item.val[2] === 'italic' ? 'checked' : '']"
                 @click="setFont(item, item.attr[2])"><i class="fa fa-italic"></i></div>
            <div :class="['font-set', item.val[3] === 'left' ? 'checked' : '']"
                 @click="setAlign(item, 'left')"><i class="fa fa-align-left"></i></div>
            <div :class="['font-set', item.val[3] === 'center' ? 'checked' : '']"
                 @click="setAlign(item, 'center')"><i class="fa fa-align-center"></i></div>
            <div :class="['font-set', item.val[3] === 'right' ? 'checked' : '']"
                 @click="setAlign(item, 'right')"><i class="fa fa-align-right"></i></div>
          </el-form-item>

          <el-form-item class="small"
                        v-if="item.type === 'textarea'"
                        :label="item.label + '：'">
            <el-input type="textarea"
                      v-model="item.val"
                      :rows="4"
                      :placeholder="item.placeholder"></el-input>
          </el-form-item>

          <el-form-item class="small"
                        v-if="item.type === 'input-number'"
                        :label="item.label + '：'">
            <el-input-number v-model="item.val"
                             :min="item.min"
                             :max="item.max"
                             :step="item.step">
            </el-input-number>
          </el-form-item>

          <el-form-item class="small"
                        v-if="item.type === 'select'"
                        :label="item.label + '：'">
            <el-select v-model="item.val" placeholder="默认选项">
              <el-option v-for="opt in item.options"
                         :key="opt.val"
                         :label="opt.name"
                         :value="opt.val">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="small"
                        v-if="item.type === 'radio'"
                        :label="item.label + '：'">
            <template v-for="opt in item.options">
              <el-radio v-model="item.val" :label="opt.val">{{opt.name}}</el-radio>
            </template>
          </el-form-item>

          <el-form-item class="small"
                        v-if="item.type === 'datetime'"
                        :label="item.label + '：'">
            <el-date-picker type="datetime"
                            v-model="item.val"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>

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
  import upload from '@/components/upload.vue'
  export default {
    name: 'AppOption',
    data() {
      return {
      }
    },
    components: {
      upload
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
      },
      setFont(item, attr) {
        if (attr === 'font-weight') {
          this.$set(item.val, 0, item.val[0] === '600' ? '400' : '600')
        }
        if (attr === 'text-decoration') {
          this.$set(item.val, 1, item.val[1] === 'underline' ? 'none' : 'underline')
        }
        if (attr === 'font-style') {
          this.$set(item.val, 2, item.val[2] === 'italic' ? 'inherit' : 'italic')
        }
      },
      setAlign(item, align) {
        this.$set(item.val, 3, align)
      },
      inputBlur(rule, item) {
        const reg = new RegExp(rule.regex)
        if (!item.val.match(reg)) {
          this.$alert(rule.tips, '提示')
          item.val = ''
          return false
        }
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

      &:last-child {
        margin-bottom: 0 !important;
      }
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
