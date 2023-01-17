//详情模块
// 引入接口
import { reqGetTrade } from "../../api/index";
const state = {
  tradeList: {},
};
const getters = {
  //用户地址信息
  userAddressList(state) {
    return state.tradeList.userAddressList || [];
  },
  //商品信息
  detailArrayList(state) {
    return state.tradeList.detailArrayList || [];
  },
};
const actions = {
  //获取交易订单信息
  async getTrade(context) {
    let result = await reqGetTrade();
    if (result.code == 200) {
      context.commit("GETTRADE", result.data);
    }
  },
};
const mutations = {
  GETTRADE(state, val) {
    state.tradeList = val;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
