<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { userborrowRankPage } from '@/api/yunyingzhongxin';
const limit = 10;
export default {
	name: 'Jieyuedarenbangdan',
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
			borrowUserRankTableData: [],
			currentPage: 1,
			pageSize: limit,
			totalRow: 0
		};
	},
	watch: {
		chooseDate() {
			this.currentPage = 1;
			this.initBorrowUserRankData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		handleCurrentChange(currentPage) {
			this.initBorrowUserRankData();
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
		},
		// 借阅达人榜单分页
		async initBorrowUserRankData() {
			const { data } = await userborrowRankPage({
				...this.initDateParams(this.chooseDate),
				pageSize: this.pageSize,
				pageNo: this.currentPage
			});
			this.borrowUserRankTableData = data.list;
			this.totalRow = data.totalRow;
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap p-b-10">
			<TableHeader
				title="借阅达人榜单"
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
					:data="borrowUserRankTableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="姓名" width="100"></el-table-column>
					<el-table-column label="性别" width="100">
						<template v-slot="{ row }">
							<span>{{ row.gender === 0 ? '男' : '女' }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="idno" label="身份证号"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column prop="card_number" label="读者卡号"></el-table-column>
					<el-table-column prop="dept_name" label="用户组"></el-table-column>
					<el-table-column prop="borrow_count" label="累计借阅"></el-table-column>
					<el-table-column label="借阅记录">
						<template v-slot="{ row }">
							<el-button
								size="small"
								type="text"
								@click="
									() => {
										row;
									}
								"
								>查看</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</section>
			<section class="page-wrap p-r-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next, jumper"
					:total="totalRow"
					background
					@current-change="handleCurrentChange"
				></el-pagination>
				<span class="f-s-12 col-2">共{{ totalRow }}条记录</span>
			</section>
		</div>
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
