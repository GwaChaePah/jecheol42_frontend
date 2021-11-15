<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<div>
					<h1>회원가입 페이지가 될 어쩌구</h1>
					<div>
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
							<input type="region" class="region" v-model="region" required>
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
				console.log("사용이 가능한 어쩌구 웅앵")
				this.useId = true
				this.duplicateId = false
		})
		.catch(err => {
				console.log("사용이 불가능한 어쩌구 웅앵")
				this.useId = false
				this.duplicateId = true
		})
	},
	validateId() {
		let username = this.username
		let num = username.search(/[0-9]/);
		let eng = username.search(/[a-z]/);
		let spe = username.search(/[~!#$%^&*()|<>?:{}]/);
		if (this.username.length > 20 ) {
			alert("아이디는 최대 20자 입니다.")
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
		// else if(eng < 0){
		// 	alert("영문으로 입력해주세요.");
		// 	return false;
		// }
		// else if(num < 0 || eng < 0){
		// 	alert("영문, 숫자를 혼합하여 입력해주세요.");
		// 	return false;
		// }
		else
			console.log("아이디 통과!")
	},
	validatePw() {
		let password = this.password
		let num = password.search(/[0-9]/g);
		let eng = password.search(/[a-z]/ig);
		let spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

		if (password.length > 16 ) {
			alert("비밀번호는 최대 20자 입니다.")
			return false
		} 
		else if (password.search(/\s/) !== -1) {
			alert("비밀번호는 공백을 넣을 수 없습니다")
			return false
		}
		// else if(eng < 0){
		// 	alert("영문을 입력해주세요.");
		// 	return false;
		// }
		// else if(num < 0 || eng < 0 || spe < 0 ){
		// 	alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
		// 	return false;
		// }
		else
			console.log("비밀번호 통과!")
	},
	register(registerObj) {
		if (!this.username || !this.password || !this.region)
			return alert("모든 데이터를 입력해주세요.")
		else if (this.notSamePw)
			return alert("비밀번호를 확인해주세요.")
		else if (this.username == this.password)
			return alert("아이디와 비밀번호는 같을 수 없습니다.")
		else console.log(registerObj)
		// axios.post("user/api/register/", {
		// 	"user": {
		// 			"username": registerObj.username,
		// 			"password": registerObj.password
		// 			},
		// 	"region": {
		// 				"region": registerObj.region
		// 			}
		// })
		// .then(res => {
		// 	console.log("가입 완")
		// })
		// .catch(err => {
		// 	console.log("가입 실패")
		// })
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
	
}
</style>