<template>
	<div class="model mainCon">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入模型名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="searForm">查询</el-button>
					<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tables">
			<el-table border :data="tableData" style="width: 100%">
				<el-table-column type="index" align="center"></el-table-column>
				<el-table-column prop="name" label="模型名称" align="center"></el-table-column>
				<el-table-column prop="key" label="模型标识" align="center"></el-table-column>
				<el-table-column prop="version" label="版本号" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="300">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="toEdit('修改',scope.row)">修改</el-button>
							<el-button type="text" @click="toPub(scope.row)">部署</el-button>
							<el-button type="text" @click="toDel(scope.row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pages" v-if="total>0">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page.sync="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>

		<el-right :isShow.sync="addOrEdit" :title="title" isBorder @close="closeR">
			<div>
				<iframe
					:src="'http://hae.sw.jpsycn.com/activiti-explorer/modeler.html?modelId='+currentRow.id"
					width="100%"
					height="500"
					align="center"
					frameborder="0"
					scrolling="auto"
				></iframe>
			</div>
		</el-right>
	</div>
</template>
<script>
	import elRight from "@/components/rightDialog";
	export default {
		data() {
			return {
				searchForm: {
					name: "",
					pageSize: 10,
					pageIndex: 0
				},
				initListPermission: {},
				tableData: [],
				loading: true,
				currentPage: 1,
				total: 0,
				currentRow: {},
				addOrEdit: false,
				title: ""
			};
		},
		mounted() {
			this.initListPermission = this.$listPermission([
				"processDesign:update",
				"processDesign:delete",
				"processDesign:add"
			]);
			this.resetData();
		},
		components: { elRight },
		methods: {
			resetData() {
				this.loading = true;
				this.$store
					.dispatch("modelList", {
						pageSize: this.searchForm.pageSize,
						pageIndex: this.searchForm.pageIndex,
						name: this.searchForm.name
					})
					.then(res => {
						if (res.body.errorCode == 0) {
							this.loading = false;
							this.tableData = res.body.data.content;
							this.total = res.body.data.totalElements;
						}
					});
			},
			toEdit(title, row) {
				this.title = title;
				if (row) {
					this.currentRow = JSON.parse(JSON.stringify(row));
				} else {
					this.currentRow = {};
				}
				this.addOrEdit = true;
			},
			toDel(row) {
				this.$confirm("是否确认删除该模型？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.currentRow = JSON.parse(JSON.stringify(row));
					this.$store
						.dispatch("deleteModel", { ids: this.currentRow.id })
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									message: "删除成功",
									type: "success"
								});
								this.resetData();
							}
						});
				});
			},
			toPub(row) {
				this.$confirm("确认部署该模型？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.currentRow = JSON.parse(JSON.stringify(row));
					this.$store
						.dispatch("deployment", { id: this.currentRow.id })
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									message: "部署成功",
									type: "success"
								});
								this.resetData();
							}
						});
				});
			},
			handleSizeChange(val) {
				this.searchForm.pageSize = val;
				this.resetData();
			},
			handleCurrentChange(val) {
				this.searchForm.pageIndex = val - 1;
				this.resetData();
			},
			searForm() {
				this.searchForm.pageIndex = 0;
				this.currentPage = 1;
				this.resetData();
			},
			resetForm() {
				this.searchForm.pageIndex = 0;
				this.searchForm.name = "";
				this.currentPage = 1;
				this.resetData();
			},
			closeR() {
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
	.iconziyuan1 {
		font-size: 12px;
	}
	.tables {
		margin-top: 15px;
	}
	.el-dropdown-link {
		color: #1890ff;
		cursor: pointer;
	}
</style>

