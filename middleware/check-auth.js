import { getTokenFromCookie, getTokenFromLocalStorage } from '~/utils/auth'

export default function ({ store, redirect, isServer, error, req }) {
  if (isServer && !req) {
    return
  }

  if (req && req.url === '/login') {
    return
  }

  if (!store.state.auth.user) {
    if (!store.state.auth.access_token) {
      const token = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage()
      
      if (!token) {
        return redirect('/login')
      }
      store.commit('auth/SET_ACCESS_TOKEN', token)
    }

    if (store.state.auth.access_token) {
      return store.dispatch('auth/me')
        .catch((error) => {
          if (error.response.status === 401) {
            return redirect('/login')
          }
        })
    }
  }
}