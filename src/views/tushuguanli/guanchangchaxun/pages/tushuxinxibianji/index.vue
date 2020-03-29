<script>
import TableHeader from '@/components/TableHeader';
import { mapGetters } from 'vuex';
import { collectionList, classifyList, bookUpdate } from '@/api/tushuguanli';
export default {
	name: 'Tushuxinxibianji',
	components: {
		TableHeader
	},
	data() {
		return {
			// 图书详细信息
			bookData: {},
			// 馆藏地列表
			gcCollectionList: [],
			// 图书分类列表
			gcClassifyList: [],
			stateOptions: [
				{
					value: '',
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
			stateValue: '',
			imageUrl: ''
		};
	},
	computed: {
		...mapGetters(['activeBookForUpdate'])
	},
	mounted() {
		this.bookData = { press_date: '', ...this.activeBookForUpdate };
		this.initCollectionsList();
		this.initClassifyList();
	},
	methods: {
		// 馆藏地列表初始化
		async initCollectionsList() {
			const { data } = await collectionList();
			this.gcCollectionList = data;
		},

		// 图书种类列表
		async initClassifyList() {
			const { data } = await classifyList();
			this.gcClassifyList = data;
		},

		// 图书基本信息更新
		async updateBookDataHandler() {
			const { data } = await bookUpdate({ book_id: this.bookData.id, ...this.bookData });
			console.log(data);
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
	<div class="tsxxbj-wrap">
		<div class="content-wrap main-wrap">
			<TableHeader title="图书信息编辑" :isShowExportBtn="false" />
			<el-row :gutter="100" class="p-l-20 p-r-20">
				<el-col :span="6">
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">
							条码号
							<i class="f-s-16">*</i>
							:
						</span>
						<el-input
							v-model="bookData.item"
							class="flex1"
							size="small"
							placeholder="请输入条码号"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">
							ISBN
							<i class="f-s-16">*</i>
							:
						</span>
						<el-input
							v-model="bookData.isbn"
							class="flex1"
							size="small"
							placeholder="请输入ISBN"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">
							题名
							<i class="f-s-16">*</i>
							:
						</span>
						<el-input
							v-model="bookData.title"
							class="flex1"
							size="small"
							placeholder="请输入书名"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">作者:</span>
						<el-input
							v-model="bookData.author"
							class="flex1"
							size="small"
							placeholder="请输入作者"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">出版社:</span>
						<el-input
							v-model="bookData.publisher"
							class="flex1"
							size="small"
							placeholder="请输入出版社"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">价格:</span>
						<el-input
							v-model="bookData.price"
							class="flex1"
							size="small"
							placeholder="请输入价格"
						/>
					</section>
				</el-col>
				<el-col :span="6">
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">
							图书类别
							<i class="f-s-16">*</i>
							:
						</span>
						<el-select
							v-model="bookData.classify_id"
							class="flex1"
							size="small"
							placeholder="图书类别"
						>
							<el-option
								v-for="item in gcClassifyList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">索书号:</span>
						<el-input
							v-model="bookData.callno"
							class="flex1"
							size="small"
							placeholder="请输入索书号"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">出版年份:</span>
						<el-input
							v-model="bookData.press_date"
							class="flex1"
							size="small"
							placeholder="请输入出版年份"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">页数:</span>
						<el-input
							v-model="bookData.total_page"
							class="flex1"
							size="small"
							placeholder="请输入页数"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">尺寸:</span>
						<el-input
							v-model="bookData.size"
							class="flex1"
							size="small"
							placeholder="请输入尺寸"
						/>
					</section>
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">主题词:</span>
						<el-input
							v-model="bookData.theme"
							class="flex1"
							size="small"
							placeholder="请输入主题词"
						/>
					</section>
				</el-col>
				<el-col :span="6">
					<section class="flex-center m-t-20">
						<span class="input-title col-1 f-s-14">
							馆藏地
							<i class="f-s-16">*</i>
							:
						</span>
						<el-select
							v-model="bookData.collection_id"
							class="flex1"
							size="small"
							placeholder="馆藏地"
						>
							<el-option
								v-for="item in gcCollectionList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
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
							<img v-if="bookData.coverimg" :src="bookData.coverimg" class="avatar" />
							<div v-else class="avatar-uploader-icon flex-center">
								<i class="el-icon-plus f-s-24 col-2"></i>
							</div>

							<div class="upload-msg-tip f-s-12 col-8 flex-col absolute">
								<span>点击上传图书封面</span>
								<span class="m-t-10">大小不超过200kb</span>
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
							:autosize="{ minRows: 6, maxRows: 10 }"
							placeholder="请输入简介"
						></el-input>
					</section>
				</el-col>
			</el-row>
			<section class="h-100 flex-center">
				<el-button type="default" @click="goBack">取消</el-button>
				<el-button type="primary" class="w-200 m-l-20" @click="updateBookDataHandler"
					>确定</el-button
				>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.tsxxbj-wrap {
	background-color: #fff;

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
			bottom: -60px;
			left: 10px;
		}
	}
}
</style>
