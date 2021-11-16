import { createStore } from 'vuex';
import post from './post';
import login from './login';
import product from './product';
// import register from './register';

export default createStore({
	modules: {
		post,
		login,
		product,
		// register,
	}
})
