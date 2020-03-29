<script>
import TableHeaderNavMenu from '@/components/TableHeaderNavMenu';
import mixins from '@/utils/mixins-vue';
import {
	getUserInfoByNum,
	getInfoByItem,
	borrowBookByArr,
	returnBookByArr
} from '@/api/liutongguanli';
export default {
	name: 'Jiehuanshu',
	components: {
		TableHeaderNavMenu
	},
	mixins,
	data() {
		return {
			activeIndex: 0,
			// 借书
			// 读者卡号
			duzeNum: '',
			tableDataByNum: [],
			duzeUserInfo: {
				borrow_count: 0,
				name: '',
				can_borrow_count: 0
			},
			itemSelectedListByNum: [],
			// 条形码
			item: '',
			tableDataByItem: [],
			itemSelectedListByItem: [],
			// 还书
			huanItem: '',
			huanTableDataByItem: [],
			huanItemSelectedListByItem: []
		};
	},
	inject: ['reload'],
	methods: {
		// 根据读者卡号获取图书数据
		async initBookInfoByCardNum() {
			const { data } = await getUserInfoByNum({
				card_number: this.duzeNum
			});
			this.tableDataByNum = data.borrowList;
			this.duzeUserInfo = {
				borrow_count: data.borrow_count,
				name: data.name,
				can_borrow_count: data.can_borrow_count
			};
		},

		// 根据条形码获取图书信息
		async initBookInfoByItem() {
			const { data } = await getInfoByItem({
				item: this.item
			});
			this.tableDataByItem.push(data);
		},

		// 批量借书
		async borrowBooksByArrHandler() {
			const {
				// eslint-disable-next-line no-unused-vars
				data: { borrow_ok_list, borrow_fail_list }
			} = await borrowBookByArr({
				card_number: this.duzeNum,
				items: this.itemSelectedListByNum
					.map((item) => item.item)
					.concat(this.itemSelectedListByItem.map((item) => item.item))
					.join(']]')
			});
			if (borrow_ok_list.length > 0) {
				const titles = borrow_ok_list.map((item) => item.title).join(',');
				this.$message({ type: 'success', message: `${titles}已成功借出` });
			}
			// if (borrow_fail_list.length > 0) {
			// 	const titles = borrow_fail_list.map(item => item.title).join(',')
			// 	this.$message({ type: 'success', message:  `${titles}已成功借出`});
			// }
		},

		async initHuanBookInfoByItem() {
			const { data } = await getInfoByItem({
				item: this.huanItem
			});
			this.huanTableDataByItem.push(data);
		},

		// 借书table多选
		handleSelectionChangeByNum(res) {
			this.itemSelectedListByNum = res;
		},
		handleSelectionChangeByItem(res) {
			this.itemSelectedListByItem = res;
		},

		// 还书table多选
		handleHuanSelecteionChangeByItem(res) {
			this.huanItemSelectedListByItem = res;
		},

		// 批量还书
		async returnBooksByArrHandler() {
			const {
				// eslint-disable-next-line no-unused-vars
				data: { return_ok_list, return_fail_list }
			} = await returnBookByArr({
				items: this.huanItemSelectedListByItem.map((item) => item.item).join(']]')
			});
			if (return_ok_list.length > 0) {
				this.reload();
				const titles = return_ok_list.map((item) => item.title).join(',');
				this.$message({ type: 'success', message: `${titles}已成功归还` });
			}
		},

		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<template>
	<div class="jhs-wrap">
		<div class="content-wrap main-wrap">
			<TableHeaderNavMenu :titleArr="['借书', '还书']" :activeIndex.sync="activeIndex" />
			<section v-if="activeIndex === 0">
				<section>
					<el-row :gutter="20" class="p-20 flex-center">
						<el-col :span="5" class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">读者卡号:</span>
							<el-input
								v-model="duzeNum"
								class="flex1"
								size="small"
								placeholder="请输入读者卡号"
								@keyup.enter.native="initBookInfoByCardNum"
							/>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" size="small">人脸识别</el-button>
							<el-button type="primary" size="small" @click="initBookInfoByCardNum"
								>确定</el-button
							>
						</el-col>

						<el-col v-if="duzeUserInfo.name" :span="6" :offset="9">
							<div class="flex-center flex-right">
								<div class="col-1">
									<span class="f-s-14">读者姓名：</span>
									<span class="f-s-18">{{ duzeUserInfo.name }}</span>
								</div>
								<span class="m-l-30 col-1 f-s-16"
									>已借 {{ duzeUserInfo.borrow_count }} 本，可借
									{{ duzeUserInfo.can_borrow_count }} 本</span
								>
							</div>
						</el-col>
						<el-col v-else :span="6" :offset="9"></el-col>
					</el-row>
					<el-table
						:cell-style="cellStyle"
						:header-cell-style="headerCellStyle"
						:data="tableDataByNum"
						highlight-current-row
						border
						style="width: 100%"
						@selection-change="handleSelectionChangeByNum"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column type="index" width="55" label="序号"></el-table-column>
						<el-table-column prop="title" label="题名"></el-table-column>
						<el-table-column prop="isbn" label="ISBN"></el-table-column>
						<el-table-column prop="item" label="条码号"></el-table-column>
						<el-table-column prop="gmt_borrow" label="借阅时间"></el-table-column>
						<el-table-column prop="gmt_expire" label="到期时间"></el-table-column>
						<el-table-column label="借阅状态" fixed="right">
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
					</el-table>
				</section>
				<section>
					<el-row :gutter="20" class="p-20">
						<el-col :span="5" class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">条码号:</span>
							<el-input
								v-model="item"
								class="flex1"
								size="small"
								placeholder="请输入条码号"
								@keyup.enter.native="initBookInfoByItem"
							/>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" size="small" @click="initBookInfoByItem"
								>确定</el-button
							>
						</el-col>
					</el-row>
					<el-table
						:cell-style="cellStyle"
						:header-cell-style="headerCellStyle"
						:data="tableDataByItem"
						highlight-current-row
						border
						style="width: 100%"
						@selection-change="handleSelectionChangeByItem"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column type="index" width="55" label="序号"></el-table-column>
						<el-table-column prop="title" label="题名"></el-table-column>
						<el-table-column prop="isbn" label="ISBN"></el-table-column>
						<el-table-column prop="item" label="条码号"></el-table-column>
						<el-table-column prop="callno" label="索书号"></el-table-column>
						<el-table-column prop="classify_name" label="图书类别"></el-table-column>
						<el-table-column label="操作" fixed="right">
							<template v-slot="scope">
								<el-button
									type="text"
									size="small"
									class="btn-customer"
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
				<section class="h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20" @click="borrowBooksByArrHandler"
						>借书</el-button
					>
				</section>
			</section>
			<section v-if="activeIndex === 1">
				<section>
					<el-row :gutter="20" class="p-20">
						<el-col :span="5" class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">条码号:</span>
							<el-input
								v-model="huanItem"
								class="flex1"
								size="small"
								placeholder="请输入条码号"
								@keyup.enter.native="initHuanBookInfoByItem"
							/>
						</el-col>
						<el-col :span="4">
							<el-button type="primary" size="small" @click="initHuanBookInfoByItem"
								>确定</el-button
							>
						</el-col>
					</el-row>
					<el-table
						:cell-style="cellStyle"
						:header-cell-style="headerCellStyle"
						:data="huanTableDataByItem"
						highlight-current-row
						border
						style="width: 100%"
						@selection-change="handleHuanSelecteionChangeByItem"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column type="index" width="55" label="序号"></el-table-column>
						<el-table-column prop="title" label="题名"></el-table-column>
						<el-table-column prop="isbn" label="ISBN"></el-table-column>
						<el-table-column prop="item" label="条码号"></el-table-column>
						<el-table-column prop="callno" label="索书号"></el-table-column>
						<el-table-column prop="user_name" label="借阅姓名"></el-table-column>
						<el-table-column label="借阅状态">
							<template v-slot="{ row: { format_status } }">
								<span v-if="format_status === 0">借出</span>
								<span v-else-if="format_status === 1">归还</span>
								<span v-else-if="format_status === 2">超借</span>
								<span v-else-if="format_status === 3">逾期</span>
								<span v-else-if="format_status === 4">超借逾期</span>
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
								</el-dropdown> -->
							</template>
						</el-table-column>
						<el-table-column label="图书状态">
							<template v-slot="{ row: status }">
								<span v-if="status === 1" class="f-s-12 col-1">在馆</span>
								<span v-else-if="status === 2" class="f-s-12 col-1">流通中</span>
								<span v-else-if="status === 3" class="f-s-12 col-1">破损</span>
								<span v-else class="f-s-12 col-1">未处理</span>
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
								</el-dropdown> -->
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right">
							<template v-slot="scope">
								<el-button
									type="text"
									size="small"
									class="btn-customer"
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
				<section class="h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20" @click="returnBooksByArrHandler"
						>还书</el-button
					>
				</section>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.jhs-wrap {
	background-color: #fff;
	padding: 20px;
	.btn-customer {
		padding: 0;
	}
}
</style>
