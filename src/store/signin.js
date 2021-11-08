
export default {
	state: {
		isLogin: false,
		isLoginError: true,
	},
	mutations: {
		loginSuccess(state) {
			state.isLogin = true
			state.isLoginError = false
			console.log("성공~")
		},
		loginError(state) {
			state.isLogin = false
			state.isLoginError = true
			console.log("실패~")
		}
	},
	actions: {
		error({commit}) {
			commit("loginError")
		},
		success({commit}) {
			commit("loginSuccess")
		},
	}
}