import axios from 'axios'

export default {
	namespaced: true,
	state: () => ({
		product: [],
		theSearch: {
			name: '',
			price: '',
			unit: '',
			seasons: [],
			inSeason: false
		},
		postSearch: '',
		loading: false
	}),
	mutations: {
		UPDATE_STATE(state, payload) {
			Object.keys(payload).forEach(key => {
				state[key] = payload[key]
			})
		},
		RESET_STATE(state) {
			state.product = [];
			state.theSearch = {
				name: '',
				price: '',
				unit: '',
				seasons: [],
				inSeason: false
			};
			state.postSearch = '';
		},
		UPDATE_POSTSEARCH(state, value) {
			state.postSearch = value;
		}
	},
	actions: {
		async initProduct({ state, commit }) {
			if (state.loading) return;
			commit('RESET_STATE');
			commit('UPDATE_STATE', {
				loading: true
			})
			const res = await _fetchProduct();
			// 랜덤으로 4개 뽑기
			commit('UPDATE_STATE', {
				product: res,
				loading: false
			});
		},
		updateSearch({ commit }, value) {
			commit('UPDATE_POSTSEARCH', value);
		},
		async searchProduct({ state, commit }, payload) {
			if (!payload) return;
			if (state.loading) return;
			commit('UPDATE_STATE', {
				loading: true
			})
			try {
				const res = await axios.get('exApi')
				const price = res.data.find(m => m.name.includes(payload));
				try {
					if (price) {
						const season = await _fetchSeason(payload);
						const check = _checkSeason(season);
						commit('UPDATE_STATE', {
							theSearch: {
								name: price.name,
								price: price.price,
								unit: price.unit,
								seasons: season,
								inSeason: check
							},
							postSearch: price.name,
							loading: false
						});
					}
					else {
						commit('RESET_STATE');
						commit('UPDATE_STATE', {
							postSearch: payload,
							loading: false
						});
					}
				} catch(e) {
					console.log(e.message);
					commit('RESET_STATE');
					commit('UPDATE_STATE', {
						postSearch: payload,
						loading: false
					});
				}
			} catch (e) {
				console.log(e.message);
				commit('RESET_STATE');
			}
		},
	},
	getters: {
		postSearch: state => state.postSearch
	}
}

async function _fetchProduct() {
	// https://jecheol-42.herokuapp.com/product-api.json
	const mon = new Date().getMonth() + 1;
	const res = await axios.get('product');
	let filtered = [];
	for (let i = 0; i < res.data.length; i++) {
		let month = res.data[i].month;
		for (let j = 0; j < month.length; j++) {
			if (month[j] == mon) {
				filtered = filtered.concat(res.data[i]);
			}
		}
	}
	return filtered;
}

async function _fetchSeason(payload) {
	const res = await axios.get('product');
	const ret = res.data.find(m => m.name.includes(payload)).month;
	// res.data.forEach(item => {
	// 	if (item.name === payload) {
	// 		ret = item.month;
	// 	}
	// });
	return ret;
}

function _checkSeason(payload) {
	let check = false;
	const mon = new Date().getMonth() + 1;
	for (let i = 0; i < Object.keys(payload).length; i++) {
		if (payload[i] == mon) {
			check = true;
		}
	}
	return check;
}
