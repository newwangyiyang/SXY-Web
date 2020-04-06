<script>
import mixins from '@/utils/mixins-vue';
import DSTJCard from './components/DSTJCard';
import JYBTCard from './components/JYBTCard';
import { settings as borrowCategorySettings } from './echarts-options/borrow-category';
import { userCount, userActiveData, userborrowRank } from '@/api/yunyingzhongxin';
export default {
	name: 'Duzhetongji',
	components: {
		DSTJCard,
		JYBTCard
	},
	mixins,
	data() {
		return {
			// 读者借阅数据
			userCountData: {
				user_sum: 0,
				user_yesterday_add_count: 0,
				user_yesterday_active_count: 0,
				user_abnormal_count: 0
			},
			// 读者活跃数据
			activeUserTableData: [],
			// 借阅达人榜
			borrowUserRank: [],
			// 开始日期结束日期
			chooseDate: [],
			// 7天或30天按钮
			chooseSevenOrThirty: 'seven'
		};
	},
	computed: {
		borrowCategoryOptions() {
			const rows = this.activeUserTableData.map((item) => ({
				类别: item.dept_name,
				活跃数据: item.avtive_count
			}));
			const option = {
				columns: ['类别', '活跃数据'],
				rows
			};
			return option;
		},
		borrowCategorySettings() {
			return borrowCategorySettings;
		}
	},
	watch: {
		chooseDate() {
			this.initUserActiveCount();
			this.initUserBorrowRank();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
		this.initUserCount();
	},
	methods: {
		// 初始化读者借阅数据
		async initUserCount() {
			const { data } = await userCount();
			this.userCountData.user_sum = data.user_sum;
			this.userCountData.user_yesterday_add_count = data.user_yesterday_add_count;
			this.userCountData.user_yesterday_active_count = data.user_yesterday_active_count;
			this.userCountData.user_abnormal_count = data.user_abnormal_count;
		},

		// 读者活跃用户统计
		async initUserActiveCount() {
			const { data } = await userActiveData({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1]
			});
			this.activeUserTableData = data;
		},

		// 借阅达人榜
		async initUserBorrowRank() {
			const { data } = await userborrowRank(this.initDateParams(this.chooseDate));
			this.borrowUserRank = data;
		},

		goJYDRBD() {
			this.$router.push({ name: 'Jieyuedarenbangdan' });
		},
		goTZSJ() {
			this.$router.push({ name: 'Duzheshuju' });
		},
		goDZHY() {
			this.$router.push({ name: 'Duzhehuoyu' });
		},
		// 日期选择
		handlerDateOrDay(value) {
			if (this.chooseSevenOrThirty === value) return;
			const dayStrArr = ['seven', 'thirty'];
			if (dayStrArr.includes(value)) {
				this.chooseSevenOrThirty = value;
				this.chooseDate = this.changeChooseDateHandler(value);
			} else {
				this.chooseSevenOrThirty = '';
			}
		}
	}
};
</script>
<template>
	<div class="dztj-wrap">
		<section v-if="!isDeepRouterView">
			<el-row :gutter="20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap flex-col p-30">
						<span class="f-s-20 col-0">读者借阅数据</span>
						<div class="flex-center flex-left m-t-20 pointer" @click="goTZSJ">
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="(value, key) in userCountData" :key="key">
					<DSTJCard :attr="key" :value="value" />
				</el-col>
			</el-row>
			<el-row :gutter="20" class="m-t-20">
				<el-col :span="24">
					<section class="base-container-yyzx bookcase-vs">
						<div class="bookcase-title flex flex-space-b">
							<div class="flex-center">
								<span class="f-s-18 col-1">读者活跃</span>
								<section class="m-l-20">
									<el-button
										size="small"
										:type="
											chooseSevenOrThirty === 'seven' ? 'primary' : 'default'
										"
										@click="handlerDateOrDay('seven')"
									>近7天</el-button>
									<el-button
										size="small"
										:type="
											chooseSevenOrThirty === 'thirty' ? 'primary' : 'default'
										"
										class="m-r-10"
										@click="handlerDateOrDay('thirty')"
									>近30天</el-button>
									<el-date-picker
										v-model="chooseDate"
										type="daterange"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										size="small"
										format="yyyy / MM / dd"
										value-format="yyyy-MM-dd"
										:clearable="false"
										@change="handlerDateOrDay"
									></el-date-picker>
								</section>
							</div>
							<div class="pointer" @click="goDZHY">
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
									:data="activeUserTableData"
									stripe
									style="width: 100%"
								>
									<el-table-column prop="dept_name" label="用户组" width="280"></el-table-column>
									<el-table-column prop="avtive_count" label="今日活跃"></el-table-column>
									<el-table-column prop="pre" label="活跃占比"></el-table-column>
								</el-table>
							</div>
							<div class="bookcase-echarts">
								<ve-pie
									:data="borrowCategoryOptions"
									:extend="borrowCategorySettings"
									:settings="{
										offsetY: 200,
										radius: 150,
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
						<span class="f-s-18 col-1">借阅达人榜</span>
						<div class="pointer" @click="goJYDRBD">
							<span class="col-8 f-s-14">全部榜单</span>
							<span class="el-icon-arrow-right col-8" />
						</div>
					</div>
					<el-row :gutter="20">
						<el-col v-for="(item, index) in borrowUserRank" :key="item.name" :span="6">
							<JYBTCard :index="index + 1" :item="item" />
						</el-col>
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
	.see-all-wrap {
		width: 100%;
		background: url('../../../assets/img/jybd-see.png') no-repeat center / cover;
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
			top: 10px;
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
}
</style>
