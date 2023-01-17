//home数据模块
// 引入接口函数
import { typenav, reqGetBannerList, reqGetFloorList } from "../../api/index";
const actions = {
  // 三级联动 发送请求,获取数据
  async navigate(context) {
    const list = await typenav();
    if (list.code == 200) {
      context.commit("NAVIGATE", list.data);
    }
  },
  //轮播图发起请求(ListContainer)
  async getBanner(context) {
    const list = await reqGetBannerList();
    if (list.code == 200) {
      context.commit("GETBANNER", list.data);
    }
  },
  //轮播图发起请求(Floor)
  async getFloor(context) {
    const list = await reqGetFloorList();
    if (list.code == 200) {
      context.commit("GETFLOOR", list.data);
    }
  },
};
const mutations = {
  //三级联动
  NAVIGATE(state, val) {
    state.navList = val;
  },
  //轮播图(ListContainer)
  GETBANNER(state, val) {
    state.bannerList = val;
  },
  //轮播图(Floor)
  GETFLOOR(state, val) {
    state.floorList = val;
  },
};
const state = {
  navList: [],
  bannerList: [],
  floorList: [],
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
