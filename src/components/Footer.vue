<template>
	<div class="footer-wrapper">
		<ul class="contact-list">
			<li><a href="https://github.com/GwaChaePah"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</a></li>
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
			img,
			svg {
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
