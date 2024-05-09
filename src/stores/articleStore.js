import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default defineStore('articleStore', {
  state: () => ({
    articles: [],
    articleLoading: false,
  }),
  actions: {
    getArticles(page = 1) {
      this.articleLoading = true;
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/articles?page=${page}`)
        .then((res) => {
          // 因為沒辦法使用 all 與 category 所以先把全部文章抓出
          this.articles = this.articles.concat(res.data.articles);
          if (
            res.data.pagination.total_pages > 1
            && res.data.pagination.current_page < res.data.pagination.total_pages
          ) {
            this.getArticles(page + 1);
          }
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        })
        .finally(() => {
          this.articleLoading = false;
        });
    },
  },
});
