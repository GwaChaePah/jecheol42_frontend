<template>
	<div class="section-comment">
		<template v-if="comments.length > 0">
			<table class="comment-container">
				<tr v-for="comment in comments" :key="comment.id">
					<td class="comment-td">
						<button class="button_toggle" @click="showMenu(comment.id)">
							<span class="material-icons">more_horiz</span>
						</button>
						<div class="button-wrapper" v-show="(click === comment.id) && (editingId !== comment.id)">
							<button	class="material-icons-outlined" @click="toggleEdit(comment)" title="수정">edit</button>
							<button class="material-icons-outlined" @click="delComment(comment)" title="삭제">clear</button>
						</div>
						<div class="id"><span class="material-icons">cruelty_free</span>{{ comment.username }}</div>
						<div class="time">{{ comment.updated_at }}</div>
						<div v-if="(editingId === comment.id)" class="textarea-wrapper">
							<textarea class="textarea" rows="4"
								v-model="editedComment" :id="`edit-comment-${comment.id}`" @keydown.enter="saveComment(comment)"/>
							<div class="button-wrapper">
								<button	class="material-icons-outlined" @click="saveComment(comment)" title="저장">save</button>
								<button class="material-icons-outlined" @click="editingId = ''" title="취소">clear</button>
							</div>
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
import { mapState, mapActions } from 'vuex';

export default {
	name: 'Comments',
	props: ['postId'],
	data() {
		return {
			comment: '',
			editingId: '',
			editedComment: '',
			click: -1,
		}
	},
	computed: {
    ...mapState('post', ['comments']),
  },
	methods: {
		...mapActions('post', [
			'updateComment',
			'deleteComment'
		]),
		showMenu(e) {
			const value = e;
			if (this.click !== value) {
				this.click = value;
			}
			else {
				this.click = -1;
			}
		},
		handleSubmit(e) {
			let userInfo = JSON.parse(localStorage.getItem("userInfo"));
			let pk = userInfo.pk;
			const commentObj = {
				post_key: this.postId,
				user_key: pk,
				content: this.comment,
			};
			this.updateComment({
				post_key: commentObj.post_key,
				payload: commentObj
			});
			this.user = '';
			this.comment = '';
		},
		cancel() {
			this.newComment.user = '';
			this.newComment.comment = '';
		},
		toggleEdit(comment) {
			this.editedComment = comment.content;
			this.editingId = comment.id;
			this.click = -1;
			setTimeout(() => {
				document.getElementById(`edit-comment-${comment.id}`).focus()
			}, 1);
		},
		saveComment(comment) {
			if (comment.content !== this.editedComment) {
				const commentObj = {
					id: comment.id,
					content: this.editedComment,
				};
				this.updateComment({
					option: 0,
					post_key: this.postId,
					payload: commentObj
				});
			}
			this.editingId = '';
		},
		async delComment(comment) {
			if (confirm("정말 지우시겠습니까?")) {
				this.deleteComment(comment);
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
	@media (max-width: 500px) {
		margin: 0 .5em;
		font-size: .7em;
	}
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
			@media (max-width: 500px) {
				padding: 0 1em;
			}
			.button_toggle {
				background: none;
				border: none;
				position: absolute;
				top: 0;
				right: 0;
				@media (max-width: 500px) {
					right: 3px;
				}
				.material-icons {
					font-size: 2em;
					color: gray;
					@media (max-width: 500px) {
						font-size: 1.5em;
					}
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
					@media (max-width: 500px) {
						font-size: 1.5em;
						display: inline-block;
					}
				}
			}
			.id {
				padding: .3em .5em;
				margin-right: 2em;
				font-weight: bold;
				font-family: 'Gowun Dodum', sans-serif;
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
					margin-top: .5em;
					width: 95%;
					font-size: 1em;
					resize: none;
					&:focus {
						border: none;
					}
				}
				.button-wrapper {
					display: inline-block;
					position: absolute;
					top: 40px;
					right: 3px;
					z-index: 2;
					.material-icons-outlined {
						cursor: pointer;
						color: gray;
						display: block;
						padding: .2em;
						border: none;
						background: none;
						font-size: 1.5em;
						&:hover {
							color: $color_prime_orange;
						}
						@media (max-width: 500px) {
							font-size: 1.5em;
							display: block;
						}
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
		@media (max-width: 500px) {
			display: block;
			padding: .1em 0;
		}
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
			@media (max-width: 500px) {
				display: none;
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
			@media (max-width: 500px) {
				display: block;
				height: 30px;
				width: 95%;
				margin: 1em auto 0;
				&::placeholder {
					letter-spacing: 0;
				}
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
				cursor: pointer;
				&:hover {
					background-color: rgb(254, 135, 25);
					color: white;
				}
			}
			#submit {
				background-color: lighten($color_prime_green, 10%);
			}
			#button {
				background-color: lighten(rgb(160, 165, 182), 20%);
			}
			@media (max-width: 500px) {
				display: flex;
				justify-content: center;
				.comment-btn {
					display: inline-block;
					font-size: 1em;
				}
			}
		}
	}
}
</style>
