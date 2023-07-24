<!-- COMPONENTE BOILERPLATE -->
 
<template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    
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
        <button class="button" type="submit">Sign In</button>

        
      </div>
    </form>

    <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
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
