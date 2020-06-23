import Vue from 'vue'
// let moduleName = ''
export default {
  /**
   * 获取dataSnapshot分页
   * @method
   * @name Api#getDataSnapshotPage
   */
  getDataSnapshotPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dataSnapshot/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取单个dataSnapshot
   * @method
   * @name Api#getDataSnapshot
   */
  getDataSnapshot(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dataSnapshot/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除dataSnapshot
   * @method
   * @name Api#deleteDataSnapshot
   */
  deleteDataSnapshot(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dataSnapshot/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加dataSnapshot
   * @method
   * @name Api#addDataSnapshot
   */
  addDataSnapshot(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dataSnapshot/addDataSnapshot'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['dataId'] !== undefined) {
      queryParameters['dataId'] = parameters['dataId']
    }

    if (parameters['dataId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: dataId'))
      return Promise
    }

    if (parameters['tableName'] !== undefined) {
      queryParameters['tableName'] = parameters['tableName']
    }

    if (parameters['tableName'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: tableName'))
      return Promise
    }

    if (parameters['uuId'] !== undefined) {
      queryParameters['uuId'] = parameters['uuId']
    }

    if (parameters['uuId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: uuId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 数据版本对比
   * @method
   * @name Api#dataVS
   */
  dataVS(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dataSnapshot/dataVS'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['id1'] !== undefined) {
      queryParameters['id1'] = parameters['id1']
    }

    if (parameters['id1'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id1'))
      return Promise
    }

    if (parameters['id2'] !== undefined) {
      queryParameters['id2'] = parameters['id2']
    }

    if (parameters['id2'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id2'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取一个系统全部的菜单按钮树ID（用于数据库添加超级管理员数据）
   * @method
   * @name Api#getMenuIDTree
   */
  getMenuIDTree(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/menus/menuIDTree'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['menuSys'] !== undefined) {
      queryParameters['menuSys'] = parameters['menuSys']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取一个菜单详情
   * @method
   * @name Api#getOneMenu
   */
  getOneMenu(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/menus/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除一个菜单
   * @method
   * @name Api#deleteMenu
   */
  deleteMenu(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/menus/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加（修改）一个菜单
   * @method
   * @name Api#addMenu
   */
  addMenu(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/menus'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取一个系统全部的菜单按钮树(用于菜单管理）
   * @method
   * @name Api#getMenuTree
   */
  getMenuTree(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/menus/menuTree'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['menuSys'] !== undefined) {
      queryParameters['menuSys'] = parameters['menuSys']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统测试-通过Id查询
   * @method
   * @name Api#getSysTest
   */
  getSysTest(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysTest/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统测试-通过Id删除
   * @method
   * @name Api#deleteSysTest
   */
  deleteSysTest(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysTest/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统测试-获取列表，用于上拉加载更多
   * @method
   * @name Api#getSysTestList
   */
  getSysTestList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysTest/list'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统测试-获取分页
   * @method
   * @name Api#getSysTestPage
   */
  getSysTestPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysTest/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统测试-添加|更新
   * @method
   * @name Api#addOrUpdateSysTest
   */
  addOrUpdateSysTest(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysTest'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 日志-分页获取日志
   * @method
   * @name Api#getSyslogPage
   */
  getSyslogPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/syslog'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加/更新字典项
   * @method
   * @name Api#addOrUpdateDictItem
   */
  addOrUpdateDictItem(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通过Id获取数据字典
   * @method
   * @name Api#getDict
   */
  getDict(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除数据字典
   * @method
   * @name Api#deleteDict
   */
  deleteDict(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 根据字典编码获取字典项
   * @method
   * @name Api#getDictItemList
   */
  getDictItemList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item/list/{dictCode}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{dictCode}', parameters['dictCode'])

    if (parameters['dictCode'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: dictCode'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通过Id获取字典项
   * @method
   * @name Api#getDictItem
   */
  getDictItem(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除数据字典项
   * @method
   * @name Api#deleteDictItem
   */
  deleteDictItem(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 校验字典项值
   * @method
   * @name Api#checkItemValue
   */
  checkItemValue(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item/checkItemValue'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['字典项id'] !== undefined) {
      queryParameters['字典项id'] = parameters['字典项id']
    }

    if (parameters['dictId'] !== undefined) {
      queryParameters['dictId'] = parameters['dictId']
    }

    if (parameters['dictId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: dictId'))
      return Promise
    }

    if (parameters['value'] !== undefined) {
      queryParameters['value'] = parameters['value']
    }

    if (parameters['value'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: value'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取字典项-分页
   * @method
   * @name Api#getDictItemPage
   */
  getDictItemPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 校验字典项文本
   * @method
   * @name Api#checkItemText
   */
  checkItemText(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/item/checkItemText'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['字典项id'] !== undefined) {
      queryParameters['字典项id'] = parameters['字典项id']
    }

    if (parameters['dictId'] !== undefined) {
      queryParameters['dictId'] = parameters['dictId']
    }

    if (parameters['dictId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: dictId'))
      return Promise
    }

    if (parameters['text'] !== undefined) {
      queryParameters['text'] = parameters['text']
    }

    if (parameters['text'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: text'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取数据字典-分页
   * @method
   * @name Api#getDictPage
   */
  getDictPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 校验字典编码
   * @method
   * @name Api#checkDictCode
   */
  checkDictCode(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/checkDictCode'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['id'] !== undefined) {
      queryParameters['id'] = parameters['id']
    }

    if (parameters['dictCode'] !== undefined) {
      queryParameters['dictCode'] = parameters['dictCode']
    }

    if (parameters['dictCode'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: dictCode'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 校验字典名称
   * @method
   * @name Api#checkDictName
   */
  checkDictName(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict/checkDictName'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['id'] !== undefined) {
      queryParameters['id'] = parameters['id']
    }

    if (parameters['dictName'] !== undefined) {
      queryParameters['dictName'] = parameters['dictName']
    }

    if (parameters['dictName'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: dictName'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加/更新数据字典
   * @method
   * @name Api#addOrUpdateDict
   */
  addOrUpdateDict(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/dict'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 服务是否活跃
   * @method
   * @name Api#isActive
   */
  isActive(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/active'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 账号登录
   * @method
   * @name Api#login
   */
  login(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/login'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    if (parameters['username'] !== undefined) {
      form['username'] = parameters['username']
    }

    if (parameters['username'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: username'))
      return Promise
    }

    if (parameters['password'] !== undefined) {
      form['password'] = parameters['password']
    }

    if (parameters['password'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: password'))
      return Promise
    }

    if (parameters['vcode'] !== undefined) {
      form['vcode'] = parameters['vcode']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 退出
   * @method
   * @name Api#loginOut
   */
  loginOut(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/login'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取图片验证码
   * @method
   * @name Api#generateVcode
   */
  generateVcode(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/login/getVcode'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 百度富文本编辑框获取配置接口
   * @method
   * @name Api#ueditorGetConfig
   */
  ueditorGetConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/file/ueditor'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'text/html'

    if (parameters['action'] !== undefined) {
      queryParameters['action'] = parameters['action']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 百度富文本编编辑器上传文件接口
   * @method
   * @name Api#ueditorServerUrl
   */
  ueditorServerUrl(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/file/ueditor'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'multipart/form-data'

    if (parameters['upfile'] !== undefined) {
      form['upfile'] = parameters['upfile']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 全部标为已读
   * @method
   * @name Api#readAll
   */
  readAll(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo/read/all'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通告查看情况-获取分页
   * @method
   * @name Api#getSysAnnounceReadInfoPage
   */
  getSysAnnounceReadInfoPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通告查看情况-获取列表，用于上拉加载更多
   * @method
   * @name Api#getSysAnnounceReadInfoList
   */
  getSysAnnounceReadInfoList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo/list'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通告查看情况-通过Id查询
   * @method
   * @name Api#getSysAnnounceReadInfo
   */
  getSysAnnounceReadInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通告查看情况-通过Id删除
   * @method
   * @name Api#deleteSysAnnounceReadInfo
   */
  deleteSysAnnounceReadInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通告查看情况-添加|更新
   * @method
   * @name Api#addOrUpdateSysAnnounceReadInfo
   */
  addOrUpdateSysAnnounceReadInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取未读消息数量
   * @method
   * @name Api#countAnnounceReadInfo
   */
  countAnnounceReadInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnounceReadInfo/announce/count'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取区域树形结构
   * @method
   * @name Api#getAreas
   */
  getAreas(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysArea'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['code'] !== undefined) {
      queryParameters['code'] = parameters['code']
    }

    if (parameters['recursion'] !== undefined) {
      queryParameters['recursion'] = parameters['recursion']
    }

    if (parameters['queryAll'] !== undefined) {
      queryParameters['queryAll'] = parameters['queryAll']
    }

    if (parameters['level'] !== undefined) {
      queryParameters['level'] = parameters['level']
    }

    if (parameters['root'] !== undefined) {
      queryParameters['root'] = parameters['root']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加sysArea
   * @method
   * @name Api#addArea
   */
  addArea(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysArea'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 更新sysArea
   * @method
   * @name Api#updateArea
   */
  updateArea(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysArea'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取sysArea
   * @method
   * @name Api#getArea
   */
  getArea(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysArea/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除sysArea
   * @method
   * @name Api#deleteArea
   */
  deleteArea(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysArea/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取任务分页
   * @method
   * @name Api#getQuartzConfigPage
   */
  getQuartzConfigPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['pageIndex'] !== undefined) {
      queryParameters['pageIndex'] = parameters['pageIndex']
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }

    if (parameters['name'] !== undefined) {
      queryParameters['name'] = parameters['name']
    }

    if (parameters['status'] !== undefined) {
      queryParameters['status'] = parameters['status']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 更新任务
   * @method
   * @name Api#updateQuartzConfig
   */
  updateQuartzConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通过Id获取任务详情
   * @method
   * @name Api#getQuartzConfigById
   */
  getQuartzConfigById(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通过类名获取任务详情
   * @method
   * @name Api#getQuartzConfigByClazz
   */
  getQuartzConfigByClazz(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/getByClazz/{clazz}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{clazz}', parameters['clazz'])

    if (parameters['clazz'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: clazz'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除任务
   * @method
   * @name Api#deleteQuartzConfig
   */
  deleteQuartzConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/delete/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 暂停任务
   * @method
   * @name Api#pauseQuartzConfig
   */
  pauseQuartzConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/pause/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 恢复任务
   * @method
   * @name Api#resumeQuartzConfig
   */
  resumeQuartzConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/resume/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加任务
   * @method
   * @name Api#addQuartzConfig
   */
  addQuartzConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/add'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 执行一次任务
   * @method
   * @name Api#runQuartzConfig
   */
  runQuartzConfig(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/run/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取任务日志分页
   * @method
   * @name Api#getQuartzLogPage
   */
  getQuartzLogPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/quartz/log'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['pageIndex'] !== undefined) {
      queryParameters['pageIndex'] = parameters['pageIndex']
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }

    if (parameters['quartzId'] !== undefined) {
      queryParameters['quartzId'] = parameters['quartzId']
    }

    if (parameters['name'] !== undefined) {
      queryParameters['name'] = parameters['name']
    }

    if (parameters['result'] !== undefined) {
      queryParameters['result'] = parameters['result']
    }

    if (parameters['startTime'] !== undefined) {
      queryParameters['startTime'] = parameters['startTime']
    }

    if (parameters['endTime'] !== undefined) {
      queryParameters['endTime'] = parameters['endTime']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取message
   * @method
   * @name Api#getMessage
   */
  getMessage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/message/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除message
   * @method
   * @name Api#deleteMessage
   */
  deleteMessage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/message/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取message分页
   * @method
   * @name Api#getMessagePage
   */
  getMessagePage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/message'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['pageIndex'] !== undefined) {
      queryParameters['pageIndex'] = parameters['pageIndex']
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }

    if (parameters['content'] !== undefined) {
      queryParameters['content'] = parameters['content']
    }

    if (parameters['title'] !== undefined) {
      queryParameters['title'] = parameters['title']
    }

    if (parameters['receiver'] !== undefined) {
      queryParameters['receiver'] = parameters['receiver']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加message
   * @method
   * @name Api#addMessage
   */
  addMessage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/message'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 更新message
   * @method
   * @name Api#updateMessage
   */
  updateMessage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/message'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除角色
   * @method
   * @name Api#deleteRole
   */
  deleteRole(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/{roleId}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{roleId}', parameters['roleId'])

    if (parameters['roleId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: roleId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取角色-分页
   * @method
   * @name Api#getRolesPage
   */
  getRolesPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取拥有该角色的所有用户
   * @method
   * @name Api#getRoleUsers
   */
  getRoleUsers(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/{roleId}/users'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{roleId}', parameters['roleId'])

    if (parameters['roleId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: roleId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 判断角色编码是否可用
   * @method
   * @name Api#judgeRoleNum
   */
  judgeRoleNum(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/judgeRoleNum'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['roleId'] !== undefined) {
      queryParameters['roleId'] = parameters['roleId']
    }

    if (parameters['roleNum'] !== undefined) {
      queryParameters['roleNum'] = parameters['roleNum']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取所有角色-列表
   * @method
   * @name Api#getAllRoles
   */
  getAllRoles(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/getAllRoles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取用户能分配的角色-列表
   * @method
   * @name Api#getAssignRoles
   */
  getAssignRoles(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/assignRoles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取所有角色-分页
   * @method
   * @name Api#getAllRolesPage
   */
  getAllRolesPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/getAllRolesPage'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 判断角色名称是否可用
   * @method
   * @name Api#judgeRoleName
   */
  judgeRoleName(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles/judgeRoleName'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['roleId'] !== undefined) {
      queryParameters['roleId'] = parameters['roleId']
    }

    if (parameters['roleName'] !== undefined) {
      queryParameters['roleName'] = parameters['roleName']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取该用户创建的角色-列表
   * @method
   * @name Api#getRoles
   */
  getRoles(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['userId'] !== undefined) {
      queryParameters['userId'] = parameters['userId']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加（更新）角色
   * @method
   * @name Api#addOrUpdateRole
   */
  addOrUpdateRole(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/roles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取messageTemplate分页
   * @method
   * @name Api#getMessageTemplatePage
   */
  getMessageTemplatePage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/messageTemplate'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['pageIndex'] !== undefined) {
      queryParameters['pageIndex'] = parameters['pageIndex']
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }

    if (parameters['code'] !== undefined) {
      queryParameters['code'] = parameters['code']
    }

    if (parameters['content'] !== undefined) {
      queryParameters['content'] = parameters['content']
    }

    if (parameters['title'] !== undefined) {
      queryParameters['title'] = parameters['title']
    }

    if (parameters['type'] !== undefined) {
      queryParameters['type'] = parameters['type']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加messageTemplate
   * @method
   * @name Api#addMessageTemplate
   */
  addMessageTemplate(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/messageTemplate'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 更新messageTemplate
   * @method
   * @name Api#updateMessageTemplate
   */
  updateMessageTemplate(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/messageTemplate'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取messageTemplate
   * @method
   * @name Api#getMessageTemplate
   */
  getMessageTemplate(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/messageTemplate/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除messageTemplate
   * @method
   * @name Api#deleteMessageTemplate
   */
  deleteMessageTemplate(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/messageTemplate/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 发送消息
   * @method
   * @name Api#sendMessage
   */
  sendMessage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/messageTemplate/send/message'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-获取分页
   * @method
   * @name Api#getSysUserPage
   */
  getSysUserPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-获取列表，用于上拉加载更多
   * @method
   * @name Api#getSysUserList
   */
  getSysUserList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/list'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-导入
   * @method
   * @name Api#importSysUser
   */
  importSysUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/import'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'multipart/form-data'

    if (parameters['file'] !== undefined) {
      form['file'] = parameters['file']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-通过Id查询
   * @method
   * @name Api#getSysUser
   */
  getSysUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-通过Id删除
   * @method
   * @name Api#deleteSysUser
   */
  deleteSysUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-通过Ids批量查询
   * @method
   * @name Api#getSysUserByIds
   */
  getSysUserByIds(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/findByIds'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-获取个人信息
   * @method
   * @name Api#getSysUserInfo
   */
  getSysUserInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/ownInfo'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-修改个人信息
   * @method
   * @name Api#updateSysUser
   */
  updateSysUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/updateSysUser'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-获取用户树
   * @method
   * @name Api#getUserTree
   */
  getUserTree(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/tree'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-添加|更新
   * @method
   * @name Api#addOrUpdateSysUser
   */
  addOrUpdateSysUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-导出
   * @method
   * @name Api#exportSysUserList
   */
  exportSysUserList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/export'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 用户-通过用户名查询
   * @method
   * @name Api#getSysUserByUserName
   */
  getSysUserByUserName(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysUser/username/{username}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{username}', parameters['username'])

    if (parameters['username'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: username'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取单个配置
   * @method
   * @name Api#getSetting
   */
  getSetting(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/setting/{key}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{key}', parameters['key'])

    if (parameters['key'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: key'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除配置
   * @method
   * @name Api#deleteSetting
   */
  deleteSetting(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/setting/{key}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{key}', parameters['key'])

    if (parameters['key'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: key'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加/更新配置
   * @method
   * @name Api#addSetting
   */
  addSetting(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/setting'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    if (parameters['key'] !== undefined) {
      form['key'] = parameters['key']
    }

    if (parameters['value'] !== undefined) {
      form['value'] = parameters['value']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取配置-分页
   * @method
   * @name Api#getSettingPage
   */
  getSettingPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/setting/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取上传文件的token
   * @method
   * @name Api#getUploadFileToken
   */
  getUploadFileToken(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/file/files/qiniu/upLoadToken'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['fileName'] !== undefined) {
      queryParameters['fileName'] = parameters['fileName']
    }

    if (parameters['bucket'] !== undefined) {
      queryParameters['bucket'] = parameters['bucket']
    }

    if (parameters['persistentOps'] !== undefined) {
      queryParameters['persistentOps'] = parameters['persistentOps']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 七牛客户端获取token后上传到七牛成功，携带有处理参数，返回persistentId回传服务端。
   * @method
   * @name Api#clientUploadSuccess
   */
  clientUploadSuccess(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/file/files/qiniu/clientUploadSuccess'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Content-Type'] = 'application/x-www-form-urlencoded'

    if (parameters['key'] !== undefined) {
      form['key'] = parameters['key']
    }

    if (parameters['persistentId'] !== undefined) {
      form['persistentId'] = parameters['persistentId']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 上传文件到七牛服务器,返回文件名称
   * @method
   * @name Api#uploadQiNiuFile
   */
  uploadQiNiuFile(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/file/files/qiniu/upload'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'multipart/form-data'

    if (parameters['useOriginalFileName'] !== undefined) {
      form['useOriginalFileName'] = parameters['useOriginalFileName']
    }

    if (parameters['bucket'] !== undefined) {
      queryParameters['bucket'] = parameters['bucket']
    }

    if (parameters['persistentOps'] !== undefined) {
      form['persistentOps'] = parameters['persistentOps']
    }

    if (parameters['file'] !== undefined) {
      form['file'] = parameters['file']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除文件
   * @method
   * @name Api#deleteFile
   */
  deleteFile(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/file/files/files'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['fileName'] !== undefined) {
      queryParameters['fileName'] = parameters['fileName']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 发送指定消息到前台(测试websocket通讯)
   * @method
   * @name Api#testSend
   */
  testSend(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnouncement/send/one/{userId}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{userId}', parameters['userId'])

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统通告-获取分页
   * @method
   * @name Api#getSysAnnouncementPage
   */
  getSysAnnouncementPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnouncement/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统通告-获取列表，用于上拉加载更多
   * @method
   * @name Api#getSysAnnouncementList
   */
  getSysAnnouncementList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnouncement/list'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统通告-通过Id查询
   * @method
   * @name Api#getSysAnnouncement
   */
  getSysAnnouncement(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnouncement/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统通告-通过Id删除
   * @method
   * @name Api#deleteSysAnnouncement
   */
  deleteSysAnnouncement(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnouncement/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 系统通告-添加|更新
   * @method
   * @name Api#addOrUpdateSysAnnouncement
   */
  addOrUpdateSysAnnouncement(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysAnnouncement'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取Redis详细信息
   * @method
   * @name Api#getRedisInfo
   */
  getRedisInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/montior/redis/info'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取 redis key 数量
   * @method
   * @name Api#getKeysSize
   */
  getKeysSize(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/montior/redis/keysSize'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取 redis 内存信息
   * @method
   * @name Api#getMemoryInfo
   */
  getMemoryInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/montior/redis/memoryInfo'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取服务器硬件信息
   * @method
   * @name Api#getServerInfos
   */
  getServerInfos(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/montior/getServerInfos'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取磁盘信息
   * @method
   * @name Api#queryDiskInfo
   */
  queryDiskInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/montior/redis/queryDiskInfo'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 修改用户可用状态
   * @method
   * @name Api#updateAuthUserState
   */
  updateAuthUserState(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/state'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    if (parameters['userId'] !== undefined) {
      form['userId'] = parameters['userId']
    }

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    if (parameters['state'] !== undefined) {
      form['state'] = parameters['state']
    }

    if (parameters['state'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: state'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 重置自己创建的管理员密码
   * @method
   * @name Api#resetAuthUserPassword
   */
  resetAuthUserPassword(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/resetPassword'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    if (parameters['userId'] !== undefined) {
      form['userId'] = parameters['userId']
    }

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    if (parameters['password'] !== undefined) {
      form['password'] = parameters['password']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 修改密码
   * @method
   * @name Api#updateAuthUserPassword
   */
  updateAuthUserPassword(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/updatePassword'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    if (parameters['oldPassword'] !== undefined) {
      form['oldPassword'] = parameters['oldPassword']
    }

    if (parameters['newPassword'] !== undefined) {
      form['newPassword'] = parameters['newPassword']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取用户的所有角色
   * @method
   * @name Api#getUserRoles
   */
  getUserRoles(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/roles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['userId'] !== undefined) {
      queryParameters['userId'] = parameters['userId']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加用户角色关系
   * @method
   * @name Api#addUserRole
   */
  addUserRole(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/roles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

    if (parameters['userId'] !== undefined) {
      form['userId'] = parameters['userId']
    }

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    if (parameters['roleId'] !== undefined) {
      form['roleId'] = parameters['roleId']
    }

    if (parameters['roleId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: roleId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除用户角色关系
   * @method
   * @name Api#deleteAuthUserRole
   */
  deleteAuthUserRole(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/roles'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['userId'] !== undefined) {
      queryParameters['userId'] = parameters['userId']
    }

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    if (parameters['roleId'] !== undefined) {
      queryParameters['roleId'] = parameters['roleId']
    }

    if (parameters['roleId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: roleId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取自己所有的权限
   * @method
   * @name Api#getAuthUserPermissions
   */
  getAuthUserPermissions(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/permissions'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['menuSys'] !== undefined) {
      queryParameters['menuSys'] = parameters['menuSys']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取管理员个人信息
   * @method
   * @name Api#getAuthUser
   */
  getAuthUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/ownInfo'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取管理员
   * @method
   * @name Api#getAuthUsers
   */
  getAuthUsers(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['pageIndex'] !== undefined) {
      queryParameters['pageIndex'] = parameters['pageIndex']
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 添加管理员
   * @method
   * @name Api#addAuthUser
   */
  addAuthUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['username'] !== undefined) {
      queryParameters['username'] = parameters['username']
    }

    if (parameters['username'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: username'))
      return Promise
    }

    if (parameters['password'] !== undefined) {
      queryParameters['password'] = parameters['password']
    }

    if (parameters['password'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: password'))
      return Promise
    }

    if (parameters['name'] !== undefined) {
      queryParameters['name'] = parameters['name']
    }

    if (parameters['name'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: name'))
      return Promise
    }

    if (parameters['mobile'] !== undefined) {
      queryParameters['mobile'] = parameters['mobile']
    }

    if (parameters['mobile'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: mobile'))
      return Promise
    }

    if (parameters['userRole'] !== undefined) {
      queryParameters['userRole'] = parameters['userRole']
    }

    if (parameters['userRole'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userRole'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 更新管理员
   * @method
   * @name Api#updateAuthUser
   */
  updateAuthUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['userId'] !== undefined) {
      queryParameters['userId'] = parameters['userId']
    }

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    if (parameters['name'] !== undefined) {
      queryParameters['name'] = parameters['name']
    }

    if (parameters['name'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: name'))
      return Promise
    }

    if (parameters['mobile'] !== undefined) {
      queryParameters['mobile'] = parameters['mobile']
    }

    if (parameters['mobile'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: mobile'))
      return Promise
    }

    if (parameters['userRole'] !== undefined) {
      queryParameters['userRole'] = parameters['userRole']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'PUT',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 删除管理员（只能删除自己创建的）
   * @method
   * @name Api#deleteUser
   */
  deleteUser(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['userId'] !== undefined) {
      queryParameters['userId'] = parameters['userId']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取用户-分页
   * @method
   * @name Api#getAuthUserPage
   */
  getAuthUserPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取用户组合的菜单按钮树
   * @method
   * @name Api#getAuthUserMenus
   */
  getAuthUserMenus(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/menus'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['menuSys'] !== undefined) {
      queryParameters['menuSys'] = parameters['menuSys']
    }

    if (parameters['parentMenuId'] !== undefined) {
      queryParameters['parentMenuId'] = parameters['parentMenuId']
    }

    if (parameters['hasButton'] !== undefined) {
      queryParameters['hasButton'] = parameters['hasButton']
    }

    if (parameters['hasChildren'] !== undefined) {
      queryParameters['hasChildren'] = parameters['hasChildren']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 获取一个用户的信息
   * @method
   * @name Api#getOneUserInfo
   */
  getOneUserInfo(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/{userId}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    path = path.replace('{userId}', parameters['userId'])

    if (parameters['userId'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: userId'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 通过idList批量查询用户
   * @method
   * @name Api#getUserByIds
   */
  getUserByIds(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/auth/users/findByIds'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-获取列表，用于上拉加载更多
   * @method
   * @name Api#getSysDepartList
   */
  getSysDepartList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/list'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-获取分页
   * @method
   * @name Api#getSysDepartPage
   */
  getSysDepartPage(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/page'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-导入
   * @method
   * @name Api#importSysDepart
   */
  importSysDepart(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/import'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'multipart/form-data'

    if (parameters['file'] !== undefined) {
      form['file'] = parameters['file']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-通过Id查询
   * @method
   * @name Api#getSysDepart
   */
  getSysDepart(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-通过Id删除
   * @method
   * @name Api#deleteSysDepart
   */
  deleteSysDepart(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/{id}'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    path = path.replace('{id}', parameters['id'])

    if (parameters['id'] === undefined) {
      Promise.reject(new Error('Missing required  parameter: id'))
      return Promise
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'DELETE',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-获取部门树
   * @method
   * @name Api#getDepartTree
   */
  getDepartTree(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/tree'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'GET',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-导出
   * @method
   * @name Api#exportSysDepartList
   */
  exportSysDepartList(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart/export'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
  /**
   * 部门-添加|更新
   * @method
   * @name Api#addOrUpdateSysDepart
   */
  addOrUpdateSysDepart(parameters) {
    'use strict'
    if (parameters === undefined) {
      parameters = {}
    }

    var domain = window.api.base + `/api`
    var path = '/sysDepart'
    var body
    var queryParameters = {}
    var headers = {}
    var form = {}

    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'

    if (parameters['body'] !== undefined) {
      body = parameters['body']
    }

    var url = domain + path
    var options = {
      timeout: parameters.$timeout,
      method: 'POST',
      url: url,
      params: queryParameters,
      body: body,
      headers: headers
    }
    if (Object.keys(form).length > 0) {
      options.body = form
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.emulateJSON = true
    }

    const req = Vue.http(options)
    return req
  },
}