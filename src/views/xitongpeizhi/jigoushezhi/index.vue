<script>
import TableHeaderNavMenu from '@/components/TableHeaderNavMenu';
import TableHeader from '@/components/TableHeader';
import mixins from '@/utils/mixins-vue';
import { deptList } from '@/api/xitongpeizhi';
export default {
	name: 'Jigoushezhi',
	components: {
		TableHeaderNavMenu,
		TableHeader
	},
	mixins,
	data() {
		return {
			// tab控制
			activeIndex: 1,
			// 用户组列表
			deptListTableData: [],

			activeCardIndex: 0,
			options: [
				{
					value: '0',
					label: '中图分类法'
				},
				{
					value: '1',
					label: '自定义分类'
				}
			],
			bookCategory: '0',
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
			isShowExportBtn: false
		};
	},
	watch: {
		activeIndex(newVal) {
			this.isShowExportBtn = newVal === 1 ? true : false;
		}
	},
	mounted() {
		this.initDeptListTableData();
	},
	methods: {
		changCardWayHandler(index) {
			this.activeCardIndex = index;
		},
		// 初始化用户组
		async initDeptListTableData() {
			const { data } = await deptList();
			this.deptListTableData = data;
		}
	}
};
</script>
<template>
	<div class="jgsz-wrap">
		<section class="content-wrap main-wrap">
			<TableHeaderNavMenu
				:titleArr="['图书分类设置', '用户组管理']"
				:isShowExportBtn="isShowExportBtn"
				:activeIndex.sync="activeIndex"
			>
				<template #right-btn>
					<el-button plain type="info" size="small" icon="el-icon-document-add"
						>新建</el-button
					>
					<el-button plain type="info" size="small" icon="el-icon-delete">删除</el-button>
				</template>
			</TableHeaderNavMenu>
			<section v-if="activeIndex === 0" class="p-20">
				<div>
					<span class="col-1 f-s-14 m-r-20">图书分类方式</span>
					<el-select v-model="bookCategory" size="small">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</div>
				<div v-if="bookCategory === '0'" class="flex-center flex-space-b flex-wrap">
					<el-tag v-for="item in 22" :key="item" class="m-t-20"
						>马克思主义、列宁主义、毛泽东思想</el-tag
					>
				</div>
				<div v-if="bookCategory === '1'">
					<div class="flex-center flex-left flex-wrap">
						<el-tag v-for="item in 10" :key="item" class="m-t-20 m-r-20" closable
							>科技类</el-tag
						>
					</div>
					<div class="m-t-20">
						<el-button type="primary" size="small">新增分类</el-button>
					</div>
				</div>
			</section>
			<section v-else-if="activeIndex === 1">
				<el-table
					:cell-style="cellStyle"
					:header-cell-style="headerCellStyle"
					:data="deptListTableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="用户组名称"></el-table-column>
					<el-table-column prop="borrow_count" label="可借本书"></el-table-column>
					<el-table-column prop="borrow_period" label="借阅周期"></el-table-column>
					<el-table-column prop="renew_time" label="续借次数"></el-table-column>
					<el-table-column prop="renew_period" label="续借周期"></el-table-column>
					<el-table-column prop="user_count" label="用户组人数"></el-table-column>
					<el-table-column label="操作" width="180">
						<template v-slot="scope">
							<el-button
								type="text"
								icon="el-icon-edit"
								class="do-btn"
								size="small"
								@click="handleClick(scope.row)"
								>编辑</el-button
							>
							<el-button
								type="text"
								icon="el-icon-delete"
								class="do-btn"
								size="small"
								@click="handleClick(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</section>
		</section>
		<section v-if="activeIndex === 0">
			<section class="content-wrap m-t-20">
				<TableHeader title="索书号定义" :isShowExportBtn="false" />
				<div class="flex-center flex-space-b p-20">
					<div
						v-for="(item, index) in 3"
						:key="item"
						:class="[
							'way-card f-s-14 col-1',
							{ 'active-acrd': index === activeCardIndex }
						]"
						@click="changCardWayHandler(index)"
					>
						<div class="way-title flex-center flex-space-b p-l-10">
							<span class="f-s-18 col-1">方式一</span>
							<span class="el-icon-check f-s-24 bold"></span>
						</div>
						<span
							>中图法分类号 + / + 当前中图法下图书总数量 例如： I207.414/248，I207.414
							代表中图法分类哈，248代表当前分类号下总共有248本馆藏图书</span
						>
					</div>
				</div>
			</section>

			<section class="m-t-50 flex-center p-b-20">
				<el-button>取消</el-button>
				<el-button type="primary" class="w-200">保存设置</el-button>
			</section>
		</section>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.jgsz-wrap {
	background-color: #fff;
	padding: 20px;
	position: relative;
	.way-wrap {
		height: 130px;
	}
	.way-card {
		border: 1px solid #d8d8d8;
		height: 140px;
		width: 26%;
		border-radius: 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		cursor: pointer;
		&.active-acrd {
			background-color: #edf3fc;
			.way-title {
				color: #fbbc0e;
				&::before {
					background-color: #fbbc0e;
				}
			}
		}
	}
	.way-title {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 4px;
			height: 20px;
			background-color: #b0b0b0;
		}
	}
	.do-btn {
		padding: 0;
	}
}
</style>
