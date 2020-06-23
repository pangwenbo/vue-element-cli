import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

export const uploadFile = function (file, url) {
        let data = {
                fileName: file.name,
                bucket: 'jpxx'
        }
        let getUploadFileToken = new Promise((resolve, reject) => {      //获取上传文件token
                store.dispatch('getUploadFileToken', data).then(res => {
                        resolve(res)
                }).catch(err => {
                        reject(err)
                })
        })
        return new Promise((resolve, reject) => {
                getUploadFileToken.then(res => {
                        console.log('获取token成功', res)
                        const formData = new FormData()
                        formData.append("token", res.body.data.token)
                        formData.append("key", res.body.data.key)
                        formData.append("file", file)
                        axios.post(url ? url : Vue.prototype.$uploadUrl, formData).then(ret => {     //上传图片
                                console.log('上传成功', ret)
                                if (url) {
                                        resolve(ret)
                                } else {
                                        resolve(res)
                                }

                        }).catch(err => {
                                console.log('上传失败', err)
                                reject(err)
                        })
                }).catch(err => {
                        console.log('获取上传文件token失败', err)
                        reject(err)
                })
        })
}