<template>
  <div class="app-sidebar">
    <div class="sidebar-memu-group" v-for="(memu, index) in memuData">

      <div class="memu-group-title">
        {{memu.title}}
        <i class="el-icon-remove"></i>
      </div>
      <div class="memu-group-list" id="Contros">
        <div class="memu-item" :data-key="item.key"
             v-for="item in memu.items">
          <div class="item-img-box">
            <img :src="item.img" :alt="item.text">
          </div>
          <p class="item-text-box">{{item.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 左侧菜单配置，#9ecaff
  import menuConfig from '@/config/menu.config.js'
  export default {
    name: 'AppSide',
    data() {
      return {
        memuData: menuConfig
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-sidebar {
  width: 200px;
  border-right: 1px solid #e8e8e8;
  padding-left: 14px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  .sidebar-memu-group {
    position: relative;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }

    .memu-group-title {
      position: relative;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      font-size: 14px;

      > i {
        position: absolute;
        right: 12px;
        top: 14px;
        color: #999;
      }
    }
    .memu-group-list {
      overflow: hidden;
      transition: height 400ms ease;

      .memu-item {
        position: relative;
        box-sizing: content-box;
        float: left;
        width: 85px;
        height: 85px;
        background: #f4f5f6;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        z-index: 0;

        &:hover {
          opacity: .6;
        }

        &:nth-child(2n) {
          border-right: 0;
        }

        .item-img-box {
          text-align: center;
          margin-top: 18px;
          height: 32px;

          > img {
            height: 32px;
            width: 32px;
          }
        }
        .item-text-box {
          text-align: center;
          height: 20px;
          line-height: 20px;
          margin: 0;
          font-size: 12px;
        }
      }
    }
  }
}
.memu-moving {
  position: absolute;
  box-sizing: content-box;
  width: 60px;
  height: 60px;
  background: #fff;
  opacity: .6;
  cursor: pointer;
  z-index: 1000;

  .moving-img-box {
    text-align: center;
    margin-top: 6px;
    height: 32px;
    img {
      height: 32px;
      width: 32px;
    }
  }
  .moving-text-box {
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin: 0;
    font-size: 12px;
  }
}
</style>
