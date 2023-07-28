import { createApp } from "vue";
import { createPinia } from "pinia";


import App from "./App.vue";
import router from "./router";

import './assets/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(createPinia());
app.use(router);


app.mount("#app");
