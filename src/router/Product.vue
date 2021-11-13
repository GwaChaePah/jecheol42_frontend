<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
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
								<strong>{{ item.name }}</strong>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Main',
	computed: {
		...mapState('product', [
			'product',
			'theSearch',
			'loading'
		]),
	},
	created() {
		this.$store.dispatch('product/initProduct');
	},
	methods: {
		apply(value) {
			this.$store.dispatch('product/searchProduct', value);
			this.$router.push('/search');
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
					left: 20%;
					right: 0;
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
				}
			}
			@media (max-width: 550px) {
				display: block;
				&:nth-child(even) {
					strong {
						left: 65%;
						right: 0;
					}
				}
				&:nth-child(odd) {
					strong {
						left: 15%;
						right: 0;
					}
				}
			}
		}
	}
}

</style>
