import axios from 'axios';

export default {
	namespaced: true,
	state: () => ({
		posts: [],
		thePost: {},
		comments: [],
		loading: false,
		mobileNav: false,
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
		},
	},
	actions: {
		initMobileNav({ commit }, payload) {
			commit('UPDATE_STATE', {
				mobileNav: payload
			})
		},
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
		async searchPostTags({ state, commit }, payload) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				loading: true
			});
			if (payload.value === '전체') {
				const res = await _fetchPost(payload.search);
				commit('UPDATE_STATE', {
					posts: res,
					loading: false
				});
				return ;
			}
			let res;
			try {
				if (payload.value === '완료') {
					if (payload.search) {
						res = await axios.get('posts')
						.then(response => response.data.filter(item => (item.tag == payload.value) && ((item.content.indexOf(payload.search) !== -1) || (item.title.indexOf(payload.search) !== -1))));
					}
					else {
						res = await axios.get('posts')
						.then(response => response.data.filter(item => (item.tag == payload.value)));
					}
				} else {
					res = await _fetchPost(payload.search)
						.then(response => response.filter(item => item.tag == payload.value));
				}
			} catch (e) {
				console.log('ERROR', e.response.data);
				res = await _fetchPost(payload.search);
				commit('UPDATE_STATE', {
					loading: false
				})
			} finally {
				commit('UPDATE_STATE', {
					posts: res,
					loading: false
				});
			}
		},
		async updateTag({ state, commit }, payload) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				loading: true
			});
			let res = await axios.get('posts/' + payload.id)
				.then(response => response.data);
			res.tag = payload.tag;
			try {
				await axios({
					url: 'posts/' + res.id,
					method: 'put',
					data: res,
					headers: {"Content-Type" : "application/json"}
				});
				commit('UPDATE_STATE', {
					thePost: payload,
					loading: false
				});
			} catch(e) {
				console.log('ERROR', e.response.data);
				commit('UPDATE_STATE', {
					loading: false
				})
			}
		},
		async deletePost({ commit }, payload) {
			console.log(payload);
			try {
				await axios.delete('posts/' + payload);
			} catch(e) {
				console.log('ERROR', e.response.data);
			} finally {
				commit('UPDATE_STATE', {
					thePost: {}
				});
			}
		},
		async updateComment({ state, commit }, { option = 1, payload}) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				loading: true
			});
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
				commit('UPDATE_STATE', {
					loading: false
				});
			} finally {
				const res = await axios.get('comments')
				.then(response => response.data.filter(item => 	item.post_key == payload.post_key))
				commit('UPDATE_STATE', {
					comments: res,
					loading: false
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
				.then(response => response.data.filter(item => 	item.post_key == payload.post_key))
				commit('UPDATE_STATE', {
					comments: res
				});
			}
		},
		async deletePostComments({ commit }, payload) {
			try {
				const comments = await _fetchComment(payload);
				for (let i = 0; i < comments.length; i++) {
					await axios.delete('comments/' + comments[i].id);
				}
			} catch(e) {
				console.log('ERROR', e.response.data);
			}finally {
				commit('UPDATE_STATE', {
					comments: []
				});
			}
		},
		async updatePost({ commit }, payload) {
			try {
				await axios({
					url: 'posts/' + payload.id,
					method: 'put',
					data: payload
				})
			} catch(e) {
				console.log('ERROR', e.response.data);
			} finally {
				commit('UPDATE_STATE', {
					thePost: payload
				});
			}
		}
	}
}

async function _fetchPost(payload, id = 0) {
	let	res = await axios.get('posts')
		.then(response => response.data)
	if (payload) {
		res = res.filter(item => ((item.content.indexOf(payload) !== -1) || (item.title.indexOf(payload) !== -1)));
	}
	let filtered;
	if (!id) {
		filtered = res.filter(item => {
			return (item.tag == '소분' || item.tag == '나눔');
		})
	} else {
		filtered = res.filter(item => item.id == id)
	}
	return filtered;
}

async function _fetchComment(payload) {
	const res = await axios.get('comments')
		.then(response => response.data.filter(item => item.post_key == payload))
	return res;
}
