export function success(obj) {
  return {
    code: 200,
    msg: '',
    result: obj
  }
}
export function failed(msg) {
  return {
    code: 500,
    msg: msg,
    result: null
  }
}
