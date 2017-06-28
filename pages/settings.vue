<template>
  <v-card>
    <v-card-row>
      <v-tabs light>
        <v-tabs-bar slot="activators">
          <v-tabs-slider></v-tabs-slider>
          <v-tabs-item router to="/settings/club">Verein</v-tabs-item>
          <v-tabs-item router to="/settings/finances">Finanzen</v-tabs-item>
          <v-tabs-item router to="/settings/departments">Abteilungen</v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
    </v-card-row>
    <v-card-row >
      <v-slide-x-transition>
        <nuxt-child/>
      </v-slide-x-transition>
    </v-card-row>
  </v-card>
</template>

<script>
  export default {
    pageTitle: 'Einstellungen',
    middleware: 'authenticated'
  }
</script>