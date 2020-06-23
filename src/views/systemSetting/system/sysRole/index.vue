<template>
	<div class="sys_role" ref="toolbarHeight">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="searchform.roleName" placeholder="请输入角色编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
					<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm('searchform')">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-plus" v-has="'role:add'" @click="editList">新增</el-button>
					<el-button type="primary" icon="el-icon-download" v-has="'role:export'">导出</el-button>
					<el-button type="primary" v-has="'role:import'">
						<i class="iconfont iconziyuan1"></i>导入
					</el-button>
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
				ref="roleTable"
				:data="tableData"
				border
				@selection-change="handleSelectionChange"
				style="width: 100%"
				:height="tableHeight"
			>
				<!-- <el-table-column
                    type="selection"
                    width="55">
				</el-table-column>-->
				<el-table-column type="index" align="center" width="50"></el-table-column>
				<el-table-column prop="roleName" label="角色名称" align="center" width="180"></el-table-column>
				<el-table-column prop="roleNum" label="角色编码" align="center" width="180"></el-table-column>
				<el-table-column prop="remarks" show-overflow-tooltip label="角色描述"></el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template slot-scope="scope">
						<el-button type="text" v-if="initListPermission.update" @click="editList(scope.row)">修改</el-button>
						<el-dropdown @command="moreOperations">
							<el-button type="text">
								更多
								<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-if="initListPermission.update" :command="commandPare(1,scope.row)">授权</el-dropdown-item>
								<el-dropdown-item v-if="initListPermission.delete" :command="commandPare(2,scope.row)">删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages" v-if="paginations.totalRowNum>0">
				<el-pagination
					@size-change="f_sizeChange"
					@current-change="f_currentChange"
					:current-page="paginations.pageNum"
					:page-sizes="[10,20,30,50,100]"
					:page-size="paginations.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="paginations.totalRowNum"
				></el-pagination>
			</div>
		</div>
		<!-- 授权 -->
		<jp-drawer
			:drawer.sync="authorizationDrawer"
			size="400px"
			title="角色权限配置"
			:contentBorder="false"
			:footer="true"
			@closeDrawer="authorizationCancel"
			@cancle="authorizationCancel"
			@submit="authorizationSubmit"
		>
			<div class="edit_content" slot="content">
				<el-tree
					ref="authorizationTree"
					:data="treeData"
					show-checkbox
					node-key="id"
					default-expand-all
					:default-checked-keys="treeDefaultChecked"
					:props="treeDefaultProps"
				></el-tree>
			</div>
		</jp-drawer>
		<!-- 新增 编辑 -->
		<jp-drawer
			:drawer.sync="editDrawer"
			size="600px"
			:title="editTitle"
			@closeDrawer="editCancel('editForm')"
		>
			<div class="edit_content" slot="content">
				<el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="100px">
					<el-form-item label="角色名称:" prop="roleName">
						<el-input placeholder="请输入角色名称" v-model="editForm.roleName"></el-input>
					</el-form-item>
					<el-form-item label="角色编码:" prop="roleNum">
						<el-input placeholder="请输入角色编码" v-model="editForm.roleNum"></el-input>
					</el-form-item>
					<el-form-item label="角色描述:" prop="remarks">
						<el-input
							type="textarea"
							maxlength="200"
							show-word-limit
							:rows="3"
							placeholder="请输入角色描述"
							v-model="editForm.remarks"
						></el-input>
					</el-form-item>
					<el-form-item class="edit_footer">
						<el-button @click="editCancel('editForm')">取 消</el-button>
						<el-button type="primary" :loading="editLoading" @click="editSubmit('editForm')">确 定</el-button>
					</el-form-item>
				</el-form>
			</div>
		</jp-drawer>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import rightDialog from "@/components/rightDialog";
	import jpDrawer from "@/components/jpDrawer";
	export default {
		data() {
			var validateRoleName = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入角色名称"));
				} else {
					if (value && (value.length < 2 || value.length > 20)) {
						callback(new Error("角色名称长度2-20个字符"));
					} else {
						callback();
					}
				}
			};
			var validateRoleNum = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入角色编码"));
				} else {
					if (value && (value.length < 2 || value.length > 20)) {
						callback(new Error("角色编码长度2-20个字符"));
					} else {
						callback();
					}
				}
			};
			return {
				tableHeight: "400",
				paginations: {
					pageNum: 0, // 当前页
					pageSize: 10, // 1页显示多少条
					totalRowNum: 0 // 总数
				},
				initListPermission: {},
				searchform: {
					roleName: ""
				},
				tableLoading: false,
				tableData: [],
				multipleSelection: [],
				editDrawer: false,
				editLoading: false,
				editTitle: "新增",
				editForm: {
					roleName: "",
					remarks: "",
					roleNum: "",
					menusIds: [],
					createUserId: null
				},
				editRules: {
					roleName: [
						{
							required: true,
							validator: validateRoleName,
							trigger: "blur"
						}
					],
					roleNum: [
						{
							required: true,
							validator: validateRoleNum,
							trigger: "blur"
						}
					]
				},
				authorizationDrawer: false,
				treeDefaultProps: {
					children: "children",
					label: "menuName"
				},
				treeData: [],
				treeDefaultChecked: []
			};
		},
		components: {
			rightDialog,
			jpDrawer
		},
		mounted() {
			this.initListPermission = this.$listPermission([
				"role:update",
				"role:delete"
			]);
			this.$nextTick(() => {
				this.f_getTableHeight(); //获取表格高度
				window.onresize = () => {
					//事件会在窗口或框架被调整大小时发生
					this.f_getTableHeight();
				};
			});
			this.roleData();
		},
		beforeRouteLeave(to, from, next) {
			//组件销毁时销毁onresize方法
			window.onresize = null;
			next();
		},
		computed: {
			...mapGetters(["ownInfo", "titleHeight"])
		},
		watch: {
			authorizationDrawer() {
				if (!this.authorizationDrawer) {
					this.editForm = {
						roleName: "",
						remarks: "",
						roleNum: "",
						menusIds: [],
						createUserId: null
					};
				}
			},
			titleHeight() {
				this.f_getTableHeight();
			}
		},
		methods: {
			...mapActions(["getRolesPage", "addOrUpdateRole", "deleteRole"]),
			//计算表格高度
			f_getTableHeight() {
				//等待 DOM 更新
				this.tableHeight = window.innerHeight - 240 - this.titleHeight;
			},
			roleData() {
				//获取分页数据
				let params = {
					queryParams: [
						{
							key: "roleName",
							value: this.searchform.roleName,
							logic: "Contain" //模糊查询  等于传Equal
						}
					],
					pageIndex: this.paginations.pageNum,
					pageSize: this.paginations.pageSize
				};
				this.tableLoading = true;
				this.getRolesPage(params).then(res => {
					this.tableData = res.body.data.content;
					this.paginations = {
						pageNum: res.body.data.pageable.pageNumber + 1, // 当前页
						pageSize: res.body.data.pageable.pageSize, // 1页显示多少条
						totalRowNum: res.body.data.totalElements // 总数
					};
					this.tableLoading = false;
				});
			},
			//每页
			f_sizeChange(val) {
				this.paginations.pageSize = val;
				this.roleData();
			},
			//当前页
			f_currentChange(val) {
				this.paginations.pageNum = val;
				this.roleData();
			},
			handleSelectionChange(val) {
				//table多选触发
				this.multipleSelection = val;
			},
			clearSeletion() {
				//清空已选数据
				this.$refs.roleTable.clearSelection();
			},
			onSearch() {
				//查询
				this.roleData();
			},
			resetForm(formName) {
				//重置
				this.searchform.roleName = "";
				this.roleData();
			},
			editList(row) {
				//点击新增或编辑弹出编辑弹框
				if (row.id) {
					this.editForm = JSON.parse(JSON.stringify(row));
					this.editTitle = "修改";
					this.editDrawer = true;
				} else {
					this.editForm.createUserId = this.ownInfo.id;
					this.editTitle = "新增";
					this.editDrawer = true;
				}
			},
			editCancel(formName) {
				//编辑取消
				this.$refs[formName].resetFields();
				(this.editForm = {
					roleName: "",
					remarks: "",
					roleNum: "",
					menusIds: [],
					createUserId: null
				}),
					(this.editDrawer = false);
			},
			editSubmit(formName) {
				//编辑提交
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.editLoading = true;
						this.roleAddEdit(this.editTitle)
							.then(res => {
								this.editLoading = false;
								this.editCancel(formName);
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
			roleAddEdit(tip) {
				//角色添加，编辑，授权请求接口
				let params = {
					sysSign: "admin",
					...this.editForm
				};
				return new Promise((resolve, reject) => {
					this.addOrUpdateRole(params)
						.then(res => {
							if (res.body.errorCode == 0) {
								this.$message({
									title: "成功",
									message: `${tip}成功`,
									type: "success"
								});
								this.roleData();
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
			commandPare(i, row) {
				return {
					type: i,
					row: row
				};
			},
			roleAuthorization(row) {
				//弹出角色授权弹层
				this.treeDefaultChecked = row.menusIds;
				this.editForm = JSON.parse(JSON.stringify(row));
				this.$store
					.dispatch("getMenuTree", { menuSys: this.$menuSys })
					.then(res => {
						if (res.body.errorCode == 0) {
							this.treeData = res.body.data;
						}
					});
			},
			authorizationCancel() {
				//取消角色授权操作
				this.authorizationDrawer = false;
			},
			authorizationSubmit() {
				//提交角色授权
				this.editForm.menusIds = JSON.parse(
					JSON.stringify(this.$refs.authorizationTree.getCheckedKeys())
				);
				this.roleAddEdit("授权").then(res => {
					this.authorizationCancel();
				});
			},
			deleteList(id) {
				//删除某一行
				this.$confirm("确认删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.deleteRole({ roleId: id })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.$message({
										title: "成功",
										message: "删除成功",
										type: "success"
									});
								}
								this.roleData();
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
			},
			moreOperations(val) {
				//更多操作
				if (val.type == 1) {
					//点击授权
					this.roleAuthorization(val.row);
					this.authorizationDrawer = true;
				} else if (val.type == 2) {
					//删除角色
					this.deleteList(val.row.id);
				}
			}
		}
	};
</script>

<style lang="less">
	.sys_role {
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