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

<template>
  <div class="cards-container">
  <div
    :class="{ 'card-info': true, 'task-complete': task.is_complete }"
    :style="{ backgroundColor: task.card_color }"
  >
    <div class="text-content">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
    </div>

    

    <div class="container-buttons">
      <button class="button-card" @click="updateToggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <button class="button-card" @click="toggleComplete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

      </button>
      
      <button class="button-card" @click="deleteTask(inputUpdate)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>

      <!-- ---------------------------------- -->
      <!-- Botón que activa las opciones de color -->
      <button class="button-card" @click="showColorOptions = !showColorOptions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <!-- Opciones de colores -->
      <div v-if="showColorOptions" class="color-options">
        <div
          v-for="color in colors"
          :key="color"
          @click="selectColor(color)"
          :style="{ backgroundColor: color }"
        ></div>
      </div>
      <!-- ---------------------------------- -->

      <!-- <div class="toggle">
        <label class="relative inline-flex items-center mb-5 cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" />
          <div
            class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
      </div> -->
      <!-- ---------------------------------- -->
    </div>

  </div>
    <dialog v-if="inputUpdate" @close="inputUpdate = false" open>
      <input type="text" placeholder="Task Title" v-model="name" />
      <input
        type="text"
        placeholder="Update Task Description"
        v-model="description"
        @keyup.enter="updateTask"
      />
      <button
        class="text-orange-400 bg-white border border-orange-400 hover:text-white hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="submit"
        @click="updateTask"
      >
        Update
      </button>
      <button
        class="text-white bg-red-400 hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="submit"
        @click="inputUpdate = false"
      >
        Cancel
      </button>
    </dialog>
  </div>
</template>

``
<script setup>
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();

const name = ref("");

const description = ref("");


const cardColor = ref(props.task.card_color);

const inputUpdate = ref(false);

const emit = defineEmits(["taskUpdated", "taskDeleted"]);

const props = defineProps({
  task: {
    type: Object,
    default: () => ({
      // Other properties of the task object...
      cardColor: null, // Add the cardColor property with an initial value of null.
    }),
  },
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  emit("taskDeleted");
  inputUpdate.value = false;
};

// const confirmDelete = async () => {
//   const confirmed = window.confirm("Are you sure you want to delete this task?");
//   if (confirmed) {
//     await taskStore.deleteTask(props.task.id);
//     emit("taskDeleted");
//   }
// };

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

  // if (props.task.is_complete) {
  //   alert("Task is completed");
  // }

  emit('taskUpdated')
};

//----------------hover------

const colors = ["#fecaca", "#fef08a", "#ddd6fe", "#f3f4f6"];
const selectedColor = ref(null);
const showColorOptions = ref(false);

const selectColor = async (color) => {
  selectedColor.value = color;
  showColorOptions.value = false;

  // Actualizar el atributo card_color de la tarea con el color seleccionado.
  const updatedData = {
    card_color: color,
  };
  console.log(selectedColor.value); // Agrega este console.log para verificar si el color seleccionado es el correcto.
  await useTaskStore().editTask(props.task.id, updatedData);

  // Actualizar la propiedad task.card_color después de cambiar el color en la base de datos.
  props.task.card_color = color;
};


// Obtener las tareas al montar el componente para mostrarla.
onMounted(() => {
  emit("taskUpdated");
});
</script>

<style scoped>
.card-info {
  display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
    background-color: #f3f4f6;
    height: 125px;
    width: 350px;
    padding: 1rem;
    margin: 5px;
    margin-left: 30px;
    border: 2px solid #ccc;
    border-radius: 15px;
    position: relative;
    transition: all 0.2s ease-in-out;
}

.card-info:hover {
  transform: scale(1.03);
  color: #7e22ce;
}

.input-line-break {
  width: 75vw; /* Establecemos el ancho del input al 75% del ancho del contenedor */
  margin: 0.5rem 0; /* Agregamos un margen superior e inferior para separar del contenido anterior y posterior */
}
.task-complete {
  border: 4px solid #3dcbb1;
}

.text-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.text-content > h3 {
  font-weight: 500;
  text-transform: capitalize;
}

.text-content > p {
  color: #525252;
}

.container-buttons {
  display: flex;
  gap: 1rem;
}

.button-card {
  width: 30px;
  height: 30px;
  color: #2563eb;
  transition: all 0.4s ease-in-out;
}

.button-card:hover {
  transform: scale(1.2);
  color: #7e22ce;
}

.toggle {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.color-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  bottom:10px;
  right: 120px;
  
}

.color-options > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
}

/* ventana emergente para edit-------- */

dialog {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 300px;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    position: absolute;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, -100%);
    background-color: #fed7aa;
    z-index: 9999;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }

  dialog > input[type="text"] {
    width: 250px;
    padding-left: 20px;
    border: 1px solid #fed7aa;
    border-radius: 8px;
    outline: none;
    border-color: #fb923c;
  }

  dialog > input:focus {
    box-shadow: 0 0 1.5px 1.5px #fb923c;
  }
/* dialog {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #6d28d9;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 999;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
} */



@media (max-width: 639px) {
  .card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
    background-color: #f3f4f6;
    max-width: 600px;
    margin: 5px;
    border: 2px solid #ccc;
    border-radius: 15px;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .task-complete {
    border: 4px solid #3dcbb1;
  }

  dialog {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 300px;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    position: absolute;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fed7aa;
    z-index: 9999;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }

  dialog > input[type="text"] {
    width: 250px;
    padding-left: 20px;
    border: 1px solid #fed7aa;
    border-radius: 8px;
    outline: none;
    border-color: #fb923c;
  }

  dialog > input:focus {
    box-shadow: 0 0 1.5px 1.5px #fb923c;
  }

/* ------------- notificacion de success --------------- */



}
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
