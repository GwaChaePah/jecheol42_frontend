import axios from 'axios';

const url = 'http://localhost:3000/posts';

export default {
	namespaced: true,
	state: () => ({
		posts: [],
		thePost: {},
		comments: []
	}),
	mutations: {
		updateState(state, payload) {
			Object.keys(payload).forEach(key => {
				state[key] = payload[key]
			})
		},
		resetState(state) {
			state.post= [],
			state.thePost = {},
			state.comments = []
		}
	},
	actions: {
		async initPosts({ commit }) {
			commit('updateState', {
				posts: []
			});
			const res = await _fetchPost();
			commit('updateState', {
				posts: res
			});
		},
		async initComments({ commit }, payload) {
			commit('updateState', {
				comments: []
			});
			const res = await _fetchComment(payload);
			commit('updateState', {
				comments: res
			});
		},
		async searchPostWithId({ commit }, payload) {
			commit('updateState', {
				thePost: {}
			});
			try {
				const getUrl = await axios.get(url);
				const res = getUrl.data;
				commit('updateState', {
					thePost: res[payload['id']]
				});
			} catch (e) {
				console.log(e.message);
				commit('updateState', {
					thePost: {}
				});
			}
		},
		async searchPostOptions({ commit, getters }, payload) {
			if (payload.value == '전체') {
				commit('updateState', {
					posts: []
				});
				const res = await _fetchPost();
				commit('updateState', {
					posts: res
				});
				return ;
			}
			const backup = getters.currentPosts;
			commit('updateState', {
				posts: []
			});
			try {
				const getUrl = await axios.get(url);
				const data = getUrl.data;
				const res = data.filter(item=>item.option == payload.value);
				commit('updateState', {
					posts: res
				});
			} catch (e) {
				console.log(e.message);
				commit('updateState', {
					posts: backup
				});
			}
		},
		deleteComment({ commit, state }, payload) {
			commit('updateState', {
				comments: []
			});
			commit('updateState', {
				comments: payload
			});
			console.log(state.comments)
		}
	},
	getters: {
		currentPosts: state => state.posts
	}
}

async function _fetchPost() {
	const res = await fetch('http://localhost:3000/posts')
  .then((response) => response.json());
	const filtered = res.filter(item => {
		return (item.option == '소분' || item.option == '나눔')
	})
	return filtered;
}

async function _fetchComment(payload) {
	const res = await fetch('http://localhost:3000/comments')
  .then((response) => response.json());
	const filtered = res.filter(item => item.post_id == payload)
	return filtered;
}
