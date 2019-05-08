<template>
  <div>
    <template v-if="slides && slides.length">
      <div class="form-list-panel" v-for="(slide, idx) in slides">
        <upload :label="'图片' + (idx + 1)"
                :index="idx"
                :item="slide"
                v-on:uploadSuccess="uploadSuccess">
        </upload>
        <template v-if="slide.link">
          <el-form-item class="small" label="跳转到：">
            <span style="word-break: break-all;">{{slide.link.val}}</span>
          </el-form-item>
        </template>
        <el-form-item class="small" label="点击配置：">
          <el-button icon="el-icon-edit" round @click="showClick()">配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0"
             @click="upBanner(idx)"><i class="el-icon-arrow-up"></i>上移</a>
          <a href="javascript:;" v-if="idx !== slides.length - 1"
             @click="downBanner(idx)"><i class="el-icon-arrow-down"></i>下移</a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delBanner(idx)"><i class="el-icon-delete"></i>删除</a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addBanner">添加图片项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import upload from '@/components/upload.vue'
  export default {
    data() {
      return {
        slides: this.banners
      }
    },
    components: {
      upload
    },
    props: {
      banners: {
        type: Array
      }
    },
    methods: {
      showClick(banner, idx) {
        this.$bus.$emit('click:show', 'bannerImageClick', idx, banner)
      },
      upBanner(idx) {
        const tmp = util.copyObj(this.slides[idx])
        this.slides.splice(idx, 1)
        this.slides.splice(idx - 1, 0, tmp)
      },
      downBanner(idx) {
        const tmp = util.copyObj(this.slides[idx])
        this.slides.splice(idx, 1)
        this.slides.splice(idx + 1, 0, tmp)
      },
      delBanner(idx) {
        this.slides.splice(idx, 1)
      },
      addBanner() {
        if (this.slides.length < 10) {
          this.slides.push({
            val: '',
            link: ''
          })
        } else {
          this.$alert('最多添加10个图片项！')
        }
      },
      uploadSuccess(item, img, idx) {
        console.log('uploadSuccess', item)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .form-list-panel {
    margin-top: 15px;
    border: 1px solid #dbdbdb;
    padding: 15px 15px 10px 15px;

    &:first-child {
       margin-top: 0;
     }

    .list-item-opt {
      text-align: right;

      > a {
        margin-left: 10px;
        color: #2aa7ff;
        font-size: 12px;
      }
    }
  }
</style>
