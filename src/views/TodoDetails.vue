<script setup>
import { defineProps } from "vue";

defineProps(["id"]);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">To-Do Details</h1>
    <p>Showing details for To-Do ID: {{ id }}</p>
  </div>
</template>
