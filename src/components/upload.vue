<template>
  <div class="el-form-item small el-form-item--mini">
    <label class="el-form-item__label" style="width:80px;">{{label}}：</label>
    <div class="el-form-item__content" style="margin-left:80px;">
      <div class="upload-container">
        <div class="el-upload el-upload--text">
          <div class="el-upload-dragger"><i class="el-icon-upload"></i>
            <div v-if="item.val" class="image-preview" :style="{ backgroundImage: 'url(' + item.val + ')' }">
              <i class="fa fa-window-close" @click.stop="delImg(item)"></i>
            </div>
            <div v-else class="el-upload__text">上传图片 或
              <em><a href="javascript:;" @click.prevent="dialogShow=true">图片地址</a></em>
            </div>
          </div>
          <input @change="upload" type="file" name="photoImg" class="upload-input">
        </div>
        <div v-if="item.limit" class="upload-tips">
          <h3>图片限制</h3>
          格式：jpeg/png/gif<br/>
          大小：小于{{item.limit.s}}k<br/>
          宽度：<font color="red">{{item.limit.w}}px</font><br/>
          高度：<font color="red">{{item.limit.h}}px</font>
        </div>
        <div v-else class="upload-tips">
          <h3>图片限制</h3>
          格式：jpeg/png/gif<br/>
          大小：jpeg/png小于100k，gif小于500k<br/>
          宽度：小于750px
        </div>
      </div>
    </div>

    <el-dialog id="netImgDialog"
               title="网络图片"
               :close-on-click-modal="false"
               :append-to-body="true"
               :visible="dialogShow"
               @close="dialogShow=false"
               width="680px">

      <el-tabs v-model="currentTab" type="card" @tab-click="clickTab">

        <el-tab-pane label="网络图片" name="outside">
          <el-form label-width="100px" style="margin-top:20px;">
            <el-form-item label="图片地址：">
              <el-input placeholder="图片地址，例：https://www.example.com/text.png" v-model="imgUrl"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="本站图片素材" name="inside">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="预览"
              width="80">
              <template slot-scope="scope">
                <img style="max-width:50px;max-height:50px;" src="http://www.w3school.com.cn/i/eg_tulip.jpg">
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="上传日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="图片地址">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="60">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>

      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="setImgUrl">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'upload',
    data() {
      return {
        currentTab: 'outside',
        imgUrl: '',
        dialogShow: false,
        tableData: []
      }
    },
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
              img.onload = () => {
                let invalide = true
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
                    this.$alert('图片大小不能超过 ' + this.item.limit.s + 'k', '提示')
                  }
                } else {
                  if (img.width > 750) {
                    invalide = false
                    this.$alert('图片宽度不能超过750px', '提示')
                  }
                  if (file.type === 'image/gif') {
                    if (file.size / 1024 > 2048) {
                      invalide = false
                      this.$alert('gif图片不能超过2048k', '提示')
                    }
                  } else {
                    if (file.size / 1024 > 512) {
                      invalide = false
                      this.$alert('jpeg、png图片不能超过512k', '提示')
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
      setImgUrl() {
        try {
          const img = new Image()
          img.onload = () => {
            let invalide = true
            if (this.item.hasOwnProperty('limit')) {
              if (img.naturalWidth !== this.item.limit.w) {
                invalide = false
                this.$alert('图片宽度必须为 ' + this.item.limit.w + 'px', '提示')
              }
              if (img.naturalHeight !== this.item.limit.h) {
                invalide = false
                this.$alert('图片高度必须为 ' + this.item.limit.h + 'px', '提示')
              }
            } else {
              if (img.naturalWidth > 750) {
                invalide = false
                this.$alert('图片宽度不能超过750px', '提示')
              }
            }
            if (invalide) {
              const width = 750
              const height = img.naturalHeight * (750 / img.naturalWidth).toFixed(4)
              this.item.width = width
              this.item.height = height
              this.item.val = img.src
              this.dialogShow = false
              this.$emit('uploadSuccess', this.item, img, this.index)
            }
          }
          img.src = this.imgUrl
        } catch (e) {
          console.warn(e)
        }
      },
      delImg(item) {
        item.val = ''
      },
      clickTab(tab) {
        this.currentTab = tab.name
      }
    }
  }
</script>

<style lang="scss">
  #netImgDialog {

    .el-dialog__body {
      padding-top: 10px;
    }
  }

  .upload-container {
    display: flex;

    .upload-tips {
      display: block;
      font-size: 12px;
      line-height: 1.5;
      padding: 5px;
      color: #666;

      h3 {
        margin: 0;
      }
    }
  }

  .el-upload-dragger {
    width: 100% !important;
    height: 100% !important;
    min-width: 150px;

    .el-icon-upload {
      margin-top: 20px;
    }
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
