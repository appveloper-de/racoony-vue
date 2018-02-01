<template>
  <v-app>
    <main>
      <v-slide-y-transition mode="out-in">
      <v-container fill-height fluid class="login-container">
          <nuxt />
      </v-container>
      </v-slide-y-transition>
    </main>
  </v-app>
</template>

<style>
.login-container {
  height: 100vh;
  background-image: url('~/assets/images/rhinestone-background.svg');
  /* background-image: url('~/assets/images/13.jpg'); */
  background-size: cover;
  /* background-position: top left; */
}
</style>
