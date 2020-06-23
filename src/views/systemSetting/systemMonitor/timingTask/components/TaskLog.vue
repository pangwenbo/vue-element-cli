<template>
	<el-dialog
		class="task_log"
		title="查看日志"
		:visible="taskLogDialogFlag"
		:close-on-click-modal="false"
		width="90%"
		top="6vh"
		@close="cancleTaskLogDialog"
		append-to-body
		center
	>
		<div class="search_box">
			<el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
				<el-form-item label="时间段:" prop="time">
					<el-date-picker
						v-model="searchform.time"
						type="datetimerange"
						value-format="yyyy-MM-dd HH:mm:ss"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="执行结果:" prop="result">
					<el-select v-model="searchform.result" placeholder="请选择任务状态">
						<el-option label="全部" value></el-option>
						<el-option label="成功" value="1"></el-option>
						<el-option label="失败" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
					<el-button icon="el-icon-refresh-right" @click="resetSearchForm('searchform')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list_box">
			<el-table
				:row-class-name="setClassName"
				v-loading="tableLoading"
				ref="taskTable"
				:data="tableData"
				border
				style="width: 100%"
			>
				<el-table-column type="expand">
					<template slot-scope="props">异常信息:{{props.exceptionMessage}}</template>
				</el-table-column>
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" label="任务名称"></el-table-column>
				<el-table-column
					prop="createTime"
					show-overflow-tooltip
					label="执行时间"
					width="170"
					align="center"
				></el-table-column>
				<el-table-column prop="createTime" show-overflow-tooltip label="耗时" width="170" align="center">
					<template slot-scope="scope">{{scope.row.spendTime}}ms</template>
				</el-table-column>
				<el-table-column prop="result" show-overflow-tooltip label="执行结果" width="100" align="center">
					<template slot-scope="scope">
						<el-button
							size="mini"
							:type="scope.row.result ? 'success' : 'danger'"
						>{{scope.row.result ? '成功' : '失败'}}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination
					background
					:hide-on-single-page="listTotal > 0 ? false : true"
					@current-change="handleCurrentChange"
					:current-page="pageIndex"
					:page-size="pageSize"
					layout="total, prev, pager, next, jumper"
					:total="listTotal"
				></el-pagination>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		props: {
			taskLogDialogFlag: false,
			quartzId: ""
		},
		data() {
			return {
				pageIndex: 0,
				pageSize: 5,
				searchform: {
					result: "",
					time: []
				},
				tableData: [],
				tableLoading: false,
				listTotal: 0
			};
		},
		watch: {
			taskLogDialogFlag(n, o) {
				if (n) {
					this.requestList();
				}
			}
		},
		methods: {
			...mapActions(["getQuartzLogPage"]),
			requestList() {
				let param = {
					pageIndex:
						this.pageIndex !== 0 ? this.pageIndex - 1 : this.pageIndex,
					pageSize: this.pageSize,
					quartzId: this.quartzId,
					name: this.searchform.name,
					result: this.searchform.result,
					startTime: this.searchform.time[0],
					endTime: this.searchform.time[1]
				};
				this.getQuartzLogPage(param).then(res => {
					this.tableData = res.body.data.content;
					this.listTotal = res.body.data.totalElements;
					this.tableLoading = false;
				});
			},
			cancleTaskLogDialog() {
				this.$emit("update:taskLogDialogFlag", false);
			},
			onSearch() {
				this.pageIndex = 0;
				this.requestList();
			},
			resetSearchForm(formName) {
				this.$refs[formName].resetFields();
				this.pageIndex = 0;
				this.requestList();
			},
			setClassName({ row, index }) {
				// 通过自己的逻辑返回一个class或者空
				return row.result ? "row-expand-cover" : "expand";
			},
			handleCurrentChange(val) {
				//table切换页码
				this.pageIndex = val;
				this.requestList();
			}
		}
	};
</script>

<style lang="less">
	.task_log {
		.row-expand-cover .el-table__expand-icon {
			visibility: hidden;
		}
	}
</style>