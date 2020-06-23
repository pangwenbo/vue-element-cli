<template>
	<el-drawer
		append-to-body
		custom-class="drawer"
		:visible="drawer"
		:title="title"
		:direction="direction"
		:modal="modal"
		:size="size"
		:wrapperClosable="wrapperClosable"
		:show-close="showClose"
		:close-on-press-escape="closeOnPressEscape"
		:before-close="handleClose"
		@open="open"
		@opened="opened"
		@close="close"
		@closed="closed"
	>
		<div v-if="customTitle" slot="title">
			<slot name="title"></slot>
		</div>
		<div
			class="drawer_content"
			:class="{'drawer_content_set': contentBorder}"
			:style="{'paddingBottom': footer ? footerHeight + 15 + 'px' : '15px'}"
		>
			<slot name="content"></slot>
		</div>
		<div class="drawer_footer" v-if="footer" :style="{'width': size, 'height': footerHeight}">
			<el-button @click="cancle">取 消</el-button>
			<el-button type="primary" :loading="submitLoading" @click="submit">确 定</el-button>
		</div>
	</el-drawer>
</template>

<script>
	export default {
		props: {
			drawer: {
				type: Boolean,
				default: false
			},
			direction: {
				//Drawer 打开的方向 rtl / ltr / ttb / btt
				type: String,
				default: "rtl"
			},
			modal: {
				//是否需要遮罩层
				type: Boolean,
				default: true
			},
			size: {
				type: [Number, String],
				default: "0"
			}, //Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释
			wrapperClosable: {
				//点击遮罩层是否可以关闭 Drawer
				type: Boolean,
				default: false
			},
			showClose: {
				//是否显示关闭按钮
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: ""
			},
			customTitle: {
				type: Boolean,
				default: false
			},
			closeOnPressEscape: {
				//是否可以通过按下 ESC 关闭 Drawer
				type: Boolean,
				default: false
			},
			submitLoading: {
				type: Boolean,
				default: false
			},
			contentBorder: {
				//内容边框设置
				type: Boolean,
				default: true
			},
			footer: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				footerHeight: 60
			};
		},
		methods: {
			handleClose() {
				console.log("关闭抽屉");
				this.$emit("update:drawer");
				this.$emit("closeDrawer");
			},
			open() {
				//Drawer 打开的回调
				console.log("Drawer 打开的回调");
				this.$emit("open");
			},
			opened() {
				//Drawer 打开动画结束时的回调
				console.log("Drawer 打开动画结束时的回调");
				this.$emit("opened");
			},
			close() {
				//Drawer 关闭的回调
				console.log("Drawer 关闭的回调");
				this.$emit("close");
			},
			closed() {
				//Drawer 关闭动画结束时的回调
				console.log("Drawer 关闭动画结束时的回调");
				this.$emit("closed");
			},
			cancle() {
				this.$emit("cancle");
			},
			submit() {
				this.$emit("submit");
			}
		}
	};
</script>

<style lang="less">
	.drawer {
		.el-drawer__header {
			padding: 0 15px;
			min-height: 55px;
			margin: 0;
			box-sizing: content-box;
			border-bottom: 1px solid #e6e6e6;
		}
		.drawer_content {
			padding: 15px;
			height: calc(~"100vh - 50px");
			overflow-y: auto;
		}
		.drawer_content_set {
			> div {
				border: 1px solid #e6e6e6;
				padding: 15px;
				border-radius: 2px;
			}
		}
		.edit_footer {
			.el-form-item__content {
				margin-left: 0 !important;
			}
			text-align: center;
		}
		.drawer_footer {
			position: fixed;
			bottom: 0;
			padding: 10px;
			text-align: right;
			border-top: 1px solid #e6e6e6;
			background: #fff;
			z-index: 10;
		}
	}
</style>