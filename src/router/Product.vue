<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<ul class="content-list">
					<li
						v-for="item in product"
						:key="item">
						<a class="content-anchor" @click="apply($event)">
							<img class="content-img" :src="`${item.image}`" :name="`${item.name}`"/>
							<strong>{{ item.name }}</strong>
						</a>
					</li>
				</ul>
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
			'theSearch'
		])
	},
	created() {
		this.$store.dispatch('product/initProduct');
	},
	methods: {
		apply(e) {
			let value = e.target.name;
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
		li {
			display: table-cell;
			@media (max-width: 550px) {
				display: block;
			}
			.content-anchor {
				height: 65vh;
				display: block;
				margin: 1em .3em;
				position: relative;
				margin-bottom: 10px;
				@media (max-width: 750px) {
					width: 160px;
					margin: 0 .1em;
				}
				@media (max-width: 550px) {
					width: 400px;
					height: 200px;
					margin: .5em;
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
					font-size: 2.5em;
					position: absolute;
					left: 20%;
					right: 0;
					z-index: 10;
					bottom: 20%;
					transition: translateY(-20%);
				}
			}
		}
	}
}

</style>
