<!--  -->
<template>
	<div class="sysMenu">
		<el-button type="primary" icon="el-icon-plus" @click="add" v-if="initListPermission.add">新增</el-button>
		<el-button plain v-if="multipleSelection.length!=0" icon="el-icon-delete">批量删除</el-button>
		<!-- <div class="titleChecked">
      已选择
      <span>{{multipleSelection.length}}</span> 项
      <span style="margin-left:30px;cursor: pointer;" @click="clearChoose">清空</span>
		</div>-->
		<el-table
			ref="multipleTable"
			:data="tableData"
			v-loading="tableLoading"
			tooltip-effect="dark"
			border
			style="width: 100%;margin-top:20px;"
			row-key="id"
			@selection-change="handleSelectionChange"
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
		>
			<!-- <el-table-column type="selection" width="55"></el-table-column> -->
			<el-table-column label="菜单名称" align="center">
				<template slot-scope="scope">{{ scope.row.menuName }}</template>
			</el-table-column>
			<el-table-column prop="menuType" label="菜单类型" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.menuType =='Catalogue'">目录</span>
					<span v-if="scope.row.menuType =='Menu'">菜单</span>
					<span v-if="scope.row.menuType =='Button'">按钮</span>
				</template>
			</el-table-column>
			<el-table-column prop="icon" label="icon" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="component" label="组件" align="center" show-overflow-tooltip></el-table-column>

			<el-table-column prop="route" label="路径" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="sort" label="排序" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column fixed="right" label="操作" width="160" align="center">
				<template slot-scope="scope">
					<el-button
						@click.native.prevent="edit(scope.$index, scope.row)"
						type="text"
						v-if="initListPermission.update"
					>修改</el-button>
					<el-dropdown @command="toMore">
						<el-button type="text">
							更多
							<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>

						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="check('pre',scope.row)">详情</el-dropdown-item>
							<el-dropdown-item
								:command="check('addSonmenu',scope.row)"
								v-if="scope.row.menuType!='Button' && initListPermission.add"
							>新增子菜单</el-dropdown-item>
							<!-- <el-dropdown-item :command="check('dataRules',scope.row)">数据规则</el-dropdown-item> -->
							<el-dropdown-item :command="check('del',scope.row)" v-if="initListPermission.delete">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<el-right :title="drawerTitle" :isShow.sync="dialog" width="600px">
			<div class="demo-drawer__content">
				<el-form ref="form" :rules="rules" :model="form" label-width="110px">
					<el-form-item label="菜单级别：">
						<el-radio-group v-model="menuLevel" :disabled="btn_dis" @change="chaRadio">
							<el-radio :label="'Catalogue'">一级菜单</el-radio>
							<el-radio :label="'Menu'">子菜单</el-radio>
							<el-radio :label="'Button'">按钮/权限</el-radio>
						</el-radio-group>
					</el-form-item>
					<!-- <el-form-item label="菜单类型:" prop="menuType" v-if="menuLevel!='按钮/权限'">
            <el-radio-group v-model="form.menuType" :disabled="btn_dis">
              <el-radio :label="'Catalogue'">目录</el-radio>
              <el-radio :label="'Menu'">菜单</el-radio>
              <el-radio :label="'Button'">按钮</el-radio>
            </el-radio-group>
					</el-form-item>-->
					<el-form-item :label="this.menuLevel!='Button'?'菜单名称：':'按钮名称：'" prop="menuName">
						<el-input v-model="form.menuName" :disabled="btn_dis" placeholder="请输入菜单名称"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单：" v-if="menuLevel=='Menu' || menuLevel=='Button'" prop="parent_menu">
						<el-cascader
							:options="options"
							placeholder="不选则默认为顶级菜单"
							:props="menuProps"
							v-model="form.parent_menu"
							width="80%"
							:disabled="btn_dis"
							@change="getparentId"
							clearable
							ref="refHandle"
						></el-cascader>
					</el-form-item>
					<el-form-item label="前端组件：" prop="component" v-if="menuLevel!='Button'">
						<el-input v-model="form.component" :disabled="btn_dis" placeholder="请输入前端组件"></el-input>
					</el-form-item>
					<el-form-item label="授权标识：" v-if="menuLevel=='Button'">
						<el-input
							v-model="permissionsVal"
							:disabled="btn_dis"
							placeholder="多个用逗号分割，如：user:list，user:create"
						></el-input>
					</el-form-item>
					<el-form-item label="菜单路由：" prop="route" v-if="menuLevel!='Button'">
						<el-input v-model="form.route" :disabled="btn_dis" placeholder="请输入菜单路由"></el-input>
					</el-form-item>
					<el-form-item label="菜单图标：" prop="icon" v-if="menuLevel!='Button'">
						<el-input placeholder="点击右侧按钮选择图标" :disabled="btn_dis" v-model="form.icon">
							<el-button slot="append" icon="el-icon-setting" :disabled="btn_dis" @click="chooseIcon"></el-button>
						</el-input>
					</el-form-item>

					<el-form-item label="排序：" prop="sort" v-if="menuLevel!='Button'">
						<el-input-number
							v-model="form.sort"
							controls-position="right"
							:disabled="btn_dis"
							@change="handleChange"
							v-number-input
							:min="0"
						></el-input-number>
					</el-form-item>
					<el-form-item label="打开方式:" prop="open" v-if="menuLevel!='Button'">
						<el-radio-group v-model="form.open" :disabled="btn_dis">
							<el-radio :label="'1'">是</el-radio>
							<el-radio :label="'0'">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-show="this.drawerTitle!='详情'" style="margin-bottom:10px;text-align:center">
						<el-button @click="dialog=false">取消</el-button>
						<el-button type="primary" :disabled="drawerTitle == '详情'" @click="onSubmit('form')">确定</el-button>
					</div>
				</el-form>
			</div>
		</el-right>
		<el-dialog
			class="iconDialog"
			title="选择图标"
			width="70%"
			:visible.sync="iconDialog"
			align="center"
			append-to-body
		>
			<div class="iconContent">
				<div
					v-for="(item,index) of elementIcons"
					:key="item"
					@click="generateElementIconCode(item,index)"
				>
					<div class="icon-item" :class="{ red:changeRed == index}">
						<i :class="'el-icon-' + item" />
					</div>
				</div>
			</div>
			<div class="icon-btn" style="text-align:center;margin-top:10px;">
				<el-button @click="iconDialog = false">取消</el-button>
				<el-button type="primary" @click="subIcon">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import elRight from "@/components/rightDialog";
	import { mapActions, mapGetters } from "vuex";
	import elementIcons from "@/utils/element-icons";

	export default {
		data() {
			return {
				rules: {
					resource: [
						{
							required: true,
							message: "请选择菜单类型",
							trigger: "change"
						}
					],
					menuName: [
						{
							required: true,
							message: "请输入菜单名称",
							trigger: "blur"
						}
					],
					parent_menu: [
						{
							required: true,
							message: "请选择上级菜单",
							trigger: "change"
						}
					],
					component: [
						{
							required: true,
							message: "请输入组件名称",
							trigger: "blur"
						}
					],
					route: [
						{
							required: true,
							message: "请输入菜单路由",
							trigger: "blur"
						}
					],
					menuType: [
						{
							required: true,
							message: "请选择菜单类型",
							trigger: "change"
						}
					],
					sort: [
						{ required: true, message: "请输入排序", trigger: "blur" }
					],
					open: [
						{
							required: true,
							message: "请选择打开方式",
							trigger: "change"
						}
					]
				},
				btn_dis: false,
				menuProps: {
					label: "menuName",
					value: "id",
					children: "children",
					checkStrictly: true
				},
				elementIcons,
				tableData: [],
				multipleSelection: [],
				dialog: false,
				form: {
					id: "",
					menuName: "",
					parentMenuId: "",
					parentIds: [],
					menuType: "",
					menuSys: "",
					sort: 0,
					route: "",
					component: "",
					permissions: [],
					children: [],
					open: "",
					parent_menu: []
				},

				menuLevel: "Catalogue",
				tableLoading: true,
				drawerTitle: "新增",
				num: 0,
				visible: false,
				iconDialog: false,
				changeRed: -1,
				iconCode: "",
				options: [],
				selectedOptions: "",
				permissionsVal: "",
				currentRow: {},
				initListPermission: {}
			};
		},

		components: { elRight },

		computed: {},
		mounted() {
			this.initListPermission = this.$listPermission([
				"menu:update",
				"menu:delete",
				"menu:add"
			]);
			this.getData();
		},
		methods: {
			...mapActions(["getSysUserInfo"]),
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			deleteRow(item, index) {},
			clearChoose() {
				this.multipleSelection = [];
				this.$refs.multipleTable.clearSelection();
			},

			check(i, row) {
				return {
					type: i,
					row: row
				};
			},
			toMore(val) {
				if (val.type == "del") {
					this.$confirm("确定要删除菜单吗？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.$store
								.dispatch("deleteMenu", { id: val.row.id })
								.then(res => {
									if (res.body.errorCode == 0) {
										this.$message({
											message: "删除成功",
											type: "success"
										});
										this.getData();
										this.getSysUserInfo();
									}
								});
						})
						.catch(() => {});
				} else if (val.type == "pre") {
					this.$store
						.dispatch("getOneMenu", { id: val.row.id })
						.then(res => {
							if (res.body.errorCode == 0) {
								this.form = res.body.data;
								// this.form.parent_menu=this.form.parentIds;
								this.$set(
									this.form,
									"parent_menu",
									this.form.parentIds
								);
								this.menuLevel = this.form.menuType;
								this.drawerTitle = "详情";
								this.permissionsVal = "";
								if (this.menuLevel == "Button") {
									if (
										this.form.permissions &&
										this.form.permissions.length > 0
									) {
										this.form.permissions.forEach(item => {
											if (this.permissionsVal == "") {
												this.permissionsVal = item;
											} else {
												this.permissionsVal =
													this.permissionsVal +
													"," +
													item;
											}
										});
									}
								}
								this.btn_dis = true;
								this.dialog = true;
							}
						});
				} else if (val.type == "addSonmenu") {
					this.menuLevel = "Menu";
					this.drawerTitle = "新增";
					this.btn_dis = false;

					this.form = {};
					this.permissionsVal = "";
					this.form.menuSys = this.$menuSys;
					this.$store
						.dispatch("getOneMenu", { id: val.row.id })
						.then(res => {
							if (res.body.errorCode == 0) {
								if (res.body.data.parentIds) {
									// this.parent_menu=res.body.data.parentIds;
									this.$set(
										this.form,
										"parent_menu",
										res.body.data.parentIds
									);
								} else {
									// this.parent_menu=[];
									this.$set(this.form, "parent_menu", []);
								}

								this.form.parent_menu.push(val.row.id);
								this.form.parentIds = this.form.parent_menu;
							}
						});
					var arr = [];
					if (val.row.children && val.row.children.length > 0) {
						val.row.children.forEach(item => {
							arr.push(item.sort);
						});
					}
					var max = 0;
					if (arr.length > 0) {
						max = this.array_max(arr);
					}
					this.$set(this.form, "sort", max + 1);
					this.form.parentMenuName = val.row.menuName;
					this.form.parentMenuId = val.row.id;
					this.$set(this.form, "open", "0");
					this.dialog = true;
				}
			},
			add() {
				this.drawerTitle = "新增";
				this.menuLevel = "Catalogue";
				this.form = {};
				// this.form.parent_menu=[];
				this.$set(this.form, "parent_menu", []);
				this.btn_dis = false;
				this.dialog = true;
				this.permissionsVal = "";
				this.form.menuSys = this.$menuSys;
				var arr = [];
				this.tableData.forEach(item => {
					arr.push(item.sort);
				});
				var max = 0;
				if (arr.length > 0) {
					max = this.array_max(arr);
				}
				this.$set(this.form, "sort", max + 1);
				this.$set(this.form, "open", "0");
			},
			array_max(arr) {
				var max = arr[0];
				for (var i in arr) {
					if (arr[i] > max) {
						max = arr[i];
					}
				}
				return max;
			},
			arrFor(arr, id) {
				var that = this;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == id) {
						var max = 1;
						var arrMar = [];
						if (arr[i].children && arr[i].children.length > 0) {
							arr[i].children.forEach(item => {
								if (item.menuType == this.menuLevel) {
									arrMar.push(item.sort);
								}
							});
						}
						if (arrMar.length > 0) {
							max = that.array_max(arrMar) + 1;
						}
						return max;
					}
					if (arr[i].children) {
						var max = that.arrFor(arr[i].children, id);
						if (max) {
							return max;
						}
					}
				}
			},
			chaRadio() {
				if (this.menuLevel != this.currentRow.menuType) {
					if (this.menuLevel == "Catalogue") {
						var arr = [];
						this.tableData.forEach(item => {
							arr.push(item.sort);
						});
						var max = 0;
						if (arr.length > 0) {
							max = this.array_max(arr);
						}
						this.$set(this.form, "sort", max + 1);
					} else {
						if (
							this.form.parent_menu &&
							this.form.parent_menu.length &&
							this.form.parent_menu.length > 0
						) {
							var id = this.form.parent_menu[
								this.form.parent_menu.length - 1
							];
							this.$set(
								this.form,
								"sort",
								this.arrFor(this.tableData, id)
							);
						} else {
							this.$set(this.form, "sort", 0);
						}
					}
				} else {
					this.$set(this.form, "sort", this.currentRow.sort);
				}
			},
			edit(i, row) {
				this.$store.dispatch("getOneMenu", { id: row.id }).then(res => {
					if (res.body.errorCode == 0) {
						this.drawerTitle = "修改";
						this.btn_dis = false;
						this.currentRow = JSON.parse(JSON.stringify(res.body.data));
						this.form = res.body.data;
						// this.form.parent_menu = res.body.data.parentIds;
						this.$set(
							this.form,
							"parent_menu",
							res.body.data.parentIds
						);
						this.form.children = [];
						this.menuLevel = this.form.menuType;
						this.permissionsVal = "";
						if (this.menuLevel == "Button") {
							if (
								this.form.permissions &&
								this.form.permissions.length > 0
							) {
								this.form.permissions.forEach(item => {
									if (this.permissionsVal == "") {
										this.permissionsVal = item;
									} else {
										this.permissionsVal =
											this.permissionsVal + "," + item;
									}
								});
							}
						}
						this.dialog = true;
					}
				});
			},
			onSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						if (this.menuLevel == "Catalogue") {
							this.form.parentMenuId = "";
							this.form.parentIds = [];
							this.form.menuType = "Catalogue";
						}
						if (this.permissionsVal) {
							this.form.permissions = this.permissionsVal.split(",");
						}
						if (this.menuLevel == "Button") {
							this.form.menuType = "Button";
						}
						if (this.menuLevel == "Menu") {
							this.form.menuType = "Menu";
						}
						this.$store
							.dispatch("addMenu", { body: this.form })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.$message({
										message: this.drawerTitle + `成功`,
										type: "success"
									});
									this.dialog = false;
									this.getData();
									this.getSysUserInfo();
								}
							});
					} else {
						return false;
					}
				});
			},
			handleChange(value) {},
			getData() {
				this.$store
					.dispatch("getMenuTree", { menuSys: this.$menuSys })
					.then(res => {
						if (res.body.errorCode == 0) {
							this.tableData = res.body.data;
							this.options = this.getTreeData(
								JSON.parse(JSON.stringify(res.body.data))
							);

							this.tableLoading = false;
						}
					});
			},
			getTreeData(data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].menuType == "Button") {
						data[i].disabled = true;
					}
					if (data[i].children && data[i].children.length > 0) {
						this.getTreeData(data[i].children);
					} else {
						data[i].children = undefined;
					}
				}
				return data;
			},
			chooseIcon() {
				this.iconDialog = true;
			},
			generateElementIconCode(symbol, index) {
				this.changeRed = index;
				this.iconCode = `el-icon-${symbol}`;
				this.$message({
					message: `选中el-icon-${symbol}`,
					type: "success"
				});
				return `<i class="el-icon-${symbol}" />`;
			},
			subIcon() {
				this.form.icon = this.iconCode;
				this.iconDialog = false;
			},
			getparentId(value) {
				this.form.parentMenuId = value[value.length - 1];
				this.form.parentIds = value;
				if (this.$refs.refHandle) {
					this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
				}
				var id = value[value.length - 1];
				this.$set(this.form, "sort", this.arrFor(this.tableData, id));
			}
		}
	};
</script>
<style lang='less' scoped>
	.sysMenu {
		background: #fff;
		padding: 20px;
	}
	.sysMenu /deep/ .el-drawer {
		overflow-y: auto;
		background-color: #fff;
	}
	.titleChecked {
		width: 100%;
		background: #e6f7ff;
		border: 1px solid #91d5ff;
		line-height: 40px;
		border-radius: 6px;
		margin: 10px 0;
		text-indent: 30px;
		span {
			color: #1890ff;
		}
	}
	.el-table__header-wrapper {
		color: #000 !important;
	}
	.el-dropdown-link {
		color: #1890ff;
		cursor: pointer;
		padding-left: 10px;
	}
	.demo-drawer {
		overflow: hidden;
		overflow-y: auto;
	}
	.demo-drawer__content {
		width: 90%;
		margin: 0 auto;
		border: 1px solid rgb(233, 233, 233);
		padding: 20px;
		overflow-y: auto;
	}
	.icon-item {
		margin: 10px;
		height: 40px;
		text-align: center;
		width: 50px;
		float: left;
		font-size: 20px;
		float: left;
		color: #24292e;
		cursor: pointer;
		span {
			display: block;
			font-size: 16px;
			margin-top: 10px;
		}
		i {
			padding-top: 10px;
		}
	}
	.red {
		border: 1px solid red;
	}

	.iconContent {
		overflow: hidden;
	}
	.icon-btn {
		overflow: hidden;
		.icon-btn_ {
			float: right;
			margin-right: 20px;
		}
	}
</style>