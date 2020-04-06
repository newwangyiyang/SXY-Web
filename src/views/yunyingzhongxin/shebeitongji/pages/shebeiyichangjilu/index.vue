<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { deviceBreakPage, excelDeviceBreak } from '@/api/yunyingzhongxin';
const limit = 10;
export default {
	name: 'Shebeiyichang',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			chooseDate: [],
			// 分页
			tableData: [],
			currentPage: 1,
			pageSize: limit,
			totalRow: 0,
			options: [
				{
					value: '',
					label: '全部状态'
				},
				{
					value: 0,
					label: '否'
				},
				{
					value: 1,
					label: '是'
				}
			],
			value: '',
			ids: []
		};
	},
	watch: {
		chooseDate() {
			this.initDeviceListTableData();
		},
		value() {
			this.initDeviceListTableData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 初始化设备异常列表
		async initDeviceListTableData() {
			const { data } = await deviceBreakPage({
				...this.initDateParams(this.chooseDate),
				is_handle: this.value
			});
			this.tableData = data.list;
			this.totalRow = data.totalRow;
		},
		handleCurrentChange(currentPage) {
			this.initDeviceListTableData();
		},

		// 重置按钮
		resetHandlerBtn() {
			this.value = '';
		},
		// 1、导出当前按钮
		async handlerExportSelected() {
			if (this.ids.length <= 0) {
				this.$message('请选择你需要的导出内容');
			} else {
				const { data } = await excelDeviceBreak({ ids: this.ids.join(',') });
				this.downFile(data);
			}
		},
		// 2、导出全部按钮
		async handlerExportAll() {
			const { data } = await excelDeviceBreak();
			this.downFile(data);
		},
		// 3、 用户选择导出
		handleSelectionChange(selectList) {
			this.ids = selectList.map((item) => item.id);
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
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
					<el-button type="primary" size="small" @click="initDeviceListTableData">查询</el-button>
					<el-button size="small" @click="resetHandlerBtn">重置</el-button>
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
					<el-table-column prop="name" label="设备名称"></el-table-column>
					<el-table-column prop="msg" label="故障类型"></el-table-column>
					<el-table-column prop="gmt_occur" label="故障时间"></el-table-column>
					<el-table-column prop="gmt_handle" label="处理时间"></el-table-column>
					<el-table-column label="处理状态">
						<template v-slot="{ row }">
							<span v-if="row.is_handle === 0">未处理</span>
							<span v-else-if="row.is_handle === 1">已处理</span>
							<!-- <el-dropdown>
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
							</el-dropdown>-->
						</template>
					</el-table-column>
					<el-table-column prop="handle_name" label="处理人"></el-table-column>
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

	.sg-choose-wrap {
		height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 6px;
	}
}
</style>
