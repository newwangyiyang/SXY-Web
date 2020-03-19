
<script>
export default {
	name: 'Guanliyuan',
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
			<section class="brs-t-l10 brs-t-r10 bg-5 h-60 flex-center flex-space-b p-l-30 p-r-30">
				<span class="col-1 f-s-18">权限管理</span>
				<section>
					<el-button plain type="info" size="small" icon="el-icon-document-add">新建</el-button>
					<el-button plain type="info" size="small" icon="el-icon-delete">删除</el-button>
				</section>
			</section>
			<section>
				<el-table
					:cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333'
					}"
					:header-cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333',
					}"
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="date" label="管理员姓名"></el-table-column>
					<el-table-column prop="name" label="账号名称"></el-table-column>
					<el-table-column prop="address" label="账号密码"></el-table-column>
					<el-table-column label="角色">
						<template v-slot="scope">
							<el-tooltip placement="top">
								<template #content>
									<div class="qrcode-img">
										<img class="h-100p w-100p" src="@/assets/img/list-item.png" alt />
									</div>
								</template>
								<el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="微信绑定"></el-table-column>
					<el-table-column prop="address" label="创建时间"></el-table-column>
					<el-table-column label="操作" width="180">
						<template v-slot="scope">
							<el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
							<el-button type="text" class="col-7" size="small" @click="handleClick(scope.row)">删除</el-button>
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
}
.qrcode-img {
	display: block;
	height: 130px;
	width: 130px;
}
</style>