<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
}
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
                class="link-theme text-decoration-none fs-4 d-block text-truncate">
                  <span class="me-2 me-sm-4 bg-theme text-white fw-bold list-number">
                    {{ index + 1 }}
                  </span>
                  <span class="text-b60 fs-6 me-2 me-sm-3">
                    {{ $timeTransform(article.create_at) }}
                  </span>
                  <span class="fs-6 fs-md-4" :title="article.description">
                    {{ article.title }}
                  </span>
                </RouterLink>
              </li>
            </ul>
            <div class="text-center mt-4 mt-xl-5">
              <RouterLink :to="`/articles?category=新聞`" class="btn btn-be4 text-b60 fs-4">
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
    background-image: url(@/assets/images/front/homepage/home-news.jpg);
    background-size: cover;
    border-radius: .5rem;
  }
  > div{
    margin-top: -100px;
  }
  .list-number{
    display: inline-block;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 5px;
  }
}
.list-group-item:has(a:hover) {
  background: #efefef;
}
</style>