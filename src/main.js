import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/reset.css";
import "./styles/index.scss";

createApp(App).use(router).mount("#app");
