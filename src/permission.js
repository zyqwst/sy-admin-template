import router from './router'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  return true
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routers) {
  const res = []
  routers.forEach(route => {
    const tmp = { ...route }
    if (tmp.component) {
      if (tmp.component === 'Layout') { // Layout组件特殊处理
        tmp.component = () => import('@/views/layout/Layout')
      } else {
        tmp.component = _import(tmp.component)
      }
    }
    if (tmp.children && tmp.children.length > 0) {
      tmp.children = filterAsyncRouter(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.getters.user.id) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(() => { // 拉取user_info
          const r = filterAsyncRouter(store.getters.addRouters)
          router.addRoutes(r)
          next({ ...to, replace: true })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
