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
