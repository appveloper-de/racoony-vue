module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  router: {
    middleware: 'check-auth',
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],

  axios: {
    debug: false,
    baseURL: 'http://racoony.test/',
    requestInterceptor: (config, { store }) => {
      if (store.state.auth.access_token) {
        config.headers.common['Authorization'] = `Bearer ${store.state.auth.access_token}`
      }
      return config
    },
    errorHandler (err, { redirect, store }) {
      if (err.response) {
        if (err.response.status === 401) {
          console.log('It seems that the token is expired or invalid.')
          store.commit('auth/REMOVE_TOKEN')
          store.commit('auth/REMOVE_USER')
          return redirect('/login')
        }
      }

      return Promise.reject(err)
    }
  },
  toast: {
    position: 'bottom-right'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify', 'axios', 'js-cookie']
  },
  plugins: ['~plugins/vuetify.js'],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ]
}
