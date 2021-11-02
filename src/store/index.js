import { createStore } from 'vuex';
import post from './post';
import auth from './auth';
import product from './product';

export default createStore({
	modules: {
		post,
		auth,
		product
	}
})
