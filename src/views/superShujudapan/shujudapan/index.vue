
<script>
import { option } from './echarts-options/graph';
import {
	option as bookcaseOptions,
	settings as bookcaseSettings
} from './echarts-options/book-case';
import {
	option as borrowCategoryOptions,
	settings as borrowCategorySettings
} from './echarts-options/borrow-category';
import mixins from '../../../utils/mixins-vue';
import TSTJCard from './components/TSTJCard';
import BTCard from './components/BTCard';
export default {
	name: 'Shujudapan',
	components: { TSTJCard, BTCard },
	mixins,
	data() {
		return {
			isShowGraphEchats: true,
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
			]
		};
	},
	computed: {
		graphOption() {
			return option;
		},
		bookcaseOptions() {
			return bookcaseOptions;
		},
		bookcaseSettings() {
			return bookcaseSettings;
		},
		borrowCategoryOptions() {
			return borrowCategoryOptions;
		},
		borrowCategorySettings() {
			return borrowCategorySettings;
		}
	},
	methods: {
		changeIsShowGraphEcharts() {
			this.isShowGraphEchats = !this.isShowGraphEchats;
		},
		graphEchartsClickHandler(e) {
			console.log(e);
		}
	}
};
</script>
<template>
	<div class="sjdp-wrap">
		<div class="filter-wrap bg-0 flex-center p-l-20 p-r-20 flex-space-b">
			<div>
				<el-button type="default" @click="changeIsShowGraphEcharts">
					<span>总馆数据大盘</span>
					<span :class="isShowGraphEchats ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></span>
				</el-button>
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
		<section v-if="isShowGraphEchats" class="p-20 bg-0">
			<div class="w-600">
				<ve-tree :events="{click: graphEchartsClickHandler}" :extend="graphOption" height="300px" />
			</div>
		</section>
		<section class="p-20 m-t-20 bg-0">
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
				<el-col v-for="item in 4" :key="item">
					<TSTJCard />
				</el-col>
			</el-row>
			<el-row :gutter="20" class="m-t-20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap flex-col p-30">
						<span class="f-s-20 col-0">读者数据</span>
						<div class="flex-center flex-left m-t-20 pointer">
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="item in 4" :key="item">
					<TSTJCard />
				</el-col>
			</el-row>
			<el-row :gutter="20" class="m-t-20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap flex-col p-30">
						<span class="f-s-20 col-0">书柜使用</span>
						<div class="flex-center flex-left m-t-20 pointer">
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="item in 4" :key="item">
					<TSTJCard />
				</el-col>
			</el-row>
		</section>
		<section class="p-l-20 p-r-20 bg-0">
			<el-row :gutter="20">
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
		</section>
		<section class="p-20 bg-0">
			<el-row :gutter="20">
				<el-col :span="24">
					<section class="base-container-yyzx bookcase-vs">
						<div class="bookcase-title flex flex-space-b">
							<span class="f-s-18 col-1">图书借阅类别</span>
							<div class="pointer">
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
		</section>
		<section class="p-l-20 p-r-20 bg-0">
			<el-row>
				<div class="base-container-yyzx borrow-top-wrap">
					<div class="bookcase-title flex flex-space-b">
						<span class="f-s-18 col-1">热门借阅榜单</span>
						<div class="pointer">
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
		</section>
		<section class="p-20 bg-0">
			<el-row>
				<div class="base-container-yyzx borrow-top-wrap">
					<div class="bookcase-title flex flex-space-b">
						<span class="f-s-18 col-1">借阅达人榜</span>
						<div class="pointer">
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
		</section>
	</div>
</template>


<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.sjdp-wrap {
	.filter-wrap {
		height: 80px;
	}

	.see-all-wrap {
		width: 100%;
		background: url('../../../assets/img/tstj-see.png') no-repeat center / cover;
		height: 170px;
		border-radius: 8px;
	}

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
</style>