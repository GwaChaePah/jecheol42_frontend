import axios from 'axios';
// import _ from 'lodash';

export default {
	namespaced: true,
	state: () => ({
		boardView: '',
		boardTag: '',
		page: 1,
		totalPage: 1,
		post: '',
		comments: '',
		loading: false,
		mobileWidth: false,
		mobileNav: false,
		scrollPosition: false,
		header: false,
		region: '',
	}),
	mutations: {
		UPDATE_STATE(state, payload) {
			Object.keys(payload).forEach(key => {
				state[key] = payload[key]
			})
		},
	},
	actions: {
		updateRegion({ commit }, payload) {
			commit('UPDATE_STATE', {
				region: payload
			});
		},
		updateMobileNav({ commit }, payload) {
			commit('UPDATE_STATE', {
				mobileNav: payload
			});
		},
		updateMobileWidth({ commit }, payload) {
			commit('UPDATE_STATE', {
				mobileWidth: payload
			});
		},
		updateScrollPosition({ commit }, payload) {
			commit('UPDATE_STATE', {
				scrollPosition: payload
			});
		},
		updateTag({ commit }, payload) {
			commit('UPDATE_STATE', {
				boardTag: payload
			});
		},
		updatePage({ commit }, payload) {
			commit('UPDATE_STATE', {
				page: payload
			});
		},
		updateHeader({ commit }, payload) {
			commit('UPDATE_STATE', {
				header: payload
			});
		},
		async getBoard({ state, commit }, { payload, page, header = true, allRegion }) {
			if (state.loading) return;
			commit('UPDATE_STATE', {
				boardView: [],
				page: page ? page : state.page,
				loading: true,
				header: header,
			});
			if (!header) {
				commit('UPDATE_STATE', {
					loading: false,
					totalPage: 1
				});
			} else {
				let boardView;
				let totalPage;
				try {
					const regionTemp = allRegion ? 0 : state.region;
					const data = await _fetchBoard(payload, state.boardTag, state.page, regionTemp);
					totalPage = calcTotalPage(data.count);
					boardView = data.results;
				} catch(e) {
					console.log('getBoard> ', e);
					boardView = [];
					totalPage = 1;
				} finally {
					commit('UPDATE_STATE', {
						boardView: boardView,
						totalPage: totalPage,
						loading: false,
					});
				}
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
		async deletePost({ commit }, payload) {
			try {
				await axios.delete(`post/api/${payload}/`);
			} catch(e) {
				console.log('deletePost> ', e);
			} finally {
				commit('UPDATE_STATE', {
					post: {},
					comments: [],
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
						url: 'comment/api/',
						method: 'post',
						data: payload,
						headers: {"Content-Type" : "application/json"}
					});
				} else {
					await axios({
						url: `comment/api/detail/${payload.id}/`,
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
				await axios.delete('comment/api/detail/' + payload.id + '/');
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
			let post
			try {
				const { data } = await axios({
					url: `post/api/${payload.get('id')}/`,
					method: 'patch',
					data: payload,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				post = data
			} catch(e) {
				console.log('updatePost> ', e);
				return;
			}
			commit('UPDATE_STATE', { post })
		},
	},
}
async function _fetchBoard(payload, tag, page, region) {
	const search = payload ? encodeURI(payload) : '';
	let data;
	if (tag !== '' && tag !== 3) {
		if (region) {
			data = await axios.get(`board/api?search=${search}&tag=${tag}&page=${page}&region=${region}`)
				.then(res => res.data);
		} else {
			data = await axios.get(`board/api?search=${search}&tag=${tag}&page=${page}`)
				.then(res => res.data);
		}
	} else {
		if (region) {
			data = await axios.get(`board/api?search=${search}&page=${page}&region=${region}`)
				.then(res => res.data);
		} else {
			data = await axios.get(`board/api?search=${search}&page=${page}`)
				.then(res => res.data);
		}
	}
	for (let i = 0; i < data.results.length; i++) {
		const date = data.results[i].created_at.slice(0, 10).replaceAll('-', '.');
		const time = data.results[i].created_at.slice(11, 16);
		const created_at = date.concat('. '.concat(...time));
		data.results[i].created_at = created_at;
	}
	return data;
}
async function _fetchPost(payload) {
	let res;
	try {
		res = await axios.get(`post/api/${payload}/`)
			.then(response => response.data);
		const date = res.created_at.slice(0, 10).replaceAll('-', '.');
		const time = res.created_at.slice(11, 16);
		const created_at = date.concat('. '.concat(...time));
		res.created_at = created_at;
	} catch(e) {
		console.log('_fetchPost> ', e);
		res = '';
	}
	return res;
}
async function _fetchComment(payload) {
	let res;
	try {
		res = await axios.get(`comment/api/list/${payload}/`)
			.then(response => response.data);
		for (let i = 0; i < res.length; i++) {
			const date = res[i].updated_at.slice(0, 10).replaceAll('-', '.');
			const time = res[i].updated_at.slice(11, 16);
			const updated_at = date.concat('. '.concat(...time));
			res[i].updated_at = updated_at;
		}
	} catch(e) {
		console.log('_fetchComment> ', e);
		res = '';
	}
	return res;
}
function calcTotalPage(payload) {
	return (payload % 12) ? ~~(payload / 12) + 1 : ~~(payload / 12);
}
