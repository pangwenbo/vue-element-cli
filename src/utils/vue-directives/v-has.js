export default {
        install(Vue, options) {
                Vue.directive('has', {
                        inserted: (el, binding, vnode) => {
                                if (window.store.getters.userPermissions.indexOf(binding.value) < 1) {
                                        console.log('没有此权限')
                                        el.parentNode.removeChild(el)
                                } else {
                                        console.log('有此权限')
                                }
                        }
                });
        }
}