<template>
	<div style="display:inline-block">
		<span class="username">
			<el-dropdown>
				<div class="el-dropdown-link user_name">
					<span class="name" v-if="ownInfo.name">
						<div
							class="user_img"
							v-if="ownInfo.avatar"
							:style="{backgroundImage: `url(${ownInfo.avatar})`}"
						></div>
						{{ownInfo.name}}
					</span>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="f_open('editUserInfo')">
						<i class="el-icon-user"></i>个人信息
					</el-dropdown-item>
					<el-dropdown-item @click.native="f_open('editPwd')">
						<i class="el-icon-setting"></i>修改密码
					</el-dropdown-item>
					<el-dropdown-item @click.native="f_logout">
						<i class="el-icon-setting"></i>退出登录
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</span>
		<editUserInfo :visibleSync="flag.editUserInfo" @close="f_close" />
		<editPwd :visibleSync="flag.editPwd" @close="f_close" />
	</div>
</template>

<script>
	import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
	import editUserInfo from "./editUserInfo.vue";
	import editPwd from "./editPwd.vue";
	export default {
		name: "head-nav",
		props: {
			headflag: {
				type: Boolean,
				default: false
			}
		},
		components: {
			editUserInfo,
			editPwd
		},
		data() {
			return {
				flag: {
					editPwd: false,
					editUserInfo: false
				}
			};
		},
		computed: {
			...mapState({
				ownInfo: state => state.common.ownInfo
			})
		},
		methods: {
			...mapActions(["loginOut"]),
			...mapMutations(["clearOwnInfo"]),
			f_open(key) {
				this.flag[key] = true;
			},
			f_close(key) {
				this.flag[key] = false;
			},
			f_logout() {
				this.$confirm("真的要注销登录吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.loginOut().then(res => {
							localStorage.removeItem("token"); //清除token和session
							this.clearOwnInfo();
							this.$router.push("/login");
						});
					})
					.catch(() => {
						console.log("取消退出登录");
					});
			}
		}
	};
</script>

<style  lang="less" scoped>
	.user_name {
		cursor: pointer;
		color: #fff;
		.user_img {
			width: 30px;
			height: 30px;
			border-radius: 30px;
			background: #fff;
			display: inline-block;
			vertical-align: middle;
			background-position: center center;
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
</style>