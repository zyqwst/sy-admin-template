export function success(obj) {
  return {
    errorCode: '',
    status: 1,
    msg: '',
    object: obj
  }
}
export function failed(msg) {
  return {
    errorCode: '40004',
    status: -1,
    msg: msg,
    object: null
  }
}
