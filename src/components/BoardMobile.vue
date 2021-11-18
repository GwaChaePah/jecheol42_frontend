<template>
	<div class="MWcontent-wrapper">
		<RouterLink :to="{ name: 'Post', params: {id: `${post.id}`}}">
			<div class="MWcontent-anchor">
			<!-- <div class="MWcontent-address">
				<p>{{ post.region }}</p>
			</div> -->
				<div class="MWimg-wrapper">
					<img class="MWcontent-img" :src="post.image1" :alt="`${post.user}_${post.title}`"
					onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';"/>
				</div>
				<div class="MWcontent-title">
					<button class="MWicon material-icons">arrow_right</button>
					<div class="MWtitle__title ellipsis line-clamp">{{ post.title }}</div>
					<div class="MWtitle-info">
						<div class="MWtitle__writer ellipsis">
							<span class="MW material-icons">account_circle</span>
							<span class="MWwriter__username">{{ post.username }}</span>
						</div>
						<div class="MWtitle__time">
							<span class="MW material-icons">schedule</span>
							<span class="MWtime__time">{{ calcDate() }}</span>
						</div>
						<div class="MWcount_comment-wrapper">
							<div class="MWtitle__count">
								<span class="MW material-icons">visibility</span>
								{{ post.view_count }}
							</div>
							<div class="MWtitle__comments">
								<span class="MW material-icons">chat_bubble_outline</span>
								{{ post.comment_cnt }}
							</div>
						</div>
					</div>
				</div>
				<div class="MWcontent-info">
					<button class="MWinfo__price" :class="{'price_sobun':  post.tag === 0, 'price_nanum':  post.tag === 1}">
						{{ post.price }}
					</button>
				</div>
			</div>
		</RouterLink>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'BoardItem',
	props: {
		post: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		...mapState('post', ['mobileWidth'])
	},
	methods: {
		calcDate() {
			let ret;
			const timestamp = this.post.created_at
			const postDate = timestamp.slice(8, 10);
			const postHour = timestamp.slice(12, 14);
			const postMin = timestamp.slice(15, 17);
			const current = new Date();
			const month = (current.getMonth() + 1 < 10) ? '0' + current.getMonth() + 1
									: current.getMonth() + 1;
			const date = (current.getDate() < 10) ? '0' + current.getDate()
									: current.getDate();
			if (`${current.getFullYear()}.${month}.${date}` === timestamp.slice(0,10)) {
				const hour = (current.getHours() < 10) ? '0' + current.getHours()
										: current.getHours();
				const minute = (current.getMinutes() < 10) ? '0' + current.getMinutes()
										: current.getMinutes();
 				ret = (`${hour}${minute}` === `${postHour}${postMin}`) ? '방금 전'
							: (hour == postHour) ? `${minute - postMin}분 전`
							: `${hour - postHour}시간 전`;
			} else {
				ret = (date - postDate < 3) ? `${date - postDate}일 전` : timestamp;
			}
			return ret;
		},
	}
}
</script>


<style lang="scss">
@import '~/scss/commons.scss';
@import '../scss/typography.scss';
@import '~/scss/main.scss';

.MWcontent-wrapper {
	display: block;
	.MWcontent-anchor {
		display: block;
		background-color: white;
		width: 100%;
		height: 130px;
		border: 1px solid #ddd;
		clip-path: inset(-5px 0 -5px 0);
		border-radius: .1em;
		overflow: hidden;
		position: relative;
		// .content-address {
		// 	color: rgb(31, 31, 31);
		// 	text-align: center;
		// 	padding: .3em 0;
		// 	letter-spacing: .2em;
		// }
		.MWimg-wrapper {
			height: 160px;
			.MWcontent-img {
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 50%;
				height: 100%;
			}
		}
		.MWcontent-title {
			padding: .8em .5em .5em;
			border-bottom: 1px solid #E8E8E8;
			position: absolute;
			width: 52%;
			left: 50%;
			top: 0;
			bottom: 0;
			text-align: left;
			.MWicon.material-icons {
				float: left;
				margin: 2px 0 2px -13px;
				background: none;
				border: none;
			}
			.MWtitle__status-done {
				background-color: #ccc;
			}
			.MWtitle__title {
				text-align: left;
				line-height: 1.4;
				font-weight: bold;
				font-size: 1em;
				height: 50%;
				padding-bottom: .2em;
			}
			.MWtitle__title.ellipsis {
				white-space: normal;
			}
			.line-clamp {
				-webkit-line-clamp: 2;
			}
			.MWtitle-info {
				display: block;
				font-size: .9em;
				line-height: 1.7;
				margin-right: 1em;
				.MW.material-icons {
					font-size: 1em;
					transform: translateY(3px);
				}
				.MWtitle__writer {
					color: #383838;
					width: 50%;
					.MWwriter__username {
						margin-left: .3em;
						font-size: 1.1em;
					}
				}
				.MWtitle__time {
					color: rgb(114, 115, 114);
					.MWtime__time {
						font-size: .8em;
						margin-left: .2em;
					}
					.MW.material-icons {
						color: rgb(114, 115, 114);
					}
				}
				.MWcount_comment-wrapper {
					position: absolute;
					top: 55%;
					right: 1em;
					font-size: .8em;
					.MWtitle__count {
						display: inline-block;
						margin-right: .5em;
						color: lighten($color_prime_orange, 10%);
						.MW.material-icons {
							color: lighten($color_prime_orange, 10%);
						}
					}
					.MWtitle__comments {
						display: inline-block;
						color: gray;
						margin-right: .5em;
						.MW.material-icons {
							color: gray;
						}
					}
				}
			}
		}
		.MWcontent-info {
			.MWinfo__price {
				cursor: pointer;
				position: absolute;
				right: 1em;
				bottom: 1em;
				padding: .3em .8em;
				font-size: .7em;
				display: inline-block;
				border: none;
				border-radius: .2em;
				font-weight: bold;
				font-family: 'Gowun Dodum', sans-serif;
				&::after {
					content: '원';
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
