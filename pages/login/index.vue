<template>
  <v-layout justify-center>
    <v-flex sm5>
      <v-card>
        <v-card-title>
          <span>Login</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex sm12>
                <v-text-field name="email" label="Email" single-line prepend-icon="account_circle" v-model="email"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm12>
                <v-text-field type="password" name="password" label="Password" single-line prepend-icon="lock" v-model="password"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm12>
                <v-btn raised primary light :disabled="loading" :loading="loading" @click.native="processLogin">
                  Login
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    layout: 'login',
    middleware: 'anonymous',
    data () {
      return {
        email: '',
        password: '',
        loading: false
      }
    },
    methods: {
      processLogin () {
        this.loading = true
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          this.loading = false
          this.$router.replace('/')
        })
        .catch((error) => {
          this.loading = false
        })
      }
    }
  }
</script>