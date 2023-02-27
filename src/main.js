import Vue from 'vue'
import App from './App.vue'
// 导入elementui组件
import { Button, MessageBox, Message } from 'element-ui';

//导入路由
import router from '@/router/index'
// 导入vuex使用
import store from './store'
// 导入mock虚拟服务
import "@/mock/mockSevere"

// 导入公共组件
import Footer from '@/components/footer'
import Header from '@/components/header'
import TypeNav from '@/components/typeNav'
import Pagination from '@/components/pagination'

// 将api全部引入
import * as http from '@/api';

// 引入表单验证插件
import "@/utils/validate";

//图片懒加载插件
import VueLazyload from 'vue-lazyload'

//引入图片模块
import loading from '@/assets/loading.gif';
import error from '@/assets/error.jpg';
//使用插件
Vue.use(VueLazyload, {
  //加载图片的设置
  loading: loading,
  //服务器返回数据【图片有没问题：至少兜底的图片】
  error: error
})


Vue.use(Button)

Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


// 注册公共组件
Vue.component(Header.name, Header)
Vue.component(Footer.name, Footer)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$http = http
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
