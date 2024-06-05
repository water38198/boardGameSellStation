<script>
export default {
  props: {
    currentCategory: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      required: true,
    }
  }
}
</script>

<template>
  <div class="product-category">
    <slot name="title"></slot>
    <div class="list-group text-center fs-5 flex-row flex-lg-column list-group-flush overflow-scroll">
      <template v-for="category in categoryList" :key="category">
        <a class="list-group-item list-group-item-action list-group-item text"
        :class="{'active':currentCategory=== category}" aria-current="true" data-bs-toggle="list"
        href="#" @click.prevent="$emit('changeCategory', category)">{{ category }}</a>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-category {
  position: sticky;
  top: 90px;
  z-index: 1020;
}

.list-group-item{
  text-wrap: nowrap;
}
.list-group-item.active{
  pointer-events: none;
}

.list-group-flush > .list-group-item:last-child {
  border-bottom: var(--bs-list-group-border-width) solid
    var(--bs-list-group-border-color);
}
</style>