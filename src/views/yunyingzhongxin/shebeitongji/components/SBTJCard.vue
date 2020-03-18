<script>
export default {
	name: 'SBTJCard',
	methods: {
		goSGSYTJ() {
			this.$router.push({ name: 'Shuguishiyongtongji' });
		}
	}
};
</script>
<template>
	<div class="card-wrap">
		<div class="flex flex-center flex-space-b">
			<div class="flex flex-col">
				<span class="f-s-14 col-2">书柜总量</span>
				<span class="f-s-12 col-3 m-t-5">BORROW BOOK</span>
			</div>
			<img class="h-34 w-34" src="@/assets/img/zong-icon.png" alt />
		</div>
		<div class="flex flex-center flex-space-b">
			<div class="flex-center">
				<span class="col-4 f-s-32 bold">121</span>
				<span class="f-s-18 m-l-5">台</span>
			</div>
			<div class="flex-center pointer" @click="goSGSYTJ">
				<span class="f-s-13 col-1">详细</span>
				<span class="el-icon-arrow-right" />
			</div>
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
}
</style>
