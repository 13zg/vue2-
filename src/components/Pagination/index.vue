<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="StartAndEnd.start > 1"
      @click="$emit('getPage', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="StartAndEnd.start > 2">···</button>
    <!-- v-for不能和v-if同一级使用，所以添加template标签 -->
    <template v-for="(page, index) in StartAndEnd.end">
      <!-- 用v-for遍历出start-end之间的页码 -->
      <button
        v-if="page >= StartAndEnd.start"
        :key="index"
        @click="$emit('getPage', page)"
        :class="{ active: page == pageNo }"
      >
        {{ page }}
      </button>
    </template>
    <button v-if="StartAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="StartAndEnd.end < totalPage"
      @click="$emit('getPage', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageNo", "pageSize", "continues"],
  computed: {
    // 总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页码开始和结束页数
    StartAndEnd() {
      // 解构赋值
      let { totalPage, pageNo, continues } = this;
      let start = 0,
        end = 0;
      //1、如果总页数(totalPage)小于当前连续页数(continues)
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      }
      //2、正常情况，总页数大于连续页数
      else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 考虑两种特殊情况
        //1、如果start为负数或0，则将其置为起始页数1，同时end则为continues的大小
        if (start <= 0) {
          start = 1;
          end = continues;
        }
        //2、如果end大于总页数，则end置为总页数大小，start为总页数减去continues+1
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(84, 195, 239);
      color: #fff;
    }
  }
}
</style>