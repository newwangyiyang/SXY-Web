<script>
import TableHeader from '@/components/TableHeader';
import { changePassword } from '@/api/xitongpeizhi';
export default {
	name: 'Zhanghaoshezhi',
	components: {
		TableHeader
	},
	data() {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		let validateYuanPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入原密码'));
			} else {
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				yuanPass: '',
				pass: '',
				checkPass: ''
			},
			rules: {
				yuanPass: [{ validator: validateYuanPass, trigger: 'blur' }],
				pass: [{ validator: validatePass, trigger: 'blur' }],
				checkPass: [{ validator: validatePass2, trigger: 'blur' }]
			}
		};
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		// 修改密码
		changePasswordHandler() {
			this.$refs.ruleForm.validate(async (valid) => {
				if (valid) {
					const res = await changePassword({
						old_password: this.ruleForm.yuanPass,
						new_password: this.ruleForm.pass
					});
					if (res.errcode === 0) {
						this.$message({ type: 'success', message: '成功修改密码！' });
					}
				} else {
					return false;
				}
			});
		}
	}
};
</script>
<template>
	<div class="zhsz-wrap">
		<div class="content-wrap main-wrap">
			<TableHeader title="账号设置" :isShowExportBtn="false" />
			<div class="flex-center flex-left p-20">
				<el-form
					ref="ruleForm"
					:model="ruleForm"
					label-width="100px"
					:rules="rules"
					class="flex"
				>
					<el-form-item prop="yuanPass" label="原密码: ">
						<el-input
							v-model="ruleForm.yuanPass"
							class="flex1"
							size="small"
							auto-complete="off"
							placeholder="请输入原密码"
						/>
					</el-form-item>
					<el-form-item prop="pass" label="新密码:">
						<el-input
							v-model="ruleForm.pass"
							class="flex1"
							size="small"
							auto-complete="off"
							placeholder="请输入新密码"
						/>
					</el-form-item>
					<el-form-item prop="checkPass" label="确认密码:">
						<el-input
							v-model="ruleForm.checkPass"
							class="flex1"
							size="small"
							placeholder="请输入确认密码"
							@keyup.enter.native="changePasswordHandler"
						/>
					</el-form-item>
				</el-form>
			</div>
			<div class="h-100 flex-center">
				<el-button type="default" size="small" @click="goBack">取消</el-button>
				<el-button class="w-200" type="primary" size="small" @click="changePasswordHandler"
					>确定</el-button
				>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.zhsz-wrap {
	padding: 20px;
	background-color: #fff;
	.main-wrap {
		min-height: 700px;
	}
}
</style>
