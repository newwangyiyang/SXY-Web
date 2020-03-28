export const treeData = [{
  name: '西安市教育局',
  value: '1',
  itemStyle: {
    color: 'white'
  },
  label: {
    color: '#333'
  },
  oid: 'a1',
  children: [{
      name: '雁塔区教育局',
      value: '2',
      children: [{
          name: '绿地小学01',
          value: '3',
          itemStyle: {
            color: 'white'
          },
          children: [{
              name: '中心馆'
            },
            {
              name: '书柜名称书柜名称书柜名称'
            },
            {
              name: '书柜名称书柜'
            },
          ]
        },
        {
          name: '绿地小学02',
          value: '3',
          children: [{
            name: '中心馆'
          }]
        },
        {
          name: '绿地小学03',
          value: '3',
          children: [{
            name: '中心馆'
          }]
        },
      ]
    },
    {
      name: '长安区教育局',
      itemStyle: {
        color: 'white'
      },
      value: '2',
      children: [{
        name: '绿地小学04',
        value: '3',
        children: [{
          name: '中心馆'
        }, {
          name: '书柜名称书柜名称书柜名称'
        }]
      }]
    },
    {
      name: '灞桥区教育局',
      value: '2',
      itemStyle: {
        color: 'white'
      },
      children: [{
          name: '绿地小学05',
          value: '3',
          children: [{
              name: '中心馆'
            },
            {
              name: '书柜名称书柜名称书柜名称'
            },
            {
              name: '书柜名称'
            }
          ]
        },
        {
          name: '绿地小学06',
          value: '3',
          children: [{
            name: '中心馆'
          }]
        },
        {
          name: '绿地小学07',
          value: '3',
          children: [{
            name: '书柜名称书柜名称'
          }]
        },
      ]
    }
  ]
}]


export const option = (treeData) => ({
  columns: ['name', 'value'],
  rows: [{
    name: 'tree1',
    value: treeData
  }]
})

export const settings = {
  seriesMap: {
    tree1: {
      symbol: 'rect',
      symbolSize: (value) => {
        if (value === 1) return [160, 400]
        if (value === 2) return [160, 100]
        if (value === 3) return [160, 50]
        return [160, 25]
      },
      expandAndCollapse: false,
      itemStyle: {
        color: 'white',
        borderColor: '#ccc',
        borderWidth: 1
      },
      lineStyle: {
        curveness: 0
      },

    }
  }
}
