<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-toolbar card color="transparent">
        <div>
          <v-checkbox @click="selectAll" class="pt-4"></v-checkbox>
        </div>
        <v-menu offset-y>
          <v-btn slot="activator" >
            <span>Selection</span>
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>Move to ...</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <v-btn slot="activator">
            <span>Sort by</span>
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>Name</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>City</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Entry Date</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-text-field
          single-line
          class="pt-4"
          style="max-width: 300px"
          id="member-search-input"
          append-icon="search"
          clearable
          placeholder="Search member..."></v-text-field>
      <!-- </v-toolbar-items> -->
      </v-toolbar>
    </v-flex>
    <v-flex xs12 sm12>
      <v-card>
        <v-card-text class="pa-0">
          <v-list three-line class="py-0">
            <template v-for="(member, index) in members">
              <v-list-tile :key="index" avatar :to="'/members/' + member.id" nuxt>
                <v-list-tile-action>
                  <v-checkbox v-model="selection" :value="member.id"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-icon color="grey">star</v-icon>
                </v-list-tile-action>
                <v-list-tile-avatar size="48px" class="mt-0 mr-3">
                  <v-avatar class="teal">
                    <span class="white--text headline">{{ member.first_name.charAt(0) }}</span>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ fullName(member) }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ member.postal_code }} {{ member.city }} <br>
                    {{ member.email }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index+1 < members.length"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    middleware: 'authenticated',
    data () {
      return {
        search: '',
        pagination: null,
        members: [
        ],
        selection: [],
        loading: false,
      }
    },
    async asyncData ({ error, store }) {
      try {
        let { data, pagination } = await store.dispatch('members/fetchAllMembers')

        return {
          members: Object.values(data),
          pagination: pagination,
          loading: false
        }
      } catch (error) {
        return {
          loading: false
        }
      }
    },
    methods: {
      fullName (item) {
        return item.first_name + ' ' + item.last_name
      },
      address (item) {
        return item.street_address + ' ' + item.postal_code + ' ' + item.city
      },
      selectAll () {
        console.log("selecting all checkboxes")
      }
    }
}
</script>
