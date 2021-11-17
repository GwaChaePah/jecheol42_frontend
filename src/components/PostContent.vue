<template>
	<div v-if="mobileWidth" class="navbar"
		:class="{ 'sticky': scrollPosition, 'fix-index': mobileNav }" id="navbar">
		<div class="button-wrapper">
			<button id="back" @click="$router.back()">
				<span class="material-icons">arrow_back</span>
				뒤로가기
			</button>
			<button id="write" @click="createPost">
				<span class="material-icons">create</span>
				글쓰기
			</button>
			<button id="up" @click="toTop" v-show="scrollPosition">
				<span class="material-icons">north</span>
				위로
			</button>
			<button class="post__price" v-if="post.tag !== 1">
				<span>{{ post.price }}</span>
			</button>
		</div>
	</div>
	<div class="content-title-post">
		<div class="user-menu" v-if="checkUser()">
			<button class="material-icons" @click="showMenu">more_vert</button>
			<div class="dropdown" v-show="click">
				<div @click="updatePost">
					<span class="text" @click="updatePost">글수정</span>
					<span class="material-icons-outlined" title="수정">edit</span>
				</div>
				<div @click="deletePost">
					<span class="text">글삭제</span>
					<span class="material-icons-outlined" title="삭제">delete</span>
				</div>
			</div>
		</div>
		<div class="content-title">
			<span class="tag material-icons-outlined" :class="{'sobun': post.tag === 0, 'nanum': post.tag === 1}">label</span>
			<div class="title__category">
				<!-- <span id="region">{{ post.region }}</span>
				/ -->
				<span>	{{ post.tag === 0 ? '소분' : post.tag === 1 ? '나눔' : '완료' }} </span>
			</div>
			<div class="title__title">
				<h1>{{ post.title }}</h1>
			</div>
			<div class="title__info">
				<p id="writer"><span class="material-icons">account_circle</span>
					<span class="write_name">{{ post.username }}</span>
				</p>
				<p id="time"><span class="material-icons">schedule</span>
					<span class="time_created">{{ post.created_at }}</span>
				</p>
				<p id="count"><span class="material-icons">visibility</span>
					<span class="view_count">{{ post.view_count }}</span>
				</p>
				<p id="comments" @click="scrollBottom"><span class="material-icons-outlined">chat_bubble_outline</span>
					<span class="comments_length">{{ comments.length }}</span>
				</p>
				<div class="post__price" v-if="(!mobileWidth && post.tag !== 1)">
					<button>{{ post.price }}</button>
				</div>
			</div>
		</div>
		<div class="content-post">
			<div class="post__img clearfix">
				<img class="img-slides"
					v-for="image in images"
					v-show="image.src"
					:key="image.name"
					:src="image.src"
					:alt="`${post.user}_${post.title}_${image.name}`"
					onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';" />
			</div>
			<div class="post__paragraph">
				<p>{{ post.content }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'PostContent',
	props: ['post'],
	data() {
		return {
			name: '',
			thisUser: '',
			click: false,
			images: [
				{name: 'image1', src: this.post.image1 ? this.post.image1 : ''},
				{name: 'image2', src: this.post.image2 ? this.post.image2 : ''},
				{name: 'image3', src: this.post.image3 ? this.post.image3 : ''}
			],
		}
	},
	computed: {
		...mapState('post', [
			'mobileWidth',
			'mobileNav',
			'scrollPosition',
			'comments'
		]),
	},
	methods: {
		toTop() {
			document.documentElement.scrollTop = 0;
		},
		createPost() {
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			if (userInfo == null)
			{
				confirm("글 작성은 로그인 후 가능합니다.");
				this.$router.push('/login');
			}
			else {
				this.$router.push({
					path: '/create'
				})
			}
		},
		scrollBottom() {
			const container = document.getElementsByClassName('content-title-post');
			const height = container[0].clientHeight + 100;
			window.scroll(0, height);
		},
		deletePost() {
			const id = this.$route.params.id;
			if (confirm("정말 지우시겠습니까?")) {
				this.$store.dispatch('post/deletePost', id);
				this.$store.dispatch('post/getBoard', {payload: ''});
				this.$router.push('/board');
			}
		},
		showMenu() {
			this.click = !this.click;
		},
		checkUser() {
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			let pk = userInfo ? userInfo.pk : '';
			if (pk && this.post.user_key === pk) {
				return true;
			}	else {
				return false;
			}
		},
		updatePost() {
			this.$router.push({
				name: 'UpdatePost',
					params: {
						id: this.$route.params.id
				}
			});
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.navbar {
	background-color: white;
	box-shadow: 0 0 5px 0 $color_shadow_03;
	clip-path: inset(0 -5px -5px -5px);
	position: fixed;
	width: 100%;
	top: 120px;
	z-index: 90;
	transition: z-index .6s;
	.button-wrapper {
		display: flex;
		width: 90%;
		margin: 0 auto;
		border-top: 1px dotted #ccc;
		button {
			font-family: 'Gowun Dodum', sans-serif;
			display: inline-block;
			width: 39px;
			font-size: .5em;
			border: none;
			border-radius: .2em;
			line-height: 1.6;
			margin: .5em;
			padding: .4em 0;
			background-color: white;
			.material-icons {
				display: block;
				font-size: 2.5em;
			}
			&:hover {
				background-color: lighten($color_prime_green, 10%);
			}
		}
		.post__price {
			text-align: right;
			width: 30%;
			margin-left: auto;
			padding-right: 1em;
			span {
				font-size: 1.3em;
				padding: .7em 1em;
				border-radius: .2em;
				background-color: $color_prime_green;
				&:after {
					content: '원';
				}
			}
		}
	}
}
.sticky {
	position: fixed;
	top: 100px;
}
.fix-index {
	z-index: 80;
	transition: z-index .6s;
}
.content-title-post {
	position: relative;
	padding: .8em;
	box-shadow: 0 0 5px 0 $color_shadow_03;
	clip-path: inset(-5px -5px 0px -5px);
	margin: 0 0.3em 0 3.5em;
	background-color: white;
	border-radius: .2em;
	overflow: hidden;
	@media (max-width: 500px) {
		box-shadow: none;
		border-bottom: 1px solid #ccc;
		border-radius: 0;
		clip-path: none;
		margin: 10em .3em 0;
		padding: .3em .8em .8em;
	}
	.user-menu {
		position: absolute;
		top: 20px;
		right: 20px;
		.material-icons {
			font-size: 2em;
			background: none;
			border: none;
		}
		@media (max-width: 500px) {
			top: 8px;
			right: 3px;
			.material-icons {
				font-size: 1.5em;
			}
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
			@media (max-width: 500px) {
				font-size: .5em;
				top: 27px;
				right: 8px;
				line-height: 2;
			}
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
				@media (max-width: 500px) {
					width: 56px;
					.material-icons-outlined {
						display: none;
					}
				}
			}
		}
	}
	.content-title {
		border-bottom: 1px solid #ccc;
		padding-bottom: .5em;
		background-color: white;
		.tag.material-icons-outlined {
			transform: translate(9px, 5px);
			background: none;
			border: none;
			@media (max-width: 500px) {
				transform: translate(3px, 5px);
				font-size: 1em;
				margin-right: 2px;
			}
		}
		.sobun {
			color: $color_prime_green;
		}
		.nanum {
			color: $color_prime_yellow;
		}
		.title__category {
			display: inline-block;
			margin: .3em;
			padding: .2em;
			font-size: 1.1em;
			font-weight: bolder;
			span {
				font-family: 'Gowun Dodum', sans-serif;
				padding: 0 .3em;
			}
			@media (max-width: 500px) {
				margin: .3em 0;
				font-size: .6em;
			}
		}
		.title__title {
			margin-top: .4em;
			h1 {
				font-size: 2.2em;
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
			display: flex;
			align-items: flex-end;
			padding: .5em 0.3em 0;
			font-size: 1.2em;
			p {
				display: inline-block;
				margin-left: .5em;
				.material-icons,
				.material-icons-outlined {
					font-size: 1em;
					margin: 0 3px;
					transform: translateY(2px);
				}
				&:first-child {
					margin-left: 0;
				}
			}
			#writer {
				font-family: 'Gowun Dodum', sans-serif;
			}
			#count {
				color: $color_prime_orange;
				font-size: .8em;
			}
			#comments {
				color: gray;
				font-size: .8em;
				cursor: pointer;
			}
			#time {
				font-family: 'Gowun Dodum', sans-serif;
				color: rgb(114, 115, 114);
				font-size: .8em;
			}
			.post__price {
				margin-left: auto;
				button {
					font-size:  .9em;
					border: none;
					background-color: $color_prime_green;
					border-radius: .2em;
					padding: .3em .8em;
					&:after {
						content: '원';
					}
					@media (max-width: 500px) {
						font-size: .5em;
					}
				}
			}
			@media (max-width: 500px) {
				padding: 0;
				font-size: .7em;
				p:first-child {
					margin-left: 0;
				}
			}
		}
	}
	.content-post {
		max-width: 100%;
		margin-top: 1em;
		@media (max-width: 500px) {
			margin-top: .2em;
		}
		.post__price {
			position: fixed;
			button {
				font-size:  1.2em;
				// border: 1px solid black;
				border: none;
				background-color: $color_prime_green;
				// background: none;
				// box-shadow: 0 0 5px 0 $color_shadow_04;
				border-radius: .2em;
				padding: .8em 1em;
				&:after {
					content: '원';
				}
				@media (max-width: 500px) {
					font-size: .5em;
				}
			}
		}
		.post__img {
			max-width: 90%;
			min-height: 300px;
			padding: 1em .5em;
			margin: 0 auto;
			@media (max-width: 500px) {
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
			@media (max-width: 500px) {
				margin: 0 1.5em .5em;
				font-size: .6em;
			}
		}
	}
}

</style>
