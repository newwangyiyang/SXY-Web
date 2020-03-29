
<script>
import TableHeader from '@/components/TableHeader';
import { getDeptList, updateUser } from '@/api/yonghuguanli';
export default {
	name: 'Yonghuxinxibianji',
	components: {
		TableHeader
	},
	data() {
		return {
			// 查询用户信息
			userData: {},
			// 表单提交
			userForm: {
				name: '',
				avatar: '',
				mobile: '',
				dept_id: '',
				card_status: '',
				gender: '',
				card_number: '',
				borrow_count: '', // 借阅数量
				borrow_period: '', // 借阅时长
				uid: ''
			},
			// 用户组列表
			deptList: [],
			stateOptions: [
				{
					value: 0,
					label: '全部状态'
				},
				{
					value: 1,
					label: '未发放'
				},
				{
					value: 2,
					label: '挂失'
				},
				{
					value: 3,
					label: '解挂'
				}
			],
			sexOptions: [
				{ value: 0, label: '未知' },
				{ value: 1, label: '男' },
				{ value: 3, label: '女' }
			]
		};
	},
	async mounted() {
		await this.initDeptList();
		this.userData = { ...this.$store.getters.activeUserForUpdate };
		this.userForm.name = this.userData.name;
		this.userForm.card_number = this.userData.card_number;
		this.userForm.gender = this.userData.gender;
		this.userForm.card_status = this.userData.card_status;
		this.userForm.dept_id = this.userData.dept_id;
		this.userForm.idno = this.userData.idno;
		this.userForm.mobile = this.userData.mobile;
		this.userForm.idno = this.userData.idno;
		this.userForm.avatar = this.userData.avatar;
		this.userForm.uid = this.userData.uid;
		await this.changeDeptHandler();
	},
	methods: {
		// 初始化用户组数据
		async initDeptList() {
			const { data } = await getDeptList();
			this.deptList = data;
		},
		// 编辑用户
		updateUser() {
			this.$confirm('此操作将修改该用户信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await updateUser(this.userForm);
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
					// 返回用户列表
					this.goBack();
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
		},
		// 用户组切换
		changeDeptHandler() {
			if (this.deptList) {
				this.deptList.forEach((v) => {
					if ((v.dept_id = this.userForm.dept_id)) {
						this.userForm.borrow_count = v.borrow_count;
						this.userForm.borrow_period = v.borrow_period;
					}
				});
			}
		},
		handleAvatarSuccess(file) {
			this.userForm.avatar = URL.createObjectURL(file.raw);
		},
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<template>
	<div class="tsxxbj-wrap">
		<div class="content-wrap main-wrap">
			<TableHeader title="用户信息编辑" :isShowExportBtn="false" />
			<el-row :gutter="100" class="p-l-20 p-r-20">
				<el-col :span="6">
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">
							姓名
							<i class="f-s-16">*</i>
							:
						</span>
						<el-input v-model="userForm.name" class="flex1" size="small" placeholder="请输入姓名" />
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">性别:</span>
						<el-select v-model="userForm.gender" class="flex1" size="small" placeholder="性别">
							<el-option
								v-for="item in sexOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">身份证号:</span>
						<el-input v-model="userForm.idno" class="flex1" size="small" placeholder="请输入身份证号" />
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">手机号:</span>
						<el-input v-model="userForm.mobile" class="flex1" size="small" placeholder="请输入手机号" />
					</section>
				</el-col>
				<el-col :span="6">
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">读者卡号:</span>
						<el-input v-model="userForm.card_number" class="flex1" size="small" placeholder="请输入读者卡号" />
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">用户组:</span>
						<el-select
							v-model="userForm.dept_id"
							class="flex1"
							size="small"
							placeholder="用户组"
							@change="changeDeptHandler"
						>
							<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">借阅权限:</span>
						<el-input
							:value="`${userForm.borrow_count?userForm.borrow_count:0}本/${userForm.borrow_period?userForm.borrow_period:0}天`"
							class="flex1"
							size="small"
							:disabled="true"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">读者卡:</span>
						<el-select v-model="userForm.card_status" class="flex1" size="small" placeholder="读者卡">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</section>
				</el-col>
				<el-col :span="6">
					<section class="upload-wrap m-t-20">
						<span class="input-title col-1 f-s-14">用户头像:</span>
						<el-upload
							class="avatar-uploader relative"
							action="https://jsonplaceholder.typicode.com/posts/"
							:auto-upload="false"
							:show-file-list="false"
							:on-change="handleAvatarSuccess"
						>
							<img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
							<div v-else class="avatar-uploader-icon flex-center">
								<i class="el-icon-plus f-s-24 col-2"></i>
							</div>

							<div class="upload-msg-tip f-s-12 col-8 flex-col absolute">
								<span>点击上传读者照片</span>
								<span>大小不超过200kb</span>
							</div>
						</el-upload>
					</section>
				</el-col>
			</el-row>
			<section class="h-100 flex-center">
				<el-button type="default" @click="goBack">取消</el-button>
				<el-button type="primary" class="w-200 m-l-20" @click="updateUser">确定</el-button>
			</section>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.tsxxbj-wrap {
	background-color: #fff;

	.input-title {
		width: 80px;
		margin-right: 20px;
		text-align: right;
		&.textarea-title {
			margin-right: 30px;
		}
	}
	.upload-wrap {
		display: flex;
	}
	.avatar-uploader {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		.avatar-uploader-icon {
			border: 1px dashed #d9d9d9;
			border-radius: 60px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			width: 120px;
			height: 120px;
			&:hover {
				border-color: #409eff;
			}
		}
		.avatar {
			width: 120px;
			height: 120px;
			border-radius: 60px;
			display: block;
		}
		.upload-msg-tip {
			bottom: -40px;
			left: 15px;
		}
	}
}
</style>