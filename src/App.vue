<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
	<link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet" />
	<div class="app">
		<Header />
		<RouterView />
		<Footer />
	</div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { mapActions } from 'vuex';

export default {
	data: function () {
		return {
			allUsers: [
				{ id: 0, username: "test123456", password: "test1", email: "a@a.com", },
				{ id: 1, username: "test1", password: "test1"},
				{ id: 2, username: "test2", password: "test2"},
			],
		}
	},
	components: {
	Header,
		Footer
	},
	methods: {
		...mapActions('login', ['loggedIn']),
	},
	beforeCreate() {
	this.$store.dispatch('login/loggedIn')
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
