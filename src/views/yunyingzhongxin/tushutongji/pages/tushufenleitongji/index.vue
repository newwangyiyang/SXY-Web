<script>
export default {
	name: 'Tushufenleitongji',
	data() {
		return {
			chooseDate: '',
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
			currentPage: 5,
			options: [
				{
					value: '选项1',
					label: '教育类'
				},
				{
					value: '选项2',
					label: '科技类'
				},
				{
					value: '选项3',
					label: '科学类'
				},
				{
					value: '选项4',
					label: '健康类'
				},
				{
					value: '选项5',
					label: '法律类'
				}
			],
			value: ''
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
				<span class="col-1 f-s-18">图书分类统计</span>
				<section>
					<el-button plain type="info" size="small" icon="el-icon-document"
						>导出当前</el-button
					>
					<el-button plain type="info" size="small" icon="el-icon-document"
						>导出全部</el-button
					>
				</section>
			</section>
			<section class="p-20 flex-center flex-space-b">
				<section>
					<el-date-picker
						v-model="chooseDate"
						type="daterange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						size="small"
					>
					</el-date-picker>
					<el-select v-model="value" class="m-l-20" size="small" placeholder="图书类别">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</section>
				<section>
					<el-button type="primary" size="small">查询</el-button>
					<el-button size="small">重置</el-button>
				</section>
			</section>
			<section class="p-l-20 p-r-20 p-b-20">
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
						backgroundColor: '#D8D8D8'
					}"
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="图书类别"></el-table-column>
					<el-table-column prop="date" label="时间"></el-table-column>
					<el-table-column prop="address" label="图书总量"></el-table-column>
					<el-table-column prop="address" label="总量占比"></el-table-column>
					<el-table-column prop="address" label="借出数量"></el-table-column>
					<el-table-column prop="address" label="借出占比"></el-table-column>
				</el-table>
			</section>
			<section class="p-l-20 p-r-20 p-b-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="currentPage"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="999"
					background
					@current-change="handleCurrentChange"
				>
				</el-pagination>
				<span class="f-s-12 col-2">共123条记录</span>
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
