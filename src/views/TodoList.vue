<script setup>
import { computed, ref } from "vue";
import TodoItem from "../components/TodoItem.vue";
import Pagination from "../components/Pagination.vue";
import SearchFilter from "../components/SearchFilter.vue";
import { useTodos } from "../composables/useTodos";

const { todos } = useTodos(); // ✅ Use `todos` correctly
const searchQuery = ref("");
const filterStatus = ref("all");
const currentPage = ref(1);
const itemsPerPage = 10;

// Computed properties for filtering & pagination
const filteredTodos = computed(() => {
  return todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTodos.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / itemsPerPage));

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">To-Do List</h1>

    <!-- Search & Filter Component -->
    <SearchFilter v-model:search="searchQuery" v-model:filter="filterStatus" />

    <!-- To-Do List -->
    <ul v-if="paginatedTodos.length" class="mt-4 space-y-3">
      <TodoItem v-for="todo in paginatedTodos" :key="todo.id" :todo="todo" />
    </ul>
    <p v-else class="text-gray-500">No To-Dos found.</p>

    <!-- Pagination Component -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @changePage="goToPage" />
  </div>
</template>