export const state = () => ({
  list: [],
  current: null
})

export const actions = {
  async fetchAll({ commit }) {
    const response = await this.$axios.$get('/api/members')

    if (response.data) {
      commit('setMembers', response.data)
    }
    return response
  },
  async fetchMemberById({ commit }, member) {
    const response = await this.$axios.$get(`/api/members/${member.id}?with=departments`)
    if (response.data) {
      commit('setCurrentMember', response.data)
    }
  },
  async updateMember(store, member) {
    return await this.$axios.$patch('/api/members/' + member.id, member)
  },
  async createMember ({ commit }, member) {
    return await this.$axios.$post('/api/members', member)
  },
  async assignToDepartment ({ commit }, data) {
    const { data: member } = await this.$axios.$post(`/api/members/${data.memberId}/departments`, {
      departmentId: data.departmentId
    })

    commit('setCurrentMember', member)
    commit('updateMember', member)
  },
  async removeFromDepartment ({ commit, state }, data) {
    const { status } = await this.$axios.delete(`/api/members/${data.memberId}/departments`, {
      params: { departmentId: data.departmentId }
    })

    if (status === 204) {
      commit('removeDepartmentFromCurrent', data.departmentId)
    }
  }
}

export const mutations = {
  setMembers (state, items) {
    state.list = items
  },
  updateMember (state, member) {
    const idx = state.list.findIndex(memberInList => memberInList.id === member.id)
    state.list.splice(idx, 1, member)
  },
  setCurrentMember (state, member) {
    state.current = member
  },
  removeDepartmentFromCurrent (state, departmentId) {
    const departmentIndex = state.current.departments.findIndex(department => department.id === departmentId)
    state.current.departments.splice(departmentIndex, 1)
  }
}
