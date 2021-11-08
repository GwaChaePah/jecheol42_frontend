<template>
	<div class="navbar" :class="{ 'sticky': scrollPosition }" id="navbar">
		<button id="back" @click="$router.back()">
			<span class="material-icons">arrow_back</span>
			뒤로가기
		</button>
		<button id="write">
			<span class="material-icons">create</span>
			글쓰기
		</button>
		<button id="up" @click="toTop" v-show="scrollPosition">
			<span class="material-icons">north</span>
			위로
		</button>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'NavPost',
	data() {
		return {
			scrollPosition: null,
		}
	},
	computed: {
		...mapState('post', ['thePost'])
	},
	mounted() {
		window.addEventListener("scroll", this.updateScroll);
	},
	methods: {
		updateScroll() {
			const header = 160;
			const navbar = document.getElementById('navbar');
			if (navbar) {
				const sticky = navbar.offsetTop + header;
				if (window.pageYOffset > sticky) {
					// console.log('scroll', window.pageYOffset, sticky);
					this.scrollPosition = true;
				} else {
					// console.log('scroll', window.pageYOffset, sticky);
					this.scrollPosition = false;
				}
			}
		},
		toTop() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.navbar {
	margin-top: 140px;
	position: absolute;
	z-index: 30;
	button {
		box-shadow: 0 0 5px 0 $color_shadow_03;
		display: block;
		width: 70px;
		border: none;
		border-radius: .2em;
		font-size: .8em;
		line-height: 1.6;
		margin: .5em 0;
		padding: .4em 0;
		background-color: white;
		.material-icons {
			display: block;
			font-size: 2.5em;
		}
		&:hover {
			background-color: lighten($color_prime_green, 10%);
		}
	}
	@media (max-width: 500px) {
		margin-top: 115px;
		left: 10px;
		button {
			width: 39px;
			font-size: .5em;
		}
	}
}
.sticky {
	position: fixed;
	top: 0;
	@media (max-width: 580px) {
		width: calc(100% - 60px);
	}
}

</style>
