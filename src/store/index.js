import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common/index'
import system from './modules/system/index'
import systemMonitor from './modules/systemMonitor/index'
import messageCenter from './modules/messageCenter/index'
import process from './modules/process/index'
Vue.use(Vuex)

const store = new Vuex.Store({
        modules: {
                app,
                common,
                system,
                systemMonitor,
                messageCenter,
                process,

        },
        getters
})
export default store