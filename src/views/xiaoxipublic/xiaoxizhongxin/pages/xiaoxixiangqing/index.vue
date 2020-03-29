<script>
export default {
	name: 'Xiaoxixiangqing',
	data() {
		return {
			richText:
				'<p style="color: teal; font-size: 14px; text-align: center; margin: 0">this is richText</p>'
		};
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<template>
	<div class="relative">
		<span class="el-icon-back absolute l-0 t-0 f-s-20 pointer" @click="goBack"></span>
		<section v-html="richText" />
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
</style>
