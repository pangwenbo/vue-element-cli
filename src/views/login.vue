<template>
	<div class="login">
		<img src="../assets/img/login/login_logo.png" style="position:fixed;left:100px;top:40px" />
		<!-- <vue-particles
			color="#fff"
			:particleOpacity="0.7"
			:particlesNumber="100"
			shapeType="star"
			:particleSize="4"
			linesColor="#fff"
			:linesWidth="2"
			:lineLinked="true"
			:lineOpacity="0.4"
			:linesDistance="150"
			:moveSpeed="10"
			:hoverEffect="true"
			hoverMode="grab"
			:clickEffect="true"
			clickMode="push"
		></vue-particles>-->
		<section class="form_container">
			<el-form
				:model="loginForm"
				:rules="loginRules"
				ref="loginForm"
				class="loginForm"
				label-width="20px"
			>
				<div class="manage_tip">
					<span class="title">用户登录</span>
				</div>
				<el-form-item prop="username" size="medium">
					<el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password" size="medium">
					<el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
				</el-form-item>
				<el-form-item size="medium">
					<div class="tiparea">
						<span @click="f_forgetPassword" style="cursor: pointer;">忘记密码？</span>
					</div>
					<el-button type="primary" @click="f_login()" class="submit_btn">登 录</el-button>
				</el-form-item>
				<!-- <div class="tiparea">
					<p>
						还没有账号？现在
						<router-link to="/register">注册</router-link>
					</p>
				</div>-->
			</el-form>
		</section>
	</div>
</template>

<script>
	import { validUsername } from "@/utils/validate";
	import { mapActions } from "vuex";
	import md5 from "js-md5";
	const validateUsername = (rule, value, callback) => {
		if (value && (value.length < 2 || value.length > 20)) {
			callback(new Error("请输入2-20个字符"));
		} else {
			callback();
		}
	};
	const validatePassword = (rule, value, callback) => {
		if (value.length < 6) {
			callback(new Error("请输入至少六位密码"));
		} else {
			callback();
		}
	};
	export default {
		data() {
			return {
				backgroundColor: localStorage.getItem("tremePackers") || "#409EFF",
				loginForm: {
					username: "",
					password: ""
				},
				loading: false,
				redirect: undefined,
				loginRules: {
					username: [
						{
							required: true,
							trigger: "blur",
							message: "请输入用户名"
						},
						{ validator: validateUsername, trigger: "blur" }
					],
					password: [
						{
							required: true,
							trigger: "blur",
							validator: validatePassword
						}
					]
				}
			};
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect;
				},
				immediate: true
			}
		},
		methods: {
			...mapActions(["login", "getVerificationCode"]),
			//验证码
			async refreshRandomCode() {
				let res = await this.getVerificationCode();
				this.imgsrc = res.data.data;
			},
			//忘记密码
			f_forgetPassword() {
				this.$message("请联系管理员");
			},
			//验证
			f_validLoginForm() {
				this.$refs.loginForm.validate(valid => {
					if (!valid) return false;
					this.f_login;
				});
			},
			//登录
			async f_login() {
				this.loading = true;
				let params = {
					username: this.loginForm.username,
					password: md5(this.loginForm.password)
				};
				let res = await this.login(params);
				if (res.body.errorCode == 0) {
					this.$router.push({
						path: this.redirect ? this.redirect : "/home"
					});
				} else if (res.body.errorCode == 403) {
					// this.refreshRandomCode();
				}
				this.loading = false;
			}
		}
	};
</script>

<style lang="scss">
	.login {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-position: center 0;
		background-size: 100% auto;
		background: url("../assets/img//login/loginbg.png") no-repeat;
	}
	.form_container {
		width: 100%;
		height: 100%;
		/* border-radius: 5px; */
		text-align: center;
	}
	.manage_tip {
		text-align: left;
		margin: 32px 0 18px 20px;
		overflow: hidden;
	}
	.manage_tip .title {
		font-family: "Microsoft YaHei";
		font-size: 18px;
		color: #292c31;
	}
	.loginForm {
		min-width: 400px;
		max-width: 23%;
		position: fixed;
		top: 30%;
		right: 10%;
		background: hsla(0, 100%, 100%, 0.5) border-box;
		padding: 20px 40px 20px 20px;
		border-radius: 5px;
	}

	.submit_btn {
		width: 100%;
	}
	.tiparea {
		text-align: right;
		font-size: 12px;
		color: #333;
		margin: -15px 0 30px;
	}
	.tiparea p a {
		color: #409eff;
	}
	.code {
		margin-top: 10px;
		background: #edeef0;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: space-between;
		justify-content: space-around;
		-moz-box-pack: space-between;
		-webkit--moz-box-pack: space-between;
		box-pack: space-between;
	}
	.el-form-item {
		margin-bottom: 18px !important;
	}
	.el-input__inner {
		border-radius: 0 !important;
	}
	.el-input--medium {
		margin-top: 10px;
	}
	.el-input--medium .el-input__inner {
		height: 44px !important;
		line-height: 44px !important;
	}
	.el-button--medium {
		font-size: 18px !important;
	}
</style>