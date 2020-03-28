<script>
import mixins from '@/utils/mixins-vue';
import SBTJCard from './components/SBTJCard';
import { deviceCount, deviceAbnormalList } from '@/api/yunyingzhongxin';
export default {
	name: 'Shebeitongji',
	components: {
		SBTJCard
	},
	mixins,
	data() {
		return {
			deviceCountData: {
				device_count: 0,
				device_count_day: 0,
				device_count_login: 0,
				device_count_abnormal: 0
			},
			deviceTableData: []
		};
	},
	mounted() {
		this.initDeviceCountData();
		this.initDeviceTableData();
	},
	methods: {
		async initDeviceCountData() {
			const { data } = await deviceCount();
			this.deviceCountData.device_count = data.device_count;
			this.deviceCountData.device_count_day = data.device_count_day;
			this.deviceCountData.device_count_login = data.device_count_login;
			this.deviceCountData.device_count_abnormal = data.device_count_abnormal;
		},

		async initDeviceTableData() {
			const { data } = await deviceAbnormalList();
			this.deviceTableData = data;
		},

		goSBYCJL() {
			this.$router.push({ name: 'Shebeiyichangjilu' });
		},
		goSGSYTJ() {
			this.$router.push({ name: 'Shuguishiyongtongji' });
		}
	}
};
</script>
<template>
	<div class="sbtj-wrap">
		<section v-if="!isDeepRouterView">
			<el-row :gutter="20" class="m-b-20" type="flex" justify="space-between">
				<el-col>
					<div class="see-all-wrap flex-col p-30">
						<span class="f-s-20 col-0">设备使用统计</span>
						<div class="flex-center flex-left m-t-20 pointer" @click="goSGSYTJ">
							<span class="f-s-14 col-0">查看全部</span>
							<span class="el-icon-arrow-right col-0" />
						</div>
					</div>
				</el-col>
				<el-col v-for="(value, key) in deviceCountData" :key="key">
					<SBTJCard :attr="key" :value="Math.abs(value)" />
				</el-col>
			</el-row>
			<section class="error-device-wrap">
				<div class="bookcase-title flex flex-space-b">
					<span class="f-s-18 col-1">设备异常</span>
					<div class="pointer" @click="goSBYCJL">
						<span class="col-8 f-s-14">详细数据</span>
						<span class="el-icon-arrow-right col-8" />
					</div>
				</div>
				<section>
					<el-table
						:cell-style="cellStyle"
						:header-cell-style="headerCellStyle"
						:data="deviceTableData"
						highlight-current-row
						border
						style="width: 100%"
					>
						<el-table-column type="index" width="55" label="序号"></el-table-column>
						<el-table-column prop="name" label="设备名称"></el-table-column>
						<el-table-column prop="msg" label="故障类型"></el-table-column>
						<el-table-column prop="gmt_update" label="故障时间"></el-table-column>
						<el-table-column prop="address" label="处理状态">
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
	.see-all-wrap {
		width: 100%;
		background: url('~@/assets/img/sbsy-see.png') no-repeat center / cover;
		height: 170px;
		border-radius: 8px;
	}
	.bookcase-title {
		position: relative;
		padding-left: 30px;
		padding-right: 20px;
		padding-bottom: 20px;
		padding-top: 20px;
		&::before {
			position: absolute;
			left: 10px;
			top: 25px;
			width: 10px;
			height: 10px;
			border-radius: 5px;
			background-color: #fbbc0e;
			content: '';
		}
		@include one-px();
	}
}
</style>
