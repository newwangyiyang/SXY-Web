<script>
export default {
	name: 'DSTJCard',
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
			if (this.attr === 'user_sum') {
				return ['用户总量', 'Number of users', '人'];
			} else if (this.attr === 'user_yesterday_add_count') {
				return ['昨日新增', 'New users', '人'];
			} else if (this.attr === 'user_yesterday_active_count') {
				return ['昨日活跃', 'Active users yesterday', '人次'];
			} else {
				return ['状态异常', 'Abnormal state', '人'];
			}
		}
	},
	methods: {
		goTZSJ() {
			this.$router.push({ name: 'Duzheshuju' });
		}
	}
};
</script>
<template>
	<div class="card-wrap">
		<div class="flex flex-center flex-space-b">
			<div class="flex flex-col">
				<span class="f-s-14 col-1">{{ getText[0] }}</span>
				<span class="f-s-12 col-3 m-t-5">{{ getText[1] }}</span>
			</div>
		</div>
		<div class="card-divide"></div>
		<div class="flex flex-bottom flex-space-b">
			<div>
				<span class="col-1 f-s-32 bold">{{ value }}</span>
				<span class="f-s-16 m-l-3">{{ getText[2] }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.card-wrap {
	width: 100%;
	height: 170px;
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
