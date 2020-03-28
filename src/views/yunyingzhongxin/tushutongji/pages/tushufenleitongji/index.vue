<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { classifyList, classifyPage } from '@/api/yunyingzhongxin';
const limit = 10;
export default {
	name: 'Tushufenleitongji',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			chooseDate: '',
			tableData: [],
			currentPage: 1,
			pageSize: limit,
			totalRow: 0,
			options: [],
			value: ''
		};
	},
	watch: {
		chooseDate() {
			this.currentPage = 1;
			this.initClassfyTableData();
		},
		value() {
			this.currentPage = 1;
			this.initClassfyTableData();
		}
	},
	mounted() {
		this.initClassifyList();
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 初始化图书分类
		async initClassifyList() {
			const { data } = await classifyList();
			data.unshift({ name: '全部分类', id: '' });
			this.options = data;
		},

		// 图书分类列表
		async initClassfyTableData() {
			const { data } = await classifyPage({
				...this.initDateParams(this.chooseDate),
				pageSize: this.pageSize,
				pageNo: this.currentPage,
				classify_id: this.value
			});
			this.totalRow = data.totalRow;
			this.tableData = data.list;
		},
		handleCurrentChange() {
			this.initClassfyTableData();
		},
		// 1、导出当前按钮
		handlerExportSelected() {
			console.log('handlerExportSelected');
		},
		// 2、导出全部按钮
		handlerExportAll() {
			console.log('handlerExportAll');
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<TableHeader
				title="图书分类统计"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-20 flex-center flex-space-b">
				<section>
					<el-select v-model="value" class="m-r-20" size="small" placeholder="图书类别">
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
					<el-date-picker
						v-model="chooseDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy / MM / dd"
						value-format="yyyy-MM-dd"
						size="small"
						:clearable="false"
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
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="图书类别"></el-table-column>
					<el-table-column prop="date" label="时间"></el-table-column>
					<el-table-column prop="book_sum" label="图书总量"></el-table-column>
					<el-table-column prop="book_pre" label="总量占比"></el-table-column>
					<el-table-column prop="borrow_count" label="借出数量"></el-table-column>
					<el-table-column prop="borrow_pre" label="借出占比"></el-table-column>
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
	padding: 20px;
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
