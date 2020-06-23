<template>
	<div style="display:inline-block">
		<el-tooltip v-if="isFullscreen" content="缩放" placement="bottom" effect="dark">
			<i
				class="el-icon-suoxiao"
				style="font-size:32px;vertical-align:middle;cursor: pointer;"
				@click="click"
			></i>
		</el-tooltip>
		<el-tooltip v-if="!isFullscreen" content="全屏" placement="bottom" effect="dark">
			<i
				class="el-icon-full-screen"
				style="font-size:32px;vertical-align:middle;cursor: pointer;"
				@click="click"
			></i>
		</el-tooltip>
	</div>
</template>

<script>
	import screenfull from "screenfull";

	export default {
		name: "Screenfull",
		data() {
			return {
				isFullscreen: false
			};
		},
		mounted() {
			this.init();
		},
		beforeDestroy() {
			this.destroy();
		},
		methods: {
			click() {
				screenfull.toggle();
			},
			change() {
				this.isFullscreen = screenfull.isFullscreen;
			},
			init() {
				screenfull.on("change", this.change);
			},
			destroy() {
				if (screenfull.enabled) {
					screenfull.off("change", this.change);
				}
			}
		}
	};
</script>

<style scoped>
	.screenfull-svg {
		display: inline-block;
		cursor: pointer;
		fill: #5a5e66;
		width: 20px;
		height: 20px;
		vertical-align: 10px;
	}
</style>
