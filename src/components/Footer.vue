<template>
	<div class="footer-wrapper">
		<ul class="contact-list">
			<li><a href="https://github.com/GwaChaePah"><img src="../../static/Github-Mark-32px.png" />GitHub</a></li>
			<li><span class="material-icons">room</span> 서울시 강남구 개포로 416</li>
			<li><span class="material-icons">mail</span> GwaChaePah@gmail.com</li>
		</ul>
		<div class="copyright"><span class="material-icons">copyright</span> 2021 과채파.</div>
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

.footer-wrapper {
	padding: .5em 0;
	height: 80px;
	background-color: #f8f8f8;
	text-align: center;
	.contact-list {
		margin-bottom: .5em;
		color: #505050;
		li {
			display: inline-block;
			margin: 0 15px;
			a:hover {
				text-decoration: underline wavy;
			}
			img {
				width: 15px;
				height: auto;
				transform: translateY(1px);
				margin: 0 8px;
			}
		}
	}
	.copyright {
		color: #696969;
	}
	@media ( max-width: 500px ) {
		height: 110px;
		font-size: .8em;
		.contact-list {
			margin: .5em auto .8em;
			li {
				display: block;
				margin: 4px 15px;
			}
		}
	}
}
.material-icons {
	border: none;
	font-size: 1em;
	transform: translateY(1px);
}
</style>
