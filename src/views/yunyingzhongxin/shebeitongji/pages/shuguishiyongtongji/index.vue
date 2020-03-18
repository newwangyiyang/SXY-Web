<script>
export default {
	name: 'Shuguishiyongtongji',
	data() {
		return {
			checkList: [],
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '1'
				}
			],
			totalTableData: [
				{
					title: '累计',
					date: '2016-05-02',
					name: '王小虎',
					address: '1'
				}
			]
		};
	},
	methods: {
		handleCurrentChange(currentPage) {}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<section class="brs-t-l10 brs-t-r10 bg-5 h-60 flex-center flex-space-b p-l-30 p-r-30">
				<span class="col-1 f-s-18">书柜使用统计</span>
				<section>
					<el-button plain type="info" size="small" icon="el-icon-document">导出当前</el-button>
					<el-button plain type="info" size="small" icon="el-icon-document">导出全部</el-button>
				</section>
			</section>
			<section class="p-20 flex-center flex-space-b">
				<div class="sg-choose-wrap col-1 flex1 f-s-14 flex-center p-l-20 flex-left">
					<span class="m-r-30 col-1">书柜选择</span>
					<el-checkbox-group v-model="checkList">
						<el-checkbox label="全部书柜"></el-checkbox>
						<el-checkbox label="江苏省知识产权局01号柜"></el-checkbox>
						<el-checkbox label="江苏省知识产权局02号柜"></el-checkbox>
					</el-checkbox-group>
				</div>
				<section class="m-l-30">
					<el-button type="primary" size="small">查询</el-button>
					<el-button size="small">重置</el-button>
				</section>
			</section>
			<section class="p-b-20">
				<el-table
					:cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333'
					}"
					:header-cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333',
						backgroundColor: '#D8D8D8',
                        fontWeight: 'normal'
					}"
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="date" label="书柜名称"></el-table-column>
					<el-table-column prop="name" label="累计运行天数"></el-table-column>
					<el-table-column prop="address" label="离线时间"></el-table-column>
					<el-table-column prop="address" label="登录次数"></el-table-column>
					<el-table-column prop="address" label="借书次数"></el-table-column>
					<el-table-column prop="address" label="归还次数"></el-table-column>
				</el-table>
			</section>
			<section class="total-table-wrap bg-5">
				<el-table
					:cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333',
						backgroundColor: '#D8D8D8'
					}"
					:data="totalTableData"
					:show-header="false"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column prop="title" width="110" label="累计"></el-table-column>
					<el-table-column prop="date" label="书柜名称"></el-table-column>
					<el-table-column prop="name" label="累计运行天数"></el-table-column>
					<el-table-column prop="address" label="离线时间"></el-table-column>
					<el-table-column prop="address" label="登录次数"></el-table-column>
					<el-table-column prop="address" label="借书次数"></el-table-column>
					<el-table-column prop="address" label="归还次数"></el-table-column>
				</el-table>
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
		height: 33px;
		border: 1px solid #dcdfe6;
		border-radius: 6px;
	}
	.total-table-wrap {
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
