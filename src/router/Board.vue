<template>
	<div class="l_main">
		<div class="l_wrapper">
			<!-- <div>



				<h1>search : {{search}}</h1>



			</div> -->
			<div :class="{'content': (hasHeader && !fromSearch)}">
				<div class="menu-bar">
					<div>
						<select class="dropdown"	@change="apply($event)">
							<option	v-for="item in filters[1].items" :key="item">
								{{ item }}
							</option>
						</select>
						<button class="menu-bar__list" type="button">글쓰기</button>
						</div>
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
			</div>
			<PostList :search="search"/>
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
	props: ['theSearch', 'fromSearch'],
	computed: {
		...mapState('auth', ['currentUser']),
		...mapState('product', ['postSearch']),
	},
	data() {
		return {
			hasHeader: true,
			search: this.theSearch,
			seoulList,
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
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.fromSearch {
	margin-top: 15em;
}
.menu-bar {
	margin: .5em 0;
	width: 100%;
	select {
		margin: 0 .1em;
		padding: .4em 0.2em;
	}
  option {	color: black;	}
	.dropdown {
		margin: 0 20px 0 -15px;
	}
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
