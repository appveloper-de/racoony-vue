<template>
  <v-layout justify-center>
    <v-flex sm3 align-center align-content-center style="margin-top: 200px">
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex sm12>
                <v-text-field label="Email" name="email" prepend-icon="account_circle" v-model="email" />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm12>
                <v-text-field type="password" name="password" label="Password" prepend-icon="lock" v-model="password" />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm12>
                <v-btn block color="primary" :disabled="loading" :loading="loading" @click.native="processLogin">
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