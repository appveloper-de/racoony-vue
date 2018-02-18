export const state = () => ({
  list: []
})

export const actions = {
  async fetchAll({ commit }) {
    const response = await this.$axios.$get('/api/members')

    if (response.data) {
      commit('setMembers', response.data)
    }
    return response
  },
  async fetchMemberById(context, member) {
    const response = await this.$axios.$get(`/api/members/${member.id}`)
    return response
  },
  async updateMember(context, member) {
    let response = await this.$axios.$patch('/api/members/' + member.id, member)
    return response
  },
  async createMember ({ commit }, member) {
    let response = await this.$axios.$post('/api/members', member)
    return response
  }
}

export const mutations = {
  setMembers(state, items) {
    state.list = items
  }
}
