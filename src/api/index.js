// 对接口进行统一管理
import requests from "./request";
// 引入mock实例
import mockRequests from "./mockAjax";
// 三级联动接口调用
///api/product/getBaseCategoryList get
export const typenav = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });
// 轮播图
// 使用mock模拟数据发起的请求
export const reqGetBannerList = () =>
  mockRequests({ url: "/banner", method: "get" });
//获取Floor数据
export const reqGetFloorList = () =>
  mockRequests({ url: "/floor", method: "get" });
//获取搜索商品列表
export const reqGetSearchList = (params) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
//获取商品详情
// 传入商品id
export const reqGetGoodsDetail = (params) =>
  requests({
    url: `/item/${params}`,
    method: "get",
  });
//添加到购物车或者对购物车商品进行修改更新
export const reqGetCart = (id, num) =>
  requests({
    url: `/cart/addToCart/${id}/${num}`,
    method: "post",
  });
//获取购物车列表
export const reqGetCartList = () =>
  requests({
    url: "/cart/cartList",
    method: "get",
  });
//删除购物车商品
export const reqDeleteCart = (id) =>
  requests({
    url: `/cart/deleteCart/${id}`,
    method: "delete",
  });
//改变商品勾选状态
export const reqChangeCart = (id, isChecked) =>
  requests({
    url: `/cart/checkCart/${id}/${isChecked}`,
    method: "get",
  });
//获取验证码
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
//注册用户
export const reqRegisterUser = (data) =>
  requests({
    url: "/user/passport/register",
    method: "post",
    data,
  });
//登录用户
export const reqLoginUser = (data) =>
  requests({
    url: "/user/passport/login",
    method: "post",
    data,
  });
//获取登录用户信息
export const reqGetUser = () =>
  requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
//退出登录
export const reqLoginOut = () =>
  requests({
    url: "/user/passport/logout",
    method: "get",
  });
//获取交易订单信息
export const reqGetTrade = () =>
  requests({
    url: "/order/auth/trade",
    method: "get",
  });
//提交交易订单
export const reqPayOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
//获取支付信息
export const reqGetPay = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
//获取支付状态
export const reqGetPayState = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
//获取订单列表
export const reqGetOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
