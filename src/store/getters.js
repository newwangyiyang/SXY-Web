const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  orgName: state => state.user.org_name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  activeRoutes: state => state.routes.activeRoutes,
  activePrePath: state => state.routes.activePrePath,
  activeBookForUpdate: state => state.tushuguanli.activeBookForUpdate,
}
export default getters
