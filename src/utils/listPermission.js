export function listPermission(permissionArray) {
        const permissionResult = {}
        permissionArray.map((item) => {
                if (window.store.getters.userPermissions.indexOf(item) < 0) {
                        //没有此权限
                        permissionResult[item.split(':')[1]] = false
                } else {
                        //有此权限
                        permissionResult[item.split(':')[1]] = true
                }
        })
        return permissionResult;
}

