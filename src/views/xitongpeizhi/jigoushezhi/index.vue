
<script>
export default {
	name: 'Jigoushezhi',
	data() {
		return {
			activeIndex: '0',
			activeCardIndex: 0,
			options: [
				{
					value: '0',
					label: '中图分类法'
				},
				{
					value: '1',
					label: '自定义分类'
				}
			],
			bookCategory: '0',
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
		handleSelect(key, keyPath) {
			this.activeIndex = key;
		}
	}
};
</script>
<template>
	<div class="jgsz-wrap">
		<section>
			<el-menu
				:default-active="activeIndex"
				class="el-menu-demo"
				mode="horizontal"
				@select="handleSelect"
			>
				<el-menu-item index="0">图书分类设置</el-menu-item>
				<el-menu-item index="1">用户组管理</el-menu-item>
			</el-menu>
		</section>
		<keep-alive>
			<section v-if="activeIndex==='0'" class="m-t-20">
				<div>
					<span class="col-1 f-s-14 m-r-20">图书分类方式</span>
					<el-select v-model="bookCategory" size="small">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div v-if="bookCategory === '0'" class="flex-center flex-space-b flex-wrap m-t-20">
					<el-tag v-for="item in 22" :key="item" class="m-t-20">马克思主义、列宁主义、毛泽东思想</el-tag>
				</div>
				<div v-if="bookCategory === '1'" class="m-t-20">
					<div class="flex-center flex-left flex-wrap">
						<el-tag v-for="item in 10" :key="item" class="m-t-20 m-r-20" closable>科技类</el-tag>
					</div>
					<div class="m-t-20">
						<el-button type="primary" size="small">新增分类</el-button>
					</div>
				</div>

				<section class="way-wrap flex m-t-40">
					<span class="col-1 f-s-14">索书号定义</span>
					<div
						v-for="(item, index) in 3"
						:key="item"
						:class="['way-card f-s-14 col-1', {'active-acrd': index === activeCardIndex}]"
					>
						<span>方式一</span>
						<span>定义规则：这里写具体规则这里写具体规则这里写具体规则这里写具体规则这里写具体规则</span>
					</div>
				</section>

				<section class="m-t-50 flex-center">
					<el-button>取消</el-button>
					<el-button type="primary">保存设置</el-button>
				</section>
			</section>
			<section v-else-if="activeIndex==='1'" class="m-t-10">
				<el-table
					:cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333'
					}"
					:header-cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333',
                        fontWeight: 'normal'
					}"
					:data="tableData"
					highlight-current-row
					border
					style="width: 100%"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="55" label="序号"></el-table-column>
					<el-table-column prop="date" label="用户组名称"></el-table-column>
					<el-table-column prop="name" label="可借本书"></el-table-column>
					<el-table-column prop="address" label="借阅周期"></el-table-column>
					<el-table-column prop="address" label="续借次数"></el-table-column>
					<el-table-column prop="address" label="续借周期"></el-table-column>
					<el-table-column prop="address" label="用户组人数"></el-table-column>
					<el-table-column label="操作" width="180">
						<template v-slot="scope">
							<el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
							<el-button type="text" class="col-7" size="small" @click="handleClick(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</section>
		</keep-alive>
		<section v-if="activeIndex==='1'" class="absolute r-20 t-20">
			<el-button plain type="info" size="small" icon="el-icon-document-add">新建</el-button>
			<el-button plain type="info" size="small" icon="el-icon-delete">删除</el-button>
		</section>
	</div>
</template>


<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.jgsz-wrap {
	background-color: #fff;
	padding: 20px;
	padding-top: 0;
	position: relative;
	.way-wrap {
		height: 130px;
	}
	.way-card {
		border: 1px solid #d8d8d8;
		height: 100%;
		width: 26%;
		border-radius: 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20px;
		cursor: pointer;
		&.active-acrd {
			background-color: #d3b9b9;
		}
	}
}
</style>