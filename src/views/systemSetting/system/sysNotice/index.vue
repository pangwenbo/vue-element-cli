<template>
	<div class="sys_notice">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="searchform.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
					<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm('searchform')">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-plus" v-has="'sysNotice:add'" @click="editList">新增</el-button>
					<el-button type="primary" icon="el-icon-download" v-has="'sysNotice:export'">导出</el-button>
					<el-button type="primary" v-has="'sysNotice:import'">
						<i class="iconfont iconziyuan1"></i>导入
					</el-button>
					<!-- <el-button  v-has="'sysNotice:delete'">批量删除</el-button> -->
				</el-form-item>
			</el-form>
		</div>

		<div class="list_box">
			<!-- <div class="table_select_record">
                已选择<span>&nbsp;{{multipleSelection.length}}&nbsp;</span>项
                <span class="clear_btn" @click="clearSeletion">清空</span>
			</div>-->
			<el-table
				v-loading="tableLoading"
				ref="noticeTable"
				:data="tableData"
				border
				@selection-change="handleSelectionChange"
				style="width: 100%"
			>
				<!-- <el-table-column
                    type="selection"
                    width="55">
				</el-table-column>-->
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="title" show-overflow-tooltip label="标题"></el-table-column>
				<el-table-column prop="msgCategory_dictText" label="消息类型" align="center" width="100"></el-table-column>
				<el-table-column prop="senderName" label="发布人" align="center" width="100"></el-table-column>
				<el-table-column prop="msgType_dictText" label="通告对象" width="100"></el-table-column>
				<el-table-column prop="sendStatus_dictText" label="发布状态" align="center" width="100"></el-table-column>
				<el-table-column prop="sendTime" label="发布时间" align="center" width="180"></el-table-column>
				<el-table-column prop="endTime" label="结束时间" align="center" width="180"></el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button
							v-if="initListPermission.update && scope.row.sendStatus == 0"
							type="text"
							@click="editList(scope.row)"
						>修改</el-button>
						<el-dropdown @command="moreOperations">
							<el-button type="text">
								更多
								<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									v-if="initListPermission.update && scope.row.sendStatus == 0"
									:command="commandPare(1,scope.row)"
								>发布</el-dropdown-item>
								<el-dropdown-item
									v-if="initListPermission.delete && scope.row.sendStatus == 0 || scope.row.sendStatus == 2"
									:command="commandPare(2,scope.row)"
								>删除</el-dropdown-item>
								<el-dropdown-item
									v-if="initListPermission.update && scope.row.sendStatus == 1"
									:command="commandPare(3,scope.row)"
								>撤销</el-dropdown-item>
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
		<!-- 新增 -->
		<jp-drawer
			:drawer.sync="editDrawer"
			size="800px"
			:title="editTitle"
			@closeDrawer="editCancel('editForm')"
		>
			<div class="edit_content" slot="content">
				<el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="110px">
					<el-form-item label="标题:" prop="title">
						<el-input placeholder="请输入通告标题" v-model="editForm.title"></el-input>
					</el-form-item>
					<el-form-item label="消息类型:" prop="msgCategory">
						<el-select v-model="editForm.msgCategory" clearable placeholder="请选择消息类型">
							<el-option label="通知公告" value="1"></el-option>
							<el-option label="系统消息" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内容:" prop="msgContent">
						<u-editor v-model="editForm.msgContent" :config="ueditorConfig"></u-editor>
					</el-form-item>
					<el-form-item label="开始时间:" prop="startTime" v-if="timeFlag">
						<el-date-picker
							v-model="editForm.startTime"
							type="datetime"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择开始时间"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间:" prop="endTime" v-if="timeFlag">
						<el-date-picker
							v-model="editForm.endTime"
							type="datetime"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择结束时间"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="通告对象类型:" prop="msgType">
						<el-select v-model="editForm.msgType" clearable placeholder="请选择对象类型">
							<el-option label="指定用户" value="USER"></el-option>
							<el-option label="全体用户" value="ALL"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="指定用户:" prop="userIds" v-if="editForm.msgType == 'USER'">
						<el-select
							ref="selUser"
							v-model="editForm.userNames"
							multiple
							@change="userChange"
							@focus="selUserReady"
							placeholder="请选择指定用户"
						></el-select>
					</el-form-item>
					<el-form-item class="edit_footer">
						<el-button @click="editCancel('editForm')">取 消</el-button>
						<el-button type="primary" :loading="editLoading" @click="editSubmit('editForm')">确 定</el-button>
					</el-form-item>
				</el-form>
				<sel-user-dialog
					:selUserDialogFlag.sync="selUserDialogFlag"
					@selUserRes="selUserRes"
					:treeDefaultChecked="treeDefaultChecked"
				></sel-user-dialog>
			</div>
		</jp-drawer>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import selUserDialog from "./SelUserDialog";
	import moment from "moment";
	import jpDrawer from "@/components/jpDrawer";
	export default {
		data() {
			var validateTitle = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入通告标题"));
				} else {
					if (value && (value.length < 3 || value.length > 20)) {
						callback(new Error("标题长度3-20个字符"));
					} else {
						callback();
					}
				}
			};
			var validateMsgCategory = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入消息类型"));
				} else {
					callback();
				}
			};
			var validateMsgType = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入消息类型"));
				} else {
					callback();
				}
			};
			return {
				initListPermission: {}, //列表操作权限
				searchform: {
					title: ""
				},
				pageIndex: 1,
				pageSize: 10,
				pageSizeArray: [10, 20, 30, 40, 50],
				tableLoading: false,
				tableData: [],
				listTotal: 0,
				multipleSelection: [],
				editTitle: "新增",
				editDrawer: false,
				editLoading: false,
				timeFlag: true,
				editForm: {
					title: "",
					msgCategory: "", //消息类型
					msgContent: "",
					startTime: "",
					endTime: "",
					msgType: "", //通告对象类型
					userIds: [],
					userNames: [],
					sendStatus: null
				},
				editRules: {
					title: [
						{
							required: true,
							validator: validateTitle,
							trigger: "blur"
						}
					],
					msgCategory: [
						{
							required: true,
							validator: validateMsgCategory,
							trigger: "blur"
						}
					],
					msgType: [
						{
							required: true,
							validator: validateMsgType,
							trigger: "blur"
						}
					]
				},
				selUserDialogFlag: false,
				ueditorConfig: {
					autoHeightEnabled: false,
					initialFrameWidth: "100%",
					initialFrameHeight: 300,
					UEDITOR_HOME_URL: "./UE/",
					maximumWorda: 1000,
					serverUrl: "/admin-demo/api/file/ueditor"
				},
				treeDefaultChecked: []
			};
		},
		components: {
			selUserDialog,
			jpDrawer
		},
		mounted() {
			this.initListPermission = this.$listPermission([
				"sysNotice:update",
				"sysNotice:delete"
			]);
			this.noticeData();
		},
		watch: {
			"editForm.msgCategory"() {
				if (this.editForm.msgCategory == 2) {
					this.timeFlag = false;
				} else if (this.editForm.msgCategory == 1) {
					this.timeFlag = true;
				}
			}
		},
		methods: {
			...mapActions([
				"countAnnounceReadInfo", //获取头部未读消息
				"getSysAnnouncementPage",
				"addOrUpdateSysAnnouncement",
				"deleteSysAnnouncement",
				"getSysAnnouncement" //获取通告详情
			]),
			noticeData() {
				//请求公告列表
				let params = {
					queryParams: [
						{
							key: "title",
							value: this.searchform.title,
							logic: "Contain" //模糊查询  等于传Equal
						}
					],
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				};
				this.tableLoading = true;
				this.getSysAnnouncementPage(params).then(res => {
					this.tableData = res.body.data.content;
					this.listTotal = res.body.data.totalElements;
					this.tableLoading = false;
				});
			},
			handleSelectionChange(val) {
				//table多选触发
				this.multipleSelection = val;
			},
			handleSizeChange(val) {
				//table每页个数控制
				this.pageSize = val;
				this.noticeData();
			},
			handleCurrentChange(val) {
				//table切换页码
				this.pageIndex = val;
				this.noticeData();
			},
			onSearch() {
				//查询
				this.pageIndex = 1;
				this.noticeData();
			},
			resetForm(formName) {
				//搜索条件重置
				this.pageIndex = 1;
				this.searchform.title = "";
				this.noticeData();
			},
			clearSeletion() {
				this.$refs.noticeTable.clearSelection();
			},
			editList(row) {
				//点击新增或编辑弹出编辑弹框
				if (row.id) {
					this.editTitle = "修改";
					this.requestDetail(row.id);
					this.editDrawer = true;
				} else {
					this.editTitle = "新增";
					this.editForm.sendStatus = 0;
					this.editDrawer = true;
				}
			},
			requestDetail(id) {
				this.getSysAnnouncement({ id: id }).then(res => {
					if (res.body.errorCode == 0) {
						let detail = res.body.data;
						this.editForm = Object.assign({ userNames: [] }, detail);
						this.editForm.userIds = [];
						this.editForm.userDtos.map(item => {
							this.editForm.userNames.push(item.name);
							this.editForm.userIds.push(item.id);
						});
						this.treeDefaultChecked = this.editForm.userIds;
					}
				});
			},
			userChange(selUserNames) {
				this.editForm.userIds = [];
				selUserNames.map(name => {
					this.editForm.userDtos.map(item => {
						if (name == item.name) {
							this.editForm.userIds.push(item.id);
						}
					});
				});
				this.treeDefaultChecked = this.editForm.userIds;
			},
			editCancel(formName) {
				//取消并关闭编辑弹框
				this.initEditForm();
				this.editDrawer = false;
			},
			initEditForm() {
				//初始化编辑弹层的form表单
				this.editForm = {
					title: "",
					msgCategory: "", //消息类型
					msgContent: "",
					startTime: "",
					endTime: "",
					msgType: "", //通告对象类型
					userIds: [],
					sendStatus: null
				};
				this.treeDefaultChecked = [];
			},
			editSubmit(formName) {
				//编辑，新增 提交
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.editLoading = true;
						this.noticeAddEdit(this.editTitle)
							.then(res => {
								this.editLoading = false;
								this.initEditForm();
								this.editDrawer = false;
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
			noticeAddEdit(tip) {
				//新增，编辑，发布，撤销 请求接口
				if (tip == "发布" && this.editForm.endTime) {
					if (
						moment(this.editForm.endTime).isBefore(moment(new Date()))
					) {
						this.$message({
							title: "警告",
							message: "通告结束时间不能小于当前时间",
							type: "warning"
						});
						return false;
					}
				}
				return new Promise((resolve, reject) => {
					let params = JSON.parse(JSON.stringify(this.editForm));
					params.startTime = params.startTime ? params.startTime : null;
					params.endTime = params.endTime ? params.endTime : null;
					this.addOrUpdateSysAnnouncement(params)
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									title: "成功",
									message: `${tip}成功`,
									type: "success",
									offset: 60
								});
								this.noticeData();
								if (tip == "撤销") {
									this.countAnnounceReadInfo();
								}
								resolve(res);
							} else {
								reject(res);
							}
						})
						.catch(err => {
							this.$message({
								title: "失败",
								message: `${tip}失败`,
								type: "error",
								offset: 60
							});
							reject(err);
						});
				});
			},
			selUserReady() {
				//弹出选择用户dialog
				this.$refs.selUser.blur();
				this.selUserDialogFlag = true;
			},
			selUserRes(selUserResData) {
				//获取选择发送的用户
				this.treeDefaultChecked = [];
				this.editForm.userIds = [];
				this.editForm.userNames = [];
				this.editForm.userDtos = Object.assign(selUserResData);
				selUserResData.map(item => {
					this.editForm.userIds.push(item.id);
					this.editForm.userNames.push(item.name);
					this.treeDefaultChecked.push(item.id);
				});
			},
			commandPare(i, row) {
				return {
					type: i,
					row: row
				};
			},
			moreOperations(val) {
				//更多操作
				if (val.type == 1) {
					//发布
					this.$confirm("确认发布？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.editForm = Object.assign({}, val.row);
							this.editForm.sendStatus = 1;
							this.noticeAddEdit("发布");
							this.initEditForm();
						})
						.catch(() => {});
				} else if (val.type == 2) {
					//删除
					this.$confirm("确认删除该系统通告吗？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.deleteSysAnnouncement({ id: val.row.id })
								.then(res => {
									if (res.body.errorCode == 0) {
										this.$message({
											title: "成功",
											message: "删除成功",
											type: "success"
										});
									}
									this.noticeData();
								})
								.catch(err => {
									this.$message({
										title: "失败",
										message: "删除失败",
										type: "error"
									});
								});
						})
						.catch(() => {});
				} else if (val.type == 3) {
					//撤销
					this.$confirm("确认撤销？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.editForm = Object.assign({}, val.row);
							this.editForm.sendStatus = 2;
							this.noticeAddEdit("撤销");
							this.initEditForm();
						})
						.catch(() => {});
				}
			}
		}
	};
</script>

<style lang="less">
	.sys_notice {
		background: #fff;
		padding: 20px;
		.action_button {
			span {
				line-height: 13px;
			}
			.iconziyuan1 {
				font-size: 13px;
				margin-right: 5px;
			}
		}
		.list_box {
			margin-top: 15px;
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
			.el-button {
				padding: 0;
			}
		}
	}
</style>