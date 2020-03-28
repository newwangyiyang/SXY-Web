
<script>
import TableHeader from '@/components/TableHeader';
export default {
	name: 'Yonghuxinxibianji',
	components: {
		TableHeader
	},
	data() {
		return {
			bookData: {
				name: ''
			},
			stateOptions: [
				{
					value: '0',
					label: '全部状态'
				},
				{
					value: '1',
					label: '流通中'
				},
				{
					value: '2',
					label: '在馆'
				},
				{
					value: '3',
					label: '破损'
				}
			],
			stateValue: '0',
			imageUrl: '',
			sexOptions: [
				{ value: '0', label: '男' },
				{ value: '1', label: '女' }
			],
			sexValue: '0'
		};
	},
	methods: {
		handleAvatarSuccess(file) {
			this.imageUrl = URL.createObjectURL(file.raw);
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
						<el-input v-model="bookData.name" class="flex1" size="small" placeholder="请输入姓名" />
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">性别:</span>
						<el-select v-model="sexValue" class="flex1" size="small" placeholder="性别">
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
						<el-input v-model="bookData.name" class="flex1" size="small" placeholder="请输入身份证号" />
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">手机号:</span>
						<el-input v-model="bookData.name" class="flex1" size="small" placeholder="请输入手机号" />
					</section>
				</el-col>
				<el-col :span="6">
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">读者卡号:</span>
						<el-input v-model="bookData.name" class="flex1" size="small" placeholder="请输入读者卡号" />
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">用户组:</span>
						<el-select v-model="stateValue" class="flex1" size="small" placeholder="用户组">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">借阅权限:</span>
						<el-select v-model="stateValue" class="flex1" size="small" placeholder="借阅权限">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">读者卡:</span>
						<el-select v-model="stateValue" class="flex1" size="small" placeholder="读者卡">
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
							<img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
				<el-button type="primary" class="w-200 m-l-20">确定</el-button>
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