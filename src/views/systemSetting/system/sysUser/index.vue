<template>
	<div class="sysUser mainCon" ref="toolbarHeight">
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="searchForm.username" placeholder="请输入账号查询"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchForm.email" placeholder="请输入邮箱查询"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchForm.mobile" placeholder="请输入手机号码查询"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select placeholder="请选择性别查询" v-model="sex">
					<el-option label="请选择性别查询" value></el-option>
					<el-option label="男" value="0"></el-option>
					<el-option label="女" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select placeholder="请选择用户状态查询" v-model="state">
					<el-option label="请选择用户状态" value></el-option>
					<el-option label="正常" value="0"></el-option>
					<el-option label="冻结" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="searForm">查询</el-button>
				<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="toEdit('新增')"
					v-if="initListPermission.add"
				>新增</el-button>
				<el-button type="primary" icon="el-icon-download" @click="exportUrl">导出</el-button>
				<el-button type="primary" @click="toImport">
					<span class="iconfont iconziyuan1"></span>
					<span class="icon" style="padding-left:5px">导入</span>
				</el-button>
			</el-form-item>
		</el-form>
		<!-- <div class="currentC">
      已选择<span>{{multipleSelection.length}}</span>项
      <a href="javascript:;" @click="clear">清空</a>
		</div>-->
		<div class="tables">
			<el-table border :data="tableData" ref="multipleTable" style="width: 100%" :height="tableHeight">
				<el-table-column type="index" align="center"></el-table-column>
				<el-table-column prop="username" label="用户账号" align="center"></el-table-column>
				<el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
				<el-table-column label="头像" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.avatar" alt class="avater" />
					</template>
				</el-table-column>
				<el-table-column label="性别" align="center" sortable>
					<template slot-scope="scope">
						<span>{{scope.row.sex==0?'男':'女'}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="所属部门">
					<template slot-scope="scope">
						<div>{{scope.row.sysDepartDto.departName}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
				<el-table-column prop="email" label="邮箱" align="center"></el-table-column>
				<el-table-column prop="state" label="状态" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.state == 0 ?'正常' : '冻结'}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="120">
					<template slot-scope="scope">
						<div>
							<el-button
								type="text"
								class="editBtn"
								@click="toEdit('修改',scope.row)"
								v-if="initListPermission.update"
							>修改</el-button>
							<el-dropdown @command="toIce">
								<el-button type="text">
									更多
									<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="commandPare(4,scope.row)">详情</el-dropdown-item>
									<el-dropdown-item :command="commandPare(3,scope.row)" v-if="initListPermission.update">重置密码</el-dropdown-item>
									<el-dropdown-item :command="commandPare(2,scope.row)" v-if="initListPermission.delete">删除</el-dropdown-item>
									<el-dropdown-item
										v-if="scope.row.state==0 && initListPermission.update"
										:command="commandPare(1,scope.row)"
									>冻结</el-dropdown-item>
									<el-dropdown-item
										v-if="scope.row.state==1 && initListPermission.update"
										:command="commandPare(0,scope.row)"
									>解冻</el-dropdown-item>
									<el-dropdown-item :command="commandPare(5,scope.row)" v-if="initListPermission.update">分配角色</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
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

		<!-- 详情 -->
		<el-right title="用户详情" :isShow.sync="isInfo" width="600px">
			<div class="dialogInfo">
				<div class="sear_flex">
					<label for>用户账号：</label>
					<div class="sear_inp">{{currentRow.username}}</div>
				</div>
				<div class="sear_flex">
					<label for>真实姓名：</label>
					<div class="sear_inp">{{currentRow.name}}</div>
				</div>
				<div class="sear_flex">
					<label for>手机号码：</label>
					<div class="sear_inp">{{currentRow.mobile}}</div>
				</div>
				<div class="sear_flex">
					<label for>所属部门：</label>
					<div class="sear_inp">{{currentRow.departName}}</div>
				</div>
				<div class="sear_flex">
					<label for>头像：</label>
					<div class="sear_inp">
						<el-image
							v-if="currentRow.avatar"
							class="avatarInfo"
							:src="currentRow.avatar"
							:preview-src-list="[currentRow.avatar]"
						></el-image>
						<span v-else>暂无用户头像</span>
					</div>
				</div>
				<div class="sear_flex">
					<label for>性别：</label>
					<div class="sear_inp">{{currentRow.sex==0?'男':'女'}}</div>
				</div>
				<div class="sear_flex">
					<label for>生日：</label>
					<div class="sear_inp">{{currentRow.birthday?currentRow.birthday.split('00:00:00')[0]:''}}</div>
				</div>

				<div class="sear_flex">
					<label for>邮箱：</label>
					<div class="sear_inp">{{currentRow.email}}</div>
				</div>
				<div class="sear_flex">
					<label for>排序：</label>
					<div class="sear_inp">{{currentRow.sortOrder}}</div>
				</div>
				<div class="sear_flex">
					<label for>状态：</label>
					<div class="sear_inp">{{currentRow.state==0?'正常':'用户被锁定'}}</div>
				</div>
				<div class="sear_flex">
					<label for>角色：</label>
					<div class="sear_inp">
						<span
							v-for="(item,index) in currentRow.roles"
							:key="index"
						>{{item.roleName}}{{index!=currentRow.roles.length-1?'，':''}}</span>
					</div>
				</div>
				<div class="sear_flex">
					<label for>用户类型：</label>
					<div class="sear_inp">{{currentRow.userRole_dictText}}</div>
				</div>
			</div>
		</el-right>
		<!-- 重设密码 -->
		<el-right title="重置密码" :isShow.sync="isPwd" width="600px" isBorder>
			<el-form ref="formPwd" :model="formPwd" label-width="100px" :rules="rulesPwd">
				<el-form-item label="用户账号：" prop="username">
					<el-input v-model="formPwd.username" placeholder="请输入用户账号" disabled></el-input>
				</el-form-item>
				<el-form-item label="登录密码：" prop="password">
					<el-input v-model="formPwd.password" type="password" placeholder="请输入登录密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="password1">
					<el-input v-model="formPwd.password1" type="password" placeholder="请确认密码"></el-input>
				</el-form-item>
				<div style="text-align:center;margin-bottom:10px;">
					<el-button @click="isPwd=false">取消</el-button>
					<el-button type="primary" @click="surePwd">确定</el-button>
				</div>
			</el-form>
		</el-right>
		<!-- 添加编辑 -->
		<el-right :title="title" :isShow.sync="isEdit" width="600px" isBorder>
			<el-form ref="formEdit" :model="currentRow" label-width="100px" :rules="rulesEdit">
				<el-form-item label="用户账号：" prop="username">
					<el-input
						v-model="currentRow.username"
						placeholder="请输入用户账号"
						:disabled="title=='修改'?true:false"
					></el-input>
				</el-form-item>
				<el-form-item label="真实姓名：" prop="name">
					<el-input v-model="currentRow.name" placeholder="请输入真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" prop="mobile">
					<el-input v-model="currentRow.mobile" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="password" v-if="title=='新增'">
					<el-input v-model="currentRow.password" placeholder="请输入密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="confirmPwd" v-if="title=='新增'">
					<el-input v-model="currentRow.confirmPwd" placeholder="请输入密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="所属部门：" prop="departName">
					<div @click="choosePart">
						<el-input v-model="currentRow.departName" placeholder="请选择所属部门" readonly></el-input>
					</div>
				</el-form-item>
				<el-form-item label="头像：" prop="avatar">
					<el-upload
						class="avatar-uploader"
						:action="$uploadUrl"
						:http-request="uploadImg"
						:show-file-list="false"
						:before-upload="beforeAvatarUpload"
						accept="image/jpeg, image/gif, image/png, image/jpg"
					>
						<div
							v-if="currentRow.avatar"
							class="set_avatar"
							:style="{backgroundImage: `url(${currentRow.avatar})`}"
						></div>
						<div class="addAvatar" v-else>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="性别：" prop="sex">
					<el-radio v-model="currentRow.sex" label="0">男</el-radio>
					<el-radio v-model="currentRow.sex" label="1">女</el-radio>
				</el-form-item>
				<el-form-item label="生日：" prop="birthday">
					<el-date-picker
						v-model="currentRow.birthday"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="请选择生日"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="邮箱：" prop="email">
					<el-input v-model="currentRow.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="排序：" prop="sortOrder">
					<el-input-number
						v-model="currentRow.sortOrder"
						placeholder="请输入排序"
						:min="0"
						v-number-input
						controls-position="right"
					></el-input-number>
				</el-form-item>
				<!-- <el-form-item label="状态：" prop="state">
          <el-select placeholder="请选择用户状态查询" v-model="currentRow.state">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in states" :key="index"></el-option>
          </el-select>
				</el-form-item>-->
				<el-form-item label="用户类型：" prop="userRole">
					<el-select placeholder="请选择用户类型" v-model="currentRow.userRole">
						<el-option
							:label="item.itemText"
							:value="item.itemValue"
							v-for="(item,index) in userType"
							:key="index"
						></el-option>
					</el-select>
				</el-form-item>
				<div style="text-align:center;margin-bottom:10px;">
					<el-button @click="isEdit=false">取消</el-button>
					<el-button type="primary" @click="sureEdit">确定</el-button>
				</div>
			</el-form>
		</el-right>
		<!-- 分配角色 -->
		<el-right title="分配角色" :isShow.sync="isPei" width="600px" isBorder>
			<el-checkbox-group v-model="roles">
				<el-checkbox
					:label="item.id"
					border
					v-for="item in allRoles"
					:key="item.id"
					class="setWidth"
				>{{item.roleName}}</el-checkbox>
			</el-checkbox-group>
			<div class="dialog-footer" style="margin:30px 0px;text-align:center;">
				<el-button @click="isPei = false">取消</el-button>
				<el-button type="primary" @click="surePei">确 定</el-button>
			</div>
		</el-right>

		<!-- 选择部门 -->
		<el-dialog title="选择部门" :visible.sync="isDepart" v-if="isDepart" append-to-body>
			<el-tree
				ref="tree"
				:data="treeData"
				show-checkbox
				node-key="id"
				default-expand-all
				:props="defaultProps"
				:expand-on-click-node="false"
				check-strictly
				@check-change="checkChange"
				@node-click="nodeChange"
				:default-checked-keys="checkObj"
			></el-tree>
		</el-dialog>
		<!--导入模板下载  -->
		<el-dialog title="导入" :visible.sync="isImport" width="300px" append-to-body>
			<div style="text-align:center">您可以下载模板，查看导入的格式</div>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<a :href="exportM()" download="用户导入模版.xlsx">
					<el-button type="primary">模板下载</el-button>
				</a>
				<el-upload
					class="upload-file"
					:action="actionUrl"
					:http-request="uploadImg2"
					:show-file-list="false"
					:before-upload="beforeAvatarUpload2"
					accept=".xlsx, .xls"
				>
					<el-button type="primary">导入</el-button>
				</el-upload>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	import { uploadFile } from "@/utils/uploadFile.js";
	import { checkPhone, checkEmail, checkPwd } from "@/utils/validate.js";
	import elRight from "@/components/rightDialog";
	import md5 from "js-md5";
	export default {
		data() {
			var validateConfirmPwd = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请确认密码"));
				} else if (value !== this.formPwd.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			var checkFormMobile = function(rule, value, callback) {
				if (!value) {
					callback(new Error("请输入手机号码"));
				} else if (!checkPhone(value)) {
					callback(new Error("请输入有效的办公电话"));
				} else {
					callback();
				}
			};
			var checkFormEmail = function(rule, value, callback) {
				if (!value) {
					callback();
				} else if (value && !checkEmail(value)) {
					callback(new Error("请输入有效的邮箱"));
				} else {
					callback();
				}
			};
			var checkForPwd = function(rule, value, callback) {
				if (!value) {
					callback(new Error("请输入密码"));
				} else if (value && !checkPwd(value)) {
					callback(new Error("请输入8-20位由字母加数字组成的字符"));
				} else {
					callback();
				}
			};

			var confirmPwd = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请确认密码"));
				} else if (value !== this.currentRow.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			var name = function(rule, value, callback) {
				if (value && (value.length < 2 || value.length > 20)) {
					callback(new Error("请输入2-20个字符"));
				} else {
					callback();
				}
			};
			return {
				tableHeight: "400",
				paginations: {
					pageNum: 0, // 当前页
					pageSize: 10, // 1页显示多少条
					totalRowNum: 0 // 总数
				},
				isCol: true,
				searchForm: {
					username: "",
					email: "",
					mobile: ""
				},
				sex: null,
				state: null,
				tableData: [],
				multipleSelection: [],
				isInfo: false,
				isPwd: false,
				isEdit: false,
				isPei: false,
				currentRow: {},
				formPwd: {},
				title: "",
				rulesPwd: {
					username: [
						{
							required: true,
							message: "请输入用户账号",
							trigger: "blur"
						}
					],
					password: [
						{ required: true, validator: checkForPwd, trigger: "blur" }
					],
					password1: [
						{
							required: true,
							validator: validateConfirmPwd,
							trigger: "blur"
						}
					]
				},
				rulesEdit: {
					username: [
						{
							required: true,
							message: "请输入用户账号",
							trigger: "blur"
						},
						{ validator: name, trigger: "blur" }
					],
					name: [
						{
							required: true,
							message: "请输入真实姓名",
							trigger: "blur"
						},
						{ validator: name, trigger: "blur" }
					],
					mobile: [
						{
							required: true,
							validator: checkFormMobile,
							trigger: "blur"
						}
					],
					email: [{ validator: checkFormEmail, trigger: "blur" }],
					sex: [
						{ required: true, message: "请选择性别", trigger: "blur" }
					],
					state: [
						{ required: true, message: "请选择状态", trigger: "change" }
					],
					sortOrder: [
						{ required: true, message: "请输入排序", trigger: "blur" }
					],
					password: [
						{ required: true, validator: checkForPwd, trigger: "blur" }
					],
					departName: [
						{ required: true, message: "请选择部门", trigger: "blur" }
					],
					userRole: [
						{
							required: true,
							message: "请选择用户类型",
							trigger: "change"
						}
					],
					confirmPwd: [
						{ required: true, validator: confirmPwd, trigger: "blur" }
					]
				},
				states: [
					{
						value: 0,
						label: "正常"
					},
					{
						value: 1,
						label: "用户被锁定"
					}
				],
				avatarFile: {},
				loading: true,
				roles: [],
				isDepart: false,
				treeData: [],
				checkObj: [],
				defaultProps: {
					children: "children",
					label: "departName"
				},
				initListPermission: {},
				userType: [],
				avatarFile: "",
				fileReader: "",
				actionUrl: window.api.base + "/api/sysUser/import",
				isImport: false
			};
		},
		mounted() {
			this.initListPermission = this.$listPermission([
				"sysUser:update",
				"sysUser:delete",
				"sysUser:add"
			]);

			this.$store.dispatch("getRoles").then(res => {});
			this.$store.dispatch("getDepartTree").then(res => {
				this.treeData = res.body.data;
			});
			this.$store
				.dispatch("getDictItemList", { dictCode: "userRole" })
				.then(res => {
					this.userType = res.body.data;
				});
			this.$nextTick(() => {
				this.f_getTableHeight(); //获取表格高度
				window.onresize = () => {
					//事件会在窗口或框架被调整大小时发生
					this.f_getTableHeight();
				};
			});
			this.resetData(); //获取表格数据
		},
		beforeRouteLeave(to, from, next) {
			//组件销毁时销毁onresize方法
			window.onresize = null;
			next();
		},
		computed: {
			...mapGetters(["titleHeight", "allRoles"])
		},
		components: { elRight },
		watch: {
			titleHeight() {
				this.f_getTableHeight();
			}
		},
		methods: {
			//计算表格高度
			f_getTableHeight() {
				//等待 DOM 更新
				this.tableHeight = window.innerHeight - 240 - this.titleHeight;
			},
			resetData() {
				this.searchForm.sex = this.sex != null ? this.sex : "";
				this.searchForm.state = this.state != null ? this.state : "";
				this.loading = true;
				var param = {
					queryParams: [
						{
							key: "username",
							value: this.searchForm.username,
							logic: "Contain"
						},
						{
							key: "mobile",
							value: this.searchForm.mobile,
							logic: "Contain"
						},
						{
							key: "email",
							value: this.searchForm.email,
							logic: "Contain"
						},
						{
							key: "sex",
							value: this.searchForm.sex,
							logic: "Contain"
						},
						{
							key: "state",
							value: parseInt(this.searchForm.state),
							logic: "Equal"
						}
					],
					pageIndex: this.paginations.pageNum,
					pageSize: this.paginations.pageSize
				};
				if (this.searchForm.state == "") {
					var len = param.queryParams.length - 1;
					param.queryParams.splice(len, 1);
				}
				this.$store
					.dispatch("getSysUserPage", { body: param })
					.then(res => {
						if (res.body.errorCode == 0) {
							this.loading = false;
							this.tableData = res.body.data.content;
							this.paginations = {
								pageNum: res.body.data.pageable.pageNumber + 1, // 当前页
								pageSize: res.body.data.pageable.pageSize, // 1页显示多少条
								totalRowNum: res.body.data.totalElements // 总数
							};
						}
					});
			},
			//每页
			f_sizeChange(val) {
				this.paginations.pageSize = val;
				this.resetData();
			},
			//当前页
			f_currentChange(val) {
				this.paginations.pageNum = val;
				this.resetData();
			},
			searForm() {
				this.resetData();
			},
			resetForm() {
				this.sex = null;
				this.state = null;
				this.searchForm.username = "";
				this.searchForm.email = "";
				this.searchForm.mobile = "";
				this.resetData();
			},
			opera() {
				this.isCol = this.isCol ? false : true;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			clear() {
				this.$refs.multipleTable.clearSelection();
			},
			commandPare(i, row) {
				return {
					idx: i,
					row: row
				};
			},
			toIce(val) {
				this.currentRow = JSON.parse(JSON.stringify(val.row));
				if (val.idx == 1 || val.idx == 0) {
					var t = val.idx == 1 ? "冻结" : "解冻";
					this.$confirm("确定要" + t + "该用户？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.$store
								.dispatch("updateAuthUserState", {
									userId: this.currentRow.id,
									state: val.idx
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
						})
						.catch(() => {});
				}
				if (val.idx == 2) {
					this.$confirm("确定要删除该用户？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.$store
								.dispatch("deleteSysUser", {
									id: this.currentRow.id
								})
								.then(res => {
									if (res.body.errorCode == 0) {
										this.$message({
											message: "删除成功",
											type: "success"
										});
										this.resetData();
									}
								});
						})
						.catch(() => {});
				}
				if (val.idx == 4) {
					this.isInfo = true;
				}
				if (val.idx == 3) {
					this.formPwd.username = this.currentRow.username;
					this.isPwd = true;
				}
				if (val.idx == 5) {
					this.roles = [];
					if (this.currentRow.roles) {
						this.currentRow.roles.forEach(item => {
							this.roles.push(item.id);
						});
					}
					this.isPei = true;
				}
			},
			surePwd() {
				this.$refs.formPwd.validate(valid => {
					if (valid) {
						this.formPwd.password = md5(this.formPwd.password);
						this.$store
							.dispatch("resetAuthUserPassword", {
								userId: this.currentRow.id,
								password: this.formPwd.password
							})
							.then(res => {
								if (res.body.errorCode == 0) {
									this.$message({
										message: "密码修改成功",
										type: "success"
									});
									this.isPwd = false;
									this.resetData();
								}
							});
					}
				});
			},
			surePei() {
				if (this.roles.length == 0) {
					this.$message({
						message: "请先选择要分配的角色",
						type: "warning"
					});
					return false;
				}
				this.currentRow.roles = [];
				this.roles.forEach(item => {
					this.allRoles.forEach(item2 => {
						if (item == item2.id) {
							this.currentRow.roles.push(item2);
						}
					});
				});
				this.$store
					.dispatch("addOrUpdateSysUser", {
						body: {
							departId: this.currentRow.departId,
							id: this.currentRow.id,
							roles: this.currentRow.roles,
							userRole: this.currentRow.userRole
						}
					})
					.then(res => {
						if (res.body.errorCode == 0) {
							this.$message({
								message: "角色分配成功",
								type: "success"
							});
							this.isPei = false;
							this.resetData();
						}
					});
			},
			choosePart() {
				this.isDepart = true;
				if (this.currentRow.departId) {
					this.checkObj = [this.currentRow.departId];
				} else {
					this.checkObj = [];
				}
			},
			checkChange(data, checked, indeterminate) {
				var that = this;
				if (checked) {
					this.checkObj = [data.id];
					this.$refs.tree.setCheckedKeys([data.id]);
					// setCurrentNode 设置某个节点的当前选中状态,
					this.$refs.tree.setCurrentNode(data);
				} else {
					if (this.checkObj[0] === data.id) {
						// 点击已选中复选框，保证至少一个选中
						this.$refs.tree.setCheckedKeys([data.id]);
						this.$refs.tree.setCurrentNode(data);
					}
				}
				setTimeout(function() {
					that.$set(that.currentRow, "departId", data.id);
					that.$set(that.currentRow, "departName", data.departName);
					that.$refs["formEdit"].clearValidate();
					that.isDepart = false;
				}, 500);
			},
			nodeChange(item) {
				var that = this;
				this.checkObj = [item.id];
				this.$refs.tree.setCheckedKeys([item.id]);
				setTimeout(function() {
					that.$set(that.currentRow, "departId", item.id);
					that.$set(that.currentRow, "departName", item.departName);
					that.$refs["formEdit"].clearValidate();
					that.isDepart = false;
				}, 600);
			},
			beforeAvatarUpload(file) {
				this.avatarFile = file;
			},
			uploadImg() {
				const types = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
				const isJPG = types.indexOf(this.avatarFile.type);
				const isLt1M = this.avatarFile.size / 1024 / 1024 < 1;
				if (isJPG == -1) {
					this.$message({
						message: "只允许上传jpg/jpeg/png/gif格式的图片",
						type: "warning"
					});
					return;
				}
				if (!isLt1M) {
					this.$message({
						message: "上传图片大小不能超过 1MB!",
						type: "warning"
					});
					return;
				}
				uploadFile(this.avatarFile)
					.then(res => {
						this.$set(this.currentRow, "avatar", res.body.data.fileUrl);
					})
					.catch(err => {});
			},
			toEdit(t, row) {
				this.title = t;
				if (row) {
					this.currentRow = JSON.parse(JSON.stringify(row));
					this.currentRow.departName = this.currentRow.sysDepartDto.departName;
				} else {
					this.currentRow = {};
					this.$set(this.currentRow, "sex", "0");
					this.currentRow.state = this.states[0].value;
					this.currentRow.userRole = this.userType[0].itemValue;
				}

				this.isEdit = true;
			},
			sureEdit() {
				this.$refs.formEdit.validate(valid => {
					if (valid) {
						if (this.currentRow.birthday) {
							if (
								this.currentRow.birthday.indexOf("00:00:00") == -1
							) {
								this.currentRow.birthday =
									this.currentRow.birthday + " 00:00:00";
							}
						}
						if (this.currentRow.password) {
							this.currentRow.password = md5(
								this.currentRow.password
							);
						}
						this.$store
							.dispatch("addOrUpdateSysUser", {
								body: this.currentRow
							})
							.then(res => {
								if (res.body.errorCode == 0) {
									if (this.currentRow.id) {
										this.resetData();
										this.$message({
											message: "修改成功",
											type: "success"
										});
									} else {
										this.resetForm();
										this.$message({
											message: "添加成功",
											type: "success"
										});
									}
									this.isEdit = false;
								}
							});
					}
				});
			},
			exportUrl() {
				this.$axios({
					method: "post",
					url: window.api.base + "/api/sysUser/export",
					responseType: "blob",
					data: { body: {} }
				})
					.then(response => {
						this.download(response.data);
					})
					.catch(error => {});
			},
			download(data) {
				if (!data) {
					return;
				}
				let blob = new Blob([data]);
				let fileName = "用户管理.xlsx";
				if ("download" in document.createElement("a")) {
					// 不是IE浏览器
					let url = window.URL.createObjectURL(blob);
					let link = document.createElement("a");
					link.style.display = "none";
					link.href = url;
					link.setAttribute("download", fileName);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link); // 下载完成移除元素
					window.URL.revokeObjectURL(url); // 释放掉blob对象
				} else {
					// IE 10+
					window.navigator.msSaveBlob(blob, fileName);
				}
			},
			exportM() {
				return window.api.base + "/excel/用户导入模版.xlsx";
			},
			beforeAvatarUpload2(file) {
				this.avatarFile = file;
			},
			uploadImg2(file1) {
				uploadFile(this.avatarFile, this.actionUrl)
					.then(res => {
						if (res.data.errorCode == 0) {
							this.isImport = false;
							this.resetData();
							this.$message({
								message: "导入成功",
								type: "success"
							});
						} else {
							this.$message({
								message: res.data.errorMsg,
								type: "error"
							});
						}
					})
					.catch(err => {
						this.$message({
							message: err.data.errorMsg,
							type: "error"
						});
					});
			},
			toImport() {
				this.isImport = true;
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
	.avater {
		width: 30px;
		height: 30px;
		border-radius: 4px;
	}
	.avatarInfo,
	.set_avatar {
		width: 150px;
		&.set_avatar {
			height: 150px;
			background-size: 100% 100%;
			border: 1px solid #ccc;
			border-radius: 5px;
		}
	}
	.el-dropdown-link {
		color: #1890ff;
		cursor: pointer;
	}
	.editBtn {
		margin-right: 10px;
	}
	.upload-file {
		display: inline-block;
	}
	.addAvatar {
		display: inline-block;
		width: 150px;
		height: 150px;
		text-align: center;
		line-height: 150px;
		border: 1px dashed #ccc;
		.el-icon-plus {
			font-size: 24px;
		}
	}
	.el-checkbox {
		margin: 0px 0px 10px 10px;
	}
	.setWidth {
		width: 140px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

