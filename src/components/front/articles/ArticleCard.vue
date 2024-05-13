<script>
import useTimeTransform from '@/composables/useTimeTransform';

export default {
  setup() {
    const { timeTransform } = useTimeTransform();
    return {
      timeTransform,
    };
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
    index: {
      typeof: Number,
      required: true,
    },
  },
};
</script>

<template>
  <li
    class="list-group-item d-flex px-0 px-sm-4 py-4 align-items-center overflow-hidden"
  >
    <span class="me-1 me-md-4 bg-theme text-white fw-bold list-number">{{ index + 1 }}</span>
    <RouterLink :to="`../article/${article.id}`"
      class="w-100 d-flex align-items-center link-dark text-decoration-none link-hover article-card"
    >
      <img :src="article.image" alt="article image" class="rounded-3 d-block"
        onerror="this.onerror=null;this.src='/src/assets/no_image_icon.png'"/>
      <div class="ms-3 overflow-hidden">
        <h3 class="fs-4 text-truncate pe-3">{{ article.title }}</h3>
        <span class="text-b60">{{timeTransform(article.create_at)}}</span>
        <p class="mb-0 pe-3 text-truncate">{{ article.description }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
.list-number{
  font-size: 80%;
  padding: 3px 8px;
  border-radius: 3px;
}

.link-hover:hover h3 {
  text-decoration: underline;
  color: #0fb99b;
}

img{
  width: 100px;
  aspect-ratio: 1;
}
</style>
