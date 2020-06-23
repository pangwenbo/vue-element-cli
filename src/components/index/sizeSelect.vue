<template>
	<el-dropdown trigger="click" @command="handleSetSize">
		<el-tooltip content="选择字体" placement="bottom" effect="dark">
			<i class="el-icon-zitidaxiaoim" style="font-size:28px;vertical-align:middle;cursor: pointer;"></i>
		</el-tooltip>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item
				v-for="item of sizeOptions"
				:key="item.value"
				:disabled="size === item.value"
				:command="item.value"
			>{{ item.label }}</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
	export default {
		data() {
			return {
				sizeOptions: [
					{ label: "大  号", value: "default" },
					{ label: "小  号", value: "small" },
					{ label: "迷  你 ", value: "mini" }
				]
			};
		},
		computed: {
			size() {
				return localStorage.getItem("size");
			}
		},
		methods: {
			handleSetSize(size) {
				this.$ELEMENT.size = size;
				localStorage.setItem("size", size);
				this.$router.go(0);
				this.$message({
					message: "设置成功",
					type: "success"
				});
			}
		}
	};
</script>
<style>
	.el-dropdown-menu--mini .el-dropdown-menu__item {
		line-height: 30px !important;
	}
</style>
