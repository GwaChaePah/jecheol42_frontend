import axios from 'axios'

export default {
	namespaced: true,
	state: () => ({
		product: [],
		theSearch: {
			name: '',
			price: '',
			unit: '',
			average_price: '',
			date: ''
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
				average_price: '',
				date: ''
			};
			state.postSearch = '';
		},
	},
	actions: {
		async initProduct({ state, commit }) {
			if (state.loading) return;
			commit('RESET_STATE');
			commit('UPDATE_STATE', {
				loading: true
			});
			let res;
			try {
				res = await _fetchProduct();
			} catch(e) {
				console.log('ERROR> ', e);
				res = [];
			} finally {
				commit('UPDATE_STATE', {
					product: res,
					loading: false
				});
			}
		},
		updateSearch({ commit }, value) {
			commit('UPDATE_STATE', {
				postSearch: value,
			});
		},
		async searchProduct({ state, commit }, payload) {
			if (!payload) return;
			if (state.loading) return;
			commit('UPDATE_STATE', {
				loading: true
			})
			let postSearch = payload;
			try {
				const data = encodeURI(payload);
				const res = await axios.get(`search-api?search=${data}`)
					.then(response => response.data);
				const price = res[0];
				try {
					if (price) {
						commit('UPDATE_STATE', {
							theSearch: {
								name: price.item_name,
								price: price.price,
								unit: price.unit,
								average_price: price.average_price,
								date: price.date
							},
						});
						postSearch = price.item_name;
					}	else {
						commit('RESET_STATE');
					}
				} catch(e) {
					console.log(e.message);
					commit('RESET_STATE');
				}
			} catch (e) {
				console.log(e.message);
				commit('RESET_STATE');
			} finally {
				commit('UPDATE_STATE', {
					postSearch: postSearch,
					loading: false
				})
			}
		},
	},
}

async function _fetchProduct() {
	const res = await axios.get('product-api')
		.then(response => response.data.results);
	return res;
}
