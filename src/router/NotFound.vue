<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
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
	background-image: url('https://en.pimg.jp/063/203/388/1/63203388.jpg');
	background-repeat: no-repeat;
	background-position: center;
	height: 80vh;

	.content {
		width: 100%;
		text-align: center;
		margin: 1.5em auto;
		// color: darken($color_prime_orange, 20%);
		h1 {
			font-size: 4em;
		}
	}
}
</style>
