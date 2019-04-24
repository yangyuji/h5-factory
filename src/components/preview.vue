<template>
  <el-dialog id="preview"
             title="页面预览"
             :close-on-click-modal="false"
             :append-to-body="false"
             :visible.sync="visible"
             @close="$emit('update:show', false)"
             width="395px">
    <el-row>
      <el-col :span="12" style="text-align: center;width:375px;background-color:#f2f3f4;">
        <iframe allowtransparency="yes" src="https://yangyuji.github.io/cms-admin/static/demo/preview.html"></iframe>
      </el-col>
    </el-row>

    <div class="pre-qrcode">
      <img class="qrcode-img" src="https://yangyuji.github.io/cms-admin/static/img/qrcode.png">
      <p style="color:red;">请勿分享该链接</p>
      <p>二维码有效时长10分钟</p>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: this.show
      }
    },
    watch: {
      show() {
        this.visible = this.show
      }
    },
    methods: {
      cancel() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss">
  #preview {

    .el-dialog {
      border-radius: 10px !important;
    }

    .el-dialog__body {
      padding: 0px 10px 50px 10px !important;

      .pre-qrcode {
        position: absolute;
        left: 110%;
        top: 40%;
        width: 150px;
        height: 200px;
        padding: 10px;
        background-color: #fff;

        .qrcode-img {
          display: block;
          border: 1px solid #ccc;
          width: 150px;
          height: 150px;
          margin-bottom: 6px;
        }

        > p {
          margin: 0;
          text-align: center;
          line-height: 1.5;
        }
      }

      iframe {
        display: block;
        border: none;
        //outline: 1px solid #e8e8e8;
        width: 375px;
        height: 630px;
        overflow: hidden;
        border: none;
        padding: 0;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>
