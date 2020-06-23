const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.common.ownInfo.name,
  userPermissions: state => state.common.ownInfo.userPermissions ? state.common.ownInfo.userPermissions.admin : {}
}
export default getters
