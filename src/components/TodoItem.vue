<script setup>
defineProps(["todo"]);
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
  </li>
</template>
