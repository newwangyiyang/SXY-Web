<script>
import { messageCenterList } from '@/api/xiaoxi';
import mixins from '@/utils/mixins-vue';
const limit = 10;
export default {
	name: 'Xiaoxizhongxin',
	mixins,
	data() {
		return {
			// 分页
			currentPage: 1,
			pageSize: limit,
			totalRow: 0,

			// 消息列表
			messageList: []
		};
	},
	mounted() {
		this.initMessageList();
	},
	methods: {
		// 消息列表
		async initMessageList() {
			const { data } = await messageCenterList({
				pageSize: this.pageSize,
				pageNo: this.currentPage
			});
			this.messageList = data.list;
			this.totalRow = data.totalRow;
		},
		// 根据状态获取状态文本
		getTypeText(type) {
			// 消息类型type = 》1：借阅异常，2：设备异常，3：版本更新，4：公告
			return {
				1: '借阅异常',
				2: '设备异常',
				3: '版本更新',
				4: '公告'
			}[type];
		},
		handleCurrentChange(currentPage) {
			this.initMessageList();
		},

		// 跳转消息详情
		goXXXQ() {
			this.$router.push({ name: 'Xiaoxixiangqing' });
		}
	}
};
</script>
<template>
	<div class="xxzx-wrap bg-0">
		<section v-if="!isDeepRouterView">
			<section class="msg-content">
				<div
					v-for="item in messageList"
					:key="item.id"
					:class="[
						'msg-item h-40 flex-center flex-space-b p-l-20 p-r-20 pointer',
						{ isRead: item.is_read === 1 }
					]"
					@click="goXXXQ"
				>
					<div class="col-1 f-s-14">
						<span>【{{ getTypeText(item.type) }}】</span>
						<span>{{ item.title }}</span>
					</div>
					<span class="col-1 f-s-14">{{ item.gmt_create }}</span>
				</div>
				<div v-if="messageList.length <= 0" class="flex-center p-t-20">
					<span class="f-s-20 col-2">暂无数据~</span>
				</div>
			</section>
			<section class="p-t-20 flex-center flex-space-b">
				<el-pagination
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next, jumper"
					:total="totalRow"
					background
					@current-change="handleCurrentChange"
				></el-pagination>
				<span class="f-s-12 col-2 p-r-20">共{{ totalRow }}条记录</span>
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
			background-color: #fbbc0e;
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
