import axios from 'axios';
import router from '../router';

export default {
	namespaced: true,
	state: {
		userInfo: null,
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
		logout(state) {
			state.isLogin = false
			state.isLoginError = false
			console.log("로그아웃~")
		}
	},
	actions: {
		login({ dispatch }, loginObj) {
			axios
			.post("https://reqres.in/api/login", loginObj)
			.then(response => {
				let token = response.data.token
				localStorage.setItem("access_token", token)
				dispatch("getMemberInfo")
					.catch(err => {
						alert("아이디와 비밀번호를 확인하세요")
					})
			})
			.catch(error => {
				alert("아이디와 비밀번호를 확인하세요")
			})
		},
		getMemberInfo({commit}) {
			let token = localStorage.getItem("access_token")
			let config = {
				headers: {
					"access-token" : token
				}
			}
			axios
			.get("https://reqres.in/api/users/2", config)
			.then(res => {
				let userInfo = {
					avatar: res.data.data.avatar,
					id: res.data.data.id,
					first_name: res.data.data.first_name,
					last_name: res.data.data.last_name,
				}
				commit("loginSuccess", userInfo)
				// router.push('/')
			})
		},
		logout({ commit }) {
			commit("logout")
		}
	}
}