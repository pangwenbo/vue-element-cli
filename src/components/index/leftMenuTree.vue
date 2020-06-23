<template>
	<div class="menutree">
		<div v-for="(menu,index) in data" :key="index">
			<el-submenu
				:index="menu.route"
				v-if="menu.children && menu.children.length>0 && menu.children[0].menuType!='Button'"
			>
				<template slot="title">
					<span slot="title" style="padding-left:10px;">
						<i :class="menu.icon"></i>
						{{menu.menuName}}
					</span>
				</template>
				<left-menu-tree :data="menu.children"></left-menu-tree>
			</el-submenu>
			<el-menu-item v-else :index="menu.route">
				<span slot="title" style="padding-left:10px;">
					<i :class="menu.icon"></i>
					{{menu.menuName}}
				</span>
			</el-menu-item>
		</div>
	</div>
</template>
<script>
	import leftMenuTree from "./leftMenuTree.vue";
	export default {
		props: ["data"],
		components: {
			leftMenuTree
		},
		name: "leftMenuTree",
		data() {
			return {
				menu_data: {}
			};
		}
	};
</script>
