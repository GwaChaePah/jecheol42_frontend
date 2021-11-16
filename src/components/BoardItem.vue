<template>
	<div class="content-wrapper">
		<RouterLink :to="{ name: 'Post', params: {id: `${post.id}`}}">
			<div class="content-anchor">
			<!-- <div class="content-address">
				<p>{{ post.region }}</p>
			</div> -->
				<div class="img-wrapper">
					<img class="content-img" :src="post.image1" :alt="`${post.user}_${post.title}`"
					onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';"/>
				</div>
				<div class="content-title">
					<button class="icon material-icons">arrow_right</button>
					<div class="title__title ellipsis">{{ post.title }}</div>
					<div class="title-info">
						<div class="title__writer">
							<span class="material-icons">account_circle</span>
							{{ post.username }}
						</div>
						<div class="title__time">
							<span class="material-icons">schedule</span>
							{{ post.created_at }}
						</div>
					</div>
					<div class="title-info">
						<div class="title__count">
							<span class="material-icons">visibility</span>
							{{ post.view_count }}
						</div>
						<div class="title__comments">
							<span class="material-icons">chat_bubble_outline</span>
							{{ post.comment_cnt }}
						</div>
					</div>
				</div>
				<div class="content-info">
					<div class="info__category" :class="{'cat_sobun':  post.tag === 0, 'cat_nanum':  post.tag === 1}">
						{{ post.tag === 0 ? '소분' : post.tag === 1 ? '나눔' : '완료' }}
					</div>
					<button class="info__price" :class="{'price_sobun':  post.tag === 0, 'price_nanum':  post.tag === 1}">
						{{ post.price }}
					</button>
				</div>
			</div>
		</RouterLink>
	</div>
</template>

<script>
export default {
	name: 'BoardItem',
	props: {
		post: {
			type: Object,
			default: () => ({})
		}
	},
}
</script>


<style lang="scss">
@import '~/scss/commons.scss';
@import '../scss/typography.scss';
@import '~/scss/main.scss';

.content-wrapper {
	display: inline-block;
	.content-anchor {
		display: block;
		background-color: white;
		width: 240px;
		height: 320px;
		border: 1px solid #ddd;
		border-radius: .1em;
		overflow: hidden;
		position: relative;
		@media (max-width: 745px) {
			width: 280px;
			height: 370px;
		}
		@media (max-width: 400px) {
			width: 320px;
			height: 140px;
		}
		.content-address {
			color: rgb(31, 31, 31);
			text-align: center;
			padding: .3em 0;
			letter-spacing: .2em;
		}
		.img-wrapper {
			height: 160px;
			.content-img {
				width: 100%;
				height: 160px;
				@media (max-width: 745px) {
					height: 190px;
				}
				@media (max-width: 400px) {
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 50%;
					height: 100%;
				}
			}
		}
		.content-title {
			padding: .8em .5em .5em;
			border-bottom: 1px solid #E8E8E8;
			@media (max-width: 400px) {
				position: absolute;
				width: 52%;
				left: 50%;
				top: 0;
				bottom: 0;
				text-align: left;
			}
			.icon.material-icons {
				float: left;
				margin: 2px 0 2px -7px;
				background: none;
				border: none;
			}
			.title__status-done {
				background-color: #ccc;
			}
			.title__title {
				text-align: left;
				line-height: 1.4;
				font-weight: bold;
				font-size: 1.4em;
				padding-bottom: .4em;
				@media (max-width: 400px) {
					padding-bottom: .2em;
				}
			}
			.title-info {
				display: flex;
				justify-content: space-between;
				@media ( max-width: 400px ) {
					display: block;
					font-size: .9em;
					line-height: 1.7;
				}
				.material-icons {
					font-size: 1em;
					transform: translateY(3px);
				}
				.title__writer {
					color: #383838;
				}
				.title__time {
					color: rgb(114, 115, 114);
				}
				.title__count {
					padding-top: .2em;
					color: lighten($color_prime_orange, 10%);
					@media (max-width: 400px) {
						display: inline-block;
						margin-right: .5em;
						font-size: .8em;
					}
				}
				.title__comments {
					color: gray;
					@media (max-width: 400px) {
						display: inline-block;
						font-size: .8em;
					}
				}
			}
		}
		.content-info {
			display: flex;
			justify-content: space-between;
			padding: .4em;
			font-size: 1.1em;
			.info__category {
				display: inline-block;
				font-weight: bold;
				font-family: 'Gowun Dodum', sans-serif;
				padding: .4em;
				// color: $color_prime_orange;
				@media (max-width: 400px) {
					display: none;
				}
			}
			.cat_sobun {
				color: darken($color_prime_green, 10%);
			}
			.cat_nanum {
				color: darken($color_prime_yellow, 10%);
			}
			.info__price {
				cursor: pointer;
				display: inline-block;
				border: none;
				border-radius: .2em;
				padding: .5em .8em;
				font-size: .9em;
				font-weight: bold;
				font-family: 'Gowun Dodum', sans-serif;
				&::after {
					content: '원';
				}
				&:hover {
					filter: brightness(.90);
				}
				@media (max-width: 400px) {
					position: absolute;
					right: 8px;
					bottom: 7px;
					padding: .3em .8em;
				}
			}
			.price_sobun {
				background-color: $color_prime_green;
			}
			.price_nanum {
				background-color: $color_prime_yellow;
			}
		}
	}
}
</style>
