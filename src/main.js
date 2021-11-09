import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
	// .setup(store.dispatch('beforeCreate'))
