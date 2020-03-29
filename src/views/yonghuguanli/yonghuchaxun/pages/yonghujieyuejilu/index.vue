<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { getBorrowList } from '@/api/yonghuguanli';
export default {
	name: 'Yonghujieyuejilu',
	components: {
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			formSearch: {
				pageNumber: 1,
				pageSize: 10,
				uid: '',
				title: '',
				status: '',
				starttime: '',
				endtime: ''
			},
			// 创建时间选择框
			chooseDate: '',
			// 借阅记录
			tableData: [],
			currentPage: 5,
			// 借阅人
			name: '',
			// 已借阅数量
			borrow_count: '',
			// 可借阅数量
			org_borrow_count: '',
			// 总数量
			totalRow: 0,
			stateOptions: [
				{
					value: '0',
					label: '全部状态'
				},
				{
					value: '1',
					label: '流通中'
				},
				{
					value: '2',
					label: '在馆'
				},
				{
					value: '3',
					label: '破损'
				}
			]
		};
	},
	mounted() {
		this.formSearch.uid = this.$route.query.uid;
		this.getBorrowList();
	},
	methods: {
		// 借阅记录查询
		async getBorrowList() {
			if (this.chooseDate) {
				this.formSearch.starttime = this.chooseDate[0];
				this.formSearch.endtime = this.chooseDate[1];
			}
			const { data, org_borrow_count, name, borrow_count } = await getBorrowList(
				this.formSearch
			);
			this.totalRow = data.totalRow;
			this.tableData = data.list;
			this.org_borrow_count = org_borrow_count;
			this.name = name;
			this.borrow_count = borrow_count;
		},
		// 重置
		reset() {
			this.formSearch.title = '';
			this.formSearch.status = '';
			this.chooseDate = '';
			this.handleCurrentChange(1);
		},
		// 分页切换
		handleCurrentChange(currentPage) {
			this.formSearch.pageNumber = currentPage;
			this.getBorrowList();
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
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<TableHeaderCustomeBtn :title="name+' 借阅记录'">
				<template #title-msg>
					<span class="f-s-14 col-3 m-l-10">可借{{org_borrow_count}}本，已借{{borrow_count}}本</span>
				</template>
				<template #right-btn>
					<el-button
						plain
						type="info"
						size="small"
						icon="el-icon-document"
						@click="handlerExportSelected"
					>导出当前</el-button>
					<el-button
						plain
						type="info"
						size="small"
						icon="el-icon-document"
						@click="handlerExportAll"
					>导出全部</el-button>
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
					<el-input v-model="formSearch.title" size="small" class="w-200 m-l-20" placeholder="请输入书名"></el-input>
					<el-select v-model="formSearch.status" class="m-l-20" size="small" placeholder="借阅状态">
						<el-option
							v-for="item in stateOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</section>
				<section>
					<el-button type="primary" size="small" @click="handleCurrentChange(1)">查询</el-button>
					<el-button size="small" @click="reset">重置</el-button>
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
					<el-table-column prop="title" label="题名"></el-table-column>
					<el-table-column prop="isbn" label="ISBN"></el-table-column>
					<el-table-column prop="item" label="条码号"></el-table-column>
					<el-table-column prop="gmt_borrow" label="借阅时间"></el-table-column>
					<el-table-column prop="gmt_expire" label="到期时间"></el-table-column>
					<el-table-column prop="gmt_return" label="归还时间"></el-table-column>
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
					<el-table-column prop="operator" label="处理人"></el-table-column>
				</el-table>
			</section>
			<section class="p-r-20 p-b-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="formSearch.pageNumber"
					:page-size="formSearch.pageSize"
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
.tsjysj-wrap {
	background-color: #fff;
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
