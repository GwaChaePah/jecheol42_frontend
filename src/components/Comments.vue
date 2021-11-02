<template>
		<div class="section-comment">
			<template
				v-if="comments.length > 0">
				<table class="comment-container">
					<colgroup>
						<col class="narrow" />
						<col class="widest" />
						<col class="middle" />
						<col class="narrowest" />
					</colgroup>
					<tr
						v-for="comment in comments"
						:key="comment.id">
						<td class="id">{{ comment.user }}</td>
						<td v-if="editingId === comment.id" class="textarea-wrapper">
							<textarea class="textarea" rows="4"
								v-model="editedComment"
								:id="`edit-comment-${comment.id}`"
								@blur="editingId = ''"
								@keydown.enter="saveComment(comment)"/>
						</td>
						<td v-else class="content">&nbsp;{{ comment.content }}</td>
						<td class="time">{{ comment.created_at }}</td>
						<td class="button-wrapper">
							<button	class="button" @click="toggleEdit(comment)">편집</button>
							<button class="button" @click="delComment(comment)">삭제</button>
						</td>
					</tr>
				</table>
			</template>
			<div>
				<form class="comment-form"
					@submit.prevent="handleSubmit" method="post">
					<input type="text" id="input"
						placeholder="댓글달기" v-model="comment" required/>
					<div class="button-wrapper">
						<button type="submit"	class="comment-btn"
							id="submit">등록</button>
						<button type="button"	class="comment-btn"
							id="button" @click="cancel">취소</button>
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
			editedComment: ''
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
		handleSubmit(e) {
			const commentObj = {
				post_id: this.postId,
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
			console.log(this.editedComment)
			this.editingId = comment.id;
			setTimeout(() => {
				document.getElementById(`edit-comment-${comment.id}`).focus()
			}, 1);
		},
		saveComment(comment) {
			console.log(this.editedComment)
			const commentObj = {
				id: comment.id,
				post_id: this.postId,
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
	// background-color: #f7e2a9;
	margin: 0 5.5em;
	// padding: 1em 5em;
	@media (max-width: 770px) {
		margin: 0 2em 0 5.5em;
	}
	@media (max-width: 580px) {
		margin: 0;
	}
	box-sizing: border-box;
	.comment-container {
		width: 100%;
		table-layout: fixed;
		background-color: white;
		box-shadow: 0 0 5px 0 $color_shadow_02;
		border-radius: .2em;
		@media (max-width: 380px) {
			font-size: .5em;
		}
		// display: none;
		.narrowest {
			width: 6%;
			@media (max-width: 930px) {
				width: 7%;
			}
			@media (max-width: 837px) {
				width: 8%;
			}
			@media (max-width: 710px) {
				width: 9%;
			}
		}
		.narrow { width: 12%; }
		.middle  { width: 14%; }
		.widest {
			width: 68%;
			@media (max-width: 580px) {
				width: 60%;
			}
		}
		.id {
			padding: .3em .5em;
			border-bottom: 1px solid black;
			font-weight: bold;
			vertical-align: top;
		}
		.textarea-wrapper {
			border-bottom: 1px solid black;
			.textarea {
				margin-top: 1em;
				width: 100%;
				resize: none;
			}
		}
		.content {
			border-bottom: 1px solid black;
			padding: .3em .5em;
			vertical-align: top;
			&:before {
				content: '';
				border: 3px solid lighten($color_prime_orange, 20%);
			}
		}
		.time {
			border-bottom: 1px solid black;
			padding: .3em;
			text-align: right;
			vertical-align: top;
		}
		.button-wrapper {
			vertical-align: top;
			.button {
				margin: .2em .4em;
				padding: .2em .3em;
				border: none;
				border-radius: .4em;
				vertical-align: top;
				&:first-child {
					background-color: rgb(241, 224, 131);
					&:hover {
						background-color: rgb(254, 135, 25);
						color: white;
					}
				}
				&:last-child {
					background-color: lighten(rgb(160, 165, 182), 20%);
					&:hover {
						background-color: rgb(254, 135, 25);
						// background-color: rgb(160, 165, 182);
						color: white;
					}
				}
				@media (max-width: 380px) {
					font-size: .5em;
				}
			}
		}
	}
	.comment-form {
		box-shadow: 0 0 5px 0 $color_shadow_02;
		margin: .5em 0 2em;
		border-radius: .2em;
		position: relative;
		#input {
			margin: 1.2em .3em .5em;
			width: 85%;
			height: 50px;
			padding: .3em .5em;
		}
		.button-wrapper {
			float: right;
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
			}
			#submit {
				background-color: lighten($color_prime_green, 10%);
				&:hover {
					background-color: rgb(254, 135, 25);
					// background-color: rgb(57, 120, 35);
					color: white;
				}
			}
			#button {
				background-color: lighten(rgb(160, 165, 182), 20%);
				&:hover {
					background-color: rgb(254, 135, 25);
					// background-color: rgb(160, 165, 182);
					color: white;
				}
			}
		}
	}
}
</style>
