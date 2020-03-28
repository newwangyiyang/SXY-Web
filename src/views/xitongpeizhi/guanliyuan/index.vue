<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Guanliyuan',
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
			],
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
			// stateValue: '0',
			// sbName: '',
			// sbNum: ''
		};
	}
};
</script>
<template>
	<div class="jsgl-wrap">
		<div class="content-wrap">
			<TableHeaderCustomeBtn title="管理员">
				<template #right-btn>
					<el-button plain type="info" size="small" icon="el-icon-document-add"
						>新建</el-button
					>
					<el-button plain type="info" size="small" icon="el-icon-delete">删除</el-button>
				</template>
			</TableHeaderCustomeBtn>

			<!-- <section class="p-20 flex-center flex-space-b">
				<section class="flex-center">
					<div class="flex-center">
						<span class="input-title col-1 f-s-14">设备名称:</span>
						<el-input v-model="sbName" class="flex1" size="small" placeholder="请输入设备名称" />
					</div>
					<div class="flex-center m-l-20">
						<span class="input-title col-1 f-s-14">设备编号:</span>
						<el-input v-model="sbName" class="flex1" size="small" placeholder="请输入设备编号" />
					</div>
					<div class="flex-center m-l-20">
						<span class="input-title col-1 f-s-14">设备状态:</span>
						<el-select v-model="stateValue" class="flex1" size="small">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</div>
				</section>
				<section>
					<el-button type="primary" size="small">查询</el-button>
					<el-button size="small">重置</el-button>
				</section>
			</section> -->
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
					<el-table-column prop="date" label="管理员姓名"></el-table-column>
					<el-table-column prop="name" label="账号名称"></el-table-column>
					<el-table-column prop="address" label="账号密码"></el-table-column>
					<el-table-column prop="address" label="角色"></el-table-column>
					<el-table-column label="微信绑定">
						<template v-slot="scope">
							<el-tooltip placement="top">
								<template #content>
									<div class="qrcode-img">
										<img
											class="h-100p w-100p"
											src="@/assets/img/list-item.png"
											alt
										/>
									</div>
								</template>
								<el-button
									type="text"
									size="small"
									class="do-btn"
									@click="handleClick(scope.row)"
									>查看</el-button
								>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="创建时间"></el-table-column>
					<el-table-column label="操作" width="180">
						<template v-slot="scope">
							<el-button
								type="text"
								size="small"
								class="do-btn"
								icon="el-icon-edit"
								@click="handleClick(scope.row)"
								>编辑</el-button
							>
							<el-button
								type="text"
								size="small"
								class="do-btn"
								icon="el-icon-delete"
								@click="handleClick(scope.row)"
								>删除</el-button
							>
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
