import baseApi from '@/api/base'
import * as types from './mutation-types'

const state = {
        usermenus: [], //菜单栏
        leftmenus: [],//左侧菜单栏
        ownInfo: {}, //当前用户信息
        headerNotice: {},
        color: "",
        ws: () => {
        },
        ws_msg: "",
        titleHeight: 90,
}

const getters = {
        leftmenus: state => state.leftmenus, //左侧菜单栏
        ws: state => state.ws, //websocket
        usermenus: state => state.usermenus, //菜单栏
        ownInfo: state => state.ownInfo, //用户信息    
        color: state => state.color, //颜色   
        titleHeight: state => state.titleHeight, //颜色  
}

const mutations = {
        [types.SET_LEFT_MENUS](state, leftmenus) { //更新左侧菜单栏
                state.leftmenus = leftmenus
        },
        [types.SET_TITILE_HEIGHT](state, titleHeight) { //更新个人信息
                state.titleHeight = titleHeight
        },
        [types.SET_COLOR](state, color) { //更新个人信息
                state.color = color
        },
        [types.SET_WS](state, ws) { //更新个人信息
                state.ws = ws
        },
        [types.GET_OWNINFO](state, payload) { //更新个人信息
                state.ownInfo = payload;
                state.usermenus = payload.menus
        },
        clearOwnInfo(state, payload) {       //清除个人信息
                state.ownInfo = {};
                state.usermenus = []
        },
        [types.UPDATE_HEADER_NOTICE](state, payload) {
                state.headerNotice = payload
        }
}

const actions = {
        setLeftMenus({ commit }, param) {
                return commit(types.SET_LEFT_MENUS, param)
        },
        setTitleHeight({ commit }, param) {
                return commit(types.SET_TITILE_HEIGHT, param)
        },
        //提交ws
        setColor({ commit }, param) {
                return commit(types.SET_COLOR, param)
        },
        //提交ws
        setWs({ commit }, param) {
                return commit(types.SET_WS, param)
        },
        //获取验证码图片
        getVerificationCode({ commit }, param) {
                return baseApi.generateVcode(param).then(ret => {
                        return ret;
                });
        },
        login({ commit }, param) {
                return baseApi.login(param).then(res => {
                        // commit(types.SET_TOKEN, ret.body.data)
                        localStorage.setItem('token', res.body.data)
                        return res
                })
        },
        loginOut({ commit }, param) {
                return baseApi.loginOut(param).then(res => {
                        console.log('退出登录成功', res)
                })
        },
        getSysUserInfo({ commit }, param) { //获取用户信息
                return baseApi.getSysUserInfo(param).then(res => {
                        res.body.data.id = res.body.data.id + ''
                        commit(types.GET_OWNINFO, res.body.data)
                        return res
                })
        },
        updateAuthUserPassword({ commit }, param) { //修改密码
                return baseApi.updateAuthUserPassword(param).then(res => {
                        return res
                })
        },
        getUploadFileToken({ commit }, param) { //获取上传文件token
                return baseApi.getUploadFileToken(param).then(res => {
                        return res
                })
        },
        updateSysUser({ commit }, param) {
                return baseApi.updateSysUser({ body: param }).then(res => {
                        console.log('用户更新成功', res)
                        return res
                })
        },
        getUserTree({ commit }, param) {      //获取用户树
                return baseApi.getUserTree(param).then(res => {
                        return res
                })
        },
        countAnnounceReadInfo({ commit }, param) {    //获取头部未读消息
                return baseApi.countAnnounceReadInfo(param).then(res => {
                        commit(types.UPDATE_HEADER_NOTICE, res.body.data)
                        return res
                })
        },
        indexSaleData({ commit }, param) {    //获取首页
                return baseApi.indexSaleData(param).then(res => {
                        return res
                })
        }
}

export default {
        // namespaced: true,
        state,
        getters,
        mutations,
        actions
}