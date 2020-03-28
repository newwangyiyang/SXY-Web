
<script>
import TableHeader from '@/components/TableHeader';
export default {
	name: 'Zhanghaoshezhi',
	components: {
		TableHeader
	},
	data() {
		return {
			yuanPass: '',
			nowPass: '',
			confirmPass: ''
		};
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<template>
	<div class="zhsz-wrap">
		<div class="content-wrap main-wrap">
			<TableHeader title="账号设置" :isShowExportBtn="false" />
			<div class="flex-center flex-space-a p-20">
				<div class="flex-center">
					<span class="input-title col-1 f-s-14">原密码:</span>
					<el-input v-model="yuanPass" class="flex1" size="small" placeholder="请输入设备名称" />
				</div>
				<div class="flex-center">
					<span class="input-title col-1 f-s-14">新密码:</span>
					<el-input v-model="nowPass" class="flex1" size="small" placeholder="请输入设备名称" />
				</div>
				<div class="flex-center">
					<span class="input-title col-1 f-s-14">确认密码:</span>
					<el-input v-model="confirmPass" class="flex1" size="small" placeholder="请输入设备名称" />
				</div>
			</div>
			<div class="h-100 flex-center">
				<el-button type="default" size="small" @click="goBack">取消</el-button>
				<el-button class="w-200" type="primary" size="small">确定</el-button>
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