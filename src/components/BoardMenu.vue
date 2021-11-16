<template>
	<div class="menu-bar">
		<!-- <div> -->
			<select class="dropdown" v-model="tag" @change="apply($event)">
				<option	v-for="item in filters[1].items" :key="item" :value="item">
					{{ item }}
				</option>
			</select>
			<button class="menu-bar__list" type="button" @click="createPost">글쓰기</button>
			<!-- </div> -->
			<!-- <div>
			<select class="dropdown" v-for="filter in filters" v-model="$data[filter.name]" 	:key="filter.name" @change="apply($event)">
			<option v-if="filter.name === 'region'" selected="" disabled>지역</option>
			<option v-for="item in filter.items" :key="item">
				{{ item }}
			</option>
		</select>
		<button class="menu-bar__list" type="button">글쓰기</button>
	</div> -->
	</div>
</template>

<script>
import seoulList from '~/json/seoul.json';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	name: 'BoardMenu',
	computed: {
		...mapState('product', [
			'postSearch',
			'theSearch',
			'loading'
		]),
		...mapState('post', ['boardTag']),
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
			region: '지역',
			tags: '분류',
			filters: [
				{
					name: 'region',
					items: (() => {
						const seouls = seoulList.seoul;
						const seoul = [];
						for (let i=0;i<seouls.length;i++) {
							seoul.push(seouls[i].시군구);
						}
						return seoul;
					})()
				},
				{
					name: 'tags',
					items: ['전체', '소분', '나눔', '완료']
				}
			]
		}
	},
	methods: {
		apply(e) {
			this.search = this.postSearch;
			const value = e.target.value === '소분' ? 0 :
										e.target.value === '나눔' ? 1 :
										e.target.value === '완료' ? 2 : 3;
			this.tag = value;
			if (this.search) {
				this.$store.dispatch('post/getBoard', {	payload:this.search	});
			} else {
				this.$store.dispatch('post/getBoard', {	payload:'' });
			}
		},
		createPost() {
			let userInfo = JSON.parse(localStorage.getItem("userInfo"));
			if (userInfo == null)
			{
				confirm("글 작성은 로그인 후 가능합니다.");
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
	margin-bottom: 1em;
	width: 100%;
	select {
		font-family: 'Gowun Dodum', sans-serif;
		margin: 0 .1em;
		padding: .4em 0.2em;
		letter-spacing: 2px;
		@media (max-width: 500px) {
			font-size: .7em;
		}
	}
  option {
		color: black;
		font-family: 'Gowun Dodum', sans-serif;
	}
	.dropdown {
		margin: 0 20px 0 -15px;
	}
}

.menu-bar__list {
	float: right;
	padding: 0.5em 1em;
	border: 1px solid #383838;
	background-color: white;
	border-radius: .2em;
	letter-spacing: 2px;
	font-family: 'Gowun Dodum', sans-serif;
	@media (max-width: 500px) {
		font-size: .7em;
	}
	&:hover {
		background-color: #383838;
		color: white;
	}
}
</style>
