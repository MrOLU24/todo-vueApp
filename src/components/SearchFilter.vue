<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  search: String,
  filter: String,
});

const emit = defineEmits(["update:search", "update:filter"]);

const searchQuery = ref(props.search);
const filterStatus = ref(props.filter);

watch(searchQuery, (newVal) => emit("update:search", newVal));
watch(filterStatus, (newVal) => emit("update:filter", newVal));
</script>

<template>
  <div class="flex gap-4 my-4">
 
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search To-Dos..."
      class="border p-2 rounded-md w-full"
    />


    <select v-model="filterStatus" class="border p-2 rounded-md">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  </div>
</template>