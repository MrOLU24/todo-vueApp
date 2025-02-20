import { ref, watch, onMounted } from "vue";

export function useTodos() {
  const todos = ref([]);

  // Load from local storage on mount
  onMounted(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos);
    }
  });

  // Watch for changes & save to local storage
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  return { todos };
}