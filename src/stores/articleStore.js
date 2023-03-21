import { defineStore } from "pinia";
import axios from "axios";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore("articleStore", {
  state: () => ({
    allArticles: [],
    articles: { articles: [], page: {} },
  }),
  actions: {
    getAllArticles(page = 1) {
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/articles?page=${page}`)
        .then((res) => {
          this.allArticles = this.allArticles.concat(res.data.articles);

          if (
            res.data.pagination.total_pages > 1 &&
            res.data.pagination.current_page < res.data.pagination.total_pages
          ) {
            this.getAllArticles(page + 1);
          }
        });
    },
    getArticles(page = 1) {
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/articles?page=${page}`)
        .then((res) => {
          this.articles.articles = res.data.articles;
          this.articles.page = res.data.pagination;
        });
    },
  },
  getters: {
    news: ({ allArticles }) =>
      allArticles.filter((article) => article.category === "新聞"),
    reviews: ({ allArticles }) =>
      allArticles.filter((article) => article.category === "心得"),
    unboxings: ({ allArticles }) =>
      allArticles.filter((article) => article.category === "開箱"),
  },
});
