<template>
	<el-row class="scrollbar" :class="istop?'menupage':'menupage2'">
		<el-col style>
			<el-menu
				class="el-menu-vertical-demo"
				:default-active="onRoutes||('/'+onRoutes)"
				@select="handleSelect"
				:collapse="isCollapse"
				unique-opened
			>
				<template v-for="item in leftmenus">
					<template
						v-if="item.children && item.children.length>0 && item.children[0].menuType!='Button'"
					>
						<el-submenu :index="item.route" :key="item.route">
							<template slot="title">
								<i class="icon iconfont" :class="item.icon?item.icon:'el-icon-star-on'"></i>
								<span slot="title">{{ item.menuName }}</span>
							</template>
							<left-menu-tree :data="item.children"></left-menu-tree>
						</el-submenu>
					</template>
					<el-menu-item v-else :index="item.route" :key="item.route+'_only'">
						<i class="icon iconfont" :class="item.icon?item.icon:'el-icon-star-on'"></i>
						<span slot="title">{{ item.menuName }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</el-col>
	</el-row>
</template>
<script>
	import { mapState, mapGetters } from "vuex";
	import leftMenuTree from "./leftMenuTree";
	export default {
		components: { leftMenuTree },
		props: {
			isCollapse: false,
			istop: false
		},
		computed: {
			...mapGetters(["leftmenus"]),
			onRoutes() {
				return this.$route.path;
			}
		},
		data() {
			return {
				menu_data: {},
				width: ""
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				if (key.indexOf(".html") > -1) {
					window.open(key);
				} else {
					if (this.onRoutes != key) {
						this.$router.push(key);
					}
				}
			}
		}
	};
</script>
<style>
	.caione {
		float: left;
		cursor: pointer;
	}
	.caitwo {
		transform: rotate(180deg);
		-ms-transform: rotate(180deg); /* IE 9 */
		-moz-transform: rotate(180deg); /* Firefox */
		-webkit-transform: rotate(180deg); /* Safari 和 Chrome */
		-o-transform: rotate(180deg);
		cursor: pointer;
	}
</style>
<style scoped>
	.iconfont {
		padding-right: 10px;
	}
	.menupage {
		position: fixed;
		top: 61px;
		height: calc(100% - 101px);
		left: 0;
		background-color: #ffffff;
		border-right: 2px solid #f2f2f2;
		transition-property: all;
		-webkit-transition-property: all; /* Safari */
		-webkit-transition-duration: 0.4s; /* Safari */
	}
	.menupage2 {
		position: fixed;
		top: 0;
		height: 100%;
		left: 0;
		background-color: #ffffff;
		border-right: 2px solid #f2f2f2;
		transition-property: all;
		-webkit-transition-property: all; /* Safari */
		-webkit-transition-duration: 0.4s; /* Safari */
	}
	.scrollbar {
		overflow-y: scroll;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */
	}
	.scrollbar::-webkit-scrollbar {
		/* WebKit */
		width: 0;
		height: 0;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 230px;
		min-height: 400px;
	}
	.el-menu-vertical-demo {
		width: 55px;
	}
	.el-submenu .el-menu-item {
		min-width: 210px;
		padding: 5px 0 5px 5px;
		line-height: 24px;
		height: auto;
	}
</style>
