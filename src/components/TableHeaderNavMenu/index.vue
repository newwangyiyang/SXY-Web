
<script>
export default {
	name: 'TableHeaderNavMenu',
	props: {
		titleArr: {
			type: Array,
			default: () => []
		},
		activeIndex: {
			type: Number,
			default: 0
		},
		isShowExportBtn: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		changeNavHandler(index) {
			this.$emit('update:activeIndex', index);
		}
	}
};
</script>
<template>
	<section class="th-wrap col-1 f-s-18 h-60 flex-center flex-space-b p-r-20">
		<div class="flex-center">
			<div
				v-for="(item, index) in titleArr"
				:key="index"
				:class="['nav-menu p-l-40 p-r-20 pointer', {active: activeIndex === index}]"
				@click="changeNavHandler(index)"
			>
				<span class="col-1 f-s-18">{{item}}</span>
				<slot name="title-msg"></slot>
			</div>
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
	.nav-menu {
		position: relative;
		height: 60px;
		line-height: 60px;
		&.active {
			background-color: #fff;

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
	}
}
</style>