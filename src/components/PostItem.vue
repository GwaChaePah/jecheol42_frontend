<template>
	<div class="content-wrapper">
		<RouterLink class="content-anchor"
			:to="{ name: 'Post', params: {id: `${post.id}`}}">
			<!-- <div class="content-address">
				<p>{{ post.region }}</p>
			</div> -->
			<img class="content-img"
				:src="post.image"
				:alt="`${post.user}_${post.title}`"
				onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';"/>
			<div class="content-title">
				<button class="title__status"></button>
				<h1 class="title__title ellipsis">{{ post.title }}</h1>
				<h2 class="title__category">{{ post.option }}</h2>
				<span class="title__writer">{{ post.user }}</span>
				<span class="title__time">{{ post.created_at }}</span>
			</div>
			<div class="content-price">
				<h2>{{ post.price }}</h2>
			</div>
		</RouterLink>
	</div>
</template>

<script>
export default {
	name: 'PostItem',
	props: {
		post: {
			type: Object,
			default: () => ({})
		}
	}
}
</script>


<style lang="scss">
@import '~/scss/commons.scss';
@import '../scss/typography.scss';
@import '~/scss/main.scss';

.content-wrapper {
	float: left;
	.content-anchor {
		display: block;
		background-color: white;
		width: 240px;
		height: 320px;
		border: 1px solid #F5F5F5;
		border-radius: .1em;
		overflow: hidden;
		position: relative;
		text-align: center;
		&:hover {
			&::after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				border: 4px solid lighten($color_prime_orange, 10%);
			}
		}
		.content-address {
			color: rgb(31, 31, 31);
			text-align: center;
			padding: .3em 0;
			letter-spacing: .2em;
		}
		.content-img {
			width: 100%;
			height: 160px;
		}
		.content-title {
			padding: .8em 1em .7em;
			border-bottom: 1px solid #E8E8E8;
			.title__status {
				float: left;
				margin: .4em .5em 0 -.2em;
				width: 12px;
				height: 12px;
				border-radius: 50%;
				background-color: $color_prime_green;
				border-style: none;
			}
			.title__status-done {
				background-color: #ccc;
			}
			.title__title {
				line-height: 1.4;
				font-weight: bold;
				font-size: 1.4em;
				padding-bottom: .4em;
			}
			.title__category {
				font-size: 1.1em;
				display: block;
				font-weight: bold;
				color: $color_prime_orange;
			}
			.title__writer {
				margin-right: .3em;
			}
			.title__time {
			}
		}
	}
	.content-price {
		position: absolute;
		bottom: 3px;
		left: 0;
		right: 0;
		text-align: center;
		padding: .4em;
		color: #75871e;
		font-weight: bold;
		font-size: 1.1em;
		h2::after {
			content: '원';
		}
	}
}
</style>
