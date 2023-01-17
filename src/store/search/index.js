import { reqGetSearchList } from "../../api/index";
//search数据模块
const actions = {
  //调用接口获取搜索列表数据
  async getSearch(context, val = {}) {
    let list = await reqGetSearchList(val);
    if (list.code == 200) {
      context.commit("GETSEARCH", list.data);
    }
  },
};
const mutations = {
  // 搜索列表
  GETSEARCH(state, val) {
    state.searchList = val;
  },
};
const state = {
  searchList: {},
};
const getters = {
  //简化搜索列表的数据
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
