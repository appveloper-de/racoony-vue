export const state = () => ({
  members: []
})

export const actions = {
  async fetchAllMembers({ commit }) {
    let members = null
    try {
      members = await this.$axios.$get('/api/members')
    } catch (error) {
      console.log(error)
    }

    if (members) {
      commit('setMembers', members.data)
    }
  }
}

export const mutations = {
  setMembers(state, items) {
    state.members = items
  }
}
