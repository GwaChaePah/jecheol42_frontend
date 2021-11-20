<template>
	<div class="l_main">
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
									<input v-if="form.tag !== '1'" v-model="form.price" type="number" placeholder="가격" min="0"/>
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
								<button class="previewBtn">등록 전 미리보기</button>
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
		onInputImage(e) {
			// let url1 = '';
			this.form.image1 = this.$refs.postImage.files[0] ? this.$refs.postImage.files[0] : undefined;
			this.form.image2 = this.$refs.postImage.files[1] ? this.$refs.postImage.files[1] : '';
			this.form.image3 = this.$refs.postImage.files[2] ? this.$refs.postImage.files[2] : '';
			this.previewURL();
		},
		previewURL() {
			let url1 = '';
			let url2 = '';
			let url3 = '';
		// 	// console.log(this.form.image1);
			this.url1 = this.form.image1 ? URL.createObjectURL(this.form.image1) : '';
			this.url2 = this.form.image2 ? URL.createObjectURL(this.form.image2) : '';
			this.url3 = this.form.image3 ? URL.createObjectURL(this.form.image3) : '';
			// this.checkForm();
		},
		checkForm(e){
			if (!this.form.title)
				confirm("제목은 필수입니다.")
			if (!this.form.tag)
				confirm("카테고리를 설정해주세요.")
			if (!this.form.content)
				confirm("내용은 필수입니다.")
			if (this.form.tag === "0" && !this.form.price)
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
			// let newContent = this.form.content.replace(/(\n|\r\n)/g, "<br />");
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
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

.l_main {
	height: 100vh;
}
	.content {
	.background{
		// height: 400px;
		font-family: sans-serif;
		margin-top: 50px;
		@include center;
		.createPostArea {
			@include center;
			@media screen and (min-width: 700px) {
				padding: 0px 100px;
			}
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
					white-space: pre-line;
					.text{
						white-space: pre-line;
						@include input(95%);
						// min-height: 150px;
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
