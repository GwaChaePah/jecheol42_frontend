<template>
	<div class="l_row clearfix">
		<PostItem
			v-for="post in posts"
			:key="post.id"
			:post="post"/>
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
	computed: {
    ...mapState('post', ['posts']),
		// ...mapState('product', ['theSearch'])
  },
	created() {
	// 	console.log(theSearch);
		this.$store.dispatch('post/initPosts', {
	// 		payload: 'theSearch'
		});
	}
}
</script>

<style lang="scss" scoped>
@import '~/scss/commons.scss';
@import '~/scss/main.scss';

</style>
