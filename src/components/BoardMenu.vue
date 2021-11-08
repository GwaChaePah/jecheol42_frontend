<template>
	<div class="menu-bar">
		<!-- <div> -->
			<select class="dropdown"	@change="apply($event)">
				<option	v-for="item in filters[1].items" :key="item">
					{{ item }}
				</option>
			</select>
			<button class="menu-bar__list" type="button" @click="createPost()">글쓰기</button>
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
			'theSearch'
		]),
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
			if (!this.search) {
				this.search = this.postSearch;
			}
			let value = e.target.value;
			this.$store.dispatch('post/searchPostTags', {
				value,
				search: this.search
			});
		},
		createPost() {
			this.$router.push({
				path: '/create'
			})
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
		margin: 0 .1em;
		padding: .4em 0.2em;
		letter-spacing: 2px;
	}
  option {
		color: black;
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
	&:hover {
		background-color: #383838;
		color: white;
	}
}
</style>
