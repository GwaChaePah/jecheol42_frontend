import axios from 'axios';
import router from '../router';

export default {
	namespaced: true,
	state: {
		userInfo: null,
		allUsers: [
			{ id: 1, username: "test1", password: "test1"},
			{ id: 2, username: "test2", password: "test2"},
		],
		isLogin: false,
		isLoginError: false,
	},
	mutations: {
		loginSuccess(state, payload) {
			state.isLogin = true
			state.isLoginError = false
			state.userInfo = payload
			console.log("성공~")
		},
		// loginSuccess(state) {
		// 	state.isLogin = true
		// 	state.isLoginError = false
		// 	console.log("성공~")
		// },
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
		login({ commit }, loginObj) {
			// console.log(loginObj)
			// let selectedUser = null
			// state.allUsers.forEach(user => {
			// 	if (user.username === loginObj.username) 
			// 		selectedUser = user
			// })
			// if (selectedUser === null) {
			// 	commit("idError")
			// }
			// else 
			// 	if (selectedUser.password !== loginObj.password) {
			// 		commit("pwError")
			// 	}					
			// 	else {
			// 		commit("loginSuccess")
			// 	}
			// console.log(this.username, this.password);
			axios
			.post("https://reqres.in/api/login", loginObj)
			.then(response => {
				//성공시 토큰 반환
				//토큰을 헤더에 포함해 유저 정보 요청
				let token = response.data.token
				let config = {
					headers: {
						"access-token" : token
					}
				}
				axios
					.get("https://reqres.in/api/users/2", config)
					.then(res => {
						// console.log(res); 
						let userInfo = {
							avatar: res.data.data.avatar,
							id: res.data.data.id,
							first_name: res.data.data.first_name,
							last_name: res.data.data.last_name,
						}
						commit("loginSuccess", userInfo)
						router.push('/')
					})
					.catch(err => {
						alert("아이디와 비밀번호를 확인하세요")
					})
			})
			.catch(error => {
				alert("아이디와 비밀번호를 확인하세요")
			})
		},
		logout({ commit }) {
			commit("logout")
		}
	}
}