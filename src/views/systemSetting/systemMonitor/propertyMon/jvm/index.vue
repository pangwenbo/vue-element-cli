<template>
	<div class="mainCon server">
		<el-tag>
			<span class="el-icon-warning"></span>
			上次更新时间：{{time}}
		</el-tag>
		<el-button type="text" @click="update">立即更新</el-button>
		<div class="tables">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="param" label="参数">
					<template slot-scope="scope">
						<el-tag type="success" v-if="textInfo[scope.row.param].color=='green'">{{scope.row.param}}</el-tag>
						<el-tag v-if="textInfo[scope.row.param].color=='orange'" type="warning">{{scope.row.param}}</el-tag>
						<el-tag v-if="textInfo[scope.row.param].color=='blue'">{{scope.row.param}}</el-tag>
						<el-tag v-if="textInfo[scope.row.param].color=='pink'" type="danger">{{scope.row.param}}</el-tag>
						<el-tag v-if="textInfo[scope.row.param].color=='cyan'" type="info">{{scope.row.param}}</el-tag>
						<el-tag v-if="textInfo[scope.row.param].color=='purple'" type="self">{{scope.row.param}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="描述">
					<template slot-scope="scope">
						<div>{{textInfo[scope.row.param].text}}</div>
					</template>
				</el-table-column>
				<el-table-column label="当前值">
					<template slot-scope="scope">
						<span>{{scope.row.value}}{{textInfo[scope.row.param].unit}}</span>
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
				tableData: [],
				// 当一条记录中需要取出多条数据的时候需要配置该字段
				moreInfo: {
					"jvm.gc.pause": [".count", ".totalTime"]
				},
				textInfo: {
					"jvm.memory.max": {
						color: "purple",
						text: "JVM 最大内存",
						unit: "MB"
					},
					"jvm.memory.committed": {
						color: "purple",
						text: "JVM 可用内存",
						unit: "MB"
					},
					"jvm.memory.used": {
						color: "purple",
						text: "JVM 已用内存",
						unit: "MB"
					},
					"jvm.buffer.memory.used": {
						color: "cyan",
						text: "JVM 缓冲区已用内存",
						unit: "MB"
					},
					"jvm.buffer.count": {
						color: "cyan",
						text: "当前缓冲区数量",
						unit: "个"
					},
					"jvm.threads.daemon": {
						color: "green",
						text: "JVM 守护线程数量",
						unit: "个"
					},
					"jvm.threads.live": {
						color: "green",
						text: "JVM 当前活跃线程数量",
						unit: "个"
					},
					"jvm.threads.peak": {
						color: "green",
						text: "JVM 峰值线程数量",
						unit: "个"
					},
					"jvm.classes.loaded": {
						color: "orange",
						text: "JVM 已加载 Class 数量",
						unit: "个"
					},
					"jvm.classes.unloaded": {
						color: "orange",
						text: "JVM 未加载 Class 数量",
						unit: "个"
					},
					"jvm.gc.memory.allocated": {
						color: "pink",
						text: "GC 时, 年轻代分配的内存空间",
						unit: "MB"
					},
					"jvm.gc.memory.promoted": {
						color: "pink",
						text: "GC 时, 老年代分配的内存空间",
						unit: "MB"
					},
					"jvm.gc.max.data.size": {
						color: "pink",
						text: "GC 时, 老年代的最大内存空间",
						unit: "MB"
					},
					"jvm.gc.live.data.size": {
						color: "pink",
						text: "FullGC 时, 老年代的内存空间",
						unit: "MB"
					},
					"jvm.gc.pause.count": {
						color: "blue",
						text: "系统启动以来GC 次数",
						unit: "次"
					},
					"jvm.gc.pause.totalTime": {
						color: "blue",
						text: "系统启动以来GC 总耗时",
						unit: "秒"
					}
				}
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
					tomcat("/metrics/jvm.memory.max", param),
					tomcat("/metrics/jvm.memory.committed", param),
					tomcat("/metrics/jvm.memory.used", param),
					tomcat("/metrics/jvm.buffer.memory.used", param),
					tomcat("/metrics/jvm.buffer.count", param),
					tomcat("/metrics/jvm.threads.daemon", param),
					tomcat("/metrics/jvm.threads.live", param),
					tomcat("/metrics/jvm.threads.peak", param),
					tomcat("/metrics/jvm.classes.loaded", param),
					tomcat("/metrics/jvm.classes.unloaded", param),
					tomcat("/metrics/jvm.gc.memory.allocated", param),
					tomcat("/metrics/jvm.gc.memory.promoted", param),
					tomcat("/metrics/jvm.gc.max.data.size", param),
					tomcat("/metrics/jvm.gc.live.data.size", param),
					tomcat("/metrics/jvm.gc.pause", param)
				]).then(res => {
					let info = [];
					res.forEach((value, id) => {
						let more = this.moreInfo[value.data.name];
						if (!(more instanceof Array)) {
							more = [""];
						}
						more.forEach((item, idx) => {
							let param = value.data.name + item;
							let val = value.data.measurements[idx].value;

							if (
								param === "jvm.memory.max" ||
								param === "jvm.memory.committed" ||
								param === "jvm.memory.used" ||
								param === "jvm.buffer.memory.used" ||
								param === "jvm.gc.memory.allocated" ||
								param === "jvm.gc.memory.promoted" ||
								param === "jvm.gc.max.data.size" ||
								param === "jvm.gc.live.data.size"
							) {
								val = this.convert(val, Number);
							}
							info.push({
								id: param + id,
								param,
								text: "false value",
								value: val
							});
						});
					});
					this.tableData = info;
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
			},
			convert(value, type) {
				if (type === Number) {
					return Number(value / 1048576).toFixed(3);
				}
				return value;
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
	.el-tag--self {
		color: #722ed1;
		background: #f9f0ff;
		border-color: #d3adf7;
	}
	.el-tag--info {
		color: #13c2c2;
		background: #e6fffb;
		border-color: #87e8de;
	}
</style>

