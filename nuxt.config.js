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
    middleware: ['auth'],
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],

  axios: {
    debug: false,
    baseURL: 'http://racoony.test/',
  },

  toast: {
    position: 'bottom-right'
  },

  auth: {
    endpoints: {
      login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
      logout: { url: '/auth/logout', method: 'post' },
      user: { url: '/auth/me', method: 'get', propertyName: false }
    },
    resetOnError: true
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify', 'axios']
  },
  plugins: [
    '~plugins/vuetify.js',
    '~plugins/auth'
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ]
}
