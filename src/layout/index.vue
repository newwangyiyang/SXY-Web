<script>
import { Navbar, Sidebar, AppMain } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import Breadcrumb from '../components/Breadcrumb';

export default {
	name: 'Layout',
	components: {
		Navbar,
		Sidebar,
		AppMain,
		Breadcrumb
	},
	mixins: [ResizeMixin],
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar;
		},
		device() {
			return this.$store.state.app.device;
		},
		fixedHeader() {
			return this.$store.state.settings.fixedHeader;
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation,
				mobile: this.device === 'mobile'
			};
		}
	},
	methods: {
		handleClickOutside() {
			this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
		}
	}
};
</script>
<template>
	<!-- eslint-disable-next-line vue/no-duplicate-attributes -->
	<div :class="classObj" class="app-wrapper">
		<div
			v-if="device === 'mobile' && sidebar.opened"
			class="drawer-bg"
			@click="handleClickOutside"
		/>
		<sidebar class="sidebar-container" />
		<div class="main-container">
			<div :class="{ 'fixed-header': fixedHeader }">
				<navbar />
				<div class="w-100p h-40 l-h-40 p-l-10 p-r-20 flex-space-b bg-0">
					<breadcrumb />
					<span class="f-s-12 col-1">客服电话 400-036-8086</span>
				</div>
			</div>

			<app-main />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
@import '~@/styles/mixins.scss';
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$sideBarWidth});
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}

.mobile .fixed-header {
	width: 100%;
}
</style>
