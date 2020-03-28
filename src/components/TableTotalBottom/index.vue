
<script>
export default {
	name: 'TabelTotalBottom',
	props: {
		totalTableData: {
			type: Array,
			default: () => []
		}
	}
};
</script>
<template>
	<section class="total-table-wrap bg-5 m-t-20">
		<el-table
			:cell-style="{
						textAlign: 'center',
						fontSize: 14,
						color: '#333',
						height: '60px',
						lineHeight: '60px',
						backgroundColor: '#EEF0F0'
					}"
			:data="totalTableData"
			:show-header="false"
			highlight-current-row
			border
			style="width: 100%"
		>
			<el-table-column prop="title" width="110" label="合计"></el-table-column>
			<el-table-column width="160">
				<template v-slot="{row}">{{row.dateSatrt || '-'}}</template>
			</el-table-column>
			<el-table-column label="时间" width="160">
				<template v-slot="{row}">{{row.dateEnd || '-'}}</template>
			</el-table-column>
			<el-table-column>
				<template v-slot="{row}">
					<div class="flex-center flex-col flex-space-a">
						<span>借出数量</span>
						<span class="f-s-20">{{row.name}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column>
				<template v-slot="{row}">
					<div class="flex-center flex-col flex-space-a">
						<span>归还数量</span>
						<span class="f-s-20">{{row.name}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column>
				<template v-slot="{row}">
					<div class="flex-center flex-col flex-space-a">
						<span>图书余量</span>
						<span class="f-s-20">{{row.name}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column>
				<template v-slot="{row}">
					<div class="flex-center flex-col flex-space-a">
						<span>图书总量</span>
						<span class="f-s-20">{{row.name}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column>
				<template v-slot="{row}">
					<div class="flex-center flex-col flex-space-a">
						<span>异常借阅</span>
						<span class="f-s-20">{{row.name}}</span>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>


<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.total-table-wrap {
	padding-top: 20px;
	padding-bottom: 20px;
	::v-deep .el-table {
		border: 0;
		th,
		tr,
		td {
			border: 0;
			background-color: #fff;
		}
		&::before {
			height: 0px;
		}
		&::after {
			width: 0;
		}

		.el-table__fixed:before {
			height: 0;
		}
	}
}
</style>