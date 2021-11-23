<template>
	<div class="menu-bar">
		<div class="dropdown-wrapper">
			<div class="region-wrapper" v-if="isLogin">
				<select class="dropdown" v-model="tagRegion" @change="setRegion($event)">
					<option value=0 selected>내 지역</option>
					<option	value=1>전 지역</option>
				</select>
			</div>
			<select class="dropdown" v-model="tag" @change="apply($event)">
				<option	v-for="item in items" :key="item" :value="item">
					{{ item }}
				</option>
			</select>
		</div>
		<button class="menu-bar__list" type="button" @click="createPost">글쓰기</button>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'BoardMenu',
	props: ['fromSearch'],
	computed: {
		...mapState('product', [
			'postSearch',
			'loading'
		]),
		...mapState('post', [
			'boardTag',
			'boardView',
			'regionTag',
			'header'
		]),
		...mapState('login', [
			'isLogin',
		]),
		tagRegion: {
			get() {
				return this.regionTag;
			},
			set (value) {
				this.$store.dispatch('post/updateRegionTag', value);
			}
		},
		tag: {
			get() {
				const tag = this.boardTag === 3 ? '전체' :
										this.boardTag === 0 ? '소분' :
										this.boardTag === 1 ? '나눔' :
										this.boardTag === 2 ? '완료' :
										this.boardTag;
				return tag;
			},
			set (value) {
				this.$store.dispatch('post/updateTag', value);
			}
		},
	},
	data() {
		return {
			isAllRegion: '',
			items: ['전체', '소분', '나눔', '완료']
		}
	},
	methods: {
		...mapActions('post', [
			'getBoard',
			'updateTag',
			'updateBoard'
		]),
		setRegion(e) {
			const payload = this.postSearch ? this.postSearch : '';
			const header = !this.postSearch && this.fromSearch ? false : true;
			this.tagRegion = e.target.value;
			this.getBoard({payload, page: 1, header});
		},
		apply(e) {
			this.tag = e.target.value === '소분' ? 0 :
								e.target.value === '나눔' ? 1 :
								e.target.value === '완료' ? 2 : 3;
			const payload = this.postSearch ? this.postSearch : '';
			const header = !this.postSearch && this.fromSearch ? false : true;
			this.getBoard({payload, page: 1, header});
		},
		createPost() {
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			if (userInfo == null)
			{
				if (confirm("글 작성은 로그인 후 가능합니다."))
					this.$router.push('/login');
			}
			else {
				this.$router.push({
					path: '/create'
				})
			}
		}
	},
	created() {
		if (this.boardTag !== '') {
			this.tag = this.boardTag;
		} else {
			this.tag = 3;
		}
		if (this.regionTag !== '') {
			this.tagRegion = this.regionTag;
		} else {
			this.tagRegion = 0;
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.menu-bar {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1em;
	width: 100%;
	@media (max-width: 500px) {
		font-size: .5em;
	}
	.dropdown-wrapper {
		@media (max-width: 500px) {
			margin-left: -2em;
		}
		.region-wrapper {
			display: inline-block;
		}
		select {
			font-family: 'Gowun Dodum', sans-serif;
			font-size: .9em;
			margin: 0 .2em;
			padding: .2em;
			letter-spacing: 2px;
			border-radius: .3em;
			@media (max-width: 500px) {
				font-size: 1.5em;
			}
		}
		option {
			color: black;
			font-family: 'Gowun Dodum', sans-serif;
		}
	}
	.menu-bar__list {
		padding: 0.5em 1em;
		border: 1px solid darken($color_prime_brown, 25%);
		color: darken($color_prime_brown, 35%);
		background-color: white;
		border-radius: .3em;
		letter-spacing: 2px;
		font-family: 'Gowun Dodum', sans-serif;
		@media (max-width: 500px) {
			font-size: 1.5em;
		}
		&:hover {
			background-color: darken($color_prime_brown, 25%);
			color: white;
		}
	}
}

</style>
