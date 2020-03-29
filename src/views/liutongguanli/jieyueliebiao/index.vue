<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { borrowSearchList } from '@/api/liutongguanli';
const limit = 10;
export default {
	name: 'Jieyueliebiao',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			name: '',
			duzeNum: '',
			timing: '',
			tiaomahao: '',
			chooseDate: [],
			stateOptions: [
				{
					value: '',
					label: '全部状态'
				},
				{
					value: '0',
					label: '借出'
				},
				{
					value: '1',
					label: '归还'
				},
				{
					value: '2',
					label: '超借'
				},
				{
					value: '3',
					label: '逾期'
				},
				{
					value: '4',
					label: '逾期超借'
				}
			],
			stateValue: '',
			tableData: [],
			// 分页
			currentPage: 1,
			pageSize: limit,
			totalRow: 0
		};
	},
	watch: {
		chooseDate() {
			this.initBorrowTableData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 初始化借阅列表
		async initBorrowTableData() {
			const { data } = await borrowSearchList({
				...this.initDateParams(this.chooseDate),
				name: this.name,
				card_number: this.duzeNum,
				title: this.timing,
				item: this.tiaomahao,
				type: this.stateValue
			});
			this.tableData = data.list;
			this.totalRow = data.totalRow;
		},
		handleCurrentChange(currentPage) {
			if (this.currentPage === currentPage) return;
			this.initBorrowTableData();
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
	<div class="jylb-wrap">
		<div class="content-wrap">
			<TableHeader
				title="借阅列表"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<div class="p-20">
				<el-row :gutter="20" type="flex" justify="space-between">
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">姓名:</span>
						<el-input
							v-model="name"
							class="flex1"
							size="small"
							placeholder="请输入姓名"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">读者卡号:</span>
						<el-input
							v-model="duzeNum"
							class="flex1"
							size="small"
							placeholder="请输入读者卡号"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">题名:</span>
						<el-input
							v-model="timing"
							class="flex1"
							size="small"
							placeholder="请输入题名"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">条码号:</span>
						<el-input
							v-model="tiaomahao"
							class="flex1"
							size="small"
							placeholder="请输入条码号"
						/>
					</el-col>
					<el-col :span="4">
						<div class="flex-center flex-right">
							<el-button type="primary" size="small">查询</el-button>
							<el-button size="small">重置</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="p-r-20 p-l-20 p-b-20">
				<el-row :gutter="20">
					<el-col :span="7">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">时间选择:</span>
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
								class="flex1"
							></el-date-picker>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">借阅状态:</span>
							<el-select
								v-model="stateValue"
								class="flex1"
								size="small"
								placeholder="借阅状态"
							>
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>
					</el-col>
				</el-row>
			</div>
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
					<el-table-column prop="name" label="题名"></el-table-column>
					<el-table-column prop="date" label="ISBN"></el-table-column>
					<el-table-column prop="address" label="条码号"></el-table-column>
					<el-table-column prop="address" label="姓名"></el-table-column>
					<el-table-column prop="address" label="读者卡号"></el-table-column>
					<el-table-column prop="date" label="借阅时间"></el-table-column>
					<el-table-column prop="date" label="到期时间"></el-table-column>
					<el-table-column prop="date" label="归还时间"></el-table-column>
					<el-table-column label="借阅状态">
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
.jylb-wrap {
	padding: 20px;
	background-color: #fff;
}
</style>
