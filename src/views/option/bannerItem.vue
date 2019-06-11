<template>
  <div>
    <template v-if="slides && slides.length">
      <div class="form-list-panel" v-for="(slide, idx) in slides">
        <upload :label="'图片' + (idx + 1)"
                :index="idx"
                :item="slide"
                v-on:uploadSuccess="uploadSuccess">
        </upload>
        <template v-if="slide.click">
          <el-form-item class="small" label="跳转到：">
            <span style="word-break: break-all;">{{slide.click.href}}</span>
          </el-form-item>
        </template>
        <el-form-item class="small" label="点击配置：">
          <el-button icon="el-icon-edit" round @click="showClick(slide, idx)">配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0"
             @click="upBanner(idx)"><i class="el-icon-arrow-up"></i></a>
          <a href="javascript:;" v-if="idx !== slides.length - 1"
             @click="downBanner(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delBanner(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addBanner">添加图片项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import upload from '@/components/upload.vue'
  export default {
    data() {
      return {
        defaultConf: util.copyObj(compConfig['swiper-banner']),
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
    watch: {
      banners: {
        handler(val) {
          this.slides = val
        },
        deep: true
      }
    },
    methods: {
      showClick(banner, idx) {
        // 轮播图只可配置外链
        this.$bus.$emit('click:show', idx, ['outside'])
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
          this.slides.push(util.copyObj(this.defaultConf.action.config[0]))
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

</style>
