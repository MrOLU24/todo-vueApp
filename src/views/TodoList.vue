<script setup>
import { ref, onMounted } from "vue";

const todos = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch To-Dos from API
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


onMounted(fetchTodos);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">To-Do List</h1>

    <p v-if="loading" class="text-blue-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <ul v-if="!loading && !error" class="mt-4 space-y-3">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="p-3 bg-white shadow rounded-md border border-gray-200"
      >
        <router-link
          :to="`/todo/${todo.id}`"
          class="text-blue-600 hover:underline"
        >
          {{ todo.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>