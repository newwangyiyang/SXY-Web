<script>
import { mapGetters } from 'vuex';
// import Breadcrumb from '@/components/Breadcrumb';
// import Hamburger from '@/components/Hamburger';
import variables from '@/styles/variables.scss';
import { navRoutes, publicNavRoutes } from '@/router';

const whiteRoutePath = ['/xiaoxipublic'];

export default {
	components: {
		// Breadcrumb
		// Hamburger
	},
	inheritAttrs: true,
	computed: {
		...mapGetters(['sidebar', 'avatar', 'roles']),
		variables() {
			return variables;
		},
		isCollapse() {
			return !this.sidebar.opened;
		},
		navRoutes() {
			return navRoutes.filter(
				(route) => route.meta && route.meta.roles.some((role) => this.roles.includes(role))
			);
		},
		activeMenu() {
			const path = '/' + this.$route.path.split('/')[1];
			let route = { children: [] };
			if (whiteRoutePath.includes(path)) {
				route = publicNavRoutes.find((item) => item.path) || {};
			} else {
				route = this.navRoutes.find((item) => item.path === path) || {};
			}
			this.initActiveRoutes(route);
			return path;
		}
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar');
		},
		async logout() {
			await this.$store.dispatch('user/logout');
			this.$router.push(`/login?redirect=${this.$route.fullPath}`);
		},
		selectHandler(key) {
			this.$router.push(`${key}/index`);
			const route = this.navRoutes.find((item) => key.startsWith(item.path));
			this.initActiveRoutes(route);
		},
		initActiveRoutes(route) {
			this.$store.commit('routes/INIT_ACTIVE_ROUTES', route.children);
			this.$store.commit('routes/INIT_ACTIVE_PRE_PATH', route.path);
		},
		goPubRoute(path) {
			const route = publicNavRoutes.find((item) => item.path === path);
			this.initActiveRoutes(route);
			this.$router.push(path);
		}
	}
};
</script>
<template>
	<div class="navbar">
		<!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
		<!-- <breadcrumb class="breadcrumb-container" /> -->
		<div>
			<el-menu
				class="nav-menu"
				:default-active="activeMenu"
				:collapse="isCollapse"
				:background-color="variables.navMenuBg"
				:text-color="variables.navMenuText"
				:unique-opened="false"
				:active-text-color="variables.navMenuActiveText"
				:collapse-transition="false"
				@select="selectHandler"
			>
				<el-menu-item
					v-for="item in navRoutes"
					:key="item.path"
					:index="item.path"
					class="nav-menu-item"
				>{{ item.meta.title }}</el-menu-item>
			</el-menu>
		</div>

		<div class="right-menu h-100p flex">
			<div class="flex-center">
				<span class="el-icon-office-building col-0 f-s-20"></span>
				<span class="col-0 f-s-14 m-l-10">雁塔区教育局</span>
			</div>
			<div class="flex-center m-l-20 m-r-40 pointer" @click="goPubRoute('/xiaoxipublic')">
				<span class="el-icon-bell col-0 f-s-20"></span>
				<span class="col-0 f-s-14 m-l-10">消息</span>
			</div>
			<el-dropdown class="avatar-container pointer">
				<div class="avatar-wrapper h-80 flex-center">
					<img :src="avatar + '?imageView2/1/w/80/h/80'" class="w-30 h-30 brs15" />
					<span class="col-0 f-s-14 m-l-8">书小二</span>
				</div>
				<!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
				<el-dropdown-menu slot="dropdown" class="user-dropdown">
					<router-link to="/">
						<el-dropdown-item class="flex-center">
							<span class="el-icon-s-tools f-s-20"></span>
							<span class="col-2 f-s-14 m-l-5">设置</span>
						</el-dropdown-item>
					</router-link>
					<el-dropdown-item class="flex-center inline-block" divided @click.native="logout">
						<span class="el-icon-receiving f-s-20"></span>
						<span class="col-2 f-s-14 m-l-5">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
.navbar {
	height: 80px;
	overflow: hidden;
	position: relative;
	background: #5490ef;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	display: flex;
	justify-content: space-between;
	align-items: center;

	::v-deep .el-menu {
		border-right: 0;
	}

	.nav-menu {
		display: flex;
		.nav-menu-item {
			height: 80px;
			line-height: 80px;
			&.is-active {
				background-color: #6da4ff !important;
			}
		}
	}

	.hamburger-container {
		line-height: 80px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;

			.avatar-wrapper {
				position: relative;

				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
