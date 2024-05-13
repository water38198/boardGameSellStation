<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="news">
    <div class="container py-7 bg-white rounded-2">
      <div class="row justify-content-end">
        <div
          class="d-none d-lg-block col-lg-6 news-image"
        ></div>
        <div class="col-lg-6">
          <template v-if="articles">
            <h2 class="fs-2 text-theme ps-2 mb-4">最新消息</h2>
            <ul class="list-group list-group-flush">
              <li v-for="(article, index) in articles"
              :key="article.id" class="list-group-item py-3"
              data-aos="fade-up" :data-aos-duration="1000 + 250 * index">
                <RouterLink :to="`/article/${article.id}`"
                class="link-theme text-decoration-none fs-4 d-block">
                  <span class="me-2 me-sm-4 bg-theme text-white fw-bold list-number">
                    {{ index + 1 }}
                  </span>
                  <span class="text-b60 fs-6 me-2 me-sm-3">
                    {{this.$timeTransform(article.create_at) }}
                  </span>
                  <span class="w-50 fs-4 text-truncate" :title="article.description">
                    {{ article.title }}
                  </span>
                </RouterLink>
              </li>
            </ul>
            <div class="text-center mt-4 mt-xl-5">
              <RouterLink :to="`/articles/news`" class="btn btn-be4 text-b60 fs-4">
              更多消息
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news{
  min-height: 450px;
  background: linear-gradient(90deg, white 50%, transparent 50%);
  &-image{
    background-image: url(@/assets/home/home-news.jpg);
    background-size: cover;
  }
  > div{
    margin-top: -100px;
  }
  .list-number{
    font-size: 80%;
    padding: 3px 8px;
    border-radius: 3px;
  }
}
.list-group-item:has(a:hover) {
  background: #efefef;
}
</style>
