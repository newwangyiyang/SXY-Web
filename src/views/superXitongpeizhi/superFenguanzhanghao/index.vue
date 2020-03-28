
<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'SuperFenguanzhanghao',
	components: {
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
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
			]
		};
	}
};
</script>
<template>
	<div class="jsgl-wrap">
		<div class="content-wrap">
			<TableHeaderCustomeBtn title="分馆账号">
				<template #right-btn>
					<el-button plain type="info" size="small" icon="el-icon-document-add">新建</el-button>
					<el-button plain type="info" size="small" icon="el-icon-delete">删除</el-button>
				</template>
			</TableHeaderCustomeBtn>
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
					<el-table-column prop="date" label="机构名称"></el-table-column>
					<el-table-column prop="name" label="账号名称"></el-table-column>
					<el-table-column prop="address" label="账号密码"></el-table-column>
					<el-table-column prop="address" label="创建时间"></el-table-column>
					<el-table-column label="操作" width="180">
						<template v-slot="scope">
							<el-button
								type="text"
								size="small"
								class="do-btn"
								icon="el-icon-edit"
								@click="handleClick(scope.row)"
							>编辑</el-button>
							<el-button
								type="text"
								size="small"
								class="do-btn"
								icon="el-icon-delete"
								@click="handleClick(scope.row)"
							>删除</el-button>
						</template>
					</el-table-column>
					<el-table-column label="账号切换" width="180">
						<template v-slot="scope">
							<el-button type="text" size="small" class="do-btn" @click="handleClick(scope.row)">切换到该账号</el-button>
						</template>
					</el-table-column>
				</el-table>
			</section>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.jsgl-wrap {
	background-color: #fff;
	padding: 20px;
	.content-wrap {
		height: 100%;
		border: 1px solid #d4d4d4;
		border-radius: 10px;
		overflow: hidden;
	}
	.do-btn {
		padding: 0;
	}
}
.qrcode-img {
	display: block;
	height: 130px;
	width: 130px;
}
</style>