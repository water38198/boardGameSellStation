<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  emits: ['changeCategory'],
};
</script>
<template>
  <div class="article-navbar">
    <h3 class="text-theme text-center h3 py-md-7">文章類別</h3>
  <div
    class="list-group text-center flex-row flex-lg-column list-group-flush article-list-group"
  >
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{'active':!category}"
      aria-current="true"
      data-bs-toggle="list"
    @click="$emit('changeCategory','全部')"
      id="all"
    >
    <span class="d-none d-sm-block">全部文章</span>
    <span class="d-sm-none">全部</span>
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{'active':category ==='新聞'}"
      data-bs-toggle="list"
      @click="$emit('changeCategory','新聞')"
      id="news"
    >
    <span class="d-none d-sm-block">最新消息</span>
    <span class="d-sm-none">新聞</span>
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{'active':category ==='心得'}"
      data-bs-toggle="list"
      @click="$emit('changeCategory','心得')"
      id="reviews"
    >
    <span class="d-none d-sm-block">心得分享</span>
    <span class="d-sm-none">心得</span>
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{'active':category ==='開箱'}"
      data-bs-toggle="list"
      @click="$emit('changeCategory','開箱')"
      id="unboxings">
    <span class="d-none d-sm-block">開箱文章</span>
    <span class="d-sm-none">開箱</span>
    </button>
  </div>
  </div>

</template>

<style scoped lang="scss">
.article-navbar{
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
