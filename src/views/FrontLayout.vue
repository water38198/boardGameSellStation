<script>
import { RouterView } from "vue-router";
import { mapActions, mapState } from "pinia";
import frontStore from "../stores/frontStore";
import cartStore from "../stores/cartStore";
import articleStore from "../stores/articleStore";
import DiceRoll from "../components/DiceRoll.vue";
import DiceIcon from "@/assets/dice-icon.png";
import FrontNavbar from "../components/front/FrontNavbar.vue";
import FrontFooter from "../components/front/FrontFooter.vue";

export default {
  data() {
    return {
      DiceIcon,
    };
  },
  components: {
    RouterView,
    DiceRoll,
    FrontNavbar,
    FrontFooter,
  },
  methods: {
    ...mapActions(frontStore, ["getProducts", "frontInit"]),
    ...mapActions(cartStore, ["getCarts"]),
    ...mapActions(articleStore, ["getAllArticles", "getArticles"]),
  },
  computed: {
    ...mapState(cartStore, ["cart"]),
    ...mapState(frontStore, ["isLoading"]),
  },
  mounted() {
    this.frontInit();
    this.getCarts();
    this.getAllArticles();
    this.getArticles();
  },
};
</script>

<template>
  <div class="vl-parent">
    <VLoading v-model:active="isLoading" />
  </div>
  <div class="bg-b20 min-vh-100 d-flex flex-column bg-white">
    <FrontNavbar />
    <div class="flex-grow-1">
      <RouterView />
    </div>
    <FrontFooter />
    <!-- Button trigger modal -->
    <div
      style="position: fixed; bottom: 20px; right: 20px"
      class="bg-themeDark rounded-3"
    >
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        class="btn"
      >
        <img :src="DiceIcon" alt="dice" />
        <span class="text-white d-none d-md-inline"> 點我拿優惠券!!</span>
      </button>
    </div>
    <!-- Modal -->
    <DiceRoll />
  </div>
</template>
