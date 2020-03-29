<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { accountList } from '@/api/xitongpeizhi';
export default {
	name: 'Guanliyuan',
	components: {
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			tableData: []
		};
	},
	mounted() {
		this.initAdminTableData();
	},
	methods: {
		// 初始化管理员列表
		async initAdminTableData() {
			const { data } = await accountList();
			data.forEach((item) => {
				item.showTip = false;
			});
			this.tableData = data;
		},
		// 获取二维码
		makeQrcodeHandler(id) {
			// TODO: 项目部署需同步线上地址
			return `http://shuxiaoyi.qicp.vip/admin/v2/system/makeQrcodeBindWeixin?token=ffaa765ea4124d1ab88fc4c87075844a&id=${id}`;
		}
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
					<el-table-column prop="name" label="管理员姓名"></el-table-column>
					<el-table-column prop="username" label="账号名称"></el-table-column>
					<el-table-column prop="role_name" label="角色"></el-table-column>
					<el-table-column label="微信绑定">
						<template v-slot="scope">
							<el-tooltip placement="top" effect="light">
								<template #content>
									<div class="qrcode-img">
										<img
											class="h-100p w-100p"
											:src="makeQrcodeHandler(scope.row.id)"
											alt
										/>
									</div>
								</template>
								<el-button type="text" size="small" class="do-btn" @click="() => {}"
									>查看</el-button
								>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="gmt_login" label="创建时间"></el-table-column>
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
