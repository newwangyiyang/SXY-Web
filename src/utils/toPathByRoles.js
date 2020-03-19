import store from '../store';
/**
 * 根据角色权限roles跳转到不同的路由
 */
export const getPathByRoles = () => {
  const roles = store.getters.roles;
  if (roles.includes('superAdmin')) {
    return '/superShujudapan'
  } else if (roles.includes('admin')) {
    return '/yunyingzhongxin'
  } else {
    return '/';
  }
}
/**
 * 登陆时根据token判断需要跳转的页面
 */
export const getPathLogin = (token) => {
  if (token.includes('super')) {
    return '/superShujudapan'
  } else {
    return '/yunyingzhongxin'
  }
}
