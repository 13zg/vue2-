<template>
  <div>
    <!-- 三级联动导航 -->
    <!-- 已经全局注册所以不需要引入 -->
    <TypeNav />
    <!-- 轮播图和快报 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 商品楼层展示 -->
    <!-- 通过props将组件数据传入floor组件中 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <!-- 商标展示 -->
    <Brand />
  </div>
</template>
<script>
import { mapState } from "vuex";
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发请求获取floor数据
    this.$store.dispatch("home/getFloor");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style></style>
