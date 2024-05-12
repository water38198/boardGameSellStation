<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">桌遊販電</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100">
          <li class="nav-item">
            <RouterLink to="/admin/products" class="me-3 nav-link">產品管理</RouterLink>
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
          <li class="nav-item ms-auto">
            <RouterLink to="/" class="me-3 nav-link">前台</RouterLink>
          </li>
          <li class="nav-item">
            <a href="#" class="me-3 nav-link" @click.prevent="$emit('logout')">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
