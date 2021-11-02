<template>
	<div class="navbar" :class="{ 'sticky': scrollPosition }" id="navbar">
		<button @click="$router.back()">뒤로가기</button>
		<button>글쓰기</button>
		<button v-if="1">글수정</button>
		<button v-if="1" @click="deletePost">글삭제</button>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'NavPost',
	data() {
		return {
			name: '',
			thisUser: '',
			scrollPosition: null
		}
	},
	computed: {
		...mapState('auth', ['currentUser']),
		...mapState('post', ['thePost'])
	},
	mounted() {
		window.addEventListener("scroll", this.updateScroll);
	},
	methods: {
		// compare() {
		// 	if (this.thePost.user) {
		// 		this.thisUser = this.thePost.user
		// 	}
		// 	console.log('compare', 'name',this.name,'user', this.thisUser, this.name === this.thisUser);
		// 	return ((this.name && this.thisUser) && (this.name === this.thisUser));
		// },
		deletePost() {
			const index = this.$route.params.id;
			if (confirm("지우시겠습니까?")) {
				this.$store.dispatch('post/deletePost', index);
				this.$router.push('/board');
			}
		},
		updateScroll() {
			const header = 160;
			const navbar = document.getElementById('navbar');
			if (navbar) {
				const sticky = navbar.offsetTop + header;
				if (window.pageYOffset > sticky) {
					// console.log('scroll', window.pageYOffset, sticky);
					this.scrollPosition = true;
				} else {
					// console.log('scroll', window.pageYOffset, sticky);
					this.scrollPosition = false;
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.navbar {
	margin-top: 130px;
	position: absolute;
	z-index: 30;
	@media (max-width: 580px) {
		position: static;
		text-align: center;
	}
	button {
		box-shadow: 0 0 5px 0 $color_shadow_03;
		clip-path: inset(-5px 0px -5px -5px);
		display: block;
		width: 88px;
		border: none;
		border-radius: .2em 0 0 .2em;
		font-size: 1.1em;
		line-height: 1.6;
		margin: .5em 0;
		padding: .4em .5em;
		$color: $color_prime_white;
		background-color: $color;
		&:nth-child(2) {
			background-color: darken($color, 2%);
		}
		&:nth-child(3) {
			background-color: darken($color, 4%);
		}
		&:nth-child(4) {
			background-color: darken($color, 5%);
		}
		&:hover {
			font-weight: bold;
		}
		@media (max-width: 770px) {
			width: 80px;
			font-size: 1em;
			margin-top: .8em;
		}
		@media (max-width: 580px) {
			$color: lighten($color_prime_yellow, 10%);
		  display: inline-block;
			border-radius: .2em;
			box-shadow: none;
			border-right: 3px solid $color_prime_yellow;
			border-bottom: 3px solid $color_prime_yellow;
			width: 25%;
			min-width: 75px;
			clip-path: none;
			margin-top: 0;
			background-color: $color;
			&:nth-child(2) {
				background-color: $color;
			}
			&:nth-child(3) {
				background-color: $color;
			}
			&:nth-child(4) {
				background-color: $color;
				// border-right: none;
			}
		}
	}
}
.sticky {
	position: fixed;
	top: 0;
	@media (max-width: 580px) {
		width: calc(100% - 60px);
	}
}

</style>
