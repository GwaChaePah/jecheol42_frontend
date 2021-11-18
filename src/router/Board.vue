<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div :class="{'content': (hasHeader && !fromSearch)}" >
				<h3 v-show="postSearch">[ {{ postSearch }} ]</h3>
				<BoardMenu />
			</div>
			<div v-if="!mobileWidth">
				<div class="l_row clearfix">
					<div v-if="loading">
						<div class="preload_content" v-for="n in 4" >
							<div class="content-anchor">
								<div class="img-info"></div>
								<div class="title-info"></div>
								<div class="content-info">
									<button class="info__price">-&nbsp;</button>
								</div>
							</div>
						</div>
					</div>
					<div v-else>
						<BoardItem  v-if="(search || boardView)" v-for="item in boardView" :key="item.id" :post="item" />
						<div v-if="(!boardView.length && !loading)" class="empty-content">
							<h1>검색된 정보가 없습니다</h1>
						</div>
						<BoardPage v-else />
					</div>
				</div>
			</div>
		</div>
		<div v-if="mobileWidth">
			<div v-if="loading">
				<div class="MWpreload_content" v-for="n in 4" >
					<div class="MWcontent-anchor">
					</div>
				</div>
			</div>
			<div else>
				<BoardMobile  v-if="(search || boardView)" v-for="item in boardView" :key="item.id" :post="item" />
				<div v-if="(!boardView.length && !loading)" class="empty-content">
					<h1>검색된 정보가 없습니다</h1>
				</div>
				<BoardPage v-else />
			</div>
		</div>
	</div>
</template>

<script>
import BoardMenu from '~/components/BoardMenu';
import BoardItem from '~/components/BoardItem';
import BoardMobile from '~/components/BoardMobile';
import BoardPage from '~/components/BoardPage';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'Board',
	components: {
		BoardMenu,
		BoardItem,
		BoardMobile,
		BoardPage
	},
	props: ['fromSearch'],
	computed: {
		...mapState('product', ['postSearch']),
		...mapState('post', [
			'boardView',
			'mobileWidth',
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
		console.log('board.vue created', this.fromSearch)
		if (this.fromSearch) {
			setTimeout(() => {
				this.$store.dispatch('post/getBoard', {payload: this.postSearch});
			}, 500);
		} else {
			this.$store.dispatch('post/getBoard', {payload: ''});
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
		@media (max-width: 500px) {
			display: block;
		}
		.content-anchor {
			display: block;
			background-color: white;
			width: 240px;
			height: 320px;
			border: 1px solid #ddd;
			border-radius: .1em;
			overflow: hidden;
			position: relative;
			@media (max-width: 500px) {
				border: 1px solid #ddd;
				width: 100%;
				height: 170px;
			}
			.img-info {
				height: 160px;
				border-bottom: 1px dotted #ddd;
				background: linear-gradient(221deg, rgba(239, 239, 239, 0.8) 0%, #fff 100%);
				@media (max-width: 500px) {
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
				@media (max-width: 500px) {
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
					font-family: 'Gowun Dodum', sans-serif;
					&::after {
						content: '원';
					}
					@media (max-width: 500px) {
						position: absolute;
						right: 8px;
						bottom: 7px;
						padding: .3em .8em;
						font-size: .7em;
					}
				}
			}
		}
	}
}
.l_row.clearfix {
	// text-align: center;
	.MWpreload_content {
		display: block;
		.MWcontent-anchor {
			border: 1px solid #ddd;
			background-color: white;
			border-radius: .1em;
			overflow: hidden;
			position: relative;
			// width: 100%;
			height: 170px;
		}
	}
}
.empty-content{
	max-width: 1000px;
	width: 100%;
	height: 320px;
	margin: 10px auto;
	padding: 60px;
	text-align: center;
	h1 {
		margin-top: 2em;
		font-size: 1.6em;
		@media (max-width: 500px) {
			white-space: nowrap;
			margin-top: 1em;
			font-size: 1.1em;
		}
	}
}
</style>
