<template>
  <div class="el-form-item small el-form-item--mini">
    <label class="el-form-item__label" style="width:70px;">{{label}}：</label>
    <div class="el-form-item__content" style="margin-left:70px;">
      <div class="upload-container">
        <el-tooltip class="item" effect="dark" placement="left-start">
          <div v-if="item.limit" slot="content">
            格式限制：jpg/jpeg/png/gif
          </div>
          <div v-else slot="content">
            格式限制：jpg/jpeg/png/gif<br/>
            大小限制：jpg/jpeg/png不超过100k，gif不超过200k<br/>
            宽度限制：最大不超过750px
          </div>
          <div class="el-upload el-upload--text">
            <div class="el-upload-dragger"><i class="el-icon-upload"></i>
              <div v-if="item.val" class="image-preview" :style="{ backgroundImage: 'url(' + item.val + ')' }">
                <i class="fa fa-window-close" @click.stop="delImg(item)"></i>
              </div>
              <div v-else class="el-upload__text">点击此处，<em>上传图片</em></div>
            </div>
            <input @change="upload" type="file" name="photoImg" class="upload-input">
          </div>
        </el-tooltip>
        <div v-if="item.limit" class="el-upload__tip" style="line-height: 16px;">上传限制：<font color="red">宽{{item.limit.w}}px，高{{item.limit.h}}px，小于{{item.limit.s}}k</font>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'upload',
    props: {
      label: {
        type: String
      },
      index: {
        type: Number,
        default: 0
      },
      item: {
        type: Object
      }
    },
    methods: {
      upload(e) {
        const file = e.target.files[0]
        if (file) {
          if (['image/gif', 'image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) > -1) {
            // 获取图片宽高
            const reader = new FileReader()
            reader.onloadend = () => {
              const img = new Image()
              let invalide = true
              img.onload = () => {
                if (this.item.hasOwnProperty('limit')) {
                  if (img.width !== this.item.limit.w) {
                    invalide = false
                    this.$alert('图片宽度必须为 ' + this.item.limit.w + 'px', '提示')
                  }
                  if (img.height !== this.item.limit.h) {
                    invalide = false
                    this.$alert('图片高度必须为 ' + this.item.limit.h + 'px', '提示')
                  }
                  if (file.size / 1024 > this.item.limit.s) {
                    invalide = false
                    this.$alert('图片大小不能超过 ' + this.item.limit.s + 'kb', '提示')
                  }
                } else {
                  if (img.width > 750) {
                    invalide = false
                    this.$alert('图片宽度不能超过750px', '提示')
                  }
                  if (file.type === 'image/gif') {
                    if (file.size / 1024 > 800) {
                      invalide = false
                      this.$alert('gif图片不能超过500k', '提示')
                    }
                  } else {
                    if (file.size / 1024 > 500) {
                      invalide = false
                      this.$alert('jpg、jpeg、png图片不能超过300k', '提示')
                    }
                  }
                }

                if (invalide) {
                  const width = 750
                  const height = img.height * (750 / img.width).toFixed(4)
                  this.item.width = width
                  this.item.height = height
                  this.item.val = img.src
                  this.$emit('uploadSuccess', this.item, img, this.index)
                }
              }
              img.src = reader.result
              this.$emit('beforeUpload', file, this.item, img, this.index)
            }
            reader.onerror = (err) => {
              console.log('reader error', err)
            }
            // 读出文件路径
            reader.readAsDataURL(file)
          } else {
            this.$alert('图片格式须为jpg、jpeg、png、gif之一！', '提示')
          }
        }
      },
      delImg(item) {
        item.val = ''
      }
    }
  }
</script>

<style lang="scss">
  .el-upload-dragger {
    width: 100% !important;
    height: 100% !important;
    min-width: 150px;

    .el-icon-upload {
      margin-top: 20px;
    }
  }

  .el-upload__tip {
    margin-top: 0 !important;
  }

  .image-preview {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ecf5ff;

    .fa-window-close {
      position: absolute;
      top: 0;
      right: 0;
      color: #666;
      font-size: 22px;
      z-index: 99;
    }
  }

  .upload-input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 150px;
    height: 115px;
    cursor: pointer;
  }
</style>
