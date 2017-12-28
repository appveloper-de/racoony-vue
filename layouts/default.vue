<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.width > 1264"
      v-model="drawer"
      app
      dark
      class="blue-grey darken-3">
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">START</v-subheader>
        <!-- Dashboard -->
        <v-list-tile to="/" router exact>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Dashboard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- Members -->
        <v-subheader class="mt-3 grey--text text--darken-1">MEMBERS</v-subheader>
        <v-list-tile to="/members" router exact>
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Members
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- options -->
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="white" fixed clipped-left app class="elevation-1">
      <v-toolbar-title
        :style="$vuetify.breakpoint.width > 1264 && 'width: 300px'"
        class="ml-0 pl-3"
        :class="$vuetify.breakpoint.width <= 1264 && 'pr-3'"
      >
        <v-icon class="ml-3">fa-youtube</v-icon>
      </v-toolbar-title>
      <v-layout align-center style="max-width: 650px;">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          class="white--text"
          hide-details
        ></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>
      <v-layout align-center justify-end>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-menu bottom offset-y transition="slide-y-reverse-transition">
          <v-avatar slot="activator" size="36px" class="grey lighten-4 ml-2">
            <img src="/users/2576.png" alt="avatar">
          </v-avatar>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Logout
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>
