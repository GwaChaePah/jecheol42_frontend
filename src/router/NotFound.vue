<template>
	<div class="l_main">
		<div class="l_wrapper content">
			<div class="not_found">
				<div class="material-icons-outlined">contact_support</div>
				<h1>404</h1>
				<p>페이지 업서오...</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.l_main {
	background: url('https://cdn.pixabay.com/photo/2013/11/25/17/28/pumpkin-218237_960_720.jpg');
	background-position: bottom;
	background-size: contain;
	height: 100vh;
	.not_found {
		width: 100%;
		text-align: center;
		margin-top: 13em;
		// color: darken($color_prime_orange, 20%);
		.material-icons-outlined {
			font-size: 4em;
		}
		h1 {
			display: block;
			font-size: 4em;
		}
	}
}
</style>
