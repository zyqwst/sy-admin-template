import { success } from './RestEntity'
const token = 'ABC123'
const user = {
  id: 1,
  name: '管理员',
  avator: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}
const routers =
[
  {
    path: '/query',
    component: 'Layout',
    meta: { title: '动态查询', icon: 'table', noCache: false },
    children: [
      {
        path: '1',
        name: 'Query',
        component: 'query/index',
        meta: { title: '查询1', icon: 'table', noCache: false },
        query: { type: 1 }
      },
      {
        path: '2',
        name: 'Query',
        component: 'query/index',
        meta: { title: '查询2', icon: 'table', noCache: false },
        query: { type: 2 }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export default {
  loginByUsername: config => {
    return success(token)
  },
  getUserInfo: () => success({ user: user, routers: routers }),
  logout: () => success('登出成功')
}
