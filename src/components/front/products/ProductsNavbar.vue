<script>
export default {
  props: {
    category: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <div class="product-category">
    <h3 class="text-theme text-center h3">商品類別</h3>
    <div
      class="list-group text-center fs-6 fs-md-5
      flex-row flex-lg-column list-group-flush mt-4"
    >
      <a
        class="list-group-item list-group-item-action list-group-item"
        :class="{'active':category===''}"
        aria-current="true"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '')"
      >
        全部
      </a>
      <a
        class="list-group-item list-group-item-action"
        :class="{'active':category==='策略'}"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '策略')"
        >策略</a
      >
      <a
        class="list-group-item list-group-item-action"
        :class="{'active':category==='家庭'}"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '家庭')"
        >家庭</a
      >
      <a
        class="list-group-item list-group-item-action"
        :class="{'active':category==='派對'}"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '派對')"
        >派對</a
      >
      <a
        class="list-group-item list-group-item-action"
        :class="{'active':category==='雙人'}"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '雙人')"
        >雙人</a
      >
      <a
        class="list-group-item list-group-item-action"
        :class="{'active':category==='合作'}"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '合作')"
        >合作</a
      >
      <a
        class="list-group-item list-group-item-action"
        :class="{'active':category==='劇情'}"
        data-bs-toggle="list"
        href="#"
        @click.prevent="$emit('changeCategory', '劇情')"
        >劇情</a
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-category {
  position: sticky;
  top: 90px;
  z-index: 1020;
}
.list-group-item.active{
  pointer-events: none;
}

.list-group-flush > .list-group-item:last-child {
  border-bottom: var(--bs-list-group-border-width) solid
    var(--bs-list-group-border-color);
}
</style>
