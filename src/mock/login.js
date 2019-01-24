import { success } from './RestEntity'
const token = 'ABC123'
const user = {
  id: 1,
  name: '管理员',
  avator: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}
const routers =
[{
  path: '/admin',
  component: 'Layout',
  meta: { title: '系统管理', icon: 'table', noCache: false },
  children: [
    {
      path: 'dynamic-manage',
      name: 'DynamicManage',
      component: 'admin/dynamicManage/index',
      meta: { title: '动态查询设置', icon: 'table', noCache: false }
    }
  ]
},
{
  path: '/dynamic-query',
  component: 'Layout',
  meta: { title: '动态查询', icon: 'table', noCache: false },
  children: [
    {
      path: '1',
      name: 'query1',
      component: 'dynamicQuery/index',
      meta: { title: '查询1', icon: 'table', noCache: false }
    },
    {
      path: '2',
      name: 'query2',
      component: 'dynamicQuery/index',
      meta: { title: '查询2', icon: 'table', noCache: false }
    },
    {
      path: '3',
      name: 'query3',
      component: 'dynamicQuery/index',
      meta: { title: '查询3', icon: 'table', noCache: false }
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
  getUserInfo: () => success({ user, routers }),
  logout: () => success('登出成功')
}
