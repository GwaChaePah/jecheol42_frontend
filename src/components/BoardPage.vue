<template>
	<div class="content-wrapper">
		<div class="button-wrapper">
			<button class="material-icons">first_page</button>
			<button class="material-icons">chevron_left</button>
			<div v-for="n in totalPage" :key="`page${n}`" class="pages">
				<button :class="{clickable: page !== n }" @click.default="goToPage(n)">{{ n }}</button>
			</div>
			<button class="material-icons">chevron_right</button>
			<button class="material-icons">last_page</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'BoardPage',
	data() {
		return {
			totalPage: '',
			currentPage: '',
		}
	},
	computed: {
		...mapState('product', ['postSearch']),
		...mapState('post', ['page'])
	},
	created() {
		this.getTotalPage();
	},
	methods: {
		async getTotalPage() {
			const res = await axios.get('board-api/')
				.then(response => response.data.count);
			const totalPage = (res % 12) ? ~~(res / 12) + 1 : ~~(res / 12);
			this.totalPage = totalPage;
		},
		async goToPage(e) {
			if (e !== this.page) {
				this.$store.dispatch('post/initBoard', {
					page: e
				});
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';


.content-wrapper {
	text-align: center;
	width: 100%;
	margin-top: 1em;
	.pages {
		display: inline-block;
		margin: 0 1em;
		button {
			font-family: 'Gowun Dodum', san-serif;
			border: none;
			border-radius: .2em;
			padding: .2em .8em;
		}
	}
	.material-icons {
		margin: 0 1em;
		border: none;
	}
}
.clickable {
	cursor: pointer;
	&:hover {
		background-color: $color_prime_green;
	}
}
</style>
