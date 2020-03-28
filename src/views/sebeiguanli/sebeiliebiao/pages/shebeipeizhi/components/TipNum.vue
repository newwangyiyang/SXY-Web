
<script>
export default {
	name: 'TipMsg',
	props: {
		num: Number,
		required: true
	}
};
</script>
<template>
	<div class="tip-msg-wrap flex-center">
		<span class="f-s-12 col-0">{{num}}</span>
	</div>
</template>


<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.tip-msg-wrap {
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: #b40000;
}
</style>