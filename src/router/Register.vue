<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="content">
				<div>
					<h1>회원가입 페이지가 될 어쩌구</h1>
					<div>
						<div for="username">사용자 이름: </div>
						<input type="text" class="username" v-model="username" @change="validateId"/>
						<div>
							<div for="password">비밀번호: </div>
							<input type="password" class="password" v-model="password">
						</div>
						<div>
							<div for="passwordConfirmation">비밀번호 확인: </div>
							<input type="password" class="passwordConfirmation" v-model="passwordConfirmation">
							<div v-if="notSame">비밀번호가 다릅니다</div>
						</div>
						<button @click="comparisonPW">회원가입</button>
					</div>
					<p>Password 입력값: {{ password }}</p>
					<p>passwordConfirmation 입력값: {{ passwordConfirmation }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data: function () {
    return {
        username : null,
        password : null,
        passwordConfirmation : null,
		notSame : false,
		same : false,
		allUsers: [
			{ id: 0, username: "test123456", password: "test1"},
			{ id: 1, username: "test1", password: "test1"},
			{ id: 2, username: "test2", password: "test2"},
		],
    }
  },
  methods: {
	comparisonPW: function() {
		if (this.password === this.passwordConfirmation)
			this.same = true
		else
			this.notSame = true
	},
	sameUser() {
		let select = null
		this.allUsers.forEach(user => {
			if (user.username === this.username)
			select = user
		})
		if (select === null)
			console.log("안겹쳐")
		else
			console.log("겹쳐")
	},
	validateId() {
		if (this.username.length < 6 ) {
			alert("아이디는 최소 6자리 이상입니다.")
			return false
		} 
		else if (this.username.search(/\s/) !== -1) {
			alert("아이디는 공백을 넣을 수 없습니다")
			return false
		}
		else {
			let select = null
			this.allUsers.forEach(user => {
				if (user.username === this.username)
				select = user
			})
			if (select !== null)
				alert("아이디를 사용할 수 없습니다")
			else
				console.log("아이디 통과!")
		}
	},
	validatePw() {
		let password = this.password
		let num = password.search(/[0-9]/g);
		let eng = password.search(/[a-z]/ig);
		let spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

		if (password.length < 8 || password.length > 20 ) {
			alert("비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.")
			return false
		} 
		else if (this.password.search(/\s/) !== -1) {
			alert("비밀번호는 공백을 넣을 수 없습니다")
			return false
		}
		else if(num < 0 || eng < 0 || spe < 0 ){
			alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
			return false;
		}
		else
			console.log("비밀번호 통과!")
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