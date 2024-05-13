<script>
import { RouterView } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';
import DiceRollGame from '../components/front/DiceRollGame.vue';
import FrontNavbar from '../components/front/FrontNavbar.vue';
import FrontFooter from '../components/front/FrontFooter.vue';

export default {
  components: {
    RouterView,

    DiceRollGame,
    FrontNavbar,
    FrontFooter,
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
  },
  computed: {
    ...mapState(cartStore, ['cart']),
  },
  mounted() {
    this.getCarts();
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
    <!-- 優惠券小遊戲 -->
    <DiceRollGame />
  </div>
</template>
