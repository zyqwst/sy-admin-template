const dynamicManage = {
  namespaced: true,
  state: {
    sql: '',
    columns: []
  },
  mutations: {
    SET_SQL: (state, sql) => {
      state.sql = sql
    },
    SET_COLUMNS: (state, columns) => {
      state.columns = columns
    }
  },
  actions: {
    setVal({ commit }, data) {
      commit('SET_SQL', data.sql)
      commit('SET_COLUMNS', data.columns)
    }
  }
}
export default dynamicManage
