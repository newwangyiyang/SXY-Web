<script>
export default {
	name: 'TSTJCard',
	props: ['attr', 'value'],
	computed: {
		getText() {
			let resArr = [];
			if (this.attr === 'borrow_count') {
				resArr = ['借出图书', 'BORROW BOOK', '本'];
			} else if (this.attr === 'return_count') {
				resArr = ['归还图书', 'RETURN BOOKS', '本'];
			} else if (this.attr === 'book_rest_count') {
				resArr = ['图书余量', 'BOOK COLLECTION', '本'];
			} else {
				resArr = ['异常借阅', 'ABNORMAL BORROWING', '条'];
			}
			return resArr;
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
