import axios from 'axios';

export default {
	namespaced: true,
	state: {
		allUsers: [
			{ id: 1, username: "test1", password: "test1"},
			{ id: 2, username: "test2", password: "test2"},
		],
		isLogin: false,
		isLoginError: false,
	},
	mutations: {
		loginSuccess(state) {
			state.isLogin = true
			state.isLoginError = false
			console.log("성공~")
		},
		idError(state) {
			state.isLogin = false
			state.isLoginError = true
			console.log("idError")
		},
		pwError(state) {
			state.isLogin = false
			state.isLoginError = true
			console.log("pwError")
		},
		logout(state) {
			state.isLogin = false
			state.isLoginError = false
			console.log("로그아웃~")
		}
	},
	actions: {
		login({ state, commit }, signinObj) {
			console.log(signinObj)
			let selectedUser = null
			state.allUsers.forEach(user => {
				if (user.username === signinObj.username) 
					selectedUser = user
			})
			if (selectedUser === null) {
				commit("idError")
			}
			else 
				if (selectedUser.password !== signinObj.password) {
					commit("pwError")
				}					
				else {
					commit("loginSuccess")
				}
			console.log(this.username, this.password);
		},
		logout({ commit }) {
			commit("logout")
		}
	}
}