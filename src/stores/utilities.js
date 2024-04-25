import { defineStore } from 'pinia';

export default defineStore('utilities', {
  actions: {
    timeTransform(timestamp) {
      let stamp = timestamp;
      if (stamp && stamp.toString().length < 13) {
        stamp *= 1000;
      }
      const date = new Date(timestamp);
      const month = date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${month}.${day}.${date.getFullYear()}`;
    },
  },
});
