import { defineStore } from "pinia";

export default defineStore("utilities", {
  actions: {
    timeTransform(timestamp) {
      if (timestamp) {
        timestamp.toString().length < 13 ? (timestamp *= 1000) : timestamp;
      } else {
        return;
      }
      const date = new Date(timestamp);
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${month}.${day}.${date.getFullYear()}`;
    },
  },
});
