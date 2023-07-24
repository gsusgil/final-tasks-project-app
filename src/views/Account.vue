<!-- <template>
  <Nav />
  <h1>Name: {{username}}</h1>
  <img :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.avatar_url;
  }

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script> -->

<!-- <template>
  <nav />
  <div>
    <h1>Account</h1>
    Renderizar el componente de perfil aquí
    <Profile
      :session="session"
      v-if="!isLoading"
      @updateProfileEmit="handleUpdateProfile"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Profile from "../components/Profile.vue";
import Nav from "../components/Nav.vue";


const userStore = useUserStore();

const session = ref(null);
const isLoading = ref(true);

// Método para obtener el perfil
async function getProfile() {
  try {
    await userStore.fetchUser();
    // Debes agregar las siguientes variables para los campos en el formulario
    const username = ref(userStore.profile.full_name);
    const website = ref(userStore.profile.website);
    const location = ref(userStore.profile.location);
    const avatar_url = ref(userStore.profile.avatar_url);
  } catch (error) {
    alert(error.message);
  }
}

onMounted(async () => {
  session.value = await supabase.auth.session();
  if (session.value) {
    await getProfile();
  } else {
    isLoading.value = false;
  }
});

// Método para actualizar el perfil
async function handleUpdateProfile(updatedProfileData) {
  try {
    isLoading.value = true;
    const { user } = session.value;

    // Envía los datos actualizados al componente Profile mediante emit
    emit("updateProfileEmit", updatedProfileData);

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
</script> -->

<!-- <template>
  <div>
    <nav />
    <h1>Account</h1>
    Renderizar el componente de perfil aquí
    <Profile
      :session="session"
      v-if="!isLoading"
      :username="username"
      :website="website"
      :avatarUrl="avatarUrl"
      :location="location"
      @updateProfileEmit="handleUpdateProfile"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Profile from "../components/Profile.vue";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const session = ref(null);
const isLoading = ref(true);

// Variables para almacenar los datos del perfil
const username = ref("");
const website = ref("");
const location = ref("");
const avatarUrl = ref("");

const emitUpdateProfile = defineEmits(["updateProfileEmit"]);

// Método para obtener el perfil
async function getProfile() {
  try {
    await userStore.fetchUser();

    // Asigna los valores del perfil a las variables del componente
    username.value = userStore.profile?.full_name ?? "";
    website.value = userStore.profile?.website ?? "";
    location.value = userStore.profile?.location ?? "";
    avatarUrl.value = userStore.profile?.avatar_url ?? "";
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}

// Método para actualizar el perfil
async function handleUpdateProfile(updatedProfileData) {
  try {
    isLoading.value = true;
    const { user } = session.value;

    // Envía los datos actualizados al componente Profile mediante emit
    emit("updateProfileEmit", updatedProfileData);

    alert("Profile successfully updated."); // Mostrar el mensaje de actualización exitosa
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}

// Watch para reaccionar a cambios en session.value
watch(() => session.value, async (newSession) => {
  if (newSession) {
    await getProfile();
  } else {
    isLoading.value = false;
  }
});

onMounted(async () => {
  session.value = await supabase.auth.session();
  if (session.value) {
    await getProfile();
  } else {
    isLoading.value = false;
  }
});
</script>

 -->

<!-- 
 <template>
  <div>
    <nav />
    <h1>Account</h1>
    Renderizar el componente de perfil aquí
    <Profile
      :profile="profile"
      v-if="!isLoading"
      @updateProfileEmit="handleUpdateProfile"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Profile from "../components/Profile.vue";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const isLoading = ref(true);

// Variable para almacenar los datos del perfil
const profile = ref(null);

// Método para obtener el perfil
async function getProfile() {
  try {
    await userStore.fetchUser();

    // Asigna el perfil del store a la variable del componente
    profile.value = userStore.profile;
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}

// Método para actualizar el perfil
async function handleUpdateProfile(updatedProfileData) {
  try {
    isLoading.value = true;
    const { user } = userStore;

    // Envía los datos actualizados al componente Profile mediante emit
    emit("updateProfileEmit", updatedProfileData);

    alert("Profile successfully updated."); // Mostrar el mensaje de actualización exitosa
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}

// Watch para reaccionar a cambios en userStore.profile
watch(() => userStore.profile, async (newProfile) => {
  if (newProfile) {
    profile.value = newProfile;
  } else {
    isLoading.value = false;
  }
});

onMounted(async () => {
  await getProfile();
});
</script>
 -->

<!-- <template>
  <div>
    <nav />
    <h1>Account</h1>
    Renderizar el componente de perfil aquí
    <Profile
      :session="session"
      v-if="!isLoading"
      :username="username"
      :website="website"
      :avatarUrl="avatarUrl"
      :location="location"
      @updateProfileEmit="handleUpdateProfile"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";

const userStore = useUserStore();

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
    await userStore.fetchUser();

    // Asigna los valores del perfil a las variables del componente
    username.value = userStore.profile?.full_name ?? "";
    website.value = userStore.profile?.website ?? "";
    location.value = userStore.profile?.location ?? "";
    avatarUrl.value = userStore.profile?.avatar_url ?? "";
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}

// Método para actualizar el perfil
async function handleUpdateProfile(updatedProfileData) {
  try {
    isLoading.value = true;
    const { user } = session.value;

    // Envía los datos actualizados al componente Profile mediante emit
    emit("updateProfileEmit", updatedProfileData);

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

onMounted(async () => {
  session.value = await supabase.auth.session();
  if (session.value) {
    await getProfile();
  } else {
    isLoading.value = false;
  }
});
</script> -->

<!-- <template>
   <div>
    <div>
      <Nav />
    </div>

    <h1>Account</h1>
    <Perfil
      :session="session"
      :profile="profile"
      v-if="!isLoading"
      :username="username"
      :website="website"
      :location="location"
      @updateProfileEmit="handleUpdateProfile"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import Nav from "../components/Nav.vue";
import Perfil from "../components/Perfil.vue";

const userStore = useUserStore();

const profile = computed(() => (userStore.profile ? userStore.profile : {}));

const session = ref(null);
const isLoading = ref(true);

// Variables para almacenar los datos del perfil
const username = ref("");
const website = ref("");
const location = ref("");
const avatarUrl = ref("");

const emitUpdateProfile = defineEmits(["updateProfileEmit"]);

// Método para obtener el perfil
async function getProfile() {
  try {
    await userStore.fetchUser();

    // Asigna los valores del perfil a las variables del componente
    username.value = userStore.profile?.username ?? "";
    website.value = userStore.profile?.website ?? "";
    location.value = userStore.profile?.location ?? "";
    avatarUrl.value = userStore.profile?.avatar_url ?? "";
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}

// Método para actualizar el perfil
async function handleUpdateProfile(updatedProfileData) {
  try {
    isLoading.value = true;
    const { user } = session.value;

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

onMounted(async () => {
  session.value = await supabase.auth.session();
  if (session.value) {
    await getProfile();
  } else {
    isLoading.value = false;
  }
});
</script> -->

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

const emitUpdateProfile = defineEmits(["updateProfileEmit"]); // Se agrega "defineEmits"

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

    // Obtén el perfil asociado con el ID del usuario
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
      // avatarUrl.value = userProfile.avatar_url; // Puedes agregar esto si también hay un campo "avatar_url" en la tabla "profiles"
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
    isLoading.value = false; // Se cambia "loading" por "isLoading"
  }
}

// Watch para reaccionar a cambios en session.value
watch(
  () => session.value,
  async (newSession) => {
    if (newSession) {
      await getProfile();
    } else {
      isLoading.value = false; // Se cambia "loading" por "isLoading"
    }
  }
);

// Obtener el valor de session después de que el componente se haya montado
onMounted(async () => {
  session.value = await supabase.auth.session();
  if (session.value) {
    await getProfile();
  } else {
    isLoading.value = false; // Se cambia "loading" por "isLoading"
  }
});
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
