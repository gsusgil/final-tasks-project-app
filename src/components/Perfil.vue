<template>
  <div>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="session?.user?.email" disabled />
      </div>
      <div>
        <label for="username">Name</label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="website">Website</label>
        <input id="website" type="url" v-model="website" />
      </div>

      <div>
        <label for="location">Location</label>
        <input id="location" type="text" v-model="location" />
      </div>

      <div>
        <label for="avatar_url">Avatar URL</label>
        <input id="avatar_url" type="url" v-model="avatarUrl" />
      </div>

      <div>
        <button
          type="button"
          class="button primary block"
          :disabled="loading"
          @click="updateProfile"
        >
          {{ loading ? "Loading ..." : "Update" }}
        </button>
      </div>

      <div>
        <button class="button block" @click="signOut" :disabled="loading">
          Sign Out
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

const props = defineProps({
  session: Object,
  profile: Object,
});
const emitUpdateProfile = defineEmits(["updateProfileEmit"]);

const profile = computed(() => (userStore.profile ? userStore.profile : {}));

const userStore = useUserStore();
const loading = ref(false); // Corrección: Se cambia true por false para inicializar loading

// Variables para almacenar los datos del perfil
const username = ref("");
const website = ref("");
const location = ref("");
const avatarUrl = ref("");

// Función para obtener los datos del perfil
async function getProfile() {
  try {
    loading.value = true;

    const sessionValue = session.value;

    if (!sessionValue) {
      console.log("No session found.");
      return; // Salir del método si no hay sesión definida
    }

    const { user } = sessionValue;

    if (!user) {
      console.log("No user found in session.");
      return; // Salir del método si no hay usuario autenticado en la sesión
    }

    // Obtén el perfil asociado con el ID del usuario
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select()
      .match({ user_id: user.id });

    console.log("user.id", user.id);
    console.log("profileData", profileData);

    // Asigna los valores del perfil a las variables del componente
    if (profileData && profileData.length > 0) {
      username.value = profileData[0].full_name;
      website.value = profileData[0].website;
      location.value = profileData[0].location;
      // Asegúrate de agregar las asignaciones de los campos adicionales que deseas editar
    } else {
      // Si no se encuentra el perfil, establece valores predeterminados o muestra un mensaje de error
      username.value = "";
      website.value = "";
      location.value = "";
      // Asegúrate de agregar las asignaciones de los campos adicionales que deseas editar
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

// Función para cerrar sesión
async function signOut() {
  try {
    // Aquí puedes implementar la lógica para cerrar sesión usando supabase o tu store
    loading.value = true; // Corrección: Se establece loading en true al iniciar el cierre de sesión
    // Simulando la operación de cerrar sesión
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulación de una operación asincrónica
    // Luego de cerrar sesión, puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones necesarias
    alert("Successfully signed out!");
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false; // Corrección: Se establece loading en false al finalizar el cierre de sesión
  }
}

const updateProfile = async () => {
  try {
    loading.value = true;

    // Obtén el usuario autenticado
    const user = supabase.auth.user();

    // Asegúrate de que el usuario esté autenticado antes de continuar
    if (!user) {
      console.log("Usuario no autenticado. No se puede actualizar el perfil.");
      return;
    }

    // Crea el objeto con los datos actualizados del perfil
    const updatedProfileData = {
      full_name: username.value,
      website: website.value,
      location: location.value,
      // Asegúrate de agregar los campos adicionales que deseas editar
      user_id: user.id, // Asigna el user_id del usuario autenticado al perfil
    };
    console.log("data actualizada", updatedProfileData);

    // Realiza una llamada a la API de Supabase para actualizar el perfil
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfileData)
      .match({ user_id: user.id }); // Especifica que el user_id debe coincidir con el del usuario autenticado
    console.log("datos de usuario", data);
    if (error) {
      console.error(error);
    } else {
      console.log("Perfil actualizado correctamente");
      // Emitir evento para actualizar el perfil en el componente Account
      emitUpdateProfile("updateProfileEmit", updatedProfileData);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
