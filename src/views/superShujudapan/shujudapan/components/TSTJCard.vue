<script>
export default {
	name: 'TSTJCard',
	methods: {
		goTSJYSJ() {
			this.$router.push({ name: 'Tushujieyueshuju' });
		}
	}
};
</script>
<template>
	<div class="card-wrap">
		<div class="flex flex-center flex-space-b">
			<div class="flex flex-col">
				<span class="f-s-14 col-1">借出图书</span>
				<span class="f-s-12 col-3 m-t-10">BORROW BOOK</span>
			</div>
		</div>
		<div class="card-divide"></div>
		<div class="flex flex-bottom flex-space-b">
			<div>
				<span class="col-1 f-s-32 bold">121</span>
				<span class="f-s-16 m-l-3">本</span>
			</div>
			<div class="flex-center pointer" @click="goTSJYSJ">
				<span class="f-s-14 col-8">详细</span>
				<span class="el-icon-arrow-right col-8" />
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
	border-radius: 8px;
	border: 1px solid #ccc;
	padding: 20px;
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
