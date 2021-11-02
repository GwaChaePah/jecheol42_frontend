<template>
	<div class="l_wrapper content">
		<div class="login-content">
			<h3>{{ form }}</h3>
			<div class="form-container">
				<form @submit.prevent="loginUser()">
					<div class="login__input">
						<h2>USER ID</h2>
						<input type="text" v-model="form.user"
						id="user" placeholder="ex) yeslee" required/>
					</div>
					<div class="login__input">
						<h2>PASSWORD</h2>
						<input type="password" v-model="form.password"
						id="password" placeholder="Enter your password" required/>
					</div>
					<div class="login__buttons">
						<button class="btn login"	type="submit">로그인</button>
						<a href="#">
							<button class="btn register">회원가입</button>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Login',
	data() {
		return {
			form: {
				user: '',
				password: ''
			}
		}
	},
	methods: {
		loginUser() {
			console.log('user', this.form)
			this.$store.dispatch('auth/loginUser', this.form);
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.login-content {
	// border: 1px solid black;
	background-color: white;
	width: 300px;
	margin: 8em auto;
	padding: 1.8em 0;
	border-radius: .3em;
	h1 {
		text-align: center;
		font-size: 3em;
		margin-bottom: 1em;
	}
	h3 {
		text-align: center;
	}
	.form-container {
		max-width: 150px;
		margin: 0 auto;
		.login__input {
			margin: 1em 0;
			h2 {
				margin: .3em 0;
			}
			input {
				padding: .3em;
				border: none;
				background-color: #eee;
			}
		}
		.login__buttons {
			display: flex;
			justify-content: space-between;
			margin-top: 2em;
			button {
				padding: .6em .8em;
				border: none;
				border-radius: .3em;
				margin-left: .4em;
				&:hover {
					font-weight: bold;
					background-color: rgb(51, 140, 222);
					color: #fff;
				}
			}
			.login {
				background-color: rgb(224, 237, 249);
			}
			.register {
				background-color: rgb(116, 172, 224);
				color: #fff;
			}
		}
	}
}
</style>
