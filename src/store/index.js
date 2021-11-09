import { createStore } from 'vuex';
import post from './post';
import auth from './auth';
import product from './product';
import login from './login';

export default createStore({
	modules: {
		login,
		post,
		auth,
		product,
	}
})
