export const state = () => ({
  list: []
})

export const actions = {
  async store ({ commit }, membership_fee) {
    const { data: response, status } = await this.$axios.post('/api/settings/membership_fees', membership_fee)

    if (status === 201) {
      commit('addMembershipFee', response.data)
    }
  },
  async fetchAll ({ commit }) {
    const { data: response, status } = await this.$axios.get('/api/settings/membership_fees')

    if (status === 200) {
      commit('setMembershipFees', response.data)
    }
  },
  async delete ({ commit }, id) {
    const { status } = await this.$axios.delete(`/api/settings/membership_fees/${id}`)

    if (status === 204) {
      commit('removeMembershipFee', id)
    }
  },
  async update ({ commit }, data) {
    const { data: response, status } = await this.$axios.put(`/api/settings/membership_fees/${data.id}`, data)

    if (status === 200) {
      commit('updateMembershipFee', response.data)
    }
  }
}

export const mutations = {
  addMembershipFee (state, fee) {
    state.list.push(fee)
  },
  setMembershipFees (state, fees) {
    state.list = fees
  },
  updateMembershipFee (state, fee) {
    const idx = state.list.findIndex((item) => item.id === fee.id)
    state.list.splice(idx, 1, fee)
  },
  removeMembershipFee (state, id) {
    const removeIndex = state.list.findIndex((item) => item.id === id)
    state.list.splice(removeIndex, 1)
  }
}
