<script>
import TableHeader from '@/components/TableHeader';
import { deviceBorrowData, excelDeviceBorrowData } from '@/api/yunyingzhongxin';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Shebeishiyongtongji',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 馆藏地全选控制
			checkAll: true,
			checkedGCList: [],
			guancangList: [],
			isIndeterminate: false,
			// 开始日期结束日期
			chooseDate: [],
			// 分页
			tableData: [],
			totalTableData: [
				{
					title: '合计',
					online_count: 0,
					borrow_count: 0,
					login_count: 0,
					return_count: 0
				}
			],
			ids: []
		};
	},
	watch: {
		checkedGCList(newList) {
			if (newList.length > 0) {
				this.initDeviceTableData();
			}
		}
	},
	mounted() {
		this.initDeviceBorrowListData();
	},
	methods: {
		// 馆藏地全选按钮控制
		handleCheckAllChange(val) {
			this.checkedGCList = val ? this.guancangList.map((item) => item.did) : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.guancangList.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.guancangList.length;
		},
		// 设备列表
		async initDeviceBorrowListData() {
			const { data } = await deviceBorrowData();
			this.chooseDate = this.initChooseDate();
			this.checkedGCList = data.map((item) => item.did);
			this.guancangList = data;
			this.initDeviceTableData();
		},

		// tableData数据
		async initDeviceTableData() {
			const { data } = await deviceBorrowData({
				dids: this.checkedGCList.join(',')
			});
			this.tableData = data;
			this.initTotalTableData(data);
		},

		// 初始化合计数据
		initTotalTableData(list) {
			this.totalTableData = [
				{
					title: '合计',
					online_count: list.reduce((a, item) => a + item.online_count, 0),
					borrow_count: list.reduce((a, item) => a + item.borrow_count, 0),
					login_count: list.reduce((a, item) => a + item.login_count, 0),
					return_count: list.reduce((a, item) => a + item.return_count, 0)
				}
			];
		},

		// 重置按钮
		resetHandlerBtn() {
			this.checkedGCList = this.guancangList.map((item) => item.did);
		},
		// 1、导出当前按钮
		async handlerExportSelected() {
			if (this.ids.length <= 0) {
				this.$message('请选择你需要的导出内容');
			} else {
				const { data } = await excelDeviceBorrowData({ dids: this.ids.join(',') });
				this.downFile(data);
			}
		},
		// 2、导出全部按钮
		async handlerExportAll() {
			const { data } = await excelDeviceBorrowData();
			this.downFile(data);
		},
		// 3、 用户选择导出
		handleSelectionChange(selectList) {
			this.ids = selectList.map((item) => item.did);
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<TableHeader
				title="设备使用统计"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-20 flex-center flex-space-b">
				<div class="sg-choose-wrap flex1 col-1 f-s-14 flex-center p-l-20 flex-left">
					<span class="m-r-30 col-1">设备选择</span>
					<el-checkbox
						v-model="checkAll"
						:indeterminate="isIndeterminate"
						@change="handleCheckAllChange"
					>全部设备</el-checkbox>
					<el-checkbox-group v-model="checkedGCList" class="m-l-20" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="gc in guancangList" :key="gc.did" :label="gc.did">
							{{
							gc.name
							}}
						</el-checkbox>
					</el-checkbox-group>
				</div>
				<section class="search-btn">
					<el-button type="primary" size="small" @click="initDeviceTableData">查询</el-button>
					<el-button size="small" @click="resetHandlerBtn">重置</el-button>
				</section>
			</section>
			<section>
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
					<el-table-column prop="name" label="设备名称" width="200"></el-table-column>
					<el-table-column prop="online_count" label="累计运行天数"></el-table-column>
					<el-table-column prop="gmt_create" label="离线时间"></el-table-column>
					<el-table-column prop="login_count" label="登录次数"></el-table-column>
					<el-table-column prop="borrow_count" label="借书次数"></el-table-column>
					<el-table-column prop="return_count" label="归还次数"></el-table-column>
				</el-table>
			</section>
		</div>
		<section class="total-table-wrap bg-5 m-t-20">
			<el-table
				:cell-style="{
					textAlign: 'center',
					fontSize: 14,
					color: '#333',
					backgroundColor: '#EEF0F0',
					padding: 0
				}"
				:data="totalTableData"
				:show-header="false"
				highlight-current-row
				border
				style="width: 100%"
			>
				<el-table-column width="110">
					<template v-slot="{ row }">
						<div>
							<span>{{ row.title }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column width="200">
					<template>-</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>累计运行天数</span>
							<span class="f-s-20">{{ row.online_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template>-</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>登录次数</span>
							<span class="f-s-20">{{ row.login_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>借书次数</span>
							<span class="f-s-20">{{ row.borrow_count }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column>
					<template v-slot="{ row }">
						<div class="flex-center flex-col flex-space-a">
							<span>归还次数</span>
							<span class="f-s-20">{{ row.return_count }}</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</section>
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
		height: 34px;
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
	.search-btn {
		width: 120px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 20px;
	}
}
</style>
