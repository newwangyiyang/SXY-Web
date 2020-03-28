<script>
import { option as treeOption, settings as treeSettings } from './echarts-options/graph';
import { settings as bookcaseSettings } from './echarts-options/book-case';
import { settings as borrowCategorySettings } from './echarts-options/borrow-category';
import mixins from '../../../utils/mixins-vue';
import TSTJCard from './components/TSTJCard';
import DSTJCard from './components/DSTJCard';
import SBTJCard from './components/SBTJCard';
import BTCard from './components/BTCard';
import JYBTCard from './components/JYBTCard';

import {
	getAllOrg,
	zongpanCount,
	zongpanAllOrgCount,
	zongPanClassifyBorrowRank,
	zongPanBookBorrowRank,
	zongPanUserborrowRank
} from '@/api/shujudapan';
let count = 1;
export default {
	name: 'Shujudapan',
	components: { TSTJCard, BTCard, DSTJCard, SBTJCard, JYBTCard },
	mixins,
	data() {
		return {
			// 开始日期结束日期
			chooseDate: [],
			// 7天或30天按钮
			chooseSevenOrThirty: 'seven',
			// 选择的机构
			chooseJiGouIds: [],
			// 图书借阅、数据大盘
			tushujieyue: {
				borrow_count: 0,
				return_count: 0,
				book_rest_count: 0,
				borrow_count_abnormal: 0
			},
			// 读者借阅、数据大盘
			duzhejieyue: {
				user_count: 0,
				user_count_add: 0,
				user_count_active: 0,
				user_count_abnormal: 0
			},
			// 设备使用统计、数据大盘
			shebeishiyong: {
				device_count: 0,
				device_count_day: 0,
				device_count_login: 0,
				device_count_abnormal: 0
			},
			// 总盘数据对比
			zongpanVsData: [],
			// 总盘数据类别
			zongpanClassifyData: [],
			// 热门借阅榜单
			hotBorrowRankData: [],
			// 借阅达人榜单
			userBorrowRankData: [],
			// 树状图数据
			treeData: [],

			isShowGraphEchats: true,
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
		treeOption() {
			return treeOption(this.treeData);
		},
		treeSettings() {
			return treeSettings;
		},
		bookcaseOptions() {
			const rows = this.zongpanVsData.map((item) => ({
				组织名称: item.org_name,
				借出图书量: item.borrow_count,
				归还图书量: item.return_count
			}));
			const options = { columns: ['组织名称', '借出图书量', '归还图书量'], rows };
			return options;
		},
		bookcaseSettings() {
			return bookcaseSettings;
		},
		borrowCategoryOptions() {
			const rows = this.zongpanClassifyData.map((item) => ({
				类别: item.name,
				借出数据: item.borrow_count
			}));
			return {
				columns: ['类别', '借出数据'],
				rows
			};
		},
		borrowCategorySettings() {
			return borrowCategorySettings;
		}
	},
	watch: {
		chooseDate() {
			this.initAllData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
		this.initAllOrgData();
	},
	methods: {
		goTushujieyueshuju() {
			this.$router.push({ name: 'SuperTushujieyueshuju' });
		},
		goSuperDuzhejieyueshuju() {
			this.$router.push({ name: 'SuperDuzhejieyueshuju' });
		},
		goSuperShebeishiyongtongji() {
			this.$router.push({ name: 'SuperShebeishiyongtongji' });
		},
		goTushufenleitongji() {
			this.$router.push({ name: 'SuperTushufenleitongji' });
		},
		goSuperRemenjieyuebangdan() {
			this.$router.push({ name: 'SuperRemenjieyuebangdan' });
		},
		goSuperJieyuedarenbangdan() {
			this.$router.push({ name: 'SuperJieyuedarenbangdan' });
		},
		changeIsShowGraphEcharts() {
			this.isShowGraphEchats = !this.isShowGraphEchats;
		},

		// 7天 30天时间切换
		handlerDateOrDay(value) {
			if (this.chooseSevenOrThirty === value) return;
			const dayStrArr = ['seven', 'thirty'];
			if (dayStrArr.includes(value)) {
				this.chooseSevenOrThirty = value;
				this.chooseDate = this.changeChooseDateHandler(value);
			} else {
				this.chooseSevenOrThirty = '';
			}
		},

		// 初始化所有机构展示
		async initAllOrgData() {
			const { data } = await getAllOrg();
			this.treeData = this.formatAllOrgData(data);
		},
		// 格式化机构数据 tree
		formatAllOrgData(list) {
			return list.map((item) => {
				if (item.child) {
					return {
						name: item.name,
						value: count++,
						oid: item.oid,
						pid: item.pid,
						id: item.id,
						itemStyle: {
							color: 'white'
						},
						label: {
							color: '#333'
						},
						children: this.formatAllOrgData(item.child)
					};
				} else {
					return {
						name: item.name,
						value: count,
						oid: item.oid,
						pid: item.pid,
						id: item.id,
						itemStyle: {
							color: 'white'
						},
						label: {
							color: '#333'
						}
					};
				}
			});
		},
		graphEchartsClickHandler(e) {
			const target = this.findDeepChildren(this.treeData, e.name);
			target.itemStyle.color = target.itemStyle.color === '#5490EF' ? 'white' : '#5490EF';
			target.label.color = target.label.color === '#333' ? 'white' : '#333';
		},
		findDeepChildren(arr, targetName) {
			const target = arr.find((item) => item.name === targetName);
			if (target) return target;
			for (let item of arr) {
				return this.findDeepChildren(item.children, targetName);
			}
		},
		tooltipFormatter(v) {
			return v.name;
		},

		// 初始化总盘大数据
		async initAllCardData() {
			const { data } = await zongpanCount({
				...this.initDateParams(this.chooseDate),
				oids: this.chooseJiGouIds.join(',')
			});
			this.formatDaPanData(data);
		},
		// 格式化大盘数据
		formatDaPanData(obj) {
			this.tushujieyue.borrow_count = obj.borrow_count;
			this.tushujieyue.return_count = obj.return_count;
			this.tushujieyue.book_rest_count = obj.book_rest_count;
			this.tushujieyue.borrow_count_abnormal = obj.borrow_count_abnormal;
			this.duzhejieyue.user_count = obj.user_count;
			this.duzhejieyue.user_count_add = obj.user_count_add;
			this.duzhejieyue.user_count_active = obj.user_count_active;
			this.duzhejieyue.user_count_abnormal = obj.user_count_abnormal;
			this.shebeishiyong.device_count = obj.device_count;
			this.shebeishiyong.device_count_day = obj.device_count_day;
			this.shebeishiyong.device_count_login = obj.device_count_login;
			this.shebeishiyong.device_count_abnormal = obj.device_count_abnormal;
		},

		// 初始化数据对比
		async initZongPanDataVs() {
			const { data } = await zongpanAllOrgCount({
				...this.initDateParams(this.chooseDate),
				oids: this.chooseJiGouIds.join(',')
			});
			this.zongpanVsData = data;
		},

		// 初始化图书借阅类别
		async initZongPanClassifyData() {
			const { data } = await zongPanClassifyBorrowRank({
				...this.initDateParams(this.chooseDate),
				oids: this.chooseJiGouIds.join(',')
			});
			this.zongpanClassifyData = data;
		},

		// 热门借阅榜单初始化
		async initHotBorrowRank() {
			const { data } = await zongPanBookBorrowRank(this.initDateParams(this.chooseDate));
			this.hotBorrowRankData = data;
		},

		// 借阅达人榜初始化
		async initUserBorrowRank() {
			const { data } = await zongPanUserborrowRank(this.initDateParams(this.chooseDate));
			this.userBorrowRankData = data;
		},

		// 汇总所有初始化的数据(需根据用户选择进行切换的数据)
		async initAllData() {
			this.initAllCardData();
			this.initZongPanDataVs();
			this.initZongPanClassifyData();
			this.initHotBorrowRank();
			this.initUserBorrowRank();
		}
	}
};
</script>
<template>
	<div class="sjdp-wrap">
		<div class="filter-wrap bg-0 flex-center p-l-20 p-r-20 flex-space-b">
			<div class="flex-center pointer" @click="changeIsShowGraphEcharts">
				<span class="f-s-34 bold col-1">数据大盘</span>
				<div class="show-tree-icon m-l-10">
					<span
						:class="[
							'iconfont iconzhankai-copy f-s-22',
							isShowGraphEchats ? 'active-arrow-icon' : 'deactive-arrow-icon'
						]"
					></span>
				</div>
			</div>
			<div class="date-wrap">
				<span class="f-s-14 col-1 m-r-15">时间选择</span>
				<el-button
					size="small"
					:type="chooseSevenOrThirty === 'seven' ? 'primary' : 'default'"
					@click="handlerDateOrDay('seven')"
					>近7天</el-button
				>
				<el-button
					size="small"
					:type="chooseSevenOrThirty === 'thirty' ? 'primary' : 'default'"
					class="m-r-10"
					@click="handlerDateOrDay('thirty')"
					>近30天</el-button
				>
				<el-button size="small" :type="chooseSevenOrThirty === '' ? 'primary' : 'default'"
					>自定义</el-button
				>
			</div>
		</div>
		<section v-if="isShowGraphEchats" class="graph-wrap p-20 bg-0">
			<div class="tree-wrap">
				<ve-tree
					:events="{ click: graphEchartsClickHandler }"
					:settings="treeSettings"
					:data="treeOption"
					:extend="{ tooltip: { backgroundColor: '#805FFE', alwaysShowContent: false } }"
					:tooltip-formatter="tooltipFormatter"
					height="700px"
				/>
			</div>
			<div class="flex-center">
				<el-button type="default" size="small">取消</el-button>
				<el-button type="primary" class="w-200" size="small">确定选择</el-button>
			</div>
		</section>
		<section class="p-20 m-t-20 bg-0">
			<el-row :gutter="20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap flex-col p-30">
						<span class="f-s-20 col-0">图书借阅数据</span>
						<div
							class="flex-center flex-left m-t-20 pointer"
							@click="goTushujieyueshuju"
						>
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="(value, key) in tushujieyue" :key="key">
					<TSTJCard :attr="key" :value="value" />
				</el-col>
			</el-row>
			<el-row :gutter="20" class="m-t-20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap duze-see flex-col p-30">
						<span class="f-s-20 col-0">读者借阅数据</span>
						<div
							class="flex-center flex-left m-t-20 pointer"
							@click="goSuperDuzhejieyueshuju"
						>
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="(value, key) in duzhejieyue" :key="key">
					<DSTJCard :attr="key" :value="value" />
				</el-col>
			</el-row>
			<el-row :gutter="20" class="m-t-20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap sb-see flex-col p-30">
						<span class="f-s-20 col-0">设备使用统计</span>
						<div
							class="flex-center flex-left m-t-20 pointer"
							@click="goSuperShebeishiyongtongji"
						>
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="(value, key) in shebeishiyong" :key="key">
					<SBTJCard :attr="key" :value="Math.abs(value)" />
				</el-col>
			</el-row>
		</section>
		<section class="p-l-20 p-r-20 bg-0">
			<el-row :gutter="20">
				<el-col :span="24">
					<section class="base-container-yyzx bookcase-vs">
						<div class="bookcase-title">
							<span class="f-s-18 col-1">数据对比</span>
						</div>
						<div class="m-t-20 flex">
							<div class="bookcase-table m-r-30">
								<el-table
									:cell-style="bookcaseTableStyle"
									:header-cell-style="bookcaseTableHeaderStyle"
									height="360"
									:data="zongpanVsData"
									stripe
									style="width: 100%"
								>
									<el-table-column
										prop="org_name"
										label="名称"
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
		</section>
		<section class="p-20 bg-0">
			<el-row :gutter="20">
				<el-col :span="24">
					<section class="base-container-yyzx bookcase-vs">
						<div class="bookcase-title flex flex-space-b">
							<span class="f-s-18 col-1">图书借阅类别</span>
							<div class="pointer" @click="goTushufenleitongji">
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
									:data="zongpanClassifyData"
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
										radius: 170,
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
		</section>
		<section class="p-l-20 p-r-20 bg-0">
			<el-row>
				<div class="base-container-yyzx borrow-top-wrap">
					<div class="bookcase-title flex flex-space-b">
						<span class="f-s-18 col-1">热门借阅榜单</span>
						<div class="pointer" @click="goSuperRemenjieyuebangdan">
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
		</section>
		<section class="p-20 bg-0">
			<el-row>
				<div class="base-container-yyzx borrow-top-wrap">
					<div class="bookcase-title flex flex-space-b">
						<span class="f-s-18 col-1">借阅达人榜</span>
						<div class="pointer" @click="goSuperJieyuedarenbangdan">
							<span class="col-8 f-s-14">全部榜单</span>
							<span class="el-icon-arrow-right col-8" />
						</div>
					</div>
					<el-row :gutter="20">
						<el-col
							v-for="(item, index) in userBorrowRankData"
							:key="item.avatar"
							:span="6"
						>
							<JYBTCard :index="index + 1" :item="item" />
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
		position: relative;
		z-index: 8;
	}
	.graph-wrap {
		border-top: 1px solid #ccc;
	}
	.date-wrap {
		position: relative;
		z-index: 8;
	}

	.see-all-wrap {
		width: 100%;
		background: url('../../../assets/img/tstj-see.png') no-repeat center / cover;
		height: 170px;
		border-radius: 8px;
		&.duze-see {
			background: url('../../../assets/img/jybd-see.png') no-repeat center / cover;
		}
		&.sb-see {
			background: url('~@/assets/img/sbsy-see.png') no-repeat center / cover;
		}
	}
	.tree-wrap {
		width: 1000px;
		margin-top: -100px;
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
	.show-tree-icon {
		// height: 20px;
		// width: 20px;
		// border-radius: 10px;
		// background-color: #5490ef;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// .turn-icon {
		// 	color: #fff;
		// }
		color: #5490ef;
		font-size: 30px;

		.active-arrow-icon {
			display: inline-block;
			transform: rotate(0deg);
			transition: all 0.4s;
		}
		.deactive-arrow-icon {
			display: inline-block;
			transition: all 0.4s;
			transform: rotate(180deg);
		}
	}
}
.echarts {
	width: 100%;
	height: 100%;
}
</style>
