<template>
	<div class="l_main">
		<div class="l_wrapper content">
			<div class="not_found">
				<div class="material-icons-outlined">contact_support</div>
				<h1>404</h1>
				<p>해당 페이지는 존재하지 않습니다.</p>
				<p>여기까지 와주신 것에 대해</p>
				<p>말랑콩떡큐티깜찍키세스고양이 순돌이가</p>
				<p>대신 감사의 인사를 드립니다.</p>
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
	background: url('https://cdn.discordapp.com/attachments/772716600188076033/911824578949574666/404.png');
	background-position: bottom;
	background-size: contain;
	background-repeat: no-repeat;
	height: 100vh;
	.not_found {
		width: 100%;
		text-align: center;
		margin-top: 12em;
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
