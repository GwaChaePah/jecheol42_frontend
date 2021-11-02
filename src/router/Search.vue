<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<div class="searchResult" :class="{ 'scrolled-padding': scroll }">
					<div v-if="theSearch.price != ''">
						<p class="search-content"><span>요즘 마트에서는</span>&nbsp;&nbsp;
							<span><strong class="search-name"> {{ theSearch.name }}</strong>(을)를</span><br />
							<span><strong class="search-price">{{ theSearch.price }}</strong><strong class="search-unit">{{ theSearch.unit }}</strong> 에 </span>
							<span>살 수 있어요</span><br /></p>
						<div class="divider"></div>
						<div class="search-seasons">
							<br /><br />
							<p class="search-season"
								v-for="season in theSearch.seasons"
								:key="season">
								&nbsp;{{ season }}
							</p> 이 제철이에요! <br />
							<p class="search-inSeason" v-if="theSearch.inSeason">
								<br />앗! 지금이 제철이네요. 맛있게 냠냠냠(제철이미지)
								<img src="https://st2.depositphotos.com/4082775/7168/v/950/depositphotos_71686019-stock-illustration-a-set-of-cute-fruits.jpg" />
							</p>
						</div>
						<!-- 가격 가져온 날짜 찍어주기 : 몇월며칠 기준 -->
					</div>
					<div v-else>
						<h1> <span>가격 정보가</span> 제공되지 않았습니다.</h1>
						<h1> 다른 과채를 검색해주세요. </h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="board">
		<div class="title-wrapper">
			<h1>게시판</h1>
		</div>
		<h3 v-show="postSearch">[ {{ postSearch }} ]</h3>
		<Board :theSearch="postSearch" :fromSearch="true"/>
	</div>
</template>

<script>
import Board from './Board';
import { mapState } from 'vuex';

export default {
	name: 'Search',
	props: ['scroll'],
	components: {
		Board,
	},
	computed: {
		...mapState('product', [
			'theSearch',
			'postSearch'
		])
	},
	created() {
		setTimeout(() => {
			this.$store.dispatch('post/initPosts', this.postSearch);
		}, 500);
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/main.scss';
@import '../scss/typography.scss';

.scrolled-padding {
	padding-top: 500px;
}
.content {
	.searchResult {
		background-color: $color_prime_white;
		text-align: center;
		display: flex;
		justify-content: center;
		padding: 5em 0;
		width: 100%;
		border-radius: 1.5em;
		h1 {
			font-size: 2em;
			line-height: 1.8;
		}
		@media (max-width: 750px) {
			span {
				display: block;
			}
		}
		.search-content {
			padding-right: .5em;
			font-size: 2em;
			line-height: 1.8;
			display: inline-block;
			.search-name {
				font-size: 1.5em;
				letter-spacing: .4em;
			}
			.search-price {
				font-size: 1.5em;
				&:after {
					content: '원/';
					font-size: .5em;
				}
			}
			.search-unit {
				font-size: .8em;
			}
		}
		.divider {
			margin: 0 auto;
			width: 70%;
			border: 1px solid $color_shadow_03;
		}
		.search-seasons {
			text-align: center;
			line-height: 1.5;
			.search-season {
				font-size: 1.8em;
				display: inline-block;
				&:after {
					content: '월 '
				}
			}
			.search-inSeason {
				font-size: 1.2em;
				img {
					margin-top: .5em;
					width: 80%;
				}
			}
		}
	}
}
.board {
	margin: 4em 0 2em;
	.title-wrapper {
		margin: 0 5em;
		text-align: center;
		position: relative;
		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			width: 35%;
			border-top: 1px solid $color_prime_green;
			background: black;
			transform: translateY(-50%);
		}
		&:after {
			left: auto;
			right: 0;
		}
		h1 {
			font-size: 1.5em;
			line-height: 1.6;
		}
	}
	.border {
		margin: 0 auto;
		width: 70%;
		border: 1px solid #ddd;
	}
	h3 {
		text-align: center;
		font-size: 1em;
		line-height: 2;
	}
}
</style>
