<template>
	<div class="l_main">
		<div class="l_wrapper">
			<div class="menu-bar">
				<div>
					<select
						@change="apply($event)">
						<option
							v-for="item in filters[1].items"
							:key="item">
							{{ item }}
						</option>
					</select>
					<button class="menu-bar__list"
					type="button">글쓰기</button>
				</div>
				<!-- <div>
					<select
						v-for="filter in filters"
						v-model="$data[filter.name]"
						:key="filter.name"
						@change="apply($event)">
						<option
							v-if="filter.name === 'region'"
							selected="" disabled>지역</option>
						<option
							v-for="item in filter.items"
							:key="item">
							{{ item }}
						</option>
					</select>
					<button class="menu-bar__list"
					type="button">글쓰기</button>
				</div> -->
			</div>
			<PostList />
		</div>
	</div>
</template>

<script>
import PostList from '~/components/PostList';
import seoulList from '~/json/seoul.json';
import { mapState } from 'vuex';

export default {
	name: 'Board',
	components: {
		PostList
	},
	data() {
		return {
			seoulList,
			region: '지역',
			options: '분류',
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
					name: 'options',
					items: ['전체', '소분', '나눔', '완료']
				}
			]
		}
	},
	methods: {
		apply(e) {
			let value = e.target.value;
			this.$store.dispatch('post/searchPostOptions', { value });
		}
	},
	computed: {
		...mapState('auth', ['currentUser'])
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.menu-bar {
	margin: .5em 0;
	width: 100%;
	select {
		margin: 0 .1em;
		padding: .4em 0.2em;
	}
  option {	color: black;	}
}

.menu-bar__list {
	float: right;
	border: 1px solid black;
	padding: 0.3em 1em;
	&:hover {
		font-weight: bold;
	}
}
</style>
