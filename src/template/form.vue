<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="style">
    <div class="form-box">
      <div class="form-box-item"
           :style="{marginTop: component.others.config[4].val + 'px'}"
           v-if="inputs.length" v-for="input in inputs">
        <label :style="labelStyle">{{input.desc}}</label>
        <input class="item-input" v-if="input.type !== 'select'"
               :style="inputStyle"
               :type="input.type"
               :placeholder="input.placeholder ? input.placeholder : input.isNecessary ? '必填' : '非必填'">
        <select class="item-input" v-else>
          <option></option>
        </select>
      </div>
      <div v-else class="image-placeholder"><i class="fa fa-list"></i></div>
      <div class="form-btn" :style="buttonStyle">提 交</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        style: this.getStyle(),
        labelStyle: this.getLabelStyle(),
        inputStyle: this.getInputStyle(),
        buttonStyle: this.getButtonStyle(),
        inputs: this.component.action.config
      }
    },
    methods: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          if (item.val) {
            if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              const unit = item.unit || ''
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      },
      getLabelStyle() {
        console.log(this.component.others.config.length)
        const ret = [
          'width:' + this.component.others.config[0].val + 'px',
          'height:' + this.component.others.config[1].val + 'px',
          'line-height:' + this.component.others.config[1].val + 'px'
        ]
        return ret.join(';')
      },
      getInputStyle() {
        const ret = []
        this.component.others.config.forEach((item) => {
          const isInput = item.attr.indexOf('form-input_')
          const idx = item.attr.indexOf('_')
          if (isInput === 0) {
            const unit = item.unit || ''
            item.val && ret.push(item.attr.substring(idx + 1, item.attr.length) + ':' + item.val + unit)
          }
        })
        return ret.join(';')
      },
      getButtonStyle() {
        const ret = []
        this.component.others.config.forEach((item) => {
          const isInput = item.attr.indexOf('form-btn_')
          const idx = item.attr.indexOf('_')
          if (isInput === 0) {
            const unit = item.unit || ''
            const attr = item.attr.substring(idx + 1, item.attr.length)
            item.val && ret.push(attr + ':' + item.val + unit)
            attr === 'height' && ret.push('line-height:' + item.val + unit)
          }
        })
        return ret.join(';')
      }
    },
    watch: {
      component: {
        handler() {
          this.style = this.getStyle()
          this.labelStyle = this.getLabelStyle()
          this.inputStyle = this.getInputStyle()
          this.buttonStyle = this.getButtonStyle()
          this.inputs = this.component.action.config
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .form-box {
    position: relative;
    overflow: hidden;

    .image-placeholder {
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;

      > .fa {
        color: #83c0ff;
        font-size: 40px;
      }
    }

    .form-box-item {
      display: flex;

      > label {
        display: block;
      }

      .item-input {
        flex: 1;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid;
        outline: 0;
      }
    }

    .form-btn {
      box-sizing: border-box;
      border: 1px solid;
      text-align: center;
    }
  }
</style>
