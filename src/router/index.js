import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import superLauout from '@/superLayout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const navRoutes = [{
    path: '/yunyingzhongxin',
    component: Layout,
    redirect: '/yunyingzhongxin/index',
    name: 'Yunyingzhongxin',
    meta: {
      title: '运营中心',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'Tushutongji',
        component: () => import('@/views/yunyingzhongxin/tushutongji'),
        meta: {
          title: '图书统计',
          icon: 'icontushu'
        },
        children: [{
            path: 'tushujieyueshuju',
            name: 'Tushujieyueshuju',
            component: () => import('@/views/yunyingzhongxin/tushutongji/pages/tushujieyueshuju'),
            meta: {
              title: '图书借阅数据'
            },
          },
          {
            path: 'tushufenleitongji',
            name: 'Tushufenleitongji',
            component: () => import('@/views/yunyingzhongxin/tushutongji/pages/tushufenleitongji'),
            meta: {
              title: '图书分类统计'
            },
          },
          {
            path: 'remenjieyuebangdan',
            name: 'Remenjieyuebangdan',
            component: () => import('@/views/yunyingzhongxin/tushutongji/pages/remenjieyuebangdan'),
            meta: {
              title: '热门借阅榜单'
            },
          },
        ],
      },
      {
        path: 'duzhetongji',
        name: 'Duzhetongji',
        component: () => import('@/views/yunyingzhongxin/duzhetongji'),
        meta: {
          title: '读者统计',
          icon: 'iconduzhe'
        },
        children: [{
            path: 'duzheshuju',
            name: 'Duzheshuju',
            component: () => import('@/views/yunyingzhongxin/duzhetongji/pages/duzheshuju'),
            meta: {
              title: '读者借阅数据'
            },
          },
          {
            path: 'duzhehuoyu',
            name: 'Duzhehuoyu',
            component: () => import('@/views/yunyingzhongxin/duzhetongji/pages/duzhehuoyu'),
            meta: {
              title: '读者活跃'
            },
          },
          {
            path: 'jieyuedarenbangdan',
            name: 'Jieyuedarenbangdan',
            component: () => import('@/views/yunyingzhongxin/duzhetongji/pages/jieyuedarenbangdan'),
            meta: {
              title: '借阅达人榜单'
            },
          },
        ]
      },
      {
        path: 'shebeitongji',
        name: 'Shebeitongji',
        component: () => import('@/views/yunyingzhongxin/shebeitongji'),
        meta: {
          title: '设备统计',
          icon: 'iconshebei'
        },
        children: [{
            path: 'shuguishiyongtongji',
            name: 'Shuguishiyongtongji',
            component: () => import('@/views/yunyingzhongxin/shebeitongji/pages/shuguishiyongtongji'),
            meta: {
              title: '设备使用统计'
            },
          },
          {
            path: 'shebeiyichangjilu',
            name: 'Shebeiyichangjilu',
            component: () => import('@/views/yunyingzhongxin/shebeitongji/pages/shebeiyichangjilu'),
            meta: {
              title: '设备异常'
            },
          }
        ]
      },
    ]
  },
  {
    path: '/tushuguanli',
    component: Layout,
    name: 'Tushuguanli',
    redirect: '/tushuguanli/index',
    meta: {
      title: '图书管理',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'Guanchangchaxun',
        component: () => import('@/views/tushuguanli/guanchangchaxun'),
        meta: {
          title: '馆藏查询',
          icon: 'iconguancangchaxun'
        },
        children: [{
            path: 'tushuxinxibianji',
            name: 'Tushuxinxibianji',
            component: () => import('@/views/tushuguanli/guanchangchaxun/pages/tushuxinxibianji'),
            meta: {
              title: '图书信息编辑'
            }
          },
          {
            path: 'jieyuejilu',
            name: 'Jieyuejilu',
            component: () => import('@/views/tushuguanli/guanchangchaxun/pages/jieyuejilu'),
            meta: {
              title: '借阅记录'
            }
          }
        ]
      },
      {
        path: 'xinzengtushu',
        name: 'Xinzengtushu',
        component: () => import('@/views/tushuguanli/xinzengtushu'),
        meta: {
          title: '新增图书',
          icon: 'icontushu1'
        }
      },
      {
        path: 'tushujiangou',
        name: 'Tushujiangou',
        component: () => import('@/views/tushuguanli/tushujiangou'),
        meta: {
          title: '图书荐购',
          icon: 'icontuijian'
        }
      },
      {
        path: 'tushucaigou',
        name: 'Tushucaigou',
        component: () => import('@/views/tushuguanli/tushucaigou'),
        meta: {
          title: '图书采购',
          icon: 'iconcaigou'
        }
      }
    ]
  },
  {
    path: '/yonghuguanli',
    name: 'Yonghuguanli',
    component: Layout,
    redirect: '/yonghuguanli/index',
    meta: {
      title: '用户管理',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'Yonghuchaxun',
        component: () => import('@/views/yonghuguanli/yonghuchaxun'),
        meta: {
          title: '用户查询'
        },
        children: [{
            path: 'yonghuxinxibianji',
            name: 'Yonghuxinxibianji',
            meta: {
              title: '编辑'
            },
            component: () => import('@/views/yonghuguanli/yonghuchaxun/pages/yonghuxinxibianji')
          },
          {
            path: 'yonghujieyuejilu',
            name: 'Yonghujieyuejilu',
            meta: {
              title: '借阅记录'
            },
            component: () => import('@/views/yonghuguanli/yonghuchaxun/pages/yonghujieyuejilu')
          },
        ]
      },
      {
        path: 'yonghuxinzeng',
        name: 'Yonghuxinzeng',
        component: () => import('@/views/yonghuguanli/yonghuxinzeng'),
        meta: {
          title: '用户新增',
          icon: 'iconyonghu-xinzeng'
        }
      }
    ]
  },
  {
    path: '/liutongguanli',
    name: 'Liutongguanli',
    redirect: '/liutongguanli/index',
    component: Layout,
    meta: {
      title: '流通管理',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'LTJieyueliebiao',
        component: () => import('@/views/liutongguanli/jieyueliebiao'),
        meta: {
          title: '借阅列表',
          icon: 'iconliebiao-xiangqingxbiaogetianchong'
        }
      },
      {
        path: 'jiehuanshu',
        name: 'Jiehuanshu',
        component: () => import('@/views/liutongguanli/jiehuanshu'),
        meta: {
          title: '借还书',
          icon: 'iconbook'
        }
      }
    ]
  },
  {
    path: '/shebeiguanli',
    name: 'Shebeiguanli',
    redirect: '/shebeiguanli/index',
    component: Layout,
    meta: {
      title: '设备管理',
      roles: ['admin']
    },
    children: [{
      path: 'index',
      name: 'Sebeiliebiao',
      component: () => import('@/views/sebeiguanli/sebeiliebiao'),
      meta: {
        title: '设备列表',
        icon: 'iconshebei'
      },
      children: [{
        path: 'shebeipeizhi',
        name: 'Shebeipeizhi',
        component: () => import('@/views/sebeiguanli/sebeiliebiao/pages/shebeipeizhi'),
        meta: {
          title: '设备配置'
        }
      }]
    }]
  },
  {
    path: '/xitongpeizhi',
    component: Layout,
    name: 'Xitongpeizhi',
    redirect: '/xitongpeizhi/index',
    meta: {
      title: '系统配置',
      roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'Guanliyuan',
        component: () => import('@/views/xitongpeizhi/guanliyuan'),
        meta: {
          title: '管理员',
          icon: 'iconguanliyuan'
        }
      },
      {
        path: 'jigoushezhi',
        name: 'Jigoushezhi',
        component: () => import('@/views/xitongpeizhi/jigoushezhi'),
        meta: {
          title: '机构设置',
          icon: 'iconjigouzheshezhi'
        }
      },
      {
        path: 'zhanghaoshezhi',
        name: 'Zhanghaoshezhi',
        component: () => import('@/views/xitongpeizhi/zhanghaoshezhi'),
        meta: {
          title: '账号设置',
          icon: 'iconshezhi'
        }
      },
    ]
  },
  {
    path: '/superShujudapan',
    component: superLauout,
    redirect: '/superShujudapan/index',
    name: 'SuperShujudapan',
    meta: {
      title: '数据大盘',
      roles: ['superAdmin']
    },
    children: [{
      path: 'index',
      name: 'Shujudapan',
      component: () => import('@/views/superShujudapan/shujudapan'),
      meta: {
        title: '数据大盘'
      }
    }]
  },
  {
    path: '/superShujudapanSon',
    component: Layout,
    redirect: '/superShujudapan/index',
    name: 'SuperShujudapanSon',
    meta: {
      title: '数据大盘',
      roles: ['superAdmin']
    },
    children: [{
        path: 'index',
        name: 'SuperTushujieyueshuju',
        component: () => import('@/views/superShujudapan/shujudapan/superTushujieyueshuju'),
        meta: {
          title: '图书借阅数据',
          icon: 'icontushu'
        }
      },
      {
        path: 'superDuzhejieyueshuju',
        name: 'SuperDuzhejieyueshuju',
        component: () => import('@/views/superShujudapan/shujudapan/superDuzhejieyueshuju'),
        meta: {
          title: '读者借阅数据'
        }
      },
      {
        path: 'superShebeishiyongtongji',
        name: 'SuperShebeishiyongtongji',
        component: () => import('@/views/superShujudapan/shujudapan/superShebeishiyongtongji'),
        meta: {
          title: '设备使用统计'
        },
        children: [{
          path: 'superShebeiyichang',
          name: 'SuperShebeiyichang',
          component: () => import('@/views/superShujudapan/shujudapan/superShebeishiyongtongji/pages/superShebeiyichang'),
          meta: {
            title: '设备异常'
          }
        }]
      },
      {
        path: 'superTushufenleitongji',
        name: 'SuperTushufenleitongji',
        component: () => import('@/views/superShujudapan/shujudapan/superTushufenleitongji'),
        meta: {
          title: '图书借阅类别'
        }
      },
      {
        path: 'superRemenjieyuebangdan',
        name: 'SuperRemenjieyuebangdan',
        component: () => import('@/views/superShujudapan/shujudapan/superRemenjieyuebangdan'),
        meta: {
          title: '热门借阅榜单'
        }
      },
      {
        path: 'superJieyuedarenbangdan',
        name: 'SuperJieyuedarenbangdan',
        component: () => import('@/views/superShujudapan/shujudapan/superJieyuedarenbangdan'),
        meta: {
          title: '借阅达人榜单'
        }
      },
    ]
  }, {
    path: '/superXitongpeizhi',
    component: Layout,
    redirect: '/superXitongpeizhi/index',
    name: 'SuperXitongpeizhi',
    meta: {
      title: '系统配置',
      roles: ['superAdmin']
    },
    children: [{
        path: 'index',
        name: 'Guanliyuan',
        component: () => import('@/views/superXitongpeizhi/superGuanliyuan'),
        meta: {
          title: '管理员',
          icon: 'iconguanliyuan'
        }
      },
      {
        path: 'superFenguanzhanghao',
        name: 'SuperFenguanzhanghao',
        component: () => import('@/views/superXitongpeizhi/superFenguanzhanghao'),
        meta: {
          title: '分馆账号',
          icon: ''
        }
      },
      {
        path: 'superZhanghaoshezhi',
        name: 'SuperZhanghaoshezhi',
        component: () => import('@/views/superXitongpeizhi/superZhanghaoshezhi'),
        meta: {
          title: '账号设置',
          icon: 'iconshezhi'
        }
      }
    ]
  }
]

export const publicNavRoutes = [{
  path: '/xiaoxipublic',
  name: 'Xiaoxipublic',
  component: Layout,
  redirect: '/xiaoxipublic/index',
  meta: {
    title: '消息管理',
  },
  children: [{
      path: 'index',
      name: 'Xiaoxizhongxin',
      component: () => import('@/views/xiaoxipublic/xiaoxizhongxin'),
      meta: {
        title: '消息中心',
        icon: 'iconmessage-fill'
      }
    },
    {
      path: 'pintaigonggao',
      name: 'Pintaigonggao',
      component: () => import('@/views/xiaoxipublic/pintaigonggao'),
      meta: {
        title: '平台公告',
        icon: 'icongonggao'
      },
      children: [{
        path: 'gonggaoxiangqing',
        name: 'Gonggaoxiangqing',
        component: () => import('@/views/xiaoxipublic/pintaigonggao/pages/gonggaoxiangqing'),
        meta: {
          title: '公告详情'
        }
      }]
    }
  ]
}, ]

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  ...publicNavRoutes,
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login'
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  ...navRoutes,
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
