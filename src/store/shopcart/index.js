//购物车模块
// 引入接口
import { reqGetCartList, reqDeleteCart, reqChangeCart } from "../../api/index";
const state = {
  cartListAll: [],
};
const getters = {
  cartList1(state) {
    return state.cartListAll[0] || {};
  },
};
const actions = {
  // 获取购物车列表
  async getList(context) {
    let result = await reqGetCartList();
    if (result.code == 200) {
      context.commit("GETLIST", result.data);
    }
  },
  //删除相应购物车商品
  async deleteCart(context, id) {
    let result = await reqDeleteCart(id);
    if (result.code == 200) return "OK";
    else return Promise.reject(new Error(result.message));
  },

  //改变相应商品勾选状态
  async changeCart(context, { id, isChecked }) {
    let result = await reqChangeCart(id, isChecked);
    if (result.code == 200) return "OK";
    else return Promise.reject(new Error(result.message));
  },
};
const mutations = {
  GETLIST(state, val) {
    state.cartListAll = val;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
