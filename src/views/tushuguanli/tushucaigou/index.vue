<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { caigouShowPage } from '@/api/tushuguanli';
const limit = 10;
export default {
	name: 'Tushucaigou',
	components: {
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			chooseDate: [],
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
			stateOptions: [
				{
					value: '',
					label: '全部状态'
				},
				{
					value: '0',
					label: '未处理'
				},
				{
					value: '1',
					label: '采购中'
				},
				{
					value: '2',
					label: '已处理'
				}
			],
			stateValue: '',
			jiangouTitle: '',

			// 分页
			pageSize: limit,
			currentPage: 1,
			totalRow: 0
		};
	},
	watch: {
		chooseDate() {
			this.initCaiGouTableData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 初始化图书采购列表
		async initCaiGouTableData() {
			const { data } = await caigouShowPage({
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				status: this.stateValue,
				title: this.jiangouTitle,
				...this.initDateParams(this.chooseDate)
			});
			console.log(data);
		},
		handleCurrentChange(currentPage) {}
	}
};
</script>
<template>
	<div class="tsjg-wrap">
		<div class="content-wrap">
			<TableHeaderCustomeBtn title="图书荐购">
				<template #right-btn>
					<div>
						<el-button plain type="info" size="small" icon="el-icon-refresh"
							>状态</el-button
						>
						<el-button plain type="info" size="small" icon="el-icon-delete"
							>删除</el-button
						>
						<el-button plain type="info" size="small" icon="el-icon-document"
							>导出当前</el-button
						>
						<el-button plain type="info" size="small" icon="el-icon-document"
							>导出全部</el-button
						>
					</div>
				</template>
			</TableHeaderCustomeBtn>
			<section class="p-20 flex-center flex-space-b">
				<section class="flex-center">
					<el-date-picker
						v-model="chooseDate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy / MM / dd"
						:clearable="false"
						value-format="yyyy-MM-dd"
						size="small"
					></el-date-picker>
					<el-input
						v-model="jiangouTitle"
						size="small"
						class="w-200 m-l-20"
						placeholder="请输入荐购题名"
					></el-input>
					<el-select v-model="stateValue" class="m-l-20 flex1" size="small">
						<el-option
							v-for="item in stateOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
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
					<el-table-column prop="name" label="荐购题名"></el-table-column>
					<el-table-column prop="date" label="ISBN"></el-table-column>
					<el-table-column prop="address" label="作者"></el-table-column>
					<el-table-column prop="address" label="出版社"></el-table-column>
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
					<el-table-column label="操作" fixed="right">
						<template v-slot="scope">
							<el-button
								type="text"
								size="small"
								icon="el-icon-delete"
								@click="
									() => {
										scope;
									}
								"
								>删除</el-button
							>
						</template>
					</el-table-column>
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
.tsjg-wrap {
	padding: 20px;
	background-color: #fff;
}
</style>
