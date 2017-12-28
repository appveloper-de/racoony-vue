import Cookie from 'js-cookie'

export const state = () => ({
  user: null,
  access_token: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user
  },
  SET_ACCESS_TOKEN: function (state, token) {
    state.access_token = token
  },
  REMOVE_TOKEN: (state) => {
    state.access_token = null
  },
  REMOVE_USER: (state) => {
    state.user = null
  }
}

export const getters = {
  user: state => {
    return state.user
  },
  access_token: state => {
    return state.access_token
  }
}

export const actions = {
  async login ({ dispatch }, { email, password }) {
    let data = null
    try {
      data = await this.$axios.$post('/auth/login', {
        username: email, password: password
      })
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    }

    if (data) {
      dispatch('setToken', { token: data.access_token })
    }
  },
  async me ({ commit, state }) {
    let user = null
    try {
      user = await this.$axios.$get('/auth/me')
    } catch (error) {
      console.log(error)
    }

    if (user) {
      commit('SET_USER', user)
    } else {
      console.log('could not fetch user.')
    }
  },
  setToken ({ commit }, { token }) {
    if (token) {
      commit('SET_ACCESS_TOKEN', token)
      Cookie.set('token', token)
      this.$axios.setToken(token, 'Bearer')
    }
  }
}
