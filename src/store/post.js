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
				} else {
					res = await _fetchBoard();
				}
			} catch(e) {
				console.log('ERROR> ', e);
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
				comments = res.comments;
			} catch (e) {
				console.log('ERROR> ', e);
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
				console.log('ERROR> ', e);
				res = state.board;
			} finally {
				commit('UPDATE_STATE', {
					boardView: res,
					loading: false
				});
			}
		},
		async deletePost({ commit }, payload) {
			try {
				await axios.delete(`post-api/${payload}`);
			} catch(e) {
				console.log('ERROR> ', e);
			} finally {
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
						url: `comment-api/${payload.post_key}`,
						method: 'post',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				} else {
					await axios({
						url: `comment_detail-api/${payload.id}`,
						method: 'put',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				}
			} catch(e) {
				console.log('ERROR> ', e);
			} finally {
				const res = await _fetchPost(payload.post_key)
					.then(response => response.comments);
				commit('UPDATE_STATE', {
					comments: res,
					loading: false
				});
			}
		},
		async deleteComment({ commit }, payload) {
			try {
				await axios.delete('comment_detail-api/' + payload.id);
			} catch(e) {
				console.log('ERROR> ', e);
			} finally {
				const res = await _fetchPost(payload.post_key)
					.then(response => response.comments);
				commit('UPDATE_STATE', {
					comments: res,
				});
			}
		},
	},
}

async function _fetchBoard() {
	const	data0 = await axios.get('board-api?tag=0')
		.then(response => response.data);
	const data1 = await axios.get('board-api?tag=1')
		.then(response => response.data);
	const data2 = await axios.get('board-api?tag=2')
		.then(response => response.data);
	const	res = data0.concat(...data1.concat(...data2));
	return res;
}

async function _fetchPost(payload) {
	const res = await axios.get(`post_comment-api/${payload}`)
		.then(response => response.data);
	return res;
}
