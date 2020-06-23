<template>
	<div class="sysDepart">
		<div class="departLeft">
			<div class="back">
				<el-tabs v-model="areaType" @tab-click="handleClick">
					<el-tab-pane label="全部" name="全部"></el-tab-pane>
					<el-tab-pane label="开放" name="开放"></el-tab-pane>
				</el-tabs>
				<div class="btns">
					<el-button type="primary" @click="addChild" v-if="initListPermission.add">新增子区域</el-button>
					<el-button type="primary" @click="addNew" v-if="initListPermission.add">新增一级区域</el-button>
					<el-button type="primary" icon="el-icon-download" v-has="'role:export'">导出</el-button>
					<el-button type="primary" v-has="'role:import'">
						<span class="iconfont iconziyuan1"></span>
						<span class="icon">导入</span>
					</el-button>
				</div>
				<el-tag style="margin-top:15px">
					<span class="el-icon-warning"></span>当前选择：
					<span>{{current.name}}</span>
				</el-tag>
				<el-button type="text" @click="cancel" v-if="current.code">取消选择</el-button>
				<div class="sear">
					<el-input
						placeholder="请输入区域名称"
						suffix-icon="el-icon-search"
						@keyup.enter.native="search"
						v-model="name"
					></el-input>
				</div>
				<div class="tree">
					<el-tree
						ref="tree"
						:data="treeData"
						node-key="id"
						:props="defaultProps"
						:expand-on-click-node="false"
						:filter-node-method="filterNode"
						check-strictly
						@node-click="handleNodeClick"
					>
						<span class="custom-tree-node" slot-scope="{ node, data }" :class="!data.enable?'unEnble':''">
							<span :class="current.id==data.id?'colorSet':''" class="treeSpan">{{ node.label }}</span>
							<span style="padding-left:5px;">
								<el-button v-show="current.id==data.id" type="text" @click="() => del()">删除</el-button>
							</span>
						</span>
					</el-tree>
				</div>
			</div>
		</div>
		<div class="departRight" :class="{'areaRight': !sideBarFlag}">
			<div class="back">
				<div class="title">修改区域</div>
				<el-form ref="form" :model="form" label-width="100px" :rules="rules">
					<el-form-item label="区域名称" prop="name">
						<el-input v-model="form.name" placeholder="请输入区域名称"></el-input>
					</el-form-item>
					<el-form-item label="区域编码" prop="code">
						<el-input v-model="form.code" placeholder="请输入区域编码"></el-input>
					</el-form-item>
					<el-form-item label="上级区域">
						<el-input v-model="form.parentCode_dictText" placeholder="无" disabled></el-input>
					</el-form-item>
					<el-form-item label="是否可用">
						<el-switch v-model="form.enable" active-color="#13ce66" inactive-color="#DCDFE6"></el-switch>
					</el-form-item>
					<div style="text-align:center;margin-bottom:10px">
						<el-button icon="el-icon-refresh" @click="reset">重置</el-button>
						<el-button icon="el-icon-edit-outline" class="btnSet" type="primary" @click="edit">修改并保存</el-button>
					</div>
				</el-form>
			</div>
		</div>

		<!-- 新增 -->
		<el-right :title="form1.parentCode?'新增子区域':'新增一级区域'" :isShow.sync="isAdd" width="600px" isBorder>
			<el-form ref="form1" :model="form1" label-width="20%" :rules="rules">
				<el-form-item label="区域名称" prop="name">
					<el-input v-model="form1.name" placeholder="请输入机构/部门名称"></el-input>
				</el-form-item>
				<el-form-item label="区域编码" prop="code">
					<el-input v-model="form1.code" placeholder="请输入区域编码"></el-input>
				</el-form-item>
				<el-form-item label="上级区域" v-if="form1.parentCode">
					<el-input v-model="form1.parentCode_dictText" placeholder="无" disabled></el-input>
				</el-form-item>
				<el-form-item label="是否可用">
					<el-switch v-model="form1.enable"></el-switch>
				</el-form-item>
				<div style="text-align:center;margin-bottom:10px;">
					<el-button @click="isAdd = false">取消</el-button>
					<el-button type="primary" @click="toAdd">确 定</el-button>
				</div>
			</el-form>
		</el-right>
	</div>
</template>
<script>
	import { mapState } from "vuex";
	import { checkCode } from "@/utils/validate.js";
	import elRight from "@/components/rightDialog";
	export default {
		data() {
			var checkForCode = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入区域编码"));
				} else if (!checkCode(value)) {
					callback(new Error("请输入6位数字的区域编码"));
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
				isAdd: false,
				form: {
					enable: true
				},
				form1: {},
				current: {},
				name: "",
				treeData: [],
				rules: {
					name: [
						{
							required: true,
							message: "请输入区域名称",
							trigger: "blur"
						},
						{ validator: name, trigger: "blur" }
					],
					code: [
						{ required: true, validator: checkForCode, trigger: "blur" }
					]
				},
				defaultProps: {
					children: "children",
					label: "name"
				},
				loading: true,
				initListPermission: {},
				areaType: "全部"
			};
		},
		components: { elRight },
		mounted() {
			this.initListPermission = this.$listPermission([
				"area:update",
				"area:delete",
				"area:add"
			]);
			this.resetData();
		},
		computed: {
			...mapState({
				sideBarFlag: state => state.common.sideBarFlag
			})
		},
		methods: {
			resetData() {
				this.loading = true;
				var queryAll = this.areaType == "全部" ? true : false;
				this.$store
					.dispatch("getAreas", { recursion: true, queryAll: queryAll })
					.then(res => {
						this.loading = false;
						this.treeData = res.body.data;
					});
			},
			handleNodeClick(val) {
				if (!val.sortOrder) {
					val.sortOrder = 0;
				}
				this.form = JSON.parse(JSON.stringify(val));
				this.current = JSON.parse(JSON.stringify(val));
				this.$refs["form"].clearValidate();
				if (this.current.parentCode != "0") {
					this.$store.dispatch("getArea", { id: val.id }).then(res => {
						this.$set(
							this.form,
							"parentCode_dictText",
							res.body.data.parentCode_dictText
						);
					});
				}
			},
			filterNode(value, data) {
				return data.name.indexOf(value) !== -1;
			},
			search() {
				this.$refs.tree.filter(this.name);
			},
			reset() {
				this.form.name = "";
				this.form.sortOrder = 0;
				this.form.description = "";
			},
			handleClick(tab, event) {
				this.current = {};
				this.form = {};
				this.form.sortOrder = 0;
				this.resetData();
			},
			edit() {
				if (!this.initListPermission.update) {
					this.$message({
						message: "抱歉，您没有修改权限~",
						type: "warning"
					});
					return;
				}
				this.$refs.form.validate(valid => {
					if (valid) {
						if (!this.form.id) {
							this.$message({
								message: "请先选中一条记录",
								type: "warning"
							});
							return;
						}
						if (this.form.children) {
							delete this.form.children;
						}
						this.$store
							.dispatch("updateArea", { body: this.form })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.resetData();
									this.$message({
										message: "修改成功",
										type: "success"
									});
									this.current = {};
									this.form = {};
									this.form1 = {};
								}
							});
					}
				});
			},
			addChild() {
				if (!this.current.code) {
					this.$message({
						message: "请先选中一条记录",
						type: "warning"
					});
					return;
				}
				this.form1 = {};
				this.form1.parentCode = JSON.parse(
					JSON.stringify(this.current)
				).code;
				this.form1.parentCode_dictText = JSON.parse(
					JSON.stringify(this.current)
				).name;
				this.$set(this.form1, "sortOrder", 0);
				this.$set(this.form1, "enable", true);
				this.isAdd = true;
			},
			addNew() {
				this.form1 = {};
				this.$set(this.form1, "sortOrder", 0);
				this.$set(this.form1, "enable", true);
				this.isAdd = true;
			},
			cancel() {
				this.current = {};
				this.form = {};
				this.form.sortOrder = 0;
				this.form.enable = true;
				this.$refs["form"].clearValidate();
				this.resetData();
			},
			toAdd() {
				this.$refs.form1.validate(valid => {
					if (valid) {
						if (!this.form1.parentCode) {
							this.form1.parentCode = "0";
						}
						this.$store
							.dispatch("addArea", { body: this.form1 })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.resetData();
									this.$message({
										message: "添加成功",
										type: "success"
									});
									this.isAdd = false;
									this.current = {};
									this.form = {};
									this.form1 = {};
								}
							});
					}
				});
			},
			del() {
				this.$confirm(
					"确定要删除所选中的数据，以及子节点数据吗?",
					"确认删除  ",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
					.then(() => {
						this.$store
							.dispatch("deleteArea", { id: this.current.id })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.resetData();
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.current = {};
									this.form = {};
									this.form1 = {};
								}
							});
					})
					.catch(() => {});
			}
		}
	};
</script>
<style lang='less' scoped>
	.sysDepart {
		overflow: hidden;
		.back {
			background: #fff;
			padding: 25px 30px;
			height: 100%;
		}
		.departLeft,
		.departRight {
			box-sizing: border-box;
			padding-right: 12px;
			top: 0px;
		}
		.departRight {
			position: fixed;
			width: calc(~"(100vw - (100vw - 100%) - 240px - 24px)/2");
			right: 20px;
			top: calc(~"50px + 40px + 12px");
			transition: width 0.3s ease-in-out;
			// bottom:calc(~"@{footerHeight} + 12px");
			&.areaRight {
				width: calc(~"(100vw - (100vw - 100%) - 240px - 24px)/2");
			}
		}
		.departLeft {
			width: 50%;
			float: left;
			position: relative;
			.btns {
				button {
					margin-left: 0px;
					margin-right: 10px;
					.iconziyuan1 {
						font-size: 12px;
					}
					.icon {
						padding-left: 5px;
					}
				}
			}
			.custom-tree-node,
			.custom-tree-node {
				overflow: hidden;
				display: block;
				width: 100%;
				.treeSpan {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: inline-block;
					max-width: 80%;
					vertical-align: middle;
					padding: 0px 5px;
					height: 26px;
					line-height: 26px;
				}
			}
			.currentC {
				border: 1px solid #91d5ff;
				background-color: #e6f7ff;
				padding: 12px 15px;
				margin-top: 5px;
				span {
					color: #1890ff;
					margin-right: 5px;
				}
				a {
					color: #1890ff;
				}
			}
			.sear {
				margin-top: 10px;
			}
			.tree {
				margin-top: 10px;
				.unEnble {
					.treeSpan {
						color: #ccc;
					}
				}
			}
		}
	}
	.departRight {
		.title {
			font-size: 18px;
			padding-bottom: 15px;
		}
	}
</style>

