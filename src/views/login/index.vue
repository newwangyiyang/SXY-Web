<script>
import { validUserPhone } from '@/utils/validate';

export default {
	name: 'Login',
	data() {
		const validateUserPhone = (rule, value, callback) => {
			if (!validUserPhone(value)) {
				callback(new Error('请输入正确的手机号'));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('验证码为6位数字'));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				username: '18888888888',
				password: '111111'
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUserPhone }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }]
			},
			loading: false,
			passwordType: 'password',
			redirect: undefined
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
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = '';
			} else {
				this.passwordType = 'password';
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true;
					this.$store
						.dispatch('user/login', this.loginForm)
						.then(() => {
							this.$router.push({ path: this.redirect || '/yunyingzhongxin' });
							this.loading = false;
						})
						.catch(() => {
							this.loading = false;
						});
				} else {
					return false;
				}
			});
		}
	}
};
</script>
<template>
	<div class="login-container">
		<section class="login-form-wrap flex-center p-30 flex-space-b">
			<section class="login-logo">
				<img src="@/assets/img/login-logo.png" class="w-100p h-100p" alt />
			</section>
			<section>
				<h5 class="col-4 f-s-22 m-0 center">书小驿SaaS后台管理系统</h5>
				<el-form
					ref="loginForm"
					:model="loginForm"
					:rules="loginRules"
					class="login-form"
					auto-complete="on"
					label-position="left"
				>
					<el-form-item prop="username">
						<span class="svg-container el-icon-mobile-phone col-2 f-s-24"></span>
						<el-input
							ref="username"
							v-model="loginForm.username"
							placeholder="Username"
							name="username"
							type="text"
							tabindex="1"
							size="small"
							auto-complete="on"
						/>
					</el-form-item>

					<el-form-item prop="password">
						<span class="svg-container el-icon-chat-dot-square col-2 f-s-24"></span>
						<el-input
							:key="passwordType"
							ref="password"
							v-model="loginForm.password"
							type="text"
							placeholder="Password"
							name="password"
							tabindex="2"
							size="small"
							auto-complete="on"
							@keyup.enter.native="handleLogin"
						/>
						<span class="show-pwd" @click="showPwd">
							<el-button type="text">获取验证码</el-button>
						</span>
					</el-form-item>
					<el-button
						:loading="loading"
						type="warning"
						style="width:100%;margin-bottom:30px;"
						@click.native.prevent="handleLogin"
					>登录</el-button>
				</el-form>
			</section>
		</section>
		<!-- <el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="title-container">
				<h3 class="title">Login Form</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="username"
					v-model="loginForm.username"
					placeholder="Username"
					name="username"
					type="text"
					tabindex="1"
					auto-complete="on"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input
					:key="passwordType"
					ref="password"
					v-model="loginForm.password"
					:type="passwordType"
					placeholder="Password"
					name="password"
					tabindex="2"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
				/>
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>

			<el-button
				:loading="loading"
				type="primary"
				style="width:100%;margin-bottom:30px;"
				@click.native.prevent="handleLogin"
			>Login</el-button>

			<div class="tips">
				<span style="margin-right:20px;">username: admin</span>
				<span>password: any</span>
			</div>
		</el-form>-->
	</div>
</template>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #333;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: $light_gray;
	}
}
</style>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	min-height: 100%;
	width: 100%;
	background: url('../../assets/img/login-bg.png') no-repeat center / cover;
	overflow: hidden;

	.login-form-wrap {
		width: 800px;
		height: 430px;
		background-color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border-radius: 10px;
	}
	.login-logo {
		height: 350px;
	}

	.login-form {
		position: relative;
		width: 320px;
		max-width: 100%;
		padding-top: 40px;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 4px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
