<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
	<div class="content-title-post">
		<div class="user-menu" v-if="1">
			<button class="material-icons" @click="showMenu">more_vert</button>
			<div class="dropdown" v-show="click">
				<div>
					<span class="text">글수정</span>
					<span class="material-icons-outlined" title="수정">edit</span>
				</div>
				<div @click="deletePost">
					<span class="text">글삭제</span>
					<span class="material-icons-outlined" title="삭제">delete</span>
				</div>
			</div>
		</div>
		<div class="content-title">
			<span class="material-icons">label</span>
			<button class="title__category">
				<select class="select-state show-select" @change="apply($event)">
					<option selected>
						[<span id="region">{{ thePost.region }}</span>
						/
						<span id="tag">{{ thePost.tag }}</span>]
					</option>
					<option v-if="`${thePost.tag}` !== '소분'">소분</option>
					<option v-if="`${thePost.tag}` !== '나눔'">나눔</option>
					<option v-if="`${thePost.tag}` !== '완료'">거래 완료</option>
				</select>
			</button>
			<div class="title__title">
				<h1>{{ thePost.title }}</h1>
			</div>
			<div class="title__info">
				<p id="writer"><span class="material-icons">account_circle</span>
					{{ thePost.user }}
				</p>
				<p id="time"><span class="material-icons">schedule</span>
					{{ thePost.created_at }}
				</p>
				<p id="count"><span class="material-icons">visibility</span>
					{{ thePost.view_count }}
				</p>
				<p id="comments" @click="scrollBottom"><span class="material-icons-outlined">chat_bubble_outline</span>
					{{ comments.length }}
				</p>
			</div>
		</div>
		<div class="content-post">
			<div class="post__img clearfix">
				<img class="img-slides"
					v-for="image in images"
					v-show="image.src"
					:key="image.name"
					:src="image.src"
					:alt="`${thePost.user}_${thePost.title}_${image.name}`"
					onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';" />
			</div>
			<div class="post__paragraph">
				<p>{{ thePost.content }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'PostContent',
	props: ['thePost'],
	data() {
		return {
			name: '',
			thisUser: '',
			click: false,
			images: [
				{name: 'image1', src: this.thePost.image1 ? this.thePost.image1 : ''},
				{name: 'image2', src: this.thePost.image2 ? this.thePost.image2 : ''},
				{name: 'image3', src: this.thePost.image3 ? this.thePost.image3 : ''}
			]
		}
	},
	computed: {
		...mapState('auth', ['currentUser']),
		...mapState('post', ['comments']),
	},
	methods: {
		// compare() {
		// 	if (this.thePost.user) {
		// 		this.thisUser = this.thePost.user
		// 	}
		// 	console.log('compare', 'name',this.name,'user', this.thisUser, this.name === this.thisUser);
		// 	return ((this.name && this.thisUser) && (this.name === this.thisUser));
		// },
		scrollBottom() {
			const container = document.getElementsByClassName('content-title-post');
			const height = container[0].clientHeight + 100;
			window.scroll(0, height);
		},
		apply(e) {
			let value = e.target.value;
			if (value === '거래 완료') {
				value = value.slice(-2);
			}
			this.thePost.tag = value;
			this.$store.dispatch('post/updateTag', this.thePost);
		},
		deletePost() {
			const index = this.$route.params.id;
			if (confirm("지우시겠습니까?")) {
				this.$store.dispatch('post/deletePost', index);
				this.$router.push('/board');
			}
		},
		showMenu() {
			this.click = !this.click;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.content-title-post {
	position: relative;
	padding: .8em;
	box-shadow: 0 0 5px 0 $color_shadow_03;
	clip-path: inset(-5px -5px 0px -5px);
	margin: 0 0.3em 0 3.5em;
	background-color: white;
	border-radius: .2em;
	overflow: hidden;
	.user-menu {
		position: absolute;
		top: 20px;
		right: 20px;
		.material-icons {
			font-size: 2em;
			background: none;
			border: none;
		}
		.dropdown {
			position: absolute;
			box-shadow: 0 0 3px 0 $color_shadow_05;
			background-color: white;
			border-radius: .2em;
			text-align: center;
			right: -3px;
			top: 50px;
			line-height: 2;
			font-size: .8em;
			z-index: 1;
			div {
				display: inline-block;
				margin: .5em 0 0 .3em;
				width: 90px;
				color: #696969;
				.text {
					vertical-align: super;
					letter-spacing: 3px;
					font-size: 1.1em;
				}
				.material-icons-outlined {
					cursor: pointer;
					&:hover {
						color: $color_prime_orange;
					}
				}
				&:hover {
					color: $color_prime_orange;
				}
			}
		}
	}
	.content-title {
		border-bottom: 1px solid #ccc;
		padding-bottom: .5em;
		background-color: white;
		.material-icons {
			transform: translate(6px, 5px);
			background: none;
			border: none;
		}
		.title__category {
			margin: .3em;
			border-style: none;
			.select-state {
				pointer-events: none;
				appearance: none;
				border: none;
				padding: .2em;
				font-size: 1.3em;
			}
			.show-select {
				pointer-events: all;
				appearance: listbox;
			}
			span {
				padding: 0 .3em;
			}
			@media (max-width: 770px) {
				font-size: .8em;
			}
			@media (max-width: 580px) {
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
			@media (max-width: 580px) {
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
			#time {
				color: rgb(114, 115, 114);
			}
			#count {
				color: $color_prime_orange;
			}
			#comments {
				color: gray;
				cursor: pointer;
			}
			@media (max-width: 380px) {
				padding: 0;
				p {
					font-size: .5em;
				}
			}
		}
	}
	.content-post {
		max-width: 100%;
		margin: 1em 0;
		@media (max-width: 580px) {
			margin: .5em 0 1em;
		}
		.post__img {
			max-width: 90%;
			min-height: 300px;
			padding: 1em .5em;
			margin: 0 auto;
			@media (max-width: 580px) {
				min-height: 100%;
				padding: 1em 0;
			}
			.img-slides {
				float: left;
				margin: .2em;
			}
		}
		.post__paragraph {
			margin: .8em 3em 1em;
			p {
				text-align: justify;
				padding: .3em 0;
				line-height: 1.5;
				font-size: 1.2em;
			}
			@media (max-width: 580px) {
				margin: 0 .5em;
				p {
					font-size: .5em;
				}
			}
		}
	}
}

</style>
