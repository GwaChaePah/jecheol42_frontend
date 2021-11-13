import axios from 'axios';
import _ from 'lodash';

export default {
	namespaced: true,
	state: () => ({
		board: [],
		boardView: [],
		post: {},
		comments: [],
		loading: false,
		mobileNav: false,
		boardTag: 3,
		page: 1
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
		async initBoard({ state, commit }, { payload, page = 1 }) {
			if (state.loading) return;
			if (!payload) {
				commit('UPDATE_STATE', {
					boardTag: 3,
					board: [],
					page: 1
				});
			}
			commit('UPDATE_STATE', {
				boardView: [],
				loading: true,
			});
			let res;
			try {
				if (payload) {
					res = await _fetchBoardwSearch(payload);
				} else {
					commit('UPDATE_STATE', {
						page: page
					});
					res = await _fetchBoard(state.page);
				}
			} catch(e) {
				console.log('initBoard> ', e);
				res = [];
			} finally {
				const boardView = (state.boardTag === 3) ? res :
					await _fetchwTag(state.boardTag, payload);
				commit('UPDATE_STATE', {
					board: res,
					boardView: boardView,
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
				post = await _fetchPost(payload);
				comments = await _fetchComment(payload);
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
			try {
				if (!state.board) {
					res = await _fetchBoardwSearch(payload);
					commit('UPDATE_STATE', {
						board: res,
					});
				}
				res = (state.boardTag === 3) ? state.board :
					await _fetchwTag(state.boardTag, payload);
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
		async updateComment({ state, commit }, { option = 1, payload, post_key}) {
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
						method: 'patch',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				}
			} catch(e) {
				console.log('updateComment> ', e);
			} finally {
				const res = await _fetchComment(post_key);
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
				const res = await _fetchComment(payload.post_key);
				commit('UPDATE_STATE', {
					comments: res,
				});
			}
		},
		async updatePost({ commit }, payload) {
			/*
			const newPayload = _.chain(payload)
				.toPairs()
				.filter(([k, v]) => !_.isNil(v))
				.fromPairs()
				.value()
			*/
			let data
			try {
				data = await axios({
					url: `post-api/${payload.get('id')}/`,
					method: 'patch',
					data: payload,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			} catch(e) {
				console.log('updatePost> ', e);
				return
			}
			commit('UPDATE_STATE', { post: data })
		},
	},
}
async function _fetchBoard(payload) {
	const	res = await axios.get(`board-api/?page=${payload}`)
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
	const res = await axios.get(`post-api/${payload}/`)
		.then(response => response.data);
	const date = res.created_at.slice(0, 10).replaceAll('-', '.');
	const time = res.created_at.slice(11, 16);
	const created_at = date.concat('. '.concat(...time));
	res.created_at = created_at;
	return res;
}
async function _fetchComment(payload) {
	const res = await axios.get(`post_comment-api/${payload}/`)
		.then(response => response.data.comments);
	for (let i = 0; i < res.length; i++) {
		const date = res[i].updated_at.slice(0, 10).replaceAll('-', '.');
		const time = res[i].updated_at.slice(11, 16);
		const updated_at = date.concat('. '.concat(...time));
		res[i].updated_at = updated_at;
	}
	return res;
}
async function _fetchBoardwSearch(payload) {
	const	res = await axios.get(`board-api?search=${payload}`)
		.then(response => response.data);
		for (let i = 0; i < res.length; i++) {
			const date = res[i].created_at.slice(0, 10).replaceAll('-', '.');
			const time = res[i].created_at.slice(11, 16);
			const created_at = date.concat('. '.concat(...time));
			res[i].created_at = created_at;
		}
	return res;
}
async function _fetchwTag(tag, payload) {
	let res;
	if (payload) {
		res = await axios.get(`board-api?search=${payload}&tag=${tag}`)
		.then(response => response.data);
	} else {
		res = await axios.get(`board-api?tag=${tag}`)
		.then(response => response.data);
	}
	for (let i = 0; i < res.length; i++) {
		const date = res[i].created_at.slice(0, 10).replaceAll('-', '.');
		const time = res[i].created_at.slice(11, 16);
		const created_at = date.concat('. '.concat(...time));
		res[i].created_at = created_at;
	}
	return res;
}
