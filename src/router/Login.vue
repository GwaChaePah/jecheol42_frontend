<template>
  <form class="background">
	<!-- <button class="testBtn" @click="testBtn">test</button>
	<button class="testBtn" @click="postTest">post</button> -->
	<div class="loginMsg">
		Sign in to 제철42</div>
	<p class="msgBox" v-if="isLogin">로그인 완료</p>
	<p class="msgBox" v-else-if="isLoginError">아이디와 비밀번호를 확인해주세요</p>
	<div class="loginBox">		
		<div class="ID">
			<label class="key" for="username">User ID</label>
			<input
				id="username"
				type="text" 
				v-model="username"
				required/>
		</div>
		<div class="PW">
			<label class="key" for="password">Password</label>
			<input
				id="password"
				type="password" 
				v-model="password" 
				required/>
			<button 
				type="submit"
				class="loginBtn" 
				@click="login({
					username,
					password
				})"
				>SIGN IN</button>
		</div>	
		<div class="register">
			아직 회원이 아니신가요? <a href="#">회원가입</a>
		</div>
		<p>Password 입력값: {{ password }}</p>
	</div>
  </form>
</template>
 
<script>
import { mapState, mapActions } from 'vuex';
// import axios from 'axios';
 
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


		loginCheak: function(){
			if (this.username == '') {
				alert('아이디를 입력해 주세요.');
				return ;
			}
			if (this.password == '') {
				alert('비밀번호를 입력해 주세요.');
				return ;
			}
		},
		// submitForm:function(){
		// 	console.log(this.username, this.password);
		// 	var url = 'https://jsonplaceholder.typicode.com/users';
		// 	var data = {
		// 		username: this.username,
		// 		password: this.password
		// 	}
		// 	axios
		// 	.post(url, data)
		// 	.then(function(response){
		// 	console.log(response);          
		// 	})
		// 	.catch(function(error){
		// 		console.log(response);
		// 	});
		// },
		// testBtn() {
		// 	axios
		// 	.get("https://reqres.in/api/users?page=2")
		// 	.then(response => {
		// 		//handle success
		// 		console.log(response)
		// 	})
		// 	.catch(error => {
		// 		//handle error
		// 		console.log(error)
		// 	})
		// 	.then(() => {
		// 		console.log("test")
		// 		//always executed
		// 	})
		// },
		// postTest() {
		// 	axios
		// 	.post("https://reqres.in/api/register", {
		// 		email: "eve.holt@reqres.in",
		// 		password: "pistol"
		// 	})
		// 	.then(response => {
		// 		console.log(response); 
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	})
		// }
  	},
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

.loginMsg{
		margin: 30px 0px;
		font-size: 20px;
		color: rgba(#76862c, 0.76);
	}

.background{
	font-family: sans-serif;
	@include center;
	.msgBox {
		width: 250px;
		height: 30px;
		margin: auto;
		text-align: center;
		padding-top: 5px;
		color: beige;
		background: #76862c;
	}
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
			position: relative;
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
		padding-top: 25px;
		a {
			color: rgba(#76862c, 0.76);
			text-decoration: underline;
		}
	}
}
.testBtn {
	width: 100px;
	font-size: 30px;
	background: orange;
}
</style>
