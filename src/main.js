

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'; 
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import './style.css';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const pinia = createPinia();


createApp(App).use(pinia)
.use(VueAwesomePaginate)
.use(VCalendar, {})
.mount('#app');
