<script>
import TableHeaderNavMenu from '@/components/TableHeaderNavMenu';
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import dayjs from 'dayjs';
import { getDeptList, searchUser, addUser, deleteUser, deleteHandler } from '@/api/yonghuguanli';
export default {
	name: 'Yonghuxinzeng',
	components: {
		TableHeaderNavMenu,
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			activeIndex: 0,
			// 最近新增查询
			formSearch: {
				pageNo: 1,
				pageSize: 10,
				starttime: '',
				endtime: ''
			},
			// 总数量
			totalRow: 0,
			// 表单提交
			userForm: {
				name: '',
				avatar: '',
				mobile: '',
				dept_id: '',
				card_status: '',
				gender: '',
				card_number: '',
				borrow_count: '', // 借阅数量
				borrow_period: '' // 借阅时长
			},
			// 批量表单
			userBatchForm: {
				dept_id: '',
				uids: []
			},
			// 用户组列表
			deptList: [],
			stateOptions: [
				{
					value: 0,
					label: '全部状态'
				},
				{
					value: 1,
					label: '未发放'
				},
				{
					value: 2,
					label: '挂失'
				},
				{
					value: 3,
					label: '解挂'
				}
			],
			sexOptions: [
				{ value: 0, label: '未知' },
				{ value: 1, label: '男' },
				{ value: 3, label: '女' }
			],
			// 最近新增
			tableData: [],
			// 最近查询时间段类型：1-近7天，2-近30天
			chooseDateType: 2
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
			if (this.chooseDateType === 1) {
				this.chooseDate = [
					dayjs()
						.subtract(7, 'day')
						.format('YYYY-MM-DD'),
					dayjs().format('YYYY-MM-DD')
				];
				this.formSearch.starttime = this.chooseDate[0];
				this.formSearch.endtime = this.chooseDate[1];
			} else if (this.chooseDateType === 2) {
				this.chooseDate = [
					dayjs()
						.subtract(30, 'day')
						.format('YYYY-MM-DD'),
					dayjs().format('YYYY-MM-DD')
				];
				this.formSearch.starttime = this.chooseDate[0];
				this.formSearch.endtime = this.chooseDate[1];
			}
			const { data } = await searchUser(this.formSearch);
			this.totalRow = data.totalRow;
			this.tableData = data.list;
		},
		// 新增用户
		addUser() {
			this.$confirm('此操作将添加该用户信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await addUser(this.userForm);
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					// 返回用户列表
					this.$router.push({ name: 'Yonghuchaxun' });
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
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
		// 跳转编辑页面
		goTSXXPJ(item) {
			this.$store.commit('yonghuguanli/CHANGE_ACTIVE_USER', item);
			this.$router.push({ name: 'Yonghuxinxibianji' });
		},
		// 用户组切换
		changeDeptHandler() {
			if (this.deptList) {
				this.deptList.forEach((v) => {
					if ((v.dept_id = this.userForm.dept_id)) {
						this.userForm.borrow_count = v.borrow_count;
						this.userForm.borrow_period = v.borrow_period;
					}
				});
			}
		},
		// 分页切换
		handleCurrentChange(currentPage) {
			this.formSearch.pageNo = currentPage;
			this.searchUser();
		},
		// 多选
		handleSelectionChange(val) {
			this.userBatchForm.uids = val.map((item) => {
				return item.uid;
			});
		},
		handleAvatarSuccess(file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<template>
	<div class="xzts-wrap">
		<div class="content-wrap">
			<TableHeaderNavMenu :titleArr="['单人新增', '批量新增']" :activeIndex.sync="activeIndex" />
			<section v-if="activeIndex === 0">
				<el-row :gutter="100" class="p-l-20 p-r-20">
					<el-col :span="6">
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">
								姓名
								<i class="f-s-16">*</i>
								:
							</span>
							<el-input v-model="userForm.name" class="flex1" size="small" placeholder="请输入姓名" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">性别:</span>
							<el-select v-model="userForm.gender" class="flex1" size="small" placeholder="性别">
								<el-option
									v-for="item in sexOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">身份证号:</span>
							<el-input v-model="userForm.idno" class="flex1" size="small" placeholder="请输入身份证号" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">手机号:</span>
							<el-input v-model="userForm.mobile" class="flex1" size="small" placeholder="请输入手机号" />
						</section>
					</el-col>
					<el-col :span="6">
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">读者卡号:</span>
							<el-input v-model="userForm.card_number" class="flex1" size="small" placeholder="请输入读者卡号" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">用户组:</span>
							<el-select
								v-model="userForm.dept_id"
								class="flex1"
								size="small"
								placeholder="用户组"
								@change="changeDeptHandler"
							>
								<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">借阅权限:</span>
							<el-input
								:value="`${userForm.borrow_count?userForm.borrow_count:0}本/${userForm.borrow_period?userForm.borrow_period:0}天`"
								class="flex1"
								size="small"
								:disabled="true"
							/>
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">读者卡:</span>
							<el-select v-model="userForm.card_status" class="flex1" size="small" placeholder="读者卡">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</section>
					</el-col>
					<el-col :span="6">
						<section class="upload-wrap m-t-20">
							<span class="input-title col-1 f-s-14">用户头像:</span>
							<el-upload
								class="avatar-uploader relative"
								action="https://jsonplaceholder.typicode.com/posts/"
								:auto-upload="false"
								:show-file-list="false"
								:on-change="handleAvatarSuccess"
							>
								<img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
								<div v-else class="avatar-uploader-icon flex-center">
									<i class="el-icon-plus f-s-24 col-2"></i>
								</div>

								<div class="upload-msg-tip f-s-12 col-8 flex-col absolute">
									<span>点击上传读者照片</span>
									<span>大小不超过200kb</span>
								</div>
							</el-upload>
						</section>
					</el-col>
				</el-row>
				<section class="h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20" @click="addUser">确定</el-button>
				</section>
			</section>
			<section v-if="activeIndex === 1" class="p-l-20 p-r-20">
				<div class="model-wrap flex-center flex-left h-80">
					<el-button plain type="info" size="small" class="m-r-20" icon="el-icon-download">下载模板</el-button>
					<div class="col-3 f-s-12 flex-center">
						<span class="el-icon-warning-outline f-s-22 m-r-10"></span>
						<span>请严格按照模板关键字顺序进行排列，缺失内容字段为空即可。</span>
					</div>
				</div>
				<div class="flex-center flex-left">
					<section class="m-t-20 w-300">
						<span class="input-title col-1 f-s-14">用户组:</span>
						<el-select
							v-model="userBatchForm.dept_id"
							class="flex1"
							size="small"
							placeholder="用户组"
							@change="changeDeptHandler"
						>
							<el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</section>
					<section class="upload-wrap flex-center m-t-20">
						<span class="input-title col-1 f-s-14">上传文件:</span>
						<el-upload
							action="https://jsonplaceholder.typicode.com/posts/"
							:auto-upload="false"
							:show-file-list="false"
							:on-change="handleAvatarSuccess"
						>
							<el-input readonly class="pointer" size="small" placeholder="点击选择上传文件" />
						</el-upload>
					</section>
				</div>
				<section class="model-wrap h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20">上传</el-button>
				</section>
				<section class="h-100 flex-center flex-space-b">
					<div class="f-s-14 col-1">
						<span>结果</span>
						<span class="col-6 m-l-10">导入成功320条，失败18条</span>
					</div>
					<el-button size="small" type="primary">导出失败数据</el-button>
				</section>
			</section>
			<section>
				<TableHeaderCustomeBtn title="最近新增">
					<template #right-btn>
						<el-select
							v-model="chooseDateType"
							class="w-100"
							size="small"
							placeholder="新增时间"
							@change="handleCurrentChange(1)"
						>
							<el-option label="近7天" :value="1"></el-option>
							<el-option label="近30天" :value="2"></el-option>
						</el-select>
						<el-button
							plain
							type="info"
							size="small"
							class="m-l-20"
							icon="el-icon-delete"
							@click="deleteHandler"
						>删除</el-button>
					</template>
				</TableHeaderCustomeBtn>
				<el-table
					:cell-style="cellStyle"
					:header-cell-style="headerCellStyle"
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="name" label="姓名" width="100"></el-table-column>
					<el-table-column prop="name" label="性别" width="70">
						<template v-slot="scope">
							<span v-if="scope.row.gender ===0">未知</span>
							<span v-else-if="scope.row.gender ===1">男</span>
							<span v-else-if="scope.row.gender ===3">女</span>
						</template>
					</el-table-column>
					<el-table-column prop="idno" label="身份证号"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column prop="card_number" label="读者卡号"></el-table-column>
					<el-table-column prop="dept_name" label="用户组"></el-table-column>
					<el-table-column prop="gmt_create" label="创建时间"></el-table-column>
					<el-table-column prop="address" label="读者状态">
						<template v-slot="scope">
							<span v-if="scope.row.status ===1">正常</span>
							<span v-else-if="scope.row.status ===2">锁卡</span>
							<span v-else-if="scope.row.status ===3">停用</span>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="借阅权限">
						<template
							v-slot="scope"
						>{{scope.row.borrow_count?scope.row.borrow_count:0}}本/{{scope.row.borrow_period?scope.row.borrow_period:0}}天</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right">
						<template v-slot="scope">
							<el-button type="text" size="small" icon="el-icon-edit" @click="goTSXXPJ(scope.row)">编辑</el-button>
							<el-button
								type="text"
								size="small"
								icon="el-icon-delete"
								@click="deleteUser(scope.row.uid)"
							>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
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
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.xzts-wrap {
	background-color: #fff;
	padding: 20px;
	.input-title {
		width: 80px;
		margin-right: 20px;
		text-align: right;
		&.textarea-title {
			margin-right: 30px;
		}
	}
	.upload-wrap {
		display: flex;
	}
	.avatar-uploader {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		.avatar-uploader-icon {
			border: 1px dashed #d9d9d9;
			border-radius: 60px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			width: 120px;
			height: 120px;
			&:hover {
				border-color: #409eff;
			}
		}
		.avatar {
			width: 120px;
			height: 120px;
			border-radius: 60px;
			display: block;
		}
		.upload-msg-tip {
			bottom: -40px;
			left: 15px;
		}
	}
	.model-wrap {
		border-bottom: 1px solid #ccc;
	}
}
</style>
