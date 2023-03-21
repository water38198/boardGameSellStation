<template>
  <div class="container py-5 bg-white">
    <div class="row g-3">
      <div class="col-lg-3 col-xl-2">
        <div
          class="list-group text-center flex-row flex-lg-column list-group-flush article-list-group"
          style="position: sticky; top: 90px"
        >
          <button
            type="button"
            class="list-group-item list-group-item-action"
            aria-current="true"
            data-bs-toggle="list"
            @click="changeCategory('all', $event)"
            id="all"
          >
            所有文章
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
            @click="changeCategory('news', $event)"
            id="news"
          >
            最新消息
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
            @click="changeCategory('reviews', $event)"
            id="reviews"
          >
            心得分享
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
            @click="changeCategory('unboxings', $event)"
            id="unboxings"
          >
            開箱文章
          </button>
        </div>
      </div>
      <div class="col-lg-9 col-xl-10">
        <h2 class="fs-2 bg-theme py-7 ps-4 text-white mb-0 rounded-top">
          <i class="bi bi-card-list me-2"></i>{{ listTitle }}
        </h2>
        <ol class="list-group list-group-flush">
          <li
            v-for="(article, index) in tempArticles"
            :key="article.id"
            class="list-group-item d-flex px-4 py-4 align-items-center"
          >
            <span
              class="me-4 bg-theme text-white fw-bold"
              style="font-size: 80%; padding: 3px 8px; border-radius: 3px"
              >{{ index + 1 }}</span
            >

            <RouterLink
              :to="`../article/${article.id}`"
              class="d-flex align-items-center link-dark text-decoration-none link-hover"
              style="height: 100px; min-width: 0"
            >
              <div class="position-relative link-image">
                <img
                  :src="article.image"
                  alt=""
                  style="width: 100px; height: 100px; object-fit: cover"
                  class="rounded-3"
                  onerror="this.onerror=null;this.src='/src/assets/no_image_icon.png'"
                />
              </div>

              <div class="ms-3" style="flex: 1; min-width: 0">
                <h3 class="fs-4">{{ article.title }}</h3>
                <span class="text-b60">{{
                  timeTransform(article.create_at)
                }}</span>

                <p class="mb-0 text-truncate">{{ article.description }}</p>
              </div>
            </RouterLink>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import utilities from "../../stores/utilities";
import articleStore from "../../stores/articleStore";

export default {
  data() {
    return {
      category: "",
      listTitle: "",
      randomPic: "https://picsum.photos/100",
    };
  },
  computed: {
    ...mapState(articleStore, ["news", "reviews", "unboxings", "articles"]),
    tempArticles() {
      if (this.category === "all" || this.category === "") {
        return this.articles.articles;
      } else {
        return this[this.category];
      }
    },
  },
  methods: {
    changeCategory(category, event) {
      this.listTitle = event.target.textContent;
      this.category = category;
    },
    ...mapActions(utilities, ["timeTransform"]),
  },
  mounted() {
    //從別的頁面進入時跳轉
    this.category = this.$route.params.category;
    const el = document.querySelector(`#${this.category}`);
    el.classList.add("active");
    this.listTitle = el.textContent;
    //從自己的頁面跳轉(news->reviews)，監聽params
    this.$watch(
      () => this.$route.params,
      () => {
        const { category } = this.$route.params;
        if (category) {
          const allButtons = document.querySelectorAll(".list-group button");
          allButtons.forEach((button) => {
            button.classList.remove("active");
          });
          const newEl = document.querySelector(`#${category}`);
          newEl.classList.add("active");
          this.category = category;
        }
      }
    );
  },
};
</script>

<style>
.link-hover:hover h3 {
  text-decoration: underline;
  color: #0fb99b;
}
/* 圖片hover時變暗 */
.link-hover .link-image:before {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
}
.link-hover:hover .link-image:before {
  background-color: rgba(0, 0, 0, 0.3);
}
/* 圖片hover時變暗 */
button.list-group-item.active {
  color: white;
}
.article-list-group {
  font-size: 1.25rem;
}
.list-group-flush > .list-group-item:last-child {
  border-bottom: var(--bs-list-group-border-width) solid
    var(--bs-list-group-border-color);
}

@media (min-width: 768px) {
  .article-list-group {
    font-size: 1.5rem;
  }
}
</style>
