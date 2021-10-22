<template>
	<div class="content-title-info clearfix">
		<button class="content-category">
			<select class="select-state show-select"
				@change="apply($event)">
				<option selected>
					[<span id="region">{{ thePost.region }}</span>
					/
					<span id="option">{{ thePost.option }}</span>]
				</option>
				<option v-if="`${thePost.option}` !== '소분'">소분</option>
				<option v-if="`${thePost.option}` !== '나눔'">나눔</option>
				<option v-if="`${thePost.option}` !== '완료'">거래 완료</option>
			</select>
		</button>
		<div class="content-title">
			<h1>{{ thePost.title }}</h1>
		</div>
		<div class="content-info">
			<p id="time">{{ thePost.created_at }}</p>
			<p id="writer">{{ thePost.user }}</p>
		</div>
		<div class="content-post">
			<div class="post__img clearfix">
				<img class="img-slides"
					:src="thePost.image"
					:alt="`${thePost.user}_${thePost.title}`"
					onerror="this.onerror=null;this.src='./src/assets/no_image.jpg';" />
			</div>
			<div class="post__paragraph">
				<p>{{ thePost.content }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PostContent',
	props: ['thePost'],
	methods: {
		apply(e) {
			let value = e.target.value;
			if (value === '거래 완료') {
				value = value.slice(-2);
			}
			this.thePost.option = value;
			this.$store.dispatch('post/updateOption', this.thePost);
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.content-title-info {
	position: relative;
	padding: .8em;
	border-bottom: 1px solid #ddd;
	.content-category {
		float: left;
		margin: .3em;
		border-style: none;
		.select-state {
			pointer-events: none;
			appearance: none;
			border: none;
			padding: .2em;
			font-size: 1.3em;
		}
		.show-select {
			pointer-events: all;
			appearance: listbox;
		}
		span {
			padding: 0 .3em;
		}
	}
	.content-title {
		float: left;
		text-align: center;
		h1 {
			font-size: 2em;
			padding-left: .3em;
		}
	}
	.content-info {
		float: right;
		padding: .5em 0.3em 0;
		p {
			display: inline-block;
			margin-left: .3em;
		}
		#time {
			color: rgb(114, 115, 114);
		}
	}
	.content-post {
		max-width: 100%;
		margin: 4em 0 1em 0;
		border-bottom: 1px solid #ccc;
		.post__img {
			max-width: 90%;
			min-height: 300px;
			/* border: 1px solid #ddd; */
			padding: 1em .5em;
			margin: 0 auto;
			.img-slides {
				float: left;
				margin: .2em;
			}
		}
		.post__paragraph {
			margin: .8em 3em 1em;
			p {
				text-align: justify;
				padding: .3em 0;
				line-height: 1.5;
				font-size: 1.2em;
			}
		}
	}
}

</style>
