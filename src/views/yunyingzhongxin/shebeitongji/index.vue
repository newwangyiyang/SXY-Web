<script>
import mixins from '@/utils/mixins-vue';
import SBTJCard from './components/SBTJCard';
export default {
	name: 'Shebeitongji',
	components: {
		SBTJCard
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
				}
			]
		};
	},
	methods: {
		goSBYCJL() {
			this.$router.push({ name: 'Shebeiyichangjilu' });
		}
	}
};
</script>
<template>
	<div class="sbtj-wrap">
		<section v-if="!isDeepRouterView">
			<el-row :gutter="20" class="m-b-20" type="flex" justify="space-between">
				<el-col>
					<SBTJCard />
				</el-col>
				<el-col>
					<SBTJCard />
				</el-col>
				<el-col>
					<SBTJCard />
				</el-col>
				<el-col>
					<SBTJCard />
				</el-col>
				<el-col>
					<SBTJCard />
				</el-col>
			</el-row>
			<section class="error-device-wrap">
				<div class="h-60 bg-5 flex-center flex-space-b p-l-30 p-r-30">
					<span class="col-1 f-s-16">设备异常提醒</span>
					<el-button plain type="info" size="small" @click="goSBYCJL">查看全部</el-button>
				</div>
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
						backgroundColor: '#EDEAED',
						fontWeight: 'normal'
					}"
						:data="tableData"
						highlight-current-row
						border
						style="width: 100%"
					>
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column type="index" width="55" label="序号"></el-table-column>
						<el-table-column prop="name" label="书柜名称"></el-table-column>
						<el-table-column prop="date" label="故障类型"></el-table-column>
						<el-table-column prop="address" label="故障时间"></el-table-column>
						<el-table-column prop="address" label="处理状态">
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
			</section>
		</section>
		<router-view v-else />
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.sbtj-wrap {
	background-color: #fff;
	padding: 20px;
	.error-device-wrap {
		border-radius: 10px;
		border: 1px solid #d8d8d8;
		overflow: hidden;
	}
}
</style>
