<template>
	<div class="mainCon server">
		<el-tag>
			<span class="el-icon-warning"></span>
			上次更新时间：{{time}}
		</el-tag>
		<el-button type="text" @click="update">立即更新</el-button>
		<div class="tables">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="name" label="参数">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.index<2">{{scope.row.name}}</el-tag>
						<el-tag v-if="scope.row.index>=2">{{scope.row.name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="description" label="描述"></el-table-column>
				<el-table-column label="当前值">
					<template slot-scope="scope">
						<span v-if="scope.row.index==2">{{scope.row.value | dateFormat}}</span>
						<span v-else>{{scope.row.value}}</span>
					</template>
				</el-table-column>
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
		filters: {
			dateFormat(val) {
				return (val = new Date(+new Date() + 8 * 3600 * 1000)
					.toISOString()
					.replace(/T/g, " ")
					.replace(/\.[\d]{3}Z/, ""));
			}
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
					tomcat("/metrics/system.cpu.count", param),
					tomcat("/metrics/system.cpu.usage", param),
					tomcat("/metrics/process.start.time", param),
					tomcat("/metrics/process.uptime", param),
					tomcat("/metrics/process.cpu.usage", param)
				]).then(res => {
					this.tableData = [];
					that.tableData.push({
						name: res[0].data.name,
						description: "tomcat 已创建 session 数",
						value: res[0].data.measurements[0].value + "核",
						index: 0
					});
					that.tableData.push({
						name: res[1].data.name,
						description: "tomcat 已过期 session 数",
						value:
							parseFloat(
								res[1].data.measurements[0].value * 100
							).toFixed(2) + "%",
						index: 1
					});
					that.tableData.push({
						name: res[2].data.name,
						description: "tomcat 当前活跃 session 数",
						value: res[2].data.measurements[0].value,
						index: 2
					});
					that.tableData.push({
						name: res[3].data.name,
						description: "tomcat 活跃 session 数峰值",
						value: res[3].data.measurements[0].value + "秒",
						index: 3
					});
					that.tableData.push({
						name: res[4].data.name,
						description: "超过session 最大配置后，拒绝的 session 个数",
						value:
							parseFloat(
								res[1].data.measurements[0].value * 100
							).toFixed(2) + "%",
						index: 4
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

