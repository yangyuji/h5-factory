<template>
  <div>
    <template v-if="menus && menus.length">
      <div class="form-list-panel" v-for="(item, idx) in menus">
        <el-form-item class="small" label="导航文案：">
          <el-input v-model="item.text" :maxlength="500" placeholder="跳转项文案"></el-input>
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
          <a href="javascript:;" v-if="idx !== menus.length - 1"
             @click="downItem(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delItem(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加跳转项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  export default {
    data() {
      return {
        defaultConf: util.copyObj(compConfig['floor-menu']),
        menus: this.items
      }
    },
    props: {
      items: {
        type: Array
      }
    },
    watch: {
      items: {
        handler(val) {
          this.menus = val
        },
        deep: true
      }
    },
    methods: {
      showClick(banner, idx) {
        this.$bus.$emit('click:show', idx, ['page'])
      },
      upItem(idx) {
        const tmp = util.copyObj(this.menus[idx])
        this.menus.splice(idx, 1)
        this.menus.splice(idx - 1, 0, tmp)
      },
      downItem(idx) {
        const tmp = util.copyObj(this.menus[idx])
        this.menus.splice(idx, 1)
        this.menus.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.menus.splice(idx, 1)
      },
      addItem() {
        if (this.menus.length < 18) {
          this.menus.push(util.copyObj(this.defaultConf.action.config[0]))
        } else {
          this.$alert('最多添加18个导航项！')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
