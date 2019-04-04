export const state = () => ({
  list: []
})

export const actions = {
  async fetchAll ({ commit }) {
    const response = await this.$axios.$get('/api/departments')

    if (response.data) {
      commit('setDepartments', response.data)
    }
    return response
  },
  async store ({ commit }, department) {
    const { data, status } = await this.$axios.post('/api/departments', department)

    if (status === 201) {
      commit('addDepartment', data.data)
    }
  },
  async delete ({ commit }, departmentId) {
    const { status } = await this.$axios.delete(`/api/departments/${departmentId}`)

    if (status === 204) {
      commit('removeDepartment', departmentId)
    }
  },
  async update ({ commit }, department) {
    const { data, status } = await this.$axios.patch(`/api/departments/${department.id}`, department)

    if (status === 200) {
      commit('updateDepartment', data.data)
    }
  }
}

export const mutations = {
  setDepartments (state, items) {
    state.list = items
  },
  addDepartment (state, item) {
    state.list.push(item)
  },
  removeDepartment (state, departmentId) {
    const removeIndex = state.list.findIndex((department) => department.id === departmentId)
    state.list.splice(removeIndex, 1)
  },
  updateDepartment (state, editedDepartment) {
    const idx = state.list.findIndex((department) => department.id === editedDepartment.id)
    state.list.splice(idx, 1, editedDepartment)
  }
}
