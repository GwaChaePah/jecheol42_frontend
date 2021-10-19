<template>
	<div class="inner">
		<img class="logo" @click="toMain"	src="static/대지1.png" alt="제철42"/>
		<div class="main-menu">
			<ul class="menu">
				<li>
					<a href="#">Info</a>
				</li>
				<li>
					<a @click="toBoard">Board</a>
				</li>
			</ul>
		</div>
		<div class="sub-menu">
			<ul class="menu" v-if="!currentUser.name">
				<li>
					<a @click="toLogin">Sign In</a>
				</li>
				<li>
					<a href="#">Sign up</a>
				</li>
			</ul>
			<ul class="menu" v-else>
				<li>
					<a>{{ currentUser.name }}</a>
				</li>
				<li>
					<a @click="logoutUser">Sign out</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'NavHeader',
	data() {
		return {
			navigations: [
				{
					name: 'Main',
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
		])
	},
	mounted() {
		this.$store.dispatch('auth/loadUsers');
	},
	methods: {
		toMain() {
			this.$router.push('/');
		},
		toLogin() {
			this.$router.push('/login');
		},
		toBoard() {
			this.$router.push('/board');
		},
		logoutUser() {
			this.$store.dispatch("auth/logoutUser");
		}
	}
}
</script>

<style lang="scss" scoped>

.inner {
	width: 80%;
	height: 120px;
	margin: 0 auto;
	position: relative;
	.logo {
		/* 가운데 정렬 -> 가로, 세로 값이 명확하게 지정될 것 (웹에서 logo의 길이를 알 수 있게) / tblr 값이 지정될 것 / margin은 auto */
		width: 220px;
		height: 100px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.main-menu {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 10px;
		display: flex;
		ul.menu {
			top: 0;
			bottom: 0;
			margin: auto;
			font-family: Arial, sans-serif;
			display: flex;
			li {
				position: relative;
				&::before {
					content: "";
					width: 1px;
					height: 12px;
					background-color: #FA7B53;
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
				}
				&:first-child:before {
					display: none;
				}
				a {
					font-size: 15px;
					padding: 11px 16px;
					display: block;
					color: #656565;
					&:hover {
						color: #000
					}
				}
			}
		}
	}
	.sub-menu {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		right: 10px;
		display: flex;
		ul.menu {
			top: 0;
			bottom: 0;
			margin: auto;
			font-family: Arial, sans-serif;
			display: flex;
			li {
				position: relative;
				&::before {
					content: "";
					width: 1px;
					height: 12px;
					background-color: #FA7B53;
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
				}
				&:first-child:before {
					display: none;
				}
				a {
					font-size: 15px;
					padding: 11px 16px;
					display: block;
					color: #656565;
					&:hover {
						color: #000
					}
				}
			}
		}
	}
}

</style>
