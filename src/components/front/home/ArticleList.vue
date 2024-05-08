<script>
import useTimeTransform from '@/composables/useTimeTransform';

export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { timeTransform } = useTimeTransform();
    return {
      timeTransform,
    };
  },
};
</script>

<template>
  <section class="bg-white pt-5 pb-4">
    <div class="container">
      <h3 class="text-theme fs-1 text-center mb-5">{{ category }}</h3>
      <div class="row">
        <div class="col-12"
        v-for="(article, index) in articles" :key="article.id" data-aos="fade-up"
          :data-aos-duration="1000 + 250 * index">
          <RouterLink :to="`/article/${article.id}`" class="text-decoration-none text-black">
            <div class="card mb-5 border-0 bg-b10">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="article.image" class="rounded-start w-100" alt="articleImage"/>
                </div>
                <div class="col-12 col-md-8">
                  <div
                  class="card-body d-flex flex-column justify-content-center h-100 mx-md-5">
                    <h5 class="card-title fs-2">
                      {{ article.title }}
                    </h5>
                    <span class="text-b60">{{timeTransform(article.create_at)}}</span>
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
          <RouterLink to="/articles/reviews" class="btn btn-lg btn-be4 text-b60 rounded-0">
            更多心得</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
img[alt='articleImage']{
  height: 300px;
}
</style>
