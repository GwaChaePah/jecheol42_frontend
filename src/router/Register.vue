<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<div class="background">
					<div class="signinBox">
						<h1 class="signinMsg">회원가입</h1>
						<div class="userBox">
							<input for="username"
									type="text"
									class="username" 
									v-model="username"
									placeholder="아이디"
									@change="validateId"
									@input="useId = false"
									required>
							<button @click="sameUser" @change="useId = false">검사</button>
						</div>
						<div class="duplicateId" v-if="duplicateId">사용할 수 없는 아이디입니다</div>
						<div class="useId" v-if="useId">사용할 수 있는 아이디입니다</div>
						<div class="errorId" v-if="errorId">양식에 맞춰 입력해주세요</div>
						<div class="passBox">
							<input for="password"
									type="password" 
									class="password"
									placeholder="비밀번호"
									v-model="password" 
									@change="validatePw"
									required>
						</div>
						<div class="passConBox">
							<input for="passwordConfirmation"
									type="password" 
									class="passwordConfirmation"
									placeholder="비밀번호 확인"
									v-model="passwordConfirmation" 
									@change="comparisonPW"
									required>
						</div>
							<div v-if="notSamePw">비밀번호가 다릅니다</div>
						<div class="regionBox">
							<input for="region"
									type="region"
									class="region" 
									v-model="region"
									placeholder="우편번호"
									required>
							<button @click="testPopup()">우편번호</button>
						</div>
						<button 
							type="submit"
							class="registerBtn"
							v-bind:disabled="!useId"
							@click="register({
								username,
								password,
								region
							})"
							>회원가입
						</button>
						<div class="signIn">
							이미 가입하셨나요? <router-link to="/login">로그인</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
	computed: {
		...mapState('login', ['isLogin']),
	},	
	data: function () {
		return {
			username : '',
			password : '',
			passwordConfirmation : '',
			region: '',
			duplicateId: false,
			useId: false,
			errorId: false,
			notSamePw: false
		}
	},
	mounted() {
		if (this.isLogin) {
			console.log(this.isLogin)
			alert("이미 로그인한 회원입니다.")
			this.$router.go(-1)
		}
	},
  	methods: {
		testPopup() {
			new window.daum.Postcode({
			oncomplete: (data) => {
				this.region = data.zonecode
			}
			}).open();
		},
		comparisonPW() {
			if (this.password !== this.passwordConfirmation)
				this.notSamePw = true
			else
				this.notSamePw = false
		},
		sameUser() {
			let username = this.username
			if (!this.validateId)
				return this.errorId = true
			if (!username)
				return alert("아이디를 입력해 주세요")
			else {
				axios.post("user/api/check/", {
					username: username
				})
				.then(res => {
					if (res.status === 202)
						this.useId = true
						this.errorId = false
						this.duplicateId = false
				})
				.catch(err => {
					this.useId = false
					this.errorId = false
					this.duplicateId = true
				})
			}
		},
		validateId() {
			let username = this.username
			let num = username.search(/[0-9]/);
			let eng = username.search(/[a-z]/);
			let engB = username.search(/[A-Z]/);
			let kor = username.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
			let spe = username.search(/[~!#$%^&*()|<>?:{}]/);
			if (username.length > 20 || username.length < 5) {
				alert("아이디는 최소 5자, 최대 20자 입니다.")
				return false
			} 
			else if (this.username.search(/\s/) !== -1) {
				alert("아이디는 공백을 넣을 수 없습니다")
				return false
			}
			else if(spe !== -1) {
				alert("아이디는 '@' '.' '/' '+' '-' '_'만 넣을 수 있습니다")
				return false
			}
			else if(!(kor < 0)){
				alert("한글은 입력할 수 없습니다.");
				return false;
			}
			else if(!(engB < 0)){
				alert("대문자 영문은 입력할 수 없습니다.");
				return false;
			}
			// else if(num < 0 || eng < 0){
			// 	alert("영문, 숫자를 혼합하여 입력해주세요.");
			// 	return false;
			// }
		},
		validatePw() {
			let password = this.password
			let num = password.search(/[0-9]/);
			let eng = password.search(/[a-z]/);
			let kor = password.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
			let spe = password.search(/[~!#$%^&*()|<>?:{}]/);

			if (password.length > 16 && password.length < 8) {
				alert("비밀번호는 최소 8자, 최대 16자 입니다.")
				return false
			} 
			else if (password.search(/\s/) !== -1) {
				alert("비밀번호는 공백을 넣을 수 없습니다")
				return false
			}
			else if(!(kor < 0)){
				alert("한글은 입력할 수 없습니다.");
				return false;
			}
			// else if(num < 0 || eng < 0 || spe < 0 ){
			// 	alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
			// 	return false;
			// }
		},
		register(registerObj) {
			if (!this.username || !this.password || !this.region)
				return alert("모든 데이터를 입력해주세요.")
			else if (this.notSamePw)
				return alert("비밀번호를 확인해주세요.")
			else if (this.username == this.password)
				return alert("아이디와 비밀번호는 같을 수 없습니다.")
			axios.post("user/api/register/", {
				"user": {
					"username": registerObj.username,
					"password": registerObj.password
				},
				"region": {
					"region": registerObj.region
				}
			})
			.then(res => {
				this.$router.push("/")
			})
			.catch(err => {
				console.log("회원 가입에 실패했습니다. 관리자에게 문의 바랍니다.")
				console.log(err)
			})
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/main.scss';
@import '../scss/typography.scss';

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

.l_wrapper {
	max-width: 1000px;
	max-height: 1500px;
	width: auto;
	margin: 0 auto;
	padding: 20px;
	position: relative;
	.content {
	height: 100%;
		.background{
			height: 400px;
			font-family: sans-serif;
			margin-top: 50px;
			@include center;
			.signinBox {
				.signinMsg{
					margin: 30px 0px;
					font-size: 20px;
					color: rgba(#76862c, 0.76);
				}
				@include center;
				// border-radius: .3em;
				// box-shadow: 0 0 10px 0 $color_shadow_03;
				// border: 20px;
				width: 100%;
				height: 98%;
				padding: 20px;
				.userBox{
					display: flex;
					width: 70%;
					max-width: 300px;
					margin: auto;
					border-bottom: 1px solid #ddd;
					input{
						width: 70%;
						margin: 10px 0px 10px 10px;
						border-color: transparent;
					}
					button{
						width: 30%;
						margin: auto;
						max-width: 50px;
						border-radius: 3px;
						color: white;
						background: rgba(#76862c, 0.76);
						border-color: transparent;
					}
				}
				.duplicateId{
					font-size: 13px;
				}
				.useId{
					font-size: 13px;
				}
				.errorId{
					font-size: 13px;
				}
				.passBox{
					display: flex;
					width: 70%;
					max-width: 300px;
					margin: auto;
					border-bottom: 1px solid #ddd;
					input{
						width:100%;
						margin: 10px;
						border-color: transparent;
					}
				}
				.passConBox{
					display: flex;
					width: 70%;
					max-width: 300px;
					margin: auto;
					border-bottom: 1px solid #ddd;
					input{
						width: 100%;
						margin: 10px;
						border-color: transparent;
					}
				}
				.regionBox{
					display: flex;
					width: 70%;
					max-width: 300px;
					margin: auto;
					border-bottom: 1px solid #ddd;
					input{
						width: 60%;
						margin: 10px;
						border-color: transparent;
					}
					button{
						width: 40%;
						margin: auto;
						max-width: 70px;
						border-radius: 3px;
						color: white;
						background: rgba(#76862c, 0.76);
						border-color: transparent;
					}
				}
				.postalCodeLink{
					font-size: 13px;
				}
				.registerBtn{
					margin-top: 22px;
					vertical-align: middle;
					font-size: 17px;
					width: 70%;
					max-width: 300px;
					height: 12%;
					padding: 5px;
					border-radius: .3em;
					border-color: rgba(187, 212, 68, 30%);
					box-shadow: 0 0 10px 0 $color_shadow_03;
					background-color: rgba(#76862c, 0.76);
					color: white;
				}
			}
			.signIn {
				font-size: 13px;
				padding: 25px 0px;
				a {
					color: rgba(#76862c, 0.76);
					text-decoration: underline;
				}
			}
		}
	}
}
</style>