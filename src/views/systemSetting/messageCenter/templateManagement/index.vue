<template>
	<div class="template_management">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
				<el-form-item prop="templateCode">
					<el-input v-model="searchform.templateCode" placeholder="请输入模板CODE"></el-input>
				</el-form-item>
				<el-form-item prop="templateContent">
					<el-input v-model="searchform.templateContent" placeholder="请输入模板内容"></el-input>
				</el-form-item>
				<el-form-item prop="templateName">
					<el-input v-model="searchform.templateName" placeholder="请输入模板标题"></el-input>
				</el-form-item>
				<el-form-item prop="templateType">
					<el-input v-model="searchform.templateType" placeholder="请输入模板类型"></el-input>
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
					<el-button type="primary" icon="el-icon-plus" @click="editList">新增</el-button>
					<!-- <el-button type="primary"  icon="el-icon-download">导出</el-button>
					<el-button type="primary" ><i class="iconfont iconziyuan1"></i>导入</el-button>-->
				</el-form-item>
			</el-form>
		</div>
		<div class="list_box">
			<el-table
				v-loading="tableLoading"
				ref="templateTable"
				:data="tableData"
				border
				style="width: 100%"
			>
				<el-table-column type="index" width="50" align="center"></el-table-column>
				<el-table-column prop="templateCode" label="模板CODE" width="180"></el-table-column>
				<el-table-column prop="templateName" label="模板标题" show-overflow-tooltip></el-table-column>
				<el-table-column prop="templateContent" label="模板内容" show-overflow-tooltip></el-table-column>
				<el-table-column prop="templateType" label="模板类型" width="100" align="center"></el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="editList(scope.row)">编辑</el-button>
						<el-dropdown @command="moreOperations">
							<el-button type="text">
								更多
								<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="commandPare(1,scope.row)">删除</el-dropdown-item>
								<el-dropdown-item :command="commandPare(2,scope.row)">发送</el-dropdown-item>
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
		<jp-drawer
			:drawer.sync="drawer"
			size="600px"
			:title="drawerTitle"
			@closeDrawer="closeDrawer('editForm')"
		>
			<div class="edit_content" slot="content">
				<el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="100px">
					<el-form-item label="模板CODE:" prop="templateCode">
						<el-input
							:disabled="operationType == 'update' ? true : false"
							placeholder="请输入模板CODE"
							v-model="editForm.templateCode"
						></el-input>
					</el-form-item>
					<el-form-item label="模板标题:" prop="templateName">
						<el-input placeholder="请输入模板标题" v-model="editForm.templateName"></el-input>
					</el-form-item>
					<el-form-item label="模板类型:" prop="templateType">
						<el-select v-model="editForm.templateType" clearable placeholder="请选择模板类型">
							<el-option label="请选择" value></el-option>
							<el-option label="短信" value="1"></el-option>
							<el-option label="邮件" value="2"></el-option>
							<el-option label="微信" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="模板内容:" prop="templateContent">
						<el-input type="textarea" :rows="3" placeholder="请输入模板内容" v-model="editForm.templateContent"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="closeDrawer('editForm')">取 消</el-button>
						<el-button type="primary" :loading="editLoading" @click="editSubmit('editForm')">确 定</el-button>
					</el-form-item>
				</el-form>
			</div>
		</jp-drawer>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import jpDrawer from "@/components/jpDrawer";
	export default {
		data() {
			var validateTemplateCode = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入请输入模板CODE"));
				} else {
					callback();
				}
			};
			var validateTemplateName = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入请输入模板Name"));
				} else {
					callback();
				}
			};
			var validateTemplateType = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入请输入模板Name"));
				} else {
					callback();
				}
			};
			return {
				searchform: {
					templateCode: "",
					templateName: "",
					templateContent: "",
					templateType: ""
				},
				tableLoading: false,
				tableData: [],
				listTotal: 0,
				pageSize: 10,
				pageSizeArray: [10, 20, 30, 40, 50],
				pageIndex: 0,
				drawer: false,
				editForm: {
					templateCode: "",
					templateName: "",
					templateContent: "",
					templateType: ""
				},
				editRules: {
					templateCode: [
						{
							required: true,
							validator: validateTemplateCode,
							trigger: "blur"
						}
					],
					templateName: [
						{
							required: true,
							validator: validateTemplateName,
							trigger: "blur"
						}
					],
					templateType: [
						{
							required: true,
							validator: validateTemplateType,
							trigger: "blur"
						}
					]
				},
				editLoading: false,
				drawerTitle: "",
				operationType: ""
			};
		},
		components: {
			jpDrawer
		},
		mounted() {
			this.requestList();
		},
		methods: {
			...mapActions([
				"getMessageTemplatePage",
				"addMessageTemplate",
				"updateMessageTemplate"
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
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				};
				this.tableLoading = true;
				this.getMessageTemplatePage(params).then(res => {
					this.tableData = res.body.data.content;
					this.listTotal = res.body.data.totalElements;
					this.tableLoading = false;
				});
			},
			editList(row) {
				//新增 编辑
				if (row.id) {
					this.editForm = JSON.parse(JSON.stringify(row));
					this.drawerTitle = "编辑模板";
					this.operationType = "update";
				} else {
					this.drawerTitle = "新增模板";
					this.operationType = "add";
				}
				this.drawer = true;
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
					//点击删除
				} else if (val.type == 2) {
					//发送
				}
			},
			handleSizeChange(val) {
				//table每页个数控制
				this.pageSize = val;
				this.requestList();
			},
			handleCurrentChange(val) {
				//table切换页码
				this.pageIndex = val - 1;
				this.requestList();
			},
			closeDrawer(formName) {
				this.$refs[formName].resetFields();
				(this.editForm = {
					templateCode: "",
					templateName: "",
					templateContent: "",
					templateType: ""
				}),
					(this.drawer = false);
			},
			editSubmit(formName) {
				//编辑提交
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.editLoading = true;
						this[`${this.operationType}MessageTemplate`](this.editForm)
							.then(res => {
								this.editLoading = false;
								this.closeDrawer("editForm");
								this.requestList();
							})
							.catch(err => {
								this.editLoading = false;
							});
					} else {
						this.editLoading = false;
						return false;
					}
				});
			}
		}
	};
</script>

<style lang="less">
	.template_management {
		background: #fff;
		padding: 20px;
		.action_button {
			.iconziyuan1 {
				font-size: 14px;
				margin-right: 5px;
			}
		}
		.list_box {
			margin-top: 15px;
			.el-dropdown-link {
				color: #1890ff;
				cursor: pointer;
				.el-icon--right {
					margin-left: 0;
				}
			}
		}
	}
</style>