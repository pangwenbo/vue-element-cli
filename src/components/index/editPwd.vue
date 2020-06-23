<template>
	<el-dialog
		title="修改密码"
		:visible.sync="visibleSync"
		:before-close="f_close"
		width="600px"
		center
		append-to-body
	>
		<el-form
			:model="form"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="当前用户" prop="name">
				<el-input v-model="form.name" autocomplete="off" readonly></el-input>
			</el-form-item>
			<el-form-item label="原密码" prop="oldPwd">
				<el-input type="password" placeholder="请输入原密码" v-model="form.oldPwd" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPwd">
				<el-input type="password" placeholder="请输入新密码" v-model="form.newPwd" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="confirmPwd">
				<el-input placeholder="请再次确认密码" type="password" v-model="form.confirmPwd"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" :loading="subLoading" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import md5 from "js-md5";
	import { mapActions, mapGetters } from "vuex";
	export default {
		props: {
			visibleSync: {
				type: Boolean,
				default: false
			}
		},
		data() {
			var validateOldPwd = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入原密码"));
				} else {
					callback();
				}
			};
			var validateNewPwd = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请输入新密码"));
				} else if (
					value.toString().length < 6 ||
					value.toString().length > 20
				) {
					callback(new Error("密码长度为6 - 20个字符"));
				} else {
					callback();
				}
			};
			var validateConfirmPwd = (rule, value, callback) => {
				if (!value) {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.form.newPwd) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				subLoading: false,
				form: {
					name: "",
					oldPwd: "",
					newPwd: "",
					confirmPwd: ""
				},
				rules: {
					oldPwd: [
						{
							required: true,
							validator: validateOldPwd,
							trigger: "blur"
						}
					],
					newPwd: [
						{
							required: true,
							validator: validateNewPwd,
							trigger: "blur"
						}
					],
					confirmPwd: [
						{
							required: true,
							validator: validateConfirmPwd,
							trigger: "blur"
						}
					]
				}
			};
		},
		computed: {
			...mapGetters(["name"])
		},
		watch: {
			visibleSync() {
				this.form.name = this.name;
			}
		},
		methods: {
			...mapActions(["updateAuthUserPassword"]),
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.subLoading = true;
						let data = {
							oldPassword: md5(this.form.oldPwd),
							newPassword: md5(this.form.newPwd)
						};
						this.updateAuthUserPassword(data)
							.then(res => {
								console.log("修改密码成功", res);
								if (res.body.errorCode == 0) {
									this.$message({
										message: "修改成功",
										type: "success"
									});
								}
								this.subLoading = false;
								this.f_close();
							})
							.catch(err => {
								this.subLoading = false;
								this.editPwdVisible = false;
							});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			f_close() {
				this.$emit("close", "editPwd");
			}
		}
	};
</script>

<style lang="less">
</style>