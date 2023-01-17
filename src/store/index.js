// 引入vuex
import Vue from "vue";
import Vuex from "vuex";
// 使用vuex
Vue.use(Vuex);
// 引入模块
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
//创建Vuex实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
