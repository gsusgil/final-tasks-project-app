<!-- <template>
    <div class="card-info">
      <h3 :class="{ taskComplete: task.is_complete }">{{ task.title }}</h3>
      <h3 :class="{ taskComplete: task.is_complete }">
        {{ task.description }}
      </h3>

      <button @click="updateToggle">Edit</button>
      <button @click="toggleComplete">Complete</button>
      <button @click="deleteTask">Delete</button>

      <div v-if="inputUpdate">
      <input type="text" placeholder=" Task Title " v-model="name"/>
      <input type="text" placeholder="Update Task Description" v-model="description" @keyup.enter="updateTask" />
      <button @click="updateTask">Update</button>
    </div>
    </div>
</template> -->

<!-- <template>
  <div :class="{ 'card-info': true, 'task-complete': task.is_complete }">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>

    <button @click="updateToggle">Edit</button>
    <button @click="toggleComplete">Complete</button>
    <button @click="confirmDelete">Delete</button>

    <dialog v-if="inputUpdate" @close="inputUpdate = false" open>
      <input type="text" placeholder="Task Title" v-model="name" />
      <input type="text" placeholder="Update Task Description" v-model="description" @keyup.enter="updateTask" />
      <button @click="updateTask">Update</button>
      <button @click="inputUpdate = false">Cancel</button>
    </dialog>
  </div>
</template> -->

<template>
   <div :class="{ 'card-info': true, 'task-complete': task.is_complete }">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>

    <button @click="updateToggle">Edit</button>
    <button @click="toggleComplete">Complete</button>

    <div class="relative inline-block" @click="showBadges = !showBadges">
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Filtrar por Color
      </button>

      <div v-if="showBadges" class="absolute mt-2 flex space-x-2">
        <span
          v-for="(color, index) in colors"
          :key="index"
          @click="selectColor(color)"
          :class="`bg-${color}-100 text-${color}-800 text-xs font-medium px-2.5 py-0.5 rounded cursor-pointer dark:bg-${color}-900 dark:text-${color}-300`"
        >
          {{ capitalizeColor(color) }}
        </span>
      </div>
    </div>

    <button @click="confirmDelete">Delete</button>

    <dialog v-if="inputUpdate" @close="inputUpdate = false" open>
      <input type="text" placeholder="Task Title" v-model="name" />
      <input
        type="text"
        placeholder="Update Task Description"
        v-model="description"
        @keyup.enter="updateTask"
      />
      <button @click="updateTask">Update</button>
      <button @click="inputUpdate = false">Cancel</button>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

const name = ref("");

const description = ref("");

const props = defineProps({
  task: Object,
});

const emit = defineEmits(["taskUpdated", "taskDeleted"]);

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
// const deleteTask = async () => {
//   await taskStore.deleteTask(props.task.id);
//   emit("taskDeleted");
//   inputUpdate.value = false;
// };

const confirmDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this task?");
  if (confirmed) {
    await taskStore.deleteTask(props.task.id);
    emit("taskDeleted");
  }
};
const inputUpdate = ref(false);

// Funcion que realiza un "toggle" con un boton @click. para cambiar la condicion de la variable de false a true.
const updateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
};

// Actualiza los datos de la tarea a traves de una funcion que se comunica con la store task.js.
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
  updateToggle();
  inputUpdate.value = false;
};

const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
  emit("taskUpdated");
};

// Obtener las tareas al montar el componente para mostrarla.
onMounted(() => {
  emit("taskUpdated");
});

//----------------hover------

const colors = [
  "blue",
  "gray",
  "red",
  "green",
  "yellow",
  "indigo",
  "purple",
  "pink",
];

const task = ref({ title: "Sample Task", description: "Sample Description" });

const showBadges = ref(false);

const capitalizeColor = (color) => {
  return color.charAt(0).toUpperCase() + color.slice(1);
};

const selectColor = (color) => {
  task.value.color = color;
  showBadges.value = false;
};

</script>

<style scoped>
.card-info {
display: flex;
align-items: center;
align-content: center;
gap: 1rem;
width: 500;
}

.card-info {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 1rem;
  width: 500px;
  border: 2px solid #ccc;
  padding: 1rem;
}

.task-complete {
  border: 2px solid #3dcbb1;
  background-color: #3dcbb1;
}

dialog {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #3dcbb1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 999;
}

/* ------------hover color-------------- */



</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
