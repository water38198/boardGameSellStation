<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>

<template>
  <div class="container text-center pt-100">
    <h1>錯誤發生</h1>
    <p>您可能輸入了錯誤的網址</p>
    <RouterLink to="/">回首頁</RouterLink>
  </div>
</template>
