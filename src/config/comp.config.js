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
        label: '字体大小',
        attr: 'font-size',
        val: 12,
        unit: 'px',
        step: 1,
        max: 100,
        min: 10,
        isNecessary: false
      }, {
        type: 'input-number',
        label: '文本行距',
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
        max: 50,
        min: 0,
        unit: 'px',
        isNecessary: false
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
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
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    action: {
      type: 'image-click',
      title: '点击区域配置',
      config: [{
        index: 0,
        x: 0,
        y: 0,
        w: 225,
        h: 64,
        click: null
      }]
    }
  },
  form: {
    title: '表单',
    domId: '',
    domName: '',
    assert: {
      script: ['./js/form/form.min.js'],
      style: ['./js/form/form.min.css']
    },
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
        val: 12,
        unit: 'px',
        step: 1,
        max: 100,
        min: 10,
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
        val: 10,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器右白',
        attr: 'padding-right',
        val: 15,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器下白',
        attr: 'padding-bottom',
        val: 10,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器左白',
        attr: 'padding-left',
        val: 15,
        unit: 'px',
        min: 0,
        max: 100,
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
          val: 60,
          unit: 'px',
          min: 0,
          max: 150,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: 'input高度',
          attr: 'form-input_height',
          val: 24,
          unit: 'px',
          min: 0,
          max: 150,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: 'input圆角',
          attr: 'form-input_border-radius',
          val: 0,
          unit: 'px',
          min: 0,
          max: 50,
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
          val: 10,
          unit: 'px',
          min: 0,
          max: 150,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮距上',
          attr: 'form-btn_margin-top',
          val: 15,
          unit: 'px',
          min: 0,
          max: 100,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮高度',
          attr: 'form-btn_height',
          val: 30,
          unit: 'px',
          min: 0,
          max: 100,
          step: 2,
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
          val: 2.5,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '按钮字体',
          attr: 'form-btn_font-size',
          val: 14,
          unit: 'px',
          min: 10,
          max: 100,
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
      script: ['./js/swiper/swiper.min.js'],
      style: ['./js/swiper/swiper.min.css']
    },
    base: [
      {
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
      }
    ],
    style: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: 'rgba(255, 255, 255, 0)',
        isNecessary: true
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    action: {
      type: 'swiper-click',
      title: '图片项配置',
      config: [{
        val: '',
        click: null
      }]
    }
  },
  'floor-menu': {
    title: '楼层导航',
    domId: '',
    domName: '',
    assert: {
      script: ['./js/libs/iscroll.min.js', './js/body/floor-menu.js']
    },
    style: [
      {
        type: 'color-picker',
        label: '默认背景',
        attr: 'background-color',
        val: '#ffffff',
        isNecessary: true
      }, {
        type: 'color-picker',
        label: '选中背景',
        attr: 'background-color:hover',
        val: '#ffffff',
        isNecessary: true
      }, {
        type: 'color-picker',
        label: '默认字体',
        attr: 'color',
        val: '#4a4a4a',
        isNecessary: true
      }, {
        type: 'color-picker',
        label: '选中字体',
        attr: 'color:hover',
        val: '#D0021B',
        isNecessary: true
      }
    ],
    action: {
      type: 'floor-menu-click',
      title: '导航项配置',
      config: [{
        text: '默认项1',
        click: null
      }]
    }
  },
  'scroll-left': {
    title: '横向滚动',
    domId: '',
    domName: '',
    assert: {
      script: ['./js/libs/iscroll.min.js', './js/body/scroll-left.js']
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
          click: null
        }
      ]
    }
  },
  'timeout': {
    title: '倒计时',
    domId: '',
    domName: '',
    assert: {
      script: ['./js/body/timeout.js']
    },
    style: [
      {
        type: 'datetime',
        label: '截止时间',
        attr: 'end-time',
        val: '',
        isNecessary: true
      }, {
        type: 'upload',
        label: '背景图片',
        attr: 'background-image',
        val: '',
        isNecessary: true
      }
    ],
    action: {
      type: 'timeout-click',
      title: '倒计时配置',
      config: [
        {
          show: true,
          x: 0,
          y: 0,
          w: 40,
          h: 40,
          font: 16,
          weight: 400,
          color: '#333'
        }, {
          show: true,
          x: 50,
          y: 0,
          w: 40,
          h: 40,
          font: 16,
          weight: 400,
          color: '#333'
        }, {
          show: true,
          x: 100,
          y: 0,
          w: 40,
          h: 40,
          font: 16,
          weight: 400,
          color: '#333'
        }, {
          show: true,
          x: 150,
          y: 0,
          w: 40,
          h: 40,
          font: 16,
          weight: 400,
          color: '#333'
        }
      ]
    }
  },
  'news-marquee': {
    title: '倒计时',
    domId: '',
    domName: '',
    assert: {
      script: ['./js/body/new-marquee.js']
    },
    style: [
      {
        type: 'radio',
        label: '是否连续',
        attr: 'goon',
        val: false,
        options: [
          {
            name: '连续',
            val: true
          }, {
            name: '不连续',
            val: false
          }
        ]
      }, {
        type: 'upload',
        label: '背景图片',
        attr: 'background-image',
        val: '',
        isNecessary: true
      }, {
        type: 'input-number',
        label: '容器高度',
        attr: 'height',
        val: 40,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '字体大小',
        attr: 'font-size',
        val: 12,
        unit: 'px',
        min: 0,
        max: 60,
        step: 1,
        isNecessary: true
      }, {
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
      }
    ],
    action: {
      type: 'marquee-click',
      title: '滚动项配置',
      config: [{
        text: '滚动新闻默认文本',
        click: null
      }]
    }
  },
  'grid-menu': {
    title: '金刚位',
    domId: '',
    domName: '',
    base: [
      {
        type: 'input-number',
        label: '最大列数',
        attr: 'grid-column',
        val: 4,
        unit: '',
        min: 2,
        max: 5,
        step: 1,
        isNecessary: true
      }
    ],
    style: [
      {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 0,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'color-picker',
        label: '字体颜色',
        attr: 'color',
        val: '#333333',
        isNecessary: true
      }
    ],
    action: {
      type: 'grid-menu-click',
      title: '点击项配置',
      config: [
        {
          val: '',
          text: '导航项一',
          click: null
        }, {
          val: '',
          text: '导航项二',
          click: null
        }
      ]
    }
  },
  'bottom-menu': {
    title: '底部导航',
    domId: '',
    domName: '',
    style: [
      {
        type: 'input-number',
        label: '容器高度',
        attr: 'height',
        val: 40,
        unit: 'px',
        min: 0,
        max: 100,
        step: 1,
        isNecessary: false
      }, {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '#ffffff',
        isNecessary: false
      }
    ],
    action: {
      type: 'bottom-menu-click',
      title: '点击项配置',
      config: [{
        val: '',
        click: null
      }]
    }
  },
  'page-title': {
    title: '页面标题',
    domId: '',
    domName: '',
    base: [
      {
        type: 'text',
        label: '主标题',
        val: '主标题文案',
        isNecessary: true
      }, {
        type: 'text',
        label: '副标题',
        val: '副标题文案 - 作者 - 2019.09.09',
        isNecessary: false
      }
    ],
    style: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '#ffffff',
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
        val: 20,
        unit: 'px',
        min: 0,
        max: 50,
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
        val: 20,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    others: {
      type: 'page-title-style',
      title: '标题样式',
      config: [
        {
          type: 'font',
          label: '主标字体',
          attr: ['font-weight', 'text-decoration', 'font-style', 'text-align'],
          val: ['600', 'none', 'inherit', 'left'],
          isNecessary: false
        }, {
          type: 'input-number',
          label: '主标大小',
          attr: 'font-size',
          val: 16,
          unit: 'px',
          step: 1,
          max: 100,
          min: 10,
          isNecessary: false
        }, {
          type: 'color-picker',
          label: '主标颜色',
          attr: 'color',
          val: '#333333',
          isNecessary: true
        }, {
          type: 'input-number',
          label: '主标字距',
          attr: 'letter-spacing',
          val: 0,
          step: 1,
          max: 20,
          min: 0,
          unit: 'px',
          isNecessary: false
        }, {
          type: 'font',
          label: '副标字体',
          attr: ['font-weight', 'text-decoration', 'font-style', 'text-align'],
          val: ['400', 'none', 'inherit', 'left'],
          isNecessary: false
        }, {
          type: 'input-number',
          label: '副标大小',
          attr: 'font-size',
          val: 12,
          unit: 'px',
          step: 1,
          max: 100,
          min: 10,
          isNecessary: false
        }, {
          type: 'color-picker',
          label: '副标颜色',
          attr: 'color',
          val: '#666666',
          isNecessary: true
        }, {
          type: 'input-number',
          label: '副标字距',
          attr: 'letter-spacing',
          val: 0,
          step: 1,
          max: 10,
          min: 0,
          unit: 'px',
          isNecessary: false
        }, {
          type: 'input-number',
          label: '副标上距',
          attr: 'margin-top',
          val: 10,
          step: 1,
          max: 100,
          min: 0,
          unit: 'px',
          isNecessary: false
        }
      ]
    }
  },
  'page-paragraph': {
    title: '段落模块',
    domId: '',
    domName: '',
    base: [
      {
        type: 'select',
        label: '标题风格',
        attr: 'theme',
        val: 'theme-1',
        options: [
          {
            name: '风格一',
            val: 'theme-1'
          }, {
            name: '风格二',
            val: 'theme-2'
          }
        ]
      }, {
        type: 'text',
        label: '标题文案',
        val: '标题',
        isNecessary: true
      }
    ],
    style: [
      /* {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '#ffffff',
        isNecessary: false
      },*/ {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 0,
        unit: 'px',
        min: 10,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    action: {
      type: 'page-paragraph-list',
      title: '段落项',
      config: [{
        label: '1、',
        content: 'H5制作工厂是一个移动端页面设计和制作平台，无需任何开发经营也可以制作自己的移动端站点和页面，从灵感到实现，您只需要10分钟。'
      }]
    }
  },
  'page-intro': {
    title: '页面引言',
    domId: '',
    domName: '',
    base: [
      {
        type: 'textarea',
        label: '文本内容',
        val: 'H5制作工厂是一个移动端页面设计和制作平台，无需任何开发经营也可以制作自己的移动端站点和页面，从灵感到实现，您只需要10分钟。',
        isNecessary: true
      }
    ],
    style: [
      {
        type: 'color-picker',
        label: '字体颜色',
        attr: 'color',
        val: '#999999',
        isNecessary: true
      }, {
        type: 'input-number',
        label: '字体大小',
        attr: 'font-size',
        val: 12,
        unit: 'px',
        step: 1,
        max: 100,
        min: 10,
        isNecessary: false
      }, {
        type: 'input-number',
        label: '文本行距',
        attr: 'line-height',
        val: 1.5,
        step: 0.5,
        max: 12,
        min: 0.5,
        isNecessary: false
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ]
  },
  'page-faq': {
    title: '页面FAQ',
    domId: '',
    domName: '',
    style: [
      {
        type: 'input-number',
        label: '字体大小',
        attr: 'font-size',
        val: 12,
        unit: 'px',
        step: 1,
        max: 100,
        min: 10,
        isNecessary: false
      }, {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右边距',
        attr: 'padding-right',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下边距',
        attr: 'padding-bottom',
        val: 10,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '左边距',
        attr: 'padding-left',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    action: {
      type: 'page-faq-list',
      title: '聊天项配置',
      config: [{
        text: '默认FAQ信息',
        isAuthor: 1,
        val: '',
        limit: {
          w: 50,
          h: 50,
          s: 40
        },
        nickName: '昵称'
      }]
    }
  },
  'horizontal-list': {
    title: '横向列表',
    domId: '',
    domName: '',
    style: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '#ffffff',
        isNecessary: false
      }, {
        type: 'input-number',
        label: '左内边距',
        attr: 'padding-left',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '右内边距',
        attr: 'padding-right',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    others: {
      type: 'item-style',
      title: '列表项样式',
      config: [
        {
          type: 'input-number',
          label: '上内边距',
          attr: 'horizontal-list-item_padding-top',
          val: 10,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '下内边距',
          attr: 'horizontal-list-item_padding-bottom',
          val: 10,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '图片宽度',
          attr: 'horizontal-list-logo_width',
          val: 100,
          unit: 'px',
          step: 1,
          max: 300,
          min: 10,
          isNecessary: false
        }, {
          type: 'input-number',
          label: '图片高度',
          attr: 'horizontal-list-logo_height',
          val: 60,
          unit: 'px',
          step: 1,
          max: 300,
          min: 10,
          isNecessary: false
        }, {
          type: 'input-number',
          label: '标题大小',
          attr: 'horizontal-list-title_font-size',
          val: 16,
          unit: 'px',
          step: 1,
          max: 100,
          min: 10,
          isNecessary: false
        }, {
          type: 'color-picker',
          label: '标题颜色',
          attr: 'horizontal-list-title_color',
          val: '#333333',
          isNecessary: false
        }, {
          type: 'input-number',
          label: '标题粗细',
          attr: 'horizontal-list-title_font-weight',
          val: 500,
          unit: '',
          min: 300,
          max: 900,
          step: 100,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '描述大小',
          attr: 'horizontal-list-desc_font-size',
          val: 13,
          unit: 'px',
          step: 1,
          max: 100,
          min: 10,
          isNecessary: false
        }, {
          type: 'color-picker',
          label: '描述颜色',
          attr: 'horizontal-list-desc_color',
          val: '#999999',
          isNecessary: false
        }
      ]
    },
    action: {
      type: 'horizontal-item-click',
      title: '列表项配置',
      config: [{
        val: 'https://yangyuji.github.io/h5-factory/static/img/logo.png',
        title: '默认标题',
        desc: '默认文案描述，默认文案描述，默认文案描述默认文案描述',
        click: null
      }]
    }
  },
  'vertical-list': {
    title: '纵向列表',
    domId: '',
    domName: '',
    style: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '#ffffff',
        isNecessary: false
      }, {
        type: 'input-number',
        label: '上内边距',
        attr: 'padding-top',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }, {
        type: 'input-number',
        label: '下内边距',
        attr: 'padding-bottom',
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true
      }
    ],
    others: {
      type: 'item-style',
      title: '列表项样式',
      config: [
        {
          type: 'input-number',
          label: '上内边距',
          attr: 'vertical-list-item_padding-top',
          val: 0,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '下内边距',
          attr: 'vertical-list-item_padding-bottom',
          val: 10,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '左内边距',
          attr: 'vertical-list-item_padding-left',
          val: 10,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '右内边距',
          attr: 'vertical-list-item_padding-right',
          val: 10,
          unit: 'px',
          min: 0,
          max: 50,
          step: 1,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '图片高度',
          attr: 'vertical-list-logo_height',
          val: 160,
          unit: 'px',
          step: 1,
          max: 300,
          min: 10,
          isNecessary: false
        }, {
          type: 'input-number',
          label: '标题大小',
          attr: 'vertical-list-title_font-size',
          val: 16,
          unit: 'px',
          step: 1,
          max: 100,
          min: 10,
          isNecessary: false
        }, {
          type: 'color-picker',
          label: '标题颜色',
          attr: 'vertical-list-title_color',
          val: '#333333',
          isNecessary: false
        }, {
          type: 'input-number',
          label: '标题粗细',
          attr: 'vertical-list-title_font-weight',
          val: 500,
          unit: '',
          min: 300,
          max: 900,
          step: 100,
          isNecessary: true
        }, {
          type: 'input-number',
          label: '描述大小',
          attr: 'vertical-list-desc_font-size',
          val: 13,
          unit: 'px',
          step: 1,
          max: 100,
          min: 10,
          isNecessary: false
        }, {
          type: 'color-picker',
          label: '描述颜色',
          attr: 'vertical-list-desc_color',
          val: '#999999',
          isNecessary: false
        }
      ]
    },
    action: {
      type: 'vertical-item-click',
      title: '列表项配置',
      config: [{
        val: 'https://yangyuji.github.io/h5-factory/static/img/logo.png',
        title: '默认标题',
        desc: '默认文案描述，默认文案描述，默认文案描述默认文案描述',
        click: null
      }, {
        val: 'https://yangyuji.github.io/h5-factory/static/img/logo.png',
        title: '默认标题',
        desc: '默认文案描述，默认文案描述，默认文案描述默认文案描述',
        click: null
      }]
    }
  }
}
