<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div :class="{'content': (hasHeader && !fromSearch)}" >
				<h3 v-show="postSearch">[ {{ postSearch }} ]</h3>
				<BoardMenu />
			</div>
			<div class="l_row clearfix">
				<div v-if="loading">
					<div class="preload_content" v-for="n in 4" >
						<div class="content-anchor">
							<div class="img-info"></div>
							<div class="title-info"></div>
							<div class="content-info">
								<div class="info__category"></div>
								<button class="info__price">-&nbsp;</button>
							</div>
						</div>
					</div>
				</div>
				<div v-else>
					<BoardItem  v-if="search || boardView" v-for="item in boardView" :key="item.id" :post="item" />
					<div v-if="(!boardView.length && !loading)" class="empty-content">
						<h1>검색된 정보가 없습니다 따흐흑</h1>
					</div>
					<BoardPage v-else-if="(!search && !fromSearch && boardTag === 3)"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BoardMenu from '~/components/BoardMenu';
import BoardItem from '~/components/BoardItem';
import BoardPage from '~/components/BoardPage';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'Board',
	components: {
		BoardMenu,
		BoardItem,
		BoardPage
	},
	props: ['fromSearch'],
	computed: {
		...mapState('product', ['postSearch']),
		...mapState('post', [
			'boardView',
			'loading',
			'boardTag'
		]),
	},
	data() {
		return {
			hasHeader: true,
			search: this.postSearch,
		}
	},
	created() {
		if (!this.fromSearch) {
<<<<<<< HEAD
			this.initBoard();
=======
			this.$store.dispatch('post/initBoard', {payload: null});
		} else {
			setTimeout(() => {
				this.$store.dispatch('post/initBoard', {payload: this.postSearch});
			}, 500);
>>>>>>> ebf88c9e66e24badd65ba16f26c58ec582b8dfd2
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';


h3 {
	text-align: center;
	font-size: 1em;
	line-height: 2;
}

.fromSearch {
	margin-top: 15em;
}
.l_row.clearfix {
	margin-bottom: 2em;
	@media (max-width: 745px) {
		text-align: center;
	}
	.preload_content {
		display: inline-block;
		.content-anchor {
			display: block;
			background-color: white;
			width: 240px;
			height: 320px;
			border: 1px solid #ddd;
			border-radius: .1em;
			overflow: hidden;
			position: relative;
			@media (max-width: 745px) {
				width: 280px;
				height: 370px;
			}
			@media (max-width: 400px) {
				width: 320px;
				height: 140px;
			}
			.img-info {
				height: 160px;
				border-bottom: 1px dotted #ddd;
				background: linear-gradient(221deg, rgba(239, 239, 239, 0.8) 0%, #fff 100%);
				@media (max-width: 745px) {
					height: 190px;
				}
				@media (max-width: 400px) {
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 50%;
					height: 100%;
					border-bottom: none;
					border-right: 1px dotted #ddd;
				}
			}
			.title-info {
				height: 110px;
				border-bottom: 1px solid #e8e8e8;
				@media (max-width: 400px) {
					position: absolute;
					width: 52%;
					left: 50%;
					top: 0;
					bottom: 0;
					text-align: left;
					border-bottom: none;
				}
			}
			.content-info {
				display: flex;
				justify-content: space-between;
				padding: .4em;
				font-size: 1.1em;
				.info__price {
					display: inline-block;
					border: none;
					border-radius: .2em;
					padding: .5em .8em;
					width: 50px;
					font-size: .9em;
					font-weight: bold;
					&::after {
						content: '원';
					}
					@media (max-width: 400px) {
						position: absolute;
						right: 8px;
						bottom: 7px;
						padding: .3em .8em;
					}
				}
			}
		}
	}
	.empty-content{
		max-width: 1000px;
		width: 100%;
		margin: 10px auto;
		padding: 60px;
		text-align: center;
		h1 {
			font-size: 1.6em;
		}
	}
}
</style>
