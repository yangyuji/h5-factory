/* const typeMap = {
  'text': '纯文本输入框',
  'input-number': '纯数字输入框',
  'font': '字体样式',
  'upload': '图片上传控件',
  'select': '下拉选择',
  'radio': 'Radio单选',
  'datetime': '日期时间选择器',
  'color-picker': '颜色拾取器',
  'desc': '描述文本内容'
} */

module.exports = {
  text: {
    title: '文本',
    domId: '',
    domName: '',
    base: [
      {
        type: 'textarea',
        label: '文本内容',
        val: '默认文本',
        isNecessary: true
      }
    ],
    style: [
      {
        type: 'font',
        label: '字体',
        attr: ['font-weight', 'text-decoration', 'font-style', 'text-align'],
        val: ['400', 'none', 'inherit', 'left'],
        isNecessary: false
      }, {
        type: 'color-picker',
        label: '字体颜色',
        attr: 'color',
        val: '#333333',
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器高度',
        attr: 'height',
        val: '',
        unit: 'px',
        isNecessary: false
      }, {
        type: 'upload',
        label: '背景图',
        attr: 'background-image',
        val: '',
        isNecessary: false
      }, {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '',
        isNecessary: false
      }, {
        type: 'select',
        label: '背景尺寸',
        attr: 'background-size',
        val: 'contain',
        options: [
          {
            name: '无',
            val: 'inherit'
          }, {
            name: '宽高裁剪',
            val: 'cover'
          }, {
            name: '宽高自适应',
            val: 'contain'
          }
        ]
      }, {
        type: 'input-number',
        label: '大小',
        attr: 'font-size',
        val: 24,
        unit: 'px',
        step: 1,
        max: 200,
        min: 20,
        isNecessary: false
      }, {
        type: 'input-number',
        label: '行距',
        attr: 'line-height',
        val: 1.5,
        step: 0.5,
        max: 12,
        min: 0.5,
        isNecessary: false
      }, {
        type: 'input-number',
        label: '字间距',
        attr: 'letter-spacing',
        val: 0,
        step: 1,
        max: 100,
        min: 0,
        unit: 'px',
        isNecessary: false
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 20,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 30,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 20,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 30,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }
    ]
  },
  img: {
    title: '图片',
    domId: '',
    domName: '',
    style: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '',
        isNecessary: false
      }, {
        type: 'upload',
        label: '上传图片',
        attr: 'src',
        val: '',
        /* limit: {
          w: 750,
          h: 200,
          s: 500
        },*/
        isNecessary: true
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }
    ],
    action: {
      type: 'image-click',
      title: '点击区域配置',
      config: null
    }
  },
  form: {
    title: '表单',
    domId: '',
    domName: '',
    base: [
      {
        type: 'text',
        label: '提交地址',
        val: '',
        placeholder: '表单提交的接口地址',
        isNecessary: true
      }, {
        type: 'radio',
        label: '提交方式',
        val: 'POST',
        options: [{
          name: 'GET',
          val: 'GET'
        }, {
          name: 'POST',
          val: 'POST'
        }],
        isNecessary: true
      }
    ],
    style: [
      {
        type: 'input-number',
        label: '容器高度',
        attr: 'height',
        val: '',
        unit: 'px',
        isNecessary: false
      }, {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '',
        isNecessary: false
      }, {
        type: 'upload',
        label: '背景图片',
        attr: 'background-image',
        val: '',
        isNecessary: true
      }, {
        type: 'select',
        label: '背景尺寸',
        attr: 'background-size',
        val: 'contain',
        options: [
          {
            name: '无',
            val: 'inherit'
          }, {
            name: '宽高裁剪',
            val: 'cover'
          }, {
            name: '宽高自适应',
            val: 'contain'
          }
        ]
      }, {
        type: 'input-number',
        label: '字体大小',
        attr: 'font-size',
        val: 24,
        unit: 'px',
        step: 1,
        max: 200,
        min: 20,
        isNecessary: false
      }, {
        type: 'color-picker',
        label: '字体颜色',
        attr: 'color',
        val: '#333333',
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器上白',
        attr: 'padding-top',
        val: 20,
        unit: 'px',
        min: 0,
        max: 200,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器右白',
        attr: 'padding-right',
        val: 30,
        unit: 'px',
        min: 0,
        max: 200,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器下白',
        attr: 'padding-bottom',
        val: 20,
        unit: 'px',
        min: 0,
        max: 200,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器左白',
        attr: 'padding-left',
        val: 30,
        unit: 'px',
        min: 0,
        max: 200,
        step: 1,
        isNecessary: true
      }
    ],
    others: {
      type: 'form-item',
      title: '表单样式',
      config: [
        {
          type: 'input-number',
          label: 'label宽度',
          attr: 'form-label_width',
          val: 120,
          unit: 'px',
          min: 0,
          max: 300,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: 'input高度',
          attr: 'form-input_height',
          val: 48,
          unit: 'px',
          min: 0,
          max: 300,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: 'input圆角',
          attr: 'form-input_border-radius',
          val: 0,
          unit: 'px',
          min: 0,
          max: 100,
          step: 1,
          isNecessary: true
        }, {
          type: 'color-picker',
          label: 'input边框',
          attr: 'form-input_border-color',
          val: '#e8e8e8',
          unit: '',
          isNecessary: true
        }, {
          type: 'input-number',
          label: 'input间距',
          attr: 'form-item_margin-top',
          val: 20,
          unit: 'px',
          min: 0,
          max: 300,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮距上',
          attr: 'form-btn_margin-top',
          val: 30,
          unit: 'px',
          min: 0,
          max: 200,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮高度',
          attr: 'form-btn_height',
          val: 60,
          unit: 'px',
          min: 0,
          max: 200,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮宽度',
          attr: 'form-btn_width',
          val: 100,
          unit: '%',
          min: 0,
          max: 100,
          step: 1,
          isNecessary: true
        }, {
          type: 'color-picker',
          label: '按钮背景',
          attr: 'form-btn_background-color',
          val: '#409eff',
          unit: '',
          isNecessary: true
        }, {
          type: 'color-picker',
          label: '按钮边框',
          attr: 'form-btn_border-color',
          val: '#057ED5',
          unit: '',
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮圆角',
          attr: 'form-btn_border-radius',
          val: 5,
          unit: 'px',
          min: 0,
          max: 100,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮字体',
          attr: 'form-btn_font-size',
          val: 28,
          unit: 'px',
          min: 20,
          max: 200,
          step: 1,
          isNecessary: true
        }, {
          type: 'color-picker',
          label: '按钮字色',
          attr: 'form-btn_color',
          val: '#fff',
          unit: '',
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮字重',
          attr: 'form-btn_font-weight',
          val: 500,
          unit: '',
          min: 100,
          max: 900,
          step: 100,
          isNecessary: true
        }
      ]
    },
    action: {
      type: 'form-submit',
      title: '表单项配置',
      config: [{
        desc: '字段描述：',
        type: 'text',
        name: 'name',
        placeholder: '',
        isNecessary: 1
      }]
    }
  },
  'swiper-banner': {
    title: '轮播图',
    domId: '',
    domName: '',
    assert: {
      script: 'https://cdn.bootcss.com/Swiper/4.5.0/js/swiper.min.js',
      style: 'https://cdn.bootcss.com/Swiper/4.5.0/css/swiper.min.css'
    },
    style: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: 'rgba(255, 255, 255, 0)',
        isNecessary: true
      }, {
        type: 'radio',
        label: '自动播放',
        attr: 'autoplay',
        val: true,
        options: [{
          name: '是',
          val: true
        }, {
          name: '否',
          val: false
        }],
        isNecessary: false
      }, {
        type: 'radio',
        label: '显示分页',
        attr: 'pagination',
        val: true,
        options: [{
          name: '是',
          val: true
        }, {
          name: '否',
          val: false
        }],
        isNecessary: false
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 0,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }
    ],
    action: {
      type: 'swiper-click',
      title: '图片项配置',
      config: [{
        val: '',
        link: ''
      }]
    }
  },
  'scroll-left': {
    title: '横向滚动',
    domId: '',
    domName: '',
    assert: {
      script: 'https://cdn.bootcss.com/iScroll/5.2.0/iscroll.min.js'
    },
    style: [
      {
        type: 'select',
        label: '样式风格',
        attr: 'theme',
        val: 'scroll-x',
        options: [
          {
            name: '滚动条不连续',
            val: 'scroll-x'
          }, {
            name: '无滚动条连续',
            val: 'no-scroll'
          }
        ]
      }, {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '',
        isNecessary: false
      }
    ],
    action: {
      type: 'left-scroll-click',
      title: '滚动项配置',
      config: [
        {
          val: '',
          text: '',
          link: ''
        }
      ]
    }
  }
}
