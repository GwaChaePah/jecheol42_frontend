<template>
<div>
	<ul >
		<li><a href="https://github.com/GwaChaePah">&copy;과채파</a></li>
	</ul>
</div>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			height: false,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

div {
	padding: 1em 0;
	height: 50px;
	background-color: #f8f8f8;
	text-align: center;
	.sticky {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
}
</style>
