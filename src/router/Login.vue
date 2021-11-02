<template>
	<div class="background">
		<div class="loginBox">
			<div class="loginMsg">LOGIN</div>
			<div class="ID">
				<div class="key">ID</div>
				<div class="stick">  </div>
				<input type="idBox" placeholder="ID"/>
			</div>
			<div class="PW">
				<div class="key">PW</div>
				<div class="stick"></div>
				<input type="pwBox" placeholder="Password"/>
			</div>
			<button class="loginBtn" @click="loginBtn">LOGIN</button>
		</div>
		<div class="register">
			아직 회원이 아니신가요? <a href="#">회원가입</a>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/commons.scss';

@mixin center {
	justify-content: center;
	align-items: center;
	margin: auto;
	text-align: center;
}
@mixin input {
	width: 15vh;
	height: 3vh;
	padding-left: 8px;
	font-size: 15px;
}
@mixin block($size){
	width: $size;
	display: inline-block;
}
.background{
	padding: 300px 70px 70px 70px;
	@include center;
	.loginBox {
		@include center;
		border-radius: .3em;
		box-shadow: 0 0 10px 0 $color_shadow_03;
		min-width: 200px;
		min-height: 250px;
		width: 40vh;
		height: 50vh;
		border: 20px;
		padding: 70px;
		.loginMsg{
			margin: 40px 0px;
			font-size: 40px;
			color: rgba(#76862c, 0.76);
		}
		.ID {
			padding: 10px;
			margin: auto;
			display: block;
			.key {			
				@include block(20%);
				border: solid black;
				border-width: 0px 1px 0px 0px;
			}		
			.stick {
				@include block(10%);
			}
			input {
				@include block(70%);
				@include input;
				color: rgba(#76862c, 0.76);
			}
		}
		.PW {
			padding: 10px;
			margin: auto;
			display: block;
			.key {			
				@include block(20%);
				border: solid black;
				border-width: 0px 1px 0px 0px;
			}		
			.stick {
				@include block(10%);
			}
			input {
				@include block(70%);
				@include input;
			}
		}
		.loginBtn {
			margin: 40px;
			font-size: 17px;
			width: 10vh;
			height: 3vh;
			border-radius: .3em;
			border-color: rgba(187, 212, 68, 30%);
			box-shadow: 0 0 10px 0 $color_shadow_03;
			background-color: rgba(#76862c, 0.76);
			color: white;
		}
	}
	.register {
		padding: 20px;
		a:hover{
			text-decoration: underline;
			color: rgba(#76862c, 0.76);
		}
	}
}
</style>
