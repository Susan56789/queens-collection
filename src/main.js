import './assets/css/tailwind.css';

import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import auth from './auth'

const app = createApp(App)
app.use(router);
app.use(auth)
app.mount('#app')
