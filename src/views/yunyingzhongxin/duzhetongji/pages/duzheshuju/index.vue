<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { borrowUser } from '@/api/yunyingzhongxin';
const limit = 10;
export default {
	name: 'Duzhejieyueshuju',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 开始日期结束日期
			chooseDate: [],
			// 7天或30天按钮
			chooseSevenOrThirty: 'seven',
			borrowTableData: [],
			totalTableData: [
				{
					title: '合计',
					name: '100',
					address: '1'
				}
			],
			currentPage: 5,
			pageSize: limit,
			totalRow: 0
		};
	},
	computed: {
		getTotalDateStr() {
			return this.chooseDate.length > 0 ? this.chooseDate : false;
		}
	},
	watch: {
		chooseDate() {
			this.initBorrowTableData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 读者借阅数据初始化
		async initBorrowTableData() {
			const { data } = await borrowUser(this.initDateParams(this.chooseDate));
			this.totalRow = data.totalRow;
			this.borrowTableData = data.list;
		},
		handleCurrentChange() {
			this.initBorrowTableData();
		},
		// 1、导出当前按钮
		handlerExportSelected() {
			console.log('handlerExportSelected');
		},
		// 2、导出全部按钮
		handlerExportAll() {
			console.log('handlerExportAll');
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
	<div class="tsjysj-wrap">
		<div class="content-wrap p-b-10">
			<TableHeader
				title="读者借阅数据"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-l-20 p-r-20 p-b-20 p-t-20 flex-center flex-space-b">
				<section>
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
				<section>
					<el-button type="primary" size="small">查询</el-button>
					<el-button size="small">重置</el-button>
				</section>
			</section>
			<section class="p-b-20">
				<el-table
					:cell-style="cellStyle"
					:header-cell-style="headerCellStyle"
					:data="borrowTableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="date" label="时间" width="200"></el-table-column>
					<el-table-column prop="user_sum" label="用户总量"></el-table-column>
					<el-table-column prop="user_add_count" label="用户新增"></el-table-column>
					<el-table-column prop="user_active_count" label="用户活跃量"></el-table-column>
					<el-table-column prop="user_abnormal_count" label="状态异常"></el-table-column>
				</el-table>
			</section>
			<section class="page-wrap p-r-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="currentPage"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="999"
					background
					@current-change="handleCurrentChange"
				></el-pagination>
				<span class="f-s-12 col-2">共123条记录</span>
			</section>
		</div>
		<section class="total-table-wrap bg-5 m-t-20">
			<el-table
				:cell-style="{
					textAlign: 'center',
					fontSize: 14,
					color: '#333',
					backgroundColor: '#EEF0F0',
					padding: 0
				}"
				:data="totalTableData"
				:show-header="false"
				highlight-current-row
				border
				style="width: 100%"
			>
				<el-table-column width="110">
					<template v-slot="{ row }">
						<div>
							<span>{{ row.title }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column width="200">
					<template>{{
						getTotalDateStr ? `${getTotalDateStr[0]}至${getTotalDateStr[1]}` : '-'
					}}</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>用户总量</span>
							<span class="f-s-20">{{ row.name }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>用户新增</span>
							<span class="f-s-20">{{ row.name }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>用户活跃量</span>
							<span class="f-s-20">{{ row.name }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>状态异常</span>
							<span class="f-s-20">{{ row.name }}</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</section>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.tsjysj-wrap {
	background-color: #fff;
	.content-wrap {
		height: 100%;
		border: 1px solid #d4d4d4;
		border-radius: 8px;
		overflow: hidden;
	}
	.sg-choose-wrap {
		height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 6px;
	}
	.total-table-wrap {
		padding-top: 20px;
		padding-bottom: 20px;
		border-radius: 8px;
		overflow: hidden;
		::v-deep .el-table {
			border: 0;
			th,
			tr,
			td {
				border: 0;
				background-color: #fff;
			}
			&::before {
				height: 0px;
			}
			&::after {
				width: 0;
			}

			.el-table__fixed:before {
				height: 0;
			}
		}
	}
}
</style>
