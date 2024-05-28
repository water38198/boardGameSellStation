<script>
export default {
  methods: {
    logout() {
      // 值設為空，且設定為過期
      document.cookie = 'myToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      this.$router.push('/login');
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">桌遊販電</RouterLink>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="w-100 navbar-nav gap-6 justify-content-end align-items-center">
          <li class="nav-item link-light">
            <RouterLink to="/dashboard/products" class="link-light">商品管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/orders" class="link-light">訂單管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/coupons" class="link-light">優惠券管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/articles" class="link-light">文章管理</RouterLink>
          </li>
          <li class="nav-item">
          <RouterLink to="/" class="link-light">回前台</RouterLink>
          </li>
          <li class="nav-item">
            <button type="button" class="btn btn-light" @click="logout">登出</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>