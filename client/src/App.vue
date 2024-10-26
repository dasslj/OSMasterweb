<template>
  <div :class="{ main: true }">
    <div :class="{ bgBlur: isbgBlur, mainCol: true }">
      <div class="mainRow">
        <!-- 右侧的路由展示 -->
        <div class="routerView">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>