<template>
		<div class="section-comment">
			<!-- To-Do: mobile ver. -->
			<template
				v-if="comments.length > 0">
				<table class="comment-container">
					<colgroup>
						<col class="fourteen" />
						<col class="seventy" />
						<col class="sixteen" />
						<col class="five" />
					</colgroup>
					<tr
						v-for="comment in comments"
						:key="comment.id">
						<td class="id">{{ comment.user }}</td>
						<td class="content">{{ comment.content }}</td>
						<td class="time">{{ comment.created_at }}</td>
						<td><button class="button" @click="delComment(comment.id)">X</button></td>
					</tr>
				</table>
			</template>
			<form class="comment-form" @submit.prevent="handleSubmit" method="post">
				<input type="text" id="user"
					placeholder="사용자" v-model="newComment.user" required/>
				<input type="text" id="input"
					placeholder="댓글달기" v-model="newComment.comment" required/>
				<button type="submit" name="button"
					class="comment-btn" id="comment">등록</button>
				<button type="button" name="button"
					class="comment-btn" @click="cancel">취소</button>
			</form>
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
			newComment: {
				user: '',
				comment: ''
			}
		}
	},
	computed: {
    ...mapState('post', [
      'comments'
    ])
  },
	created() {
		this.$store.dispatch('post/initComments', this.$route.params.id);
	},
	methods: {
		async handleSubmit(e) {
			const commentObj = {
				post_id: this.postId,
				user: this.newComment.user,
				content: this.newComment.comment,
				created_at: this.currentDate()
			};
			await axios.post('comments', commentObj);
			this.newComment.user = '';
			this.newComment.comment = '';
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
		async delComment(index) {
			await axios.delete('comments/' + index);
			// const splicedComment = this.comments.splice(index, 1);
			// console.log(splicedComment);
			// this.$store.dispatch('post/deleteComment', this.comments);
		}
	}

}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.section-comment {
	background-color: #f7e2a9;
	padding: 1em 3em;
	box-sizing: border-box;
	.comment-container {
		width: 100%;
		table-layout: fixed;
		background-color: white;
		box-shadow: 0 0 5px 0 $color_shadow_02;
		// display: none;
		.fourteen { width: 14%; }
		.sixteen  { width: 16%; }
		.seventy { width: 65%; }
		.five { width: 5%; }
		.id {
			padding: .3em .5em;
			border-bottom: 1px solid black;
			font-weight: bold;
		}
		.content {
			border-bottom: 1px solid black;
			padding: .3em .5em;
		}
		.time {
			border-bottom: 1px solid black;
			padding: .3em;
			text-align: right;
		}
		.button {
			margin: .4em;
			padding: 0 .2em;
			border-radius: .4em;
		}
	}
	.comment-form {
		margin-top: 1em;
		#input {
			width: 83%;
			padding: .3em .5em;
		}
		.comment-btn {
			letter-spacing: .5em;
			padding: .3em 0 .3em .5em;
		}
	}
}
</style>
