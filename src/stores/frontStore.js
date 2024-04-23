import { defineStore } from "pinia";
const { VITE_URL, VITE_PATH } = import.meta.env;
import axios from "axios";

export default defineStore("frontStore", {
  state: () => ({
    articles: [],
    products: [],
    isLoading: false,
  }),
  actions: {
    frontInit() {
      this.isLoading = true;
      Promise.all([
        axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/articles`),
        axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`),
      ]).then((res) => {
        this.articles = res[0].data.articles;
        this.products = res[1].data.products;
        this.isLoading = false;
      });
    },
  },
  getters: {
    newestProducts: ({ products }) => products.slice(0, 3),
  },
});
