import axios from 'axios'

export default {
	namespaced: true,
	state: () => ({
		product: '',
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
			state.product = '';
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
				console.log('initProduct> ', e);
				res = '';
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
				const res = await _fetchSearch(payload);
				if (res) {
					commit('UPDATE_STATE', {
						theSearch: {
							name: res.item_name,
							price: res.price,
							unit: res.unit,
							average_price: res.average_price,
							date: res.date
						},
					});
					postSearch = res.item_name;
				}	else {
					commit('RESET_STATE');
				}
			} catch (e) {
				console.log('searchProduct> ', e);
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
	const res = await axios.get('product/api/')
		.then(response => response.data.results);
	return res;
}
async function _fetchSearch(payload){
	const res = await axios.get(`search/api?search=${encodeURI(payload)}`)
		.then(response => response.data.find(item => item.item_name === payload))
	return res;
}
