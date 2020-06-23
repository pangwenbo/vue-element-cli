<template>
	<div class="redis mainCon">
		<div class="rCharts">
			<div class="chartOne">
				<div class="title">Radis 内存实时占用情况（KB）</div>
				<div class="echarts" id="echartsKb"></div>
			</div>
			<div class="chartOne">
				<div class="title">Radis Key 实时数量（个）</div>
				<div class="echarts" id="echartsKey"></div>
			</div>
		</div>
		<div class="title title2">Redis 详细信息</div>
		<div class="tables">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="key" label="Key" align="center"></el-table-column>
				<el-table-column prop="description" label="Description"></el-table-column>
				<el-table-column prop="value" label="Value" align="center"></el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import echarts from "echarts";
	import { setTimeout, setInterval } from "timers";
	export default {
		data() {
			return {
				tableData: [],
				loading: true,
				echarts1: "",
				echarts2: "",
				data1: [],
				data2: [],
				time: ""
			};
		},
		mounted() {
			var that = this;
			this.$store.dispatch("getRedisInfo").then(res => {
				this.loading = false;
				this.tableData = res.body.data;
			});
			this.toDrew();
			window.clearInterval(this.time);
			this.time = window.setInterval(function() {
				that.toDrew();
			}, 3000);

			window.addEventListener("resize", function() {
				setTimeout(function() {
					var echart1 = document.getElementById("echartsKb");
					if (echart1) {
						if (that.echarts1.resize) {
							that.echarts1.resize();
						}
						if (that.echarts2.resize) {
							that.echarts2.resize();
						}
					}
				}, 300);
			});
		},
		beforeRouteLeave(to, from, next) {
			window.clearInterval(this.time);
			next();
		},
		methods: {
			toDrew() {
				this.$store.dispatch("getMemoryInfo").then(res => {
					res.body.data.create_time = this.formatTime(
						res.body.data.create_time,
						"h:m:s"
					);
					this.data1.push(res.body.data);
					if (this.data1.length > 6) {
						this.data1.splice(0, 1);
					}
					this.drawEchart(this.data1);
				});
				this.$store.dispatch("getKeysSize").then(res => {
					res.body.data.create_time = this.formatTime(
						res.body.data.create_time,
						"h:m:s"
					);
					this.data2.push(res.body.data);
					if (this.data2.length > 6) {
						this.data2.splice(0, 1);
					}
					this.drawEchart2(this.data2);
				});
			},
			formatTime(number, format) {
				var formateArr = ["Y", "M", "D", "h", "m", "s"];
				var returnArr = [];

				var date = new Date(number);
				returnArr.push(date.getFullYear());
				returnArr.push(this.formatNumber(date.getMonth() + 1));
				returnArr.push(this.formatNumber(date.getDate()));

				returnArr.push(this.formatNumber(date.getHours()));
				returnArr.push(this.formatNumber(date.getMinutes()));
				returnArr.push(this.formatNumber(date.getSeconds()));

				for (var i in returnArr) {
					format = format.replace(formateArr[i], returnArr[i]);
				}
				return format;
			},
			formatNumber(n) {
				n = n.toString();
				return n[1] ? n : "0" + n;
			},
			drawEchart(data) {
				this.echarts1 = this.$echarts.init(
					document.getElementById("echartsKb")
				);
				this.echarts1.setOption({
					xAxis: {
						type: "category",
						data: data.map(item => item.create_time),
						axisTick: {
							//y轴刻度线
							show: false
						},
						splitNumber: 6,
						axisLabel: {
							show: true,
							fontSize: 12,
							color: "rgba(0,0,0,0.65)"
						},
						splitLine: {
							show: false
						},
						axisLine: {
							show: true,
							symbol: ["none"],
							lineStyle: {
								color: "#ccc",
								width: 2
							}
						}
					},
					tooltip: {
						trigger: "axis"
					},
					grid: {
						left: "40px",
						right: "40px",
						bottom: "20px",
						top: "35px",
						containLabel: true
					},
					yAxis: {
						type: "value",
						axisTick: {
							//y轴刻度线
							show: false
						},
						axisLabel: {
							show: true,
							fontSize: 12,
							color: "rgba(0,0,0,0.65)"
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ["#ccc"],
								width: 1,
								type: "dashed"
							}
						},
						axisLine: {
							show: false
						}
					},
					series: [
						{
							smooth: true,
							symbol: "circle",
							symbolSize: 5,
							type: "line",
							data: data.map(item => item.used_memory),
							itemStyle: {
								normal: {
									color: "#228FFE",
									borderColor: "#228FFE",
									lineStyle: {
										color: "#228FFE",
										width: 8
									}
								}
							},
							areaStyle: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: "rgba(34,143,254,0.6)"
										},
										{
											offset: 1,
											color: "rgba(34,143,254,0.3"
										}
									]
								)
							}
						}
					]
				});
			},
			drawEchart2(data) {
				this.echarts2 = this.$echarts.init(
					document.getElementById("echartsKey")
				);
				this.echarts2.setOption({
					xAxis: {
						type: "category",
						data: data.map(item => item.create_time),
						axisTick: {
							//y轴刻度线
							show: false
						},
						axisLabel: {
							show: true,
							fontSize: 12,
							color: "rgba(0,0,0,0.65)"
						},
						splitLine: {
							show: false
						},
						axisLine: {
							show: true,
							symbol: ["none"],
							lineStyle: {
								color: "#ccc",
								width: 2
							}
						}
					},
					tooltip: {
						trigger: "axis"
					},
					grid: {
						left: "40px",
						right: "40px",
						bottom: "20px",
						top: "35px",
						containLabel: true
					},
					yAxis: {
						type: "value",
						axisTick: {
							//y轴刻度线
							show: false
						},
						axisLabel: {
							show: true,
							fontSize: 12,
							color: "rgba(0,0,0,0.65)"
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ["#ccc"],
								width: 1,
								type: "dashed"
							}
						},
						axisLine: {
							show: false
						}
					},
					series: [
						{
							smooth: true,
							symbol: "circle",
							symbolSize: 5,
							type: "line",
							data: data.map(item => item.dbSize),
							itemStyle: {
								normal: {
									color: "#F5222D",
									borderColor: "#F5222D",
									lineStyle: {
										color: "#F5222D",
										width: 8
									}
								}
							},
							areaStyle: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: "rgba(245,34,45,0.6)"
										},
										{
											offset: 1,
											color: "rgba(245,34,45,0.3"
										}
									]
								)
							}
						}
					]
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	.rCharts {
		overflow: hidden;
		.chartOne {
			float: left;
			width: 50%;
			.echarts {
				height: 300px;
				width: 100%;
			}
		}
	}
	.title {
		color: rgba(0, 0, 0, 0.85);
		&.title2 {
			margin: 20px 0px 10px 0px;
		}
	}
</style>

