<template>
  <div class="vl-parent">
    <VLoading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    >
    </VLoading>
  </div>
  <div class="bg-b20 min-vh-100">
    <nav
      class="navbar navbar-expand-lg bg-transparent sticky-top"
      style="
        background: linear-gradient(
          rgba(0, 0, 0, 0.4) 0%,
          rgba(0, 0, 0, 0.4) 100%
        );
      "
    >
      <div class="container-fluid container-lg px-5 px-lg-0 py-2">
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
          id="navbarSupportedContent"
          ref="navbarCollapse"
        >
          <ul class="navbar-nav me-auto mb-3 mb-lg-0 w-100">
            <li class="nav-item">
              <RouterLink to="/" class="me-3 nav-link link-light"
                >首頁</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/articles/news" class="me-3 nav-link link-light"
                >最新消息</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/products" class="me-3 nav-link link-light"
                >所有商品</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/articles/reviews"
                class="me-3 nav-link link-light"
                >心得評價</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/articles/unboxings"
                class="me-3 nav-link link-light"
                >開箱文章</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="me-3 nav-link link-light"
                >關於我們</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/admin" class="me-3 nav-link link-light"
                >後台</RouterLink
              >
            </li>

            <li class="nav-item mx-3 ms-lg-auto navbar-expand">
              <RouterLink
                to="/cart"
                class="text-dark position-relative d-block"
              >
                <i class="bi bi-cart fs-3 link-light"></i>
                <span
                  class="position-absolute translate-middle bg-theme badge rounded-pill cart-number"
                  >{{ cartNum }}</span
                >
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView></RouterView>
    <footer class="bg-themeDark text-light">
      <div
        class="d-md-flex container justify-content-between"
        style="padding-top: 50px; padding-bottom: 50px"
      >
        <p class="fs-2 d-none d-md-block" style="line-height: 70px">
          買桌遊不必買全新<br />二手價格更貼心
        </p>
        <div class="text-center">
          <p class="fs-2 w-100">聯絡我們</p>
          <ul class="list-unstyled d-flex justify-content-center">
            <li class="mx-1">
              <a href="#"><img src="../assets/footer/twitter.png" alt="" /></a>
            </li>
            <li class="mx-1">
              <a href="#"><img src="../assets/footer/FB.png" alt="" /></a>
            </li>
            <li class="mx-1">
              <a href="#"><img src="../assets/footer/mail.png" alt="" /></a>
            </li>
            <li class="mx-1">
              <a href="#"><img src="../assets/footer/IG.png" alt="" /></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="bg-black text-center py-5">
        <span>本網站僅供練習使用，不具商業用途</span>
      </div>
    </footer>
    <!-- Button trigger modal -->
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      style="position: fixed; bottom: 20px; right: 20px"
      class="btn"
    >
      <img :src="DiceIcon" alt="" />
      <span class="text-theme d-none d-md-inline"> 點我拿優惠券!!</span>
    </button>
    <!-- Modal -->
    <DiceRoll></DiceRoll>
  </div>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
import { mapActions, mapState } from "pinia";
import frontStore from "../stores/frontStore";
import cartStore from "../stores/cartStore";
import articleStore from "../stores/articleStore";
import DiceRoll from "../components/DiceRoll.vue";
import DiceIcon from "@/assets/dice-icon.png";
export default {
  data() {
    return {
      DiceIcon,
    };
  },
  components: {
    RouterView,
    RouterLink,
    DiceRoll,
  },
  methods: {
    ...mapActions(frontStore, ["getProducts", "frontInit"]),
    ...mapActions(cartStore, ["getCarts"]),
    ...mapActions(articleStore, ["getAllArticles", "getArticles"]),
  },
  computed: {
    ...mapState(cartStore, ["cart"]),
    ...mapState(frontStore, ["isLoading"]),
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
  mounted() {
    this.frontInit();
    this.getCarts();
    this.getAllArticles();
    this.getArticles();
  },
  watch: {
    $route() {
      this.$refs.navbarCollapse.classList.remove("show");
    },
  },
};
</script>
<style>
.navbar {
  z-index: 10;
}
@media (min-width: 992px) {
  a.active {
    border-bottom: 3px solid #0fb99b;
  }
  .cart-number {
    top: 10px;
    left: 100%;
  }
}
@media (max-width: 992px) {
  .navbar-nav {
    font-size: 1.5rem;
  }
  .cart-number {
    top: 5px;
    left: 25px;
    font-size: 1rem;
  }
}
.dice-game {
  position: fixed;
  bottom: 3%;
  right: 3%;
}
</style>
