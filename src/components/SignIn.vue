<!-- COMPONENTE BOILERPLATE -->
 
<template>

  <div class="container">
<div>
  <img class="logo" src="../assets/image/LOGO_taskSync.svg" alt="logo_taskSync">
</div>
    
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" type="submit">Sign In</button>

        
      </div>
    </form>

    <p class="text-neutral-500 text-sm ">Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link hover:text-purple-800"/></p>
  </div>

</template>
<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue"
// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

//var para hacer login

const email = ref ("")
const password = ref ("")

// Router to push user once Signedin to home
const redirect = useRouter();


// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    // redirige al usuario a la página de inicio (homeView)
    redirect.push({ path: "/" });
  } catch (error) {
    alert("Error: " + error.message);
  }
};
</script>

<style></style>
