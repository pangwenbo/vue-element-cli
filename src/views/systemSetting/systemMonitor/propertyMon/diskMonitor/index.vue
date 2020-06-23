<!-- 磁盘监控 -->
<template>
	<div class="main">
		<div id="myChart"></div>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				this.$store.dispatch("queryDiskInfo").then(res => {
					if (res.body.errorCode == 0) {
						console.log(res.body);
						let result = parseInt(res.body.data.list[0].restPPT);

						this.drawLine(result);
					}
				});
			},
			drawLine(data) {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(
					document.getElementById("myChart")
				);
				// 绘制图表
				myChart.setOption({
					tooltip: {
						formatter: "{a} <br/>{b} : {c}%"
					},
					toolbox: {
						// feature: {
						//   restore: {},
						//   saveAsImage: {}
						// }
					},
					series: [
						{
							name: "业务指标",
							type: "gauge",
							detail: { formatter: "{value}%" },
							data: [{ value: data }]
						}
					]
				});
			}
		}
	};
</script>
<style lang='scss' scoped>
	.main {
		width: 100%;
		// height: 100%;
		background: #fff;
		padding: 20px;
		#myChart {
			width: 600px;
			height: 600px;
			margin: 20px auto;
		}
	}
</style>