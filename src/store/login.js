import axios from 'axios';
import router from '../router';

export default {
	namespaced: true,
	state: {
		userInfo: null,
		isLogin: false,
		isLoginError: false,
		accessToken: null,
		refreshToken: null
	},
	mutations: {
		loginSuccess(state, payload) {
			state.isLogin = true
			state.isLoginError = false
			state.userInfo = payload
			console.log("로그인~")
		},
		logout(state) {
			state.isLogin = false
			state.isLoginError = false
			console.log("로그아웃~")
		},
		updateAccess (state, { access }) {
			state.accessToken = access
		},
		updateStorage (state, { access, refresh }) {
			state.accessToken = access
			state.refreshToken = refresh
		},
		reissuanceAccess (state, { access}) {
			state.accessToken = access
		},
		destroyToken (state) {
			state.accessToken = null
			state.refreshToken = null
		}
	},
	actions: {
		login({ commit, dispatch }, loginObj) {
			axios
			.post("api/token/", loginObj)
			.then (response => {
				// console.log(response)
				let access = response.data.access
				let refresh = response.data.refresh
				commit('updateStorage', { access,refresh })
				localStorage.setItem("access_token", access)
				localStorage.setItem("refresh_token", refresh)

				// dispatch("loggedIn")
				commit("loginSuccess")
				router.push('/')
			})		
			.catch(error => {
				// alert("아이디와 비밀번호를 확인하세요")
				console.log(error)
			})
		},
		loggedIn({ commit }) {
			let access = localStorage.getItem("access_token")
			let refresh = localStorage.getItem("refresh_token")
			console.log(refresh)
			axios
			.post ("api/token/refresh/", refresh)
			.then (res => {
				console.log(res)
				let newAccess = res.data.access
				if (access !== newAccess) {
					commit('updateAccess', { newAccess })
					localStorage.setItem("access_token", newAccess)
				}
				else {
					console.log("글케댓다")
				}				
			})
			.catch (err => {
				console.log("우쨜래미")
				// router.push('/login')
			})
		},
		logout({ commit }) {
			commit("destroyToken")
			commit("logout")
		}
	}
}