<template>
	<div class="background">
		<form class="createPostArea">
			<div class="createInfo">게시글 작성</div>
				<div class="title">
					<div class="key">제목</div>
					<div class="stick"></div>
					<input class="titlebox" v-model="form.title" type="string" placeholder="제목이에용"/>
				</div>
				<div class="content">
					<!-- <div>{{form.user}}</div> -->
					<div class="key">내용</div>
					<div class="stick"></div>
					<textarea class="textbox" v-model="form.content" type="string" placeholder="내용이에용"/>
				</div>
				<div class="tag">
					<select v-model="form.tag">
						<option disabled value="">소분/나눔</option>
  						<option value=0>소분</option>
  						<option value=1>나눔</option>
					</select>
					<!-- <div class="key">분류</div>
					<div class="stick"></div>
					<input type="radio" id='sale' value=0 v-model="form.tag">
					<label for="sale">소분</label>
					<input type="radio" id='share' value=1 v-model="form.tag">
					<label for="share">나눔</label> -->
				</div>
				<div class="price">
					<div class="key">가격</div>
					<div class="stick"></div>
					<input v-if="form.tag !== '1'" v-model="form.price" type="number" placeholder="가격이에용" min="0"/>
					<div class="zero" v-else> {{form.price = 0}} </div>
				</div>
				<div>
					<input multiple @change="onInputImage()" ref="postImage" type="file">
				</div>
			<button class="registerBtn" @click.prevent="checkForm()">작성</button>
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
				user_key: '',
				content: '',
				price: '',
				image1: '',
				image2: '',
				image3: ''
			}
		}
	},
	methods: {
		onInputImage() {
			this.form.image1 = this.$refs.postImage.files[0];
			this.form.image2 = this.$refs.postImage.files[1] ? this.$refs.postImage.files[1] : '';
			this.form.image3 = this.$refs.postImage.files[2] ? this.$refs.postImage.files[2] : '';
		},
		checkForm(e){
			if (!this.form.title)
				confirm("제목은 필수입니다.")
			if (!this.form.tag)
				confirm("카테고리를 설정해주세요.")
			if (!this.form.content)
				confirm("내용은 필수입니다.")
			if (this.form.tag === "소분" && !this.form.price)
				confirm("가격을 입력해주세요.")
			if (this.$refs.postImage.files[3])
				confirm("사진은 3장까지 선택 가능합니다.")
			if (!this.$refs.postImage.files[0])
				confirm("최소 하나의 사진은 필수입니다.")
			if (this.form.title && this.form.tag && this.form.content) {
				if ((this.form.tag === '0' && this.form.price) ||
					((this.form.tag === '1' || this.form.tag === '2') && !this.form.price)) {
						if (!this.$refs.postImage.files[3] && this.$refs.postImage.files[0])
							this.register();
					}
				}
		},
		async register() {
			let variable = this.form.image1;
			let variable1 = this.form.image2;
			let variable2 = this.form.image3;
			let userInfo = JSON.parse(localStorage.getItem("userInfo"));
			let pk = userInfo.pk;
			const index = this.$route.params.id;
			const postObj =
			{
				id: index,
				tag: this.form.tag,
				title: this.form.title,
				user_key: pk,
				content: this.form.content,
				price: this.form.price,
				created_at: this.currentDate(),
				image1: variable,
				image2: variable1,
				image3: variable2,
				view_count: 0
			};
			console.log(postObj.user_key);
			let formData = new FormData();
			for (let key in postObj) {
				formData.append(key, postObj[key]);
			}
			let res;
			res = await axios({
				url: 'post/api/',
				method: 'post',
				data: formData,
				headers: {
        			'Content-Type' : 'multipart/form-data'
              }
			})
			console.log(res);
			if (res.status == 201)
			{
				this.$store.dispatch('post/searchPostWithId', res.data.id);
				// this.$store.dispatch('post/getBoard', {	payload:'' });
				this.$router.push(`/post/${res.data.id}`);
			}
			else
				console.log(res);
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
		.tag {
			.key {			
				@include block(20%);
				border: solid black;
				border-width: 0px 1px 0px 0px;
			}		
			.stick {
				@include block(10%);
			}
			// select {
			// 	margin: 0 .1em;
			// 	padding: .4em 0.2em;
			// 	letter-spacing: 2px;
			// 	font-size: 15px;
			// 	text-align: center;
			// 	color: rgba(#454b2a, 0.76);
		}
		.price {
				padding: 3px;
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
				border: 2px solid rgba(#76862c, 0.76);
				width: 50vw;
				height: 40px;
				// border: 0 none;
			}
			.zero {
				@include block(70%);
				@include input;
				border: 2px solid rgba(#76862c, 0.76);
				width: 30%;
				height: 40px;
				text-align: center;
				vertical-align: middle;
			}
			// select {
			// 	margin: 0 .1em;
			// 	padding: .4em 0.2em;
			// 	letter-spacing: 2px;
			// 	font-size: 15px;
			// 	text-align: center;
			// 	color: rgba(#454b2a, 0.76);
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
				color: black;
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
			textarea {
				@include block(70%);
				@include input;
				color: black;
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
