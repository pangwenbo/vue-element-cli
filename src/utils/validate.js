/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function checkPhone (phone) {
  let reg = /^1[3456789]\d{9}$/
  if(!(reg.test(phone))){
      return false; 
  } else {
    return true
  }
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function checkEmail (email) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if(!(reg.test(email))){
    return false; 
  } else {
    return true
  }
}

/**
 * @param {string} password
 * @returns {Boolean}
 */
export function checkPwd (pwd) {
  let reg = /(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}/
  if(!(reg.test(pwd))){
    return false; 
  } else {
    return true
  }
}

/**
 * @param {string} code
 * @returns {Boolean}
 */
export function checkCode (code) {
  let reg = /^[1-9][0-9]{5}$/
  if(!(reg.test(code))){
    return false; 
  } else {
    return true
  }
}