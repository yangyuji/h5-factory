import Vue from 'vue'
import App from './App'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  render: h => h(App)
}).$mount('#app')

