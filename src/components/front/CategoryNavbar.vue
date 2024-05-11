<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    categoryList: {
      type: Array,
      required: true,
    },
  },
  emits: ['changeCategory'],
};
</script>

<template>
  <div class="navbar-container">
    <slot name="header"></slot>
    <div
      class="list-group text-center fs-6 fs-md-5
        flex-row flex-lg-column list-group-flush mt-4"
    >
      <button type="button" class="list-group-item list-group-item-action list-group-item"
        aria-current="true" data-bs-toggle="list"
        v-for="item in categoryList" :key="item"
        :class="{'active': category === item}"
        @click="$emit('changeCategory',item)"
        id=""
      >
      <span>{{ item }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar-container{
  position: sticky;
  top: 90px;
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
