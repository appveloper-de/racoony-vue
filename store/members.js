import axios from '~plugins/axios'

export const state = () => ({
  departments: []
})

export const actions = {
  all({ commit }) {
    return axios.get('departments', {
        params: {
          with: 'members'
        }
      })
      .then((res) => {
        let items = res.data.data
        commit('setDepartments', items)
        return res.data
      })
      .catch((err) => {
      })
  }
}

export const mutations = {
  setDepartments(state, items) {
    state.departments = items
  }
}
