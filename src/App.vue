<template>
	<div id="app">
		<vue-particles
			style="position:relative;z-index:1;pointer-events:none;"
			color="#fff"
			:particleOpacity="0.7"
			:particlesNumber="80"
			shapeType="circle"
			:particleSize="2"
			linesColor="#fff"
			:linesWidth="1"
			:lineOpacity="1"
			:linesDistance="150"
			:moveSpeed="3"
		></vue-particles>
		<transition name="slide-fade">
			<router-view />
		</transition>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import websocket from "@/utils/websocket.js";
	export default {
		name: "App",
		computed: {
			...mapGetters(["ws"])
		},
		mounted() {
			// let socket = new websocket({
			// 	url: "ws://127.0.0.1:8001"
			// });
			// this.setWs(socket);
			// this.ws.onmessage(data => {
			// 	console.log(data);
			// });
			// // this.ws.send("发送消息");
		},
		methods: {
			...mapActions(["setWs"])
		}
	};
</script>


<style>
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		/*font-family: "Noto Sans SC";*/
		background: #fafafa;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
			"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-weight: 600px;
		padding: 0;
		margin: 0;
	}
	ul,
	li {
		list-style: none;
	}
	/*路由切换的进度条颜色*/
	#nprogress .bar {
		background: #ffffff !important;
	}
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar {
		width: 10px; /*滚动条宽度*/
		height: 10px; /*滚动条高度*/
	}

	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track {
		border-radius: 3px; /*滚动条的背景区域的圆角*/
		background-color: #f2f2f2; /*滚动条的背景颜色*/
	}

	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb {
		border-radius: 3px; /*滚动条的圆角*/
		background-color: green; /*滚动条的背景颜色*/
	}
	/*遮罩遮不住dialog问题*/
	.el-loading-mask.is-fullscreen {
		z-index: 3000 !important;
	}
</style>
