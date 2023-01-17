<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="resetIndex" @mouseenter="changeShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(l1, index) in navList"
                :key="l1.categoryId"
              >
                <h3
                  @mouseenter="updateIndex(index)"
                  :class="{ curbgc: currentIndex == index }"
                >
                  <a
                    :data-categoryName="l1.categoryName"
                    :data-category1Id="l1.categoryId"
                    >{{ l1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="l2 in l1.categoryChild"
                    :key="l2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="l2.categoryName"
                          :data-category2Id="l2.categoryId"
                          >{{ l2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="l3 in l2.categoryChild" :key="l3.categoryId">
                          <a
                            :data-categoryName="l3.categoryName"
                            :data-category3Id="l3.categoryId"
                            >{{ l3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入防抖函数
import debounce from "lodash/debounce";
export default {
  name: "TypeNav",
  data() {
    return {
      // 设置当前索引改变背景颜色
      currentIndex: -1,
      // 设置导航栏显示与隐藏
      show: true,
    };
  },
  methods: {
    /* 
    将当前鼠标所在索引赋值给currentIndex
    */
    // 使用防抖函数
    updateIndex: debounce(function (index) {
      this.currentIndex = index;
    }, 30),
    /* 
    鼠标离开重置索引
     */
    resetIndex() {
      this.currentIndex = -1;
      // 在search页面时，当鼠标离开，则隐藏
      if (this.$route.name != "home") {
        this.show = false;
      }
    },
    /* 
    实现点击跳转到search路由
    */
    goSearch(e) {
      let el = e.target;
      let { categoryname, category1id, category2id, category3id } = el.dataset;
      //只有点击a标签时进行路由跳转
      if (categoryname) {
        // 整理数据
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 合并数据
        location.query = query;
        // 跳转路由
        // 判断是否当前路由有params参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
    /* 
     在search页面时，鼠标进入显示导航栏
    */
    changeShow() {
      this.show = true;
    },
  },
  mounted() {
    //当跳转到search页面则初始化隐藏
    if (this.$route.name == "search") this.show = false;
    if (this.$route.name == "detail") this.show = false;
  },
  computed: {
    //获取vuex返回的数据
    ...mapState("home", ["navList"]),
  },
};
</script>
<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            //height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //背景颜色
          .curbgc {
            background-color: skyblue;
          }
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      overflow: hidden;
      transition: all 0.5s linear;
    }
  }
}
</style>
