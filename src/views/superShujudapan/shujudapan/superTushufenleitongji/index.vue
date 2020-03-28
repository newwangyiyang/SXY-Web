<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'SuperTushufenleitongji',
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
					value: '0',
					label: '全部'
				},
				{
					value: '1',
					label: '教育类'
				},
				{
					value: '2',
					label: '科技类'
				},
				{
					value: '3',
					label: '科学类'
				},
				{
					value: '4',
					label: '健康类'
				},
				{
					value: '5',
					label: '法律类'
				}
			],
			value: '0'
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
		<div class="content-wrap">
			<TableHeader
				title="图书分类统计"
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
			<section class="p-r-20 p-l-20 p-b-20 flex-center flex-space-b">
				<section>
					<el-select v-model="value" class="m-r-20" size="small" placeholder="图书类别">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
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
						:clearable="false"
						size="small"
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
					<el-table-column prop="address" label="图书总量"></el-table-column>
					<el-table-column prop="address" label="总量占比"></el-table-column>
					<el-table-column prop="address" label="借出数量"></el-table-column>
					<el-table-column prop="address" label="借出占比"></el-table-column>
				</el-table>
			</section>
			<section class="p-r-20 p-b-20 flex-center flex-space-b">
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
