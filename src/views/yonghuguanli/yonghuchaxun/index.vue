<script>
import TableHeader from '@/components/TableHeader';
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Yonghuchaxun',
	components: {
		TableHeader,
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			name: '',
			phone: '',
			readerNum: '',
			cardNum: '',
			createDate: '',
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
			],
			stateValue: '0',
			checked: true
		};
	},
	methods: {
		deleteHandler() {
			console.log('deleteHandler');
		},
		goTSXXPJ() {
			this.$router.push({ name: 'Yonghuxinxibianji' });
		},
		goJYJL() {
			this.$router.push({ name: 'Yonghujieyuejilu' });
		}
	}
};
</script>
<template>
	<div class="gccx-wrap">
		<section v-if="!isDeepRouterView" class="content-wrap main-wrap">
			<TableHeader title="用户查询" :isShowExportBtn="false" />
			<div class="p-20">
				<el-row :gutter="20" type="flex" justify="space-between">
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">姓名:</span>
						<el-input
							v-model="name"
							class="flex1"
							size="small"
							placeholder="请输入姓名"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">手机号:</span>
						<el-input
							v-model="phone"
							class="flex1"
							size="small"
							placeholder="请输入手机号"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">读者卡号:</span>
						<el-input
							v-model="readerNum"
							class="flex1"
							size="small"
							placeholder="请输入读者卡号"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">身份证号:</span>
						<el-input
							v-model="cardNum"
							class="flex1"
							size="small"
							placeholder="请输入身份证号"
						/>
					</el-col>
					<el-col :span="4">
						<div class="flex-center flex-right">
							<el-button type="primary" size="small">查询</el-button>
							<el-button size="small">重置</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="p-r-20 p-l-20 p-b-20">
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">用户组:</span>
							<el-select
								v-model="stateValue"
								class="flex1"
								size="small"
								placeholder="用户组"
							>
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">用户状态:</span>
							<el-select
								v-model="stateValue"
								class="flex1"
								size="small"
								placeholder="用户状态"
							>
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">创建时间:</span>
							<el-date-picker
								v-model="createDate"
								class="flex1"
								size="small"
								type="date"
								:clearable="false"
								placeholder="创建时间"
							></el-date-picker>
						</div>
					</el-col>
				</el-row>
			</div>
			<section>
				<TableHeaderCustomeBtn title="筛选结果">
					<template #title-msg>
						<span class="f-s-12 col-3 m-l-10">搜索到3条记录</span>
					</template>
					<template #right-btn>
						<el-button
							plain
							type="info"
							size="small"
							icon="el-icon-delete"
							@click="deleteHandler"
							>删除</el-button
						>
					</template>
				</TableHeaderCustomeBtn>
			</section>
			<section>
				<div class="list-item-wrap">
					<div class="list-left flex-col relative">
						<el-checkbox v-model="checked">1</el-checkbox>
						<img src="@/assets/img/list-item.png" alt />
						<div :class="['status-wrap flex-center', { zhengchang: true }]">
							<span class="f-s-14 col-0">正常</span>
						</div>
					</div>
					<div class="list-right flex1 p-l-25">
						<div class="item-wrap h-50 f-s-14 col-1">
							<el-row>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>姓名</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>书小二</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>性别</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>女</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>身份证号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>3706************35</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>手机号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>18800880088</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<div class="item-wrap h-50 f-s-14 col-1">
							<el-row>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>读者卡号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>18800880088</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>用户组</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>三年一班</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>创建时间</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>2020/02/28</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>借阅权限</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>3本/30天</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<div class="h-50 f-s-14 col-1">
							<el-row>
								<el-col :span="24">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>登录方式</span>
										</div>
										<div class="do-wrea p-l-30 h-50 flex-center">
											<el-button type="text" class="col-1" size="small"
												>人脸识别</el-button
											>
											<el-button type="text" size="small">立即录脸</el-button>
										</div>
										<div class="do-wrea p-l-30 h-50 flex-center m-l-50">
											<el-button type="text" class="col-1" size="small"
												>读者卡</el-button
											>
											<el-button type="text" size="small">未发放</el-button>
										</div>
										<div class="do-wrea p-l-30 h-50 flex-center m-l-50">
											<el-button type="text" class="col-1" size="small"
												>扫码登录</el-button
											>
											<el-button type="text" size="small">扫码</el-button>
										</div>
									</div>
								</el-col>
								<!-- <el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>页数</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>吴承恩</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>尺寸</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>安徽少年儿童出版社</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>关键词</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>32.00</span>
										</div>
									</div>
								</el-col>-->
							</el-row>
						</div>
					</div>
					<div class="list-do">
						<div class="h-49 bg-5 flex-center f-s-14 col-1">
							<span>操作</span>
						</div>
						<div class="flex-col flex-start">
							<el-button type="text" icon="el-icon-tickets" @click="goJYJL"
								>借阅记录</el-button
							>
							<el-button type="text" icon="el-icon-edit-outline" @click="goTSXXPJ"
								>编辑</el-button
							>
							<el-button type="text" icon="el-icon-delete">删除</el-button>
						</div>
					</div>
				</div>
			</section>
		</section>
		<router-view v-else />
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.gccx-wrap {
	background-color: #fff;
	padding: 20px;
	.main-wrap {
		min-height: 750px;
	}
}
.list-item-wrap {
	padding-left: 20px;
	height: 150px;
	border-bottom: 1px solid #b0b0b0;
	display: flex;
	.list-left {
		padding-top: 20px;
		img {
			height: 90px;
			width: 90px;
			margin-top: 15px;
			border-radius: 50%;
		}
	}
	.item-wrap {
		border-bottom: 1px solid #b0b0b0;
	}
	.list-right {
		border-right: 1px solid #b0b0b0;
	}
	.list-do {
		width: 150px;
		::v-deep .el-button {
			padding-top: 9px;
			padding-bottom: 9px;
		}
	}
	.status-wrap {
		position: absolute;
		top: 40%;
		left: -20px;
		width: 60px;
		height: 30px;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
		&.suoka {
			background-color: #fbbc0e;
		}
		&.zhengchang {
			background-color: #5490ef;
		}
		&.tingyong {
			background-color: #91939a;
		}
	}
	.do-wrea {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: 15px;
			top: 50%;
			transform: translateY(-50%);
			height: 6px;
			width: 6px;
			border-radius: 3px;
			background-color: #5490ef;
		}
	}
}
</style>
