<script>
import TSTJCard from './components/TSTJCard';
import BTCard from './components/BTCard';
import { settings as bookcaseSettings } from './echarts-options/book-case';
import { settings as borrowTrendSettings } from './echarts-options/borrow-trend';
import { settings as borrowCategorySettings } from './echarts-options/borrow-category';

import {
	getCollectionList,
	bookCount,
	collectionDataList,
	collcetionBorrowLine,
	classifyBorrowRank,
	adminBookBorrowRank
} from '@/api/yunyingzhongxin';

import mixins from '@/utils/mixins-vue';
import dayjs from 'dayjs';

export default {
	name: 'Tushutongji',
	components: {
		TSTJCard,
		BTCard
	},
	mixins,
	data() {
		return {
			// 馆藏地列表
			collectionList: [],
			// 选择的馆藏地id列表
			activeCollections: [],
			// 是否全部选择 activeCollections.length === collectionList.length
			isCollectionsSelectedAll: true,
			// 时间选择
			activeBookcaseDate: 'seven',
			// 选择的时间
			chooseDate: [],

			// 图书借阅数据
			bookCount: {
				borrow_count: 0,
				return_count: 0,
				book_rest_count: 0,
				borrow_abnormal_count: 0
			},
			// 馆藏地数据对比(tableData跟柱状图数据)
			collectionData: [],
			// 馆藏地借阅趋势
			borrowTrenSelectedValue: '0',
			borrowTrendData: [],
			borrowTrendSelecteData: [
				{
					value: '0',
					label: '借出图书数量'
				},
				{
					value: '1',
					label: '归还图书数量'
				}
			],
			// 图书借阅列表
			borrowClassifyData: [],
			// 热门借阅榜单
			hotBorrowRankData: []
		};
	},
	computed: {
		bookcaseOptions() {
			const rows = this.collectionData.map((item) => ({
				书柜: item.name,
				借出图书量: item.borrow_count,
				归还图书量: item.return_count
			}));
			const options = { columns: ['书柜', '借出图书量', '归还图书量'], rows };
			return options;
		},
		bookcaseSettings() {
			return bookcaseSettings;
		},
		borrowTrendOptions() {
			const columns = [
				...new Set(
					['日期'].concat(this.borrowTrendData.map((item, index) => item.name + index))
				)
			];
			const rowItem = this.borrowTrendData.reduce(
				(a, item) => {
					a[item.name] = 0;
					return a;
				},
				{ 日期: '' }
			);
			if (this.borrowTrendData.length > 0) {
				const rowsTemp = this.borrowTrendData[0].list.map((item) => ({
					...rowItem,
					日期: item[0]
				}));
				this.borrowTrendData
					.map((item, index) => {
						item.name = item.name + index;
						return item;
					})
					.forEach((item) => {
						const key = item.name;
						rowsTemp.forEach((v) => {
							const arr = item.list.find((vv) => vv[0] === v['日期']);
							v[key] = arr[1];
						});
					});
				return { columns, rows: rowsTemp };
			}
			return { columns: [], rows: [] };
		},
		borrowTrendSettings() {
			return borrowTrendSettings;
		},
		borrowCategoryOptions() {
			const rows = this.borrowClassifyData.map((item) => ({
				类别: item.name,
				馆藏数据: item.borrow_count
			}));
			return {
				columns: ['类别', '馆藏数据'],
				rows
			};
		},
		borrowCategorySettings() {
			return borrowCategorySettings;
		}
	},
	watch: {
		activeCollections(newList) {
			if (newList.length <= 0) return;
			this.initAllData();
		}
	},
	mounted() {
		this.initCollectionList();

		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 馆藏地列表
		async initCollectionList() {
			const { data } = await getCollectionList();
			this.collectionList = data;
			this.activeCollections = data.map((item) => item.id);
		},

		// 初始化图书借阅数据
		async initBookCount() {
			const { data } = await bookCount({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1],
				collection_ids: this.activeCollections.join(',')
			});
			this.bookCount.borrow_count = data.borrow_count;
			this.bookCount.borrow_abnormal_count = data.borrow_abnormal_count;
			this.bookCount.book_rest_count = data.book_rest_count;
			this.bookCount.return_count = data.return_count;
		},

		// 馆藏地数据对比
		async initCollectionDataList() {
			const { data } = await collectionDataList({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1],
				collection_ids: this.activeCollections.join(',')
			});
			this.collectionData = data;
		},

		// 馆藏地借阅趋势
		async initCollectionTrendData() {
			const { data } = await collcetionBorrowLine({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1],
				status: this.borrowTrenSelectedValue,
				collection_ids: this.activeCollections.join(',')
			});
			this.borrowTrendData = data;
		},
		// 借阅趋势借还书切换
		changeBorrowHandler() {
			this.initCollectionTrendData();
		},

		// 图书借阅类别
		async initClassifyBorrow() {
			const { data } = await classifyBorrowRank({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1],
				collection_ids: this.activeCollections.join(',')
			});
			this.borrowClassifyData = data;
		},

		// 热门借阅榜单
		async initHotBorrowRank() {
			const { data } = await adminBookBorrowRank({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1],
				collection_ids: this.activeCollections.join(',')
			});
			this.hotBorrowRankData = data;
		},

		// 初始化页面所有数据
		initAllData() {
			this.initBookCount();
			this.initCollectionDataList();
			this.initCollectionTrendData();
			this.initClassifyBorrow();
			this.initHotBorrowRank();
		},

		// 日期切换 'seven', 'thirty', 'customer'
		changeDateHandler(type) {
			if (type === this.activeBookcaseDate) return;
			this.activeBookcaseDate = type;
			if (type === 'seven') {
				this.chooseDate = [
					dayjs()
						.subtract(7, 'day')
						.format('YYYY-MM-DD'),
					dayjs().format('YYYY-MM-DD')
				];
			} else if (type === 'thirty') {
				this.chooseDate = [
					dayjs()
						.subtract(30, 'day')
						.format('YYYY-MM-DD'),
					dayjs().format('YYYY-MM-DD')
				];
			}
			this.initAllData();
		},

		// 馆藏地选择切换
		changeCollectionsHandler(id) {
			const index = this.activeCollections.findIndex((item) => item === id);
			if (index !== -1) {
				this.activeCollections.splice(index, 1);
			} else {
				this.activeCollections.push(id);
			}
			this.isCollectionsSelectedAll =
				this.activeCollections.length === this.collectionList.length;
		},
		// 馆藏地全部选择
		changeCollectionsHandlerAll() {
			if (this.activeCollections.length === this.collectionList.length) return;
			this.activeCollections = this.collectionList.map((item) => item.id);
			this.isCollectionsSelectedAll = true;
		},
		// 判断当前馆藏地是否被选择
		isCollectionsSelectedById(id) {
			return this.activeCollections.includes(id);
		},

		goTSFLTJ() {
			this.$router.push({ name: 'Tushufenleitongji' });
		},
		goRMJYBD() {
			this.$router.push({ name: 'Remenjieyuebangdan' });
		},
		goTSJYSJ() {
			this.$router.push({ name: 'Tushujieyueshuju' });
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
						:class="{ activeBtn: isCollectionsSelectedAll }"
						:type="isCollectionsSelectedAll ? 'primary' : 'default'"
						@click="changeCollectionsHandlerAll"
						>所有馆藏地</el-button
					>
					<el-button
						v-for="item in collectionList"
						:key="item.id"
						:class="{ activeBtn: isCollectionsSelectedById(item.id) }"
						:type="isCollectionsSelectedById(item.id) ? 'primary' : 'default'"
						@click="changeCollectionsHandler(item.id)"
						>{{ item.name }}</el-button
					>
				</div>
				<div>
					<span class="f-s-14 col-1 m-r-15">时间选择</span>
					<el-button
						:type="activeBookcaseDate === 'seven' ? 'primary' : 'default'"
						@click="changeDateHandler('seven')"
						>近7天</el-button
					>
					<el-button
						:type="activeBookcaseDate === 'thirty' ? 'primary' : 'default'"
						@click="changeDateHandler('thirty')"
						>近30天</el-button
					>
					<el-button
						:type="activeBookcaseDate === 'customer' ? 'primary' : 'default'"
						@click="changeDateHandler('customer')"
						>自定义</el-button
					>
				</div>
			</div>
			<div class="m-t-20 p-20 bg-0">
				<!-- 数据统计卡片 -->
				<el-row :gutter="20" type="flex" justify="space-between">
					<el-col>
						<div class="see-all-wrap flex-col p-30">
							<span class="f-s-20 col-0">图书借阅数据</span>
							<div class="flex-center flex-left m-t-20 pointer" @click="goTSJYSJ">
								<span class="f-s-14 col-0">查看全部</span>
								<span class="el-icon-arrow-right col-0" />
							</div>
						</div>
					</el-col>
					<el-col v-for="(value, key) in bookCount" :key="key">
						<TSTJCard :attr="key" :value="value" />
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
										:data="collectionData"
										stripe
										style="width: 100%"
									>
										<el-table-column
											prop="name"
											label="书柜名称"
											width="180"
										></el-table-column>
										<el-table-column
											prop="borrow_count"
											label="借出（本）"
										></el-table-column>
										<el-table-column
											prop="return_count"
											label="归还（本）"
										></el-table-column>
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
								<div class="absolute l-0 t-0" :style="{ zIndex: 8 }">
									<el-select
										v-model="borrowTrenSelectedValue"
										size="small"
										@change="changeBorrowHandler"
									>
										<el-option
											v-for="item in borrowTrendSelecteData"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</div>
								<ve-line
									height="430px"
									:data="borrowTrendOptions"
									:extend="borrowTrendSettings"
								></ve-line>
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
										:data="borrowClassifyData"
										stripe
										style="width: 100%"
									>
										<el-table-column
											prop="name"
											label="图书种类"
											width="180"
										></el-table-column>
										<el-table-column
											prop="borrow_count"
											label="借出（本）"
										></el-table-column>
										<el-table-column prop="pre" label="占比"></el-table-column>
									</el-table>
								</div>
								<div class="bookcase-echarts">
									<ve-pie
										:data="borrowCategoryOptions"
										:extend="borrowCategorySettings"
										:settings="{
											offsetY: 200,
											radius: 160,
											label: { formatter: '{b}: {d}%' },
											roseType: 'radius'
										}"
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
							<el-col
								v-for="(item, index) in hotBorrowRankData"
								:key="item.coverimg"
								:span="6"
							>
								<BTCard :index="index + 1" :item="item" />
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
