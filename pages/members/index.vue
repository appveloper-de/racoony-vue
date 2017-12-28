<template>
  <div v-if="items.length > 0">
    <v-card v-for="item in items" :key="item.id">
      <v-card-row class="green darken-1">
        <v-card-title light>
          {{ item.name }}
        </v-card-title>
      </v-card-row>
      <v-card-row>
        <v-list style="flex: 1;">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Name</v-list-tile-title>
                <v-list-tile-sub-title>Adresse</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-list-tile-title>Email-Adresse</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-list-tile-title>Geburtstag</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider></v-divider>
          <template v-for="member in item.members">
            <v-list-tile :key="member.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ full_name(member) }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ address(member) }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
                {{ member.email }}
              </v-list-tile-content>
              <v-list-tile-content>
                {{ member.birthday }}
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-row>
    </v-card>
  </div>
  <div v-else>
    Es sind keine Daten vorhanden.
  </div>
</template>

<script>
export default {
    middleware: 'authenticated',
    data () {
      return {
        search: '',
        items: [],
        loading: false,
        headers: [
          { text: 'Member ID', value: 'id', left: true },
          { text: 'Name', value: 'name' },
          { text: 'Address', value: 'address' },
          { text: 'Birthday', value: 'birthday' },
          { text: 'Entry date', value: 'entry_date' },
        ]
      }
    },
    asyncData ({ error, store }) {
      return store.dispatch('members/fetchAllMembers')
      .then((response) => {
        return {
          items: store.state.members.members,
          loading: false
        }
      })
      .catch((err) => {
        console.log(err)
        return { loading: false }
      })
    },
    methods: {
      full_name (item) {
        return item.first_name + ' ' + item.last_name
      },
      address (item) {
        return item.street_address + ' ' + item.postal_code + ' ' + item.city
      }
    }
}
</script>
