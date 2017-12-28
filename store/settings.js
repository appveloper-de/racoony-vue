export const state = () => ({
  club: {
    general: {
      name: '',
      address: '',
    }
  }
})

export const getters = {
  general: state => {
    return state.club.general
  }
}

export const actions = {
  getSettingsClubGeneral({ commit }) {
    return this.$axios.get('settings/club')
      .then((response) => {
        let settingsClubGeneral = response.data.data
        commit('setClubGeneral', settingsClubGeneral)
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const mutations = {
  setClubGeneral(state, data) {
    state.club.general = data
  }
}

