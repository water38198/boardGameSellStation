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
            class="list-group-item d-flex px-0 px-sm-4 py-4 align-items-center"
          >
            <span
              class="me-4 bg-theme text-white fw-bold"
              style="font-size: 80%; padding: 3px 8px; border-radius: 3px"
              >{{ index + 1 }}</span
            >
            <RouterLink
              :to="`../article/${article.id}`"
              class="w-100 d-flex align-items-center link-dark text-decoration-none link-hover"
              style="height: 100px;"
            >
              <div class="position-relative link-image">
                <img
                  :src="article.image"
                  alt="article image"
                  style="width: 100px; height: 100px;"
                  class="rounded-3"
                  onerror="this.onerror=null;this.src='/src/assets/no_image_icon.png'"
                />
              </div>
              <div class="ms-3" style="flex: 1; min-width: 0">
                <h3 class="fs-4 text-truncate">{{ article.title }}</h3>
                <span class="text-b60">{{
                  timeTransform(article.create_at)
                }}</span>
                <p class="mb-0 text-truncate">{{ article.description }}</p>
              </div>
            </RouterLink>
          </li>
</template>

<style scoped lang="scss">
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
</style>
