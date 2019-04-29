<template>
  <el-dialog id="textClick"
             title="文字跳转配置"
             :close-on-click-modal="false"
             :append-to-body="false"
             :visible.sync="visible"
             @close="$emit('update:show', false)"
             width="680px">
    <el-row>
      <el-col :span="12">
        <div class="el-textarea el-input--small">
          <textarea autocomplete="off"
                    rows="16"
                    class="el-textarea__inner"
                    @select="textSelect"
                    v-model="model"
                    style="min-height: 60px;"></textarea>
        </div>
      </el-col>
      <el-col :span="12" class="form-right-list">
        <el-form label-width="100px">
          <template v-for="(area, idx) in areas">
            <el-form-item :class="['small', current === idx ? 'edit' : '']"
                          :data-index="idx" label="配置点击：">
              <span class="right-list-span" v-if="area.text">{{ area.text }}</span>
              <span class="right-list-span warn" v-else>尚未配置</span>
              <a class="right-list-a" @click="delArea(area, idx)"><i
                class="el-icon-delete"></i></a>
              <a class="right-list-a" @click="editArea(area, idx)"><i
                class="el-icon-edit"></i></a>
            </el-form-item>
          </template>
        </el-form>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import util from '@/utils/util.js'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: {
        type: String
      }
    },
    data() {
      return {
        areas: [],
        current: 0,
        model: this.text,
        visible: this.show
      }
    },
    watch: {
      show() {
        this.visible = this.show
      }
    },
    mounted() {
    },
    methods: {
      textSelect(e) {
        const target = e.target
        const str = util.getSelection(target)
        if (str && str.indexOf('<a>') < 0) {
          this.areas.push({
            start: target.selectionStart,
            end: target.selectionEnd,
            str: str,
            click: null
          })
          this.model = this.model.replace(str, '<a>' + str + '</a>')
        } else {
          this.$message.warning('文字的点击范围不能重叠哦！')
        }
      },
      delArea(area, idx) {
        this.model = this.model.replace('<a>' + this.areas[idx].str + '</a>', this.areas[idx].str)
        this.areas.splice(idx, 1)
        this.current = 0
      },
      editArea(area, idx) {
        this.$emit('showClick', idx)
      },
      sure() {
        this.visible = false
      },
      cancel() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss">
  #textClick {

    .el-dialog__body {
      padding: 0px 10px 50px 10px !important;

      .form-right-list {
        overflow-y: auto;

        .right-list-span {
          display: inline-block;
          vertical-align: middle;
          width: 160px;
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.warn {
            color: #f32e37;
          }
        }
        .right-list-a {
          margin-left: 10px;
          cursor: pointer;
          &:hover {
            color: #2aa7ff;
          }
        }
      }
    }
  }
</style>
