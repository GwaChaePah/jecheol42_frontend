<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<!-- <h1 class="content-month">{{ getMonth() }}월의 제철은?</h1> -->
				<div v-if="loading">
					<ul class="content-list">
						<li	v-for="n in 4">
							<div class="content-anchor">
								<div class="content-img-wrapper"></div>
							</div>
						</li>
					</ul>
				</div>
				<div v-else>
					<ul class="content-list">
						<li	v-for="item in product"	:key="item">
							<a class="content-anchor" @click="apply(item.name)">
								<img class="content-img" :src="`${item.image}`" :name="`${item.name}`"/>
								<strong :class="{'content-name': !mobileWidth, 'MWcontent-name': mobileWidth}">{{ item.name }}</strong>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'Main',
	computed: {
		...mapState('product', [
			'product',
			'theSearch',
			'loading'
		]),
		...mapState('post', ['mobileWidth'])
	},
	created() {
		this.initProduct();
		this.updatePage(1);
		this.updateTag(3);
		this.updateMobileNav(false);
	},
	methods: {
		...mapActions('post', [
			'updatePage',
			'updateTag',
			'updateMobileNav',
			'getBoard'
		]),
		...mapActions('product', [
			'initProduct',
			'searchProduct'
		]),
		apply(value) {
			this.searchProduct(value);
			this.getBoard({payload: value, page: 1});
			this.$router.push('/search');
		},
		getMonth() {
			const current = new Date().getMonth() + 1;
			return current;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/main.scss';
@import '../scss/typography.scss';

.content {
	display: flex;
	justify-content: center;
	// flex-direction: column;
	.content-list {
		margin: 0 auto 2em;
		@media ( max-width: 500px ) {
			margin: 0 auto;
		}
		li {
			display: table-cell;
			.content-anchor {
				height: 65vh;
				display: block;
				margin: 1em .3em;
				position: relative;
				margin-bottom: 10px;
				@media ( max-width: 500px ) {
					width: 360px;
					height: 135px;
					margin: 1px;
				}
				.content-img-wrapper {
					width: 250px;
					height: 100%;
					// background-color: #f8f8f8;
					background: linear-gradient(221deg, rgba(239, 239, 239, 0.8) 0%, #fff 100%);
					@media (max-width: 550px) {
						width: 500px;
					}
				}
				.content-img {
					width: 250px;
					height: 100%;
					border-radius: .2em;
					object-fit: cover;
					@media (max-width: 550px) {
						width: 500px;
					}
				}
				strong {
					color: white;
					font-family: 'Gowun Dodum', sans-serif;
					font-size: 2.5em;
					position: absolute;
					z-index: 10;
					bottom: 20%;
					transition: translateY(-20%);
					$color: darken($color_prime_green, 30%);
					text-shadow:
						-1px -1px 0 $color,
						 0   -1px 0 $color,
						 1px -1px 0 $color,
						 1px  0   0 $color,
						 1px  1px 0 $color,
						 0    1px 0 $color,
						-1px  1px 0 $color,
						-1px  0   0 $color;
					@media (max-width: 500px) {
						font-size: 1.8em;
					}
				}
			}
			.content-name {
				left: 15%;
			}
			@media (max-width: 550px) {
				display: block;
				&:nth-child(odd) {
					.MWcontent-name {
						left: 15%;
					}
				}
				&:nth-child(even) {
					.MWcontent-name {
						right: 15%;
					}
				}
			}
		}
	}
}

</style>
