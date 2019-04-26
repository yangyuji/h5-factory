<template>
  <div>
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
            :id="index"
            :label="item.label"
            :item="item"
            v-on:uploadSuccess="uploadSuccess">
    </upload>
  </div>
</template>

<script>
  import upload from '@/components/upload.vue'
  export default {
    props: {
      item: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    components: {
      upload
    },
    methods: {
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
      },
      uploadSuccess(item, img) {
        console.log('uploadSuccess', item)
      }
    }
  }
</script>
