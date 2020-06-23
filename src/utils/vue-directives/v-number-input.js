
function install(Vue, options) {
        Vue.directive('number-input', {
                bind(el, binding, vnode) {
                        const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
                        ele.addEventListener('input', onInput(el, ele, binding, vnode), false)
                },
        })
}
function onInput(el, ele, binding, vnode) {
        function handle() {
                // 只保留数字
                ele.value = ele.value.replace(/[^\d]/g, '')
        }
        return handle
}

export default install