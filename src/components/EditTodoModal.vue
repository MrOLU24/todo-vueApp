<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["todo"]);
const emit = defineEmits(["updateTodo", "close"]);
const editedTodo = ref({ ...props.todo });

const saveTodo = () => {
  emit("updateTodo", editedTodo.value);
  emit("close");
};
</script>

<template>
  <div v-if="props.todo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md w-96">
      <h2 class="text-xl font-bold">Edit To-Do</h2>
      <input v-model="editedTodo.title" class="mt-4 p-2 border rounded-md w-full" />
      <select v-model="editedTodo.completed" class="mt-4 p-2 border rounded-md w-full">
        <option :value="true">Completed</option>
        <option :value="false">Pending</option>
      </select>

      <div class="mt-4 flex justify-end gap-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
        <button @click="saveTodo" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
      </div>
    </div>
  </div>
</template>