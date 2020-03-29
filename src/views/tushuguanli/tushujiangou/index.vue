<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { recommendList } from '@/api/tushuguanli';
const limit = 10;
export default {
	name: 'Tushujiangou',
	components: {
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			// 时间
			chooseDate: [],
			tableData: [],
			// 状态列表
			stateOptions: [
				{
					value: '0',
					label: '全部状态'
				},
				{
					value: '1',
					label: '未处理'
				},
				{
					value: '2',
					label: '完成'
				},
				{
					value: '3',
					label: '驳回'
				},
				{
					value: '4',
					label: '采纳'
				},
				{
					value: '5',
					label: '待通知'
				}
			],
			// 选中的状态值
			stateValue: '0',
			// 荐购人
			jiangouren: '',
			// 分页
			currentPage: 1,
			pageSize: limit,
			totalRow: 0
		};
	},
	watch: {
		chooseDate() {
			this.initRecomandeData();
		},
		stateValue() {
			this.initRecomandeData();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
	},
	methods: {
		// 图书荐购列表查询
		async initRecomandeData() {
			const { data } = await recommendList({
				name: this.jiangouren,
				type: this.stateValue,
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				...this.initDateParams(this.chooseDate)
			});
			this.totalRow = data.totalRow;
			this.tableData = data.list;
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
						<el-button plain type="info" size="small" icon="el-icon-message"
							>通知</el-button
						>
						<el-button plain type="info" size="small" icon="el-icon-delete"
							>删除</el-button
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
						value-format="yyyy-MM-dd"
						:clearable="false"
						size="small"
					></el-date-picker>
					<el-input
						v-model="jiangouren"
						size="small"
						class="w-200 m-l-20"
						placeholder="请输入荐购人"
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
					<el-table-column prop="title" label="荐购题名"></el-table-column>
					<el-table-column prop="isbn" label="ISBN"></el-table-column>
					<el-table-column prop="author" label="作者"></el-table-column>
					<el-table-column prop="publisher" label="出版社"></el-table-column>
					<el-table-column prop="user_name" label="荐购人"></el-table-column>
					<el-table-column prop="gmt_create" label="荐购时间"></el-table-column>
					<el-table-column prop="reason" label="荐购理由"></el-table-column>
					<el-table-column label="处理状态">
						<template v-slot="{ row }">
							<span v-if="row.status === 3">采纳</span>
							<span v-else-if="row.status === 1">驳回</span>
							<span v-else-if="row.status === 2">上架</span>
							<el-dropdown v-else>
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
										<el-dropdown-item>采纳</el-dropdown-item>
										<el-dropdown-item>驳回</el-dropdown-item>
										<el-dropdown-item>上架</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template v-slot="scope">
							<el-button
								type="text"
								size="small"
								icon="el-icon-message"
								@click="
									() => {
										scope;
									}
								"
								>通知</el-button
							>
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
					<el-table-column prop="operator" label="处理人"></el-table-column>
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
.tsjg-wrap {
	padding: 20px;
	background-color: #fff;
}
</style>
