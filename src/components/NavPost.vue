<template>
	<div class="navbar">
		<button @click="$router.back()">뒤로가기</button>
		<button>글쓰기</button>
		<button v-if="user">글수정</button>
	</div>
</template>

<script>

export default {
	name: 'NavPost',
	props: ['user']
}
</script>

<style lang="scss" scoped>
@import '../scss/commons.scss';
@import '../scss/typography.scss';
@import '../scss/main.scss';

.navbar {
	margin-right: 1em;
	position: fixed;
	right: auto;
	button {
		display: block;
		width: 88px;
		border: 1px solid black;
		border-radius: .2em;
		font-size: 1em;
		margin: .3em 0;
		padding: .3em .5em;
	}
}

</style>
