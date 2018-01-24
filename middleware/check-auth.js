export default async function ({ store, redirect, error, req }) {
  if (process.server && !req) {
    return
  }

  if (req && req.url === '/login') {
    return
  }

  if (!store.state.auth.user) {
    if (!store.state.auth.access_token) {
        return redirect('/login')
    }

    try {
      return await store.dispatch('auth/me')
    } catch (error) {
      if (error.status === 401) {
        return redirect('/login')
      }
    }
  }
}
