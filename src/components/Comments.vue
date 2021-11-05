<template>
	<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"> -->
	<div class="section-comment">
		<template v-if="comments.length > 0">
			<table class="comment-container">
				<tr v-for="comment in comments" :key="comment.id">
					<td class="comment-td">
						<button class="button_toggle" @click="showMenu(comment.id)">
							<span class="material-icons">more_horiz</span>
						</button>
						<div class="button-wrapper" v-show="click === comment.id">
							<button	class="material-icons-outlined" @click="toggleEdit(comment)" title="수정">edit</button>
							<button class="material-icons-outlined" @click="delComment(comment)" title="삭제">clear</button>
						</div>
						<div class="id"><span class="material-icons">cruelty_free</span>{{ comment.user }}</div>
						<div class="time">{{ comment.created_at }}</div>
						<div v-if="editingId === comment.id" class="textarea-wrapper">
							<textarea class="textarea" rows="4"
								v-model="editedComment" :id="`edit-comment-${comment.id}`"
								@blur="editingId = ''" @keydown.enter="saveComment(comment)"/>
						</div>
						<div v-else class="comment-content">&nbsp;{{ comment.content }}</div>
					</td>
				</tr>
			</table>
		</template>
		<div>
			<form class="comment-form"
				@submit.prevent="handleSubmit" method="post">
				<div class="comment-form_icon">
					<span class="material-icons-outlined">mode_comment</span>
					<p>댓글달기</p>
				</div>
				<input type="text" id="input"
					placeholder="우리는 모두 소중한 이웃입니다" v-model="comment" required/>
				<div class="button-wrapper">
					<button type="submit"	class="comment-btn" id="submit">등록</button>
					<button type="button"	class="comment-btn" id="button" @click="cancel">취소</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'Comments',
	props: ['postId'],
	data() {
		return {
			comment: '',
			editingId: '',
			editedComment: '',
			click: false,
		}
	},
	computed: {
    ...mapState('post', ['comments']),
		...mapState('auth', ['currentUser'])
  },
	created() {
		this.$store.dispatch('post/initComments', this.$route.params.id);
	},
	methods: {
		showMenu(e) {
			const value = e;
			console.log(value);
			if (value > 0 && this.click !== value) {
				this.click = value;
			}
			else {
				this.click = false;
			}
		},
		handleSubmit(e) {
			const commentObj = {
				post_key: this.postId,
				user: "test",
				content: this.comment,
				created_at: this.currentDate()
			};
			this.$store.dispatch('post/updateComment', { payload:commentObj });
			this.user = '';
			this.comment = '';
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
			this.newComment.user = '';
			this.newComment.comment = '';
		},
		toggleEdit(comment) {
			this.editedComment = comment.content;
			this.editingId = comment.id;
			this.click = false;
			setTimeout(() => {
				document.getElementById(`edit-comment-${comment.id}`).focus()
			}, 1);
		},
		saveComment(comment) {
			console.log(this.editedComment)
			const commentObj = {
				id: comment.id,
				post_key: this.postId,
				user: "test",
				content: this.editedComment,
				created_at: this.currentDate()
			};
			console.log('obj',commentObj)
			this.$store.dispatch('post/updateComment', {
				option: 0,
				payload: commentObj
			});
			this.editingId = '';
		},
		async delComment(comment) {
			console.log('clicked')
			if (confirm("정말 지우시겠습니까?")) {
				this.$store.dispatch('post/deleteComment', comment);
			}
		}
	}

}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.section-comment {
	margin: 0 0.3em 0 3.5em;
	box-sizing: border-box;
	.comment-container {
		width: 100%;
		table-layout: fixed;
		background-color: white;
		box-shadow: 0 0 5px 0 $color_shadow_02;
		clip-path: inset(0px -5px -5px -5px);
		border-radius: .2em;
		.comment-td {
			border-top: 1px solid #ccc;
			position: relative;
			padding: 0 .8em;
			// height: 80px;
			.button_toggle {
				background: none;
				border: none;
				position: absolute;
				top: 0;
				right: 0;
				.material-icons {
					font-size: 2em;
					color: gray;
				}
			}
			.button-wrapper {
				position: absolute;
				top: 18px;
				right: 1px;
				z-index: 2;
				.material-icons-outlined {
					cursor: pointer;
					color: gray;
					display: block;
					padding: .2em;
					border: none;
					background: none;
					font-size: 1.2em;
					&:hover {
						color: $color_prime_orange;
					}
				}
			}
			.id {
				padding: .3em .5em;
				margin-right: 2em;
				font-weight: bold;
				.material-icons {
					font-size: 20px;
					transform: translateY(3px);
					margin-right: 2px;
					color: #696969;
				}
			}
			.time {
				padding: .3em;
				color: #696969;
			}
			.id,
			.time {
				display: inline-block;
			}
			.textarea-wrapper {
				.textarea {
					margin-top: 1em;
					width: 100%;
					resize: none;
					&:focus {
						border: none;
					}
				}
			}
			.comment-content {
				// border-bottom: 1px solid #ccc;
				padding: .3em 1.8em .8em .5em;
				line-height: 1.6;
				&:before {
					content: '';
					border: 3px solid lighten($color_prime_yellow, 20%);
				}
			}
		}
	}
	.comment-form {
		box-shadow: 0 0 5px 0 $color_shadow_02;
		margin: .5em 0 2em;
		border-radius: .2em;
		display: flex;
		justify-content: space-around;
		.comment-form_icon {
			display: inline-block;
			margin: 1.3em .5em 1em .8em;
			.material-icons-outlined {
				margin: 0 .6em;
			}
			p {
				font-size: .8em;
				letter-spacing: .3em;
			}
		}
		#input {
			display: inline-block;
			vertical-align: top;
			margin: 1em .3em .5em;
			width: 80%;
			height: 60px;
			padding: .3em .5em;
			&::placeholder {
				text-align: center;
				letter-spacing: 1em;
				padding: 0 1em;
			}
			&:focus {
				outline: none;
			}
		}
		.button-wrapper {
			display: inline-block;
			vertical-align: top;
			margin: .3em;
			.comment-btn {
				border: none;
				display: block;
				border-radius: .2em;
				margin: 0.4em .3em;
				letter-spacing: .5em;
				padding: .5em .3em .5em .8em;
				@media (max-width: 380px) {
					font-size: .5em;
				}
				cursor: pointer;
				&:hover {
					background-color: rgb(254, 135, 25);
					// background-color: rgb(57, 120, 35);
					color: white;
				}
			}
			#submit {
				background-color: lighten($color_prime_green, 10%);
			}
			#button {
				background-color: lighten(rgb(160, 165, 182), 20%);
			}
		}
	}
}
</style>
