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

import mixins from '@/utils/mixins-vue';

export default {
	name: 'Tushutongji',
	components: {
		TSTJCard,
		BTCard
	},
	mixins,
	data() {
		return {
			// 馆藏地选择
			activeBookcase: 0,
			// 时间选择
			activeBookcaseDate: 0,
			tableData: [
				{
					date: '2016-05-02',
					name: '100',
					address: '上海市普陀'
				},
				{
					date: '哲学、宗教',
					name: '20',
					address: '90%'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀'
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
			borrowTrendSelecteData: [
				{
					value: '1',
					label: '借出图书数量'
				},
				{
					value: '2',
					label: '归还图书数量'
				}
			],
			borrowTrenSelectedValue: '1'
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
			this.$router.push({ name: 'Tushufenleitongji' });
		},
		goRMJYBD() {
			this.$router.push({ name: 'Remenjieyuebangdan' });
		}
	}
};
</script>
<template>
	<div class="yyzx-wrap">
		<!-- 筛选条件及过滤 -->
		<section v-if="!isDeepRouterView">
			<div class="filter-wrap bg-0 flex-center p-l-20 p-r-20 flex-space-b">
				<div>
					<el-button
						v-for="(item, index) in ['所有馆藏地', '中心馆', '书柜名称', '书柜名称书柜名称名']"
						:key="index"
						:class="{ activeBtn: activeBookcase === index }"
						:type="activeBookcase === index ? 'primary' : 'default'"
						@click="activeBookcaseHandler(index)"
					>{{ item }}</el-button>
				</div>
				<div>
					<span class="f-s-14 col-1 m-r-15">时间选择</span>
					<el-button
						v-for="(item, index) in ['近7天', '近30天', '自定义']"
						:key="index"
						:type="index === activeBookcaseDate ? 'primary' : 'default'"
					>{{item}}</el-button>
				</div>
			</div>
			<div class="m-t-20 p-20 bg-0">
				<!-- 数据统计卡片 -->
				<el-row :gutter="20" type="flex" justify="space-between">
					<el-col>
						<div class="see-all-wrap flex-col p-30">
							<span class="f-s-20 col-0">图书借阅数据</span>
							<div class="flex-center flex-left m-t-20 pointer">
								<span class="f-s-14 col-0">查看全部</span>
								<span class="el-icon-arrow-right col-0" />
							</div>
						</div>
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
					<el-col :span="24">
						<section class="base-container-yyzx bookcase-vs">
							<div class="bookcase-title">
								<span class="f-s-18 col-1">馆藏地数据对比</span>
							</div>
							<div class="m-t-20 flex">
								<div class="bookcase-table m-r-30">
									<el-table
										:cell-style="bookcaseTableStyle"
										:header-cell-style="bookcaseTableHeaderStyle"
										height="360"
										:data="tableData"
										stripe
										style="width: 100%"
									>
										<el-table-column prop="date" label="书柜名称" width="180"></el-table-column>
										<el-table-column prop="name" label="借出（本）"></el-table-column>
										<el-table-column prop="address" label="归还（本）"></el-table-column>
									</el-table>
								</div>
								<div class="bookcase-echarts">
									<ve-histogram
										:data="bookcaseOptions"
										:extend="bookcaseSettings"
										:not-set-unchange="['dataZoom']"
										height="365px"
									></ve-histogram>
								</div>
							</div>
						</section>
					</el-col>
				</el-row>
				<el-row class="m-t-20">
					<el-col :span="24">
						<div class="base-container-yyzx bookcase-vs trend-wrap">
							<div class="borrow-trend-wrap">
								<span class="f-s-18 col-1">借阅趋势</span>
							</div>
							<div class="relative">
								<div class="absolute l-0 t-0" :style="{zIndex: 8}">
									<el-select v-model="borrowTrenSelectedValue" size="small">
										<el-option
											v-for="item in borrowTrendSelecteData"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</div>
								<ve-line height="430px" :data="borrowTrendOptions" :extend="borrowTrendSettings"></ve-line>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="m-t-20">
					<el-col :span="24">
						<section class="base-container-yyzx bookcase-vs">
							<div class="bookcase-title flex flex-space-b">
								<span class="f-s-18 col-1">图书借阅类别</span>
								<div class="pointer" @click="goTSFLTJ">
									<span class="col-8 f-s-14">详细数据</span>
									<span class="el-icon-arrow-right col-8" />
								</div>
							</div>
							<div class="m-t-20 flex">
								<div class="bookcase-table m-r-30">
									<el-table
										:cell-style="bookcaseTableStyle"
										:header-cell-style="bookcaseTableHeaderStyle"
										height="360"
										:data="tableData"
										stripe
										style="width: 100%"
									>
										<el-table-column prop="date" label="图书种类" width="180"></el-table-column>
										<el-table-column prop="name" label="借出（本）"></el-table-column>
										<el-table-column prop="address" label="占比"></el-table-column>
									</el-table>
								</div>
								<div class="bookcase-echarts">
									<ve-pie
										:data="borrowCategoryOptions"
										:extend="borrowCategorySettings"
										:settings="{ offsetY: 200, radius: 170, label: {formatter: '{b}: {d}%'}, roseType: 'radius' }"
										height="365px"
									></ve-pie>
								</div>
							</div>
						</section>
					</el-col>
				</el-row>
				<el-row class="m-t-20">
					<div class="base-container-yyzx borrow-top-wrap">
						<div class="bookcase-title flex flex-space-b">
							<span class="f-s-18 col-1">热门借阅榜单</span>
							<div class="pointer" @click="goRMJYBD">
								<span class="col-8 f-s-14">全部榜单</span>
								<span class="el-icon-arrow-right col-8" />
							</div>
						</div>
						<el-row :gutter="20">
							<el-col v-for="item in 8" :key="item" :span="6">
								<BTCard :index="item" />
							</el-col>
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
		padding: 20px;
		.bookcase-vs-title {
			padding-bottom: 20px;
			@include one-px();
		}
	}
	.bookcase-table {
		width: 40%;
	}
	.bookcase-title {
		position: relative;
		padding-bottom: 20px;
		padding-left: 20px;
		&::before {
			position: absolute;
			left: 0;
			top: 5px;
			width: 10px;
			height: 10px;
			border-radius: 5px;
			background-color: #fbbc0e;
			content: '';
		}
		@include one-px();
	}

	.bookcase-echarts {
		flex: 1;
	}

	.trend-wrap {
		height: 470px;
	}
	.borrow-trend-wrap {
		padding-bottom: 20px;
		padding-left: 20px;
		position: relative;
		@include one-px();
		margin-bottom: 20px;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 5px;
			height: 10px;
			width: 10px;
			border-radius: 5px;
			background-color: #fbbc0e;
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
	.see-all-wrap {
		width: 100%;
		background: url('../../../assets/img/tstj-see.png') no-repeat center / cover;
		height: 170px;
		border-radius: 8px;
	}
}
.echarts {
	width: 100%;
	height: 100%;
}
.filter-wrap {
	height: 80px;
}
</style>
