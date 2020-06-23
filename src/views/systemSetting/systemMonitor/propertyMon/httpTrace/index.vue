<!--请求追踪  -->
<template>
	<div class="main">
		<el-tag>
			<span class="el-icon-warning"></span>
			共追踪到
			<span>{{total}}</span> 条近期HTTP请求记录
		</el-tag>
		<el-button type="text" @click="refresh">立即更新</el-button>
		<el-table ref="filterTable" :data="tableData" style="width: 100%">
			<el-table-column label="请求时间" width="240">
				<template slot-scope="scope">
					<span>{{ scope.row.timestamp | dateFormat}}</span>
				</template>
			</el-table-column>

			<el-table-column
				prop="request.method"
				label="请求方法"
				width="180"
				:filters="[{text: 'OPTIONS', value: 'OPTIONS'}, {text: 'GET', value: 'GET'},{text: 'POST', value: 'POST'},{text: 'DELETE', value: 'DELETE'},{text: 'PUT', value: 'PUT'}]"
				:filter-method="filterHandler"
			>
				<template slot-scope="scope">
					<el-tag v-if="scope.row.request.method === 'OPTIONS'">{{scope.row.request.method}}</el-tag>
					<el-tag
						type="success"
						v-else-if="scope.row.request.method === 'GET'"
					>{{ scope.row.request.method}}</el-tag>
					<el-tag
						type="warning"
						v-else-if="scope.row.request.method === 'POST'"
					>{{ scope.row.request.method}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="request.uri" label="请求URL"></el-table-column>
			<el-table-column prop="response.status" label="响应状态" width="140">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.response.status < 200">{{ scope.row.response.status}}</el-tag>
					<el-tag
						type="success"
						v-else-if="scope.row.response.status < 201"
					>{{ scope.row.response.status}}</el-tag>
					<el-tag type="info" v-else-if="scope.row.response.status < 399">{{ scope.row.response.status}}</el-tag>
					<el-tag
						type="warning"
						v-else-if="scope.row.response.status < 403"
					>{{ scope.row.response.status}}</el-tag>
					<el-tag
						type="danger"
						v-else-if="scope.row.response.status < 501"
					>{{ scope.row.response.status}}</el-tag>
					<span v-else>{{ scope.row.response.status}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="timeTaken" label="请求耗时" width="140">
				<template slot-scope="scope">
					<el-tag type="success">{{ scope.row.timeTaken}}ms</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="pagination" class="pagination">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30]"
				:page-size="pageSize"
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="parseInt(total)"
			></el-pagination>
		</div>
	</div>
</template>

<script>
	import { httpTrace } from "@/utils/systemMonitor";

	export default {
		data() {
			return {
				multipleSelection: [],
				tableData: [],
				data: [],
				loading: true,
				pagination: true,
				pageIndex: 1,
				pageSize: 10,
				currentPage: 1,
				total: null
			};
		},
		mounted() {
			this.getData();
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
			resetDateFilter() {
				this.$refs.filterTable.clearFilter("date");
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},

			filterHandler(value, row, column) {
				return row.request.method === value;
				// this.getData()
			},
			refresh() {
				this.loading = true;
				this.getData();
			},
			getData() {
				var dateNow = new Date();
				var ff = dateNow.getTime();
				let para = {
					_t: ff
				};
				httpTrace(para).then(res => {
					this.data = res.data.traces;
					this.tableData = res.data.traces.slice(0, 10);

					this.total = res.data.traces.length;
					this.loading = false;
				});
			},
			handleSizeChange(val) {
				this.tableData = this.data.slice(0, val);
			},
			handleCurrentChange(val) {
				// this.pageIndex = val;
				// this.getData();
				console.log(this.data);

				this.tableData = this.data.slice(
					(val - 1) * this.pageSize,
					val * this.pageSize
				);
			}
		}
	};
</script>
<style lang='scss' scoped>
	.main {
		background: #fff;
		padding: 20px;
		.titleChecked {
			width: 100%;
			background: #e6f7ff;
			border: 1px solid #91d5ff;
			line-height: 40px;
			border-radius: 6px;
			margin: 10px 0;
			.el-icon-warning {
				margin-left: 20px;
			}
			span {
				color: #1890ff;
			}
		}
		.pagination {
			text-align: right;
			margin-top: 20px;
		}
	}
</style>