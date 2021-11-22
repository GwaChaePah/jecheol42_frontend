<template>
	<div class="menu-bar">
		<div class="dropdown-wrapper">
			<div class="region-wrapper" v-if="region">
				<select class="dropdown" id="selectRegion" @change="setRegion($event)">
					<option value=1 selected>내 지역</option>
					<option	value=0>전 지역</option>
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
import seoulList from '~/json/seoul.json';
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'BoardMenu',
	props: ['fromSearch', 'fromHeader'],
	computed: {
		...mapState('product', [
			'postSearch',
			'theSearch',
			'loading'
		]),
		...mapState('post', [
			'boardTag',
			'region',
			'boardView',
			'board'
		]),
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
			seoulList,
			search: this.theSearch,
			isAllRegion: '',
			headerReset: false,
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
			this.search = this.postSearch;
			const payload = this.search ? this.search : '';
			const header = !this.search && this.fromSearch ? false : true;
			let allRegion;
			if (!this.headerReset) {
				allRegion = e.target.value == 0 ? true : false;
			} else {
				allRegion = false;
			}
			this.headerReset = false;
			this.isAllRegion = allRegion;
			this.getBoard({payload, page: 1, header, allRegion});
		},
		apply(e) {
			this.search = this.postSearch;
			this.tag = e.target.value === '소분' ? 0 :
										e.target.value === '나눔' ? 1 :
										e.target.value === '완료' ? 2 : 3;
			const payload = this.search ? this.search : '';
			const header = !this.search && this.fromSearch ? false : true;
			this.isAllRegion = this.headerReset ? false : this.isAllRegion;
			this.headerReset = false;
			this.getBoard({payload, page: 1, header, allRegion: this.isAllRegion});
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
	},
	watch: {
		board(value) {
			if (value) {
				document.getElementById('selectRegion').value = 1;
				this.headerReset = true;
			}
			this.updateBoard(false);
		}
	}
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
		// h1 {
		// 	font-family: 'Gowun Dodum', sans-serif;
		// 	display: inline-block;
		// 	margin: 0 .5em;
		// }
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
