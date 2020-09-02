import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TreeTable from 'vue-table-with-tree-grid'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
//非webpack下 Vue控制台提示You are running Vue in development mode
Vue.config.productionTip=false
Vue.use(ElementUI)
Vue.component('tree-table',TreeTable)
Vue.use(VueQuillEditor) /* { default global options } */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
