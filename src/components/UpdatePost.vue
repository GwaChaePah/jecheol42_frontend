<template>
	<div class="background">
		<form class="createPostArea">
			<div class="createInfo">게시글 수정</div>
				<div class="tag">
					<select v-model="form.tag">
						<option disabled value="">소분/나눔</option>
  						<option>소분</option>
  						<option>나눔</option>
						<option>완료</option>
					</select>
				</div>
				<div class="title">
					<div class="key">title</div>
					<div class="stick"></div>
					<!-- <div>{{ thePost.title }}</div> -->
					<input id="title" v-model="form.title" type="string" placeholder="제목이에용"/>
				</div>
				<div class="price">
					<div class="key">price</div>
					<div class="stick"></div>
					<!-- {{thePost.price}} -->
					<!-- {{thePost.tag}} -->
					<input v-if="form.tag !== '나눔'" v-model="form.price" type="number" placeholder="가격이에용" min="0"/>
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
			<button class="registerBtn" @click="update()">수정</button>
			<button class="cancelBtn" @click="cancel()">취소</button>	
		</form>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'UpdatePost',
	computed: {
		...mapState('post', ['thePost'])
	},
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
				image: []
			}
		}
	},
	created : function() {
		this.$store.dispatch('post/searchPostWithId', { id: this.$route.params.id });
		setTimeout(() => { 
			this.form.title = this.thePost.title;
			this.form.tag = this.thePost.tag;
			this.form.price = this.thePost.price;
			this.form.content = this.thePost.content;
			this.form.user = this.thePost.user;
			this.form.image = this.thePost.image;
			this.form.region = this.thePost.region;
			// this.for.created_at = this.thePost.created_at;
		}, 100);
	},
	methods: {
		onInputImage() {
			this.form.image = this.$refs.postImage.files
		},
		async update() {
			const postObj = {
				id: this.id,
				title: this.form.title,
				tag: this.form.tag,
				created_at: this.currentDate(),
				user: this.form.user,
				region: this.form.region,
				content: this.form.content,
				price: this.form.price,
				image: "",
				view_count: this.view_count
			};
			this.$store.dispatch('post/updatePost', postObj);
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
			this.$router.push({
				path: '/board'
			})
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
