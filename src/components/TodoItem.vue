<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["todo"]);
const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <li class="p-3 bg-white shadow rounded-md border flex justify-between">
    <div>
      <router-link :to="`/todo/${todo.id}`" class="text-blue-600 hover:underline">
        {{ todo.title }}
      </router-link>
      <span :class="todo.completed ? 'text-green-500' : 'text-red-500'" class="ml-2">
        ({{ todo.completed ? "Completed" : "Pending" }})
      </span>
    </div>
    <div class="flex gap-2">
      <button @click="$emit('edit', todo)" class="px-2 py-1 bg-yellow-500 text-white rounded-md">Edit</button>
      <button @click="$emit('delete', todo.id)" class="px-2 py-1 bg-red-500 text-white rounded-md">Delete</button>
    </div>
  </li>
</template>