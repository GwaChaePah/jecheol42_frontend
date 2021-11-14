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
			console.log("로그인")
		},
		logout(state) {
			state.isLogin = false
			state.isLoginError = false
			console.log("로그아웃")
		},
		updateAccess (state, { access }) {
			state.accessToken = access
		},
		updateStorage (state, { access, refresh }) {
			state.accessToken = access
			state.refreshToken = refresh
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
				console.log(response)
				let userInfo = loginObj.username
				let access = response.data.access
				let refresh = response.data.refresh
				commit('updateStorage', { access,refresh })
				localStorage.setItem("access_token", access)
				localStorage.setItem("refresh_token", refresh)
				localStorage.setItem("userInfo", userInfo)
				dispatch("loggedIn")
			})		
			.catch(error => {
				console.log(error)
				alert("아이디와 비밀번호를 확인하세요")
			})
		},
		loggedIn({ commit }) {
			let localRefresh = localStorage.getItem("refresh_token")
			let userInfo = localStorage.getItem("userInfo")
			let config = { "token" : localRefresh }
			axios
			.post ("api/token/verity/", config)
			.then (res => {
				commit("loginSuccess", userInfo)
				// router.push('/')
			})
			.catch (err => {
				axios
				.post ("api/token/refresh/", {
					refresh: localRefresh
				})
				.then (response => {
					let newAccess = response.data.access
					commit('updateAccess', { newAccess })
					localStorage.setItem("access_token", newAccess)
				})
				.catch (error => {
				})
			})
		},
		logout({ commit }) {
			localStorage.removeItem('refresh_token')
			commit("destroyToken")
			commit("logout")
		}
	}
}
