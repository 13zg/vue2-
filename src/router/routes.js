// 引入路由组件
import Home from "../pages/Home";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";
import Trade from "../pages/Trade";
import Pay from "../pages/Pay";
import PaySuccess from "../pages/PaySuccess";
import Center from "../pages/Center";
import MyOrder from "../pages/Center/myOrder";
import GroupOrder from "../pages/Center/groupOrder";
//路由配置
export default [
  {
    name: "home",
    path: "/home",
    component: Home,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      showFooter: false,
    },
  },
  {
    name: "detail",
    path: "/detail/:goodid",
    component: Detail,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      //如果是从购物车跳转。则放行
      if (from.path == "/shopcart") {
        next();
      } else {
        //如果不是，则返回到跳转之前的路由
        next(false);
      }
    },
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      //如果是从交易页跳转。则放行
      if (from.path == "/trade") {
        next();
      } else {
        //如果不是，则返回到跳转之前的路由
        next(false);
      }
    },
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/paySuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      //如果是从支付页跳转，则放行
      if (from.path == "/pay") {
        next();
      } else {
        //如果不是，则返回到跳转之前的路由
        next(false);
      }
    },
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/center",
    component: Center,
    meta: {
      showFooter: true,
    },
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  // 设置路由重定向
  {
    path: "*",
    redirect: "/home",
  },
];
