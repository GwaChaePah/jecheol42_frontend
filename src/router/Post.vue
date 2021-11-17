<template>
	<div class="l_main">
		<div class="l_wrapper content">
			<div v-if="loading">
				<div class="preload_nav" v-if="!mobileWidth">
					<button></button>
					<button></button>
				</div>
				<div class="preload_mobileNav" v-else >
					<div class="button-wrapper"></div>
				</div>
				<div class="preload_content">
					<div class="content-title">
						<span class="material-icons-outlined">label</span>
						<div class="title__category">
							<span>&nbsp;-&nbsp;</span>
						</div>
						<div class="title__title">
							<h1>-</h1>
						</div>
						<div class="title__info">
							<p id="writer"><span class="material-icons">account_circle</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<PostNav v-if="!mobileWidth"/>
				<PostContent :post="post" />
				<Comments :postId="post.id"/>
			</div>
		</div>
	</div>
</template>

<script>
import Comments from '~/components/Comments';
import PostContent from '~/components/PostContent';
import PostNav from '~/components/PostNav';
import { mapState } from 'vuex';

export default {
	name: 'Post',
	components: {
		Comments,
		PostContent,
		PostNav
	},
	computed: {
		...mapState('post', [
			'post',
			'loading',
			'mobileWidth'
		])
	},
	created() {
		this.$store.dispatch('post/searchPostWithId', this.$route.params.id);
		this.$store.dispatch('post/updateMobileNav', null);
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/main.scss';

.l_wrapper {
	@media (max-width: 500px) {
		padding: 0;
	}
}
.preload_nav {
	margin-top: 140px;
	position: absolute;
	z-index: 30;
	button {
		box-shadow: 0 0 5px 0 $color_shadow_03;
		display: block;
		width: 70px;
		border: none;
		border-radius: .2em;
		width: 70px;
		height: 60px;
		margin: .5em 0;
		padding: .4em 0;
		background-color: white;
	}
}
.preload_mobileNav {
	position: fixed;
	width: 100%;
	top: 120px;
	background-color: white;
	z-index: 99;
	height: 50px;
	box-shadow: 0 0 5px 0 $color_shadow_03;
	clip-path: inset(0 -5px -5px -5px);
	.button-wrapper {
		width: 90%;
		margin: 0 auto;
		border-top: 1px solid #ccc;
	}
}
.preload_content {
	color: #ddd;
	position: relative;
	padding: .8em;
	box-shadow: 0 0 5px 0 $color_shadow_03;
	margin: 0 0.3em 0 3.5em;
	background-color: white;
	border-radius: .2em;
	overflow: hidden;
	height: 500px;
	@media (max-width: 500px) {
		box-shadow: none;
		border-bottom: 1px solid #ccc;
		border-radius: 0;
		clip-path: none;
		margin: 10em .3em 0;
		padding: .3em .8em .8em;
	}
	.content-title {
		border-bottom: 1px solid #ccc;
		padding-bottom: .5em;
		background-color: white;
		.material-icons-outlined {
			transform: translate(9px, 5px);
			background: none;
			border: none;
			@media (max-width: 500px) {
				transform: translate(3px, 5px);
				font-size: 1em;
				margin-right: 2px;
			}
		}
		.title__category {
			margin: .3em;
			padding: .2em;
			font-size: 1.3em;
			display: inline-block;
			span {
				padding: 0 .3em;
			}
			@media (max-width: 770px) {
				font-size: .8em;
			}
			@media (max-width: 500px) {
				margin: .3em 0;
				font-size: .5em;
			}
		}
		.title__title {
			margin-top: .4em;
			h1 {
				font-size: 2em;
				padding-left: .3em;
			}
			@media (max-width: 770px) {
				h1 {
					font-size: 1.8em;
				}
			}
			@media (max-width: 500px) {
				margin: .2em 0;
				h1 {
					font-size: 1em;
				}
			}
		}
		.title__info {
			display: block;
			padding: .5em 0.3em 0;
			p {
				display: inline-block;
				margin-left: .5em;
				.material-icons,
				.material-icons-outlined {
					font-size: 1em;
					margin: 0 2px;
					transform: translateY(2px);
				}
			}
			@media (max-width: 500px) {
				padding: 0;
				font-size: .7em;
				p {
					margin-left: 0;
				}
			}
		}
	}
}


</style>
