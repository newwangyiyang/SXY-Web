import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
          title: '图书统计'
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
          title: '读者统计'
        },
        children: [{
            path: 'duzheshuju',
            name: 'Duzheshuju',
            component: () => import('@/views/yunyingzhongxin/duzhetongji/pages/duzheshuju'),
            meta: {
              title: '读者数据'
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
          title: '设备统计'
        },
        children: [{
            path: 'shuguishiyongtongji',
            name: 'Shuguishiyongtongji',
            component: () => import('@/views/yunyingzhongxin/shebeitongji/pages/shuguishiyongtongji'),
            meta: {
              title: '书柜使用统计'
            },
          },
          {
            path: 'shebeiyichangjilu',
            name: 'Shebeiyichangjilu',
            component: () => import('@/views/yunyingzhongxin/shebeitongji/pages/shebeiyichangjilu'),
            meta: {
              title: '设备异常记录'
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
          title: '馆藏查询'
        }
      },
      {
        path: 'xinzengtushu',
        name: 'Xinzengtushu',
        component: () => import('@/views/tushuguanli/xinzengtushu'),
        meta: {
          title: '新增图书'
        }
      },
      {
        path: 'tushujiangou',
        name: 'guancangchaxun',
        component: () => import('@/views/tushuguanli/tushujiangou'),
        meta: {
          title: '图书荐购'
        }
      },
      {
        path: 'tushucaigou',
        name: 'guancangchaxun',
        component: () => import('@/views/tushuguanli/tushucaigou'),
        meta: {
          title: '图书采购'
        }
      }
    ]
  },
  // {
  //   path: '/yonghuguanli',
  //   component: Layout,
  //   meta: {
  //     title: '用户管理'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'tushutongji',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: '图书统计'
  //     }
  //   }]
  // },
  // {
  //   path: '/liutongguanli',
  //   component: Layout,
  //   meta: {
  //     title: '流通管理'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'tushutongji',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: '图书统计'
  //     }
  //   }]
  // },
  // {
  //   path: '/shebeiguanli',
  //   component: Layout,
  //   meta: {
  //     title: '设备管理'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'tushutongji',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: '图书统计'
  //     }
  //   }]
  // },
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
        name: 'Jueseguanli',
        component: () => import('@/views/xitongpeizhi/jueseguanli'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'guanliyuan',
        name: 'Guanliyuan',
        component: () => import('@/views/xitongpeizhi/guanliyuan'),
        meta: {
          title: '管理员'
        }
      },
      {
        path: 'jigoushezhi',
        name: 'Jigoushezhi',
        component: () => import('@/views/xitongpeizhi/jigoushezhi'),
        meta: {
          title: '机构设置'
        }
      },
    ]
  },
  // {
  //   path: '/fenjigouguanli',
  //   component: Layout,
  //   meta: {
  //     title: '分机构管理'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'tushutongji',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: '图书统计'
  //     }
  //   }]
  // },
  {
    path: '/superShujudapan',
    component: Layout,
    redirect: '/superShujudapan/index',
    name: 'SuperShujudapan',
    meta: {
      title: '机构管理',
      roles: ['superAdmin']
    },
    children: [{
        path: 'index',
        name: 'Shujudapan',
        component: () => import('@/views/superShujudapan/shujudapan'),
        meta: {
          title: '数据大盘'
        }
      },
      {
        path: 'fenguanzhanghao',
        name: 'Fenguanzhanghao',
        component: () => import('@/views/superShujudapan/fenguanzhanghao'),
        meta: {
          title: '分馆账号'
        }
      },
    ]
  }
]

export const publicNavRoutes = [{
  path: '/xiaoxipublic',
  name: 'Xiaoxipublic',
  component: Layout,
  redirect: '/xiaoxipublic/index',
  meta: {
    title: '消息管理'
  },
  children: [{
      path: 'index',
      name: 'Xiaoxizhongxin',
      component: () => import('@/views/xiaoxipublic/xiaoxizhongxin'),
      meta: {
        title: '消息中心'
      }
    },
    {
      path: 'pintaigonggao',
      name: 'Pintaigonggao',
      component: () => import('@/views/xiaoxipublic/pintaigonggao'),
      meta: {
        title: '平台公告'
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
