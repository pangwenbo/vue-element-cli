import baseApi from '@/api/base'
import * as types from './mutation-types'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    getAttachmentPage ({ commit }, param) {
        return baseApi.getAttachmentPage(param).then(res => {
            return res;
        })
    },
    modelList({ commit }, param) {
        return baseApi.modelList(param).then(res => {
            return res;
        })
    },
    newModel({ commit }, param) {
        return baseApi.newModel(param).then(res => {
            return res;
        })
    },
    getProcessImg({ commit }, param) {
        return baseApi.getProcessImg(param).then(res => {
            return res;
        })
    },
    changeProcessStatus({ commit }, param) {
        return baseApi.changeProcessStatus(param).then(res => {
            return res;
        })
    },
    convertToModel({ commit }, param) {
        return baseApi.convertToModel(param).then(res => {
            return res;
        })
    },
    deployment({ commit }, param) {
        return baseApi.deployment(param).then(res => {
            return res;
        })
    },
    deleteModel({ commit }, param) {
        return baseApi.deleteModel(param).then(res => {
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