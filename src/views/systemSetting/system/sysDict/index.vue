<template>
	<div class="sysDict mainCon">
		<div class="toolbar" ref="toolbarHeight">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="searchForm.dictName" placeholder="请输入字典名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.dictCode" placeholder="请输入字典编号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="searForm">查询</el-button>
					<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-plus"
						@click="toAdd('新增')"
						v-if="initListPermission.add"
					>新增</el-button>
					<el-button type="primary" icon="el-icon-download" v-has="'role:export'">导出</el-button>
					<el-button type="primary">
						<span class="iconfont iconziyuan1"></span>
						<span class="icon" style="padding-left:5px">导入</span>
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tables">
			<el-table border :data="tableData" style="width: 100%" :height="tableHeight">
				<el-table-column type="index" align="center"></el-table-column>
				<el-table-column prop="dictName" label="字典名称" align="center"></el-table-column>
				<el-table-column prop="dictCode" label="字典编号" align="center"></el-table-column>
				<el-table-column prop="description" label="描述" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="230">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="toAdd('修改',scope.row)" v-if="initListPermission.update">
								<span class="el-icon-edit"></span>
								修改
							</el-button>
							<el-button type="text" @click="toPei(scope.row)">
								<span class="el-icon-setting"></span>
								字典配置
							</el-button>
							<el-button type="text" @click="toDel(scope.row)" v-if="initListPermission.delete">删除</el-button>
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
		<!-- 添加/编辑弹窗 -->
		<el-right :title="title" :isShow.sync="addOrEdit" width="600px" isBorder>
			<el-form ref="form" :model="currentRow" label-width="100px" :rules="rules">
				<el-form-item label="字典名称：" prop="dictName">
					<el-input v-model="currentRow.dictName" placeholder="请输入字典名称"></el-input>
				</el-form-item>
				<el-form-item label="字典编码：" prop="dictCode">
					<el-input v-model="currentRow.dictCode" placeholder="请输入字典编码"></el-input>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input
						v-model="currentRow.description"
						placeholder="请输入字典描述"
						maxlength="200"
						type="textarea"
					></el-input>
					<div
						v-if="currentRow.description"
						class="tipPos"
					>当前已输入{{currentRow.description.length}}个字符，您还可以输入{{200-currentRow.description.length}}个字符</div>
				</el-form-item>
				<div style="text-align:center;margin-bottom:10px;">
					<el-button @click="addOrEdit=false">取消</el-button>
					<el-button type="primary" @click="toSure">确定</el-button>
				</div>
			</el-form>
		</el-right>
		<el-right title="字典列表" width="600px" :isShow.sync="isShow">
			<el-row>
				<el-col :span="8">
					<div class="sear_flex">
						<label for>名称：</label>
						<div class="sear_inp">
							<el-input v-model="searchForm2.itemText" placeholder="请输入名称"></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="16">
					<div class="sear_flex">
						<el-button type="primary" icon="el-icon-search" @click="searForm2">搜索</el-button>
						<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm2">重置</el-button>
					</div>
				</el-col>
				<el-button type="primary" icon="el-icon-plus" @click="toAdd2('新增')">新增</el-button>
			</el-row>
			<el-table border :data="tableData2" v-loading="loading2" style="width: 100%;margin-top:20px;">
				<el-table-column prop="itemText" label="名称" align="center"></el-table-column>
				<el-table-column prop="itemValue" label="数据值" align="center"></el-table-column>
				<el-table-column prop="sortOrder" label="排序" align="center"></el-table-column>
				<el-table-column prop="description" label="描述" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="120">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="toAdd2('修改',scope.row)">
								<span class="el-icon-edit"></span>
								修改
							</el-button>
							<el-button type="text" @click="toDel2(scope.row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages" v-if="total2>0">
				<el-pagination
					@size-change="handleSizeChange2"
					@current-change="handleCurrentChange2"
					background
					:current-page.sync="currentPage2"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="10"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total2"
				></el-pagination>
			</div>
		</el-right>

		<!-- 添加字典列表 -->
		<el-dialog
			:title="title2"
			:visible.sync="addOrEdit2"
			v-if="addOrEdit2"
			align="center"
			append-to-body
		>
			<el-form ref="form2" :model="currentRow2" label-width="120px" :rules="rules2">
				<el-form-item label="字典项名称：" prop="itemText">
					<el-input v-model="currentRow2.itemText" placeholder="请输入字典项名称"></el-input>
				</el-form-item>
				<el-form-item label="字典项值：" prop="itemValue">
					<el-input v-model="currentRow2.itemValue" placeholder="请输入字典项值"></el-input>
				</el-form-item>
				<el-form-item label="排序：" prop="sortOrder" style="text-align:left;">
					<el-input-number
						v-model="currentRow2.sortOrder"
						placeholder="请输入排序"
						:min="0"
						v-number-input
						controls-position="right"
					></el-input-number>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input
						v-model="currentRow2.description"
						placeholder="请输入字典项描述"
						maxlength="200"
						type="textarea"
					></el-input>
					<div
						v-if="currentRow2.description"
						class="tipPos"
					>当前已输入{{currentRow2.description.length}}个字符，您还可以输入{{200-currentRow2.description.length}}个字符</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<el-button @click="addOrEdit2=false">取消</el-button>
				<el-button type="primary" @click="toSure2">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import elRight from "@/components/rightDialog";
	import { mapGetters } from "vuex";
	export default {
		data() {
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
				searchForm: {
					dictName: "",
					dictCode: ""
				},
				searchForm2: {
					pageSize: 10,
					pageIndex: 1,
					itemText: ""
				},
				currentPage2: 1,
				loading: false,
				loading2: false,
				tableData: [],
				tableData2: [],
				total2: 0,
				rules: {
					dictName: [
						{
							required: true,
							message: "请输入字典名称",
							trigger: "blur"
						},
						{ validator: name, trigger: "blur" }
					],
					dictCode: [
						{
							required: true,
							message: "请输入字典编码",
							trigger: "blur"
						}
					]
				},
				rules2: {
					itemText: [
						{
							required: true,
							message: "请输入字典项名称",
							trigger: "blur"
						},
						{ validator: name, trigger: "blur" }
					],
					itemValue: [
						{
							required: true,
							message: "请输入字典项值",
							trigger: "blur"
						}
					],
					sortOrder: [
						{ required: true, message: "请输入排序", trigger: "blur" }
					]
				},
				title: "",
				title2: "",
				addOrEdit: false,
				addOrEdit2: false,
				currentRow: {},
				currentRow2: {},
				isShow: false,
				initListPermission: {}
			};
		},
		components: { elRight },
		mounted() {
			this.initListPermission = this.$listPermission([
				"dict:update",
				"dict:delete",
				"dict:add"
			]);
			this.$nextTick(() => {
				this.f_getTableHeight(); //获取表格高度
				window.onresize = () => {
					//事件会在窗口或框架被调整大小时发生
					this.f_getTableHeight();
				};
			});
			this.resetData();
		},
		beforeRouteLeave(to, from, next) {
			//组件销毁时销毁onresize方法
			window.onresize = null;
			next();
		},
		computed: {
			...mapGetters(["titleHeight"])
		},
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
				var that = this;
				that.loading = true;
				var param = {
					queryParams: [
						{
							key: "dictName",
							value: this.searchForm.dictName,
							logic: "Contain"
						},
						{
							key: "dictCode",
							value: this.searchForm.dictCode,
							logic: "Contain"
						}
					],
					pageIndex: this.paginations.pageNum,
					pageSize: this.paginations.pageSize
				};
				this.$store.dispatch("getDictPage", { body: param }).then(res => {
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
			searForm() {
				this.resetData();
			},
			resetForm() {
				this.searchForm.dictName = "";
				this.searchForm.dictCode = "";
				this.searchForm.pageSize = 0;
				this.resetData();
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
			toAdd(t, row) {
				this.title = t;
				if (row) {
					this.currentRow = JSON.parse(JSON.stringify(row));
				} else {
					this.currentRow = {};
				}
				this.addOrEdit = true;
			},
			toSure() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.$store
							.dispatch("addOrUpdateDict", { body: this.currentRow })
							.then(res => {
								if (res.body.errorCode == 0) {
									if (this.currentRow.id) {
										this.resetData();
										this.$message({
											message: "字典修改成功",
											type: "success"
										});
									} else {
										this.resetForm();
										this.$message({
											message: "字典添加成功",
											type: "success"
										});
									}
									this.addOrEdit = false;
								}
							});
					}
				});
			},
			searForm2() {
				this.currentPage2 = 1;
				this.searchForm2.pageIndex = 1;
				this.resetDict();
			},
			resetForm2() {
				this.currentPage2 = 1;
				this.searchForm2.itemText = "";
				this.searchForm2.pageSize = 0;
				this.resetDict();
			},
			resetDict() {
				this.loading2 = true;
				var param = {
					queryParams: [
						{
							key: "dictId",
							value: this.currentRow.id,
							logic: "Equal",
							innerLinkMode: "And"
						},
						{
							key: "itemText",
							value: this.searchForm2.itemText,
							logic: "Contain"
						}
					],
					sortParams: [
						{
							key: "sortOrder",
							order: "ASC"
						}
					],
					pageIndex: this.searchForm2.pageIndex,
					pageSize: this.searchForm2.pageSize
				};
				this.$store
					.dispatch("getDictItemPage", { body: param })
					.then(res => {
						if (res.body.errorCode == 0) {
							this.loading2 = false;
							this.tableData2 = res.body.data.content;
							this.total2 = res.body.data.totalElements;
						}
					});
			},
			handleSizeChange2(val) {
				this.searchForm2.pageSize = val;
				this.resetDict();
			},
			handleCurrentChange2(val) {
				this.searchForm2.pageIndex = val;
				this.resetDict();
			},
			toPei(row) {
				this.currentRow = JSON.parse(JSON.stringify(row));
				this.tableData2 = [];
				this.total2 = 0;
				this.searchForm2.itemText = "";
				this.resetDict();
				this.isShow = true;
			},
			toAdd2(t, row) {
				this.title2 = t;
				if (row) {
					this.currentRow2 = JSON.parse(JSON.stringify(row));
				} else {
					this.currentRow2 = {
						sortOrder: 0
					};
				}
				this.addOrEdit2 = true;
			},
			toDel(row) {
				this.currentRow = JSON.parse(JSON.stringify(row));
				this.$confirm("确定要删除该字典？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.$store
							.dispatch("deleteDict", { id: this.currentRow.id })
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
			},
			toSure2() {
				this.$refs.form2.validate(valid => {
					if (valid) {
						this.currentRow2.dictId = this.currentRow.id;
						this.$store
							.dispatch("addOrUpdateDictItem", {
								body: this.currentRow2
							})
							.then(res => {
								if (res.body.errorCode == 0) {
									if (this.currentRow2.id) {
										this.resetDict();
										this.$message({
											message: "修改成功",
											type: "success"
										});
									} else {
										this.resetDict();
										this.$message({
											message: "字典项添加成功",
											type: "success"
										});
									}
									this.addOrEdit2 = false;
								}
							});
					}
				});
			},
			toDel2(row) {
				this.currentRow2 = JSON.parse(JSON.stringify(row));
				this.$confirm("确定要删除该字典项？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.$store
							.dispatch("deleteDictItem", { id: this.currentRow2.id })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.resetDict();
								}
							});
					})
					.catch(() => {});
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
	.tipPos {
		position: absolute;
		bottom: -20px;
		font-size: 12px;
	}
</style>

