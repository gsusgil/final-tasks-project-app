<template>
  <nav class="sidebar">


    <div class="sticky top-0 z-10">
      <button class="ml-4 my-2" @click="setOpen(true)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          :stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
  
      <div
        v-if="open"
        class="bg-white-600/50 min-h-full w-full fixed top-0 left-0 right-0 backdrop-blur-sm"
        @click="setOpen(false)"
      ></div>
  
      <div
        :class="{ 'w-60': open, 'w-0': !open }"
        class="bg-purple-700 min-h-full fixed top-0 left-0 transition-all duration-300"
      >
        <div v-if="open" class="pt-3">
          <button class="ml-4 text-white mb-14 " @click="setOpen(false)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              :stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            class="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2"
          >
          <router-link to="/">
      Home
    </router-link>
          </div>
          <div
            class="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2"
          >
          <router-link to="/">Task Manager</router-link>
          </div>
          <div
            class="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2"
          >
          <router-link to="/account">Account</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="usee-log-out">
      <ul>
        <li class="log-out-welcome">
          <p class="text-sm text-purple-700">Welcome, {{ userEmail.split('@')[0] }}</p>
        </li>
        <li>
          <button @click="signOut" class="button hover:text-red-400">Log out</button>
        </li>
      </ul>
    </div>

    <div class="menu-indicator" ref="menuIndicator" :style="{ width: indicatorWidth + 'px', left: indicatorLeft + 'px' }"></div>

  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref, onMounted} from 'vue';

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{


    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};

const open = ref(false);
  
  const setOpen = (value) => {
    open.value = value;
  };
  
//-----------------------

const menuIndicator = ref(null);
const indicatorWidth = ref(0);
const indicatorLeft = ref(0);

// Función para calcular el ancho y la posición de la barra indicadora
const updateIndicator = () => {
  const menu = menuIndicator.value; // Utilizamos la referencia "menuIndicator" para obtener el elemento

  if (menu) {
    const activeLink = menu.querySelector('.active'); // Suponiendo que tienes una clase "active" en el enlace del menú activo

    if (activeLink) {
      indicatorWidth.value = activeLink.offsetWidth;
      indicatorLeft.value = activeLink.offsetLeft;
    }
  }
};

// Ejecutar la función updateIndicator al montar el componente y cada vez que hagas scroll
onMounted(() => {
  updateIndicator();
  window.addEventListener('scroll', updateIndicator);
});

</script>


<style scoped>

.sidebar{
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
 .usee-log-out > ul{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
 }

 .sidebar {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff; 
  z-index: 10; 
  overflow-x: auto; 
}

.menu-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: #9333ea; 
  transition: width 0.3s, left 0.3s; 
  z-index: 1; 
}
</style>