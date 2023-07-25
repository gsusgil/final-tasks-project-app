<template>
  <div>
    <div>
      <Nav />
    </div>

    <h1>Account</h1>
    <div>
    <Perfil
      :session="session"
      :profile="profile"
      v-if="!isLoading"
      :username="username"
      :website="website"
      :avatarUrl="avatarUrl"
      :location="location"
      @updateProfileEmit="handleUpdateProfile"
    />
    <div v-else>Loading...</div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, defineEmits } from "vue"; 
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Nav from "../components/Nav.vue";
import Perfil from "../components/Perfil.vue";

const userStore = useUserStore();

const profile = computed(() => (userStore.profile ? userStore.profile : {}));

const session = ref(null);
const isLoading = ref(true);

const emitUpdateProfile = defineEmits(["updateProfileEmit"]); 

// Variables para almacenar los datos del perfil
const username = ref("");
const website = ref("");
const location = ref("");
const avatarUrl = ref("");

// Método para obtener el perfil
async function getProfile() {
  try {
    isLoading.value = true; // Se cambia "loading" por "isLoading"
    const sessionValue = session.value; // Se agrega esta línea para obtener el valor de "session"

    if (!sessionValue) {
      console.log("No session found.");
      return; // Salir del método si no hay sesión definida
    }

    const { user } = sessionValue; // Se cambia "session.value" por "sessionValue"

    if (!user) {
      console.log("No user found in session.");
      return; // Salir del método si no hay usuario autenticado en la sesión
    }

    // Enlaza el perfil asociado con el ID del usuario
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select()
      .match({ user_id: user.id });

    console.log("user.id", user.id);
    console.log("profile", profileData);

    // Asigna los valores del perfil a las variables del componente
    if (profileData && profileData.length > 0) {
      // Se verifica si hay datos de perfil antes de asignarlos
      const userProfile = profileData[0];
      username.value = userProfile.username;
      website.value = userProfile.website;
      location.value = userProfile.location;
      avatarUrl.value = userProfile.avatar_url; 
    } else {
      // Si no se encuentra el perfil, establece valores predeterminados o muestra un mensaje de error
      username.value = "";
      website.value = "";
      location.value = "";
    }
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false; // Se cambia "loading" por "isLoading"
  }
}

// Método para actualizar el perfil
async function handleUpdateProfile(updatedProfileData) {
  try {
    isLoading.value = true; // Se cambia "loading" por "isLoading"
    const sessionValue = session.value; // Se agrega esta línea para obtener el valor de "session"

    if (!sessionValue) {
      console.log("No session found.");
      return;
    }

    const { user } = sessionValue; // Se cambia "session.value" por "sessionValue"

    // Hacer una llamada a la API de Supabase para actualizar los datos del perfil
    await supabase
      .from("profiles")
      .update(updatedProfileData)
      .eq("user_id", user.id); // Agregar la condición de coincidencia con user_id

    // Actualizar el perfil en el store local también
    userStore.profile = { ...userStore.profile, ...updatedProfileData };

    alert("Profile successfully updated."); // Mostrar el mensaje de actualización exitosa
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false; 
  }
}

// Watch para reaccionar a cambios en session.value
watch(
  () => session.value,
  async (newSession) => {
    if (newSession) {
      await getProfile();
    } else {
      isLoading.value = false; 
    }
  }
);

// Obtener el valor de session después de que el componente se haya montado
onMounted(async () => {
  session.value = await supabase.auth.session();
  if (session.value) {
    await getProfile();
  } else {
    isLoading.value = false; 
  }
});
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
