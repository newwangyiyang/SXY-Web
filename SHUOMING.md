#### 运营中心

1. 图书统计:

    1. 首页日期自定义弹窗样式暂未提供
    2. 图书借阅数据各个卡片跳转暂未设置
    3. 图书分类统计导出当前和全部导出结果一样，即传递 ids 无效（需跟后台接口对接）
    4. 热门借阅榜单: 表格借阅记录“查看”按钮暂未设置
    5. 图书借阅数据: 馆藏地选择参数无用(collection_ids)，返回的数据列表始终是一样的

2. 读者统计

    1. 读者借阅数据各个卡片跳转暂未设置
    2. 借阅达人榜单: 表格借阅记录“查看”按钮暂未设置

3. 设备统计

    1. 设备使用统计各个卡片跳转暂未设置
    2. 设备统计: 设备异常列表: 处理接口暂无
    3. 设备使用统计: /admin/v2/stat/deviceBorrowData 接口 字段 online_count 累计运行天数存在负数现象

#### 图书管理

1. 馆藏查询

    1. 单本图书借阅记录: 导出接口 /admin/v2/book/excelBorrowList 出现异常

2. 新增图书

    1. 新增图书: 最近新增列表接口暂无
    2. 批量新增图书: 馆藏地字段该如何传递到后台

3. 图书荐购

    1. 状态、通知、删除 3 种批量操作的接口
    2. 对未处理的荐购是否需要处理，及处理接口(采纳、驳回、上架、通知及删除)

4. 图书采购

    1. 状态、删除、导出当前、导出全部 4 种批量操作的接口

#### 流通管理

1. 借阅列表

    1. 借阅列表: /admin/v2/borrow/search,该接口的借阅状态 type 字段，跟返回数据不一致( 0-借出；1-归还；2-超借；3-逾期；4-超借+逾期)
    2. 借阅状态未处理的操作接口暂无

```
@selection-change="handleSelectionChange"

// 3、 用户选择导出
handleSelectionChange(selectList) {
    this.ids = selectList.map((item) => item.id);
}

// 1、导出当前按钮
async handlerExportSelected() {
    if (this.ids.length <= 0) {
        this.$message('请选择你需要的导出内容');
    } else {
        const { data } = await excelUser({ ids: this.ids });
        this.downFile(data);
    }
},
// 2、导出全部按钮
async handlerExportAll() {
    const { data } = await excelUser();
    this.downFile(data);
},
```
