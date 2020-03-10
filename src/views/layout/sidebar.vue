<template>
  <div class="app-sidebar">
    <div class="sidebar-menu-group" v-for="(menu, index) in menuData">
      <div class="menu-group-title" @click="menu.collapse = !menu.collapse">
        {{menu.title}}
        <i :class="[!menu.collapse ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline']"></i>
      </div>
      <el-collapse-transition>
        <div v-show="!menu.collapse" class="menu-group-list">
          <div class="menu-item"
               :data-key="item.key"
               draggable="true"
               @dragstart="menuDrag($event, item.key)"
               v-for="item in menu.items">
            <div class="item-icon-box">
              <i :class="['fa', item.icon]" aria-hidden="true"></i>
            </div>
            <p class="item-text-box">{{item.text}}</p>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  // 左侧菜单配置
  import menuConfig from '@/config/menu.config.js'
  export default {
    name: 'AppSide',
    data() {
      return {
        menuData: menuConfig
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
  width: 290px;
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

  .sidebar-menu-group {
    position: relative;

    .menu-group-title {
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
    .menu-group-list {
      overflow: hidden;

      .menu-item {
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
/* @media screen and (max-width: 1440px) {
  .app-sidebar {
    width: 100px;
    padding: 10px;

    .sidebar-menu-group {
      width: 80px;

      .menu-group-title i {
        right: 0;
      }
      .menu-group-list {
        .menu-item {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
} */
</style>
