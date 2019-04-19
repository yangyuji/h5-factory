module.exports = [
  {
    title: '基本',
    list: [
      {
        type: 'text',
        label: '页面名称',
        attr: 'page-name',
        placeholder: '例：双十一专题主页',
        val: '',
        isNecessary: true
      }, {
        type: 'radio',
        label: '回到顶部',
        attr: 'gotop',
        val: true,
        options: [
          {
            name: '显示',
            val: true
          }, {
            name: '不显示',
            val: false
          }
        ],
        isNecessary: false
      }, {
        type: 'datetime',
        label: '生效时间',
        attr: 'start-time',
        val: '',
        isNecessary: true
      }, {
        type: 'datetime',
        label: '失效时间',
        attr: 'start-time',
        val: '',
        isNecessary: true
      }, {
        type: 'text',
        label: '文件名称',
        attr: 'page-name',
        rules: {
          regex: '^[0-9a-zA-Z_]{1,}$',
          tips: '只能输入字母、数字或者下划线'
        },
        placeholder: '生成的html文件名称',
        val: '',
        isNecessary: true
      }
    ]
  }, {
    title: '背景',
    list: [
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '#ffffff'
      }, {
        type: 'upload',
        label: '背景图片',
        attr: 'background-image',
        val: ''
      }, {
        type: 'select',
        label: '背景效果',
        attr: 'background-repeat',
        val: '',
        options: [
          {
            name: '无',
            val: 'no-repeat'
          }, {
            name: '水平重复',
            val: 'repeat-x'
          }, {
            name: '垂直重复',
            val: 'repeat-y'
          }, {
            name: '水平+垂直重复',
            val: 'repeat'
          }
        ]
      }
    ]
  }, {
    title: '微信分享',
    list: [
      {
        type: 'text',
        label: '标题',
        attr: 'page-share-title',
        placeholder: '微信分享的标题',
        val: '',
        isNecessary: true
      }, {
        type: 'textarea',
        label: '描述',
        attr: 'page-share-desc',
        placeholder: '微信分享的描述文字',
        val: '',
        isNecessary: true
      }, {
        type: 'upload',
        label: '图标',
        attr: 'share-icon',
        val: '',
        isNecessary: true
      }
    ]
  }
]
