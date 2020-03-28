<script>
import TableHeader from '@/components/TableHeader';
import { getCollectionList, collectionPage } from '@/api/yunyingzhongxin';
import mixins from '@/utils/mixins-vue';
const limit = 10;
export default {
	name: 'Tushujieyueshuju',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 馆藏地全选控制
			checkAll: true,
			checkedGCList: [],
			guancangList: [],
			isIndeterminate: false,
			// 开始日期结束日期
			chooseDate: [],
			// 7天或30天按钮
			chooseSevenOrThirty: 'seven',
			// 借阅数据
			borrowTableData: [],
			// 总条数
			totalRow: 0,
			pageSize: limit,
			totalTableData: [
				{
					title: '合计',
					borrow_count: 0,
					return_count: 0,
					book_rest_count: 0,
					book_count: 0,
					borrow_abnormal_count: 0
				}
			],
			currentPage: 1
		};
	},
	computed: {
		getTotalDateStr() {
			return this.chooseDate.length > 0 ? this.chooseDate : false;
		}
	},
	watch: {
		chooseDate() {
			this.currentPage = 1;
			this.initBorrowTableData();
		},
		checkedGCList(newList) {
			if (newList.length > 0) {
				this.currentPage = 1;
				this.initBorrowTableData();
			}
		}
	},
	async mounted() {
		await this.initCollectionList();
	},
	methods: {
		// 馆藏地列表
		async initCollectionList() {
			const { data } = await getCollectionList();
			this.chooseDate = this.initChooseDate();
			this.checkedGCList = data.map((item) => item.id);
			this.guancangList = data;
		},
		handleCurrentChange(currentPage) {
			this.initBorrowTableData();
		},

		// 借阅数据分页列表tableData
		async initBorrowTableData() {
			const { data } = await collectionPage({
				...this.initDateParams(this.chooseDate),
				collection_ids: this.checkedGCList.join(','),
				pageNo: this.currentPage,
				pageSize: this.pageSize
			});
			this.borrowTableData = data.list;
			this.totalRow = data.totalRow;
			this.initTotalTableData(data.list);
		},

		// 计算总量
		initTotalTableData(list) {
			this.totalTableData = [
				{
					title: '合计',
					borrow_count: list.reduce((r, item) => r + item.borrow_count, 0),
					return_count: list.reduce((r, item) => r + item.return_count, 0),
					book_rest_count: list.reduce((r, item) => r + item.book_rest_count, 0),
					book_count: list.reduce((r, item) => r + item.book_count, 0),
					borrow_abnormal_count: list.reduce(
						(r, item) => r + item.borrow_abnormal_count,
						0
					)
				}
			];
		},
		// 1、导出当前按钮
		handlerExportSelected() {
			console.log('handlerExportSelected');
		},
		// 2、导出全部按钮
		handlerExportAll() {
			console.log('handlerExportAll');
		},
		// 馆藏地全选按钮控制
		handleCheckAllChange(val) {
			this.checkedGCList = val ? this.guancangList.map((item) => item.id) : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.guancangList.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.guancangList.length;
		},
		// 日期选择
		handlerDateOrDay(value) {
			if (value === this.chooseSevenOrThirty) return;
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
				title="图书借阅数据"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-20">
				<div class="sg-choose-wrap col-1 f-s-14 flex-center p-l-20 flex-left">
					<span class="m-r-30 col-1">馆藏地选择</span>
					<el-checkbox
						v-model="checkAll"
						:indeterminate="isIndeterminate"
						@change="handleCheckAllChange"
						>全部馆藏地</el-checkbox
					>
					<el-checkbox-group
						v-model="checkedGCList"
						class="m-l-20"
						@change="handleCheckedCitiesChange"
					>
						<el-checkbox v-for="gc in guancangList" :key="gc.id" :label="gc.id">{{
							gc.name
						}}</el-checkbox>
					</el-checkbox-group>
				</div>
			</section>
			<section class="p-l-20 p-r-20 p-b-20 flex-center flex-space-b">
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
					<el-table-column prop="name" label="馆藏地" width="160"></el-table-column>
					<el-table-column prop="date" label="时间" width="160"></el-table-column>
					<el-table-column prop="borrow_count" label="借出数量"></el-table-column>
					<el-table-column prop="return_count" label="归还数量"></el-table-column>
					<el-table-column prop="book_rest_count" label="图书余量"></el-table-column>
					<el-table-column prop="book_count" label="图书总量"></el-table-column>
					<el-table-column
						prop="borrow_abnormal_count"
						label="异常借阅"
					></el-table-column>
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
				<el-table-column width="160">
					<template>{{ getTotalDateStr ? getTotalDateStr[0] : '-' }}</template>
				</el-table-column>
				<el-table-column width="160">
					<template>{{ getTotalDateStr ? getTotalDateStr[1] : '-' }}</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>借出数量</span>
							<span class="f-s-20">{{ row.borrow_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>归还数量</span>
							<span class="f-s-20">{{ row.return_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>图书余量</span>
							<span class="f-s-20">{{ row.book_rest_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>图书总量</span>
							<span class="f-s-20">{{ row.book_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>异常借阅</span>
							<span class="f-s-20">{{ row.borrow_abnormal_count }}</span>
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
	padding: 20px;
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
