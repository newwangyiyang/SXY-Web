<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'SuperShebeishiyongtongji',
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
			// 设备名称
			sbName: '',
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
					title: '合计',
					name: '100',
					address: '1'
				}
			]
		};
	},
	methods: {
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
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<section v-if="!isDeepRouterView">
			<div class="content-wrap">
				<TableHeader
					title="设备使用统计"
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
						>全部机构</el-checkbox>
						<el-checkbox-group v-model="checkedGCList" class="m-l-20" @change="handleCheckedCitiesChange">
							<el-checkbox v-for="gc in guancangList" :key="gc" :label="gc">{{gc}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</section>
				<section class="p-l-20 p-r-20 p-b-20 flex-center flex-space-b">
					<section class="flex-center">
						<span class="input-title col-1 f-s-14">设备名称:</span>
						<el-input v-model="sbName" class="flex1" size="small" placeholder="请输入设备名称"></el-input>
					</section>
					<section>
						<el-button type="primary" size="small">查询</el-button>
						<el-button size="small">重置</el-button>
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
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column type="index" width="55" label="序号"></el-table-column>
						<el-table-column prop="date" label="设备名称" width="200"></el-table-column>
						<el-table-column prop="date" label="机构名称" width="200"></el-table-column>
						<el-table-column prop="date" label="累计运行天数"></el-table-column>
						<el-table-column prop="name" label="离线时间"></el-table-column>
						<el-table-column prop="address" label="登录次数"></el-table-column>
						<el-table-column prop="address" label="借书次数"></el-table-column>
						<el-table-column prop="address" label="归还次数"></el-table-column>
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
						<template v-slot="{row}">
							<div>
								<span>{{row.title}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column width="200">
						<template>-</template>
					</el-table-column>
					<el-table-column width="200">
						<template>-</template>
					</el-table-column>
					<el-table-column>
						<template v-slot="{row}">
							<div class="flex-center flex-col flex-space-a">
								<span>累计运行天数</span>
								<span class="f-s-20">{{row.name}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column>
						<template>-</template>
					</el-table-column>
					<el-table-column>
						<template v-slot="{row}">
							<div class="flex-center flex-col flex-space-a">
								<span>登录次数</span>
								<span class="f-s-20">{{row.name}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column>
						<template v-slot="{row}">
							<div class="flex-center flex-col flex-space-a">
								<span>借书次数</span>
								<span class="f-s-20">{{row.name}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column>
						<template v-slot="{row}">
							<div class="flex-center flex-col flex-space-a">
								<span>归还次数</span>
								<span class="f-s-20">{{row.name}}</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</section>
		</section>
		<router-view v-else />
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
