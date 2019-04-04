<template>
  <v-layout column>
    <v-flex>
      <v-btn nuxt to="/members/add" color="primary" class="mb-3">
        <v-icon left>person_add</v-icon>
        New member
      </v-btn>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="members"
          :search="search"
          :rows-per-page-items="[10, 20, 50]"
          :pagination.sync="pagination"
        >
          <template slot="items" slot-scope="members">
            <tr @click="openMemberDetails(members.item.id)">
              <td>{{ members.item.id }}</td>
              <td>{{ members.item.name }}</td>
              <td>{{ members.item.address }}</td>
              <td>{{ members.item.email }}</td>
              <td>{{ members.item.birthday }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Address', value: 'address', sortable: false },
          { text: 'Email', value: 'email' },
          { text: 'Date of Birth', value: 'birthday' },
        ],
        pagination: {
          rowsPerPage: 20,
        },
        selection: [],
        loading: false,
      }
    },
    computed: {
      members () {
        return this.$store.state.members.list
      }
    },
    async fetch ({ error, store }) {
      await store.dispatch('members/fetchAll')
    },
    methods: {
      openMemberDetails (memberId) {
        this.$router.push(`/members/${memberId}`)
      }
    },
}
</script>
