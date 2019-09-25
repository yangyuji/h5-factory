<template>
  <div>
    <template v-if="scrolls && scrolls.length">
      <div class="form-list-panel" v-for="(item, idx) in scrolls">
        <upload :label="'图片' + (idx + 1)"
                :index="idx"
                :item="item">
        </upload>
        <template v-if="item.click">
          <el-form-item class="small" label="跳转到：">
            <span style="word-break: break-all;">{{item.click.href}}</span>
          </el-form-item>
        </template>
        <el-form-item class="small" label="点击配置：">
          <el-button icon="el-icon-edit" round @click="showClick(item, idx)">配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0"
             @click="upItem(idx)"><i class="el-icon-arrow-up"></i></a>
          <a href="javascript:;" v-if="idx !== scrolls.length - 1"
             @click="downItem(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delItem(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加滚动项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import upload from '@/components/upload.vue'
  export default {
    data() {
      return {
        defaultConf: util.copyObj(compConfig['scroll-left']),
        scrolls: this.items
      }
    },
    components: {
      upload
    },
    props: {
      items: {
        type: Array
      }
    },
    watch: {
      items: {
        handler(val) {
          this.scrolls = val
        },
        deep: true
      }
    },
    methods: {
      showClick(banner, idx) {
        this.$bus.$emit('click:show', idx, ['outside'])
      },
      upItem(idx) {
        const tmp = util.copyObj(this.scrolls[idx])
        this.scrolls.splice(idx, 1)
        this.scrolls.splice(idx - 1, 0, tmp)
      },
      downItem(idx) {
        const tmp = util.copyObj(this.scrolls[idx])
        this.scrolls.splice(idx, 1)
        this.scrolls.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.scrolls.splice(idx, 1)
      },
      addItem() {
        if (this.scrolls.length < 10) {
          this.scrolls.push(util.copyObj(this.defaultConf.action.config[0]))
        } else {
          this.$alert('最多添加10个图片项！')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
