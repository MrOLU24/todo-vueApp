import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import TodoDetails from "../views/TodoDetails.vue";

const routes = [
  { path: "/", component: TodoList },
  { path: "/todo/:id", component: TodoDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;