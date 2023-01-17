//详情模块
// 引入接口
import { reqGetGoodsDetail, reqGetCart } from "../../api/index";
const state = {
  detailList: {},
};
const getters = {
  //面包屑数据
  categoryView(state) {
    return state.detailList.categoryView || {};
  },
  //用户挑选选项
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || [];
  },
  // 手机主体信息
  skuInfo(state) {
    return state.detailList.skuInfo || {};
  },
};
const actions = {
  // 获取详情页信息
  async getDetail(context, val) {
    let result = await reqGetGoodsDetail(val);
    if (result.code == 200) {
      context.commit("GETDETAIL", result.data);
    }
  },
  // 加入购物车操作
  /* async getCart(context, { id, num }) {
    let result = await reqGetCart(id, num);
    /请求成功(resolve)
    if (result.code == 200) {
      return "OK";
    }
     请求失败(reject)
    else {
      return Promise.reject(result.message);
    }
  }, */
  async getCart(context, { id, num }) {
    let result = await reqGetCart(id, num);
    if (result.code == 200) return "OK";
    else return Promise.reject(new Error(result.message));
  },
};
const mutations = {
  GETDETAIL(state, val) {
    state.detailList = val;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
