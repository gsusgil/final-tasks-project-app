<template class="m-10">
  <h1 class="title-task pl-2">Add a new Task </h1>
  <div v-if="showErrorMessage">
    <p class="error-text">{{ errorMessage }}</p>
  </div>
  <div class="container-new-task">
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

<style scoped>
.container-new-task {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 2rem;
  padding: 2rem;
}

.title-task{
  font-size: 1.5rem;
  color: #6d28d9;
}

.input-field {
  width: 250px;
  padding-left: 20px;
  /* background-color: rgb(216, 216, 216); */
  border: 2px solid #6d28d9;
  border-radius: 8px;
}

.input-field:focus {
  background-color: #f4f3f3;
}

@media (max-width: 767px) {
  .container-new-task {
    display: flex;
    flex-direction: column;
  }
}
</style>
