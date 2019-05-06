<template>
  <div class="app-option">
    <el-form ref="options-form" label-width="70px" size="mini">

      <h2>【{{option.title}}】</h2>
      <el-form-item class="small" label="组件编号：">
        <span>{{option.domId}}</span>
      </el-form-item>
      <el-form-item class="small" label="组件名称：">
        <el-input v-model="option.domName"
                  maxlength="30"
                  placeholder="非必填，页内跳转配置使用"></el-input>
      </el-form-item>

      <template v-if="option.base && option.base.length">
        <template v-for="(item, idx) in option.base">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.style && option.style.length">
        <h3><i class="el-icon-setting"></i> 样式配置</h3>
        <template v-for="(item, idx) in option.style">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.action">
        <h3><i class="el-icon-setting"></i> {{option.action.title}}</h3>

        <template v-if="option.type === 'img'">
          <image-click :show.sync="imageClickShow"
                      :img="getImage"></image-click>
          <el-button icon="el-icon-plus" round @click="showImageClick">配置点击</el-button>
        </template>

      </template>

    </el-form>
  </div>
</template>

<script>
  import formItem from '@/components/formItem.vue'
  import imageClick from '@/views/dialog/imageClick.vue'
  export default {
    name: 'AppOption',
    data() {
      return {
        imageClickShow: false
      }
    },
    components: {
      formItem,
      imageClick
    },
    computed: {
      getImage() {
        return this.option.style[1].val
      }
    },
    props: {
      option: {
        type: Object
      }
    },
    mounted() {
      this.$bus.$on('option-click:submit', (type, idx) => {
        this.imageClickShow = false
        console.log(type)
      })
      this.$bus.$on('option-click:cancel', () => {
        this.imageClickShow = false
      })
    },
    methods: {
      showImageClick() {
        this.imageClickShow = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.app-option {
  width: 260px;
  padding: 0 10px;
  overflow: auto;
  border-left: 1px solid #e8e8e8;

  h2 {
    margin: 13px 0;
    font-size: 14px;
  }

  .el-form {
    padding-bottom: 30px;

    > h3 {
      background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }

    .el-form-item.small {
      margin-bottom: 5px;

      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }

      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .el-textarea__inner {
        padding: 5px 10px;
      }

      .el-form-item__label {
        padding-right: 0;
      }
    }
  }
}
</style>
