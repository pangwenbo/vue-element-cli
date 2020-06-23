import baseApi from '@/api/base'
import * as types from './mutation-types'

const state = {
        allRoles: [], //所有用户角色
        areaData: [],
}

const getters = {
        allRoles: state => state.allRoles, //所有用户角色
        areaData: state => state.areaData,
}

const mutations = {
        [types.GET_USER_ROLES](state, payload) { //更新个人信息
                state.allRoles = payload;
        },
        [types.GET_AREAS](state, payload) { //
                state.areaData = payload;
        },

}

const actions = {
        getDepartTree({ commit }, param) {
                return baseApi.getDepartTree(param).then(res => {
                        return res;
                })
        },
        addOrUpdateSysDepart({ commit }, param) {
                return baseApi.addOrUpdateSysDepart(param).then(res => {
                        return res;
                })
        },
        deleteSysDepart({ commit }, param) {
                return baseApi.deleteSysDepart(param).then(res => {
                        return res;
                })
        },
        getSysUserPage({ commit }, param) {
                return baseApi.getSysUserPage(param).then(res => {
                        return res;
                })
        },
        addOrUpdateSysUser({ commit }, param) {
                return baseApi.addOrUpdateSysUser(param).then(res => {
                        return res;
                })
        },
        deleteSysUser({ commit }, param) {
                return baseApi.deleteSysUser(param).then(res => {
                        return res;
                })
        },
        getRolesPage({ commit }, param) {
                return baseApi.getRolesPage({ body: param }).then(res => {
                        return res;
                })
        },
        addOrUpdateRole({ commit }, param) {
                return baseApi.addOrUpdateRole({ body: param }).then(res => {
                        return res;
                })
        },
        deleteRole({ commit }, param) {
                return baseApi.deleteRole(param).then(res => {
                        return res;
                })
        },
        getDictPage({ commit }, param) {
                return baseApi.getDictPage(param).then(res => {
                        return res;
                })
        },
        addOrUpdateDict({ commit }, param) {
                return baseApi.addOrUpdateDict(param).then(res => {
                        return res;
                })
        },
        deleteDict({ commit }, param) {
                return baseApi.deleteDict(param).then(res => {
                        return res;
                })
        },
        getDictItemPage({ commit }, param) {
                return baseApi.getDictItemPage(param).then(res => {
                        return res;
                })
        },
        deleteDictItem({ commit }, param) {
                return baseApi.deleteDictItem(param).then(res => {
                        return res;
                })
        },
        addOrUpdateDictItem({ commit }, param) {
                return baseApi.addOrUpdateDictItem(param).then(res => {
                        return res;
                })
        },
        getRoles({ commit }, param) {
                return baseApi.getRoles(param).then(res => {
                        commit(types.GET_USER_ROLES, res.body.data)
                        return res;
                })
        },
        getAreas({ commit }, param) {
                return baseApi.getAreas(param).then(res => {
                        commit(types.GET_AREAS, res.body.data)
                        return res;
                })
        },
        addArea({ commit }, param) {
                return baseApi.addArea(param).then(res => {
                        return res;
                })
        },
        updateArea({ commit }, param) {
                return baseApi.updateArea(param).then(res => {
                        return res;
                })
        },
        deleteArea({ commit }, param) {
                return baseApi.deleteArea(param).then(res => {
                        return res;
                })
        },
        getArea({ commit }, param) {
                return baseApi.getArea(param).then(res => {
                        return res;
                })
        },
        getSysAnnouncementPage({ commit }, param) {
                return baseApi.getSysAnnouncementPage({ body: param }).then(res => {
                        return res;
                })
        },
        addOrUpdateSysAnnouncement({ commit }, param) {      //添加 编辑系统通告
                return baseApi.addOrUpdateSysAnnouncement({ body: param }).then(res => {
                        return res;
                })
        },
        getSysAnnouncement({ commit }, param) {   //系统通告-通过Id查询
                return baseApi.getSysAnnouncement(param).then(res => {
                        return res
                })
        },
        deleteSysAnnouncement({ commit }, param) {
                return baseApi.deleteSysAnnouncement(param).then(res => {
                        return res;
                })
        },
        // 系统管理-我的消息
        getSysAnnounceReadInfoPage({ commit }, param) {
                return baseApi.getSysAnnounceReadInfoPage({ body: param }).then(res => {
                        return res;
                })
        },
        //系统管理-我的消息一键全部已读
        readAll({ commit }, param) {
                return baseApi.readAll(param).then(res => {
                        return res;
                })
        },
        //系统管理-我的消息 查看详情已读
        addOrUpdateSysAnnounceReadInfo({ commit }, param) {
                return baseApi.addOrUpdateSysAnnounceReadInfo({ body: param }).then(res => {
                        return res;
                })
        },
        //获取菜单树
        getMenuTree({ commit }, param) {
                return baseApi.getMenuTree(param).then(res => {
                        return res;
                })
        },
        //删除一个菜单
        deleteMenu({ commit }, param) {
                return baseApi.deleteMenu(param).then(res => {
                        return res;
                })
        },
        //添加、修改菜单
        addMenu({ commit }, param) {
                return baseApi.addMenu(param).then(res => {
                        return res;
                })
        },
        //获取一个菜单详情
        getOneMenu({ commit }, param) {
                return baseApi.getOneMenu(param).then(res => {
                        return res;
                })
        },
        // 获取字典
        getDictItemList({ commit }, param) {
                return baseApi.getDictItemList(param).then(res => {
                        return res;
                })
        },
        // 用户导入
        importSysUser({ commit }, param) {
                return baseApi.importSysUser(param).then(res => {
                        return res;
                })
        },
        // 部门导入
        importSysDepart({ commit }, param) {
                return baseApi.importSysDepart(param).then(res => {
                        return res;
                })
        },
        // 修改用户状态
        updateAuthUserState({ commit }, param) {
                return baseApi.updateAuthUserState(param).then(res => {
                        return res;
                })
        },
        // 修改密码
        resetAuthUserPassword({ commit }, param) {
                return baseApi.resetAuthUserPassword(param).then(res => {
                        return res;
                })
        },
}

export default {
        // namespaced: true,
        state,
        getters,
        mutations,
        actions
}