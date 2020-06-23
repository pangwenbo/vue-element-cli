<template>
	<div class="sysLog mainCon">
		<el-tabs v-model="logType" @tab-click="handleClick">
			<el-tab-pane label="登录日志" name="登录日志"></el-tab-pane>
			<el-tab-pane label="操作日志" name="操作日志"></el-tab-pane>
		</el-tabs>
		<div class="searchArea">
			<el-row>
				<el-col :span="3">
					<div class="sear_flex">
						<div class="sear_inp">
							<el-input v-model="searchForm.logDetail" placeholder="请输入搜索关键词"></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="sear_flex">
						<div class="sear_inp">
							<el-date-picker
								v-model="searchForm.time"
								type="datetimerange"
								value-format="yyyy-MM-dd HH:mm:ss"
								range-separator="至"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
							></el-date-picker>
						</div>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="sear_flex">
						<el-button type="primary" icon="el-icon-search" @click="searForm">查询</el-button>
						<el-button type="primary" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="tables">
			<el-table border :data="tableData" style="width: 100%">
				<el-table-column type="index" align="center"></el-table-column>
				<el-table-column prop="logDetail" label="日志内容"></el-table-column>
				<el-table-column :label="logType=='登录日志'?'用户名':'操作人'" align="center">
					<template slot-scope="scope">
						<div>
							<el-popover placement="right" width="500" trigger="click">
								<div v-if="info.id">
									<div>姓名：{{info.name}}</div>
									<div>性别：{{info.sex_dictText}}</div>
									<div>手机号码：{{info.mobile}}</div>
									<div>所属部门：{{info.sysDepartDto.departName}}</div>
									<div>用户类型：{{info.userRole_dictText}}</div>
								</div>
								<div v-else>暂无用户信息</div>
								<el-button
									type="text"
									slot="reference"
									@click="detail(logType=='登录日志'?scope.row.username:scope.row.userId)"
								>{{scope.row.username}}</el-button>
							</el-popover>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="clientId" label="clientId" align="center"></el-table-column>
				<el-table-column prop="clentIp" :label="logType=='登录日志'?'登录IP':'操作IP'" align="center"></el-table-column>
				<el-table-column prop="createTime" :label="logType=='登录日志'?'登录时间':'操作时间'" align="center"></el-table-column>
				<el-table-column prop="logType" label="日志类型" align="center" v-if="logType=='操作日志'"></el-table-column>
				<el-table-column prop="timeConsuming" label="耗时（毫秒）" align="center"></el-table-column>
				<el-table-column label="日志详情" show-overflow-tooltip>
					<template
						slot-scope="scope"
					>{{scope.row.exceptMessage?scope.row.exceptMessage:scope.row.resultMessage}}</template>
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
	</div>
</template>
<script>
	export default {
		data() {
			return {
				logType: "登录日志",
				searchForm: {
					logDetail: "",
					time: [],
					startTime: "",
					endTime: ""
				},
				loading: true,
				tableData: [],
				pageIndex: 1,
				pageSize: 10,
				currentPage: 1,
				total: 0,
				info: {}
			};
		},
		mounted() {
			this.resetData();
		},
		methods: {
			resetData() {
				if (this.searchForm.time && this.searchForm.time.length > 0) {
					this.searchForm.startTime = this.searchForm.time[0];
					this.searchForm.endTime = this.searchForm.time[1];
				} else {
					this.searchForm.startTime = "";
					this.searchForm.endTime = "";
				}
				var param = {
					queryParams: [
						{
							key: "logType",
							value: this.logType,
							logic: "Contain"
						},
						{
							key: "logDetail",
							value: this.searchForm.logDetail,
							logic: "Contain"
						}
					],
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				};
				if (this.searchForm.startTime != "") {
					var obj = {
						key: "createTime",
						value: this.searchForm.startTime,
						logic: "GreaterThanAndEqual",
						innerLinkMode: "And"
					};
					param.queryParams.push(obj);
				}
				if (this.searchForm.endTime != "") {
					var obj = {
						key: "createTime",
						value: this.searchForm.endTime,
						logic: "LessThanAndEqual",
						innerLinkMode: "And"
					};
					param.queryParams.push(obj);
				}
				this.loading = true;
				this.$store.dispatch("getSyslogPage", { body: param }).then(res => {
					if (res.body.errorCode == 0) {
						this.loading = false;
						this.tableData = res.body.data.content;
						this.total = res.body.data.totalElements;
					}
				});
			},
			handleClick(tab, event) {
				this.currentPage = 1;
				this.pageIndex = 1;
				this.resetData();
			},
			searForm() {
				this.currentPage = 1;
				this.pageIndex = 1;
				this.resetData();
			},
			resetForm() {
				this.currentPage = 1;
				this.pageIndex = 1;
				this.searchForm.logDetail = "";
				this.searchForm.time = [];
				this.searchForm.startTime = "";
				this.searchForm.endTime = "";
				this.resetData();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.resetData();
			},
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.resetData();
			},
			detail(name) {
				this.info = {};
				if (this.logType == "登录日志") {
					this.$store
						.dispatch("getSysUserByUserName", { username: name })
						.then(res => {
							if (res.body.data) {
								this.info = res.body.data;
							} else {
								this.info = {};
							}
						});
				} else {
					this.$store.dispatch("getSysUser", { id: name }).then(res => {
						if (res.body.data) {
							this.info = res.body.data;
						} else {
							this.info = {};
						}
					});
				}
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
		.el-date-editor--datetimerange.el-input__inner {
			width: 100%;
		}
	}
</style>

