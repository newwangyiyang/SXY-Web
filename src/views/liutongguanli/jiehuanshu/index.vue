
<script>
import TableHeaderNavMenu from '@/components/TableHeaderNavMenu';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Jiehuanshu',
	components: {
		TableHeaderNavMenu
	},
	mixins,
	data() {
		return {
			activeIndex: 1,
			duzeNum: '',
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
				}
			]
		};
	},
	methods: {
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
							<el-input v-model="duzeNum" class="flex1" size="small" placeholder="请输入读者卡号" />
						</el-col>
						<el-col :span="4">
							<el-button type="primary" size="small">人脸识别</el-button>
							<el-button type="primary" size="small">确定</el-button>
						</el-col>

						<el-col :span="6" :offset="9">
							<div class="flex-center flex-right">
								<div class="col-1">
									<span class="f-s-14">读者姓名：</span>
									<span class="f-s-18">书小二</span>
								</div>
								<span class="m-l-30 col-1 f-s-16">已借 2 本，可借 1 本</span>
							</div>
						</el-col>
					</el-row>
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
						<el-table-column prop="name" label="题名"></el-table-column>
						<el-table-column prop="date" label="ISBN"></el-table-column>
						<el-table-column prop="address" label="条码号"></el-table-column>
						<el-table-column prop="address" label="借阅时间"></el-table-column>
						<el-table-column prop="address" label="到期时间"></el-table-column>
						<el-table-column label="借阅状态" fixed="right">
							<template v-slot="scope">
								<el-dropdown>
									<span class="col-6 f-s-12" @click="() => {scope}">
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
					</el-table>
				</section>
				<section>
					<el-row :gutter="20" class="p-20">
						<el-col :span="5" class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">条码号:</span>
							<el-input v-model="duzeNum" class="flex1" size="small" placeholder="请输入条码号" />
						</el-col>
						<el-col :span="4">
							<el-button type="primary" size="small">确定</el-button>
						</el-col>
					</el-row>
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
						<el-table-column prop="name" label="题名"></el-table-column>
						<el-table-column prop="date" label="ISBN"></el-table-column>
						<el-table-column prop="address" label="条码号"></el-table-column>
						<el-table-column prop="address" label="索书号"></el-table-column>
						<el-table-column prop="address" label="图书类别"></el-table-column>
						<el-table-column label="操作" fixed="right">
							<template v-slot="scope">
								<el-button
									type="text"
									size="small"
									class="btn-customer"
									icon="el-icon-delete"
									@click="() => {scope}"
								>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</section>
				<section class="h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20">确定</el-button>
				</section>
			</section>
			<section v-if="activeIndex === 1">
				<section>
					<el-row :gutter="20" class="p-20">
						<el-col :span="5" class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">条码号:</span>
							<el-input v-model="duzeNum" class="flex1" size="small" placeholder="请输入条码号" />
						</el-col>
						<el-col :span="4">
							<el-button type="primary" size="small">确定</el-button>
						</el-col>
					</el-row>
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
						<el-table-column prop="name" label="题名"></el-table-column>
						<el-table-column prop="date" label="ISBN"></el-table-column>
						<el-table-column prop="address" label="条码号"></el-table-column>
						<el-table-column prop="address" label="索书号"></el-table-column>
						<el-table-column prop="address" label="借阅姓名"></el-table-column>
						<el-table-column label="借阅状态">
							<template v-slot="scope">
								<el-dropdown>
									<span class="col-6 f-s-12" @click="() => {scope}">
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
						<el-table-column label="图书状态">
							<template v-slot="scope">
								<el-dropdown>
									<span class="col-6 f-s-12" @click="() => {scope}">
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
						<el-table-column label="操作" fixed="right">
							<template v-slot="scope">
								<el-button
									type="text"
									size="small"
									class="btn-customer"
									icon="el-icon-delete"
									@click="() => {scope}"
								>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</section>
				<section class="h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20">还书</el-button>
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