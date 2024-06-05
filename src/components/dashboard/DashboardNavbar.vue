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
  <nav class="navbar navbar-expand bg-dark py-0" data-bs-theme="dark">
    <div class="container-lg">
        <RouterLink class="navbar-brand px-0 me-0 me-sm-4" to="/">桌遊販電</RouterLink>
        <ul class="w-100 navbar-nav align-items-center">
          <li class="nav-item link-light">
            <RouterLink to="/dashboard/products" class="link-light">商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/orders" class="link-light">訂單</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/coupons" class="link-light">優惠券</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/articles" class="link-light">文章</RouterLink>
          </li>
          <li class="nav-item ms-auto">
            <button type="button" class="btn btn-light" @click="logout">登出</button>
          </li>
        </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar-nav{
  overflow: auto;
}
.router-link-active{
  pointer-events: none;
  opacity: .5;
}

.nav-item a{
  display: block;
  padding:1rem;
  @media (width < 576px) {
    padding-inline: .5rem;
  }
  margin-inline: 4px;
}

a,button{
  text-wrap: nowrap;
}
</style>