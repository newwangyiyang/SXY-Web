<script>
export default {
	name: 'BTCard'
};
</script>
<template>
	<div class="bt-card-wrap p-20 flex-center flex-left">
		<img class="card-img" src="@/assets/img/list-item.png" alt="" />
		<div class="p-t-5 m-l-20 flex-col h-100p flex1">
			<section class="flex-center flex-space-b">
				<span class="f-s-18 col-4">关键提问</span>
				<span class="card-top-num">07</span>
			</section>
			<section class="flex-center flex-space-b m-t-24">
				<span class="f-s-16 col-2">借阅次数</span>
				<span class="f-s-16 col-2">65次</span>
			</section>
			<section class="flex-center flex-space-b m-t-3">
				<span class="f-s-16 col-2">可借本书</span>
				<span class="f-s-16 col-2">4本</span>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.bt-card-wrap {
	width: 100%;
	height: 140px;
	background-color: #e7e7f3;
	border-radius: 6px;
	margin-top: 20px;
	.card-img {
		height: 100px;
		width: 75px;
		border-radius: 6px;
	}
	.card-top-num {
		display: inline-block;
		height: 30px;
		width: 30px;
		border-radius: 50%;
		background-color: #dce0e6;
		text-align: center;
		line-height: 30px;
		font-style: 16px;
		color: #818e95;
	}
}
</style>
