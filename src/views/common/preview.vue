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
        <iframe allowtransparency="yes" src="https://yangyuji.github.io/h5-factory/static/preview/index.html"></iframe>

        <div class="pre-desc">
          <h3 style="color:red;">预览说明：</h3>
          <p>1、部分组件尚未实现预览；</p>
          <p>2、组件尚未点击效果；</p>
          <p>3、预览仅供参考，不代表真机效果；</p>
          <p>4、反对伸手党，本开源仅作为项目参考，可以在此基础上开发自己的组件，即：自己生产数据，自己消费数据；</p>
        </div>
      </el-col>
    </el-row>
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

      .pre-desc {
        position: absolute;
        left: 110%;
        top: 20%;
        width: 180px;
        height: 250px;
        padding: 10px;
        background-color: #fff;

        > p {
          margin: 0;
          text-align: left;
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
