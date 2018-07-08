<template>
  <v-layout>
    <v-flex xs3>
      <v-list three-line class="elevation-1 mt-3">
        <v-list-tile avatar nuxt to="/settings/club">
          <v-list-tile-content>
            <v-list-tile-title>Vereinsdaten</v-list-tile-title>
            <v-list-tile-sub-title>Name, Anschrift und alle wichtigen Daten des Vereins</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar nuxt to="/settings/finances">
          <v-list-tile-content>
            <v-list-tile-title>Finanzen</v-list-tile-title>
            <v-list-tile-sub-title>Einstellung rund ums Geld, wie z.B. Buchhaltung und Kontodaten</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar nuxt to="/settings/departments">
          <v-list-tile-content>
            <v-list-tile-title>Abteilungen</v-list-tile-title>
            <v-list-tile-sub-title>Verwaltung der verschiedenen Abteilungen in deinem Verein</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar nuxt to="/settings/membership_fees">
          <v-list-tile-content>
            <v-list-tile-title>Beiträge</v-list-tile-title>
            <v-list-tile-sub-title>Einstellungen bezüglich der Mitgliedsbeiträge in deinem Verein</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs9>
      <div transition="v-slide-x-transition">
      <nuxt-child/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    pageTitle: 'Einstellungen',
  }
</script>