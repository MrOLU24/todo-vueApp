<script setup>
import { ref } from "vue";
import { useTodos } from "../composables/useTodos";

const { todos } = useTodos();
const showModal = ref(false);
const newTodoTitle = ref("");

const addTodo = () => {
  if (!newTodoTitle.value.trim()) return;

  const newTodo = {
    id: Date.now(),
    title: newTodoTitle.value,
    completed: false,
  };

  todos.value.unshift(newTodo);
  newTodoTitle.value = "";
  showModal.value = false;
};
</script>

<template>
  <div>
    <button @click="showModal = true" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
      + Add New To-Do
    </button>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-md w-96">
        <h2 class="text-xl font-bold">Add New To-Do</h2>
        <input v-model="newTodoTitle" placeholder="Enter title..." class="mt-4 p-2 border rounded-md w-full" />

        <div class="mt-4 flex justify-end gap-2">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
          <button @click="addTodo" class="px-4 py-2 bg-green-500 text-white rounded-md">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>