<script>
import TableHeader from '@/components/TableHeader';
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { getDeptList, searchUser, deleteUser, deleteHandler } from '@/api/yonghuguanli';
export default {
	name: 'Yonghuchaxun',
	components: {
		TableHeader,
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			formSearch: {
				pageNo: 1,
				pageSize: 10,
				name: '',
				phone: '',
				card_number: '',
				idno: '',
				dept_id: '',
				status: '',
				starttime: '',
				endtime: ''
			},
			stateOptions: [
				{
					value: 0,
					label: '全部状态'
				},
				{
					value: 1,
					label: '正常'
				},
				{
					value: 2,
					label: '锁卡'
				},
				{
					value: 3,
					label: '停用'
				}
			],
			// 批量表单
			userBatchForm: {
				uids: []
			},
			// 用户组列表
			deptList: [],
			// 查询总数量
			totalRow: 0,
			// 用户列表
			tableData: [],
			// 创建时间选择框
			chooseDate: ''
		};
	},
	mounted() {
		this.initDeptList();
		this.searchUser();
	},
	methods: {
		// 初始化用户组数据
		async initDeptList() {
			const { data } = await getDeptList();
			this.deptList = data;
		},
		// 用户查询
		async searchUser() {
			if (this.chooseDate) {
				this.formSearch.starttime = this.chooseDate[0];
				this.formSearch.endtime = this.chooseDate[1];
			}
			const { data } = await searchUser(this.formSearch);
			this.totalRow = data.totalRow;
			data.list.map((item) => {
				item.checked = false;
				return item;
			});
			this.tableData = data.list;
		},
		// 删除用户
		deleteUser(uid) {
			this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await deleteUser({
						uid: uid
					});
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					// 重新查询列表
					this.searchUser();
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
		},
		// 批量删除用户
		deleteHandler() {
			this.userBatchForm.uids = this.tableData
				.filter((item) => item.checked)
				.map((item) => item.uid);
			if (this.userBatchForm.uids.length === 0) {
				this.$message({
					type: 'warning',
					message: '请选择删除用户'
				});
				return;
			}
			this.$confirm('此操作将执行批量删除用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await deleteHandler(this.userBatchForm);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					// 重新查询列表
					this.searchUser();
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
		},
		// 重置
		reset() {
			this.formSearch.name = '';
			this.formSearch.phone = '';
			this.formSearch.card_number = '';
			this.formSearch.idno = '';
			this.formSearch.dept_id = '';
			this.formSearch.status = '';
			this.chooseDate = '';
			this.handleCurrentChange(1);
		},
		// 跳转编辑页面
		goTSXXPJ(item) {
			this.$store.commit('yonghuguanli/CHANGE_ACTIVE_USER', item);
			this.$router.push({ name: 'Yonghuxinxibianji' });
		},
		// 跳转借阅记录页面
		goJYJL(uid) {
			this.$router.push({
				name: 'Yonghujieyuejilu',
				query: {
					uid: uid
				}
			});
		},
		// 分页切换
		handleCurrentChange(currentPage) {
			this.formSearch.pageNo = currentPage;
			this.searchUser();
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
						<el-input v-model="formSearch.name" class="flex1" size="small" placeholder="请输入姓名" />
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">手机号:</span>
						<el-input v-model="formSearch.mobile" class="flex1" size="small" placeholder="请输入手机号" />
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">读者卡号:</span>
						<el-input v-model="formSearch.card_number" class="flex1" size="small" placeholder="请输入读者卡号" />
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">身份证号:</span>
						<el-input v-model="formSearch.idno" class="flex1" size="small" placeholder="请输入身份证号" />
					</el-col>
					<el-col :span="4">
						<div class="flex-center flex-right">
							<el-button type="primary" size="small" @click="handleCurrentChange(1)">查询</el-button>
							<el-button size="small" @click="reset">重置</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="p-r-20 p-l-20 p-b-20">
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">用户组:</span>
							<el-select v-model="formSearch.dept_id" class="flex1" size="small" placeholder="用户组">
								<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">用户状态:</span>
							<el-select v-model="formSearch.status" class="flex1" size="small" placeholder="用户状态">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="10">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">创建日期:</span>
							<el-date-picker
								v-model="chooseDate"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								format="yyyy / MM / dd"
								value-format="yyyy-MM-dd"
								:clearable="false"
								size="small"
							></el-date-picker>
						</div>
					</el-col>
				</el-row>
			</div>
			<section>
				<TableHeaderCustomeBtn title="筛选结果">
					<template #title-msg>
						<span class="f-s-12 col-3 m-l-10">搜索到{{totalRow}}条记录</span>
					</template>
					<template #right-btn>
						<el-button plain type="info" size="small" icon="el-icon-delete" @click="deleteHandler">删除</el-button>
					</template>
				</TableHeaderCustomeBtn>
			</section>
			<section>
				<div v-for="(item,index) in tableData" :key="item.id" class="list-item-wrap">
					<div class="list-left flex-col relative">
						<el-checkbox v-model="item.checked">{{index+1}}</el-checkbox>
						<img :src="item.avatar" alt />
						<div
							:class="['status-wrap flex-center', { zhengchang: item.status===1, suoka: item.status===2, tingyong: item.status===0 }]"
						>
							<span v-if="item.status===1" class="f-s-14 col-0">正常</span>
							<span v-else-if="item.status===2" class="f-s-14 col-0">锁卡</span>
							<span v-else-if="item.status===3" class="f-s-14 col-0">停用</span>
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
											<span>{{item.name}}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>性别</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span v-if="item.gender===0">未知</span>
											<span v-else-if="item.gender===1">男</span>
											<span v-else-if="item.gender===3">女</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>身份证号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{item.idno}}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>手机号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{item.mobile}}</span>
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
											<span>{{item.card_number}}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>用户组</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{item.dept_name}}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>创建时间</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{item.gmt_create}}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>借阅权限</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{item.borrow_count?item.borrow_count:0}}本/{{item.borrow_period?item.borrow_period:0}}天</span>
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
											<el-button type="text" class="col-1" size="small">人脸识别</el-button>
											<el-button type="text" size="small">立即录脸</el-button>
										</div>
										<div class="do-wrea p-l-30 h-50 flex-center m-l-50">
											<el-button type="text" class="col-1" size="small">读者卡</el-button>
											<el-button type="text" size="small">未发放</el-button>
										</div>
										<div class="do-wrea p-l-30 h-50 flex-center m-l-50">
											<el-button type="text" class="col-1" size="small">扫码登录</el-button>
											<el-button type="text" size="small">扫码</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
					<div class="list-do">
						<div class="h-49 bg-5 flex-center f-s-14 col-1">
							<span>操作</span>
						</div>
						<div class="flex-col flex-start">
							<el-button type="text" icon="el-icon-tickets" @click="goJYJL(item.uid)">借阅记录</el-button>
							<el-button type="text" icon="el-icon-edit-outline" @click="goTSXXPJ(item)">编辑</el-button>
							<el-button type="text" icon="el-icon-delete" @click="deleteUser(item.uid)">删除</el-button>
						</div>
					</div>
				</div>
			</section>
			<section class="p-r-20 p-b-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="formSearch.pageNo"
					:page-size="formSearch.pageSize"
					layout="prev, pager, next, jumper"
					:total="totalRow"
					background
					@current-change="handleCurrentChange"
				></el-pagination>
				<span class="f-s-12 col-2">共{{totalRow}}条记录</span>
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
