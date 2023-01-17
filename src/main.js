import Vue from "vue";
import App from "./App.vue";
// 引入路由配置
import router from "./router";
// 引入全局组件
import TypeNav from "./components/TypeNav";
import Carousel from "./components/Carousel";
import Pagination from "./components/Pagination";

// 引入vuex
import store from "./store";
// 引入mockjs
import "@/mock/mockServe";
// 引入swiper样式
import "swiper/dist/css/swiper.css";
// 引入api
import * as API from "./api/index";
//注册全局组件
// 三级联动
Vue.component(TypeNav.name, TypeNav);
// 轮播图
Vue.component(Carousel.name, Carousel);
//分页器
Vue.component(Pagination.name, Pagination);
// 局部引入element组件(微信支付弹窗)
import { MessageBox } from "element-ui";
Vue.prototype.$alert = MessageBox.alert;
//实现图片懒加载
//引入懒加载插件
import VueLazyload from "vue-lazyload";
import loadImg from "./assets/images/load.gif";
// 使用插件
Vue.use(VueLazyload, {
  loading: loadImg,
});
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  // 注册路由
  router,
  // 注册vuex
  store,
  // 配置全局总线
  beforeCreate() {
    // 在vue的原型对象上添加事件总线，并且能够使用vue实例方法，所以等于一个vue实例
    Vue.prototype.$bus = this;
    //在vue原型对象上添加api，使每个组件不用挨个引入方法，就能够调用api
    Vue.prototype.$API = API;
  },
}).$mount("#app");
