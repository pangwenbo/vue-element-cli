<template>
	<div class="mainCon tomcat">
		<el-tag>
			<span class="el-icon-warning"></span>
			上次更新时间：{{time}}
		</el-tag>
		<el-button type="text" @click="update">立即更新</el-button>
		<div class="tables">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="name" label="参数">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.index<5">{{scope.row.name}}</el-tag>
						<el-tag v-if="scope.row.index<9 && scope.row.index>4">{{scope.row.name}}</el-tag>
						<el-tag type="danger" v-if="scope.row.index<11 && scope.row.index>8">{{scope.row.name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="description" label="描述"></el-table-column>
				<el-table-column prop="value" label="当前值"></el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import { tomcat } from "@/utils/systemMonitor";
	import { setTimeout } from "timers";
	export default {
		data() {
			return {
				time: "",
				loading: true,
				tableData: []
			};
		},
		mounted() {
			this.resetData();
		},
		methods: {
			update() {
				this.resetData();
			},
			resetData() {
				var that = this;
				var date = new Date();
				var param = {
					_t: date.getTime()
				};
				this.loading = true;
				Promise.all([
					tomcat("/metrics/tomcat.sessions.created", param),
					tomcat("/metrics/tomcat.sessions.expired", param),
					tomcat("/metrics/tomcat.sessions.active.current", param),
					tomcat("/metrics/tomcat.sessions.active.max", param),
					tomcat("/metrics/tomcat.sessions.rejected", param),
					tomcat("/metrics/tomcat.global.sent", param),
					tomcat("/metrics/tomcat.global.request.max", param),
					tomcat("/metrics/tomcat.global.request", param),
					tomcat("/metrics/tomcat.threads.current", param),
					tomcat("/metrics/tomcat.threads.config.max", param)
				]).then(res => {
					this.tableData = [];
					that.tableData.push({
						name: res[0].data.name,
						description: "tomcat 已创建 session 数",
						value: res[0].data.measurements[0].value + "个",
						index: 0
					});
					that.tableData.push({
						name: res[1].data.name,
						description: "tomcat 已过期 session 数",
						value: res[1].data.measurements[0].value + "个",
						index: 1
					});
					that.tableData.push({
						name: res[2].data.name,
						description: "tomcat 当前活跃 session 数",
						value: res[2].data.measurements[0].value + "个",
						index: 2
					});
					that.tableData.push({
						name: res[3].data.name,
						description: "tomcat 活跃 session 数峰值",
						value: res[3].data.measurements[0].value + "个",
						index: 3
					});
					that.tableData.push({
						name: res[4].data.name,
						description: "超过session 最大配置后，拒绝的 session 个数",
						value: res[4].data.measurements[0].value + "个",
						index: 4
					});
					that.tableData.push({
						name: res[5].data.name,
						description: "发送的字节数",
						value: res[5].data.measurements[0].value + " bytes",
						index: 5
					});
					that.tableData.push({
						name: res[6].data.name,
						description: "request 请求最长耗时",
						value: res[6].data.measurements[0].value + "秒",
						index: 6
					});
					that.tableData.push({
						name: res[7].data.name + ".count",
						description: "全局 request 请求次数",
						value: res[7].data.measurements[0].value + "次",
						index: 7
					});
					that.tableData.push({
						name: res[7].data.name + ".totalTime",
						description: "全局 request 请求总耗时",
						value: res[7].data.measurements[1].value + "秒",
						index: 8
					});
					that.tableData.push({
						name: res[8].data.name,
						description: "tomcat 当前线程数（包括守护线程）	",
						value: res[8].data.measurements[0].value + "个",
						index: 9
					});
					that.tableData.push({
						name: res[9].data.name,
						description: "tomcat 配置的线程最大数",
						value: res[9].data.measurements[0].value + "个",
						index: 10
					});
					this.loading = false;
					var date = new Date();
					var dateF =
						date.getFullYear() +
						"-" +
						(date.getMonth() + 1 < 10
							? "0" + (date.getMonth() + 1)
							: date.getMonth() + 1) +
						"-" +
						(date.getDate() < 10
							? "0" + date.getDate()
							: date.getDate()) +
						" " +
						(date.getHours() < 10
							? "0" + date.getHours()
							: date.getHours()) +
						":" +
						(date.getMinutes() < 10
							? "0" + date.getMinutes()
							: date.getMinutes()) +
						":" +
						(date.getSeconds() < 10
							? "0" + date.getSeconds()
							: date.getSeconds());
					this.time = dateF;
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	.currentC {
		border: 1px solid #91d5ff;
		background-color: #e6f7ff;
		padding: 12px 15px;
		margin-bottom: 15px;
		span {
			color: #1890ff;
		}
		a {
			color: #1890ff;
			margin-left: 25px;
		}
	}
	.el-tag--small {
		padding: 0 8px;
	}
</style>

