<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const todo = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchTodoDetails = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${route.params.id}`
    );
    if (!response.ok) throw new Error("Failed to fetch To-Do details");
    todo.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTodoDetails);
</script>

<template>
  <div class="p-6">
    <router-link to="/" class="text-blue-500 hover:underline">← Back</router-link>

    <h1 class="text-2xl font-bold mt-4">To-Do Details</h1>

    <p v-if="loading" class="text-blue-500">Loading...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div v-if="todo" class="mt-4 p-4 bg-white shadow rounded-md border border-gray-200">
      <h2 class="text-lg font-semibold">{{ todo.title }}</h2>
      <p>Status: <span :class="todo.completed ? 'text-green-500' : 'text-red-500'">
        {{ todo.completed ? "Completed" : "Pending" }}
      </span></p>
    </div>
  </div>
</template>