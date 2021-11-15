import axios from 'axios';
import { concat } from 'lodash';
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
			.post("token/api/", loginObj)
			.then (response => {
				console.log(response)
				let userInfo = {
					pk: response.data.pk,
					username: response.data.username,
					region: response.data.region,
				}
				let access = response.data.access
				let refresh = response.data.refresh
				commit('updateStorage', { access,refresh })
				localStorage.setItem("access_token", access)
				localStorage.setItem("refresh_token", refresh)
				localStorage.setItem("userInfo", JSON.stringify(userInfo))
				dispatch("loggedIn")
				router.push('/')
			})		
			.catch(error => {
				console.log(error)
				alert("아이디와 비밀번호를 확인하세요")
			})
		},
		loggedIn({ commit }) {
			let localRefresh = localStorage.getItem("refresh_token")
			let userInfo = JSON.parse(localStorage.getItem("userInfo"))
			let config = { "token" : localRefresh }
			axios
			.post ("token/api/verity/", config)
			.then (res => {
				commit("loginSuccess", userInfo.username)
			})
			.catch (err => {
				axios
				.post ("token/api/refresh/", {
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
			localStorage.clear()
			commit("destroyToken")
			commit("logout")
		}
	}
}
