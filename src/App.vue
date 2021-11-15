<template>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
	<link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Gowun+Dodum" rel="stylesheet">
	<div class="app">
		<Header />
		<RouterView />
		<Footer />
	</div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState('login', ['isLogin']),
	},
  components: {
    Header,
		Footer
	},
	methods: {
		...mapActions('login', ['loggedIn']),
	},
	async beforeCreate() {
		let localRefresh = localStorage.getItem("refresh_token")
		if (localRefresh){
			console.log("재로그인!")
			this.$store.dispatch('login/loggedIn')
		}
		else
			console.log("로컬 스토리지는 너굴맨이 싸악 지웠다구!")
	}
}
</script>

<style>
.app {
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
