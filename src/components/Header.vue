<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<div class="header" :class="{ 'scrolled-header': scrollPosition }">
		<div class="l_wrapper">
			<div class="logo">
				<h1 @click="toMain">제철<span id="four">4</span><span id="two">2</span></h1>
			</div>
			<div class="navbar" v-show="(!mobile && !scrollPosition)">
				<ul class="navlist" v-if="!isLogin">
					<li @click="toBoard">게시판</li>
					<li @click="toLogin">로그인</li>
					<li @click="">회원가입</li>
				</ul>
				<ul class="navlist" v-else>
					<li @click="toBoard">게시판</li>
					 <!-- to mypage  -->
					<li @click="">{{ userInfo.first_name }}</li>
					<li @click="logoutUser">로그아웃</li>
				</ul>
			</div>
			<div :class="{'menu-list': true, 'sticky': scrollPosition}" v-show="(mobile || scrollPosition)">
				<button class="material-icons" @click="toggleMobileNav">reorder</button>
			</div>
			<transition v-if="(mobile || scrollPosition)" name="mobile-nav">
				<div v-show="mobileNav" class="dropdown-nav">
					<ul v-if="!isLogin">
						<li @click="toMain">메인</li>
						<li @click="toBoard">게시판</li>
						<li @click="toLogin">로그인</li>
						<li href="#">회원가입</li>
					</ul>
					<ul v-else>
						<li><b>username</b></li>
						<li @click="toMain">메인</li>
						<li @click="toBoard">게시판</li>
						<li @click="logoutUser">로그아웃</li>
					</ul>
				</div>
			</transition>
			<div class="searchbar-wrapper" id="searchbar">
				<input type="text" v-model="search" class="searchbar desktopInput" placeholder="제철 과채를 검색해보세요" @keyup.enter="apply"/>
				<input type="text" v-model="search" class="searchbar mobileInput" placeholder="제철일까?" @keyup.enter="apply"/>
				<button class="material-icons" @click="apply">search</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'Header',
	data() {
		return {
			scrollPosition: null,
			windowWidth: null,
			mobile: null,
			search: '',
			mobileNav: null,
			navigations: [
				{
					name: 'Product',
					href: '/'
				},
				{
					name: 'Board',
					href: '/board'
				},
				{
					name: 'Login',
					href: '/login'
				},
				{
					name: 'Post',
					href: '/post'
				},
				{
					name: 'Search',
					href: '/search'
				}
			]
		}
	},
	computed: {
		...mapState('auth', [
			'users',
			'currentUser'
		]),
		...mapState('product', [
			'postSearch'
		]),
		...mapState('login', [
			'isLogin',
			'isLoginError',
			'userInfo'
		]),
	},
	mounted() {
		this.$store.dispatch('auth/loadUsers');
		window.addEventListener("scroll", this.updateScroll);
	},
	created() {
		window.addEventListener("resize", this.checkScreen);
		this.checkScreen();
	},
	unmounted() {
		window.removeEventListener("resize", this.checkScreen);
		window.removeEventListener("scroll", this.updateScroll);
	},
	methods: {
		...mapActions('login', ['logout']),
		toMain() {
			this.$router.push('/');
			this.$emit('initSearch', this.search);
			this.mobileNav = null;
			this.search = '';
		},
		toLogin() {
			this.$router.push('/login');
			this.mobileNav = null;
		},
		toBoard() {
			this.$store.dispatch('post/initPosts');
			this.$store.dispatch('product/updateSearch');
			this.$router.push('/board');
			this.mobileNav = null;
		},
		toggleMobileNav() {
			this.mobileNav = !this.mobileNav;
		},
		logoutUser() {
			this.$store.dispatch("login/logout");
			this.$router.push('/');
		},
		apply() {
			if (this.search) {
				this.$store.dispatch('product/updateSearch', this.search);
				this.$store.dispatch('product/searchProduct', this.search);
				this.$store.dispatch('post/initPosts', this.search);
				this.search = '';
				this.$router.push('/search');
			}
		},
		checkScreen() {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth <= 750) {
				this.mobile = true;
				return ;
			}
			this.mobile = false;
			return ;
		},
		updateScroll() {
			const header = document.getElementById('searchbar');
			const sticky = header.offsetTop;
			if (window.pageYOffset > sticky) {
				this.scrollPosition = true;
			} else {
				this.scrollPosition = false;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/commons.scss';

.header {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 98;
	background-color: white;
	text-align: center;
	height: 250px;
	box-shadow: 0 0 10px 0 $color_shadow_03;
	transition: all .1s;
	@media ( max-width: 700px ) {
		height: 200px;
	}
	.logo {
		h1 {
			line-height: 2;
			font-size: 4em;
			#four {
				color: $color_prime_orange;
			}
			#two {
				color: $color_prime_yellow;
			}
		}
	}
	.navbar {
		position: relative;
		text-align: center;
		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			width: 10%;
			border-top: 1px solid $color_prime_green;
			background: black;
			transform: translateY(-50%);
		}
		&:after {
			left: auto;
			right: 0;
		}
		.navlist {
			li {
				line-height: 1.5;
				display: inline-block;
				padding: 0 4em;
				border-right: 2px solid $color_prime_green;
				&:last-child {
					border-right: none;
				}
				&:hover {
					text-decoration: underline wavy;
					color: darken($color_prime_green, 20%);
				}
			}
		}
	}
	.searchbar-wrapper {
		padding-top: 2em;
		.searchbar {
			color: darken($color_prime_green, 35%);
			font-size: 20px;
			letter-spacing: 1em;
			line-height: 1.5;
			padding: .3em 1em;
			width: 100%;
			border-radius: .3em;
			border: 1px solid darken($color_prime_green, 40%);
			&::placeholder {
				color: rgba(#76862c, 0.76);
				text-align: center;
			}
			&:focus {
				outline: none;
			}
		}
		.desktopInput {
			display: block;
		}
		.mobileInput {
			display: none;
		}
		@media ( max-width: 700px) {
			.desktopInput {
				display: none;
			}
			.mobileInput {
				display: block;
			}
		}
		.material-icons {
			position: absolute;
			right: 0;
			bottom: 5px;
			border: none;
			color: darken($color_prime_green, 30%);
			background-color: transparent;
			font-size: 35px;
			margin: auto 50px auto auto;
		}
	}
	.menu-list {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		height: 70%;
		.material-icons {
			z-index: 99;
			border: none;
			margin-right: 20px;
			background-color: transparent;
			font-size: 50px;
		}
	}
	.sticky {
		z-index: 99;
		position: fixed;
		top: 0;
		right: 20px;
		height: 100px;
	}
	.dropdown-nav {
		z-index: 99;
		display: flex;
		flex-direction: column;
		position: fixed;
		background-color: white;
		width: 140px;
		max-width: 250px;
		height: 100%;
		top: 0;
		left: 0;
		padding-top: 20px;
		box-shadow: 0 0 10px 0 $color_shadow_03;
		li {
			padding: 16px;
			color: #000;
			padding-bottom: 4px;
			transition: .5s ease all;
		}
	}
	.mobile-nav-enter-active,
	.mobile-nav-leave-active {
		transition: 1s ease all;
	}
	.mobile-nav-endter-from,
	.mobile-nav-leave-to {
		transform: translateX(-250px);
	}
	.mobile-nav-enter-to {
		transform: translateX(0);
	}
}
.scrolled-header {
	height: 100px;
	z-index: 98;
	transition: all .1s;
	.logo {
		position: fixed;
		top: 10px;
		left: 20px;
		h1 {
			font-size: 2.5em;
		}
	}
	.searchbar-wrapper {
		padding-top: 1.7em;
		.searchbar {
			margin-left: 100px;
			width: 80%;
			transition: .4s all;
		}
		.material-icons {
			margin-right: 140px;
		}
	}
}

</style>
