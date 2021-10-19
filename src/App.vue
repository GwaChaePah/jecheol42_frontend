<template>
  <Header />
	<RouterView/>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style>
.app {
	min-height: 100vh;
	position: relative;
}
</style>
