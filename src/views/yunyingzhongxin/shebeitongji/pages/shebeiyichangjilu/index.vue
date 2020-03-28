<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Shebeiyichang',
	components: {
		TableHeader
	},
	mixins,
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
					value: '0',
					label: '全部状态'
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
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<TableHeader
				title="设备异常"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-20 flex-center flex-space-b">
				<section>
					<el-select v-model="value" class="m-r-20" size="small">
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
					<el-table-column prop="name" label="设备名称"></el-table-column>
					<el-table-column prop="date" label="故障类型"></el-table-column>
					<el-table-column prop="date" label="故障时间"></el-table-column>
					<el-table-column prop="date" label="处理时间"></el-table-column>
					<el-table-column label="处理状态">
						<template v-slot="scope">
							<el-dropdown>
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
							</el-dropdown>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="处理人"></el-table-column>
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

	.sg-choose-wrap {
		height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 6px;
	}
}
</style>
