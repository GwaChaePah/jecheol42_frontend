<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<div>
					<h1 class="signinMsg">회원가입</h1>
					<div class="background">
						<div for="username">아이디: </div>
						<input type="text" 
								class="username" 
								v-model="username" 
								@change="validateId"
								@input="useId = false"
								required>
						<button @click="sameUser" @change="useId = false">중복 확인</button>
						<div class="duplicateId" v-if="duplicateId">사용할 수 없는 아이디입니다</div>
						<div class="useId" v-if="useId">사용할 수 있는 아이디입니다</div>
						<div>
							<div for="password">비밀번호: </div>
							<input type="password" 
									class="password" 
									v-model="password"  
									@change="validatePw"
									required>
						</div>
						<div>
							<div for="passwordConfirmation">비밀번호 확인: </div>
							<input type="password" 
									class="passwordConfirmation" 
									v-model="passwordConfirmation" 
									@change="comparisonPW"
									required>
							<div v-if="notSamePw">비밀번호가 다릅니다</div>
						</div>
						<div>
							<div for="local">지역: </div>
							<input type="region" 
									class="region" 
									v-model="region" 
									required>
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
							>회원가입</button>
					</div>
					<p>Password 입력값: {{ password }}</p>
					<p>passwordConfirmation 입력값: {{ passwordConfirmation }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	
  data: function () {
    return {
		username : '',
		password : '',
        passwordConfirmation : '',
		region: '',
		duplicateId: false,
		useId: false,
		notSamePw: false
    }
  },
  methods: {
	comparisonPW() {
		if (this.password !== this.passwordConfirmation)
			this.notSamePw = true
		else
			this.notSamePw = false
	},
	sameUser() {
		let username = this.username
		if (!username)
			return alert("아이디를 입력해 주세요")
		axios.post("user/api/check/", {
			username: username
		})
		.then(res => {
			if (res.status === 202)
				this.useId = true
				this.duplicateId = false
		})
		.catch(err => {
				this.useId = false
				this.duplicateId = true
		})
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
			console.log("가입 완료")
		})
		.catch(err => {
			console.log("가입 실패")
		})
	}
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/main.scss';
@import '../scss/typography.scss';

.content {
	text-align: center;
	.signinMsg{
		margin: 30px 0px;
		font-size: 20px;
		color: rgba(#76862c, 0.76);
	}
}
</style>