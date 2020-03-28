<script>
import TableHeaderNavMenu from '@/components/TableHeaderNavMenu';
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Xinzengtushu',
	components: {
		TableHeaderNavMenu,
		TableHeaderCustomeBtn
	},
	mixins,
	data() {
		return {
			activeIndex: 0,
			bookData: {
				tiaoxingma: '',
				jianjie: ''
			},
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
			imageUrl: '',
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
			]
		};
	},
	methods: {
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
			<TableHeaderNavMenu :titleArr="['单本新增', '批量新增']" :activeIndex.sync="activeIndex" />
			<section v-if="activeIndex === 0">
				<el-row :gutter="100" class="p-l-20 p-r-20">
					<el-col :span="6">
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">
								条码号
								<i class="f-s-16">*</i>
								:
							</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入条码号" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">
								ISBN
								<i class="f-s-16">*</i>
								:
							</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入ISBN" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">
								题名
								<i class="f-s-16">*</i>
								:
							</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入书名" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">作者:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入作者" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">出版社:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入出版社" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">价格:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入价格" />
						</section>
					</el-col>
					<el-col :span="6">
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">
								图书类别
								<i class="f-s-16">*</i>
								:
							</span>
							<el-select v-model="stateValue" class="flex1" size="small" placeholder="图书类别">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">索书号:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入索书号" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">出版年份:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入出版年份" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">页数:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入页数" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">尺寸:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入尺寸" />
						</section>
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">主题词:</span>
							<el-input v-model="bookData.tiaoxingma" class="flex1" size="small" placeholder="请输入主题词" />
						</section>
					</el-col>
					<el-col :span="6">
						<section class="flex-center m-t-20">
							<span class="input-title col-1 f-s-14">
								馆藏地
								<i class="f-s-16">*</i>
								:
							</span>
							<el-select v-model="stateValue" class="flex1" size="small" placeholder="馆藏地">
								<el-option
									v-for="item in stateOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</section>
						<section class="upload-wrap m-t-20">
							<span class="input-title col-1 f-s-14">
								图书封面
								<i class="f-s-16">*</i>
								:
							</span>
							<el-upload
								class="avatar-uploader relative"
								action="https://jsonplaceholder.typicode.com/posts/"
								:auto-upload="false"
								:show-file-list="false"
								:on-change="handleAvatarSuccess"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<div v-else class="avatar-uploader-icon flex-center">
									<i class="el-icon-plus f-s-24 col-2"></i>
								</div>

								<div class="upload-msg-tip f-s-12 col-8 flex-col absolute">
									<span>点击上传图书封面</span>
									<span>大小不超过200kb</span>
								</div>
							</el-upload>
						</section>
					</el-col>
				</el-row>
				<el-row class="p-l-20 p-r-20 p-b-20">
					<el-col :span="11">
						<section class="flex m-t-20">
							<span class="input-title textarea-title col-1 f-s-14">简介:</span>
							<el-input
								v-model="bookData.jianjie"
								type="textarea"
								:autosize="{ minRows: 6, maxRows: 10}"
								placeholder="请输入简介"
							></el-input>
						</section>
					</el-col>
				</el-row>
				<section class="h-100 flex-center">
					<el-button type="default" @click="goBack">取消</el-button>
					<el-button type="primary" class="w-200 m-l-20">确定</el-button>
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
						<span class="input-title col-1 f-s-14">馆藏地:</span>
						<el-select v-model="stateValue" class="flex1" size="small" placeholder="馆藏地">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
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
						<el-select v-model="stateValue" class="w-100" size="small" placeholder="用户组">
							<el-option
								v-for="item in stateOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
						<el-button plain type="info" size="small" class="m-l-20" icon="el-icon-delete">删除</el-button>
					</template>
				</TableHeaderCustomeBtn>
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
					<el-table-column prop="date" label="作者"></el-table-column>
					<el-table-column prop="address" label="出版社"></el-table-column>
					<el-table-column prop="address" label="价格"></el-table-column>
					<el-table-column prop="address" label="ISBN"></el-table-column>
					<el-table-column prop="address" label="条码号"></el-table-column>
					<el-table-column prop="address" label="图书类别"></el-table-column>
					<el-table-column prop="address" label="索书号"></el-table-column>
					<el-table-column prop="address" label="馆藏地"></el-table-column>
					<el-table-column prop="address" label="图书状态"></el-table-column>
					<el-table-column label="操作" fixed="right">
						<template v-slot="scope">
							<el-button type="text" size="small" icon="el-icon-edit" @click="() => {scope}">编辑</el-button>
							<el-button type="text" size="small" icon="el-icon-delete" @click="() => {scope}">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
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
		height: 140px;
		background-color: #eef0f0;
		.avatar-uploader-icon {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			height: 140px;
			width: 120px;
			&:hover {
				border-color: #409eff;
			}
		}
		.avatar {
			width: 120px;
			height: 140px;
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
