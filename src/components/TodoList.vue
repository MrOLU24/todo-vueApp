<template>
    <div class="todo-list">
        <h1>Todo List</h1>
        <ul>
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox" v-model="todo.completed" />
                <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
                <button @click="removeTodo(index)">Remove</button>
            </li>
        </ul>
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
        <button @click="addTodo">Add</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
            newTodo: ''
        };
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim() !== '') {
                this.todos.push({ text: this.newTodo, completed: false });
                this.newTodo = '';
            }
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        }
    }
};
</script>

<style scoped>
.todo-list {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.completed {
    text-decoration: line-through;
}
</style>