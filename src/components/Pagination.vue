<script setup>
defineProps(["currentPage", "totalPages"]);
defineEmits(["changePage"]);
</script>

<template>
  <div class="mt-4 flex justify-center space-x-2">
    <button @click="$emit('changePage', currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-200 rounded-md">
      Prev
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="$emit('changePage', currentPage + 1)" :disabled="currentPage >= totalPages" class="px-3 py-1 bg-gray-200 rounded-md">
      Next
    </button>
  </div>
</template>
