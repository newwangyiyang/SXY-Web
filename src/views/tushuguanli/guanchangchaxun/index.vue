<script>
import TableHeader from '@/components/TableHeader';
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Guanchangchaxun',
	components: {
		TableHeader,
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			shuming: '',
			isbn: '',
			tiaoma: '',
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
			this.$router.push({ name: 'Tushuxinxibianji' });
		},
		goJYJL() {
			this.$router.push({ name: 'Jieyuejilu' });
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
						<el-input v-model="shuming" class="flex1" size="small" placeholder="请输入书名" />
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
						<el-select v-model="stateValue" class="m-r-20 flex1" size="small" placeholder="图书状态">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
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
							<span class="input-title col-1 f-s-14">图书类别:</span>
							<el-select v-model="stateValue" class="flex1" size="small" placeholder="图书状态">
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
							<span class="input-title col-1 f-s-14">馆藏地:</span>
							<el-select v-model="stateValue" class="flex1" size="small" placeholder="图书状态">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
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
						<el-button plain type="info" size="small" icon="el-icon-delete" @click="deleteHandler">删除</el-button>
					</template>
				</TableHeaderCustomeBtn>
			</section>
			<section>
				<div class="list-item-wrap">
					<div class="list-left flex-col relative">
						<el-checkbox v-model="checked">1</el-checkbox>
						<img src="@/assets/img/list-item.png" alt />
						<div :class="['status-wrap flex-center', {liutong: true}]">
							<span class="f-s-14 col-0">流通中</span>
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
											<span>西游记</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>作者</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>吴承恩</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>出版社</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>安徽少年儿童出版社</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>价格</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>32.00</span>
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
											<span>西游记</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>条码号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>吴承恩</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>图书分类</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>安徽少年儿童出版社</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>索书号</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>32.00</span>
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
											<span>西游记</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
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
											<span>西游记</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>复本</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>吴承恩</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>上架时间</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>安徽少年儿童出版社</span>
										</div>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="flex-center flex-left h-49">
										<div class="w-80 bg-5 flex-center h-100p">
											<span>简介</span>
										</div>
										<div class="m-l-15 h-50 flex-center">
											<span>32.00</span>
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
							<el-button type="text" icon="el-icon-tickets" @click="goJYJL">借阅记录</el-button>
							<el-button type="text" icon="el-icon-edit-outline" @click="goTSXXPJ">编辑</el-button>
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
