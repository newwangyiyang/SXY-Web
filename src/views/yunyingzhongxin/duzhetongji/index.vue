<script>
import mixins from '@/utils/mixins-vue';
import DSTJCard from './components/DSTJCard';
import JYBTCard from './components/JYBTCard';
import {
	option as borrowCategoryOptions,
	settings as borrowCategorySettings
} from './echarts-options/borrow-category';
export default {
	name: 'Duzhetongji',
	components: {
		DSTJCard,
		JYBTCard
	},
	mixins,
	data() {
		return {
			borrowCategoryTableData: [
				{
					type: '教育类',
					bNum: '29',
					percent: '29'
				},
				{
					type: '教育类',
					bNum: '29',
					percent: '29'
				},
				{
					type: '教育类',
					bNum: '29',
					percent: '29'
				},
				{
					type: '教育类',
					bNum: '29',
					percent: '29'
				},
				{
					type: '教育类',
					bNum: '29',
					percent: '29'
				},
				{
					type: '教育类',
					bNum: '29',
					percent: '29'
				}
			]
		};
	},
	computed: {
		borrowCategoryOptions() {
			return borrowCategoryOptions;
		},
		borrowCategorySettings() {
			return borrowCategorySettings;
		}
	},
	methods: {
		goJYDRBD() {
			this.$router.push({ name: 'Jieyuedarenbangdan' });
		}
	}
};
</script>
<template>
	<div class="dztj-wrap">
		<section v-if="!isDeepRouterView">
			<el-row :gutter="20">
				<el-col :span="6">
					<DSTJCard />
				</el-col>
				<el-col :span="6">
					<DSTJCard />
				</el-col>
				<el-col :span="6">
					<DSTJCard />
				</el-col>
				<el-col :span="6">
					<DSTJCard />
				</el-col>
			</el-row>
			<el-row class="m-t-20">
				<el-col :span="24">
					<div class="base-container-yyzx p-20">
						<el-row :gutter="20" type="flex" justify="space-between">
							<el-col :span="12">
								<div class="relative">
									<div class="flex-center flex-left">
										<p class="f-s-20 col-4">用户数据</p>
										<div class="m-l-300">
											<span class="f-s-12 col-1 m-r-20">时间选择</span>
											<el-button size="small">近7天</el-button>
											<el-button size="small">近30天</el-button>
											<el-button size="small">自定义</el-button>
										</div>
									</div>
									<ve-pie
										:data="borrowCategoryOptions"
										:extend="borrowCategorySettings"
										:settings="{ offsetY: 230, radius: 150 }"
										height="400px"
									></ve-pie>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="borrow-category-table">
									<p class="f-s-18 col-2 table-tit flex-center flex-space-b">
										<span>用户数据</span>
									</p>
									<el-table
										class="bookcase-table"
										height="380"
										:data="borrowCategoryTableData"
										style="width: 100%"
										:header-cell-style="{
											fontSize: 14,
											color: '#818E95',
											fontWeight: 'normal'
										}"
									>
										<el-table-column
											prop="type"
											label="用户部门"
											width="180"
										></el-table-column>
										<el-table-column
											prop="bNum"
											label="今日活跃（人）"
											width="180"
										></el-table-column>
										<el-table-column
											prop="percent"
											label="活跃占比（%）"
										></el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<el-row class="m-t-20">
				<div class="base-container-yyzx borrow-top-wrap">
					<div class="flex-center flex-space-b borrow-top-tit">
						<span class="f-s-20 col-2">借阅达人榜</span>
						<div class="pointer" @click="goJYDRBD">
							<span class="f-s-18 col-2">全部榜单</span>
							<span class="el-icon-arrow-right f-s-18" />
						</div>
					</div>
					<el-row :gutter="20">
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
						<el-col :span="6"><JYBTCard /></el-col>
					</el-row>
				</div>
			</el-row>
		</section>
		<router-view v-else />
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.dztj-wrap {
	background-color: #fff;
	padding: 20px;
	.borrow-category-table {
		position: relative;
		&::before {
			content: '';
			height: 400px;
			width: 1px;
			background-color: #aeaeae;
			position: absolute;
			left: -70px;
			top: 50%;
			transform: translateY(-50%);
		}
		.table-tit {
			@include one-px();
			padding-bottom: 20px;
		}
	}
	.borrow-top-wrap {
		padding: 20px;
		.borrow-top-tit {
			padding-bottom: 20px;
			@include one-px();
		}
	}
}
</style>
