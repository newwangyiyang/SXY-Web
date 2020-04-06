<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { caigouShowPage, doBookShoping, doBookShoped, deleteBookShop } from '@/api/tushuguanli';
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
			tableData: [],
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
		},
		stateValue() {
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
			this.totalRow = data.totalRow;
			this.tableData = data.list;
		},
		handleCurrentChange() {
			this.initCaiGouTableData();
		},
		// 查询按钮
		searchBtn() {
			this.currentPage = 1;
			this.initCaiGouTableData();
		},
		// 重置按钮
		resetBtn() {
			this.currentPage = 1;
			this.stateValue = '';
			this.jiangouTitle = '';
			this.chooseDate = this.initChooseDate();
		},
		// 处理状态
		async statusHandler(item, id) {
			await [this.doBookShopingHandler, this.doBookShopedHandler][item](id);
			this.$message({ type: 'success', message: '处理成功！' });
			this.initCaiGouTableData();
		},

		// 采购中
		async doBookShopingHandler(id) {
			await doBookShoping({ id });
		},

		// 已上架
		async doBookShopedHandler(id) {
			await doBookShoped({ id });
		},

		// 删除
		async deleteBookShopHandler(id) {
			this.$confirm('此操作将永久删除此记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await deleteBookShop({ id });
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.initCaiGouTableData();
				})
				.catch(() => {});
		}
	}
};
</script>
<template>
	<div class="tsjg-wrap">
		<div class="content-wrap">
			<TableHeaderCustomeBtn title="图书采购">
				<template #right-btn>
					<div>
						<el-button plain type="info" size="small" icon="el-icon-refresh">状态</el-button>
						<el-button plain type="info" size="small" icon="el-icon-delete">删除</el-button>
						<el-button plain type="info" size="small" icon="el-icon-document">导出当前</el-button>
						<el-button plain type="info" size="small" icon="el-icon-document">导出全部</el-button>
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
					<el-input v-model="jiangouTitle" size="small" class="w-200 m-l-20" placeholder="请输入荐购题名"></el-input>
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
					<el-button type="primary" size="small" @click="searchBtn">查询</el-button>
					<el-button size="small" @click="resetBtn">重置</el-button>
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
					<el-table-column label="处理状态">
						<template v-slot="{row}">
							<div v-if="row.status === 2">
								<span class="f-s-12 col-2">已上架</span>
							</div>
							<!-- 未处理 -->
							<div v-else-if="row.status === 0">
								<el-dropdown @command="statusHandler($event, row.id)">
									<span class="col-6 f-s-12">
										未处理
										<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item :command="0">采购中</el-dropdown-item>
											<el-dropdown-item :command="1">上架</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
							<div v-else-if="row.status === 1">
								<el-dropdown @command="statusHandler($event, row.id)">
									<span class="col-6 f-s-12">
										采购中
										<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item :command="1">上架</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right">
						<template v-slot="{row}">
							<el-button
								type="text"
								size="small"
								icon="el-icon-delete"
								@click="deleteBookShopHandler(row.id)"
							>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</section>
			<section class="p-r-20 p-b-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="currentPage"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="totalRow"
					background
					@current-change="handleCurrentChange"
				></el-pagination>
				<span class="f-s-12 col-2">共{{totalRow}}条记录</span>
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
