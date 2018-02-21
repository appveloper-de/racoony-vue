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
  async updateMember(context, member) {
    return await this.$axios.$patch('/api/members/' + member.id, member)
  },
  async createMember ({ commit }, member) {
    return await this.$axios.$post('/api/members', member)
  },
  async assignToDepartment ({ commit }, data ) {
    const { data: member } = await this.$axios.$post(`/api/members/${data.memberId}/departments`, {
      departmentId: data.departmentId
    })

    commit('setCurrentMember', member)
    commit('updateMember', member)
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
  }
}
