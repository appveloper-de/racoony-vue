<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant.sync="miniVariant" light v-model="drawer" 
      @click.native.stop="miniVariant = false" class="">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <!-- <img src="https://www.gravatar.com/avatar/1ff02ed3eca9254520e4e072e3b720e2"> -->
              <img src="/racoon-head-avatar.png" style="width: 54px; height: initial; border-radius: initial;">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-tile router :to="item.to">
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="green lighten-2" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <nuxt />
        </v-slide-y-transition>
      </v-container>
    </main>
    <v-footer class="green lighten-3":fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Start', to: '/' },
          { icon: 'people', title: 'Abteilungen / Mitglieder', to: '/members' },
          { icon: 'settings', title: 'Einstellungen', to: '/settings/club' }
        ],
        miniVariant: true,
        right: null,
      }
    },
    computed: {
      title () {
        return this.$route.matched.map((r) => {
          return (r.components.default.options ? r.components.default.options.pageTitle : r.components.default.pageTitle)
        })[0]
      } 
    }
  }
</script>