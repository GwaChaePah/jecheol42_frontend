<template>
	<div class="background">
		<form class="createPostArea">
			<div class="createInfo">게시글 작성</div>
				<div class="tag">
					<select v-model="form.tag">
						<option disabled value="">소분/나눔</option>
  						<option>소분</option>
  						<option>나눔</option>
					</select>
				</div>
				<div class="title">
					<div class="key">title</div>
					<div class="stick"></div>
					<input v-model="form.title" type="string" placeholder="제목이에용"/>
				</div>
				<div class="price">
					<div class="key">price</div>
					<div class="stick"></div>
					<input v-if="form.tag !== '나눔'" v-model="form.price" type="number" placeholder="가격이에용" min="0"/>
					<div v-else> {{form.price = 0}} </div>
				</div>
				<div class="content">
					<div>{{form.user}}</div>
					<div class="key">content</div>
					<div class="stick"></div>
					<textarea v-model="form.content" type="string" placeholder="내용이에용"/>
				</div>
				<div>
					<input multiple @change="onInputImage()" ref="postImage" type="file">
				</div>
			<button class="registerBtn" @click="checkForm()">작성</button>
			<button class="cancelBtn" @click="cancel()">취소</button>	
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'CreatePost',
	data() {
		return{
			form: {
				id:'',
				title: '',
				tag: '',
				created_at: '',
				user: '',
				region: '',
				content: '',
				price: '',
				image: []
			}
		}
	},
	methods: {
		onInputImage() {
			this.form.image[0] = this.$refs.postImage.files[0];
			console.log(this.form.image[0]);
		},
		checkForm(e){
			if (!this.form.title) {
				confirm("제목은 필수입니다.")
			}
			if (!this.form.tag) {
				confirm("카테고리를 설정해주세요.")
			}
			if (!this.form.content) {
				confirm("내용은 필수입니다.")
			}
			if (this.form.tag === "소분" && !this.form.price) {
				confirm("가격을 입력해주세요.")
			}
			if (this.form.title && this.form.tag && this.form.content) {
				if ((this.form.tag === "소분" && this.form.price) ||
					((this.form.tag === "나눔" || this.form.tag === "완료") && !this.form.price))
					this.register();
			}
		},
		async register() {
			let variable = this.form.image[0];
			const postObj =
			{
				id: this.id,
				tag: this.form.tag,
				region: "중구",
				title: this.form.title,
				user: "test",
				content: this.form.content,
				price: this.form.price,
				created_at: this.currentDate(),
				image: variable,
				view_count: 0
			};
			console.log("image is this " + postObj);
			await axios({
				url: 'posts',
				method: 'post',
				data: postObj
			})
			this.$router.push('/board');
		},
		currentDate() {
			const current = new Date();
			const month = (current.getMonth() + 1 < 10) ? '0' + current.getMonth() + 1 : current.getMonth() + 1;
			const date = (current.getDate() < 10) ? '0' + current.getDate() : current.getDate();
			const minute = (current.getMinutes() < 10) ? '0' + current.getMinutes() : current.getMinutes();
			const hour = (current.getHours() < 10) ? '0' + current.getHours() : current.getHours();
			const fullDate = `${current.getFullYear()}.${month}.${date} ${hour}:${minute}`
			return fullDate;
		},
		cancel() {
			this.$router.push('/board')
		}
	}
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
.background{
	padding: 300px 70px 70px 70px;
	@include center;
	.createPostArea {
		@include center;
		border-radius: .3em;
		box-shadow: 0 0 10px 0 $color_shadow_03;
		min-width: 200px;
		min-height: 250px;
		width: 100vh;
		height: 50vh;
		border: 20px;
		padding: 30px;
		.createInfo{
			margin: 0px 0px;
			font-size: 20px;
			color: rgba(#76862c, 0.76);
		}
		.title {
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
				color: rgba(#76862c, 0.76);
			}
		}
		.content {
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
				color: rgba(#76862c, 0.76);
			}
		}
		.registerBtn {
			margin: 40px;
			font-size: 17px;
			width: 10vh;
			height: 3vh;
			border-radius: .3em;
			border-color: rgba(187, 212, 68, 30%);
			box-shadow: 0 0 10px 0 $color_shadow_03;
			background-color: rgba(#76862c, 0.76);
			color: white;
		}
		.cancelBtn {
			margin: 40px;
			font-size: 17px;
			width: 10vh;
			height: 3vh;
			border-radius: .3em;
			border-color: rgba(187, 212, 68, 30%);
			box-shadow: 0 0 10px 0 $color_shadow_03;
			background-color: white;
			color: rgba(#76862c, 0.76);
		}
	}
}
</style>
