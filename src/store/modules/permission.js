import { constantRouterMap } from '@/router'
import { deepClone } from '@/utils'
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      const map = deepClone(constantRouterMap)
      state.routers = map.concat(routers)
    }
  },
  actions: {
    AccessedRouters({ commit }, routers) {
      commit('SET_ROUTERS', routers)
    }
  }
}

export default permission
