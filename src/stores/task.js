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
  
   // editar tarea en supabase
   
   const editTask = async (id, updatedData) => {
    const { data, error } = await supabase.from("tasks").update(updatedData).match({
      id: id,
    });
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
    }

  // borrar tareas de supabase
  
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  
  return { tasksArr, fetchTasks, addTask, editTask, updateTask, completeTask, deleteTask };
});
