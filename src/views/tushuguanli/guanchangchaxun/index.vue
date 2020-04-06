<script>
import TableHeader from '@/components/TableHeader';
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
import { collectionList, classifyList, gcSearch, bookDelete, deleteBatch } from '@/api/tushuguanli';
const limit = 10;
export default {
	name: 'Guanchangchaxun',
	components: {
		TableHeader,
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			// 馆藏地列表
			gcCollectionList: [],
			gcCollectionValue: '',
			// 图书种类列表
			gcClassifyList: [],
			gcClassifyValue: '',
			// 图书状态列表 1：在馆，2：流通中，3：破损
			gcStateList: [
				{ label: '全部状态', value: '' },
				{ label: '在管', value: '1' },
				{ label: '流通中', value: '2' },
				{ label: '破损', value: '3' }
			],
			gcStateValue: '',
			// 分页
			currentPage: 1,
			pageSize: limit,
			totalRow: 0,
			// 书名
			shuming: '',
			// isbn
			isbn: '',
			// 条码
			tiaoma: '',
			// 查询列表
			searchList: [],
			// 是否调用查询接口
			isSearch: false
		};
	},
	mounted() {
		this.initAllData();
		this.gcSearchHandler();
	},
	methods: {
		// 馆藏地列表初始化
		async initCollectionsList() {
			const { data } = await collectionList();
			data.unshift({ name: '所有馆藏地', id: '' });
			this.gcCollectionList = data;
		},
		// 图书种类列表
		async initClassifyList() {
			const { data } = await classifyList();
			data.unshift({ name: '全部类别', id: '' });
			this.gcClassifyList = data;
		},

		// 初始化所有数据
		initAllData() {
			this.initCollectionsList();
			this.initClassifyList();
		},

		// 馆藏查询
		async gcSearchHandler() {
			const { bookPage: data } = await gcSearch(this.formatParams());
			this.isSearch = true;
			this.totalRow = data.totalRow;
			this.searchList = data.list.map((item) => {
				item.checked = false;
				return item;
			});
			if (data.totalRow === 0) {
				this.$message('无查询结果');
			}
		},
		// 格式化统一查询条件
		formatParams() {
			return {
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				title: this.shuming,
				isbn: this.isbn,
				item: this.tiaoma,
				status: this.gcStateValue,
				classify_id: this.gcClassifyValue,
				collection_id: this.gcCollectionValue
			};
		},

		// 参数重置按钮
		btnResetHandler() {
			this.currentPage = 1;
			this.shuming = this.isbn = this.tiaoma = this.gcCollectionValue = this.gcClassifyValue = this.gcStateValue =
				'';
			this.searchList = [];
			this.isSearch = false;
			this.gcSearchHandler();
		},

		handleCurrentChange() {
			this.gcSearchHandler();
		},

		// 单本删除
		deleteHandler(book_id) {
			this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					const res = await bookDelete({ book_id });
					if (res.errcode === 0) {
						const index = this.searchList.findIndex((item) => item.id === book_id);
						this.searchList.splice(index, 1);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.gcSearchHandler();
					}
				})
				.catch(() => {});
		},

		// 批量删除
		async deleteAllHandler() {
			const ids = this.searchList
				.filter((item) => item.checked)
				.map((item) => item.id)
				.join(',');
			if (ids.length > 0) {
				this.$confirm('此操作将永久删除选中图书, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(async () => {
						await deleteBatch({ ids });
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.gcSearchHandler();
					})
					.catch(() => {});
			} else {
				this.$message('请选择需要删除的图书！');
			}
		},

		goTSXXPJ(item) {
			this.$store.commit('tushuguanli/CHANGE_ACTIVE_BOOK', item);
			this.$router.push({ name: 'Tushuxinxibianji' });
		},
		goJYJL(bookId) {
			this.$router.push({ name: 'Jieyuejilu', params: { bookId } });
		}
	}
};
</script>
<template>
	<div class="gccx-wrap">
		<section v-if="!isDeepRouterView" class="content-wrap main-wrap">
			<TableHeader title="馆藏查询" :isShowExportBtn="false" />
			<div class="p-20">
				<el-row :gutter="20" type="flex" justify="space-between">
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">题名:</span>
						<el-input
							v-model="shuming"
							class="flex1"
							size="small"
							placeholder="请输入书名"
							@keyup.enter.native="gcSearchHandler"
						/>
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">ISBN:</span>
						<el-input v-model="isbn" class="flex1" size="small" placeholder="请输入ISBN" />
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">条码:</span>
						<el-input v-model="tiaoma" class="flex1" size="small" placeholder="请输入条码" />
					</el-col>
					<el-col :span="5" class="input-wrap flex-center">
						<span class="input-title col-1 f-s-14">图书状态:</span>
						<el-select v-model="gcStateValue" class="m-r-20 flex1" size="small" placeholder="图书状态">
							<el-option
								v-for="item in gcStateList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-col>
					<el-col :span="4">
						<div class="flex-center flex-right">
							<el-button type="primary" size="small" @click="gcSearchHandler">查询</el-button>
							<el-button size="small" @click="btnResetHandler">重置</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="p-r-20 p-l-20 p-b-20">
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">图书类别:</span>
							<el-select v-model="gcClassifyValue" class="flex1" size="small" placeholder="图书类别">
								<el-option
									v-for="item in gcClassifyList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="input-wrap flex-center">
							<span class="input-title col-1 f-s-14">馆藏地:</span>
							<el-select v-model="gcCollectionValue" class="flex1" size="small" placeholder="馆藏地">
								<el-option
									v-for="item in gcCollectionList"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</div>
					</el-col>
				</el-row>
			</div>
			<section v-if="isSearch">
				<TableHeaderCustomeBtn title="筛选结果">
					<template #title-msg>
						<span class="f-s-12 col-3 m-l-10">搜索到{{ totalRow }}条记录</span>
					</template>
					<template #right-btn>
						<el-button plain type="info" size="small" icon="el-icon-delete" @click="deleteAllHandler">删除</el-button>
					</template>
				</TableHeaderCustomeBtn>
			</section>
			<section v-if="searchList.length > 0">
				<div v-for="(item, index) in searchList" :key="item.id" class="list-item-wrap">
					<div class="list-left flex-col relative">
						<el-checkbox v-model="item.checked">{{ index + 1 }}</el-checkbox>
						<img :src="item.coverimg" alt />
						<div
							:class="[
								'status-wrap flex-center',
								{
									liutong: item.status === 2,
									zaiguan: item.status === 1,
									posun: item.status === 3
								}
							]"
						>
							<span v-if="item.status === 1" class="f-s-14 col-0">在馆</span>
							<span v-else-if="item.status === 2" class="f-s-14 col-0">流通中</span>
							<span v-else-if="item.status === 3" class="f-s-14 col-0">破损</span>
						</div>
					</div>
					<div class="list-right flex1 p-l-25">
						<div class="item-wrap h-50 f-s-14 col-1">
							<el-row>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>题名</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.title }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>作者</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.author }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>出版社</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.publisher }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>价格</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.price }}</span>
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
											<span>ISBN</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.isbn }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>条码号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.item }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>图书分类</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.classify_name }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>索书号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.callno }}</span>
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
											<span>出版年份</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.press_date }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>页数</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.total_page }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>尺寸</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.size }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>关键词</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.theme }}</span>
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
											<span>馆藏地</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.collection_name }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>复本</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.copyno }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>上架时间</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>{{ item.gmt_update }}</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>简介</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<!-- <span>{{ item.desc }}</span> -->
											<el-button type="text" size="small">查看</el-button>
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
						<div class="flex-col p-t-20 flex-start">
							<el-button type="text" icon="el-icon-tickets" @click="goJYJL(item.id)">借阅记录</el-button>
							<el-button type="text" icon="el-icon-edit-outline" @click="goTSXXPJ(item)">编辑</el-button>
							<el-button type="text" icon="el-icon-delete" @click="deleteHandler(item.id)">删除</el-button>
						</div>
					</div>
				</div>
				<section class="p-t-20 p-r-20 p-b-10 flex-center flex-space-b">
					<el-pagination
						:current-page.sync="currentPage"
						:page-size="pageSize"
						layout="prev, pager, next, jumper"
						:total="totalRow"
						background
						@current-change="handleCurrentChange"
					></el-pagination>
					<span class="f-s-12 col-2">共{{ totalRow }}条记录</span>
				</section>
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
	height: 200px;
	border-bottom: 1px solid #b0b0b0;
	display: flex;
	.list-left {
		padding-top: 20px;
		img {
			height: 120px;
			width: 90px;
			margin-top: 15px;
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
	}
	.status-wrap {
		position: absolute;
		top: 40%;
		left: -20px;
		width: 60px;
		height: 30px;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
		&.liutong {
			background-color: #fbbc0e;
		}
		&.zaiguan {
			background-color: #5490ef;
		}
		&.posun {
			background-color: #91939a;
		}
	}
}
</style>
