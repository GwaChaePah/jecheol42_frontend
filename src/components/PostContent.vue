<template>
	<div class="content-title-info clearfix">
		<button class="content-category">
			<select class="select-state show-select"
				@change="apply($event)">
				<option selected>
					[<span id="region">{{ thePost.region }}</span>
					/
					<span id="tag">{{ thePost.tag }}</span>]
				</option>
				<option v-if="`${thePost.tag}` !== '소분'">소분</option>
				<option v-if="`${thePost.tag}` !== '나눔'">나눔</option>
				<option v-if="`${thePost.tag}` !== '완료'">거래 완료</option>
			</select>
		</button>
		<!-- add view count! -->
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
					v-for="image in images"
					v-show="image.src"
					:key="image.name"
					:src="image.src"
					:alt="`${thePost.user}_${thePost.title}_${image.name}`"
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
	data() {
		return {
			images: [
				{name: 'image1', src: this.thePost.image1 ? this.thePost.image1 : ''},
				{name: 'image2', src: this.thePost.image2 ? this.thePost.image2 : ''},
				{name: 'image3', src: this.thePost.image3 ? this.thePost.image3 : ''}
			]
		}
	},
	methods: {
		apply(e) {
			let value = e.target.value;
			if (value === '거래 완료') {
				value = value.slice(-2);
			}
			this.thePost.tag = value;
			this.$store.dispatch('post/updateTag', this.thePost);
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
	@media (max-width: 770px) {
		padding: .8em .5em;
	}
	.content-category {
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
		@media (max-width: 770px) {
			font-size: .8em;
		}
		@media (max-width: 580px) {
			margin: .3em 0;
			font-size: .5em;
		}
	}
	.content-title {
		margin-top: .4em;
		h1 {
			font-size: 2em;
			padding-left: .3em;
		}
		@media (max-width: 770px) {
			h1 {
				font-size: 1.8em;
			}
		}
		@media (max-width: 580px) {
			h1 {
				font-size: 1em;
			}
		}
	}
	.content-info {
		display: block;
		padding: .5em 0.3em 0;
		p {
			display: inline-block;
			margin-left: .3em;
		}
		#time {
			color: rgb(114, 115, 114);
		}
		@media (max-width: 380px) {
			padding: 0;
			p {
				font-size: .5em;
			}
		}
	}
	.content-post {
		max-width: 100%;
		margin: 1em 0;
		border-bottom: 1px solid #ccc;
		@media (max-width: 580px) {
			margin: .5em 0 1em;
		}
		.post__img {
			max-width: 90%;
			min-height: 300px;
			/* border: 1px solid #ddd; */
			padding: 1em .5em;
			margin: 0 auto;
			@media (max-width: 580px) {
				min-height: 100%;
				padding: 1em 0;
			}
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
			@media (max-width: 580px) {
				margin: 0 .5em;
				p {
					font-size: .5em;
				}
			}
		}
	}
}

</style>
