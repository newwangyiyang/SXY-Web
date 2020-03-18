<script>
import TSTJCard from './components/TSTJCard';
import BTCard from './components/BTCard';
import {
	option as bookcaseOptions,
	settings as bookcaseSettings
} from './echarts-options/book-case';
import {
	option as borrowTrendOptions,
	settings as borrowTrendSettings
} from './echarts-options/borrow-trend';
import {
	option as borrowCategoryOptions,
	settings as borrowCategorySettings
} from './echarts-options/borrow-category';

import mixins from '@/utils/mixins-vue'

export default {
	name: 'Tushutongji',
	components: {
		TSTJCard,
		BTCard
	},
	mixins,
	data() {
		return {
			activeBookcase: 0,
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			],
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
			],
			borrowTrenSelectedValue: '借出图书数量'
		};
	},
	computed: {
		bookcaseOptions() {
			return bookcaseOptions;
		},
		bookcaseSettings() {
			return bookcaseSettings;
		},
		borrowTrendOptions() {
			return borrowTrendOptions;
		},
		borrowTrendSettings() {
			return borrowTrendSettings;
		},
		borrowCategoryOptions() {
			return borrowCategoryOptions;
		},
		borrowCategorySettings() {
			return borrowCategorySettings;
		}
	},
	methods: {
		activeBookcaseHandler(index) {
			if (index === this.activeBookcase) return;
			this.activeBookcase = index;
		},
		goTSFLTJ() {
			this.$router.push({name: 'Tushufenleitongji'});
		},
		goRMJYBD() {
			this.$router.push({name: 'Remenjieyuebangdan'});
		}
	},
};
</script>
<template>
	<div class="yyzx-wrap">
		<!-- 筛选条件及过滤 -->
		<section v-if="!isDeepRouterView">
			<div class="filter-wrap bg-0 flex-center p-l-20 p-r-20 flex-space-b">
				<div>
					<el-button
						v-for="(item, index) in ['所有书柜', '01书柜', '02书柜']"
						:key="index"
						:class="{ activeBtn: activeBookcase === index }"
						size="small"
						@click="activeBookcaseHandler(index)"
						>{{ item }}</el-button
					>
				</div>
				<div>
					<span class="f-s-14 col-1 m-r-20">时间选择</span>
					<el-button size="small">近7天</el-button>
					<el-button size="small">近30天</el-button>
					<el-button size="small">自定义</el-button>
				</div>
			</div>
			<div class="m-t-20 p-20 bg-0">
				<!-- 数据统计卡片 -->
				<el-row :gutter="20" type="flex" justify="space-between">
					<el-col>
						<TSTJCard />
					</el-col>
					<el-col>
						<TSTJCard />
					</el-col>
					<el-col>
						<TSTJCard />
					</el-col>
					<el-col>
						<TSTJCard />
					</el-col>
					<el-col>
						<TSTJCard />
					</el-col>
				</el-row>
				<el-row :gutter="20" class="m-t-20">
					<el-col :span="12">
						<div class="base-container-yyzx bookcase-vs">
							<div class="bookcase-vs-title">
								<span class="f-s-18 col-2">各书柜数据对比</span>
							</div>
							<el-table
								class="bookcase-table"
								height="360"
								:data="tableData"
								style="width: 100%"
							>
								<el-table-column
									prop="date"
									label="书柜名称"
									width="180"
								></el-table-column>
								<el-table-column
									prop="name"
									label="借出图书（本）"
									width="180"
								></el-table-column>
								<el-table-column
									prop="address"
									label="归还图书（本）"
								></el-table-column>
							</el-table>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="base-container-yyzx bookcase-vs">
							<ve-histogram
								:data="bookcaseOptions"
								:extend="bookcaseSettings"
								:not-set-unchange="['dataZoom']"
								height="415px"
							></ve-histogram>
						</div>
					</el-col>
				</el-row>
				<el-row class="m-t-20">
					<el-col :span="24">
						<div class="base-container-yyzx bookcase-vs">
							<div class="absolute l-30 p-l-20 t-20 borrow-trend-wrap">
								<span class="f-s-22 col-4 m-r-20">借阅趋势</span>
								<el-select v-model="borrowTrenSelectedValue" size="small">
									<el-option
										v-for="item in ['借出图书数量', '归还图书数量']"
										:key="item"
										:label="item"
										:value="item"
									>
									</el-option>
								</el-select>
							</div>
							<ve-line
								height="460px"
								:data="borrowTrendOptions"
								:extend="borrowTrendSettings"
							></ve-line>
						</div>
					</el-col>
				</el-row>
				<el-row class="m-t-20">
					<el-col :span="24">
						<div class="base-container-yyzx borrow-category-wrap">
							<el-row :gutter="20" type="flex" justify="space-between">
								<el-col :span="12">
									<div>
										<ve-pie
											:data="borrowCategoryOptions"
											:extend="borrowCategorySettings"
											:settings="{ offsetY: 250, radius: 150 }"
											height="460px"
										></ve-pie>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="borrow-category-table">
										<p class="f-s-18 col-2 table-tit flex-center flex-space-b">
											<span>图书种类对比</span>
											<section class="flex-center pointer" @click="goTSFLTJ">
												<span class="f-s-18 col-2">详细</span>
												<span class="el-icon-arrow-right" />
											</section>
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
												label="图书种类"
												width="180"
											></el-table-column>
											<el-table-column
												prop="bNum"
												label="今日借出（本）"
												width="180"
											></el-table-column>
											<el-table-column
												prop="percent"
												label="图书占比（%）"
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
							<span class="f-s-20 col-2">热门借阅榜单</span>
							<div class="pointer" @click="goRMJYBD">
								<span class="f-s-18 col-2">全部榜单</span>
								<span class="el-icon-arrow-right f-s-18" />
							</div>
						</div>
						<el-row :gutter="20">
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
							<el-col :span="6"><BTCard /></el-col>
						</el-row>
					</div>
				</el-row>
			</div>
		</section>
		<router-view v-else></router-view>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
@import '~@/styles/mixin.scss';
.yyzx-wrap {
	.bookcase-vs {
		height: 438px;
		padding: 20px;
		.bookcase-vs-title {
			padding-bottom: 20px;
			@include one-px();
		}
	}
	.bookcase-table {
		font-size: 14px;
		color: #818e95;
	}
	.borrow-trend-wrap {
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 8px;
			width: 8px;
			background-color: #f4c71f;
		}
	}
	.borrow-category-wrap {
		height: 500px;
		padding: 20px;
	}
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
.echarts {
	width: 100%;
	height: 100%;
}
.filter-wrap {
	height: 90px;
	.activeBtn {
		background-color: #e8e8e8;
	}
}
</style>
