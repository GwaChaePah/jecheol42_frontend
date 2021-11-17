<template>
	<div class="header" :class="{ 'scrolled-header': scrollPosition }">
		<div class="l_wrapper">
			<div class="logo">
				<h1 @click="toMain">
					<span class="logo_word">제철</span>
					<span class="logo_word"><span id="four">4</span><span id="two">2</span></span>
				</h1>
			</div>
			<div class="navbar" v-show="(!mobileWidth && !scrollPosition)">
				<ul class="navlist" v-if="!isLogin">
					<li><span @click="toBoard">게시판</span></li>
					<li><span @click="toLogin">로그인</span></li>
					<li><span @click="toRegister">회원가입</span></li>
				</ul>
				<ul class="navlist" v-else>
					<li ><span @click="toBoard">게시판</span></li>
					<!-- to mypage -->
					<li><span @click="" class="user">{{ username }}</span></li>
					<li><span @click="logoutUser">로그아웃</span></li>
				</ul>
			</div>
			<div :class="{'menu-list': true, 'sticky': scrollPosition}" v-show="(mobileWidth || scrollPosition)">
				<button class="material-icons" @click="toggleMobileNav">menu</button>
			</div>
			<transition v-if="(mobileWidth || scrollPosition)" name="mobile-nav">
				<div v-show="mobileNav" class="dropdown-nav">
					<ul v-if="!isLogin">
						<li @click="toMain">메인</li>
						<li @click="toBoard">게시판</li>
						<li @click="toLogin">로그인</li>
						<li @click="toRegister">회원가입</li>
					</ul>
					<ul v-else>
						<li class="user ellipsis">{{ username }}</li>
						<li @click="toMain">메인</li>
						<li @click="toBoard">게시판</li>
						<li @click="logoutUser">로그아웃</li>
					</ul>
				</div>
			</transition>
			<div class="searchbar-wrapper" id="searchbar">
				<input type="text" v-model="search" class="searchbar desktopInput" placeholder="제철 과채를 검색해보세요" @keyup.enter.prevent="apply"/>
				<input type="text" v-model="search" class="searchbar mobileInput" placeholder="제철일까?" @keyup.enter.prevent="apply"/>
				<button class="material-icons" @click.prevent="apply">search</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'Header',
	data() {
		return {
			windowWidth: null,
			search: '',
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
					name: 'Register',
					href: '/Register'
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
		...mapState('product', [
			'postSearch',
			'loading'
		]),
		...mapState('post', [
			'mobileWidth',
			'mobileNav',
			'scrollPosition',
			'loading'
		]),
		...mapState('login', [
			'isLogin',
			'isLoginError',
			'username'
		]),
	},
	mounted() {
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
		...mapActions('post', [
			'updateMobileNav',
			'updateMobileWidth',
			'updateScrollPosition',
			'getBoard',
			'updateTag'
		]),
		...mapActions('product', [
			'updateSearch',
			'searchProduct'
		]),
		...mapActions('login', ['logout']),
		toMain() {
			this.$emit('initSearch', this.search);
			this.updateMobileNav(null);
			this.search = '';
			this.$router.push('/');
		},
		toLogin() {
			this.updateMobileNav(null);
			this.$router.push('/login');
		},
		toRegister() {
			this.updateMobileNav(null);
			this.$router.push('/Register');
		},
		toBoard() {
			this.updateTag(3);
			this.updateSearch();
			this.getBoard({payload: '', page: 1});
			this.updateMobileNav(null);
			this.$router.push('/board');
		},
		toggleMobileNav() {
			this.updateMobileNav(!this.mobileNav);
		},
		logoutUser() {
			this.$store.dispatch('login/logout');
			this.$router.push('/');
		},
		apply() {
			if (this.search) {
				this.updateTag(3);
				this.updateSearch(this.search);
				this.searchProduct(this.search);
				this.getBoard({payload:this.search, page: 1});
				this.search = '';
				this.$router.push('/search');
			}
		},
		checkScreen() {
			this.windowWidth = window.innerWidth;
			const mobile = (this.windowWidth <= 500) ? true : false;
			this.updateMobileWidth(mobile);
			return ;
		},
		updateScroll() {
			const header = document.getElementById('searchbar');
			const sticky = header.offsetTop;
			if (sticky && window.pageYOffset > sticky) {
				this.updateScrollPosition(true);
			} else if (window.pageYOffset <= 50){
				this.updateScrollPosition(false);
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
	z-index: 89;
	background-color: white;
	text-align: center;
	height: 250px;
	box-shadow: 0 0 10px 0 $color_shadow_03;
	transition: all .1s;
	@media ( max-width: 500px ) {
		height: 120px;
	}
	.logo {
		h1 {
			line-height: 2;
			font-size: 4em;
			.logo_word {
				cursor: pointer;
			}
			#four {
				color: $color_prime_orange;
			}
			#two {
				color: $color_prime_yellow;
			}
			@media ( max-width: 500px ) {
				font-size: 2em;
				line-height: 2;
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
				span {
					cursor: pointer;
					&:hover {
						text-decoration: underline wavy;
						color: darken($color_prime_green, 20%);
					}
				}
				&:last-child {
					border-right: none;
				}
			}
		}
	}
	.searchbar-wrapper {
		padding-top: 2em;
		@media ( max-width: 500px ) {
			padding-top: 0;
		}
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
			@media ( max-width: 500px ) {
				font-size: 35px;
			}
		}
		@media ( max-width: 500px ) {
			height: 50%;
		}
	}
	.sticky {
		z-index: 99;
		position: fixed;
		top: 0;
		right: 20px;
		height: 100px;
		@media ( max-width: 500px ) {
			right: -10px;
			height: 90px;
		}
	}
	.dropdown-nav {
		z-index: 99;
		display: flex;
		flex-direction: column;
		position: fixed;
		background-color: white;
		width: 155px;
		height: 100%;
		top: 0;
		left: 0;
		padding-top: 125px;
		box-shadow: 0 0 10px 0 $color_shadow_03;
		font-size: 1.3em;
		li {
			cursor: pointer;
			padding: 25px;
			color: #000;
			transition: .5s ease all;
			&:hover {
				text-decoration: underline wavy;
				color: $color_prime_orange;
				// background-color: $color_prime_yellow;
			}
		}
		@media ( max-width: 500px ) {
			font-size: 1em;
			padding-top: 110px;
			width: 123px;
			li {
				padding: 10px;
			}
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
.user {
	font-weight: bold;
	font-size: 1.2em;
	font-family: 'Gowun Dodum', sans-serif;
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
			@media ( max-width: 500px ) {
			  font-size: 1.5em;
				margin-top: 50%;
				margin-left: -5px;
			}
			.logo_word {
				display: block;
				line-height: 1;
			}
		}
	}
	.searchbar-wrapper {
		padding-top: 1.7em;
		.searchbar {
			margin-left: 100px;
			width: 80%;
			transition: .4s all;
			@media ( max-width: 500px ) {
				width: 78%;
				margin-left: 42px;
			}
		}
		.material-icons {
			margin-right: 140px;
			@media ( max-width: 500px ) {
				margin-right: 60px;
			}
		}
	}
}

</style>
