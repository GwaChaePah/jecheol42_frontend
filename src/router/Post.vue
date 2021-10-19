<template>
	<div class="l_main">
		<div class="l_wrapper">
			<NavPost :user="user"/>
			<div class="content l_col">
				<PostContent :thePost="thePost"/>
				<Comments :postId="thePost.id"/>
			</div>
		</div>
	</div>
</template>

<script>
import Comments from '~/components/Comments';
import PostContent from '~/components/PostContent';
import NavPost from '~/components/NavPost';
import { mapState } from 'vuex'

export default {
	name: 'Post',
	components: {
		Comments,
		PostContent,
		NavPost
	},
	computed: {
		thePost() {
			return this.$store.state.post.thePost
		},
		...mapState ('auth', [
			'user'
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

.content {
	box-shadow: 0 0 20px 0 $color_shadow_03;
	margin: 3em 6em;
	background-color: $color_prime_white;
	border-radius: .5em;
	overflow: hidden;
}

</style>
