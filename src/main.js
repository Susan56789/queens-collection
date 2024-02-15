import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Assuming you've defined your routes in a separate file called 'routes.js'
import axios from 'axios';
import VueRouter from 'vue-router';

// Import CSS files
import './assets/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

// Use Vue Router
app.use(VueRouter);

// Use Axios globally
app.config.globalProperties.$axios = axios;

// Set up the router
app.use(router);

// Mount the app
app.mount('#app');
