<template>
	<div class="l_main">
		<div class="l_wrapper" :class="{'content': (hasHeader && !fromSearch)}" >
			<h3 v-show="postSearch">[ {{ postSearch }} ]</h3>
			<BoardMenu :fromSearch="fromSearch"/>
		</div>
		<div v-if="!mobileWidth">
			<div class="l_wrapper">
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
					<div class="board-content" v-else>
						<BoardItem  v-if="(search || boardView)" v-for="item in boardView" :key="item.id" :post="item" />
						<div v-if="(!boardView.length && !loading)" class="empty-content">
							<h1>검색된 정보가 없습니다</h1>
						</div>
						<BoardPage v-else />
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div v-if="loading">
				<div class="MWpreload_content" v-for="n in 4" >
					<div class="MWcontent-anchor">
						<div class="MWcontent-img"></div>
						<div class="MWcontent-title">
							<div class="MWtitle__title"></div>
							<div class="MWtitle-info">
								<button class="MWinfo__price">-&nbsp;</button>
							</div>
						</div>
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
			'boardTag',
			'header',
			'region',
		]),
	},
	data() {
		return {
			hasHeader: true,
			search: this.postSearch,
		}
	},
	created() {
		if (!this.header && !this.fromSearch) {
			setTimeout(() => {
				this.$store.dispatch('post/getBoard', {payload: '', allRegion: this.region ? false : true});
			}, 500);
		}
		 else {
			this.$store.dispatch('post/updateHeader', false);
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
	text-align: center;
	.preload_content {
		display: inline-block;
		.content-anchor {
			display: block;
			background-color: white;
			width: 240px;
			height: 320px;
			border-radius: .4em;
			margin: 1px;
			overflow: hidden;
			position: relative;
			.img-info {
				height: 160px;
				background: linear-gradient(221deg, rgba(239, 239, 239, 0.8) 0%, #fff 100%);
			}
			.title-info {
				height: 110px;
				border-bottom: 1px solid #e8e8e8;
			}
			.content-info {
				display: flex;
				justify-content: space-between;
				padding: .4em;
				font-size: 1.1em;
				background-color: #f8f8f8;
				.info__category {
					display: inline-block;
					padding: .4em;
					width: 40px;
				}
				.info__price {
					color: gray;
					display: inline-block;
					border: none;
					border-radius: .2em;
					padding: .5em .8em;
					font-size: .9em;
					width: 50px;
					font-weight: bold;
					font-family: 'Gowun Dodum', sans-serif;
					&::after {
						content: '원';
					}
				}
			}
		}
	}
}
.MWpreload_content {
	display: block;
	.MWcontent-anchor {
		display: block;
		margin-bottom: .5em;
		background-color: white;
		width: 100%;
		height: 140px;
		// border-bottom: 1px solid #eee;
		// border-top: 1px solid #eee;
		position: relative;
		.MWcontent-img {
			position: absolute;
			left: 8px;
			top: 50%;
			transform: translateY(-50%);
			width: 40%;
			height: 90%;
			border-radius: .3em;
			background: linear-gradient(221deg, rgba(239, 239, 239, 0.8) 0%, #fff 100%);
		}
		.MWcontent-title {
			padding: .5em;
			position: absolute;
			width: 52%;
			left: 45%;
			top: 0;
			bottom: 0;
			text-align: left;
			.MWtitle__title {
				color: gray;
				line-height: 1.4;
				font-size: 1em;
				height: 64%;
				padding-bottom: .2em;
				margin-bottom: .2em;
			}
			.MWtitle-info {
				font-size: .9em;
				line-height: 1.7;
				.MWinfo__price {
					display: inline-block;
					padding: .3em .8em;
					border: none;
					border-radius: .2em;
					font-family: 'Gowun Dodum', sans-serif;
					font-size: .9em;
					font-weight: bold;
					color: gray;
					&::after {
						content: '원';
					}
				}
			}
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
