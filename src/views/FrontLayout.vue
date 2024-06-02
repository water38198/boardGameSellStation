<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

import DiceRollGame from '@/components/front/DiceRollGame.vue';
import FrontNavbar from '@/components/front/FrontNavbar.vue';
import FrontFooter from '@/components/front/FrontFooter.vue';

export default {
  methods: {
    ...mapActions(cartStore, ['getCarts']),
  },
  components:{ DiceRollGame, FrontNavbar, FrontFooter},
  mounted() {
    this.getCarts();
  },
};
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">  
  <FrontNavbar />
  <RouterView class="flex-grow-1 pt-5" />
  <FrontFooter />
  <DiceRollGame />
  </div>
</template>