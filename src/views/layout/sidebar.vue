<template>
  <div class="app-sidebar">
    <div class="sidebar-memu-group" v-for="(memu, index) in memuData">

      <div class="memu-group-title">
        {{memu.title}}
        <i class="el-icon-remove"></i>
      </div>
      <div class="memu-group-list" id="Contros">
        <div class="memu-item"
             :data-key="item.key"
             draggable="true"
             @dragstart="menuDrag($event, item.key)"
             v-for="item in memu.items">
          <div class="item-icon-box">
            <i :class="['fa', item.icon]" aria-hidden="true"></i>
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
    },
    methods: {
      menuDrag(e, key) {
        e.dataTransfer.setData('cmp-type', key)
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

  &::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.1);
  }

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

        .item-icon-box {
          text-align: center;
          margin-top: 18px;
          height: 32px;

          > .fa {
            font-size: 24px;
            color: #409eff;
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
@media screen and (max-width: 1440px) {
  .app-sidebar {
    width: 100px;
    padding: 10px;

    .sidebar-memu-group {
      width: 80px;

      .memu-group-title i {
        right: 0;
      }
      .memu-group-list {
        .memu-item {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>
