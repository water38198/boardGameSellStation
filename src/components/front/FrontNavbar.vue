<script>
import { mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import 'bootstrap';

export default {
  computed: {
    ...mapState(cartStore, ['cart']),
    cartTotalNum() {
      let number = 0;
      if (this.cart.carts) {
        this.cart.carts.forEach((cart) => {
          number += cart.qty;
        });
      }
      return number
    },
    articleCategory() {
      if (this.$route.path === '/articles') {
        return this.$route.query.category
      }
      return ''
    }
  },
  watch: {
    $route() {
      this.$refs.navbarCollapse.classList.remove('show');
      
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg nav-bg sticky-top" data-bs-theme="dark">
    <div class="container-fluid container-lg px-sm-5 px-lg-0 py-2">
      <RouterLink to="/home" class="btn btn-theme me-3 navbar-brand link-light">
        <i class="bi bi-dice-5-fill me-1"></i>
        桌遊販電
      </RouterLink>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="navbarCollapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-3 mb-lg-0 w-100 d-none d-lg-flex">
          <li class="nav-item">
            <RouterLink to="/products?category=全部" class="me-3 nav-link link-light">
              <i class="bi bi-border-all me-2"></i>所有商品
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=新聞" class="me-3 nav-link link-light article-link"
            :class="{'article-link-active':articleCategory==='新聞'}">
              <i class="bi bi-newspaper me-2"></i>最新消息
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=心得" class="me-3 nav-link link-light article-link"
            :class="{'article-link-active':articleCategory==='心得'}">
              <i class="bi bi-card-text me-2"></i>心得評價
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=開箱" class="me-3 nav-link link-light article-link"
              :class="{'article-link-active':articleCategory==='開箱'}">
              <i class="bi bi-box-seam-fill me-2"></i>開箱文章
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="me-3 nav-link link-light">
              <i class="bi bi-file-earmark-person me-2"></i>關於我們
            </RouterLink>
          </li>
          <li class="nav-item mx-lg-3 ms-lg-auto navbar-expand">
            <RouterLink to="/cart" class="text-theme position-relative d-block px-2 cart">
              <i class="bi bi-cart fs-3 link-light"></i>
              <span class="position-absolute  bg-theme badge rounded-pill cart-number"
              v-if="cartTotalNum">
                {{ cartTotalNum }}
              </span>
            </RouterLink>
          </li>
        </ul>
        <!-- collapseContent -->
        <ul class="navbar-nav me-auto mb-3 mb-lg-0 px-3 w-100 d-lg-none bg-white">
          <li class="nav-item">
            <RouterLink to="/home" class="my-2 nav-link text-theme">
              <i class="bi bi-house me-2"></i>首頁
            </RouterLink >
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="my-2 nav-link text-theme">
              <i class="bi bi-border-all me-2"></i>所有商品
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=新聞" class="my-2 nav-link text-theme article-link" :class="{'article-link-active':articleCategory==='新聞'}">
            <i class="bi bi-newspaper me-2"></i>最新消息
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=心得" class="my-2 nav-link text-theme article-link" :class="{'article-link-active':articleCategory==='心得'}">
              <i class="bi bi-card-text me-2"></i>心得評價
              </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=開箱" class="my-2 nav-link text-theme article-link" :class="{'article-link-active':articleCategory==='開箱'}">
              <i class="bi bi-box-seam-fill me-2"></i>開箱文章
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="my-2 nav-link text-theme">
              <i class="bi bi-file-earmark-person me-2"></i>關於我們
            </RouterLink>
          </li>
          <li class="nav-item mx-lg-3 ms-lg-auto navbar-expand">
            <RouterLink to="/cart" class="text-theme d-inline-block my-3 cart">
              <i class="bi bi-cart"></i>
              購物車
              <span v-if="cartTotalNum" class="bg-theme badge rounded-pill cart-number">
                {{ cartTotalNum }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav> 
</template>

<style scoped lang="scss">
.nav-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.nav-item a:hover{
  opacity: .7;
}

.router-link-active{
  border-bottom: 3px solid #0fb99b;
}

.article-link:not(.article-link-active),
.cart{
  border-bottom: 0;
}

.cart-number{
  bottom: 0;
  right: -.5rem;
}
</style>



