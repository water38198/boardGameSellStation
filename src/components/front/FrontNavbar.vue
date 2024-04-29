<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  data() {
    return {
      query: {},
    };
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    cartNum() {
      let num = 0;
      if (this.cart.carts) {
        this.cart.carts.forEach((cart) => {
          num += cart.qty;
        });
      }
      return num;
    },
  },
  components: {
    RouterLink,
  },
  mounted() {
    this.getCarts();
    this.query = this.$route.query;
  },
  watch: {
    $route() {
      this.$refs.navbarCollapse.classList.remove('show');
      this.query = this.$route.query;
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top nav-bg">
    <div class="container-fluid container-lg px-sm-5 px-lg-0 py-2">
      <RouterLink to="/" class="btn btn-theme me-3 navbar-brand link-light"
        ><i class="bi bi-dice-5-fill me-2"></i>桌遊販電</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        ref="navbarCollapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-3 mb-lg-0 w-100 d-none d-lg-flex">
          <li class="nav-item">
            <RouterLink to="/products" class="me-3 nav-link link-light"
              ><i class="bi bi-border-all me-2"></i>所有商品</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=新聞"
            class="me-3 nav-link link-light article-link"
            :class="{'article-link-active':query.category==='新聞'}"
              ><i class="bi bi-newspaper me-2"></i>最新消息
            </RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/articles?category=心得"
            class="me-3 nav-link link-light article-link"
            :class="{'article-link-active':query.category==='心得'}"
            >
              <i class="bi bi-card-text me-2"></i>心得評價
            </RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              to="/articles?category=開箱"
              class="me-3 nav-link link-light article-link"
              :class="{'article-link-active':query.category==='開箱'}"
              ><i class="bi bi-box-seam-fill me-2"></i>開箱文章</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="me-3 nav-link link-light"
              ><i class="bi bi-file-earmark-person me-2"></i
              >關於我們</RouterLink
            >
          </li>
          <li class="nav-item mx-lg-3 ms-lg-auto navbar-expand">
            <RouterLink
              to="/cart"
              class="text-theme position-relative d-block px-2"
            >
              <i class="bi bi-cart fs-3 link-light"></i>
              <span
                class="position-absolute bottom-0 end-0 bg-theme badge rounded-pill"
                v-if="cartNum"
                >{{ cartNum }}</span
              >
            </RouterLink>
          </li>
        </ul>
        <!-- collapseContent -->
        <ul
          class="navbar-nav me-auto mb-3 mb-lg-0 px-3 w-100 d-lg-none bg-white"
        >
          <li class="nav-item border-bottom">
            <RouterLink to="/" class="my-2 nav-link text-theme"
              ><i class="bi bi-house me-2"></i>首頁</RouterLink
            >
          </li>
          <li class="nav-item border-bottom">
            <RouterLink to="/products" class="my-2 nav-link text-theme"
              ><i class="bi bi-border-all me-2"></i>所有商品</RouterLink
            >
          </li>
          <li class="nav-item border-bottom">
            <RouterLink to="/articles?category=新聞" class="my-2 nav-link text-theme"
              ><i class="bi bi-newspaper me-2"></i>最新消息</RouterLink
            >
          </li>
          <li class="nav-item border-bottom">
            <RouterLink to="/articles?category=心得" class="my-2 nav-link text-theme"
              ><i class="bi bi-card-text me-2"></i>心得評價</RouterLink
            >
          </li>
          <li class="nav-item border-bottom">
            <RouterLink
              to="/articles?category=心得"
              class="my-2 nav-link text-theme"
              ><i class="bi bi-box-seam-fill me-2"></i>開箱文章</RouterLink
            >
          </li>
          <li class="nav-item border-bottom">
            <RouterLink to="/about" class="my-2 nav-link text-theme"
              ><i class="bi bi-file-earmark-person me-2"></i
              >關於我們</RouterLink
            >
          </li>
          <li class="nav-item mx-lg-3 ms-lg-auto navbar-expand">
            <RouterLink
              to="/cart"
              class="text-dark position-relative d-inline-block pe-12px my-3"
            >
              <i class="bi bi-cart fs-3"></i>
              <span
                class="position-absolute bottom-0 end-0 bg-theme badge rounded-pill"
                v-if="cartNum"
                >{{ cartNum }}</span
              >
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.pe-12px {
  padding-right: 12px;
}
.navbar {
  z-index: 2000;
}
.nav-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
}
@media (min-width: 992px) {
  a.active {
    border-bottom: 3px solid #0fb99b;
  }
  .article-link:not(.article-link-active){
    border-bottom: 0;
  }
}
</style>
