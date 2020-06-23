<template>
	<el-dialog
		class="edit_userinfo"
		title="个人信息"
		:before-close="f_close"
		:visible.sync="visibleSync"
		width="600px"
		center
		append-to-body
	>
		<el-form
			:model="form"
			status-icon
			:rules="rulesForm"
			ref="editUserForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" autocomplete="off" readonly></el-input>
			</el-form-item>
			<el-form-item label="上传头像">
				<el-upload
					class="avatar-uploader"
					:action="$uploadUrl"
					:http-request="uploadImg"
					:show-file-list="false"
					:before-upload="beforeAvatarUpload"
					accept="image/jpeg, image/gif, image/png, image/bmp"
				>
					<div v-if="form.avatar" class="set_avatar" :style="{backgroundImage: `url(${form.avatar})`}"></div>
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="0">男</el-radio>
					<el-radio label="1">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="出生日期" prop="birthday">
				<el-date-picker
					v-model="form.birthday"
					type="date"
					placeholder="选择日期"
					value-format="yyyy-MM-dd 00:00:00"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input placeholder="请输入手机" v-model="form.mobile"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" :loading="subLoading" @click="submitForm('editUserForm')">提交</el-button>
			<el-button @click="resetForm('editUserForm')">重置</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import { uploadFile } from "@/utils/uploadFile.js"; //上传文件js请求接口
	import { checkPhone, checkEmail } from "@/utils/validate.js";
	export default {
		props: {
			visibleSync: {
				type: Boolean,
				default: false
			}
		},
		data() {
			var checkFormMobile = function(rule, value, callback) {
				if (!value) {
					callback(new Error("请输入手机号码"));
				} else if (!checkPhone(value)) {
					console.log(checkPhone(value));
					callback(new Error("请输入有效的办公电话"));
				} else {
					callback();
				}
			};
			var checkFormEmail = function(rule, value, callback) {
				if (value && !checkEmail(value)) {
					callback(new Error("请输入有效的邮箱"));
				} else {
					callback();
				}
			};
			return {
				form: {
					id: null,
					name: "",
					sex: "0",
					birthday: "",
					mobile: "",
					email: "",
					avatar: ""
					// avatarUrl: ''
				},
				rulesForm: {
					mobile: [
						{
							required: true,
							validator: checkFormMobile,
							trigger: "blur"
						}
					],
					email: [
						{
							required: false,
							validator: checkFormEmail,
							trigger: "blur"
						}
					]
				},
				avatarFile: {},
				subLoading: false
			};
		},
		computed: {
			...mapGetters(["ownInfo"])
		},
		watch: {
			visibleSync() {
				this.form.id = this.ownInfo.id;
				this.form.name = this.ownInfo.name;
				this.form.sex = this.ownInfo.sex;
				this.form.birthday = this.ownInfo.birthday;
				this.form.mobile = this.ownInfo.mobile;
				this.form.email = this.ownInfo.email;
				this.form.avatar = this.ownInfo.avatar;
				// this.form.avatarUrl = this.$previewQiniuFile + this.ownInfo.avatar
			}
		},
		methods: {
			...mapActions([
				"getUploadFileToken",
				"updateSysUser",
				"getSysUserInfo"
			]),
			beforeAvatarUpload(file) {
				this.avatarFile = file;
			},
			uploadImg() {
				console.log("上传文件");
				uploadFile(this.avatarFile)
					.then(res => {
						console.log("成功获取返回参数", res);
						this.form.avatar = res.body.data.fileUrl;
					})
					.catch(err => {
						console.log("失败", err);
					});
			},
			submitForm(formName) {
				console.log("点击修改", formName);
				const vm = this;
				this.$refs[formName].validate(valid => {
					if (valid) {
						console.log("校验成功");
						vm.subLoading = true;
						let data = JSON.parse(JSON.stringify(vm.form));
						data.birthday = data.birthday;
						vm.updateSysUser(data).then(res => {
							this.getSysUserInfo();
							this.$message({
								title: "修改成功",
								type: "success"
							});
							this.subLoading = false;
							this.f_close();
						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.form.id = this.ownInfo.id;
				this.form.name = this.ownInfo.name;
				this.form.sex = this.ownInfo.sex;
				this.form.birthday = this.ownInfo.birthday;
				this.form.mobile = this.ownInfo.mobile;
				this.form.email = this.ownInfo.email;
				this.form.avatar = this.ownInfo.avatar;
			},
			f_close() {
				this.$emit("close", "editUserInfo");
			}
		}
	};
</script>

<style lang="less">
	.edit_userinfo {
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			height: 100px;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409eff;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 100px;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}
		.avatar {
			width: 100px;
			height: 100px;
			display: block;
		}
		.set_avatar {
			width: 100px;
			height: 100px;
			background-position: center center;
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
</style>