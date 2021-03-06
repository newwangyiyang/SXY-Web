<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { gcDetail, borrowList, excelBorrowList } from '@/api/tushuguanli';
const limit = 10;
export default {
	name: 'Jieyuejilu',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 路由传递而来的图书主键
			bookId: '',
			// 图书基本信息
			bookData: {},
			// 表格数据
			tableData: [],
			// 分页
			pageSize: limit,
			currentPage: 1,
			totalRow: 0,

			chooseDate: '',
			name: '',
			cardNum: '',
			ids: []
		};
	},
	mounted() {
		this.bookId = this.$route.params.bookId;
		this.chooseDate = this.initChooseDate();
		this.initBookDetail();
		this.initBorrowTableData();
	},
	methods: {
		// 获取图书的基本信息
		async initBookDetail() {
			const { book: data } = await gcDetail({ book_id: this.bookId });
			this.bookData = data;
		},

		// 获取table数据
		async initBorrowTableData() {
			const { data } = await borrowList(this.formatParams());
			this.tableData = data.list;
			this.totalRow = data.totalRow;
		},
		// 格式化参数
		formatParams() {
			return {
				...this.initDateParams(this.chooseDate),
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				book_id: this.bookId,
				name: this.name,
				card_number: this.cardNum
			};
		},

		// 借阅状态文本
		getStatusText(status) {
			return {
				0: '借出',
				1: '归还',
				2: '超借',
				3: '逾期',
				4: '超借逾期'
			}[status];
		},

		handleCurrentChange(currentPage) {
			this.initBorrowTableData();
		},

		handleResetBtn() {
			this.name = this.cardNum = '';
			this.chooseDate = this.initChooseDate();
			this.currentPage = 1;
			this.initBorrowTableData();
		},
		// 1、导出当前按钮
		async handlerExportSelected() {
			if (this.ids.length <= 0) {
				this.$message('请选择你需要的导出内容');
			} else {
				const { data } = await excelBorrowList({
					book_id: this.bookId,
					borrow_ids: this.ids.join(',')
				});
				this.downFile(data);
			}
		},
		// 2、导出全部按钮
		async handlerExportAll() {
			const { data } = await excelBorrowList({ book_id: this.bookId });
			this.downFile(data);
		},
		// 3、 用户选择导出
		handleSelectionChange(selectList) {
			this.ids = selectList.map((item) => item.borrow_id);
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<TableHeader
				:title="`${bookData.title || '-'} 借阅记录`"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-20 flex-center flex-space-b">
				<section class="flex-center">
					<el-date-picker
						v-model="chooseDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy / MM / dd"
						value-format="yyyy-MM-dd"
						:clearable="false"
						size="small"
					></el-date-picker>
					<el-input v-model="name" size="small" class="w-200 m-l-20" placeholder="请输入姓名"></el-input>
					<el-input v-model="cardNum" size="small" class="w-200 m-l-20" placeholder="请输入读者卡号"></el-input>
				</section>
				<section>
					<el-button type="primary" size="small" @click="initBorrowTableData">查询</el-button>
					<el-button size="small" @click="handleResetBtn">重置</el-button>
				</section>
			</section>
			<section class="p-b-20">
				<el-table
					:cell-style="cellStyle"
					:header-cell-style="headerCellStyle"
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="姓名" width="100"></el-table-column>
					<el-table-column prop="card_number" label="读者卡号"></el-table-column>
					<el-table-column prop="dept_name" label="用户组"></el-table-column>
					<el-table-column prop="gmt_borrow" label="借阅时间"></el-table-column>
					<el-table-column prop="gmt_expire" label="到期时间"></el-table-column>
					<el-table-column prop="gmt_return" label="归还时间"></el-table-column>
					<el-table-column label="借阅状态">
						<template v-slot="{ row }">
							{{ getStatusText(row.status) }}
							<!-- <el-dropdown>
								<span
									class="col-6 f-s-12"
									@click="
										() => {
											scope;
										}
									"
								>
									未处理
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>黄金糕</el-dropdown-item>
										<el-dropdown-item>狮子头</el-dropdown-item>
										<el-dropdown-item>螺蛳粉</el-dropdown-item>
										<el-dropdown-item disabled>双皮奶</el-dropdown-item>
										<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>-->
						</template>
					</el-table-column>
					<el-table-column prop="operator" label="处理人"></el-table-column>
				</el-table>
			</section>
			<section class="p-r-20 p-b-20 flex-center flex-space-b">
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
		border-radius: 10px;
		overflow: hidden;
	}
	.sg-choose-wrap {
		height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 6px;
	}
}
</style>
