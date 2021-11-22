<template>
	<div class="header" :class="{ 'scrolled-header': scrollPosition }">
		<div class="l_wrapper">
			<div class="logo" @click="toMain">
				<img class="pc-logo" src="https://raw.githubusercontent.com/GwaChaePah/front/c1b25666d7064836ea5c4fb528785e464f3d1152/static/%EC%A0%9C%EC%B2%A042_%EA%B0%80%EB%A1%9C.svg" v-if="!mobileWidth"/>
				<img class="mb-logo" src="https://raw.githubusercontent.com/GwaChaePah/front/e543ebcc3d5680b42116261b29021815bdf54d49/static/%EC%A0%9C%EC%B2%A042_%EA%B8%80%EC%94%A8.svg" v-if="mobileWidth && !scrollPosition"/>
				<img class="scroll-logo" src="https://raw.githubusercontent.com/GwaChaePah/front/e543ebcc3d5680b42116261b29021815bdf54d49/static/%EC%A0%9C%EC%B2%A042_%EA%B7%B8%EB%A6%BC.svg" v-if="mobileWidth && scrollPosition"/>
					<!-- <span class="logo_word">제철</span>
					<span class="logo_word"><span id="four">4</span><span id="two">2</span></span> -->
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
					<li><span class="user">{{ username }}</span></li>
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
				<input type="text" v-model="search" class="searchbar" v-if="!mobileWidth"
					placeholder="과채 가격을 검색해보세요" @keyup.enter.prevent="apply"/>
				<input type="text" v-model="search" class="searchbar" v-if="mobileWidth"
					placeholder="얼마일까?" @keyup.enter.prevent="apply"/>
				<!-- <button class="material-icons" @click.prevent="apply">search</button> -->
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
			'loading',
			'region',
			'board'
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
		if (window.location.protocol !== 'https:') {
			console.log('remember to turn RELOCATION URL on')
			// window.location.href = 'https://jecheol42.herokuapp.com';
		}
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
			'updateTag',
			'updateRegion',
			'updateBoard'
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
			this.updateBoard(true);
			this.getBoard({payload: '', page: 1, header: true, allRegion: this.isLogin? false : true});
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
				this.getBoard({payload:this.search, page: 1, header: true, allRegion: this.region? false : true});
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
		},
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
		height: 130px;
		@media (max-width: 500px) {
			height: 60px;
		}
		.pc-logo {
			width: 345px;
			margin-top: 1em;
		}
		.mb-logo {
			width: 110px;
			margin-top: .8em;
		}
		.scroll-logo {
			width: 51px;
			margin-top: 13px;
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
				.user {
					cursor: default;
					&:hover {
						text-decoration: none;
						color: black;
					}
				}
				&:last-child {
					border-right: none;
				}
				@media ( max-width: 635px ) {
					padding: 0 1.5em;
				}
			}
		}
	}
	.searchbar-wrapper {
		padding-top: 2em;
		.searchbar {
			color: darken($color_prime_green, 35%);
			font-size: 20px;
			line-height: 1.5;
			padding: .3em 1em;
			width: 100%;
			border-radius: .3em;
			border: 1px solid $color_prime_green;
			&::placeholder {
				font-family: 'Gowun Dodum', sans-serif;
				letter-spacing: 1em;
				color: rgba(#76862c, 0.76);
				text-align: center;
			}
			&:focus {
				outline: none;
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
		@media ( max-width: 700px ) {
			.searchbar {
				&::placeholder {
					letter-spacing: .6em;
				}
			}
		}
		@media ( max-width: 500px ) {
			padding-top: 0;
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
			background-color: transparent;
			font-size: 40px;
			@media ( max-width: 500px ) {
				margin-right: .7em;
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
			height: 83px;
		}
		.material-icons {
			margin: 0;
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
	font-family: 'Gowun Dodum', sans-serif;
}
.scrolled-header {
	height: 100px;
	z-index: 98;
	transition: all .1s;
	@media (max-width: 500px) {
		height: 83px;
	}
	.logo {
		position: fixed;
		top: 10px;
		left: 20px;
		width: 13%;
		height: 100px;
		@media (max-width: 350px) {
			top: 14px;
		}
		.pc-logo {
			width: 155px;
			margin-top: 23px;
			@media ( max-width: 760px ) {
				width: 68;
				margin-top: 27px;
			}
		}
	}
	.searchbar-wrapper {
		padding-top: 1.7em;
		@media (max-width: 500px) {
			padding: 0;
		}
		.searchbar {
			// margin-left: 100px;
			width: 70%;
			// transition: .2s all;
			@media ( max-width: 760px ){
				font-size: 18px;
			}
			@media ( max-width: 500px ) {
				margin: 26px 0 0 5%;
				font-size: 15px;
			}
		}
		.material-icons {
			margin-right: 183px;
			@media ( max-width: 500px ) {
				margin-right: 80px;
				font-size: 30px;
				top: 48%;
			}
			@media ( max-width: 350px ) {
				margin-right: 67px;
			}
		}
	}
}

</style>
