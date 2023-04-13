<template>
  <h1 class="text-center">後台</h1>
  <hr />
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">桌遊販電</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100">
          <li class="nav-item">
            <RouterLink to="/admin" class="me-3 nav-link">產品管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="me-3 nav-link"
              >訂單管理</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/coupons" class="me-3 nav-link"
              >優惠券管理</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/articles" class="me-3 nav-link"
              >文章管理</RouterLink
            >
          </li>
          <!-- <li class="nav-item">
            <RouterLink to="/admin/article" class="me-3 nav-link">文章管理</RouterLink>
          </li> -->
          <li class="nav-item ms-auto">
            <RouterLink to="/" class="me-3 nav-link">前台</RouterLink>
          </li>
          <li class="nav-item">
            <a href="#" class="me-3 nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <hr />
  <div class="container">
    <RouterView />
  </div>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
const { VITE_URL } = import.meta.env;

export default {
  components: {
    RouterView,
    RouterLink,
  },
  methods: {
    logout() {
      document.cookie = `myToken=; expires=}`;
      this.$router.push("/login");
    },
    loginCheck() {
      const myToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("myToken="))
        ?.split("=")[1];
      // axios header
      this.$http.defaults.headers.common["Authorization"] = myToken;
      this.$http
        .post(`${VITE_URL}/v2/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push("/login");
          }
        })
        .catch(() => {
          alert("錯誤，請重新登入");
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    this.loginCheck();
  },
};
</script>
