<template>
  <el-dialog id="imageClick"
             title="图片跳转配置"
             :close-on-click-modal="false"
             :append-to-body="false"
             :visible.sync="dialogShow"
             @close="$emit('update:show', false)"
             width="780px">
    <el-row>
      <el-col :span="12" style="text-align:center;width:375px;">
        <div class="area-container" id="areaMap">
          <img class="area-img" :src="img">
        </div>
        <!--拖动区域的模板-->
        <div class="crop-box" id="cropBox-0" data-index="0"
             style="display:none;width:225px;height:64px;left:0px;top:0px;">
          <div class="crop-box-content"></div>
          <span class="cropper-point point-e" data-direct="e"></span>
          <span class="cropper-point point-n" data-direct="n"></span>
          <span class="cropper-point point-w" data-direct="w"></span>
          <span class="cropper-point point-s" data-direct="s"></span>
          <span class="cropper-point point-ne" data-direct="ne"></span>
          <span class="cropper-point point-nw" data-direct="nw"></span>
          <span class="cropper-point point-sw" data-direct="sw"></span>
          <span class="cropper-point point-se" data-direct="se"></span>
        </div>
      </el-col>
      <el-col :span="12" class="form-right-list">
        <el-form label-width="90px">
          <template v-for="(area, idx) in areas">
            <el-form-item :class="['small', current === idx ? 'edit' : '']"
                          :data-index="idx" label="配置点击：">
              <span :class="['right-list-span', area.text ? '' : 'warn' ]">
                {{ area.text || '尚未配置' }}</span>
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
      <el-button type="primary" @click="dialogShow = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import dragArea from '@/utils/dragarea.js'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      clicks: {
        type: Array
      },
      img: {
        type: String
      }
    },
    data() {
      return {
        areas: this.clicks,
        current: 0,
        dialogShow: this.show
      }
    },
    watch: {
      clicks(list) {
        this.areas = list
      },
      show(isShow) {
        this.dialogShow = isShow
        this.current = 0
        if (isShow) {
          this.$nextTick(() => {
            dragArea.init({
              container: 'areaMap',
              cropBox: 'cropBox-0',
              initareas: this.areas,
              newcallback: (area) => {
                this.areas.push({
                  index: parseInt(area.dataset.index),
                  x: parseInt(area.style.left),
                  y: parseInt(area.style.top),
                  w: parseInt(area.style.width),
                  h: parseInt(area.style.height),
                  config: ''
                })
                this.current = parseInt(area.dataset.index)
              },
              clickcallback: (area) => {
                this.current = parseInt(area.dataset.index)
              },
              dragpointcallback: (area) => {
                const idx = parseInt(area.dataset.index)
                this.current = idx
                const item = this.areas.find((item) => item.index === idx)
                item.x = parseInt(area.style.left)
                item.y = parseInt(area.style.top)
                item.w = parseInt(area.style.width)
                item.h = parseInt(area.style.height)
              },
              dragareacallback: (area) => {
                const idx = parseInt(area.dataset.index)
                this.current = idx
                const item = this.areas.find((item) => item.index === idx)
                item.x = parseInt(area.style.left)
                item.y = parseInt(area.style.top)
                item.w = parseInt(area.style.width)
                item.h = parseInt(area.style.height)
              }
            })
          })
        }
      }
    },
    methods: {
      delArea(area, idx) {
        const n = this.areas.findIndex((item) => item.index === idx)
        this.areas.splice(n, 1)
        const box = document.getElementById('cropBox-' + idx)
        box && box.remove()
        // 重置样式
        document.querySelectorAll('div.crop-box').forEach((val) => {
          val.classList.remove('active')
        })
        this.current = 0
        document.getElementById('cropBox-0').classList.add('active')
      },
      editArea(area, idx) {
        this.$bus.$emit('click:show', 'imgClick', idx, area)
      }
    }
  }
</script>

<style lang="scss">
  #imageClick {

    .el-dialog__body {
      padding: 0 10px 0 10px !important;

      .area-container {
        position: relative;
        display: inline-block;
        width: 100%;
        margin: 0 auto;

        .area-img {
          display: block;
          width: 100%;
          height: auto;
          -webkit-user-drag: none;
        }

        .crop-box {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          box-sizing: border-box;
          direction: ltr;
          font-size: 0;
          line-height: 0;
          touch-action: none;
          user-select: none;

          &.active {
            border: 1px solid #39f;

            .cropper-point {
              display: block;
            }
          }

          .crop-box-content {
            width: 100%;
            height: 100%;
            background-color: #2aa7ff;
            //border: 1px solid #39f;
            opacity: .3;
            cursor: move;
          }

          .cropper-point {
            display: none;
            position: absolute;
            background-color: #39f;
            height: 6px;
            opacity: .75;
            width: 6px;
            box-sizing: border-box;

            &.point-e {
              cursor: ew-resize;
              margin-top: -3px;
              right: -4px;
              top: 50%;
            }
            &.point-n {
              cursor: ns-resize;
              left: 50%;
              margin-left: -3px;
              top: -4px;
            }
            &.point-w {
              cursor: ew-resize;
              left: -4px;
              margin-top: -3px;
              top: 50%;
            }
            &.point-s {
              bottom: -4px;
              cursor: s-resize;
              left: 50%;
              margin-left: -3px;
            }
            &.point-ne {
              cursor: nesw-resize;
              right: -4px;
              top: -4px;
            }
            &.point-nw {
              cursor: nwse-resize;
              left: -4px;
              top: -4px;
            }
            &.point-sw {
              bottom: -4px;
              cursor: nesw-resize;
              left: -4px;
            }
            &.point-se {
              bottom: -4px;
              right: -4px;
              cursor: nwse-resize;
            }
          }
        }
      }

      .el-form-item {
        &.small {
          margin-bottom: 0px;
          margin-left: 20px;
          padding: 5px 0 5px 0;
          border: 1px dashed #fff;

          &.hide {
            display: none;
          }
          &.edit {
            border-color: #2aa7ff;
            color: #2aa7ff;
          }
        }
      }

      .form-right-list {
        overflow-y: auto;

        .right-list-span {
          display: inline-block;
          vertical-align: middle;
          width: 200px;
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
