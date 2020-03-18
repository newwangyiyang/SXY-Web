<script>
export default {
	name: 'Jieyuedarenbangdan',
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
			currentPage: 5
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
				<span class="col-1 f-s-18">借阅达人榜</span>
				<section>
					<el-button plain type="info" size="small" icon="el-icon-document">导出当前</el-button>
					<el-button plain type="info" size="small" icon="el-icon-document">导出全部</el-button>
				</section>
			</section>
			<section class="p-20 flex-center flex-space-b">
				<section>
					<el-button size="small">近7天</el-button>
					<el-button size="small" class="m-r-10">近30天</el-button>
					<el-date-picker
						v-model="chooseDate"
						type="daterange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						size="small"
					></el-date-picker>
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
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="date" label="性别"></el-table-column>
					<el-table-column prop="address" label="身份证号"></el-table-column>
					<el-table-column prop="address" label="手机号"></el-table-column>
					<el-table-column prop="address" label="读者卡号"></el-table-column>
					<el-table-column prop="address" label="用户组"></el-table-column>
					<el-table-column prop="address" label="创建时间"></el-table-column>
					<el-table-column prop="address" label="累计借阅"></el-table-column>
					<el-table-column prop="address" label="借阅记录">
						<template v-slot="scope">
							<el-button type="text" size="small" @click="handleClick(scope.row)">
								查看
								<span class="el-icon-arrow-right col-6" />
							</el-button>
						</template>
					</el-table-column>
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
				></el-pagination>
				<span class="f-s-12 col-2">共123条记录</span>
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
