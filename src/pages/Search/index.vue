<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动显示 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeEl">×</i>
            </li>
            <!-- 关键字显示 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKey">×</i>
            </li>
            <!-- 商标显示 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.slice(-2) }}<i @click="removeMark">×</i>
            </li>
            <!-- 售卖属性显示 -->
            <li
              class="with-x"
              v-for="(val, index) in searchParams.props"
              :key="index"
            >
              {{ val.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @getTrademark="gettrade" @getAttrInfo="getattr" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeSort('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeSort('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="##" title="测试网站">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <router-link
                      :to="`/detail/${goods.id}`"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</router-link
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :total="total"
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :continues="5"
            @getPage="getPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
import search from "@/store/search";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 初始化数据
      // 带给服务器的参数
      searchParams: {
        // 分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类商品名
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序 初始化为默认 综合 降序
        order: "1:desc",
        // 分页器相关
        pageNo: 1,
        pageSize: 5,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 在挂载前获取路由中所带参数
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters("search", ["goodsList", "attrsList", "trademarkList"]),
    ...mapState("search", {
      total: (state) => state.searchList.total,
    }),
    // 设置计算属性，根据当前order的值来决定背景颜色切换和箭头是否显示
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    //根据数据中的升降序，决定箭头朝向
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    // 用于获取搜索列表
    getList() {
      this.$store.dispatch("search/getSearch", this.searchParams);
    },
    // 点击叉号，删除面包屑(query参数)
    removeEl() {
      // 点击叉号以后，将name置为空，则不显示
      this.searchParams.categoryName = undefined;
      // 重新进行路由跳转，watch监测路由改变后，重新发请求
      //如果存在params参数，要在地址栏中显示出来
      // 这时searchPramas中只有keyword，没有query
      this.$router.push({ name: "search", params: this.$route.params });
    },
    //点击叉号以后，将name置为空，则不显示(params参数)
    removeKey() {
      // 点击叉号以后，将keyword置为空，则不显示
      this.searchParams.keyword = undefined;
      // 触发全局事件总线，使header组件搜索栏清空
      this.$bus.$emit("reset");
      //重新进行路由跳转，将params参数从路由中去除
      //如果有query参数，则带上query参数
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 点击叉号以后，将trademark置空
    removeMark() {
      this.searchParams.trademark = undefined;
      // 再次发送请求
      this.getList();
    },
    //点击叉号后，将props中的索引为index的一项移除
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getList();
    },
    // 获取到商标后整理参数发请求
    gettrade(val) {
      this.searchParams.trademark = `${val.tmId}:${val.tmName}`;
      this.getList();
    },
    //获取售卖信息，整理参数发送请求
    getattr(attr, val) {
      let arr = `${attr.attrId}:${val}:${attr.attrName}`;
      // 若重复点击，则只push一次
      //数组去重
      if (this.searchParams.props.indexOf(arr) == -1)
        this.searchParams.props.push(arr);
      // 发送请求
      this.getList();
    },
    //点击切换升降序
    changeSort(flag) {
      // 获取初始（上一次）的排序状态
      let sort = this.searchParams.order;
      //获取初始（上一次）的排序类型 综合 价格
      let orignFlag = sort.split(":")[0];
      //获取初始（上一次）的排序 升序 降序
      let originSort = sort.split(":")[1];
      //如果与初始（上一次）状态相同，则只变化类型
      let newSort;
      if (orignFlag == flag) {
        newSort = `${flag}:${originSort == "asc" ? "desc" : "asc"}`;
      }
      //如果与初始（上一次）状态不同，则变化状态，并默认类型为降序
      else {
        newSort = `${flag}:'desc'`;
      }
      //将值赋给data
      this.searchParams.order = newSort;
      //重新发起请求
      this.getList();
    },
    //获取分页器组件参数，进行页面跳转
    getPage(page) {
      this.searchParams.pageNo = page;
      this.getList();
    },
  },
  // 路由一旦变化，则重新获取列表数据
  watch: {
    $route: {
      handler(newval, oldval) {
        //将category1id category2id category3id置空,保证每一次发请求时，searchParams中只存在一个id有效
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        // 重新整合路由信息
        Object.assign(this.searchParams, newval.params, newval.query);
        //发请求获取数据
        this.getList();
      },
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
