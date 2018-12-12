import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: {},
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    // 用户名登录
    async LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const data = await loginByUsername(username, userInfo.password)
      commit('SET_TOKEN', data.object)
      setToken(data.object)
    },

    // 获取用户信息
    GetUserInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(result => {
          commit('SET_USER', result.object.user)
          resolve(result.object.routers)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
