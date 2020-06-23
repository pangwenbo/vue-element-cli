import baseApi from '@/api/base'
import * as types from './mutation-types'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
        importData({ commit }, param) {
                return baseApi.importData(param).then(res => {
                        return res;
                })
        },
        getMessagePage({ commit }, param) {
                return baseApi.getMessagePage(param).then(res => {
                        return res;
                })
        },
        getMessageTemplatePage({ commit }, param) {
                return baseApi.getMessageTemplatePage(param).then(res => {
                        return res;
                })
        },
        addMessageTemplate({ commit }, param) {
                return baseApi.addMessageTemplate({ body: param }).then(res => {
                        return res;
                })
        },
        updateMessageTemplate({ commit }, param) {
                return baseApi.updateMessageTemplate({ body: param }).then(res => {
                        return res;
                })
        },
        addMessage({ commit }, param) {
                return baseApi.addMessage({ body: param }).then(res => {
                        return res;
                })
        },
        updateMessage({ commit }, param) {
                return baseApi.updateMessage({ body: param }).then(res => {
                        return res;
                })
        },
        deleteMessage({ commit }, param) {
                return baseApi.deleteMessage(param).then(res => {
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