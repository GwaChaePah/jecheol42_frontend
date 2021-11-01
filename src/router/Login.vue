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
	background-color: #F4F4E4;
	height: 100vh;
	padding: 70px;
	@include center;
	.loginBox {
		@include center;
		border-radius: 30px;
		box-shadow: 5px 5px 10px 4px rgba(187, 212, 68, 30%);
		min-width: 200px;
		min-height: 250px;
		width: 40vh;
		height: 50vh;
		border: 20px;
		padding: 70px;
		.loginMsg{
			margin: 40px 0px;
			font-size: 40px;
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
			margin: 20px;
			font-size: 17px;
			width: 10vh;
			height: 3vh;
			border-radius: 10px;
			border-color: rgba(187, 212, 68, 30%);
			background-color: #F4F4E4;
		}
	}
	.register {
		padding: 20px;
		a:hover{
			text-decoration: underline;
			color: #707b3c;
		}
	}
}
</style>
