<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<div class="background">
					<!-- <p class="msgBox" v-if="!isLogin">로그인 완료</p>
					<p class="msgBox" v-else-if="isLoginError">아이디와 비밀번호를 확인해주세요</p> -->
					<div class="loginBox">		
					<div class="loginMsg">
						제철42 로그인</div>
						<div class="textBox">
							<div class="ID">
								<label class="key" for="username"></label>
								<input
									id="username"
									type="text" 
									v-model="username"
									placeholder="아이디"
									required/>
							</div>
							<div class="PW">
								<label class="key" for="password"></label>
								<input
									id="password"
									type="password" 
									v-model="password"  
									placeholder="비밀번호"
									@keydown.enter="login({
										username,
										password
									})"
									required/>
							</div>	
								<button 
									type="submit"
									class="loginBtn"
									v-if="!isLogin"
									@click="login({
										username,
										password
									})"
									>로그인</button>
								<button class="loginBtn" v-if="isLogin">로그인 완료</button>
							<div class="register">
								아직 회원이 아니신가요? <router-link to="/register">회원가입</router-link>
							</div>
						</div>
					</div>
				</div>
				<!-- <p style="text-align: center">Password 입력값: {{ password }}</p> -->
			</div>
		</div>
	</div>
</template>
 
<script>
import { mapState, mapActions } from 'vuex';
 
export default {
	computed: {
		...mapState('login', ['isLogin', 'isLoginError']),
	},
	data:function(){
    	return{
			username : '',
			password : '',
		}
	},
	methods:{
		...mapActions('login', ['login']),
  	},
	mounted() {
		if (this.isLogin) {
			alert("이미 로그인한 회원입니다.")
			this.$router.go(-1)
		}
	}
	
};
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

.l_main {
	height: 100vh;
}
.l_wrapper {
	max-width: 1000px;
	max-height: 1500px;
	width: auto;
	margin: 0 auto;
	padding: 30px;
	position: relative;
		.content {
		height: 100%;
	}
}
.background{
	height: 400px;
	font-family: sans-serif;
	margin-top: 50px;
	@include center;
	.loginMsg{
		margin: 30px 0px;
		font-size: 20px;
		color: rgba(#76862c, 0.76);
	}
	.loginBox {
		@include center;
		width: 100%;
		padding: 20px;
		.textBox {
			width: 80%;
			height: 100%;
			margin: auto;
			display: block;
			.ID {
				width: 100%;
				max-width: 300px;
				margin: auto;
				border-bottom: 1px solid #ddd;
				input{
					width: 90%;
					padding: 8px;
					margin: 10px 0px;
					color: rgba(#76862c, 0.76);
					border-color: transparent;
				}
			}
			.PW {
				width: 100%;
				max-width: 300px;
				margin: auto;
				border-bottom: 1px solid #ddd;
				input{
					width: 90%;
					padding: 8px;
					margin: 10px 0px;
					color: rgba(#76862c, 0.76);
					border-color: transparent;
				}
			}
			.loginBtn {
				margin-top: 22px;
				vertical-align: middle;
				font-size: 17px;
				width: 90%;
				max-width: 300px;
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
		padding: 25px 0px;
		a {
			color: rgba(#76862c, 0.76);
			text-decoration: underline;
		}
	}
}
</style>
