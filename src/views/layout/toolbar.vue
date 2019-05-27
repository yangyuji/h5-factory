<template>
  <el-row class="app-toolbar">
    <el-col :span="12">
      <span><i class="fa fa-mobile-phone"></i> 当前适配屏幕：750px</span>
    </el-col>
    <el-col :span="12">
      <div class="bar-btn" @click="saveAll()">
        <i class="el-icon-edit"></i>
        <span>保存</span>
      </div>
      <div class="bar-btn" @click="showPreview()">
        <i class="el-icon-view"></i>
        <span>预览</span>
      </div>
      <div class="bar-btn" @click="showPageSet">
        <i class="el-icon-setting"></i>
        <span>页面设置</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'AppToolbar',
    methods: {
      showPageSet() {
        this.$emit('showPageSet')
      },
      showPreview() {
        this.$emit('showPreview')
      },
      saveAll() {
        this.$emit('savePageSet')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-toolbar {
    position: relative;
    height: 40px;
    line-height: 38px;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    padding-left: 15px;

    > :last-child {
      text-align: right;
    }

    .bar-btn {
      display: inline-block;
      white-space: nowrap;
      padding: 0 16px;
      font-size: 14px;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      cursor: pointer;

      &:hover {
        background-color: #e8e8e8;
      }
    }
  }
</style>
