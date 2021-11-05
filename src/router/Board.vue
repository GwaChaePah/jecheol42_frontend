<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div :class="{'content': (hasHeader && !fromSearch)}">
				<h3 v-show="postSearch">[ {{ postSearch }} ]</h3>
				<BoardMenu />
			</div>
			<div class="l_row clearfix">
				<div v-show="loading" class="preload-content">
					<h1>검색 중...</h1>
				</div>
				<BoardItem v-if="search || posts" v-for="post in posts"
					:key="post.id" :post="post" />
				<div v-if="(!posts.length && !loading)" class="empty-content">
					<h1>검색된 정보가 없습니다 따흐흑</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BoardMenu from '~/components/BoardMenu';
import BoardItem from '~/components/BoardItem';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'Board',
	components: {
		BoardMenu,
		BoardItem,
	},
	props: ['fromSearch'],
	computed: {
		...mapState('auth', ['currentUser']),
		...mapState('product', ['postSearch']),
		...mapState('post', [
			'posts',
			'loading'
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
			this.$store.dispatch('post/initPosts');
		}
		else {
			setTimeout(()=> {
				if (this.search) {
					this.$store.dispatch('post/initPosts', this.search)
				}
			}, 1);
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
	@media (max-width: 745px) {
		text-align: center;
	}
	.postitem {
	}
	.empty-content,
	.preload-content {
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
