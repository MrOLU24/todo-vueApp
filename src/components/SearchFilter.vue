<script setup>
defineProps(["search", "filter"]);
defineEmits(["update:search", "update:filter"]);
</script>

<template>
  <div class="mt-4 flex gap-4">
    <input
      type="text"
      :value="search"
      @input="$emit('update:search', $event.target.value)"
      placeholder="Search To-Dos..."
      class="p-2 border rounded-md w-1/2"
    />
    <select :value="filter" @change="$emit('update:filter', $event.target.value)" class="p-2 border rounded-md">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  </div>
</template>