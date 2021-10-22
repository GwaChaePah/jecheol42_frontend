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
				console.log('ERROR', e.response.data);
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
		async searchPostWithId({ commit, state }, payload) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				thePost: {},
				loading: true
			});
			try {
				let res = await _fetchPost(0, payload.id);
				commit('UPDATE_STATE', {
					thePost: res[0]
				});
			} catch (e) {
				console.log('ERROR', e.response.data);
				commit('UPDATE_STATE', {
					thePost: {}
				});
			} finally {
				commit('UPDATE_STATE', {
					loading: false
				})
			}
		},
		async searchPostOptions({ commit }, payload) {
			if (payload.value == '전체') {
				const res = await _fetchPost(payload.search);
				commit('UPDATE_STATE', {
					posts: res
				});
				return ;
			}
			try {
				let res;
				if (payload.value === '완료') {
					res = await axios.get('posts')
						.then(response => response.data.filter(item => item.option == payload.value));
				} else {
					res = await _fetchPost(payload.search)
						.then(response => response.filter(item => item.option == payload.value));
				}
				commit('UPDATE_STATE', {
					posts: res
				});
			} catch (e) {
				console.log('ERROR', e.response.data);
				const res = await _fetchPost(payload.search);
				commit('UPDATE_STATE', {
					posts: res
				});
			}
		},
		async updateOption({ commit }, payload) {
			let res = await axios.get('posts/' + payload.id)
				.then(response => response.data);
			res.option = payload.option;
			try {
				await axios({
					url: 'posts/' + res.id,
					method: 'put',
					data: res,
					headers: {"Content-Type" : "application/json"}
				});
				commit('UPDATE_STATE', {
					thePost: payload
				});
			} catch(e) {
				console.log('ERROR', e.response.data);
			}
		},
		async updateComment({ commit }, { option = 1, payload}) {
			try {
				if (option) {
					await axios({
						url: 'comments',
						method: 'post',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				} else {
					await axios({
						url: 'comments/' + payload.id,
						method: 'put',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				}
			} catch(e) {
				console.log('ERROR', e.response.data);
			} finally {
				const res = await axios.get('comments')
				.then(response => response.data.filter(item => 	item.post_id == payload.post_id))
				commit('UPDATE_STATE', {
					comments: res
				});
			}
		},
		async deleteComment({ commit }, payload) {
			try {
				await axios.delete('comments/' + payload.id);
			} catch(e) {
				console.log('ERROR', e.response.data);
			} finally {
				const res = await axios.get('comments')
				.then(response => response.data.filter(item => 	item.post_id == payload.post_id))
				commit('UPDATE_STATE', {
					comments: res
				});
			}
		}
	}
}

async function _fetchPost(payload, id = 0) {
	let	res = await axios.get('posts')
		.then(response => response.data)
	if (payload) {
		res = res.filter(item => ((item.content.indexOf(payload) !== 1) || (item.title.indexOf(payload) !== -1)));
	}
	let filtered;
	if (!id) {
		filtered = res.filter(item => {
			return (item.option == '소분' || item.option == '나눔');
		})
	} else {
		filtered = res.filter(item => item.id == id)
	}
	return filtered;
}

async function _fetchComment(payload) {
	const res = await axios.get('comments')
		.then(response => response.data.filter(item => item.post_id == payload))
	return res;
}
