import axios from 'axios';
import router from '../router';

export default {
	namespaced: true,
	state: {
		duplicateId: false,
		useId: false,
		notSamePw: false
	},
	mutations: {
		notSamePw(state) {
			state.notSamePw = true
			console.log("비밀번호를 확인구다사이")
		},
		duplicateId(state) {
			state.duplicateId = true
			console.log("사용 불가능한 아이디입니다")
		},
		useId(state) {
			state.useId = true
			console.log("사용 가능한 아이디입니다")
		},
	},
	actions: {
		
	}
}
