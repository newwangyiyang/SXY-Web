<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'SuperJieyuedarenbangdan',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 馆藏地全选控制
			checkAll: true,
			checkedGCList: ['中心馆', '书柜名称'],
			guancangList: ['中心馆', '书柜名称'],
			isIndeterminate: false,
			// 开始日期结束日期
			chooseDate: [],
			// 7天或30天按钮
			chooseSevenOrThirty: 'seven',
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
		handleCurrentChange(currentPage) {},
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
			const dayStrArr = ['seven', 'thirty'];
			if (dayStrArr.includes(value)) {
				this.chooseSevenOrThirty = value;
				this.chooseDate = [];
			} else {
				this.chooseSevenOrThirty = '';
			}
		},
		// 馆藏地全选按钮控制
		handleCheckAllChange(val) {
			this.checkedGCList = val ? this.guancangList : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.guancangList.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.guancangList.length;
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
			<section class="p-20 flex-center">
				<div class="sg-choose-wrap flex1 col-1 f-s-14 flex-center p-l-20 flex-left">
					<span class="m-r-30 col-1">机构名称</span>
					<el-checkbox
						v-model="checkAll"
						:indeterminate="isIndeterminate"
						@change="handleCheckAllChange"
						>全部机构</el-checkbox
					>
					<el-checkbox-group
						v-model="checkedGCList"
						class="m-l-20"
						@change="handleCheckedCitiesChange"
					>
						<el-checkbox v-for="gc in guancangList" :key="gc" :label="gc">{{
							gc
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
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="姓名" width="100"></el-table-column>
					<el-table-column prop="name" label="性别" width="100"></el-table-column>
					<el-table-column prop="address" label="身份证号"></el-table-column>
					<el-table-column prop="address" label="手机号"></el-table-column>
					<el-table-column prop="address" label="读者卡号"></el-table-column>
					<el-table-column prop="address" label="用户组"></el-table-column>
					<el-table-column prop="address" label="机构名称"></el-table-column>
					<el-table-column prop="address" label="累计借阅"></el-table-column>
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
