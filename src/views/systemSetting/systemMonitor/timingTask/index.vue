<template>
	<div class="timing_task">
		<div class="search_box">
			<el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
				<el-form-item label="任务类名:" prop="name">
					<el-input v-model="searchform.name" placeholder="请输入任务类名"></el-input>
				</el-form-item>
				<el-form-item label="任务状态:" prop="status">
					<el-select v-model="searchform.status" placeholder="请选择任务状态">
						<el-option label="全部" value></el-option>
						<el-option label="正常" value="1"></el-option>
						<el-option label="停止" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
					<el-button icon="el-icon-refresh-right" @click="resetSearchForm('searchform')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-row class="action_button">
			<el-button type="primary" icon="el-icon-plus" v-has="'timingTask:add'" @click="editList">新增</el-button>
		</el-row>
		<div class="list_box">
			<div class="table_select_record">
				已选择
				<span>&nbsp;{{multipleSelection.length}}&nbsp;</span>项
				<span class="clear_btn" @click="clearSeletion">清空</span>
			</div>
			<el-table
				v-loading="tableLoading"
				ref="taskTable"
				:data="tableData"
				border
				@selection-change="handleSelectionChange"
				style="width: 100%"
			>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" show-overflow-tooltip label="任务名称" width="200"></el-table-column>
				<el-table-column prop="clazz" label="任务类名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="cron" label="cron表达式" width="200"></el-table-column>
				<el-table-column prop="msg" label="描述"></el-table-column>
				<el-table-column prop="status" label="状态" width="100" align="center">
					<template slot-scope="scope">
						<div
							class="status_default"
							:class="{stop_btn: scope.row.status}"
						>{{scope.row.status ? '正常' : '已暂停'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							v-if="initListPermission.update"
							@click="pauseResume(scope.row)"
						>{{scope.row.status ? '停止' : '启动'}}</el-button>
						<el-dropdown @command="moreOperations">
							<el-button type="text">
								更多
								<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-if="initListPermission.update" :command="commandPare(1,scope.row)">编辑</el-dropdown-item>
								<el-dropdown-item v-if="initListPermission.delete" :command="commandPare(2,scope.row)">删除</el-dropdown-item>
								<el-dropdown-item v-if="initListPermission.update" :command="commandPare(3,scope.row)">执行</el-dropdown-item>
								<el-dropdown-item v-if="initListPermission.delete" :command="commandPare(4,scope.row)">日志</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination
					background
					:hide-on-single-page="listTotal > 0 ? false : true"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageIndex"
					:page-sizes="pageSizeArray"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="listTotal"
				></el-pagination>
			</div>
		</div>
		<!-- 新增 编辑 -->
		<el-dialog
			append-to-body
			:title="editTitle"
			:visible.sync="editDialog"
			:close-on-click-modal="false"
			@close="editCancel('editForm')"
			width="600px"
			center
		>
			<el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="100px">
				<el-form-item label="任务名称:" prop="name">
					<el-input v-model="editForm.name" placeholder="请输入任务名称"></el-input>
				</el-form-item>
				<el-form-item label="任务类名:" prop="clazz">
					<el-input v-model="editForm.clazz" placeholder="请输入任务类名"></el-input>
				</el-form-item>
				<el-form-item label="cron表达式" prop="cron">
					<el-input @focus="cronDialogFlag=true" v-model="editForm.cron" placeholder="请输入定时策略"></el-input>
				</el-form-item>
				<el-form-item label="描述:" prop="msg">
					<el-input v-model="editForm.msg" placeholder="请输入描述"></el-input>
				</el-form-item>
				<el-form-item label="状态:" prop="status">
					<el-radio-group v-model="editForm.status">
						<el-radio-button label="1">正常</el-radio-button>
						<el-radio-button label="0">停止</el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editCancel('editForm')">取 消</el-button>
				<el-button type="primary" :loading="editLoading" @click="editSubmit('editForm')">确 定</el-button>
			</span>
			<el-dialog
				class="notice_sel_user"
				title="cron表达式"
				:visible="cronDialogFlag"
				:close-on-click-modal="false"
				width="550px"
				@close="cancleCronDialog"
				append-to-body
				center
			>
				<cron @change="changeCron" @close="cronDialogFlag=false" i18n="cn"></cron>
			</el-dialog>
		</el-dialog>
		<!-- 查看日志 -->
		<task-log :taskLogDialogFlag.sync="taskLogDialogFlag" :quartzId="quartzId"></task-log>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { cron } from "vue-cron";
	import taskLog from "./components/TaskLog";
	export default {
		data() {
			var validateName = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入任务名称"));
				} else {
					callback();
				}
			};
			var validateClazz = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入任务类名"));
				} else {
					callback();
				}
			};
			var validateCron = (rule, value, callback) => {
				if (!value) {
					callback(new Error("cron表达式不能为空"));
				} else {
					callback();
				}
			};
			return {
				initListPermission: {},
				searchform: {
					name: "",
					status: ""
				},
				pageSizeArray: [10, 20, 30, 40, 50],
				pageIndex: 0,
				pageSize: 10,
				tableData: [],
				tableLoading: false,
				listTotal: 0,
				multipleSelection: [], //table已选的行
				updateOrAdd: "", //新增还是编辑标志
				pauseOrResume: "", //暂停还是恢复
				editTitle: "新增定时任务",
				editDialog: false,
				editLoading: false,
				editForm: {
					name: "",
					clazz: "",
					cron: "",
					msg: "",
					status: 1
				},
				editRules: {
					name: [
						{ required: true, validator: validateName, trigger: "blur" }
					],
					clazz: [
						{
							required: true,
							validator: validateClazz,
							trigger: "blur"
						}
					],
					cron: [
						{
							required: true,
							validator: validateCron,
							trigger: "change"
						}
					]
				},
				cronDialogFlag: false,
				taskLogDialogFlag: false,
				quartzId: "" //查看日志的id
			};
		},
		components: {
			cron,
			taskLog
		},
		mounted() {
			this.initListPermission = this.$listPermission([
				"timingTask:update",
				"timingTask:delete"
			]);
			this.requestList();
		},
		methods: {
			...mapActions([
				"getQuartzConfigPage",
				"addQuartzConfig",
				"updateQuartzConfig",
				"deleteQuartzConfig",
				"pauseQuartzConfig",
				"resumeQuartzConfig",
				"runQuartzConfig"
			]),
			onSearch() {
				//查询
				this.pageIndex = 0;
				this.requestList();
			},
			resetSearchForm(formName) {
				//重置
				this.$refs[formName].resetFields();
				this.pageIndex = 0;
				this.requestList();
			},
			requestList() {
				//请求列表数据
				console.log("this.searchform", this.searchform);
				let params = {
					name: this.searchform.name,
					status: this.searchform.status,
					pageIndex:
						this.pageIndex !== 0 ? this.pageIndex - 1 : this.pageIndex,
					pageSize: this.pageSize
				};
				this.tableLoading = true;
				this.getQuartzConfigPage(params).then(res => {
					this.tableData = res.body.data.content;
					this.listTotal = res.body.data.totalElements;
					this.tableLoading = false;
				});
			},
			handleSizeChange(val) {
				//table每页个数控制
				this.pageSize = val;
				this.requestList();
			},
			handleCurrentChange(val) {
				//table切换页码
				this.pageIndex = val;
				this.requestList();
			},
			handleSelectionChange(val) {
				//table多选触发
				this.multipleSelection = val;
			},
			clearSeletion() {
				//清理列表选择
				this.$refs.taskTable.clearSelection();
			},
			editList(row) {
				//点击新增或编辑数据处理
				if (row.id) {
					this.editOrAdd = "update";
					this.editForm = JSON.parse(JSON.stringify(row));
					this.editTitle = "编辑定时任务";
				} else {
					this.editOrAdd = "add";
					this.editTitle = "新增定时任务";
				}
				this.editDialog = true;
			},
			changeCron(val) {
				//cron表达式定时器
				this.editForm.cron = val;
				this.cronDialogFlag = false;
			},
			cancleCronDialog() {
				//关闭cron表达式定时器
				this.cronDialogFlag = false;
			},
			editCancel(formName) {
				//关闭编辑弹框
				this.$refs[formName].resetFields();
				this.editDialog = false;
			},
			editSubmit(formName) {
				//编辑提交
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.editLoading = true;
						this.requestAddEdit(this.editTitle, this.editOrAdd)
							.then(res => {
								this.editLoading = false;
								this.editDialog = false;
							})
							.catch(err => {
								this.editLoading = false;
							});
					} else {
						this.editLoading = false;
						return false;
					}
				});
			},
			commandPare(i, row) {
				return {
					type: i,
					row: row
				};
			},
			pauseResume(row) {
				//操作停止 启动
				let tip = row.status ? "停止" : "启动";
				let type = row.status ? "pause" : "resume";
				this.$confirm(`确认${tip}？`)
					.then(() => {
						this.requestPauseResumeRunDelete(row.id, tip, type);
					})
					.catch(() => {
						console.log(`取消${tip}`);
					});
			},
			requestPauseResumeRunDelete(id, tip, type) {
				//停止,启动,执行,删除操作 请求接口
				return new Promise((resolve, reject) => {
					this[`${type}QuartzConfig`]({ id: id })
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									title: "成功",
									message: `${tip}成功`,
									type: "success"
								});
								this.requestList();
								resolve(res);
							} else {
								reject(res);
							}
						})
						.catch(err => {
							this.$message({
								title: "失败",
								message: `${tip}失败`,
								type: "error"
							});
							reject(err);
						});
				});
			},
			deleteList(id) {
				//删除
				this.$confirm("确认删除？")
					.then(() => {
						this.requestPauseResumeRunDelete(id, "删除", "delete");
					})
					.catch(() => {
						console.log("取消删除");
					});
			},
			moreOperations(val) {
				//更多操作
				if (val.type == 1) {
					//编辑
					this.editList(val.row);
				} else if (val.type == 2) {
					//删除角色
					this.deleteList(val.row.id);
				} else if (val.type == 3) {
					//执行
					this.requestPauseResumeRunDelete(val.row.id, "执行", "run");
				} else if (val.type == 4) {
					//日志
					this.quartzId = val.row.id;
					this.taskLogDialogFlag = true;
				}
			},
			requestAddEdit(tip, type) {
				//编辑和添加请求接口
				return new Promise((resolve, reject) => {
					this[`${type}QuartzConfig`](this.editForm)
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									title: "成功",
									message: `${tip}成功`,
									type: "success"
								});
								this.requestList();
								resolve(res);
							} else {
								reject(res);
							}
						})
						.catch(err => {
							this.$message({
								title: "失败",
								message: `${tip}失败`,
								type: "error"
							});
							reject(err);
						});
				});
			}
		}
	};
</script>

<style lang="less">
	.timing_task {
		background: #fff;
		padding: 20px;
		.list_box {
			.table_select_record {
				border: 1px solid #91d5ff;
				background-color: #e6f7ff;
				padding: 12px 15px;
				margin: 15px 0px;
				span {
					color: #1890ff;
				}
				.clear_btn {
					cursor: pointer;
					color: #1890ff;
					margin-left: 5px;
				}
			}
			.el-dropdown-link {
				color: #1890ff;
				cursor: pointer;
				.el-icon--right {
					margin-left: 0;
				}
			}
			.status_default {
				display: inline-block;
				text-align: center;
				border-radius: 2px;
				width: 50px;
				font-size: 12px;
				color: #fa8c16;
				background: #fff7e6;
				border: 1px solid #ffd591;
			}
			.stop_btn {
				color: #52c41a;
				background: #f6ffed;
				border: 1px solid #b7eb8f;
			}
		}
	}
</style>