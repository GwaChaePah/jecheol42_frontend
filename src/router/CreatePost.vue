<template>
	<!-- <div class="l_main"> -->
		<div class="l_wrapper">
			<div class="content">
				<div class="background">
					<form class="createPostArea">
						<div class="createInfo"></div>
						<div class="postBox">
							<div class="title">
								<input class="titlebox" v-model="form.title" type="string" placeholder="제목"/>
							</div>
							<div class="tagBox">
								<div class="tag">
									<select v-model="form.tag">
										<option disabled value="">소분 / 나눔</option>
										<option value=0>소분</option>
										<option value=1>나눔</option>
									</select>
								</div>
								<div class="price">
									<label for="form-price">원</label>
									<input id="form-price" v-if="form.tag !== '1'" v-model="form.price" type="number" placeholder="-" min="0"/>
									<div class="zero" v-else> {{form.price = 0}} </div>
								</div>
							</div>
							<div class="textBox">
								<textarea class="text" v-model="form.content" type="string" placeholder="내용"/>
								<!-- <p style="white-space: pre-line">{{form.content}}</p> -->
									<!-- {{}} -->
									<img class="thumbnail" v-show="url1" :src="url1" />
									<img class="thumbnail" v-show="url2" :src="url2" />
									<img class="thumbnail" v-show="url3" :src="url3" />
							</div>
							<div class="fileSelect">
								<label class="input-file-btn" for="input-file">사진 첨부하기</label>
								<input multiple @change="onInputImage(event)" ref="postImage" type="file" id="input-file" style="display: none"/>
								<p>이미지는 최대 3장까지</p>
							</div>
							<div class="bntBox">
								<div>
									<button class="registerBtn" @click.prevent="checkForm()">작성</button>
									<button class="cancelBtn" @click="cancel()">취소</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	<!-- </div> -->
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
				user_key: '',
				content: '',
				price: '',
				image1: '',
				image2: '',
				image3: ''
			},
			url1: '',
			url2: '',
			url3: '',
		}
	},
	methods: {
		onInputImage(e) {
			this.form.image1 = this.$refs.postImage.files[0] ? this.$refs.postImage.files[0] : undefined;
			this.form.image2 = this.$refs.postImage.files[1] ? this.$refs.postImage.files[1] : '';
			this.form.image3 = this.$refs.postImage.files[2] ? this.$refs.postImage.files[2] : '';
			this.previewURL();
		},
		previewURL() {
			this.url1 = this.form.image1 ? URL.createObjectURL(this.form.image1) : '';
			this.url2 = this.form.image2 ? URL.createObjectURL(this.form.image2) : '';
			this.url3 = this.form.image3 ? URL.createObjectURL(this.form.image3) : '';
		},
		checkForm(e){
			if (!this.form.title)
				confirm("제목은 필수입니다.")
			else if (!this.form.tag)
				confirm("카테고리를 설정해주세요.")
			else if (!this.form.content)
				confirm("내용은 필수입니다.")
			else if (this.form.tag === "0" && !this.form.price)
				confirm("가격을 입력해주세요.")
			else if (this.$refs.postImage.files[3])
				confirm("사진은 3장까지 선택 가능합니다.")
			else if (!this.$refs.postImage.files[0])
				confirm("최소 하나의 사진은 필수입니다.")
			else {
				if ((this.form.tag === '0' && this.form.price) ||
					(this.form.tag === '1' && !this.form.price)) {
						if (!this.$refs.postImage.files[3] && this.$refs.postImage.files[0])
							this.register();
					}
				}
		},
		async register() {
			// let newContent = this.form.content.replace(/(\n|\r\n)/g, "<br />");
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			const postObj =
			{
				id: this.$route.params.id,
				tag: this.form.tag,
				title: this.form.title,
				user_key: userInfo.pk,
				content: this.form.content,
				price: this.form.price,
				image1: this.form.image1,
				image2: this.form.image2,
				image3: this.form.image3,
				view_count: 0
			};
			let formData = new FormData();
			for (let key in postObj) {
				formData.append(key, postObj[key]);
			}
			const res = await axios({
				url: 'post/api/',
				method: 'post',
				data: formData,
				headers: {
        			'Content-Type' : 'multipart/form-data'
              }
			})
			if (res.status == 201)
			{
				this.$store.dispatch('post/searchPostWithId', res.data.id);
				this.$router.push(`/post/${res.data.id}`);
			}
			else
				console.log(res);
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
	color: rgba(#202020, 0.76);
	border-color: transparent;
	font-size: 15px;
}
@mixin input($size) {
	width: $size;
	padding: 8px;
	margin: 10px 0px;
	color: rgba(#202020, 0.76);
	border-color: transparent;
}
@mixin btnCss {
	font-family: 'Gowun Dodum', sans-serif;
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
	margin-bottom: 1em;
	.background{
		@include center;
		@media (min-width: 1000px) {
			width: 700px;
		}
		width: 70vw;
		@media (max-width: 500px) {
			width: 100%;
		}
		.createPostArea {
			@include center;
			// .createInfo{
			// 	margin: 10px 0px;
			// 	font-size: 20px;
			// 	color: rgba(#76862c, 0.76);
			// }
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
						position: relative;
						label {
							position: absolute;
							right: 3em;
							top: 28%;
							color: gray;
							font-size: .8em;
						}
						input{
							@include price;
							text-align: center;
							&:focus::placeholder {
  							color: transparent;
							}
						}
						.zero{
							@include price;
							margin: auto;
						}
					}
				}
				.textBox{
					@include boxCss;
					// white-space: pre-line;
					.text{
						white-space: pre-line;
						@include input(95%);
						resize: none;
						height: 200px;
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
						font-family: 'Gowun Dodum', sans-serif;
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
				.previewBtn{
					background-color: white;
					// width: 60%;
					padding: 8px;
					margin: 0px 10px 0px 0px;
					color: rgba(#76862c, 0.76);
					border-radius: .3em;
					border: 1px solid #ddd;
					font-size: 12px;
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
}
</style>
