<script>
import { mapActions } from 'pinia';
import utilities from '@/stores/utilities';
import newsImage from '@/assets/home/home-news.jpg';
import articleBanner from '@/assets/home/section-image.jpg';
import axios from 'axios';

export default {
  data() {
    return {
      newsImage,
      articleBanner,
      products: [],
      articles: [],
    };
  },
  methods: {
    getProducts() {
      const { VITE_URL, VITE_PATH } = import.meta.env;
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`).then((res) => {
        this.products = res.data.products;
      });
    },
    getArticles() {
      const { VITE_URL, VITE_PATH } = import.meta.env;
      this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/articles`).then((res) => {
        this.articles = res.data.articles;
      });
    },
    filterArticles(category, number) {
      const array = [...this.articles];
      return array
        .filter((article) => article.category === category)
        .slice(0, number);
    },
    ...mapActions(utilities, ['timeTransform']),
  },
  mounted() {
    this.getProducts();
    this.getArticles();
  },
};
</script>

<template>
  <div class="bg-b20">
    <div class="banner">
      <h1 class="h1 text-white text-center fw-bold lh-lg">
        我的多餘<br />你來撿便宜
      </h1>
      <div class="d-flex justify-content-center mt-5">
        <RouterLink
          to="/products"
          class="btn btn-light fs-5"
          style="
            padding: 20px 60px;
            box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.6);
          "
          >馬上去逛!</RouterLink
        >
      </div>
    </div>
    <main>
      <!-- 最新消息 -->
      <div
        style="background: linear-gradient(90deg, white 50%, transparent 50%)"
      >
        <div
          class="container py-7 bg-white rounded-2"
          style="margin-top: -100px"
        >
          <div class="row justify-content-end">
            <div
              class="d-none d-lg-block col-lg-6"
              style="background-size: cover"
              :style="{ backgroundImage: 'url(' + newsImage + ')' }"
            ></div>
            <div class="col-lg-6">
              <template v-if="articles">
                <h2 class="fs-2 text-theme ps-2 mb-4">最新消息</h2>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="(article, index) in filterArticles('新聞', 5)"
                    :key="article.id"
                    class="list-group-item py-3"
                    data-aos="fade-up"
                    :data-aos-duration="1000 + 250 * index"
                  >
                    <RouterLink
                      :to="`/article/${article.id}`"
                      class="link-theme text-decoration-none fs-4 d-block"
                    >
                      <span
                        class="me-2 me-sm-4 bg-theme text-white fw-bold"
                        style="
                          font-size: 80%;
                          padding: 3px 8px;
                          border-radius: 3px;
                        "
                        >{{ index + 1 }}</span
                      >
                      <span class="text-b60 fs-6 me-2 me-sm-3">{{
                        timeTransform(article.create_at)
                      }}</span>
                      <span
                        class="w-50 fs-4 text-truncate"
                        :title="article.description"
                        >{{ article.title }}</span
                      >
                    </RouterLink>
                  </li>
                </ul>
                <div class="text-center my-4 my-xl-5">
                  <RouterLink
                    :to="`/articles/news`"
                    class="btn btn-be4 text-b60 fs-4"
                    >更多消息</RouterLink
                  >
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新消息 -->
      <!-- 最新上架 -->
      <div style="background: linear-gradient(transparent 50%, #0fb99b 50%)">
        <div class="container py-5 my-xl-5">
          <h2 class="fs-1 mb-5 d-flex justify-content-between">
            最新上架
            <RouterLink :to="`/products`" class="btn btn-be4 text-b60 fs-4"
              >更多商品</RouterLink
            >
          </h2>
          <div class="row g-3">
            <div
              class="col-12 col-lg-4"
              v-for="(product, index) in products.slice(0, 3)"
              :key="product.id"
              data-aos="zoom-in"
              :data-aos-duration="1000 + 250 * index"
            >
              <RouterLink
                :to="`/product/${product.id}`"
                class="text-decoration-none text-black"
              >
                <div class="card">
                  <div class="row">
                    <div class="col-md-6 col-lg-12">
                      <img
                        :src="product.imageUrl"
                        class="card-img-top img-fluid home-product-image"
                        :alt="product.title"
                      />
                    </div>
                    <div class="col-md-6 col-lg-12">
                      <div
                        class="card-body d-flex flex-column-reverse flex-lg-column h-100"
                      >
                        <div class="fs-4 mb-3 d-none d-md-block">
                          <span class="badge bg-theme me-3">{{
                            product.category
                          }}</span>
                          <span class="badge bg-theme me-3">{{
                            product.language
                          }}</span>
                          <span class="badge bg-theme me-3">{{
                            product.condition
                          }}</span>
                        </div>
                        <p class="mb-auto d-lg-none mt-3 multi-text-truncate">
                          介紹:<br />
                          {{ product.description }}
                        </p>
                        <h5 class="card-title fs-2">
                          {{ product.title }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新上架 -->
      <!-- 價格更新 -->
      <section
        style="
          background-color: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          );
          background-size: cover;
          background-position: center;
          padding-top: 100px;
          padding-bottom: 100px;
        "
        :style="{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) center center / cover,url(' +
            articleBanner +
            ')',
        }"
      >
        <div class="container text-center">
          <p class="text-white fs-2 mb-4">還在猶豫嗎?</p>
          <p class="text-white fs-2">看看我的心得與開箱吧!</p>
        </div>
      </section>
      <section class="bg-white py-5">
        <div class="container">
          <h3 class="text-theme fs-1 text-center mb-5">心得</h3>
          <div class="row">
            <div
              class="col-12"
              v-for="(article, index) in filterArticles('心得', 3)"
              :key="article.id"
              data-aos="fade-up"
              :data-aos-duration="1000 + 250 * index"
            >
              <RouterLink
                :to="`/article/${article.id}`"
                class="text-decoration-none text-black"
              >
                <div class="card mb-5 border-0 bg-b10">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        :src="article.image"
                        class="rounded-start"
                        alt="articleImage"
                        style="object-fit: cover; width: 100%; height: 300px"
                      />
                    </div>
                    <div class="col-12 col-md-8">
                      <div
                        class="card-body d-flex flex-column justify-content-center h-100 mx-md-5"
                      >
                        <h5 class="card-title fs-2">
                          {{ article.title }}
                        </h5>
                        <span class="text-b60">{{
                          timeTransform(article.create_at)
                        }}</span>
                        <p class="card-text mt-3 fs-5 multi-text-truncate">
                          {{ article.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
            <div class="text-center my-4 my-xl-5">
              <RouterLink
                to="/articles/reviews"
                class="btn btn-lg btn-be4 text-b60 rounded-0"
              >
                更多心得</RouterLink
              >
            </div>
          </div>
          <h3 class="text-theme fs-1 text-center mb-5">開箱</h3>
          <div class="row">
            <div
              class="col-12"
              v-for="(article, index) in filterArticles('開箱', 3)"
              :key="article.id"
              data-aos="fade-up"
              :data-aos-duration="1000 + 250 * index"
            >
              <RouterLink
                :to="`/article/${article.id}`"
                class="text-decoration-none text-black"
              >
                <div class="card mb-5 border-0 bg-b10">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        :src="article.image"
                        class="rounded-start"
                        alt="articleImage"
                        style="object-fit: cover; width: 100%; height: 300px"
                      />
                    </div>
                    <div class="col-12 col-md-8">
                      <div
                        class="card-body d-flex flex-column justify-content-center h-100 mx-md-5"
                      >
                        <h5 class="card-title fs-2">
                          {{ article.title }}
                        </h5>
                        <span class="text-b60">{{
                          timeTransform(article.create_at)
                        }}</span>
                        <p class="card-text mt-3 fs-5 multi-text-truncate">
                          {{ article.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
            <div class="text-center my-4 my-xl-5">
              <RouterLink
                to="/articles/unboxings"
                class="btn btn-lg btn-be4 text-b60 rounded-0"
              >
                更多開箱</RouterLink
              >
            </div>
          </div>
        </div>
      </section>
      <section class="container faq">
        <div class="text-center faq-icon">
          <i class="bi bi-question-circle-fill"></i>
        </div>
        <h2 class="h2 fs-1 text-center">FAQ常見問題</h2>
        <p class="fs-4 text-b60 my-5 text-center">
          如果沒有找到您要的答案，歡迎透過下方電子郵件、FaceBook、IG聯絡我們
        </p>
        <div class="accordion" id="faq">
          <div class="">
            <h2 class="" id="flush-headingOne">
              <button
                class="accordion-button collapsed bg-b20 ps-0 border-bottom fs-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                可以貨到付款嗎?
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#faq"
            >
              <div class="accordion-body bg-white fs-5 py-5">
                可以，運費由買家自行負擔。(7-11+35、全家+39、蝦皮+60)
              </div>
            </div>
          </div>
          <div>
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed bg-b20 ps-0 fs-2 border-bottom"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                發現內容物不符怎麼辦?
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#faq"
            >
              <div class="accordion-body bg-white fs-5 py-5">
                請立即與我們聯絡，收貨後超過兩星期則視同無異議。
              </div>
            </div>
          </div>
          <div>
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed bg-b20 ps-0 fs-2 border-bottom"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                有什麼收貨方式呢?
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#faq"
            >
              <div class="accordion-body bg-white fs-5 py-5">
                推薦使用超商貨到付款，少部分特殊商品規格不符只能使用郵局寄送。
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.banner {
  background: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%),
    url(@/assets/home/banner-image.jpg);
  background-size: cover;
  padding-top: 180px;
  padding-bottom: 280px;
}
@media (min-width: 576px) {
  .banner {
    padding-top: 230px;
    padding-bottom: 280px;
  }
}
.home-product-image {
  height: 250px;
  object-fit: cover;
  object-position: 50% top;
}

.multi-text-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.faq {
  padding-top: 20px;
  padding-bottom: 40px;
  &-icon {
    font-size: 120px;
    margin-bottom: 40px;
  }
}
@media (min-width: 992px) {
  .home-product-image {
    height: 400px;
    object-fit: cover;
  }
  .faq {
    padding-top: 100px;
    padding-bottom: 100px;
    &-icon {
      margin-bottom: 80px;
    }
  }
}
</style>
