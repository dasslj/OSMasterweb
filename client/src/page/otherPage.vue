<template>
  <div class="main">
    <h1>尽请期待</h1>
    <!-- <div v-for="(item, index) in historyList[0]" :key="index">
      {{ item }}
    </div> -->
  </div>
</template>

<script setup>
// import axios from "axios";
// import { reactive, onBeforeMount, onMounted } from "vue";
// const historyList = reactive([]); // 历史数据列表

// // 获取历史数据列表
// const getHistoryList = () => {
//   axios.get("http://localhost:8888/one/data").then((res) => {
//     if (res.status === 200) {
//       console.log(res.data.historyList);
//       // for (let i = 0; i < res.data.historyList.length; ++i) {
//       //   historyList.push(res.data.historyList[i]);
//       // }
//       historyList.push(res.data.historyList);
//     }
//   });
//   console.log(historyList);
// };

// onBeforeMount(() => {
//   // getHistoryList();
// });

// onMounted(() => {
//   getHistoryList();
// });
</script>

<style scoped>
.main {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
  width: 100%;
  height: 50em;
}
</style>