<template>
	<div class="msg_management">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
				<el-form-item prop="title">
					<el-input v-model="searchform.title" placeholder="请输入消息标题"></el-input>
				</el-form-item>
				<el-form-item prop="content">
					<el-input v-model="searchform.content" placeholder="请输入发送内容"></el-input>
				</el-form-item>
				<el-form-item prop="receiver">
					<el-input v-model="searchform.receiver" placeholder="请输入接收人"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
					<el-button
						type="primary"
						icon="el-icon-refresh-right"
						@click="resetSearchForm('searchform')"
					>重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-plus"
						@click="addOrEdit('新增')"
						class="addButton"
						v-if="initListPermission.add"
					>新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list_box">
			<el-table border :data="tableData" style="width: 100%">
				<el-table-column type="index" align="center"></el-table-column>
				<el-table-column prop="esTitle" label="消息标题" align="center"></el-table-column>
				<el-table-column prop="esContent" label="发送内容" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="esReceiver" label="接收人" align="center"></el-table-column>
				<el-table-column prop="esSendNum" label="发送次数" align="center"></el-table-column>
				<el-table-column label="发送状态" align="center">
					<template slot-scope="scope">
						<div>
							<span v-if="scope.row.esSendStatus==0">未推送</span>
							<span v-if="scope.row.esSendStatus==1">推送成功</span>
							<span v-if="scope.row.esSendStatus==2">推送失败</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="esSendTime" label="发送时间" align="center"></el-table-column>
				<el-table-column prop="esType_dictText" label="发送方式" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="120">
					<template slot-scope="scope">
						<div>
							<el-button
								type="text"
								class="editBtn"
								@click="addOrEdit('修改',scope.row)"
								v-if="initListPermission.update"
							>修改</el-button>
							<el-dropdown @command="toIce">
								<el-button type="text">
									更多
									<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="commandPare(1,scope.row)">详情</el-dropdown-item>
									<el-dropdown-item :command="commandPare(2,scope.row)" v-if="initListPermission.delete">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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

		<!-- 添加/编辑 -->
		<el-right
			:title="title"
			:width="isInfo?'600px':'800px'"
			:isShow.sync="isShow"
			isBorder
			modal-append-to-body
		>
			<el-form ref="formEdit" :model="currentRow" label-width="120px" :rules="rulesEdit">
				<el-form-item label="消息标题：" prop="esTitle">
					<el-input v-model="currentRow.esTitle" placeholder="请输入消息标题" :disabled="isInfo"></el-input>
				</el-form-item>
				<el-form-item label="发送内容：" prop="esContent">
					<el-input
						v-model="currentRow.esContent"
						placeholder="请输入发送内容"
						type="textarea"
						:disabled="isInfo"
						v-if="isInfo"
					></el-input>
					<u-editor v-model="currentRow.esContent" :config="ueditorConfig" v-else></u-editor>
				</el-form-item>
				<el-form-item label="推送所需参数：" prop="esParam">
					<el-input
						v-model="currentRow.esParam"
						:placeholder="isInfo?'无':'请输入JSON格式的参数'"
						:disabled="isInfo"
					></el-input>
				</el-form-item>
				<el-form-item label="推送次数：" prop="esSendNum">
					<el-input-number
						v-model="currentRow.esSendNum"
						placeholder="请输入推送次数"
						:min="0"
						v-number-input
						controls-position="right"
						:disabled="isInfo"
					></el-input-number>
				</el-form-item>
				<el-form-item label="接收人：" prop="esReceiver">
					<el-input v-model="currentRow.esReceiver" placeholder="请输入接收人（以逗号分隔）" :disabled="isInfo"></el-input>
				</el-form-item>
				<el-form-item label="推送方式" prop="esType">
					<el-select v-model="currentRow.esType" placeholder="请选择推送方式" :disabled="isInfo">
						<el-option
							:label="item.itemText"
							:value="item.itemValue"
							v-for="item in sendType"
							:key="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推送时间" prop="esSendTime">
					<el-date-picker
						:disabled="isInfo"
						v-model="currentRow.esSendTime"
						type="datetime"
						value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="请选择推送时间"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="推送状态" prop="esSendStatus">
					<el-select v-model="currentRow.esSendStatus" placeholder="请选择推送状态" :disabled="isInfo">
						<el-option label="未推送" value="0"></el-option>
						<el-option label="推送成功" value="1"></el-option>
						<el-option label="推送失败" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推送失败原因：" prop="esResult" v-if="currentRow.esSendStatus=='2'">
					<el-input
						v-model="currentRow.esResult"
						:placeholder="isInfo?'无':'请输入推送失败原因'"
						:disabled="isInfo"
					></el-input>
				</el-form-item>
				<el-form-item label="备注：" prop="remark">
					<el-input
						v-model="currentRow.remark"
						maxlength="200"
						:placeholder="isInfo?'无':'请输入备注'"
						type="textarea"
						:disabled="isInfo"
					></el-input>
					<div
						v-if="currentRow.remark && !isInfo"
						class="tipPos"
					>当前已输入{{currentRow.remark.length}}个字符，您还可以输入{{200-currentRow.remark.length}}个字符</div>
				</el-form-item>
				<div style="text-align:center;margin-bottom:10px;" v-if="!isInfo">
					<el-button @click="isShow=false">取消</el-button>
					<el-button type="primary" @click="sureEdit" :loading="editLoading" :disabled="editLoading">确定</el-button>
				</div>
			</el-form>
		</el-right>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import elRight from "@/components/rightDialog";
	export default {
		data() {
			return {
				searchform: {
					title: "",
					content: "",
					receiver: ""
				},
				pageIndex: 0,
				pageSize: 10,
				total: 0,
				tableData: [],
				loading: true,
				currentPage: 1,
				title: "",
				isShow: false,
				currentRow: {},
				rulesEdit: {
					esContent: [
						{
							required: true,
							message: "请输入推送内容",
							trigger: "blur"
						}
					],
					esReceiver: [
						{ required: true, message: "请输入接收人", trigger: "blur" }
					],
					esSendStatus: [
						{
							required: true,
							message: "请选择推送状态",
							trigger: "change"
						}
					],
					esTitle: [
						{
							required: true,
							message: "请输入推送标题",
							trigger: "blur"
						}
					],
					esType: [
						{
							required: true,
							message: "请选择推送方式",
							trigger: "change"
						}
					],
					esSendNum: [
						{
							required: true,
							message: "请输入推送次数",
							trigger: "blur"
						}
					],
					esSendTime: [
						{
							required: true,
							message: "请选择推送时间",
							trigger: "change"
						}
					]
				},
				sendType: [],
				isInfo: false,
				initListPermission: {},
				ueditorConfig: {
					autoHeightEnabled: false,
					initialFrameWidth: "100%",
					initialFrameHeight: 300,
					UEDITOR_HOME_URL: "./UE/",
					maximumWorda: 1000,
					serverUrl: "/admin-demo/api/file/ueditor"
				},
				editLoading: false
			};
		},
		mounted() {
			this.initListPermission = this.$listPermission([
				"msgManagement:update",
				"msgManagement:delete",
				"msgManagement:add"
			]);
			this.$store
				.dispatch("getDictItemList", { dictCode: "templateType" })
				.then(res => {
					this.sendType = res.body.data;
				});
			this.requestList();
		},
		components: { elRight },
		methods: {
			...mapActions(["getMessagePage"]),
			onSearch() {
				//查询
				this.pageIndex = 0;
				this.currentPage = 1;
				this.requestList();
			},
			resetSearchForm(formName) {
				//重置
				this.$refs[formName].resetFields();
				this.pageIndex = 0;
				this.currentPage = 1;
				this.requestList();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.requestList();
			},
			handleCurrentChange(val) {
				this.pageIndex = val - 1;
				this.requestList();
			},
			requestList() {
				this.loading = true; //请求列表数据
				var param = {
					content: this.searchform.content,
					title: this.searchform.title,
					receiver: this.searchform.receiver,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				};
				this.getMessagePage(param).then(res => {
					this.loading = false;
					this.tableData = res.body.data.content;
					this.total = res.body.data.totalElements;
				});
			},
			addOrEdit(t, row) {
				this.title = t;
				if (row) {
					this.currentRow = JSON.parse(JSON.stringify(row));
				} else {
					this.currentRow = {};
				}
				this.isShow = true;
				this.isInfo = false;
			},
			sureEdit() {
				this.$refs.formEdit.validate(valid => {
					if (valid) {
						this.editLoading = true;
						var method, title;
						if (this.currentRow.id) {
							method = "updateMessage";
							title = "修改";
						} else {
							method = "addMessage";
							title = "新增";
						}
						this.$store
							.dispatch(method, this.currentRow)
							.then(res => {
								this.editLoading = false;
								if (res.body.errorCode == 0) {
									if (this.currentRow.id) {
										this.requestList();
									} else {
										this.resetSearchForm("formEdit");
									}
									this.$message({
										message: title + "成功",
										type: "success"
									});
									this.isShow = false;
								}
							})
							.catch(err => {
								this.editLoading = false;
							});
					}
				});
			},
			commandPare(i, row) {
				return {
					idx: i,
					row: row
				};
			},
			toIce(val) {
				this.currentRow = JSON.parse(JSON.stringify(val.row));
				if (val.idx == 1) {
					this.title = "详情";
					this.isInfo = true;
					this.isShow = true;
				} else {
					this.$confirm("确定要删除该消息？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.$store
								.dispatch("deleteMessage", {
									id: this.currentRow.id
								})
								.then(res => {
									if (res.body.errorCode == 0) {
										this.$message({
											message: "删除成功",
											type: "success"
										});
										this.requestList();
									}
								});
						})
						.catch(() => {});
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.msg_management {
		background: #fff;
		padding: 20px;
	}
	.el-dropdown-link {
		color: #1890ff;
		cursor: pointer;
	}
	.addButton {
		margin-bottom: 15px;
	}
	.tipPos {
		position: absolute;
		bottom: -20px;
		font-size: 12px;
	}
</style>