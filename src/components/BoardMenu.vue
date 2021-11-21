<template>
	<div class="menu-bar">
		<div class="dropdown-wrapper">
			<div class="region-wrapper" v-if="region">
				<h1>지역 : </h1>
				<select class="dropdown" @change="setRegion($event)">
					<option	value=1>전체</option>
					<option value=2 selected>내 지역만</option>
				</select>
			</div>
			<h1>구분 : </h1>
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
	props: ['fromSearch'],
	computed: {
		...mapState('product', [
			'postSearch',
			'theSearch',
			'loading'
		]),
		...mapState('post', [
			'boardTag',
			'region'
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
		}
	},
	data() {
		return {
			seoulList,
			search: this.theSearch,
			items: ['전체', '소분', '나눔', '완료']
		}
	},
	methods: {
		...mapActions('post', [
			'getBoard',
			'updateTag'
		]),
		setRegion(e) {
			this.search = this.postSearch;
			const payload = this.search ? this.search : '';
			const header = !this.search && this.fromSearch ? false : true;
			const allRegion = e.target.value === '1' ? true : false;
			this.getBoard({payload: payload, page: 1, header: header, allRegion: allRegion});
		},
		apply(e) {
			this.search = this.postSearch;
			this.tag = e.target.value === '소분' ? 0 :
										e.target.value === '나눔' ? 1 :
										e.target.value === '완료' ? 2 : 3;
			const payload = this.search ? this.search : '';
			const header = !this.search && this.fromSearch ? false : true;
			this.getBoard({payload: payload, page: 1, header: header});
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
	mounted() {
		if (this.boardTag !== '') {
			this.tag = this.boardTag;
		} else {
			this.tag = 3;
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
	.region-wrapper {
		display: inline-block;
	}
	h1 {
		font-family: 'Gowun Dodum', sans-serif;
		display: inline-block;
		margin: 0 .5em;
	}
	select {
		font-family: 'Gowun Dodum', sans-serif;
		margin: 0 .1em;
		padding: .2em;
		letter-spacing: 2px;
		@media (max-width: 500px) {
			font-size: .7em;
		}
	}
	option {
		color: black;
		font-family: 'Gowun Dodum', sans-serif;
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
			font-size: .7em;
		}
		&:hover {
			background-color: darken($color_prime_brown, 25%);
			color: white;
		}
	}
}

</style>
