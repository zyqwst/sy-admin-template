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
    path: '/table',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'table/index',
        name: 'Table',
        meta: { title: '表格', icon: 'table', noCache: true }
      }
    ]
  },
  {
    'path': '*',
    'redirect': '/404',
    'hidden': true
  }
]
export default {
  loginByUsername: config => {
    return success(token)
  },
  getUserInfo: () => success({ user: user, routers: routers }),
  logout: () => success('登出成功')
}
