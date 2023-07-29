<template class="m-10">
  <h1 class="title-task pl-2">Add a new Task</h1>
  <div class="container-new-task">

    <div v-if="showErrorMessage || showSuccessMessage" class="message-container">
  <div v-if="showErrorMessage" class="flex items-center p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Error</span>
    <div>
      {{ errorMessage }}
    </div>
  </div>
  <div v-if="showSuccessMessage" class="flex items-center p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Success</span>
    <div>
      {{ successMessage }}
    </div>
  </div>
</div>

    <div>
      <input
        type="text"
        class="input-field"
        placeholder="Add a Task Title here"
        v-model="name"
      />
    </div>
    <div>
      <input
        type="text"
        class="input-field"
        placeholder="Add a Task Description "
        v-model="description"
        @keyup.enter="addTask"
      />
    </div>

    <button
      @click="addTask"
      type="submit"
      class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-700 font-medium rounded-lg text-sm px-5 py-1.5 text-center mr-2 focus:ring-transparent"
    >
      Add Task
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// Variables reactivas para los mensajes
const showErrorMessage = ref(false);
const errorMessage = ref("");

const showSuccessMessage = ref(false);
const successMessage = ref("");

const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Mostrar mensaje de error
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 3000);
  } else {
    // Agregar la tarea
    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";

    // Mostrar mensaje de éxito
    showSuccessMessage.value = true;
    successMessage.value = "La tarea se ha agregado correctamente.";
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
.container-new-task {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 2rem;
  padding: 2rem;
}

.title-task {
  font-size: 1.5rem;
  color: #6d28d9;
}

.input-field {
  width: 250px;
  padding-left: 20px;
  border: 2px solid #6d28d9;
  border-radius: 8px;
}

.input-field:focus {
  background-color: #f4f3f3;
}

.message-container {
  position: fixed;
  top: 20px; 
  right: 20px;
  z-index: 9999; 
  display: flex;
  flex-direction: column; 
}

@media (max-width: 767px) {
  .container-new-task {
    display: flex;
    flex-direction: column;
  }
}
</style>
