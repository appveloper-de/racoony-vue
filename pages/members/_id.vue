<template>
  <v-dialog v-model="dialog" @keydown.esc="closeDialog">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-media src="/backgrounds/department-football.jpg" height="200px" class="white--text">
            <v-container fluid fill-height>
              <v-layout fill-height>
                <v-flex xs12 align-end d-flex>
                  <span class="headline">
                    <v-avatar class="teal">
                      <span class="white--text headline" v-html="member.first_name.charAt(0).toUpperCase()"></span>
                    </v-avatar>
                    <span> {{ fullName }}</span>
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <v-tabs icons v-model="tabs">
              <v-tab href="#user-tab-general">Allgemeines</v-tab>
              <v-tab href="#user-tab-departments">Abteilungen</v-tab>
              <v-tab href="#user-tab-dues">Beiträge</v-tab>
              <v-tab href="#user-tab-payment">Zahlung</v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text>
            <v-tabs-items v-model="tabs">
              <v-tab-item id="user-tab-general">
                <form>
                  <v-container fluid>
                    <v-layout column>
                      <v-flex xs12>
                        <v-text-field label="Member ID" v-model="member.id"></v-text-field>
                        <v-text-field label="First name" v-model="member.first_name"></v-text-field>
                        <v-text-field label="Last name" v-model="member.last_name"></v-text-field>
                        <v-text-field label="Birthday" v-model="member.birthday"></v-text-field>
                        <v-text-field label="Street address" v-model="member.street_address"></v-text-field>
                        <v-layout>
                          <v-flex xs6 class="pr-4">
                            <v-text-field label="Postal code" v-model="member.postal_code"></v-text-field>
                          </v-flex>
                          <v-flex xs6>
                            <v-text-field label="City" v-model="member.city"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-select
                          v-model="member.country_code"
                          :items="availableCountries"
                          label="Country"
                        ></v-select>
                        <v-text-field label="Phone" v-model="member.phone"></v-text-field>
                        <v-text-field label="Email address" v-model="member.email"></v-text-field>
                        <v-text-field label="Eintrittsdatum" v-model="member.entry_date"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </form>
              </v-tab-item>
              <v-tab-item id="user-tab-departments">
                Departments
              </v-tab-item>
              <v-tab-item id="user-tab-dues">
                Dues
              </v-tab-item>
              <v-tab-item id="user-tab-payment">
                Payment
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-card-actions>
            <v-btn flat @click="closeDialog">Close</v-btn>
            <v-btn flat color="primary" @click="saveMember">
              <v-icon left>save</v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      availableCountries: [
        { text: 'Germany', value: 'DEU' },
        { text: 'Austria', value: 'AUT', },
        { text: 'Switzerland', value: 'CHE', }
      ],
      tabs: 'user-tab-general',
      dialog: false
    }
  },
  async asyncData ({ store, params }) {
    let { data } = await store.dispatch('members/fetchMemberById', { id : params.id })

    return {
      member: data,
      dialog: true
    }
  },
  computed: {
    fullName () {
      return this.member.first_name + ' ' + this.member.last_name
    }
  },
  watch: {
    dialog: function (newValue, oldValue) {
      if (!newValue) {
        return this.$router.push('/members')
      }
    }
  },
  methods: {
    async saveMember () {
      try {
        await this.$store.dispatch('members/updateMember', this.member)
        this.$toast.success('Member saved.')
      } catch (error) {
        console.log(error)
        this.$toast.error('Error while saving the member')
      }
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
