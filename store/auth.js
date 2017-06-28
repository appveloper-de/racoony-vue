import axios from 'axios'
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
  login ({ dispatch }, { email, password }) {
    return axios.post('http://racoony.app/auth/token', { 
      username: email, password: password 
    }).then((response) => {
      dispatch('setToken', { token: response.data.access_token })
    }).catch((error) => {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    })
  },
  me ({ commit, state }) {
    return axios.get('http://racoony.app/api/me', {
      headers: {
        'Authorization': 'Bearer ' + state.access_token
      }
    })
    .then((response) => {
      commit('SET_USER', response.data)
    })
  },
  setToken ({ commit }, { token }) {
    if (token) {
      commit('SET_ACCESS_TOKEN', token)
      window.localStorage.setItem('token', token)
      Cookie.set('token', token)
    }
  }
}