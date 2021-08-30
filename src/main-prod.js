import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import './filter'
// 全局样式
import 'assets/css/global.css'
// 字体图标
import 'assets/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// Vue.use(TreeTable)
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
