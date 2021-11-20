<template>
		<div class="l_wrapper">
			<div class="content">
				<div class="background">
					<form class="createPostArea">
						<div class="createInfo">게시글 수정</div>
						<div class="postBox">
							<div class="title">
								<!-- <div class="key">title</div>
								<div class="stick"></div> -->
								<input class="titlebox" v-model="form.title" type="string" placeholder="제목"/>
							</div>
							<div class="tagBox">
								<div class="tag">
									<select v-model="form.tag">
										<option disabled value="">소분/나눔</option>
										<option value=0>소분</option>
										<option value=1>나눔</option>
										<option value=2>완료</option>
									</select>
								</div>
								<div class="price">
									<!-- <div class="key">price</div>
									<div class="stick"></div> -->
									<input v-if="form.tag !== '1' && form.tag !== '2'" v-model="form.price" type="number" placeholder="가격" min="0"/>
									<div class="zero" v-else> {{form.price = 0}} </div>
								</div>
							</div>
							<div class="textBox">
								<!-- <div>{{form.user}}</div> -->
								<!-- <div class="key">내용</div>
								<div class="stick"></div> -->
								<textarea class="text" v-model="form.content" type="string" placeholder="내용"/>
									<img class="thumbnail" :src="this.form.image1 ? url1 : this.post.image1" />
									<img class="thumbnail" :src="this.form.image2 ? url2 : this.post.image2" />
									<img class="thumbnail" :src="this.form.image3 ? url3 : this.post.image3" />
							</div>
							<div class="fileSelect">
								<label class="input-file-btn" for="input-file">사진 첨부하기</label>
								<input multiple @change="onInputImage()" ref="postImage" type="file" id="input-file" style="display: none"/>
								<p>이미지는 최대 3장까지</p>
							</div>
						</div>
						<div class="bntBox">
							<div>
								<button class="registerBtn" @click.prevent="update()">작성</button>
								<button class="cancelBtn" @click="cancel()">취소</button>
							</div>
						</div>
					</form>
				</div>
			</div>
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
			this.form.image1 = this.$refs.postImage.files[0] ? this.$refs.postImage.files[0] : undefined;
			this.form.image2 = this.$refs.postImage.files[1] ? this.$refs.postImage.files[1] : '';
			this.form.image3 = this.$refs.postImage.files[2] ? this.$refs.postImage.files[2] : '';
			this.previewURL();
		},
		previewURL(e) {
			let url1 = '';
			let url2 = '';
			let url3 = '';
			this.url1 = this.form.image1 ? URL.createObjectURL(this.form.image1) : '';
			this.url2 = this.form.image2 ? URL.createObjectURL(this.form.image2) : '';
			this.url3 = this.form.image3 ? URL.createObjectURL(this.form.image3) : '';
		},
		async update() {
			let variable = this.form.image1;
			let variable1 = this.form.image2;
			let variable2 = this.form.image3;
			const index = this.$route.params.id;
			const postObj = {
				id: index,
				title: this.form.title,
				tag: this.form.tag,
				content: this.form.content,
				price: this.form.price,
				image1: variable,
				image2: variable1,
				image3: variable2
			};
			// console.log(this.form.tag);
			let formData = new FormData();
			
			for (let key in postObj) {
				if (!_.isNil(postObj[key])){
					formData.append(key, postObj[key]);
					console.log(postObj[key]);
				}
			}
			this.$store.dispatch('post/updatePost', formData);
			setTimeout(() => {
				this.$store.dispatch('post/searchPostWithId', index);
				// this.$router.push('/board');
				this.$router.push(`/post/${index}`);
			}, 8000);
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
@mixin boxCss {
	width: 100%;
	max-width: 900px;
	margin: auto;
	border-bottom: 1px solid #ddd;
}
@mixin price {
	width: 90%;
	color: rgba(#76862c, 0.76);
	border-color: transparent;
	font-size: 15px;
}
@mixin input($size) {
	width: $size;
	padding: 8px;
	margin: 10px 0px;
	color: rgba(#76862c, 0.76);
	border-color: transparent;
}
@mixin btnCss {
	font-size: 17px;
	width: 10%;
	min-width: 80px;
	height: 15%;
	padding: 8px;
	border-radius: .3em;
	border-color: rgba(187, 212, 68, 30%);
	box-shadow: 0 0 10px 0 $color_shadow_03;
	border: 20px;
}
.content {
	.background{
		height: 400px;
		font-family: sans-serif;
		margin-top: 50px;
		@include center;
		.createPostArea {
			@include center;
			.createInfo{
				margin: 10px 0px;
				font-size: 20px;
				color: rgba(#76862c, 0.76);
			}
			.postBox {
				width: 100%;
				height: 100%;
				margin: auto;
				display: block;
				.title {
					@include boxCss;
					.titlebox{
						@include input(95%);
					}
				}
				.tagBox {
					@include boxCss;
					display: flex;
					.tag{
						@include input(100%);
						select{
							width: 90%;
							text-align: center;
							color: rgba(#76862c, 0.76);
							border-color: transparent;
						}
					}
					.price{
						@include input(100%);
						input{
							@include price;
							text-align: center;
						}
						.zero{
							@include price;
							margin: auto;
						}
					}
				}
				.textBox{
					@include boxCss;
					.text{
						@include input(95%);
						// min-height: 300px;
					}
					.thumbnail{
						width: 80px;
						height: 80px;
					}
				}
				.fileSelect{
					width: 100%;
					padding: 8px;
					margin: 10px 0px;
					display: flex;
					.input-file-btn{
						width: 50%;
						padding: 8px;
						margin: 0px 10px 0px 0px;
						color: rgba(#76862c, 0.76);
						border-radius: .3em;
						border: 1px solid #ddd;
						font-size: 15px;
					}
					p{
						width: 50%;
						margin: auto;
						color: rgba(#76862c, 0.76);
						border-color: transparent;
						text-align: center;
						font-size: 12px;
					}
				}
			}
			.bntBox {
				width: 100%;
				padding: 8px;
				display: flex;
				div{
					width: 100%;
					margin: auto;
					.registerBtn{
						@include btnCss;
						background-color: rgba(#76862c, 0.76);
						color: white;
					}
					.cancelBtn{
						@include btnCss;
						margin: 10px 0px 10px 10px;
						color: rgba(#76862c, 0.76);
					}
				}
			}
		}
	}
}
</style>