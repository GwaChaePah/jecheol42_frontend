import { createStore } from 'vuex';
import post from './post';
import auth from './auth';

export default createStore({
	modules: {
		post,
		auth
	}
})
