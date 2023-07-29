import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API

  const tasksArr = ref(null);

  // conesguir tareas de supabase

  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };

  // añadir tareas de supabase

  const addTask = async (title, description) => {
    try {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);

      if (error) {
        console.error(error);
        return;
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (id, updatedData) => {
    // Aquí agregamos la lógica para actualizar la columna "card_color" en caso de que esté presente en el objeto updatedData.

    if (updatedData.card_color) {
      // Si el atributo "card_color" está presente en updatedData, lo eliminamos del objeto para evitar que interfiera con otras propiedades de la tarea.

      const { card_color, ...dataWithoutCardColor } = updatedData;

      // Luego, actualizamos la tarea en la base de datos utilizando el objeto dataWithoutCardColor que no contiene el atributo "card_color".

      await supabase
        .from("tasks")
        .update(dataWithoutCardColor)
        .match({ id: id });

      // Finalmente, actualizamos la columna "card_color" en la base de datos utilizando una consulta separada.

      await supabase.from("tasks").update({ card_color }).match({ id: id });
    } else {
      // Si el atributo "card_color" no está presente en updatedData, simplemente actualizamos la tarea con todos los datos proporcionados.

      await supabase.from("tasks").update(updatedData).match({ id: id });
    }
  };

  // Actualizar tarea en supabase
  const updateTask = async (id, title, description) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update([
          {
            user_id: useUserStore().user.id,
            title: title,
            is_complete: false,
            description: description,
          },
        ])
        .eq("id", id);

      if (error) {
        console.error(error);
        return;
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  // Completar tarea en supabase
  const completeTask = async (id, booleanValue) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: booleanValue })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }
    await fetchTasks();
  };

  // borrar tareas de supabase

  const deleteTask = async (id) => {
    try {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
      // Realiza cualquier acción adicional o actualización en el estado después de eliminar la tarea (si es necesario).
    } catch (error) {
      // Maneja el error aquí, puede mostrar un mensaje de error o realizar alguna otra acción de acuerdo a tus necesidades.
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return {
    tasksArr,
    fetchTasks,
    addTask,
    editTask,
    updateTask,
    completeTask,
    deleteTask,
  };
});
