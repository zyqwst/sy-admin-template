import Mock from 'mockjs'
import loginAPI from './login'
import queryAPI from './query'
import basicAPI from './basic'
// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/login\/userinfo/, 'get', loginAPI.getUserInfo)

// 动态查询
Mock.mock(/\/query\/form/, 'get', queryAPI.loadForm)
Mock.mock(/\/query\/table/, 'get', queryAPI.loadTable)
Mock.mock(/\/dynamic-query\/metadata/, 'get', queryAPI.fetchColumns)

// 基础数据
Mock.mock(/\/basic\/store/, 'get', basicAPI.fetchStore)
export default Mock
