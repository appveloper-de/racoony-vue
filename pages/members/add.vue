<template>
<v-dialog v-model="dialog">
  <v-layout>
    <v-flex xs12>
      <v-card>
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
                      <v-layout>
                        <v-flex xs6 class="pr-4">
                          <v-text-field label="First name" v-model="member.first_name"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field label="Last name" v-model="member.last_name"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs4>
                          <v-text-field label="Birthday" v-model="member.birthday" append-icon="event"></v-text-field>
                          <!-- <v-menu lazy :close-on-content-click="false" v-model="birthdayPicker" offset-y
                            full-width :nudge-right="40" max-width="290px" min-width="290px">
                            <v-date-picker v-model="member.birthday" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                              </template>
                            </v-date-picker>
                          </v-menu> -->
                          <!-- <v-text-field label="Birthday" v-model="member.birthday" placeholder="1988-06-16"></v-text-field> -->
                        </v-flex>
                        <v-flex xs2>
                          <div v-if="isValidDate(member.birthday)">
                            test
                          </div>
                        </v-flex>
                        <v-flex xs6>
                          <v-text-field label="Phone" v-model="member.phone"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-text-field label="Street address" v-model="member.street_address"></v-text-field>
                      <v-layout>
                        <v-flex xs2 class="pr-4">
                          <v-text-field label="Postal code" v-model="member.postal_code"></v-text-field>
                        </v-flex>
                        <v-flex xs6 class="pr-4">
                          <v-text-field label="City" v-model="member.city"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-select
                            v-model="member.country_code"
                            :items="availableCountries"
                            label="Country"
                          ></v-select>
                        </v-flex>
                      </v-layout>

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

<script>
import moment from 'moment'
export default {
  data () {
    return {
      dialog: true,
      birthdayPicker: false,
      tabs: 'user-tab-general',
      member: {
      }
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    isValidDate (date) {
      return date && moment(date).isValid()
    },
    toggleBirthdayPicker () {
      this.birthdayPicker = !this.birthdayPicker
    }
  },
  watch: {
    dialog: function (newValue) {
      if (!newValue) {
        this.$router.push('/members')
      }
    }
  }
}
</script>

