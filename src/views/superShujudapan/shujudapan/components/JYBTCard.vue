<script>
export default {
	name: 'JYBTCard',
	props: {
		index: {
			type: Number,
			required: true
		},
		item: {
			type: Object,
			required: true
		}
	}
};
</script>
<template>
	<div class="bt-card-wrap p-20 flex-center flex-left pointer">
		<img
			class="card-img"
			:src="
				item.avatar || 'http://pic1.zhimg.com/50/v2-af12f7b6f7eb2f2f5f7e2f3b7880cf01_hd.jpg'
			"
			alt
		/>
		<div class="p-t-5 m-l-20 flex-col h-100p flex1">
			<section class="flex-center flex-space-b">
				<span class="f-s-16 col-4">{{ item.name }}</span>
				<div>
					<img v-if="index === 1" src="@/assets/img/bd1.png" class="w-24 h-21" />
					<img v-else-if="index === 2" src="@/assets/img/bd2.png" class="w-24 h-21" />
					<img v-else-if="index === 3" src="@/assets/img/bd3.png" class="w-24 h-21" />
					<div v-else class="bd-wrap flex-center">
						<div class="bd-circel flex-center">
							<span class="f-s-12 col-9">{{ index }}</span>
						</div>
					</div>
				</div>
			</section>
			<section class="flex-center flex-space-b m-t-20">
				<span class="f-s-14 col-2">累计借阅</span>
				<span class="f-s-14 col-2">{{ item.borrow_count }}次</span>
			</section>
			<section class="flex-center flex-space-b m-t-6">
				<span class="f-s-14 col-2">正在借阅</span>
				<span class="f-s-14 col-2">{{ item.borrow_count_now }}本</span>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.bt-card-wrap {
	width: 100%;
	height: 140px;
	background-color: #fcf9fc;
	border-radius: 6px;
	margin-top: 20px;
	.card-img {
		height: 75px;
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
	.bd-wrap {
		height: 20px;
		width: 20px;
		border-radius: 12px;
		border: 1px solid #ccc;
		.bd-circel {
			height: 16px;
			width: 16px;
			border-radius: 9px;
			border: 1px solid #ccc;
		}
	}
}
</style>
