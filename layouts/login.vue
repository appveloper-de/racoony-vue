<template>
  <v-app>
    <v-content>
      <v-container fill-height fluid>
        <v-slide-y-transition mode="out-in">
          <nuxt />
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>


<style scoped>
.content {
  background-image: url('~/assets/images/rhinestone-background.svg');
  background-size: cover;
}
</style>

<script>
export default {
  auth: false
}
</script>


