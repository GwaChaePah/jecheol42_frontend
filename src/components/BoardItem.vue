<template>
	<div class="content-wrapper">
		<RouterLink :to="{ name: 'Post', params: {id: `${post.id}`}}">
			<div class="content-anchor">
				<div class="img-wrapper">
					<img class="content-img" :src="post.image1" :alt="`${post.user}_${post.title}`"
					onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';"/>
				</div>
				<div class="content-title">
					<div class="title__title ellipsis">{{ post.title }}</div>
					<div class="title-info">
						<div class="title__writer ellipsis">
							<span class="PC material-icons">account_circle</span>
							<span class="writer__username">{{ post.username }}</span>
						</div>
						<div class="count_comment-wrapper">
							<div class="title__count">
								<span class="PC material-icons">visibility</span>
								{{ post.view_count }}
							</div>
							<div class="title__comments">
								<span class="PC material-icons">chat_bubble_outline</span>
								{{ post.comment_cnt }}
							</div>
						</div>
					</div>
					<div class="title-info">
						<div class="title__time">
							<span class="PC material-icons">schedule</span>
							<span class="time__time">{{ calcDate() }}</span>
						</div>
						<div class="title__region">
							<span class="">{{ post.city }}</span>
							&#183;
							<span class="">{{ post.address }}</span>
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
		...mapState('post', ['mobileWidth', 'b'])
	},
	methods: {
		calcDate() {
			let ret;
			const timestamp = this.post.created_at
			const postYear = timestamp.slice(0, 4);
			const postMon = timestamp.slice(5, 7)
			const postDate = timestamp.slice(8, 10);
			const postHour = timestamp.slice(12, 14);
			const postMin = timestamp.slice(15, 17);
			const current = new Date();
			const year = current.getFullYear();
			const month = (current.getMonth() + 1 < 10) ? '0' + current.getMonth() + 1
									: current.getMonth() + 1;
			const date = (current.getDate() < 10) ? '0' + current.getDate()
									: current.getDate();
			const hour = (current.getHours() < 10) ? '0' + current.getHours()
									: current.getHours();
			const minute = (current.getMinutes() < 10) ? '0' + current.getMinutes()
									: current.getMinutes();
			if (year == postYear) {
				if (`${month}${date}` === `${postMon}${postDate}`) {
					ret = (`${hour}${minute}` === `${postHour}${postMin}`) ? '방금 전'
									: (hour == postHour) ? `${minute - postMin}분 전`
									: `${hour - postHour}시간 전`;
				} else {
					ret = (month === postMon && date - postDate < 3) ? `${date - postDate}일 전` : `${postMon}월 ${postDate}일`;
				}
			} else {
				ret = `${postYear}.${postMon}.${postDate}.`;
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

.content-wrapper {
	display: inline-block;
	position: relative;
	.content-anchor {
		display: block;
		background-color: white;
		width: 240px;
		height: 320px;
		border-radius: .4em;
		margin: 1px;
		overflow: hidden;
		position: relative;
		// .content-address {
		// 	color: rgb(31, 31, 31);
		// 	text-align: center;
		// 	padding: .3em 0;
		// 	letter-spacing: .2em;
		// }
		.img-wrapper {
			height: 160px;
			.content-img {
				width: 100%;
				height: 160px;
			}
		}
		.content-title {
			padding: .8em .5em .5em;
			border-bottom: 1px solid #E8E8E8;
			.PC.icon.material-icons {
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
			}
			.title-info {
				// position: relative;
				// text-align: left;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.PC.material-icons {
					font-size: 1em;
					transform: translateY(3px);
				}
				.title__writer {
					color: #383838;
					width: 50%;
					text-align: left;
					.writer__username {
						margin-left: .3em;
						font-size: 1.1em;
					}
				}
				.count_comment-wrapper {
					// position: absolute;
					// top: 0;
					// right: 0;
					.title__count {
						display: inline-block;
						margin-right: .5em;
						color: lighten($color_prime_orange, 10%);
						.PC.material-icons {
							color: lighten($color_prime_orange, 10%);
						}
					}
					.title__comments {
						display: inline-block;
						color: gray;
						.PC.material-icons {
							color: gray;
						}
					}
				}
				.title__time {
					color: rgb(114, 115, 114);
					.time__time {
						font-size: .8em;
						margin-left: .2em;
					}
					.PC.material-icons {
						color: rgb(114, 115, 114);
					}
				}
				.title__region {
					font-size: .8em;
				}
			}
		}
		.content-info {
			display: flex;
			justify-content: space-between;
			padding: .4em;
			font-size: 1.1em;
			background-color: #f8f8f8;
			.info__category {
				display: inline-block;
				font-weight: bold;
				font-family: 'Gowun Dodum', sans-serif;
				padding: .4em;
			}
			.cat_sobun {
				color: darken($color_prime_green, 25%);
			}
			.cat_nanum {
				color: darken($color_prime_yellow, 25%);
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
