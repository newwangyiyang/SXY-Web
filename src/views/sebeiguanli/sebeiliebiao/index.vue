<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { deviceSearch } from '@/api/shebeiguanli';
export default {
	name: 'Sebeiliebiao',
	components: {
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			stateOptions: [
				{
					value: '',
					label: '全部状态'
				},
				{
					value: '0',
					label: '在线'
				},
				{
					value: '1',
					label: '离线'
				}
			],
			tableData: [],
			stateValue: '',
			sbName: '',
			sbNum: ''
		};
	},
	mounted() {
		this.initDeviceSearch();
	},
	methods: {
		// 设备列表初始化
		async initDeviceSearch() {
			const { data } = await deviceSearch({
				name: this.sbName,
				number: this.sbNum,
				status: this.stateValue
			});
			this.tableData = data;
		},

		// 重置各种状态
		resetValue() {
			this.tableData = [];
			this.sbName = this.sbNum = this.stateValue = '';
		},

		goSBPZ() {
			this.$router.push({ name: 'Shebeipeizhi' });
		}
	}
};
</script>
<template>
	<div class="sblb-wrap">
		<section v-if="!isDeepRouterView" class="content-wrap">
			<TableHeaderCustomeBtn title="设备列表">
				<template #right-btn>
					<el-button plain type="info" size="small" icon="el-icon-remove">停用</el-button>
				</template>
			</TableHeaderCustomeBtn>
			<section class="p-20 flex-center flex-space-b">
				<section class="flex-center">
					<section class="flex-center">
						<span class="input-title col-1 f-s-14">设备名称:</span>
						<el-input
							v-model="sbName"
							class="flex1"
							size="small"
							placeholder="请输入姓名"
						/>
					</section>
					<section class="flex-center m-l-20">
						<span class="input-title col-1 f-s-14">设备编号:</span>
						<el-input
							v-model="sbNum"
							class="flex1"
							size="small"
							placeholder="请输入姓名"
						/>
					</section>
					<section class="flex-center m-l-20">
						<span class="input-title col-1 f-s-14">设备状态:</span>
						<el-select
							v-model="stateValue"
							class="m-r-20"
							size="small"
							placeholder="设备状态"
						>
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</section>
				</section>
				<section>
					<el-button type="primary" size="small" @click="initDeviceSearch"
						>查询</el-button
					>
					<el-button size="small" @click="resetValue">重置</el-button>
				</section>
			</section>
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
				<el-table-column prop="number" label="设备编号"></el-table-column>
				<el-table-column prop="model" label="型号"></el-table-column>
				<el-table-column prop="version" label="软件版本"></el-table-column>
				<el-table-column prop="book_count" label="现存书量"></el-table-column>
				<el-table-column label="状态">
					<template v-slot="{ row: { status } }">
						<span v-if="status === 0">在线</span>
						<span v-else-if="status === 1">离线</span>
					</template>
				</el-table-column>
				<el-table-column prop="gmt_update" label="离线时间"></el-table-column>
				<el-table-column label="操作" fixed="right">
					<template v-slot="scope">
						<el-button
							type="text"
							size="small"
							class="btn-customer"
							icon="el-icon-setting"
							@click="goSBPZ"
							>设备配置</el-button
						>
						<el-button
							type="text"
							size="small"
							class="btn-customer"
							icon="el-icon-remove"
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
		<router-view v-else />
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.sblb-wrap {
	padding: 20px;
	background-color: #fff;
	.btn-customer {
		padding: 0;
	}
}
</style>
