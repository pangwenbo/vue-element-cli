<template>
	<div class="process mainCon">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="searchForm.name" placeholder="请输入流程名称"></el-input>
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
				<el-table-column prop="name" label="流程名称" align="center"></el-table-column>
				<el-table-column prop="key" label="流程标识" align="center"></el-table-column>
				<el-table-column prop="version" label="版本号" align="center"></el-table-column>
				<el-table-column prop="deploymentTime" label="部署时间" align="center"></el-table-column>
				<el-table-column prop="originName" label="流程图片" align="center">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="toGetImg(scope.row)">{{scope.row.resourceName}}</el-button>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="300">
					<template slot-scope="scope">
						<div>
							<el-button
								type="text"
								@click="toActive(scope.row.suspensionState==1?'挂起':'激活',scope.row)"
							>{{scope.row.suspensionState==1?'挂起':'激活'}}</el-button>
							<el-button type="text" @click="toCha(scope.row)">转为模型</el-button>
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

		<el-right :isShow.sync="showImg" title="当前流程图片">
			<div class="imgC">
				<img :src="imgUrl" alt />
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
				showImg: false,
				imgUrl: ""
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
					.dispatch("getAttachmentPage", {
						pageSize: this.searchForm.pageSize,
						pageIndex: this.searchForm.pageIndex
					})
					.then(res => {
						if (res.body.errorCode == 0) {
							this.loading = false;
							this.tableData = res.body.data.content;
							this.total = res.body.data.totalElements;
						}
					});
			},
			toActive(t, row) {
				this.$confirm("是否确认" + t + "该流程？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.currentRow = JSON.parse(JSON.stringify(row));
					this.$store
						.dispatch("changeProcessStatus", {
							processId: this.currentRow.id
						})
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									message: t + "成功",
									type: "success"
								});
								this.resetData();
							}
						});
				});
			},
			toCha(row) {
				this.$confirm("是否将该流程转为模型？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.currentRow = JSON.parse(JSON.stringify(row));
					this.$store
						.dispatch("convertToModel", {
							processId: this.currentRow.id
						})
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									message: "转换成功",
									type: "success"
								});
								this.resetData();
							}
						});
				});
			},
			toGetImg(row) {
				this.currentRow = JSON.parse(JSON.stringify(row));
				this.imgUrl = "";
				this.$store
					.dispatch("getProcessImg", { processId: this.currentRow.id })
					.then(res => {
						if (res.body.errorCode == 0) {
							this.imgUrl = res.body.data;
						}
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
	.imgC {
		text-align: center;
		img {
			max-width: 100%;
		}
	}
</style>

