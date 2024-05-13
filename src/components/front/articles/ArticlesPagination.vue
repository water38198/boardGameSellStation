<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  emits: ['changePage'],
};
</script>
<template>
  <nav aria-label="Page navigation" class="mt-5" v-if="pagination.total_pages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="$emit('changePage',pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{ active: page === pagination.current_page,}"
        v-for="page in pagination.total_pages" :key="page + 'page'">
        <a class="page-link" href="#" @click.prevent="$emit('changePage',page)">
          {{page}}
        </a>
      </li>
      <li class="page-item" :class="{
        disabled: pagination.current_page === pagination.total_pages}">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="$emit('changePage',pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
