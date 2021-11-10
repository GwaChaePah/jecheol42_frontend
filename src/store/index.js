import { createStore } from 'vuex';
import post from './post';
import product from './product';
import login from './login';

export default createStore({
	modules: {
		login,
		post,
		product,
	}
})
