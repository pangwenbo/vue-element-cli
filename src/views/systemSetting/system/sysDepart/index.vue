<template>
	<div class="sysDepart">
		<div class="departLeft">
			<div class="back">
				<div class="btns">
					<el-button type="primary" @click="addChild" v-if="initListPermission.add">新增子部门</el-button>
					<el-button type="primary" @click="addNew" v-if="initListPermission.add">新增一级部门</el-button>
					<el-button type="primary" icon="el-icon-download" @click="exportUrl">导出</el-button>
					<el-button type="primary" @click="toImport">
						<span class="iconfont iconziyuan1"></span>
						<span class="icon">导入</span>
					</el-button>
				</div>
				<el-tag style="margin-top:15px">
					<span class="el-icon-warning"></span>当前选择：
					<span>{{current.departName}}</span>
				</el-tag>
				<el-button type="text" @click="cancel" v-if="current.id">取消选择</el-button>
				<div class="sear">
					<el-input
						placeholder="请输入部门名称"
						suffix-icon="el-icon-search"
						@keyup.enter.native="search"
						v-model="departName"
					></el-input>
				</div>
				<div class="tree">
					<el-tree
						ref="tree"
						:data="treeData"
						node-key="id"
						default-expand-all
						:props="defaultProps"
						:expand-on-click-node="false"
						:filter-node-method="filterNode"
						check-strictly
						@node-click="handleNodeClick"
					>
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span :class="current.id==data.id?'colorSet':''" class="treeSpan">{{ node.label }}</span>
							<span style="padding-left:5px;">
								<el-button v-show="current.id==data.id" type="text" @click="() => del()">删除</el-button>
							</span>
						</span>
					</el-tree>
				</div>
			</div>
		</div>
		<div class="departRight">
			<div class="back">
				<div class="title">修改部门</div>
				<el-form ref="form" :model="form" label-width="100px" :rules="rules">
					<el-form-item label="机构部门" prop="departName">
						<el-input v-model="form.departName" placeholder="请输入机构/部门名称"></el-input>
					</el-form-item>
					<el-form-item label="上级部门">
						<div @click="chooseP">
							<el-input v-model="form.parentName" placeholder="无" readonly></el-input>
						</div>
					</el-form-item>
					<el-form-item label="机构编码" prop="orgCode">
						<el-input v-model="form.orgCode" placeholder="请输入机构编码" disabled></el-input>
					</el-form-item>
					<el-form-item label="排序">
						<el-input-number
							v-model="form.sortOrder"
							placeholder="请输入排序"
							:min="0"
							v-number-input
							controls-position="right"
						></el-input-number>
					</el-form-item>
					<!-- <el-form-item label="手机号">
            <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.name" placeholder="请输入地址"></el-input>
					</el-form-item>-->
					<el-form-item label="备注" prop="description">
						<el-input v-model="form.description" type="textarea" placeholder="请输入备注" maxlength="200"></el-input>
						<div
							v-if="form.description"
							class="tipPos"
						>当前已输入{{form.description.length}}个字符，您还可以输入{{200-form.description.length}}个字符</div>
					</el-form-item>
					<div style="text-align:center;margin-bottom:10px">
						<el-button icon="el-icon-refresh" @click="reset">重置</el-button>
						<el-button icon="el-icon-edit-outline" class="btnSet" type="primary" @click="edit">修改并保存</el-button>
					</div>
				</el-form>
			</div>
		</div>

		<!-- 新增 -->
		<el-right :title="form1.parentId?'新增子部门':'新增一级部门'" :isShow.sync="isAdd" width="600px" isBorder>
			<el-form ref="form1" :model="form1" label-width="20%" :rules="rules">
				<el-form-item label="机构部门" prop="departName">
					<el-input v-model="form1.departName" placeholder="请输入机构/部门名称"></el-input>
				</el-form-item>
				<el-form-item label="上级部门" v-if="form1.parentId">
					<el-input v-model="form1.parentName" placeholder="无" disabled></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number
						v-model="form1.sortOrder"
						placeholder="请输入排序"
						:min="0"
						v-number-input
						controls-position="right"
					></el-input-number>
				</el-form-item>
				<el-form-item label="备注" prop="description">
					<el-input v-model="form1.description" placeholder="请输入备注" type="textarea" maxlength="200"></el-input>
					<div
						v-if="form1.description"
						class="tipPos"
					>当前已输入{{form1.description.length}}个字符，您还可以输入{{200-form1.description.length}}个字符</div>
				</el-form-item>
				<div style="text-align:center;margin-bottom:10px;">
					<el-button @click="isAdd = false">取消</el-button>
					<el-button type="primary" @click="toAdd">确 定</el-button>
				</div>
			</el-form>
		</el-right>

		<!--导入模板下载  -->
		<el-dialog title="导入" :visible.sync="isImport" width="300px" append-to-body>
			<div style="text-align:center">您可以下载模板，查看导入的格式</div>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<a :href="exportM()" download="部门导入模版.xlsx">
					<el-button type="primary">模板下载</el-button>
				</a>
				<el-upload
					class="upload-file"
					:action="actionUrl"
					:http-request="uploadImg"
					:show-file-list="false"
					:before-upload="beforeAvatarUpload"
					accept=".xlsx, .xls"
				>
					<el-button type="primary">导入</el-button>
				</el-upload>
			</div>
		</el-dialog>

		<!-- 选择上级部门 -->
		<el-right title="选择上级部门" :isShow.sync="isDepart" isBorder>
			<el-tree
				ref="tree1"
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
			<div class="dialog-footer" style="margin:30px 0px;text-align:center;">
				<el-button @click="isDepart = false">取消</el-button>
				<el-button type="primary" @click="sureChoose">确 定</el-button>
			</div>
		</el-right>
	</div>
</template>
<script>
	import elRight from "@/components/rightDialog";
	import { uploadFile } from "@/utils/uploadFile.js";
	export default {
		data() {
			var description = function(rule, value, callback) {
				if (value && value.length > 200) {
					callback(new Error("请输入200字以内的字符"));
				} else {
					callback();
				}
			};
			var departName = function(rule, value, callback) {
				if (value && (value.length < 2 || value.length > 20)) {
					callback(new Error("请输入2-20个字符"));
				} else {
					callback();
				}
			};

			return {
				isAdd: false,
				form: {},
				form1: {},
				current: {},
				departName: "",
				treeData: [],
				rules: {
					departName: [
						{
							required: true,
							message: "请输入机构/部门名称",
							trigger: "blur"
						},
						{ validator: departName, trigger: "blur" }
					],
					orgCode: [
						{
							required: true,
							message: "请输入机构编码",
							trigger: "blur"
						}
					],
					description: [{ validator: description, trigger: "blur" }]
				},
				defaultProps: {
					children: "children",
					label: "departName"
				},
				initListPermission: {},
				isImport: false,
				avatarFile: "",
				fileReader: "",
				actionUrl: window.api.base + "/api/sysDepart/import",
				isDepart: false,
				checkObj: []
			};
		},
		components: { elRight },
		mounted() {
			this.initListPermission = this.$listPermission([
				"sysDepart:update",
				"sysDepart:delete",
				"sysDepart:add"
			]);
			this.resetData();
		},
		methods: {
			resetData() {
				this.$store.dispatch("getDepartTree").then(res => {
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
			},
			filterNode(value, data) {
				return data.departName.indexOf(value) !== -1;
			},
			search() {
				this.$refs.tree.filter(this.departName);
			},
			reset() {
				this.form.departName = "";
				this.form.sortOrder = 0;
				this.form.description = "";
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
						if (this.form.children) {
							delete this.form.children;
						}
						this.$store
							.dispatch("addOrUpdateSysDepart", { body: this.form })
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
				if (!this.current.id) {
					this.$message({
						message: "请先选中一条记录",
						type: "warning"
					});
					return;
				}
				this.form1 = {};
				this.form1.parentId = JSON.parse(JSON.stringify(this.current)).id;
				this.form1.parentName = JSON.parse(
					JSON.stringify(this.current)
				).departName;
				var arr = [];
				if (this.current.children) {
					this.current.children.forEach(item => {
						if (item.sortOrder) {
							arr.push(item.sortOrder);
						}
					});
				}
				var max = 0;
				if (arr.length > 0) {
					max = this.array_max(arr);
				}
				this.$set(this.form1, "sortOrder", max + 1);
				this.isAdd = true;
			},
			addNew() {
				this.form1 = {};
				var arr = [];

				this.treeData.forEach(item => {
					if (item.sortOrder) {
						arr.push(item.sortOrder);
					}
				});
				var max = 0;
				if (arr.length > 0) {
					max = this.array_max(arr);
				}
				this.$set(this.form1, "sortOrder", max + 1);
				this.isAdd = true;
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
			cancel() {
				this.current = {};
				this.form = {};
				this.form.sortOrder = 0;
				this.$refs["form"].clearValidate();
				this.resetData();
			},
			toAdd() {
				this.$refs.form1.validate(valid => {
					if (valid) {
						this.$store
							.dispatch("addOrUpdateSysDepart", { body: this.form1 })
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
							.dispatch("deleteSysDepart", { id: this.current.id })
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
			},
			exportUrl() {
				axios({
					method: "post",
					url: window.api.base + "/api/sysDepart/export",
					responseType: "blob",
					data: {
						sortParams: [
							{
								key: "orgCode",
								order: "ASC"
							}
						]
					}
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
				let fileName = "部门管理.xlsx";
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
			toImport() {
				this.isImport = true;
			},
			exportM() {
				return window.api.base + "/excel/部门导入模版.xlsx";
			},
			beforeAvatarUpload(file) {
				this.avatarFile = file;
			},
			uploadImg(file1) {
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
			chooseP() {
				if (this.form.parentId) {
					this.checkObj = [this.form.parentId];
				} else {
					this.checkObj = [];
				}
				this.isDepart = true;
			},
			checkChange(data, checked, indeterminate) {
				var that = this;
				if (checked) {
					this.checkObj = [data.id];
					this.$refs.tree1.setCheckedKeys([data.id]);
					// setCurrentNode 设置某个节点的当前选中状态,
					this.$refs.tree1.setCurrentNode(data);
				} else {
					if (this.checkObj[0] === data.id) {
						// 点击已选中复选框，保证至少一个选中
						this.$refs.tree1.setCheckedKeys([data.id]);
						this.$refs.tree1.setCurrentNode(data);
					}
				}
				that.$set(that.current, "parentId", data.id);
				that.$set(that.current, "parentName", data.departName);
			},
			nodeChange(item) {
				var that = this;
				this.checkObj = [item.id];
				this.$refs.tree1.setCheckedKeys([item.id]);
				that.$set(that.current, "parentId", item.id);
				that.$set(that.current, "parentName", item.departName);
			},
			sureChoose() {
				this.$set(this.form, "parentId", this.current.parentId);
				this.$set(this.form, "parentName", this.current.parentName);
				this.isDepart = false;
			}
		}
	};
</script>
<style lang='less' scoped>
	.sysDepart {
		overflow: hidden;
		display: flex;
		// align-items: stretch;
		flex-direction: row;
		.back {
			background: #fff;
			padding: 25px 30px;
			height: 100%;
		}
		.departLeft,
		.departRight {
			width: 50%;
			box-sizing: border-box;
			padding-right: 12px;
			font-size: 14px;
		}
		.departLeft {
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
			}
		}
		.departRight {
			.title {
				font-size: 18px;
				padding-bottom: 15px;
			}
		}
		.upload-file {
			display: inline-block;
		}
	}
	.tipPos {
		position: absolute;
		bottom: -20px;
		font-size: 12px;
	}
</style>

