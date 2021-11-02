<template>
	<div class="l_row clearfix">
		<div v-show="loading" class="preload-content">
			<h1>검색 중...</h1>
		</div>
		<PostItem
			v-if="search || posts"
			class="postitem"
			v-for="post in posts"
			:key="post.id"
			:post="post" />
		<div v-if="(!posts.length && !loading)" class="empty-content">
			<h1>검색된 정보가 없습니다 따흐흑</h1>
		</div>
	</div>
</template>

<script>
import PostItem from '~/components/PostItem';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'PostList',
	components: {
		PostItem
	},
	props: ['search'],
	computed: {
    ...mapState('post', [
			'posts',
			'loading'
		]),
  },
	created() {
		setTimeout(()=> {
			if (this.search) {
				this.$store.dispatch('post/initPosts', this.search)
			}
		}, 500);
	}
}
</script>

<style lang="scss" scoped>
@import '~/scss/commons.scss';
@import '~/scss/main.scss';

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
