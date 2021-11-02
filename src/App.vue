<template>
	<div class="app">
		<Header />
		<RouterView />
		<Footer />
	</div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
		Footer
  },
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
