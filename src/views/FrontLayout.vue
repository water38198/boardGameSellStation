<script>
import { RouterView } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';
import articleStore from '../stores/articleStore';
import DiceRoll from '../components/DiceRoll.vue';
import FrontNavbar from '../components/front/FrontNavbar.vue';
import FrontFooter from '../components/front/FrontFooter.vue';

export default {
  components: {
    RouterView,
    DiceRoll,
    FrontNavbar,
    FrontFooter,
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    ...mapActions(articleStore, ['getAllArticles', 'getArticles']),
  },
  computed: {
    ...mapState(cartStore, ['cart']),
  },
  mounted() {
    this.getCarts();
    this.getAllArticles();
    this.getArticles();
  },
};
</script>

<template>
  <div class="vl-parent">
  </div>
  <div class="bg-b20 min-vh-100 d-flex flex-column bg-white">
    <FrontNavbar />
    <div class="flex-grow-1">
      <RouterView />
    </div>
    <FrontFooter />
    <!-- Button trigger modal -->

    <!-- Modal -->
    <DiceRoll />
  </div>
</template>
