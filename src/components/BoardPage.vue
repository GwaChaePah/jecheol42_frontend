<template>
	<div class="content-wrapper">
		<div class="button-wrapper">
			<button class="material-icons" :class="{unclickable: page == 1, clickable: page !== 1 }" @click.defualt="goToPage(1)">first_page</button>
			<button class="material-icons" :class="{unclickable: page == 1, clickable: page !== 1 }" @click.defualt="goToPage(page - 1)">chevron_left</button>
			<div v-for="n in totalPage" :key="`page${n}`" class="pages">
				<button :class="{unclickable: page == n, clickable: page !== n }" @click.default="goToPage(n)">{{ n }}</button>
			</div>
			<button class="material-icons" :class="{unclickable: page == totalPage, clickable: page !== totalPage }" @click.defualt="goToPage(page + 1)">chevron_right</button>
			<button class="material-icons" :class="{unclickable: page == totalPage, clickable: page !== totalPage }" @click.defualt="goToPage(totalPage)">last_page</button>
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
		}
	},
	computed: {
		...mapState('product', ['postSearch']),
		...mapState('post', [
			'page',
			'totalPage',
			'mobileNav'
		])
	},
	methods: {
		async goToPage(e) {
			const search = this.postSearch ? this.postSearch : '';
			if (e >= 1 && e !== this.page && e <= this.totalPage) {
				this.$store.dispatch('post/getBoard', {
					payload: search,
					page: e
				});
				document.documentElement.scrollTop = 0;
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
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2em;
	.button-wrapper {
		border-radius: .1em;
		display: flex;
		align-items: center;
		padding: 0 .2em;
		.pages {
			font-size: 1em;
			button {
				color: dimgray;
				font-family: 'Gowun Dodum', san-serif;
				border: none;
				padding: .2em .8em;
				background-color: transparent;
			}
			.clickable {
				cursor: pointer;
				&:hover {
					background-color: gainsboro;
				}
			}
			.unclickable {
				background-color: darken($color_prime_green, 10%);
				border-radius: .1em;
				color: $color_prime_white;
				font-weight: bolder;
			}
		}
		.clickable {
			cursor: pointer;
		}
		.material-icons {
			color: dimgray;
			background-color: transparent;
			border: none;
		}
		.material-icons:active,
		.pages > button:active {
			transform: translateY(2px);
		}
		.unclickable {
			color: gainsboro;
		}
	}
}
</style>
