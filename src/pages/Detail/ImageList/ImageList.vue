<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in imageList2"
        :key="index"
      >
        <img
          :src="image.imgUrl"
          :class="{ active: index == currentIndex }"
          @click="changeIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper/dist/js/swiper";
export default {
  name: "ImageList",
  props: ["imageList2"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    // 点击图片，改变currentIndex的值
    changeIndex(key) {
      this.currentIndex = key;
      // 触发事件总线，将currentIndex的值给放大镜组件
      this.$bus.$emit("changeImage", this.currentIndex);
    },
  },
  watch: {
    // 当imageList2有数据，dom有结构渲染出来之后，再创建swiper实例
    imageList2() {
      this.$nextTick(() => {
        var mySwiper = new Swiper(".swiper-container", {
          // 每次显示三张图片
          slidesPerView: 3,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
    &::after {
      content: ">";
      font-size: 12px;
    }
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
    &::after {
      content: "<";
      font-size: 12px;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    line-height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
  }
}
</style>