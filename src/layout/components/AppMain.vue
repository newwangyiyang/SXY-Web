<script>
export default {
	name: 'AppMain',
	data() {
		return {
			reloadViewAlive: true
		};
	},
	provide() {
		return {
			reload() {
				this.reloadViewAlive = false;
				this.$nextTick(() => {
					this.reloadViewAlive = true;
				});
			}
		};
	},
	computed: {
		key() {
			return this.$route.path;
		}
	}
};
</script>
<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view v-if="reloadViewAlive" :key="key" />
		</transition>
	</section>
</template>

<style scoped>
.app-main {
	/*50 = navbar  */
	min-height: calc(100vh - 120px);
	width: 100%;
	position: relative;
	overflow: hidden;
	background-color: #f5f5f5;
	padding: 20px;
}
.fixed-header + .app-main {
	padding-top: 140px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 15px;
	}
}
</style>
