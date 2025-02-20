import { ref, watch, onMounted } from "vue";

export function useTodos() {
  const todos = ref([]);

  // Load To-Dos from Local Storage
  const loadTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }
  };

  // Save To-Dos to Local Storage
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  // Watch todos and update Local Storage when it changes
  watch(todos, saveTodos, { deep: true });

  // Fetch To-Dos from API if Local Storage is empty
  const fetchTodos = async () => {
    if (todos.value.length === 0) {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) throw new Error("Failed to fetch To-Dos");
        todos.value = await response.json();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // Load from Local Storage & fetch from API on mount
  onMounted(() => {
    loadTodos();
    fetchTodos();
  });

  return { todos };
}