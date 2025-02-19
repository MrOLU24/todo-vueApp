<script setup>
import { ref, computed, onMounted } from "vue";

const todos = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const filterStatus = ref("all");
const currentPage = ref(1);
const itemsPerPage = 10;

// Modal states for creating & editing
const showCreateModal = ref(false);
const showEditModal = ref(false);
const newTodoTitle = ref("");
const isSubmitting = ref(false);
const selectedTodo = ref(null);

// Fetch To-Dos
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

// Apply search and filtering
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

// Pagination logic
const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTodos.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / itemsPerPage));

// Change page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Create a new To-Do
const addTodo = () => {
  if (!newTodoTitle.value.trim()) return;

  const newTodo = {
    id: todos.value.length + 1,
    title: newTodoTitle.value,
    completed: false,
  };

  todos.value.unshift(newTodo);
  newTodoTitle.value = "";
  showCreateModal.value = false;
};

// Open edit modal
const openEditModal = (todo) => {
  selectedTodo.value = { ...todo };
  showEditModal.value = true;
};

// Save edited To-Do
const saveTodo = () => {
  if (!selectedTodo.value) return;

  const index = todos.value.findIndex((t) => t.id === selectedTodo.value.id);
  if (index !== -1) {
    todos.value[index] = { ...selectedTodo.value };
  }
  showEditModal.value = false;
};

// Fetch To-Dos on mount
onMounted(fetchTodos);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">To-Do List</h1>

    <button @click="showCreateModal = true" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
      + Create To-Do
    </button>

    <div class="mt-4 flex gap-4">
      <input type="text" v-model="searchQuery" placeholder="Search To-Dos..." class="p-2 border rounded-md w-1/2" />
      <select v-model="filterStatus" class="p-2 border rounded-md">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <ul v-if="!loading && !error" class="mt-4 space-y-3">
      <li v-for="todo in paginatedTodos" :key="todo.id" class="p-3 bg-white shadow rounded-md border flex justify-between">
        <div>
          <router-link :to="`/todo/${todo.id}`" class="text-blue-600 hover:underline">
            {{ todo.title }}
          </router-link>
          <span :class="todo.completed ? 'text-green-500' : 'text-red-500'" class="ml-2">
            ({{ todo.completed ? "Completed" : "Pending" }})
          </span>
        </div>
        <button @click="openEditModal(todo)" class="px-2 py-1 bg-yellow-500 text-white rounded-md">
          Edit
        </button>
      </li>
    </ul>

    <div v-if="totalPages > 1" class="mt-6 flex justify-center gap-2">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        Prev
      </button>

      <span class="px-4 py-1 border rounded-md bg-blue-500 text-white">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        Next
      </button>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-md w-96">
        <h2 class="text-xl font-bold">Create New To-Do</h2>
        <input type="text" v-model="newTodoTitle" placeholder="Enter To-Do title..." class="mt-4 p-2 border rounded-md w-full" />
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showCreateModal = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
          <button @click="addTodo" class="px-4 py-2 bg-blue-500 text-white rounded-md">Add</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-md w-96">
        <h2 class="text-xl font-bold">Edit To-Do</h2>
        <input type="text" v-model="selectedTodo.title" placeholder="Edit title..." class="mt-4 p-2 border rounded-md w-full" />
        <select v-model="selectedTodo.completed" class="mt-4 p-2 border rounded-md w-full">
          <option :value="true">Completed</option>
          <option :value="false">Pending</option>
        </select>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showEditModal = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
          <button @click="saveTodo" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>