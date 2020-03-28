<script>
import TableHeaderCustomeBtn from '@/components/TableHeaderCustomeBtn';
import TipNum from './components/TipNum';
import swiper from '@/assets/img/swiper.png';
import defaultLogo from '@/assets/img/logo-black.png';
export default {
	name: 'Shebeipeizhi',
	components: {
		TableHeaderCustomeBtn,
		TipNum
	},
	data() {
		return {
			logo: '',
			sbName: '书小驿01号柜',
			swiperList: [],
			sbJianjie: '机构简介',
			nav: '',
			tel: '400-036-8086'
		};
	},
	computed: {
		defaultLogo() {
			return defaultLogo;
		},
		swiperComputed() {
			return this.swiperList.length > 0
				? this.swiperList.map((item) => URL.createObjectURL(item.raw))
				: [swiper];
		},
		navComputed() {
			return this.nav ? { backgroundImage: `url(${this.nav})` } : {};
		}
	},
	methods: {
		logoChangeHandler(file) {
			this.logo = URL.createObjectURL(file.raw);
		},
		logoDeleteHandler() {
			this.logo = '';
		},
		navChangeHandler(file) {
			this.nav = URL.createObjectURL(file.raw);
		},
		navDeleteHandler() {
			this.nav = '';
		},
		swiperChangeHandler(file, fileList) {
			this.swiperList = fileList;
		},
		swiperDeleteHandler(index) {
			this.swiperList.splice(index, 1);
		}
	}
};
</script>
<template>
	<div class="sbpz-wrap">
		<div class="content-wrap">
			<TableHeaderCustomeBtn title="设备名称">
				<template #right-btn>
					<el-button icon="el-icon-download" type="default" size="small">导入模板</el-button>
				</template>
			</TableHeaderCustomeBtn>
			<section class="flex">
				<div class="phone-wrap">
					<div class="phone">
						<div class="top-wrap flex-center flex-space-b relative">
							<img :src="logo || defaultLogo" :style="{ marginTop: '-6px' }" class="w-47 h-15" alt />
							<TipNum :num="1" class="absolute one" />
							<div class="flex1 m-l-5 relative">
								<TipNum :num="2" class="absolute two" />
								<img src="@/assets/img/phone-right.png" class="w-100p h-15" alt />
							</div>
						</div>
						<div class="swiper-wrap relative">
							<TipNum :num="3" class="absolute three" />
							<el-carousel height="176px">
								<el-carousel-item v-for="(item, index) in swiperComputed" :key="index">
									<img class="swiper-img" :src="item" alt />
								</el-carousel-item>
							</el-carousel>
						</div>
						<div class="nav-wrap flex-center m-t-5 relative" :style="navComputed">
							<TipNum :num="4" class="absolute four" />
							<TipNum :num="5" class="absolute five" />
							<span class="f-s-12 col-1">
								-
								<span>{{sbJianjie}}</span>
								-
							</span>
						</div>
						<div class="btn-wrap">
							<img class="h-100p w-100p" src="@/assets/img/nav.png" alt />
						</div>
						<div class="bottom-wrap h-35 flex-center m-t-5 relative">
							<TipNum :num="6" class="absolute six" />
							<img class="w-36 h-15" src="@/assets/img/phone-bottom.png" alt />
							<span class="f-s-14 col-1 bold m-l-5">{{tel}}</span>
						</div>
					</div>
				</div>
				<div class="do-table-wrap flex1">
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-50 b-right b-bottom">
								<span class="f-s-14 col-1">序号</span>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-50 b-right b-bottom">
								<span class="f-s-14 col-1">内容</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-50 b-right b-bottom">
								<span class="f-s-14 col-1">位置及要求</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-50 b-bottom">
								<span class="f-s-14 col-1">操作</span>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-80 b-right b-bottom">
								<div class="h-20 w-20 brs10 bg-3 flex-center">
									<span class="f-s-14 col-0">1</span>
								</div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-80 b-right b-bottom">
								<span class="f-s-14 col-1">设备logo</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center flex-col h-80 b-right b-bottom">
								<span class="f-s-14 col-1">位置：设备操作界面左上角</span>
								<span class="f-s-14 col-1 m-t-8">要求：高度60px，宽度不限，图片大小 &lt; 1M</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-80 b-bottom">
								<el-upload
									ref="upload"
									action="https://jsonplaceholder.typicode.com/posts/"
									:on-change="logoChangeHandler"
									:auto-upload="false"
									:show-file-list="false"
									class="upload-logo w-100p p-l-30 p-r-30"
								>
									<div class="w-100p flex-center flex-space-a">
										<div v-if="logo" class="logo-preview-wrap relative" @click.stop="() => {}">
											<span class="el-icon-circle-close absolute delete-icon" @click.stop="logoDeleteHandler"></span>
											<img :src="logo" class="logo-preview-img" alt />
										</div>
										<el-button v-if="!logo" size="small" type="primary">上传</el-button>
										<el-button v-else size="small" type="text">更换logo</el-button>
									</div>
								</el-upload>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-80 b-right b-bottom">
								<div class="h-20 w-20 brs10 bg-3 flex-center">
									<span class="f-s-14 col-0">2</span>
								</div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-80 b-right b-bottom">
								<span class="f-s-14 col-1">设备名称</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center flex-col h-80 b-right b-bottom">
								<span class="f-s-14 col-1">位置：设备操作界面左上角</span>
								<span class="f-s-14 col-1 m-t-8">要求：不超过25个字</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-80 b-bottom">
								<el-input v-model="sbName" placeholder="请输入设备名称" class="w-200" maxlength="25" size="small"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-80 b-right b-bottom">
								<div class="h-20 w-20 brs10 bg-3 flex-center">
									<span class="f-s-14 col-0">3</span>
								</div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-80 b-right b-bottom">
								<span class="f-s-14 col-1">轮播图</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center flex-col h-80 b-right b-bottom">
								<span class="f-s-14 col-1">位置：设备操作界面中上方banner位置</span>
								<span class="f-s-14 col-1 m-t-8">要求：尺寸1020px*700px，图片大小 &lt; 1M</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-80 b-bottom">
								<el-upload
									ref="upload"
									action="https://jsonplaceholder.typicode.com/posts/"
									:on-change="swiperChangeHandler"
									:file-list="swiperList"
									:auto-upload="false"
									:show-file-list="false"
									class="upload-logo w-100p p-l-10 p-r-20"
								>
									<div :class="['w-100p flex-center', {'flex-space-b': swiperList.length > 0}]">
										<div v-if="swiperList.length > 0" class="swiper-preview-wrap">
											<div
												v-for="(item, index) in swiperComputed"
												:key="index"
												class="swiper-preview-item relative"
												@click.stop="() => {}"
											>
												<span
													class="el-icon-circle-close absolute delete-icon"
													@click.stop="swiperDeleteHandler(index)"
												></span>
												<img :src="item" class="swiper-preview-img" alt />
											</div>
										</div>
										<el-button
											v-if="swiperList.length > 0"
											size="small"
											type="primary"
											icon="el-icon-circle-plus"
										></el-button>
										<el-button v-else size="small" type="primary">上传</el-button>
									</div>
								</el-upload>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-80 b-right b-bottom">
								<div class="h-20 w-20 brs10 bg-3 flex-center">
									<span class="f-s-14 col-0">4</span>
								</div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-80 b-right b-bottom">
								<span class="f-s-14 col-1">模块展示文字</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center flex-col h-80 b-right b-bottom">
								<span class="f-s-14 col-1">位置：banner下方板块显示文字</span>
								<span class="f-s-14 col-1 m-t-8">要求：不超过15个字</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-80 b-bottom">
								<el-input
									v-model="sbJianjie"
									placeholder="请输入设备简介"
									class="w-200"
									maxlength="15"
									size="small"
								></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-80 b-right b-bottom">
								<div class="h-20 w-20 brs10 bg-3 flex-center">
									<span class="f-s-14 col-0">5</span>
								</div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-80 b-right b-bottom">
								<span class="f-s-14 col-1">模块跳转页</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center flex-col h-80 b-right b-bottom">
								<span class="f-s-14 col-1">位置：banner下方板块显示文字</span>
								<span class="f-s-14 col-1 m-t-8">要求：尺寸1020px*1512px，图片大小 &lt; 1M</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-80 b-bottom">
								<el-upload
									ref="upload"
									action="https://jsonplaceholder.typicode.com/posts/"
									:on-change="navChangeHandler"
									:auto-upload="false"
									:show-file-list="false"
									class="upload-logo w-100p p-l-30 p-r-30"
								>
									<div class="w-100p flex-center flex-space-a">
										<div v-if="nav" class="nav-preview-wrap relative" @click.stop="() => {}">
											<span class="el-icon-circle-close absolute delete-icon" @click.stop="navDeleteHandler"></span>
											<img :src="nav" class="logo-preview-img" alt />
										</div>
										<el-button v-if="!nav" size="small" type="primary">上传</el-button>
										<el-button v-else size="small" type="text">更换图片</el-button>
									</div>
								</el-upload>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2">
							<div class="flex-center h-80 b-right">
								<div class="h-20 w-20 brs10 bg-3 flex-center">
									<span class="f-s-14 col-0">6</span>
								</div>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="flex-center h-80 b-right">
								<span class="f-s-14 col-1">客服电话</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center flex-col h-80 b-right">
								<span class="f-s-14 col-1">位置：设备操作界面底部展示电话</span>
								<span class="f-s-14 col-1">要求：无</span>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="flex-center h-80">
								<el-input v-model="tel" placeholder="请输入电话号码" class="w-200" size="small"></el-input>
							</div>
						</el-col>
					</el-row>
				</div>
			</section>
		</div>
		<div class="content-wrap m-t-20">
			<TableHeaderCustomeBtn title="其他配置" />
			<section class="other-setting">
				<el-row class="h-100p">
					<el-col :span="8" class="b-right h-100p flex-center flex-col col-1 f-s-14">
						<span>登录方式 扫码登录、人脸识别登录</span>
						<el-button type="primary" size="small" class="m-t-20">重设</el-button>
					</el-col>
					<el-col :span="8" class="b-right h-100p flex-center flex-col col-1 f-s-14">
						<span>设备重启 离线时间2020/02/02 15:00</span>
						<el-button type="primary" size="small" class="m-t-20">设备重启</el-button>
					</el-col>
					<el-col :span="8" class="b-right h-100p flex-center flex-col col-1 f-s-14">
						<span>灯带设置 周一至周五 7:00-19:00</span>
						<el-button type="primary" size="small" class="m-t-20">重设</el-button>
					</el-col>
				</el-row>
			</section>
		</div>
		<div class="h-160 flex-center">
			<el-button type="default">取消</el-button>
			<el-button type="primary" class="w-200">保存并设置为模板</el-button>
			<el-button type="primary" class="w-200">保存</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
@import '~@/styles/mixin.scss';
.sbpz-wrap {
	.phone-wrap {
		padding: 30px 40px;
		.phone {
			width: 270px;
			border: 1px solid #ccc;
			padding: 10px 8px;
		}
	}
	.sb-name {
		@include ellipsis();
	}
	.sb-decorate {
		background-color: #fbbc0e;
		padding: 4px;
	}
	.swiper-wrap {
		height: 176px;
	}
	.swiper-img {
		width: 100%;
		height: 100%;
	}
	.nav-wrap {
		background-color: #d0e5fe;
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 40px;
	}
	.btn-wrap {
		height: 163px;
		margin-top: 5px;
	}
	.bottom-wrap {
		background-color: #f5f5f5;
	}
	.one {
		left: 10px;
		top: -22px;
	}
	.two {
		top: -21px;
		left: 10px;
	}
	.three {
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 101;
	}
	.four {
		top: 50%;
		transform: translateY(-50%);
		right: 70px;
	}
	.five {
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
	}
	.six {
		top: 50%;
		transform: translateY(-50%);
		right: 30px;
	}
	.do-table-wrap {
		height: 100%;
		border-left: 1px solid #ccc;
	}
	.b-right {
		border-right: 1px solid #ccc;
	}
	.b-bottom {
		border-bottom: 1px solid #ccc;
	}
	.logo-preview-wrap {
		height: 50px;
		width: 114px;
		border: 2px solid #ccc;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		.logo-preview-img {
			width: 93px;
			height: 30px;
		}
		.delete-icon {
			z-index: 101;
			top: -10px;
			right: -10px;
			color: #666;
		}
	}
	::v-deep .el-upload {
		width: 100%;
	}
	.swiper-preview-wrap {
		display: flex;
		align-items: center;
		max-width: 80%;
		overflow-x: auto;
		.swiper-preview-item {
			padding: 10px;
			border-radius: 8px;
			.delete-icon {
				top: 0px;
				right: 0px;
			}
			img {
				border-radius: 5px;
				width: 73px;
				height: 50px;
			}
		}
	}
	.nav-preview-wrap {
		padding: 10px;
		img {
			width: 35px;
			height: 50px;
			border-radius: 5px;
		}
		.delete-icon {
			color: #666;
			top: 0;
			right: 0;
		}
	}
	.other-setting {
		height: 134px;
	}
}
</style>
