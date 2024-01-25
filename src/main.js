import './assets/css/tailwind.css';

import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import axios from 'axios'


const app = createApp(App)
app.use(router);

// Set up Axios globally
app.config.globalProperties.$axios = axios

app.mount('#app')
