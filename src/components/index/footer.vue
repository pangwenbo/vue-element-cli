<template>
	<div class="v_footer" :style="{ 'background-color':backgroundColor}">
		<div class="footer_left">好好学习 · 天天向上</div>
		<div class="footer_right">
			<img src="@/assets/img/index/logo.png" />
			<span class="company_name">想叫啥叫啥平台</span>
			<span>技术支持：110-119-120</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			backgroundColor: {
				type: String,
				default: ""
			}
		}
	};
</script>

<style lang="less">
	.v_footer {
		height: 40px;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0 80px;
		box-sizing: border-box;
		font-size: 12px;
		color: #fff;
		line-height: 40px;
		> div {
			display: inline-block;
		}
		.footer_right {
			float: right;
			img {
				display: inline-block;
				vertical-align: -2px;
				margin-right: 6px;
				height: 15px;
				width: 15px;
			}
			.company_name {
				margin-right: 5px;
			}
		}
	}
</style>