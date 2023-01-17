// 引入路由
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// 使用路由
Vue.use(VueRouter);
//引入路由配置
import routes from "./routes";
// 配置路由
//避免冗余导航到当前位置问题解决
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  // 键值相同，直接简写
  routes,
  // 设置滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 };
  },
});
//设置前置路由守卫
router.beforeEach(async (to, from, next) => {
  //获取用户信息，不能直接获取userInfo，因为即使是空对象，if判断也为true
  let username = store.state.user.userInfo.name;
  // 如果用户登录了
  if (localStorage.getItem("token")) {
    //要跳转到登录页，则依旧回到主页
    if (to.path == "/login") {
      next("/home");
    }
    //如果跳转到其他页面，则直接跳转
    else {
      // 如果有用户信息，则直接跳转
      if (username) {
        next();
      }
      // 如果没有(刷新了)，则要先派发请求获取用户信息
      else {
        try {
          //获取用户信息
          await store.dispatch("user/GetUser");
          //成功则直接跳转
          next();
        } catch (error) {
          //失败则是token失效了，则退出登陆后，回到登录页重新登陆
          await store.dispatch("user/LoginOut");
          next("/login");
        }
      }
    }
  }
  //用户未登录的情况
  else {
    //  无法跳转到和交易有关的页面
    if (
      to.path.indexOf("/center") != -1 ||
      to.path.indexOf("/trade") != -1 ||
      to.path.indexOf("/pay") != -1 ||
      to.path.indexOf("/paysuccess") != -1
    ) {
      next("/login?redirect=" + to.path);
    } else {
      next();
    }
  }
});
export default router;
