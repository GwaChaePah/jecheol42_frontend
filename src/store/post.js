import axios from 'axios';
export default {
	namespaced: true,
	state: () => ({
		board: [],
		boardView: [],
		post: {},
		comments: [],
		loading: false,
		mobileNav: false,
		boardTag: ''
	}),
	mutations: {
		UPDATE_STATE(state, payload) {
			Object.keys(payload).forEach(key => {
				state[key] = payload[key]
			})
		},
	},
	actions: {
		initMobileNav({ commit }, payload) {
			commit('UPDATE_STATE', {
				mobileNav: payload
			})
		},
		updateTag({ commit }, payload) {
			commit('UPDATE_STATE', {
				boardTag: payload
			});
		},
		async initBoard({ state, commit }, payload) {
			if (state.loading) return;
			if (!payload) {
				commit('UPDATE_STATE', {
					boardTag: 3,
					board: [],
				});
			}
			commit('UPDATE_STATE', {
				boardView: [],
				loading: true,
			});
			let res;
			try {
				if (payload) {
					res = await axios.get(`board-api?search=${payload}`)
						.then(response => response.data);
					for (let i = 0; i < res.length; i++) {
						const date = res[i].created_at.slice(0, 10).replaceAll('-', '.');
						const time = res[i].created_at.slice(11, 16);
						const created_at = date.concat('. '.concat(...time));
						res[i].created_at = created_at;
					}
				} else {
					res = await _fetchBoard();
				}
			} catch(e) {
				console.log('initBoard> ', e);
				res = [];
			} finally {
				commit('UPDATE_STATE', {
					board: res,
					boardView: res.filter(item => {
						if (state.boardTag === 3) return (item.tag === 1 || item.tag === 0);
						else return (item.tag === state.boardTag);
					}),
					loading: false,
				});
			}
		},
		async searchPostWithId({ commit, state }, payload) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				post: {},
				comments: [],
				loading: true
			});
			let post;
			let comments;
			try {
				const res = await _fetchPost(payload);
				post = res.post;
				const date = post.created_at.slice(0, 10).replaceAll('-', '.');
				const time = post.created_at.slice(11, 16);
				const created_at = date.concat('. '.concat(...time));
				post.created_at = created_at;
				comments = res.comments;
				for (let i = 0; i < comments.length; i++) {
					const date = comments[i].created_at.slice(0, 10).replaceAll('-', '.');
					const time = comments[i].created_at.slice(11, 16);
					const created_at = date.concat('. '.concat(...time));
					comments[i].created_at = created_at;
				}
			} catch (e) {
				console.log('searchPostWithId> ', e);
				post = {};
				comments = [];
			} finally {
				commit('UPDATE_STATE', {
					post: post,
					comments: comments,
					loading: false,
				});
			}
		},
		async searchPostTags({ state, commit }, payload) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				boardView: [],
				loading: true
			});
			let res;
			if (!state.board) {
				res = await axios.get(`board-api?search=${payload}`)
					.then(response => response.data);
				for (let i = 0; i < res.length; i++) {
					const date = res[i].created_at.slice(0, 10).replaceAll('-', '.');
					const time = res[i].created_at.slice(11, 16);
					const created_at = date.concat('. '.concat(...time));
					res[i].created_at = created_at;
				}
				commit('UPDATE_STATE', {
					board: res,
				})
			}
			try {
				if (state.boardTag === 3) {
					res = state.board.filter(item => item.tag === 0 || item.tag === 1);
				} else {
					res = state.board.filter(item => item.tag === state.boardTag);
				}
			} catch (e) {
				console.log('searchPostTags> ', e);
				res = state.board;
			} finally {
				commit('UPDATE_STATE', {
					boardView: res,
					loading: false
				});
			}
		},
		async deletePost({ dispatch, commit }, payload) {
			try {
				await axios.delete(`post-api/${payload}/`);
			} catch(e) {
				console.log('deletePost> ', e);
			} finally {
				dispatch('initBoard');
				commit('UPDATE_STATE', {
					post: {},
					comments: []
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
						url: 'comment-api/',
						method: 'post',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				} else {
					await axios({
						url: `comment-api/${payload.id}/`,
						method: 'put',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				}
			} catch(e) {
				console.log('updateComment> ', e);
			} finally {
				const res = await _fetchPost(payload.post_key)
				.then(response => response.comments);
				for (let i = 0; i < res.length; i++) {
					const date = res[i].created_at.slice(0, 10).replaceAll('-', '.');
					const time = res[i].created_at.slice(11, 16);
					const created_at = date.concat('. '.concat(...time));
					res[i].created_at = created_at;
				}
				commit('UPDATE_STATE', {
					comments: res,
					loading: false
				});
			}
		},
		async deleteComment({ commit }, payload) {
			try {
				await axios.delete('comment-api/' + payload.id + '/');
			} catch(e) {
				console.log('deleteComment> ', e);
			} finally {
				const res = await _fetchPost(payload.post_key)
				.then(response => response.comments);
				commit('UPDATE_STATE', {
					comments: res,
				});
			}
		},
		async updatePost({ commit }, payload) {
			try {
				await axios({
					url: `post-api/${payload.get('id')}/`,
					method: 'put',
					data: payload,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			} catch(e) {
				console.log('updatePost> ', e);
			} finally {
				commit('UPDATE_STATE', {
					post: payload
				});
			}
		},
	},
}
async function _fetchBoard() {
	let res = await axios.get('board-api/')
	.then(response => response.data.results);
	for (let i = 0; i < res.length; i++) {
		const date = res[i].created_at.slice(0, 10).replaceAll('-', '.');
		const time = res[i].created_at.slice(11, 16);
		const created_at = date.concat('. '.concat(...time));
		res[i].created_at = created_at;
	}
	return res;
}
async function _fetchPost(payload) {
	const res = await axios.get(`post_comment-api/${payload}/`)
	.then(response => response.data);
	return res;
}
