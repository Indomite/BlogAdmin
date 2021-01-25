import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import './assets/css/global.css'

import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
