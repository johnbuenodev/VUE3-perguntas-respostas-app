import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from './App.vue'

//O APP ESTÁ SENDO CRIADO, APOS ADD O USE PARA O APP DA BIBLIOTECA
createApp(App).use(VueAxios, axios).mount('#app');
