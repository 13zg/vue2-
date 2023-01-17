//详情模块
// 引入接口
import {
  reqGetCode,
  reqRegisterUser,
  reqLoginUser,
  reqGetUser,
  reqLoginOut,
} from "../../api/index";
const state = {
  // 验证码
  code: "",
  // 用户信息
  userInfo: {},
};
const getters = {};
const actions = {
  //获取验证码
  async GetCode(context, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      context.commit("GETCODE", result.data);
      return "OK";
    } else return Promise.reject(new Error(result.message));
  },
  //注册用户
  async RegisterUser(context, data) {
    let result = await reqRegisterUser(data);
    if (result.code == 200) return "OK";
    else return Promise.reject(new Error(result.message));
  },
  //用户登录
  async LoginUser(context, data) {
    let result = await reqLoginUser(data);
    if (result.code == 200) {
      // 将token存储到本地
      localStorage.setItem("token", result.data.token);
      return "OK";
    } else return Promise.reject(new Error(result.message));
  },
  //获取用户信息
  async GetUser(context) {
    let result = await reqGetUser();
    if (result.code == 200) {
      context.commit("GETUSER", result.data);
      return "OK";
    } else return Promise.reject(new Error(result.message));
  },
  //退出登录
  async LoginOut(context) {
    let result = await reqLoginOut();
    if (result.code == 200) {
      //清除token
      localStorage.removeItem("token");
      // 清除用户信息
      context.commit("LOGINOUT");
      return "OK";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
const mutations = {
  GETUSER(state, val) {
    state.userInfo = val;
  },
  GETCODE(state, val) {
    state.code = val;
  },
  LOGINOUT(state) {
    state.userInfo = {};
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
