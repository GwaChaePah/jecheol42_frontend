<template>
	<div class="navbar" :class="{ 'sticky': scrollPosition }" id="navbar">
		<button @click="$router.back()">뒤로가기</button>
		<button>글쓰기</button>
		<button v-show="1">글수정</button>
		<button v-show="1" @click="deletePost">글삭제</button>
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
		async deletePost() {
			const index = this.$route.params.id;
			await axios.delete('posts/' + index);
			this.$router.push('/board');
		},
		updateScroll() {
			const header = 230;
			const navbar = document.getElementById('navbar');
			if (navbar) {
				const sticky = navbar.offsetTop + header;
				if (window.pageYOffset > sticky) {
					navbar.classList.add("sticky");
					this.scrollPosition = true;
				} else {
					navbar.classList.remove("sticky");
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
	margin-top: .5em;
	position: absolute;
	z-index: 30;
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
		background-color: $color_prime_white;
		&:nth-child(2) {
			background-color: darken($color_prime_white, 2%);
		}
		&:nth-child(3) {
			background-color: darken($color_prime_white, 4%);
		}
		&:nth-child(4) {
			background-color: darken($color_prime_white, 5%);
		}
		&:hover {
			font-weight: bold;
		}
	}
}
.sticky {
	position: fixed;
	top: 0;
}

</style>
