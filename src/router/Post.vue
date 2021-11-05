<template>
	<div class="l_main">
		<div class="l_wrapper content">
			<NavPost />
			<div v-if="!loading">
				<div class="post-content ">
					<PostContent :thePost="thePost"/>
				</div>
				<Comments :postId="thePost.id"/>
			</div>
		</div>
	</div>
</template>

<script>
import Comments from '~/components/Comments';
import PostContent from '~/components/PostContent';
import NavPost from '~/components/NavPost';
import { mapState } from 'vuex';

export default {
	name: 'Post',
	components: {
		Comments,
		PostContent,
		NavPost
	},
	computed: {
		...mapState('post', [
			'thePost',
			'loading'
		])
	},
	created() {
		this.$store.dispatch('post/searchPostWithId', {
			id: this.$route.params.id
		})
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/main.scss';



</style>
