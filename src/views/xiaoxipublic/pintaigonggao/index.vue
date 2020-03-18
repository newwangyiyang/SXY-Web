
<script>
import mixins from '@/utils/mixins-vue';
export default {
	name: 'Pingtaigonggao',
	mixins,
	data() {
		return {
			currentPage: 1
		};
	},
	methods: {
		handleCurrentChange(currentPage) {},
		goGGXQ() {
			this.$router.push({ name: 'Gonggaoxiangqing' });
		}
	}
};
</script>
<template>
	<div class="xxzx-wrap bg-0">
		<section v-if="!isDeepRouterView">
			<section class="msg-content">
				<div class="msg-item h-40 flex-center flex-space-b p-l-20 p-r-20 pointer" @click="goGGXQ">
					<div class="col-1 f-s-14">
						<span>【版本更新】</span>
						<span>xxx借阅异常，超借x本图书，书名为《xxxxxx》，请及时处理！</span>
					</div>
					<span class="col-1 f-s-14">2020/02/02 15:00:32</span>
				</div>
				<div
					:class="['msg-item h-40 flex-center flex-space-b p-l-20 p-r-20 pointer', {'isRead': true}]"
					@click="goGGXQ"
				>
					<div class="col-1 f-s-14">
						<span>【公告】</span>
						<span>xxx借阅异常，超借x本图书，书名为《xxxxxx》，请及时处理！</span>
					</div>
					<span class="col-1 f-s-14">2020/02/02 15:00:32</span>
				</div>
			</section>
			<section class="p-t-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="currentPage"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="999"
					background
					@current-change="handleCurrentChange"
				></el-pagination>
				<span class="f-s-12 col-2 p-r-20">共123条记录</span>
			</section>
		</section>
		<router-view v-else />
	</div>
</template>


<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.xxzx-wrap {
	padding: 20px;
	.msg-content {
		@include one-px(top);
	}
	.msg-item {
		@include one-px();
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 10px;
			width: 10px;
			border-radius: 5px;
			background-color: #759cff;
		}
		&.isRead {
			span {
				color: #999;
			}
			&::before {
				background-color: #cccccc;
			}
		}
	}
}
</style>