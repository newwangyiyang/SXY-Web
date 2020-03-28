
<script>
export default {
	name: 'TableHeaderCustomeBtn',
	props: {
		title: {
			type: String,
			default: ''
		},
		isShowExportBtn: {
			type: Boolean,
			default: true
		}
	},
	methods: {}
};
</script>
<template>
	<section class="th-wrap col-1 f-s-18 h-60 flex-center flex-space-b p-l-40 p-r-20">
		<div>
			<span class="col-1 f-s-18">{{title}}</span>
			<slot name="title-msg"></slot>
		</div>
		<section v-if="isShowExportBtn">
			<slot name="right-btn"></slot>
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