<script>
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { bookBorrowRankPage } from '@/api/yunyingzhongxin';
const limit = 10;
export default {
	name: 'Remenjieyuebangdan',
	components: {
		TableHeader
	},
	mixins,
	data() {
		return {
			// 开始日期结束日期
			chooseDate: [],
			// 7天或30天按钮
			chooseSevenOrThirty: 'seven',
			// 表格数据
			hotBorrowData: [],
			pageSize: limit,
			// 总数
			totalRow: 0,
			currentPage: 1
		};
	},
	watch: {
		chooseDate() {
			this.currentPage = 1;
			this.initHotBorrowDataList();
		}
	},
	mounted() {
		this.chooseDate = this.initChooseDate();
		this.initHotBorrowDataList();
	},
	methods: {
		handleCurrentChange() {
			this.initHotBorrowDataList();
		},
		// 1、导出当前按钮
		handlerExportSelected() {
			console.log('handlerExportSelected');
		},
		// 2、导出全部按钮
		handlerExportAll() {
			console.log('handlerExportAll');
		},
		// 日期选择
		handlerDateOrDay(value) {
			if (this.chooseSevenOrThirty === value) return;
			const dayStrArr = ['seven', 'thirty'];
			if (dayStrArr.includes(value)) {
				this.chooseSevenOrThirty = value;
				this.chooseDate = this.changeChooseDateHandler(value);
			} else {
				this.chooseSevenOrThirty = '';
			}
		},
		// 分页数据获取
		async initHotBorrowDataList() {
			const { data } = await bookBorrowRankPage({
				startdate: this.chooseDate[0],
				enddate: this.chooseDate[1],
				pageNo: this.currentPage,
				pageSize: this.pageSize
			});
			this.hotBorrowData = data.list;
			this.totalRow = data.totalRow;
		}
	}
};
</script>
<template>
	<div class="tsjysj-wrap">
		<div class="content-wrap">
			<TableHeader
				title="热门借阅榜单"
				@handlerExportSelected="handlerExportSelected"
				@handlerExportAll="handlerExportAll"
			/>
			<section class="p-20 flex-center flex-space-b">
				<section>
					<el-button
						size="small"
						:type="chooseSevenOrThirty === 'seven' ? 'primary' : 'default'"
						@click="handlerDateOrDay('seven')"
						>近7天</el-button
					>
					<el-button
						size="small"
						:type="chooseSevenOrThirty === 'thirty' ? 'primary' : 'default'"
						class="m-r-10"
						@click="handlerDateOrDay('thirty')"
						>近30天</el-button
					>
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
						@change="handlerDateOrDay"
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
					:data="hotBorrowData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="title" label="题名"></el-table-column>
					<el-table-column prop="author" label="作者"></el-table-column>
					<el-table-column prop="publisher" label="出版社"></el-table-column>
					<el-table-column prop="isbn" label="ISBN"></el-table-column>
					<el-table-column prop="callno" label="条码号"></el-table-column>
					<el-table-column prop="item" label="索书号"></el-table-column>
					<el-table-column prop="borrow_count" label="累计借阅"></el-table-column>
					<el-table-column label="借阅记录">
						<template v-slot="{ row }">
							<el-button
								size="small"
								type="text"
								@click="
									() => {
										row;
									}
								"
								>查看</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</section>
			<section class="p-r-20 p-b-10 flex-center flex-space-b">
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
	padding: 20px;
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
