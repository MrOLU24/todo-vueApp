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

  
  watch(todos, saveTodos, { deep: true });

 
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


  const addTodo = (newTodo) => {
    const newTask = {
      id: Date.now(), 
      title: newTodo.title,
      completed: false,
    };

    todos.value = [newTask, ...todos.value]; 
    console.log("Updated To-Dos:", todos.value);

  };


  onMounted(() => {
    loadTodos();
    fetchTodos();
  });

  return { todos, addTodo };
}