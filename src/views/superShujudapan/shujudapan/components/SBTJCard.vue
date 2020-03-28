<script>
export default {
	name: 'SBTJCard',

	props: {
		attr: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	},
	computed: {
		getText() {
			if (this.attr === 'device_count') {
				return ['设备总量', 'Total equipment', '台'];
			} else if (this.attr === 'device_count_day') {
				return ['累计运行天数', 'Accumulated running days', '天'];
			} else if (this.attr === 'device_count_login') {
				return ['书柜访问量', 'Device access', '次'];
			} else {
				return ['设备异常', 'Abnormal state', '次'];
			}
		}
	},
	methods: {
		goShebeiyichang() {
			this.$router.push({ name: 'SuperShebeiyichang' });
		}
	}
};
</script>
<template>
	<div class="card-wrap">
		<div class="flex flex-center flex-space-b">
			<div class="flex flex-col">
				<span class="f-s-14 col-1">{{ getText[0] }}</span>
				<span class="f-s-12 col-3 m-t-10">{{ getText[1] }}</span>
			</div>
		</div>
		<div class="card-divide"></div>
		<div class="flex flex-bottom flex-space-b">
			<div>
				<span class="col-1 f-s-32 bold">{{ value }}</span>
				<span class="f-s-16 m-l-3">{{ getText[2] }}</span>
			</div>
			<!-- <div class="flex-center pointer" @click="goSGSYTJ">
				<span class="f-s-14 col-8">详细</span>
				<span class="el-icon-arrow-right col-8" />
			</div> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.card-wrap {
	width: 100%;
	height: 172px;
	background-color: #fff;
	border-radius: 10px;
	border: 1px solid #ccc;
	padding: 20px 12px 20px 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.card-divide {
		height: 1px;
		width: 20px;
		background-color: #b0b0b0;
	}
}
</style>
