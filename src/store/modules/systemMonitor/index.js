import baseApi from '@/api/base'
import * as types from './mutation-types'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
        // 获取日志分页
        getSyslogPage({ commit }, param) {
                return baseApi.getSyslogPage(param).then(res => {
                        return res;
                })
        },
        //获取磁盘信息

        queryDiskInfo({ commit }, param) {
                return baseApi.queryDiskInfo(param).then(res => {
                        return res;
                })
        },
        // 获取redis详细信息
        getRedisInfo({ commit }, param) {
                return baseApi.getRedisInfo(param).then(res => {
                        return res;
                })
        },
        // redis
        getKeysSize({ commit }, param) {
                return baseApi.getKeysSize(param).then(res => {
                        return res;
                })
        },
        // redis
        getMemoryInfo({ commit }, param) {
                return baseApi.getMemoryInfo(param).then(res => {
                        return res;
                })
        },
        getQuartzConfigPage({ commit }, param) { //获取定时任务分类
                return baseApi.getQuartzConfigPage(param).then(res => {
                        return res;
                })
        },
        findQuartzTypes({ commit }, param) { //获取任务分类
                return baseApi.findQuartzTypes(param).then(res => {
                        return res;
                })
        },
        addQuartzConfig({ commit }, param) { //添加,编辑定时任务
                return baseApi.addQuartzConfig({ body: param }).then(res => {
                        return res;
                })
        },
        updateQuartzConfig({ commit }, param) {      //编辑定时任务
                return baseApi.updateQuartzConfig({ body: param }).then(res => {
                        return res;
                })
        },
        deleteQuartzConfig({ commit }, param) { //删除定时任务
                return baseApi.deleteQuartzConfig(param).then(res => {
                        return res;
                })
        },
        pauseQuartzConfig({ commit }, param) {       //暂停定时任务
                return baseApi.pauseQuartzConfig(param).then(res => {
                        return res;
                })
        },
        resumeQuartzConfig({ commit }, param) {      //恢复定时任务
                return baseApi.resumeQuartzConfig(param).then(res => {
                        return res;
                })
        },
        runQuartzConfig({ commit }, param) {        //立即执行一次定时任务
                return baseApi.runQuartzConfig(param).then(res => {
                        return res;
                })
        },
        getQuartzLogPage({ commit }, param) {      //定时任务执行日志
                return baseApi.getQuartzLogPage(param).then(res => {
                        return res;
                })
        },
        getSysUser({ commit }, param) {      //通过ID查询用户
                return baseApi.getSysUser(param).then(res => {
                        return res;
                })
        },
        getSysUserByUserName({ commit }, param) {      //通过用户名查询用户
                return baseApi.getSysUserByUserName(param).then(res => {
                        return res;
                })
        },
        getDataSnapshotPage({ commit }, param) {      //数据快照
                return baseApi.getDataSnapshotPage(param).then(res => {
                        return res;
                })
        },
        dataVS({ commit }, param) {      //数据版本对比
                return baseApi.dataVS(param).then(res => {
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