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
		same : false
    }
  },
  methods: {
	comparisonPW: function() {
		if (this.password === this.passwordConfirmation)
			this.same = true
		else
			this.notSame = true
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
