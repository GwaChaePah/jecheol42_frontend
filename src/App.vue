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
import { mapActions } from 'vuex';

export default {
	components: {
	Header,
		Footer
<<<<<<< HEAD
  },
  methods: {
	  ...mapActions('login', ['loggedIn']),
  },
  beforeCreate() {
  	// this.$store.dispatch('login/loggedIn')
=======
	},
	methods: {
		...mapActions('login', ['loggedIn']),
	},
	async beforeCreate() {
		this.$store.dispatch('login/loggedIn')
>>>>>>> a42de4fb274c95ee92b308ac9af2183c6cb96bbd
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
