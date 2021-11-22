import axios from 'axios';
import router from '../router';

export default {
	namespaced: true,
	state: {
		username: null,
		isLogin: false,
		isLoginError: false,
		accessToken: null,
		refreshToken: null
	},
	mutations: {
		loginSuccess(state, payload) {
			state.isLogin = true
			state.isLoginError = false
			state.username = payload
		},
		logout(state) {
			state.isLogin = false
			state.isLoginError = false
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
			.post("token/api/", loginObj)
			.then (response => {
				let userInfo = {
					pk: response.data.pk,
					username: response.data.username,
					region: response.data.region,
				}
				let access = response.data.access
				let refresh = response.data.refresh
				commit('updateStorage', { access,refresh })
				sessionStorage.setItem("access_token", access)
				sessionStorage.setItem("refresh_token", refresh)
				sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
				dispatch("loggedIn")
				router.go(0)
				router.go(-1)
			})		
			.catch(error => {
				console.log(error)
				alert("아이디와 비밀번호를 확인하세요")
			})
		},
		loggedIn({ commit }) {
			let sessionRefresh = sessionStorage.getItem("refresh_token")
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
			let config = { "token" : sessionRefresh }
			axios
			.post ("token/api/verify/", config)
			.then (res => {
				commit("loginSuccess", userInfo.username)
			})
			.catch (err => {
				axios
				.post ("token/api/refresh/", {
					refresh: sessionRefresh
				})
				.then (response => {
					let newAccess = response.data.access
					commit('updateAccess', { newAccess })
					sessionStorage.setItem("access_token", newAccess)
					commit("loginSuccess", userInfo.username)
				})
				.catch (error => {
					console.log(error)
					dispatch("logout")
					alert("다시 로그인해 주세요")
					router.push('/login')
				})
			})
		},
		logout({ commit }) {
			sessionStorage.clear()
			commit("destroyToken")
			commit("logout")
		}
	}
}
