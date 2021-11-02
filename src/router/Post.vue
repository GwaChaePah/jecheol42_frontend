<template>
	<div class="l_main">
		<div class="l_wrapper content">
			<NavPost />
			<div v-if="!loading">
				<div class="post-content l_col">
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

.post-content {
	box-shadow: 0 0 5px 0 $color_shadow_03;
	margin: .2em 5.5em;
	background-color: $color_prime_white;
	border-radius: .5em;
	overflow: hidden;
	position: relative;
	@media (max-width: 770px) {
		margin: .2em 2em .2em 5em;
	}
	@media (max-width: 580px) {
		margin: .2em 0 .2em;
	}
}

</style>
