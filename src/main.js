import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// Vant所有组件
import Vant from 'vant'
//  加载Vant 组件样式
import 'vant/lib/index.css'
// 加载动态设置 Rem基准值
import 'amfe-flexible'
// 加载 dayjs 初始化配置
import './utils/day'
// 注册 Vant组件库
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
