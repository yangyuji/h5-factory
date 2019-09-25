<template>
  <div>
    <template v-if="grids && grids.length">
      <div class="form-list-panel" v-for="(item, idx) in grids">
        <upload :label="'图片' + (idx + 1)"
                :index="idx"
                :item="item">
        </upload>
        <el-form-item class="small" label="文案：">
          <el-input v-model="item.text" :maxlength="12" placeholder="导航文案"></el-input>
        </el-form-item>
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
          <a href="javascript:;" v-if="idx !== grids.length - 1"
             @click="downItem(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delItem(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加点击项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import upload from '@/components/upload.vue'
  export default {
    data() {
      return {
        defaultConf: util.copyObj(compConfig['grid-menu']),
        grids: this.items
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
          this.grids = val
        },
        deep: true
      }
    },
    methods: {
      showClick(banner, idx) {
        this.$bus.$emit('click:show', idx, ['outside'])
      },
      upItem(idx) {
        const tmp = util.copyObj(this.grids[idx])
        this.grids.splice(idx, 1)
        this.grids.splice(idx - 1, 0, tmp)
      },
      downItem(idx) {
        const tmp = util.copyObj(this.grids[idx])
        this.grids.splice(idx, 1)
        this.grids.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.grids.splice(idx, 1)
      },
      addItem() {
        if (this.grids.length < 10) {
          this.grids.push(util.copyObj(this.defaultConf.action.config[0]))
        } else {
          this.$alert('最多添加10个点击项！')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
