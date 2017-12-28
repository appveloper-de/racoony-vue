import { getTokenFromCookie } from '~/utils/auth'

export const state = () => ({
  sidebar: false,
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    let token = getTokenFromCookie(req)

    if (!token) {
      return
    }
    dispatch('auth/setToken', { token: token })
  }
}
