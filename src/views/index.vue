<template>
	<div class="main">
		<el-header class="main-header">
			<head-nav class="head" :backgroundColor="backgroundColor" ref="headnav" v-show="!flag">
				<color-picker
					slot="colorpicker"
					:defaultcolor="defaultcolor"
					@onThemeChange="f_changeBackgroundColor"
					style="margin-right:28px;"
				/>
				<size-select style="margin:0px 28px 0px 0px;" slot="sizeselect" />
				<full-screen slot="fullscreen" style="margin-right:28px;" />
				<select-down slot="selectdown" />
			</head-nav>
		</el-header>

		<div class="main-container">
			<left-menu
				v-if="$route.path!='/home'"
				class="container-menu"
				@closeMain="f_closeMain"
				:isCollapse="isCollapse"
				:istop="!flag"
			/>

			<div class="container" ref="container-right" id="container-right">
				<breadcrumb @switchchange="f_breadToggle" v-if="$route.path!='/home'">
					<img
						@click="f_menuToggle"
						slot="right"
						src="../assets/img/index/caione.png"
						:class="isCollapse?'caitwo':'caione'"
					/>
				</breadcrumb>
				<div style="padding:0 10px" class="main-container-right">
					<div style="background:#fff;padding:5px 15px 15px 15px">
						<transition name="fade-transform" mode="out-in">
							<router-view />
						</transition>
					</div>
				</div>
			</div>
			<main-footer v-if="!flag" :backgroundColor="backgroundColor" />
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	import headNav from "../components/index/headNav";
	import leftMenu from "../components/index/leftMenu";
	import breadcrumb from "../components/index/breadcrumb";
	import fullScreen from "../components/index/fullScreen";
	import colorPicker from "../components/index/colorPicker";
	import sizeSelect from "../components/index/sizeSelect";
	import selectDown from "../components/index/selectDown";
	import mainFooter from "../components/index/footer";
	export default {
		name: "index",
		components: {
			headNav,
			leftMenu,
			breadcrumb,
			fullScreen,
			colorPicker,
			sizeSelect,
			selectDown,
			mainFooter
		},
		data() {
			return {
				width: "230px", //导航栏宽度
				isCollapse: false,
				flag: false,
				fullscreen: false,
				backgroundColor: "",
				defaultcolor: localStorage.getItem("tremePackers")
			};
		},
		computed: {
			...mapGetters(["color", "titleHeight"])
		},
		watch: {
			flag() {
				this.flag ? this.setTitleHeight(0) : this.setTitleHeight(90);
				console.log(this.titleHeight);
			},
			"$route.path": {
				handler: function(newVal, oldVal) {
					//console.log(newVal+"---"+oldVal);
					this.$nextTick(() => {
						if (newVal == "/home") {
							document
								.getElementById("container-right")
								.classList.add("container-home");
						} else {
							document
								.getElementById("container-right")
								.classList.remove("container-home");
						}
					});
				},
				immediate: true
			}
		},
		methods: {
			...mapActions(["setTitleHeight"]),
			//面包屑上面的开关
			f_breadToggle(val) {
				this.flag = val;
				document
					.getElementById("container-right")
					.classList.toggle("container-top");
			},
			//头部颜色
			f_changeBackgroundColor(val) {
				this.backgroundColor = val;
			},
			f_menuToggle() {
				this.isCollapse = !this.isCollapse;
				document
					.getElementById("container-right")
					.classList.toggle("container-left");
				this.$emit("closeMain", this.isCollapse);
			},
			f_closeMain(val) {
				this.isCollapse = val;
				!this.isCollapse ? (this.width = "230px") : (this.width = "55px");
			}
		}
	};
</script>
<style  lang="less" scoped>
	.main {
		width: 100%;
		height: 100%;

		/* overflow-y: auto; */
		.main-header {
			padding: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}
		.main-container {
			.container-menu {
				z-index: 2;
			}
			.container {
				z-index: 2;
				position: absolute;
				width: calc(100% - 230px);
				left: 230px;
				height: calc(100% - 100px);
				top: 60px;
				overflow: auto;
				transition-property: all;
				-webkit-transition-property: all; /* Safari */
				-webkit-transition-duration: 0.4s; /* Safari */
			}
			.container-left {
				width: calc(100% - 60px);
				left: 56px;
			}
			.container-top {
				height: calc(100% - 1px);
				top: 0;
			}
			.container-home {
				left: 0;
				width: 100%;
			}
		}
		.main-bottom {
			width: 100%;
			position: absolute;
			bottom: 0;
			right: 0;
			height: 40px;
			border-top: 2px solid #f2f2f2;
			text-align: center;
			line-height: 40px;
			background-color: #fff;
		}
	}
</style>

<style>
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.el-card.is-always-shadow {
		margin: 5px;
	}
	.toolbar {
		text-align: left;
		transition-property: all;
		-webkit-transition-property: all; /* Safari */
		-webkit-transition-duration: 0.4s; /* Safari */
	}
	.tables {
		margin-top: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: #999 !important;
		border-radius: 30px !important;
	}
	.pages {
		position: relative;
		text-align: right;
		margin-right: 30px;
		margin-top: 10px;
		bottom: 0px;
	}

	/* fade-transform 页面切换动画*/
	.fade-transform-leave-active,
	.fade-transform-enter-active {
		transition: all 0.5s;
		-ms-transition: all 0.5s; /* IE 9 */
		-moz-transition: all 0.5s; /* Firefox */
		-webkit-transition: all 0.5s; /* Safari 和 Chrome */
		-o-transition: all 0.5s; /* Opera */
	}
	.fade-transform-enter {
		opacity: 0;
		filter: alpha(opacity=0);
		-moz-opacity: 0;
		-khtml-opacity: 0;
		transform: translateX(-30px);
		-ms-transform: translateX(-30px); /* IE 9 */
		-webkit-transform: translateX(-30px); /* Safari and Chrome */
		-o-transform: translateX(-30px); /* Opera */
		-moz-transform: translateX(-30px); /* Firefox */
	}
	.fade-transform-leave-to {
		opacity: 0;
		filter: alpha(opacity=0);
		-moz-opacity: 0;
		-khtml-opacity: 0;
		transform: translateX(-30px);
		-ms-transform: translateX(-30px); /* IE 9 */
		-webkit-transform: translateX(-30px); /* Safari and Chrome */
		-o-transform: translateX(-30px); /* Opera */
		-moz-transform: translateX(-30px); /* Firefox */
	}
	@keyframes fade {
		from {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		to {
			opacity: 1;
		}
	}

	@-webkit-keyframes fade {
		from {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		to {
			opacity: 1;
		}
	}
</style>
