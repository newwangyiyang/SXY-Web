<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import variables from '@/styles/variables.scss';
import mixins from '@/utils/mixins-vue';
export default {
	components: { Logo },
	mixins,
	computed: {
		...mapGetters(['permission_routes', 'sidebar', 'activeRoutes', 'activePrePath']),
		activeMenuRoutes() {
			if (this.isDeepRouterView) {
				const pathArr = this.$route.fullPath.split('/').filter(Boolean);
				return '/' + pathArr.slice(0, pathArr.length - 1).join('/');
			}
			return this.$route.path;
		},
		showLogo() {
			return this.$store.state.settings.sidebarLogo;
		},
		variables() {
			return variables;
		},
		isCollapse() {
			return !this.sidebar.opened;
		}
	},
	methods: {
		initActiveRoutePrePath(path) {}
	}
};
</script>
<template>
	<div :class="{ 'has-logo': showLogo, 'side-bar-wrap': true }">
		<logo v-if="showLogo" :collapse="isCollapse" />
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:key="$route.fullPath"
				:default-active="activeMenuRoutes"
				:collapse="isCollapse"
				:background-color="variables.menuBg"
				:text-color="'#333'"
				:unique-opened="false"
				:active-text-color="'#333'"
				:collapse-transition="false"
				mode="vertical"
				class="side-menu"
				router
			>
				<el-menu-item
					v-for="item in activeRoutes"
					:key="item.path"
					:index="`${activePrePath}/${item.path}`"
					class="nav-menu-item"
					>{{ item.meta.title }}</el-menu-item
				>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<style lang="scss">
.side-bar-wrap {
	.side-menu {
		text-align: center;
		.nav-menu-item {
			&.is-active {
				background-color: #ededed !important;
			}
		}
	}
}
</style>
