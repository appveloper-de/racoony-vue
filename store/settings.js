export const state = () => ({
  general: null,
})


export const actions = {
  async saveGeneral ({ commit }, data) {
    const { status, data: settings } = await this.$axios.put('/api/settings/club', data)

    if (status === 200) {
      commit('setGeneralSettings', settings.data)
    }
  },
  async getGeneral ({ commit }) {
    const { status, data: settings } = await this.$axios.get('api/settings/club')

    if (status === 200) {
      commit('setGeneralSettings', settings.data)
    }
  }
}

export const mutations = {
  setGeneralSettings (state, data) {
    state.general = data
  },
  updateGeneralSettings (state, {field, value}) {
    Object.assign(state.general, {
      [field]: value
    })
  },
}

