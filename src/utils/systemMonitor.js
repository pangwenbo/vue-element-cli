import axios from 'axios'
/**
 * 例如
 */
let apiUrl = 'http://jpds.dev.jpsycn.com/shop/actuator/httptrace'
let baseUrl = 'http://jpds.dev.jpsycn.com/shop/actuator' 
export function httpTrace(params) {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            params: {
                _t: params._t
            }

        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export function tomcat(url,params) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl+url, {
            params: {
                _t: params._t
            }

        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function functionPost(body) {
    return new Promise((resolve, reject) => {
        axios.post('基地址 + api路径', body).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//end