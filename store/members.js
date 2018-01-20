export const state = () => ({
  members: []
})

export const actions = {
  async fetchAllMembers({ commit }) {
    let response = await this.$axios.$get('/api/members')
    if (response.data) {
      commit('setMembers', response.data)
    }
    return response
  },
  async fetchMemberById({ commit }, member) {
    let response = await this.$axios.$get('/api/members/' + member.id)
    return response
  }
}

export const mutations = {
  setMembers(state, items) {
    state.members = items
  }
}
