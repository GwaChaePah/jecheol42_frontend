import axios from 'axios';

export default {
	namespaced: true,
	state: () => ({
		posts: [],
		thePost: {},
		comments: [],
		loading: false
	}),
	mutations: {
		UPDATE_STATE(state, payload) {
			Object.keys(payload).forEach(key => {
				state[key] = payload[key]
			})
		},
		RESET_STATE(state) {
			state.posts = [],
			state.thePost = {},
			state.comments = [],
			state.loading = false
		}
	},
	actions: {
		async initPosts({ state, commit }, payload) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				posts: [],
				loading: true
			});
			try {
				const res = await _fetchPost(payload);
				commit('UPDATE_STATE', {
					posts: res
				})
			} catch(e) {
				console.log(e.message);
				commit('UPDATE_STATE', {
					posts: []
				})
			} finally {
				commit('UPDATE_STATE', {
					loading: false
				})
			}
		},
		async initComments({ commit }, payload) {
			commit('UPDATE_STATE', {
				comments: []
			});
			const res = await _fetchComment(payload);
			commit('UPDATE_STATE', {
				comments: res
			});
		},
		async searchPostWithId({ commit }, payload) {
			commit('UPDATE_STATE', {
				thePost: {}
			});
			try {
				const getUrl = await axios.get('posts');
				const res = getUrl.data;
				commit('UPDATE_STATE', {
					thePost: res[payload['id']]
				});
			} catch (e) {
				console.log(e.message);
				commit('UPDATE_STATE', {
					thePost: {}
				});
			}
		},
		async searchPostOptions({ commit, getters }, payload) {
			if (payload.value == '전체') {
				commit('UPDATE_STATE', {
					posts: []
				});
				const res = await _fetchPost(payload.search);
				commit('UPDATE_STATE', {
					posts: res
				});
				return ;
			}
			const backup = getters.currentPosts;
			commit('UPDATE_STATE', {
				posts: []
			});
			try {
				const res = await _fetchPost(payload.search);
				const ret = res.filter(item=>item.option == payload.value);
				commit('UPDATE_STATE', {
					posts: ret
				});
			} catch (e) {
				console.log(e.message);
				commit('UPDATE_STATE', {
					posts: backup
				});
			}
		},
		deleteComment({ commit, state }, payload) {
			commit('UPDATE_STATE', {
				comments: []
			});
			commit('UPDATE_STATE', {
				comments: payload
			});
			console.log(state.comments);
		}
	},
	getters: {
		currentPosts: state => state.posts
	}
}

async function _fetchPost(payload) {
	let res = await fetch('http://localhost:3000/posts')
  .then(response => response.json())
	if (payload) {
		res = res.filter(item => ((item.content.indexOf(payload) !== -1) || (item.title.indexOf(payload) !== -1)));
	}
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
