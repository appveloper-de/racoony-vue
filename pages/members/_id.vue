<template>
  <v-layout>
    <v-flex>
      <v-btn flat color="grey darken-2" class="mb-3 ml-0" href="/members" nuxt>
        <v-icon left>arrow_back</v-icon>
        Back to overview
      </v-btn>
      <v-toolbar
        tabs
        color="light-green lighten-4"
        extended
      >
        <!-- icon -->
        <v-toolbar-title>{{ fullName }}</v-toolbar-title>
        <v-tabs
          slot="extension"
          color="transparent"
          v-model="tabs"
          slider-color="light-green darken-1"
        >
          <v-tab href="#tab-general">General</v-tab>
          <v-tab href="#tab-departments">Departments</v-tab>
        </v-tabs>

      </v-toolbar>
      <v-tabs-items v-model="tabs" class="elevation-1">
        <v-tab-item id="tab-general">
          <v-card flat>
            <v-card-text>
              <form>
                <v-layout column>
                  <v-layout row>

                    <v-flex md6>
                      <v-layout row>
                        <v-flex md5>
                          <v-text-field
                            label="First name"
                            v-model="member.first_name"
                            :error-messages="firstNameErrors"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex md5 offset-md1>
                          <v-text-field
                            label="Last name"
                            v-model="member.last_name"
                            :error-messages="lastNameErrors"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex md5>
                          <v-text-field
                            label="Date of birth"
                            mask="##.##.####"
                            return-masked-value
                            v-model="member.birthday"
                            append-icon="event"
                            placeholder="16.06.1988"
                            :error-messages="birthdayErrors"
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex md5 offset-md1>
                          <v-text-field
                            label="Date of entry"
                            mask="##.##.####"
                            v-model="member.entry_date"
                            :error-messages="entryDateErrors"
                            return-masked-value
                            :placeholder="today"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex md5>
                          <v-text-field label="Phone" v-model="member.phone"></v-text-field>
                        </v-flex>
                        <v-flex md5 offset-md1>
                          <v-text-field
                            label="Email address"
                            v-model="member.email"
                            required
                            :error-messages="emailErrors"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex md11>
                          <v-text-field
                            label="Street address"
                            v-model="member.street_address"
                            placeholder="Aschrottstraße 4"
                            required
                            :error-messages="streetAddressErrors"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex md3>
                          <v-text-field
                            label="Postal code"
                            v-model="member.postal_code"
                            mask="#####"
                            placeholder="34119"
                            :error-messages="postalCodeErrors"
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex md7 offset-md1>
                          <v-text-field
                            label="City"
                            v-model="member.city"
                            required
                            placeholder="Kassel"
                            :error-messages="cityErrors"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex md11>
                          <v-select
                            v-model="member.country.code"
                            :items="availableCountries"
                            label="Country"
                          ></v-select>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex md6>

                        </v-flex>
                      </v-layout>

                    </v-flex>

                    <v-flex md6>
                      <div>
                        <div class="subheading">General information</div>
                        <p class="body-1 grey--text">General information about the person, like address, name, birthday and so on.</p>
                      </div>
                    </v-flex>
                  </v-layout>

                </v-layout>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="save">
                <v-icon left>edit</v-icon>
                Save member
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-tab-item>

        <v-tab-item id="tab-departments">
          <v-card flat>
            <v-card-text>
              <v-layout row>
                <v-flex md5>
                  <v-subheader>Active memberships</v-subheader>
                  <v-data-table :items="member.departments" hide-actions hide-headers class="elevation-1">
                    <template slot="items" slot-scope="departments">
                      <td>{{ departments.item.name }}</td>
                      <td class="justify-center layout px-0">
                        <v-tooltip top>
                          <!-- TODO comment this in when we have detail department views -->
                          <!-- <v-btn icon :href="`/departments/${departments.item.id}`" slot="activator"> -->
                            <v-btn icon nuxt to="/departments" slot="activator">
                            <v-icon color="teal">open_in_browser</v-icon>
                          </v-btn>
                          <span>Open department</span>
                        </v-tooltip>
                      </td>
                    </template>
                  </v-data-table>

                  <v-subheader>Passive memberships</v-subheader>

                </v-flex>

                <v-flex md6 offset-md1>
                  <v-subheader>Assign departments</v-subheader>
                  <v-select
                    :items="departments"
                    v-model="addToDepartment"
                    label="Select department"
                    single-line
                    item-text="name"
                    item-value="id"
                    bottom
                  ></v-select>
                  <v-btn color="primary" @click="assignMemberToDepartment">
                    <v-icon left>play_for_work</v-icon>
                    Assign to department
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>

            </v-card-actions>
          </v-card>

        </v-tab-item>
      </v-tabs-items>


    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { isDate } from "~/utils/validators/date";
import moment from "moment";

export default {
  mixins: [validationMixin],

  validations: {
    member: {
      first_name: { required },
      last_name: { required },
      birthday: { required, isDate },
      entry_date: { isDate },
      email: { required, email },
      street_address: { required },
      postal_code: { required },
      city: { required }
    }
  },
  created () {
    this.addToDepartment = this.departments[0].id
  },
  data () {
    return {
      availableCountries: [
        { text: 'Germany', value: 'DEU' },
        { text: 'Austria', value: 'AUT', },
        { text: 'Switzerland', value: 'CHE', }
      ],
      tabs: 'tab-general',
      addToDepartment: false
    }
  },
  async fetch ({ store, params }) {
    let fetchDepartments = store.dispatch('departments/fetchAll');
    let fetchMember = store.dispatch('members/fetchMemberById', { id: params.id});

    await Promise.all([fetchDepartments, fetchMember])
  },
  methods: {
    async save () {
      this.$v.$touch()
      if (this.$v.$invalid) return this.$toast.error('Invalid data.')

      try {
        const data = this.member
        data.country = data.country.code
        await this.$store.dispatch('members/updateMember', data)
        this.$toast.success('Member saved.')
      } catch (error) {
        console.log(error)
        this.$toast.error('Error while saving the member')
      }
    },
    async assignMemberToDepartment () {
      await this.$store.dispatch('members/assignToDepartment', {
        memberId: this.member.id,
        departmentId: this.addToDepartment
      })
    }
  },
  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.member.first_name.$dirty) return errors
      !this.$v.member.first_name.required && errors.push('Name is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.member.last_name.$dirty) return errors
      !this.$v.member.last_name.required && errors.push('Name is required.')
      return errors
    },
    birthdayErrors () {
      const errors = []
      if (!this.$v.member.birthday.$dirty) return errors
      !this.$v.member.birthday.isDate && errors.push('Not a valid date.')
      return errors
    },
    entryDateErrors () {
      const errors = []
      if (!this.$v.member.entry_date.$dirty) return errors
      !this.$v.member.entry_date.isDate && errors.push('Not a valid date')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.member.email.$dirty) return errors
      !this.$v.member.email.required && errors.push('Email is required.')
      !this.$v.member.email.email && errors.push('Not a valid email address')
      return errors
    },
    streetAddressErrors () {
      const errors = []
      if (!this.$v.member.street_address.$dirty) return errors
      !this.$v.member.street_address.required && errors.push('Street address is required.')
      return errors
    },
    postalCodeErrors () {
      const errors = []
      if (!this.$v.member.postal_code.$dirty) return errors
      !this.$v.member.postal_code.required && errors.push('Postal code is required.')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.member.city.$dirty) return errors
      !this.$v.member.city.required && errors.push('City is required.')
      return errors
    },
    fullName () {
      return this.member.first_name + ' ' + this.member.last_name
    },
    today () {
      return moment().format('DD.MM.YYYY')
    },
    member () {
      return this.$store.state.members.current
    },
    departments () {
      return this.$store.state.departments.list.filter(department => {
        return !this.member.departments.find(memberDepartment => memberDepartment.id === department.id)
      })
    }
  }
}
</script>
