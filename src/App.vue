<template>
  <div class="outer">
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //挂载时调用vuex,获取数据
    //在入口文件调用方法，所以只执行一次
    this.$store.dispatch("home/navigate");
  },
};
</script>

<style >
</style>
