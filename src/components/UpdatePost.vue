<template>
	<div class="background">
		<form class="createPostArea">
			<div class="createInfo">게시글 수정</div>
				<div class="tag">
					<select v-model="form.tag">
						<option disabled value="">소분/나눔</option>
  						<option value=0>소분</option>
  						<option value=1>나눔</option>
						<option value=2>완료</option>
					</select>
				</div>
				<div class="title">
					<div class="key">title</div>
					<div class="stick"></div>
					<input id="title" v-model="form.title" type="string" placeholder="제목이에용"/>
				</div>
				<div class="price">
					<div class="key">price</div>
					<div class="stick"></div>
					<input v-if="form.tag !== '1' && form.tag !== '2'" v-model="form.price" type="number" placeholder="가격이에용" min="0"/>
					<div v-else> {{form.price = 0}} </div>
				</div>
				<div class="content">
					<div class="key">content</div>
					<div class="stick"></div>
					<!-- {{thePost.content}} -->
					<textarea v-model="form.content" type="string" placeholder="내용이에용"/>
				</div>
				<div>
					<input multiple @change='onInputImage()' ref="postImage" type="file">
				</div>
			<button class="registerBtn" @click="checkForm()">수정</button>
			<button class="cancelBtn" @click="cancel()">취소</button>	
		</form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

export default {
	name: 'UpdatePost',
	data() {
		const index = this.$route.params.id;
		return {
			form: {
				id: index,
				title: '',
				tag: '',
				created_at: '',
				user: '',
				region: '',
				content: '',
				price: '',
				image: [],
				view_count: ''
			}
		}
	},
	computed: {
		...mapState('post', ['post'])
	},
	created : function() {
		setTimeout(() => { 
			this.form.title = this.post.title;
			this.form.tag = this.post.tag;
			this.form.price = this.post.price;
			this.form.content = this.post.content;
			this.form.user = this.post.user;
			this.form.image1 = this.post.image;
			this.form.region = this.post.region;
			this.form.view_count = this.post.view_count;
		}, 100);
	},
	methods: {
		...mapActions('post', ['updatePost']),
		onInputImage() {
<<<<<<< HEAD
			if (this.form.image1 = undefined)
=======
			if (this.form.image1 == undefined)
>>>>>>> ebf88c9e66e24badd65ba16f26c58ec582b8dfd2
				this.form.image1 = this.post.image1;
			else
				this.form.image1 = this.$refs.postImage.files[0];
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
			// if (!this.$refs.postImage.files[0])
			// 	confirm("최소 하나의 사진은 필수입니다.")
				this.update();
			// if (this.form.title && this.form.tag && this.form.content) {
			// 	if ((this.form.tag === '0' && this.form.price) ||
			// 		((this.form.tag === '1' || this.form.tag === '2') && !this.form.price)) {
			// 			// if (!this.$refs.postImage.files[3] && this.$refs.postImage.files[0])
			// 	}
			// }
		},
		async update() {
			let variable = this.form.image1;
			const index = this.$route.params.id;
			const postObj = {
				id: index,
				title: this.form.title,
				tag: this.form.tag,
				content: this.form.content,
				price: this.form.price,
<<<<<<< HEAD
				// image1: variable,
=======
				image1: variable,
>>>>>>> ebf88c9e66e24badd65ba16f26c58ec582b8dfd2
			};
			console.log(index);
			let formData = new FormData();
			
			for (let key in postObj) {
				!_.isNil(postObj[key]) && formData.append(key, postObj[key]);
			}
			this.$store.dispatch('post/updatePost', formData);
			this.$router.push('/board');
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
