<template>
	<el-popover placement="bottom" width="300" @show="msgNotice" trigger="click">
		<el-tabs class="header_notice" v-model="noticeTabActive" @tab-click="switchNoticeTab">
			<el-tab-pane :label="`通知公告(${headerNotice.announceTotal})`" name="notice">
				<div
					class="header_notice_card"
					v-for="(item, i) in headerNotice.announce"
					:key="i"
					@click="checkNoticeDetail(item)"
				>
					<div class="title">{{item.title}}</div>
					<div class="base_data">{{item.sendTime}}发布</div>
				</div>
				<el-button class="more_button" @click="goMyNotice">查看更多</el-button>
			</el-tab-pane>
			<el-tab-pane :label="`系统消息(${headerNotice.systemTotal})`" name="sysMsg">
				<div
					class="header_notice_card"
					v-for="(item, i) in headerNotice.system"
					:key="i"
					@click="checkNoticeDetail(item)"
				>
					<div class="title">{{item.title}}</div>
					<div class="base_data">{{item.sendTime}}发布</div>
				</div>
				<el-button class="more_button" @click="goMyNotice">查看更多</el-button>
			</el-tab-pane>
		</el-tabs>
		<div slot="reference">
			<el-badge :max="99" :value="headerNotice.announceTotal + headerNotice.systemTotal" class="item">
				<i class="iconfont icontixing"></i>
			</el-badge>
		</div>
	</el-popover>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
				noticeTabActive: "notice"
			};
		},
		mounted() {
			this.initWebSocket();
			this.getNotice();
		},
		computed: {
			...mapState({
				ownInfo: state => state.common.ownInfo,
				headerNotice: state => state.common.headerNotice
			})
		},
		methods: {
			...mapActions(["countAnnounceReadInfo"]),
			getNotice() {
				this.countAnnounceReadInfo().then(res => {
					console.log(res);
				});
			},
			initWebSocket() {
				let wsUrl = window.api.base.replace("http", "ws");
				let websock = new WebSocket(
					wsUrl + "/websocket/" + this.ownInfo.id
				);
				websock.onopen = this.websocketOnopen;
				websock.onerror = this.websocketOnerror;
				websock.onmessage = this.websocketOnmessage;
				websock.onclose = this.websocketClose;
			},
			websocketOnopen: function() {
				console.log("WebSocket连接成功");
			},
			websocketOnerror: function(e) {
				console.log("WebSocket连接发生错误");
			},
			websocketOnmessage: function(e) {
				console.log("数据更新");
				console.log(e);
				console.log(JSON.parse(e.data));
				let message = JSON.parse(e.data);
				this.getNotice();
				const h = this.$createElement;
				this.$message({
					title: `${message.title}`,
					// dangerouslyUseHTMLString: true,
					message: `发布人:${message.senderName}`,
					duration: 3000,
					position: "bottom-right"
				});
			},
			websocketClose: function(e) {
				console.log("connection closed (" + e + ")");
			},
			msgNotice() {
				//消息提醒展开
				this.noticeTabActive = "notice";
			},
			switchNoticeTab(tab, event) {},
			goMyNotice() {
				this.msgNotice();
				this.$router.push("/userNotice");
			},
			checkNoticeDetail(item) {
				this.$emit("checkNoticeDetail", item);
			}
		}
	};
</script>

<style lang="less">
	.header_notice {
		.el-tabs__content {
			max-height: 300px;
			overflow-y: auto;
		}
		.el-tabs__content::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
			height: 1px;
		}
		.el-tabs__content::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 10px;
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: #7c7c7c;
		}
		.el-tabs__content::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			background: #ededed;
		}
		.header_notice_card {
			padding-bottom: 8px;
			border-bottom: 1px solid #e6e6e6;
			margin-bottom: 8px;
			cursor: pointer;
			.title {
				color: #1890ff;
				font-size: 14px;
				margin-bottom: 5px;
			}
			.base_data {
				font-size: 12px;
			}
		}
		.more_button {
			width: 100%;
		}
	}
</style>