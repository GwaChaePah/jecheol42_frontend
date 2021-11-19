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
					<div class="MWtitle__time">
						<span class="MWtime__time">{{ calcDate() }}</span>
					</div>
					<div class="MWtitle__title ellipsis line-clamp">{{ post.title }}</div>
					<div class="MWtitle-info">
						<button class="MWinfo__price" :class="{'price_sobun':  post.tag === 0, 'price_nanum':  post.tag === 1}">
							{{ post.price }}
						</button>
						<div class="MWtitle__comments">
							<span class="MW material-icons">chat_bubble_outline</span>
							<span class="MWcomments__count">{{ post.comment_cnt }}</span>
						</div>
					</div>
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

.MWcontent-wrapper {
	display: block;
	.MWcontent-anchor {
		display: block;
		margin-bottom: .5em;
		background-color: white;
		width: 100%;
		height: 140px;
		// border-bottom: 1px solid #eee;
		// border-top: 1px solid #eee;
		position: relative;
		// .content-address {
		// 	color: rgb(31, 31, 31);
		// 	text-align: center;
		// 	padding: .3em 0;
		// 	letter-spacing: .2em;
		// }
		.MWimg-wrapper {
			// height: 160px;
			.MWcontent-img {
				position: absolute;
				left: 8px;
				top: 50%;
				transform: translateY(-50%);
				width: 40%;
				height: 90%;
				border-radius: .3em;
			}
		}
		.MWtitle__time {
			.MWtime__time {
				font-family: 'Gowun Dodum', sans-serif;
				font-size: .6em;
				margin-left: .2em;
				line-height: 1.1;
				color: gray;
			}
		}
		.MWcontent-title {
			padding: .5em;
			position: absolute;
			width: 52%;
			left: 45%;
			top: 0;
			bottom: 0;
			text-align: left;
			.MWicon.material-icons {
				float: left;
				margin: 2px 0 2px -13px;
				background: none;
				border: none;
			}
			.MWtitle__title {
				text-align: left;
				line-height: 1.4;
				font-weight: bold;
				font-size: 1em;
				height: 38%;
				padding-bottom: .2em;
				margin-bottom: 1em;
			}
			.MWtitle__title.ellipsis {
				white-space: normal;
			}
			.line-clamp {
				-webkit-line-clamp: 2;
			}
			.price_sobun {
				background-color: $color_prime_green;
			}
			.price_nanum {
				background-color: $color_prime_yellow;
			}
			.MWtitle-info {
				font-size: .9em;
				line-height: 1.7;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.MWinfo__price {
					cursor: pointer;
					display: inline-block;
					padding: .3em .8em;
					border: none;
					border-radius: .2em;
					font-family: 'Gowun Dodum', sans-serif;
					font-size: .9em;
					font-weight: bold;
					&::after {
						content: '원';
					}
				}
				.MWtitle__comments {
					display: block;
					margin-right: .5em;
					text-align: right;
					.MW.material-icons {
						color: gray;
						font-size: 1em;
						transform: translateY(3px);
					}
					.MWcomments__count {
						font-family: 'Gowun Dodum', sans-serif;
						color: gray;
						margin-left: .2em;
					}
				}
			}
		}
	}
}
</style>
