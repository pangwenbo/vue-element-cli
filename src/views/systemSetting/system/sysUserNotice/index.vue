<template>
	<div class="user_notice">
		<div class="search_container">
			<el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
				<el-form-item prop="title">
					<el-input v-model="searchform.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item prop="senderName">
					<el-input v-model="searchform.senderName" placeholder="请输入发布人"></el-input>
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
					<el-button type="primary" @click="markRead">全部标注已读</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list_box">
			<el-table v-loading="tableLoading" ref="roleTable" :data="tableData" border style="width: 100%">
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="title" show-overflow-tooltip label="标题"></el-table-column>
				<el-table-column prop="msgCategory_dictText" label="消息类型" width="100" align="center"></el-table-column>
				<el-table-column prop="senderName" label="发布人" width="100" align="center"></el-table-column>
				<el-table-column prop="sendTime" label="发布时间" width="160" align="center"></el-table-column>
				<el-table-column prop="read_dictText" label="阅读状态" width="100" align="center"></el-table-column>
				<el-table-column label="操作" width="60" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
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
		<notice-detail
			:checkDetailDialog="checkDetailDialog"
			:noticeDetail="itemDteail"
			@closeDrawer="closeNoticeDrawer"
			@updateMyNotice="updateMyNotice"
		></notice-detail>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import noticeDetail from "@/components/noticeDetail";
	export default {
		data() {
			return {
				searchform: {
					title: "",
					senderName: ""
				},
				pageIndex: 0,
				pageSize: 10,
				tableData: [],
				listTotal: 0,
				tableLoading: false,
				pageSizeArray: [10, 20, 30, 40, 50],
				checkDetailDialog: false,
				itemDteail: {}
			};
		},
		components: {
			noticeDetail
		},
		mounted() {
			this.userNoticeData();
		},
		methods: {
			...mapActions(["getSysAnnounceReadInfoPage", "readAll"]),
			userNoticeData() {
				//获取分页数据
				let params = {
					title: this.searchform.title,
					senderName: this.searchform.senderName,
					pageIndex:
						this.pageIndex !== 0 ? this.pageIndex - 1 : this.pageIndex,
					pageSize: this.pageSize
				};
				this.tableLoading = true;
				this.getSysAnnounceReadInfoPage(params).then(res => {
					this.tableData = res.body.data.content;
					this.listTotal = res.body.data.totalElements;
					this.tableLoading = false;
				});
			},
			onSearch() {
				//查询
				this.pageIndex = 0;
				this.userNoticeData();
			},
			resetSearchForm(formName) {
				this.$refs[formName].resetFields();
				this.pageIndex = 0;
				this.userNoticeData();
			},
			markRead() {
				//全部标为已读
				this.readAll()
					.then(res => {
						if (res.body.errorCode == 0) {
							this.$message({
								title: "成功",
								message: `设置成功`,
								type: "success"
							});
							this.userNoticeData();
						}
					})
					.catch(err => {
						this.$message({
							title: "失败",
							message: `设置失败`,
							type: "error"
						});
					});
			},
			checkDetail(row) {
				//查看详情
				this.itemDteail = row;
				this.checkDetailDialog = true;
			},
			updateMyNotice() {
				this.userNoticeData();
			},
			closeNoticeDrawer() {
				this.checkDetailDialog = false;
			},
			handleSizeChange(val) {
				//table每页个数控制
				this.pageSize = val;
				this.userNoticeData();
			},
			handleCurrentChange(val) {
				//table切换页码
				this.pageIndex = val;
				this.userNoticeData();
			}
		}
	};
</script>

<style lang="less" scope>
	.user_notice {
		background: #fff;
		padding: 20px;
		.action_button {
			margin-bottom: 12px;
		}
		.list_box {
			.el-button {
				padding: 0;
			}
		}
	}
</style>