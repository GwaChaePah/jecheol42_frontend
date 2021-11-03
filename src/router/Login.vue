<template>
	<div class="background">
		<div class="loginMsg">Sign in to 제철42</div>
		<div class="loginBox">
			
			<div class="ID">
				<div class="key">User ID</div>
				<input type="idBox"/>
				<!-- <input type="idBox" placeholder="ID"/> -->
			</div>
			<div class="PW">
				<div class="key">Password</div>
				<input type="pwBox"/>
				<!-- <input type="pwBox" placeholder="Password"/> -->
				<button class="loginBtn" @click="loginBtn">SIGN IN</button>
			</div>
			
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

.loginMsg{
		margin: 40px 0px;
		font-size: 20px;
		color: rgba(#76862c, 0.76);
	}

.background{
	// padding: 70px;
	@include center;
	.loginBox {
		@include center;
		border-radius: .3em;
		box-shadow: 0 0 10px 0 $color_shadow_03;
		width: 250px;
		height: 250px;
		border: 20px;
		padding: 20px;
		.ID {
			padding: 8px 10px 10px 10px;
			margin: auto;
			text-align: left;
			.key {
				width: 100%;
			}
			input {
				padding: 8px;
				width: 100%;
				color: rgba(#76862c, 0.76);
			}
		}
		.PW {
			padding: 10px;
			margin: auto;
			text-align: left;
			// display: block;
			.key {
				width: 100%;
			}
			input {
				padding: 8px;
				width: 100%;
				color: rgba(#76862c, 0.76);
			}
			.loginBtn {
				margin-top: 22px;
				vertical-align: middle;
				font-size: 17px;
				width: 100%;
				height: 15%;
				padding: 8px;
				border-radius: .3em;
				border-color: rgba(187, 212, 68, 30%);
				box-shadow: 0 0 10px 0 $color_shadow_03;
				background-color: rgba(#76862c, 0.76);
				color: white;
			}
		}
		
	}
	.register {
		font-size: 13px;
		padding: 20px;
		a {
			color: rgba(#76862c, 0.76);
			text-decoration: underline;
		}
	}
}
</style>
