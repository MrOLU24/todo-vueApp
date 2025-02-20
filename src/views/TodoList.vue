<script setup>
import { computed, ref } from "vue";
import TodoItem from "../components/TodoItem.vue";
import Pagination from "../components/Pagination.vue";
import SearchFilter from "../components/SearchFilter.vue";
import AddTodoModal from "../components/AddTodoModal.vue";
import EditTodoModal from "../components/EditTodoModal.vue";
import { useTodos } from "../composables/useTodos";

const { todos } = useTodos();
const searchQuery = ref("");
const filterStatus = ref("all");
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedTodo = ref(null);

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

// Update To-Do
const updateTodo = (updatedTodo) => {
  const index = todos.value.findIndex((t) => t.id === updatedTodo.id);
  if (index !== -1) {
    todos.value[index] = updatedTodo;
  }
  selectedTodo.value = null;
};

// Delete To-Do
const deleteTodo = (id) => {
  if (confirm("Are you sure you want to delete this To-Do?")) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">To-Do List</h1>

    <!-- Search & Filter Component -->
    <SearchFilter v-model:search="searchQuery" v-model:filter="filterStatus" />

    <!-- Add To-Do Modal -->
    <AddTodoModal />

    <!-- To-Do List -->
    <ul v-if="paginatedTodos.length" class="mt-4 space-y-3">
      <TodoItem v-for="todo in paginatedTodos" :key="todo.id" :todo="todo" @edit="selectedTodo = todo" @delete="deleteTodo" />
    </ul>
    <p v-else class="text-gray-500">No To-Dos found.</p>

    <!-- Pagination Component -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @changePage="goToPage" />

    <!-- Edit To-Do Modal -->
    <EditTodoModal v-if="selectedTodo" :todo="selectedTodo" @updateTodo="updateTodo" @close="selectedTodo = null" />
  </div>
</template>