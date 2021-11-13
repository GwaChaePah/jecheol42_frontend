import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://jecheol-42.herokuapp.com/';
createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
