<script setup>
import { ref, computed, onMounted } from "vue";

const todos = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const filterStatus = ref("all"); 
const currentPage = ref(1);
const itemsPerPage = 10;


const fetchTodos = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) throw new Error("Failed to fetch To-Dos");
    todos.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};


const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    return (
      todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterStatus.value === "all" ||
        (filterStatus.value === "completed" && todo.completed) ||
        (filterStatus.value === "pending" && !todo.completed))
    );
  });
});


const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTodos.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / itemsPerPage)
);


const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};


onMounted(fetchTodos);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">To-Do List</h1>

    <p v-if="loading" class="text-blue-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- Search and Filter -->
    <div class="mt-4 flex gap-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search To-Do's...."
        class="p-2 border rounded-md w-1/2 cursor-pointer hover:border-blue-200"
      />

      <select v-model="filterStatus" class="p-2 border rounded-md">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <!-- To-Do List -->
    <ul v-if="!loading && !error" class="mt-4 space-y-3">
      <li
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="p-3 bg-white shadow rounded-md border border-gray-200"
      >
        <router-link
          :to="`/todo/${todo.id}`"
          class="text-blue-600 hover:underline"
        >
          {{ todo.title }}
        </router-link>
        <span
          :class="todo.completed ? 'text-green-500' : 'text-red-500'"
          class="ml-2"
        >
          ({{ todo.completed ? "Completed" : "Pending" }})
        </span>
      </li>
    </ul>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex justify-center gap-2">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      <span class="px-4 py-1 border rounded-md bg-blue-500 text-white">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
