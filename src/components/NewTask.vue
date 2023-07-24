<template>
  <h1>Add a new Task</h1>
  <div v-if="showErrorMessage">
    <p class="error-text">{{ errorMessage }}</p>
  </div>
  <div>
    <div class="input-field">
      <input type="text" placeholder="Add a Task Title here" v-model="name" />
    </div>
    <div class="input-field">
      <textarea
        type="text"
        placeholder="Add a Task Description "
        v-model="description"
        @keyup.enter="addTask"
      ></textarea>
    </div>
    <button @click="addTask" class="button">Add</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
  }
};
</script>

<style></style>
