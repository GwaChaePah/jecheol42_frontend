<template>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<header>
		<NavHeader/>
		<div class="searchInner">
			<div class="searchBox">
				<input type="text" placeholder="오늘따라 '가지'가 당기네"/>
				<button class="material-icons">search</button>
			</div>
		</div>
	</header>
</template>

<script>
import NavHeader from './NavHeader';

export default {
	name: 'Header',
	components: {
		NavHeader
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

header {
	background-color: #F4F4E4;
	width: 100%;
	height: 220px;
	display: flex;
	justify-content: center;
	.searchInner {
		width: 100%;
		height: 80px;
		position: absolute;
		top: 120px;
		.searchBox {
			margin: 25px 80px;
			max-width: 1000px;
			width: 90%;
			height: 80px;
			margin: auto;
			border-radius: 40px;
			box-shadow: 5px 5px 10px 4px rgba(187, 212, 68, 30%);
			display: flex;
			background-color: #F4F4E4;
			input {
				width: 70%;
				height: 30px;
				top: 0;
				bottom: 0;
				left: 0;
				right: 100px;
				font-size: 25px;
				margin: auto;
				background-color: #F4F4E4;
				border: 0px solid transparent;
				&::placeholder {
					color:rgba(145, 145, 141, 80%);
				}
				&:focus {
					outline: none;
				}
			}
			.material-icons {
				border: none;
				background-color: transparent;
				font-size: 50px;
				right: 20px;
				margin: auto 60px auto auto;
				color: #BBD444;
				text-shadow: 2px 1px 0 rgba(187, 212, 68, 30%);
			}
		}
	}
}

</style>
