
<script>
import TableHeader from '@/components/TableHeader';
export default {
	name: 'Tushuxinxibianji',
	components: {
		TableHeader
	},
	data() {
		return {
			bookData: {
				tiaoxingma: '',
				jianjie:
					'《中国经典文学名著：西游记（上下典藏本）》是中国古典神魔小说中的巅峰之作，书中讲述了唐僧师徒四人一路降妖伏魔，历经整整九九八十一难取经的故事。作者细腻而深刻地塑造了四个极其经典的形象：慈悲、宽厚但软弱、迂腐的师父唐僧；富有反叛精神、神通广大的孙悟空；自私狡猾、好吃懒做的猪八戒；任劳任怨、忠心耿耿的沙僧……他们怀着不同的目的走上了同一条取经路，面对各种难以想象的妖魔鬼怪、险恶绝境，他们既有矛盾，又有合作与情谊。'
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
			imageUrl: ''
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
			bottom: -40px;
			left: 15px;
		}
	}
}
</style>