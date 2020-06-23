<template>
	<header class="head-nav" :style="{ 'background-color':backgroundColor}">
		<div>
			<el-menu
				:default-active="activeIndex"
				class="el-menu-demo"
				mode="horizontal"
				@select="f_handleSelect"
				:background-color="backgroundColor"
				text-color="#fff"
				active-text-color="#fff"
			>
				<div class="logo-container">
					<router-link to="/" tag="div">
						<img src="@/assets/img/index/logo.png" class="logo" alt />
						<span class="title">
							<mallky class-name="mallki-text" text="想叫啥叫啥平台" />
						</span>
					</router-link>
				</div>
				<template v-for="(item,index) in usermenus">
					<el-menu-item :index="index+''" :key="item.route">{{item.menuName}}</el-menu-item>
				</template>
				<div class="userinfo">
					<slot name="colorpicker"></slot>
					<slot name="sizeselect"></slot>
					<slot name="fullscreen"></slot>
					<slot name="selectdown"></slot>
				</div>
			</el-menu>
		</div>
	</header>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import mallky from "./mallky";
	export default {
		name: "head-nav",
		components: {
			mallky
		},
		props: {
			backgroundColor: {
				type: String,
				default: "#409EFF"
			}
		},
		data() {
			return {
				color: "#ffffff",
				activeIndex: "0"
			};
		},
		computed: {
			...mapGetters(["usermenus"])
		},
		watch: {
			backgroundColor() {
				//this.color = this.getColor(this.backgroundColor);
				console.log(this.backgroundColor);
			},
			activeIndex: {
				handler(newVal, oldVal) {
					if (this.activeIndex == "0") {
						this.$router.push("/home");
						this.setLeftMenus([]);
					} else {
						this.setLeftMenus(
							this.usermenus[parseInt(this.activeIndex)].children
						);
						this.$router.push(
							this.usermenus[parseInt(this.activeIndex)].children[0]
								.route
						);
					}
				},
				immediate: true
			}
		},
		methods: {
			...mapActions(["setLeftMenus"]),
			//获取文本色
			f_getColor(hex) {
				var r = parseInt("0x" + hex.slice(1, 3));
				var g = parseInt("0x" + hex.slice(3, 5));
				var b = parseInt("0x" + hex.slice(5, 7));
				var yiq = (r * 299 + g * 587 + b * 114) / 1000;
				return yiq >= 128 ? "black" : "white";
			},
			f_handleSelect(key, keyPath) {
				this.activeIndex = key;
				localStorage.setItem("activeIndex", key);
			}
		}
	};
</script>

	
<style scoped>
	.head-nav {
		width: 100%;
		position: absolute;
		top: 0px;
		height: 50px;
		min-width: 600px;
		color: #fff;
		border: none;
		background: #409eff;
		transition-property: all;
		-webkit-transition-property: all; /* Safari */
		-webkit-transition-duration: 0.4s; /* Safari */
	}
	.logo-container {
		line-height: 55px;
		text-align: right;
		float: left;
		color: #ffffff;
		width: 230px;
	}
	.logo {
		height: 30px;
		width: 55px;
		margin-right: 20px;
		/* margin-left: -5px; */
		vertical-align: middle;
		display: inline-block;
	}
	.title {
		vertical-align: middle;
		font-size: 20px;
		font-weight: 500;

		font-weight: bold;
	}

	.avatar {
		width: 40px;
		height: 40px;
		vertical-align: -webkit-baseline-middle;
		display: inline-block;
	}
	.link--mallki {
		vertical-align: middle;
	}
	.chat {
		margin-right: 30px;
		vertical-align: middle;
		width: 28px;
		height: 28px;
		cursor: pointer;
	}
	.welcome {
		display: inline-block;
		width: auto;
		vertical-align: middle;
		padding: 0 5px;
	}
	.name {
		line-height: 20px;
		text-align: center;
		font-size: 17px;
		font-family: "Microsoft YaHei";
	}
	.comename {
		font-size: 12px;
	}
	.avatarname {
		color: #fff;
		font-weight: bolder;
	}
	.username {
		cursor: pointer;
		margin-right: 5px;
	}
	.el-dropdown {
		color: #fff;
	}
	.userinfo {
		line-height: 50px;
		text-align: right;
		padding-right: 30px;
	}
	img:hover {
		cursor: pointer;
		-webkit-animation: scaleout 2.3s infinite ease-in-out;
		animation: scaleout 2.3s infinite ease-in-out;
	}
	@-webkit-keyframes scaleout {
		0% {
			-webkit-transform: scale(1);
		}
		100% {
			-webkit-transform: scale(2.1);
			opacity: 0;
		}
	}
	@keyframes scaleout {
		0% {
			transform: scale(1);
			-webkit-transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			-webkit-transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.5);
			-webkit-transform: scale(1.5);
			opacity: 0.5;
		}
	}
</style>
