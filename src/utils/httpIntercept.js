import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './../router'
import {
        Message, Loading
} from 'element-ui';
Vue.use(VueResource)
let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法
        loading = Loading.service({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
                background: hexToRgba(localStorage.getItem("tremePackers") || '#409EFF', 0.1),
        })
}

//hex -> rgba
function hexToRgba(hex, opacity) {
        return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ','
                + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
}
function endLoading() { //使用Element loading-close 方法
        loading.close()
}
//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
function showFullScreenLoading() {
        if (needLoadingRequestCount === 0) {
                startLoading();
        }
        needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
        if (needLoadingRequestCount <= 0) return;
        needLoadingRequestCount--;
        if (needLoadingRequestCount === 0) {
                endLoading();
        }
};

Vue.http.interceptors.push((request, next) => {
        showFullScreenLoading();
        // modify request
        //   var token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6MTU2NjI5MDgyNTM4MCxcInVzSWRcIjo2ODE0LFwidXNlclJvbGVcIjpcIkFETUlOXCIsXCJ1dUlkXCI6XCIzMTdiOGQ2MDZkYTc0ZDZjOGM2Mjg2MTZiYzNmYzQ3MlwifSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxODgxNjUwODI1LCJpYXQiOjE1NjYyOTA3NjV9.s-STen7sYZ6Y3wUlO9LjzzF3VlBF3sLkGAXajq24PiU'
        request.headers.set('token', localStorage.token)
        //    request.headers.set('token', token)
        request.headers.set('clientId', 'default')
        // 携带cookie
        request.credentials = true;
        next((response) => {
                tryHideFullScreenLoading();
                if (response.status == 200) {
                        if (response.body.errorCode == 5001) {
                                Message({
                                        type: 'warning',
                                        message: response.body.errorMsg
                                })
                        } else if (response.body.errorCode == 5002) {
                                Message({
                                        type: 'warning',
                                        message: response.body.errorMsg
                                })
                        } else if (response.body.errorCode != 0) {
                                Message({
                                        message: response.body.errorMsg,
                                        type: 'error'
                                })
                                switch (response.body.errorCode) {
                                        case 1003:
                                                // router.push('/home')
                                                if (window.localStorage.getItem('logoutUrl')) {
                                                        window.location.href = window.localStorage.getItem('logoutUrl')//'http://172.16.29.76:8083/#/common/login'
                                                }
                                                break
                                }
                        }
                } else if (response.status == 401) {
                        Message({
                                message: response.body.errorMsg,
                                type: 'error'
                        })
                        localStorage.removeItem('token')
                        router.push('/login')
                } else {
                        Message({
                                message: "网络错误",
                                type: 'error'
                        })
                }

        })
})