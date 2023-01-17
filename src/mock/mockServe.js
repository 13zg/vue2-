import Mock from "mockjs";
// webpack默认对外暴露图片和json格式，所以直接引入
import banner from "./banner.json";
import floor from "./floor.json";
// mock数据，参数一路径，参数二请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
