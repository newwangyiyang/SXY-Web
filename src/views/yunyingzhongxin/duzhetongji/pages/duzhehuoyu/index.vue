<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { yyzxDeptList, userDept, excelUserDept } from '@/api/yunyingzhongxin';
const limit = 10;
export default {
	name: 'Duzhehuoyu',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 开始日期结束日期
			chooseDate: [],
			// 分页
			tableData: [],
			currentPage: 1,
			pageSize: limit,
			totalRow: 0,
			// 用户组选择
			groupOptions: [],
			groupValue: '',
			ids: []
		};
	},
	watch: {
		chooseDate() {
			this.initTableData();
		},
		groupValue() {
			this.initTableData();
		}
	},
	mounted() {
		this.initGroupOptionData();
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 初始化用户组数据
		async initGroupOptionData() {
			const { data } = await yyzxDeptList();
			data.unshift({ id: '', name: '全部用户组' });
			this.groupOptions = data;
		},

		// 初始化table列表
		async initTableData() {
			const { data } = await userDept({
				...this.initDateParams(this.chooseDate),
				dept_id: this.groupValue,
				pageSize: this.pageSize,
				pageNo: this.currentPage
			});
			this.tableData = data.list;
			this.totalRow = data.totalRow;
		},
		handleCurrentChange(currentPage) {
			this.initTableData();
		},
		// 1、导出当前按钮
		async handlerExportSelected() {
			if (this.ids.length <= 0) {
				this.$message('请选择你需要的导出内容');
			} else {
				const { data } = await excelUserDept({ ids: this.ids.join(',') });
				this.downFile(data);
			}
		},
		// 2、导出全部按钮
		async handlerExportAll() {
			const { data } = await excelUserDept();
			this.downFile(data);
		},
		searchBtn() {
			this.currentPage = 1;
			this.initTableData();
		},
		resetBtn() {
			this.currentPage = 1;
			this.groupValue = '';
			this.chooseDate = this.initChooseDate();
		},
		handleSelectionChange(selectList) {
			this.ids = selectList.map((item) => item.id);
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap p-b-10">
			<TableHeader
				title="读者活跃"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-l-20 p-r-20 p-b-20 p-t-20 flex-center flex-space-b">
				<section>
					<el-select v-model="groupValue" size="small">
						<el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
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
						class="m-l-20"
					></el-date-picker>
				</section>
				<section>
					<el-button type="primary" size="small" @click="searchBtn">查询</el-button>
					<el-button size="small" @click="resetBtn">重置</el-button>
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
					<el-table-column prop="dept_name" label="用户组"></el-table-column>
					<el-table-column prop="date" label="时间"></el-table-column>
					<el-table-column prop="user_sum" label="用户数量"></el-table-column>
					<el-table-column prop="user_pre" label="总量占比"></el-table-column>
					<el-table-column prop="user_avtive_count" label="今日活跃"></el-table-column>
					<el-table-column prop="active_pre" label="活跃占比"></el-table-column>
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
