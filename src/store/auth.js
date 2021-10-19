import axios from 'axios';

export default {
	namespaced: true,
	state: {
		users: [],
		currentUser: {}
	},
	mutations: {
		SET_USERS(state, users) {
			state.users = users;
		},
		LOGOUT_USER(state) {
			state.currentUser = {}
			window.localStorage.currentUser = JSON.stringify({});
		},
		SET_CURRENT_USER(state, user) {
			state.currentUser = user;
			window.localStorage.currentUser = JSON.stringify(user);
		}
	},
	actions: {
		async loadUsers({ commit }) {
			let res = await axios.get('users');
			let users = res.data;
			commit('SET_USERS', users);

			let user = JSON.parse(window.localStorage.currentUser);
			commit('SET_CURRENT_USER', user);
		},
		logoutUser({ commit }) {
			commit('LOGOUT_USER');
		},
		async loginUser({ commit }, form) {
			console.log(form);
			let res = await axios.post('users');
			console.log(res)
			commit('SET_CURRENT_USER', form);
		}
	}
}
