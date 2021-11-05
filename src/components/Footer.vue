<template>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<div>
		<ul>
			<li><span class="material-icons">copyright</span> 2021 과채파.</li>
		</ul>
		<ul>
			<li><a href="https://github.com/GwaChaePah"><img src="../assets/Github-Mark-32px.png" />GitHub</a></li>
			<li><span class="material-icons">room</span> 서울시 강남구 개포로 416</li>
			<li><span class="material-icons">mail</span> GwaChaePah@gmail.com</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			height: false,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

div {
	padding: .5em 0;
	height: 80px;
	background-color: #f8f8f8;
	text-align: center;
	ul {
		margin-bottom: .5em;
		li {
			display: inline-block;
			margin: 0 15px;
			img {
				width: 15px;
				height: auto;
				transform: translateY(1px);
				margin: 0 8px;
			}
			.material-icons {
				border: none;
				font-size: 1em;
				transform: translateY(1px);
			}
		}
	}
}
</style>
