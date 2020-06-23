<template>
	<div class="mainCon dataLog">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="searchForm.dataTable" placeholder="请输入表名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.dataId" placeholder="请输入数据ID"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="searForm">查询</el-button>
					<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-plus" @click="compare">数据比较</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-tag>
			<span class="el-icon-warning"></span>
			已选择
			<span>{{multipleSelection.length}}</span>项
		</el-tag>
		<el-button type="text" @click="clear">清空</el-button>
		<div class="tables">
			<el-table
				border
				:data="tableData"
				ref="multipleTable"
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="dataTable" label="表名"></el-table-column>
				<el-table-column prop="dataId" label="数据ID"></el-table-column>
				<el-table-column prop="dataVersion" label="版本号"></el-table-column>
				<el-table-column prop="dataContent" label="数据内容" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createBy" label="创建人"></el-table-column>
			</el-table>
		</div>
		<div class="pages" v-if="total>0">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page.sync="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="searchForm.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
		<!-- 对比dialog -->
		<el-dialog title="数据对比" :visible.sync="isCompare" append-to-body>
			<el-table style="width:100%" border :data="tableData2" v-loading="loading2">
				<el-table-column prop="attribute" label="字段名"></el-table-column>
				<el-table-column prop="version1" label="版本号1"></el-table-column>
				<el-table-column prop="version2" label="版本号2"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				searchForm: {
					dataTable: "",
					dataId: "",
					pageSize: 10,
					pageIndex: 1
				},
				multipleSelection: [],
				loading: true,
				tableData: [],
				total: 0,
				currentPage: 1,
				isCompare: false,
				loading2: false,
				tableData2: []
			};
		},
		mounted() {
			this.resetData();
		},
		methods: {
			compare() {
				if (this.multipleSelection.length != 2) {
					this.$message({
						message: "请选择两条数据",
						type: "warning"
					});
					return;
				}
				if (
					this.multipleSelection[0].dataTable ===
						this.multipleSelection[1].dataTable &&
					this.multipleSelection[0].dataId ===
						this.multipleSelection[1].dataId
				) {
					this.loading2 = true;
					this.$store
						.dispatch("dataVS", {
							id1: this.multipleSelection[0].id,
							id2: this.multipleSelection[1].id
						})
						.then(res => {
							this.isCompare = true;
							this.loading2 = false;
							this.tableData2 = res.body.data.content;
						});
				} else {
					this.$message({
						message: "请选择相同的数据库表和数据Id进行比较",
						type: "warning"
					});
					return;
				}
			},
			resetData() {
				this.loading = true;
				var param = {
					queryParams: [
						{
							key: "dataTable",
							value: this.searchForm.dataTable,
							logic: "Contain"
						},
						{
							key: "dataId",
							value: this.searchForm.dataId,
							logic: "Contain"
						}
					],
					pageIndex: this.searchForm.pageIndex,
					pageSize: this.searchForm.pageSize
				};

				this.$store
					.dispatch("getDataSnapshotPage", { body: param })
					.then(res => {
						if (res.body.errorCode == 0) {
							this.loading = false;
							this.tableData = res.body.data.content;

							this.total = res.body.data.totalElements;
						}
					});
			},
			searForm() {
				this.currentPage = 1;
				this.searchForm.pageIndex = 1;
				this.resetData();
			},
			resetForm() {
				this.currentPage = 1;
				this.searchForm.pageIndex = 1;
				this.searchForm.dataTable = "";
				this.searchForm.dataId = "";
				this.resetData();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			clear() {
				this.$refs.multipleTable.clearSelection();
			},
			handleSizeChange(val) {
				this.searchForm.pageSize = val;
				this.resetData();
			},
			handleCurrentChange(val) {
				this.searchForm.pageIndex = val;
				this.resetData();
			}
		}
	};
</script>
<style lang="less" scoped>
	.sear_flex {
		display: flex;
		align-items: center;
		margin-bottom: 24px;
		label {
			width: auto;
			padding-right: 10px;
		}
		.sear_inp {
			flex: 1 1;
			padding-right: 20px;
		}
	}
	.currentC {
		border: 1px solid #91d5ff;
		background-color: #e6f7ff;
		padding: 12px 15px;
		margin: 15px 0px;
		span {
			color: #1890ff;
		}
		a {
			color: #1890ff;
			margin-left: 5px;
		}
	}
</style>

