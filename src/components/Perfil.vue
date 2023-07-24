<!-- <template>
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
          <input id="location" type="url" v-model="location" />
        </div>
  
        //Agrega aquí los campos adicionales que deseas editar
        <div>
          <label for="avatar_url">Avatar URL</label>
          <input id="avatar_url" type="url" v-model="avatarUrl" />
        </div>
  
        <div>
            <button
    type="button"
    class="button primary block"
    :disabled="loading"
    @click="updateProfile(profile)" 
  >
    {{ loading ? 'Loading ...' : 'Update' }}
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
  import { ref, defineProps, defineEmits, onMounted } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
  
  
  const props = defineProps(["session"]);
  const emitUpdateProfile = defineEmits(["updateProfileEmit"]);
  
  const userStore = useUserStore();
  const { session } = props;
  
  const loading = ref(false);
  const username = ref("");
  const website = ref("");
  const avatarUrl = ref("");
  const location = ref("");
  
  
  // Método para actualizar el perfil
 
  const updateProfile = async (profile) => { // Recibe "profile" como argumento
    if (!profile) {
      console.error("Profile is undefined.");
      return;
    }

    const updatedProfileData = {
      full_name: profile.full_name,
      location: profile.location,
      website: profile.website,
      // Asegúrate de agregar los campos adicionales que deseas editar
    };
    console.log(updatedProfileData);
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfileData)
      .eq("user_id", supabase.auth.user().id);
    editToggleProfile();
    if (error) {
      console.error(error);
    } else {
      console.log("Perfil actualizado correctamente");
      emit('updateProfileEmit', updatedProfileData);
    }
  };
  
  // Función para obtener los datos del perfil

// Obtén el perfil del usuario usando el ID del usuario

// async function getProfile() {
//   try {
//     loading.value = true;
//     const sessionValue = session.value;

//     if (!sessionValue) {
//       console.log("No session found.");
//       return; // Salir del método si no hay sesión definida
//     }

//     const { user } = sessionValue;

//     if (!user) {
//       console.log("No user found in session.");
//       return; // Salir del método si no hay usuario autenticado en la sesión
//     }

//     // Obtén el perfil asociado con el ID del usuario
//     const { data: profile, error } = await supabase
//       .from('profiles')
//       .select()
//       .match({ user_id: user.id });

//     console.log("user.id", user.id);
//     console.log("profile", profile);

//     // Resto del código...
//   } catch (error) {
//     alert(error.message);
//   } finally {
//     loading.value = false;
//   }
// }

// async function getProfile() {
//   try {
//     loading.value = true;
//     const { user } = session.value;
//     console.log("No session found.");
//     // Obtén el perfil asociado con el ID del usuario
//     const { data: profile, error } = await supabase
//       .from('profiles')
//       .select()
//       .match({ user_id: user.id });
//         console.log("user.id",user.id);
//         console.log("profile", profile);
//     if (error) throw error;
//     if (profile) {
//       // Asigna los valores del perfil a las variables del componente
//       username.value = profile[0].username;
//       website.value = profile[0].website;
//       avatarUrl.value = profile[0].avatar_url;
//       location.value = profile[0].location;
//     } else {
//       // Si no se encuentra el perfil, establece valores predeterminados o muestra un mensaje de error
//       username.value = "";
//       website.value = "";
//       avatarUrl.value = "";
//       location.value = "";
//     }
//   } catch (error) {
//     alert(error.message);
//   } finally {
//     loading.value = false;
//   }
// }

//   async function getProfile() {
//     try {
//       loading.value = true;
//       const { profile } = userStore;
  
//       if (profile) {
//         username.value = profile.username;
//         website.value = profile.website;
//         avatarUrl.value = profile.avatar_url;
//         location.value = profile.location;
//         // Asegúrate de agregar las asignaciones de los campos adicionales que deseas editar
//       } else {
//         // Si no se encuentra el perfil en el store, establece valores predeterminados o muestra un mensaje de error
//         username.value = "";
//         website.value = "";
//         avatarUrl.value = "";
//         location.value = "";
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       loading.value = false;
//     }
//   }
  
  // Función para cerrar sesión
  
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
        .from('profiles')
        .select()
        .match({ user_id: user.id });

      console.log("user.id", user.id);
      console.log("profileData", profileData);

      // Asigna el perfil a la variable "profile"
      if (profileData && profileData.length > 0) {
        profile.value = profileData[0];
      } else {
        // Si no se encuentra el perfil, establece valores predeterminados o muestra un mensaje de error
        profile.value = {
          full_name: "",
          website: "",
          location: "",
          // Asegúrate de agregar los campos adicionales que deseas editar
        };
      }
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }
  
  async function signOut() {
    try {
      // Aquí puedes implementar la lógica para cerrar sesión usando supabase o tu store
      loading.value = true;
      // Simulando la operación de cerrar sesión
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulación de una operación asincrónica
      // Luego de cerrar sesión, puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones necesarias
      alert("Successfully signed out!");
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }
  
  // Función para mostrar el nombre de usuario y sitio web al cargar el componente
  onMounted(() => {
    getProfile();
  });
  </script> -->
  

  <!-- <template>
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
          <input id="location" type="url" v-model="location" />
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
          @click="updateProfile">
          {{ loading ? 'Loading ...' : 'Update' }}
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
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { supabase } from '../supabase';
import Nav from '../components/Nav.vue';

const props = defineProps(['session', 'profile']);

const userStore = useUserStore();

const loading = ref(true); // Renombramos isLoading a loading

// Variables para almacenar los datos del perfil
const username = ref('');
const website = ref('');
const location = ref('');
const avatarUrl = ref('');

const emitUpdateProfile = defineEmits(['updateProfileEmit']);
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
      const { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: user.id });
  
      console.log("user.id", user.id);
      console.log("profile", profile);
  
      // Asigna los valores del perfil a las variables del componente
      if (profile) {
        username.value = profile[0].username;
        website.value = profile[0].website;
        // Asegúrate de agregar las asignaciones de los campos adicionales que deseas editar
      } else {
        // Si no se encuentra el perfil, establece valores predeterminados o muestra un mensaje de error
        username.value = "";
        website.value = "";
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
      loading.value = true;
      // Simulando la operación de cerrar sesión
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulación de una operación asincrónica
      // Luego de cerrar sesión, puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones necesarias
      alert("Successfully signed out!");
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }
  
  // Función para actualizar el perfil

  const updateProfile = async () => {
  try {
    loading.value = true;

    const updatedProfileData = {
      full_name: username.value,
      website: website.value,
      location: location.value,
      // Asegúrate de agregar los campos adicionales que deseas editar
    };
    console.log(updatedProfileData);

    // Obtén el ID del usuario autenticado
    const userId = supabase.auth.user().id;

    // Usa el método "upsert" en lugar de "update" para garantizar que se cree un nuevo perfil si no existe uno para este usuario
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ user_id: userId, ...updatedProfileData });

    if (error) {
      console.error(error);
    } else {
      console.log("Perfil actualizado correctamente");
      // Emitir evento para actualizar el perfil en el componente Account
      emit('updateProfileEmit', updatedProfileData);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

  //   async function updateProfile() {
//     try {
//       loading.value = true;
  
//       const updatedProfileData = {
//         full_name: username.value,
//         website: website.value,
//         // Asegúrate de agregar los campos adicionales que deseas editar
//       };
//       console.log(updatedProfileData);
  
//       const { data, error } = await supabase
//         .from("profiles")
//         .update(updatedProfileData)
//         .eq("user_id", supabase.auth.user().id);
  
//       if (error) {
//         console.error(error);
//       } else {
//         console.log("Perfil actualizado correctamente");
//         // Emitir evento para actualizar el perfil en el componente Account
//         emit('updateProfileEmit', updatedProfileData);
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       loading.value = false;
//     }
//   }
  
 // Función para mostrar el nombre de usuario y sitio web al cargar el componente
onMounted(() => {
  getProfile();
});
  </script> -->
  
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
            {{ loading ? 'Loading ...' : 'Update' }}
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
  import { ref, defineProps, defineEmits, onMounted } from 'vue';
  import { useUserStore } from '../stores/user';
  import { supabase } from '../supabase';
  
  const props = defineProps(['session', 'profile']);
  const emitUpdateProfile = defineEmits(['updateProfileEmit']);
  
  const userStore = useUserStore();
  const loading = ref(false); // Corrección: Se cambia true por false para inicializar loading
  
  // Variables para almacenar los datos del perfil
  const username = ref('');
  const website = ref('');
  const location = ref('');
  const avatarUrl = ref('');
  
  // Función para obtener los datos del perfil
  async function getProfile() {
    try {
      loading.value = true; // Corrección: Se establece loading en true al iniciar la carga del perfil
  
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
      const { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: user.id });
  
      console.log("user.id", user.id);
      console.log("profile", profile);
  
      // Asigna los valores del perfil a las variables del componente
      if (profile) {
        username.value = profile[0].username;
        website.value = profile[0].website;
        // Asegúrate de agregar las asignaciones de los campos adicionales que deseas editar
      } else {
        // Si no se encuentra el perfil, establece valores predeterminados o muestra un mensaje de error
        username.value = "";
        website.value = "";
        // Asegúrate de agregar las asignaciones de los campos adicionales que deseas editar
      }
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false; // Corrección: Se establece loading en false al finalizar la carga del perfil
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
    loading.value = true; // Corrección: Se establece loading en true al iniciar la actualización del perfil

    const updatedProfileData = {
      full_name: username.value,
      website: website.value,
      location: location.value,
      // Asegúrate de agregar los campos adicionales que deseas editar
    };
    console.log(updatedProfileData);

    // Obtén el ID del usuario autenticado
    const userId = supabase.auth.user().id;

    // Realiza una llamada a la API de Supabase para actualizar los datos del perfil
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfileData)
      .eq("user_id", userId); // Agregar la condición de coincidencia con user_id

    if (error) {
      console.error(error);
    } else {
      console.log("Perfil actualizado correctamente");
      // Emitir evento para actualizar el perfil en el componente Account
      emit('updateProfileEmit', updatedProfileData);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false; // Corrección: Se establece loading en false al finalizar la actualización del perfil
  }
};

  
  // Función para actualizar el perfil
//   const updateProfile = async () => {
//     try {
//       loading.value = true; // Corrección: Se establece loading en true al iniciar la actualización del perfil
  
//       const updatedProfileData = {
//         full_name: username.value,
//         website: website.value,
//         location: location.value,
//         // Asegúrate de agregar los campos adicionales que deseas editar
//       };
//       console.log(updatedProfileData);
  
//       // Obtén el ID del usuario autenticado
//       const userId = supabase.auth.user().id;
  
//       // Usa el método "upsert" en lugar de "update" para garantizar que se cree un nuevo perfil si no existe uno para este usuario
//       const { data, error } = await supabase
//         .from("profiles")
//         .upsert({ user_id: userId, ...updatedProfileData });
  
//       if (error) {
//         console.error(error);
//       } else {
//         console.log("Perfil actualizado correctamente");
//         // Emitir evento para actualizar el perfil en el componente Account
//         emit('updateProfileEmit', updatedProfileData);
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       loading.value = false; // Corrección: Se establece loading en false al finalizar la actualización del perfil
//     }
//   };
  
  // Función para mostrar el nombre de usuario y sitio web al cargar el componente
  onMounted(() => {
    getProfile();
  });
  </script>

  <style scoped></style>