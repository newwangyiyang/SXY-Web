
<script>
export default {
	name: 'TableHeader',
	props: {
		title: {
			type: String,
			default: ''
		},
		handlerExportSelected: {
			type: Function,
			default: () => {}
		},
		handlerExportAll: {
			type: Function,
			default: () => {}
		},
		isShowExportBtn: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		exportSelected() {
			this.$emit('handlerExportSelected');
		},
		exportAll() {
			this.$emit('handlerExportAll');
		}
	}
};
</script>
<template>
	<section class="th-wrap col-1 f-s-18 h-60 flex-center flex-space-b p-l-40 p-r-20">
		<span class="col-1 f-s-18">{{title}}</span>
		<section v-if="isShowExportBtn">
			<el-button plain type="info" size="small" @click="exportSelected">
				<span class="iconfont icondaochu1 m-r-5"></span>
				导出当前
			</el-button>
			<el-button plain type="info" size="small" @click="exportAll">
				<span class="iconfont icondaochu m-r-5"></span>
				导出全部
			</el-button>
		</section>
	</section>
</template>


<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.th-wrap {
	background-color: #eef0f0;
	position: relative;
	&::before {
		content: '';
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		height: 10px;
		width: 10px;
		border-radius: 5px;
		background-color: #fbbc0e;
	}
}
</style>