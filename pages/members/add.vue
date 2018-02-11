<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div class="display-1">Add new member</div>
        </v-card-title>
        <v-card-text>
          <form>
            <v-layout column>
              <v-layout row>

                <v-flex md5>
                  <div>
                    <div class="subheading">General information</div>
                    <p class="body-1 grey--text">General information about the person, like address, name, birthday and so on.</p>
                  </div>
                </v-flex>

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
                    <v-spacer></v-spacer>
                    <v-flex md5>
                      <v-text-field
                        label="Last name"
                        v-model="member.last_name"
                        :error-messages="lastNameErrors"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex md4>
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
                  </v-layout>

                  <v-layout>
                    <v-flex md4>
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
                    <v-spacer></v-spacer>
                    <v-flex md5>
                      <v-text-field
                        label="Email address"
                        v-model="member.email"
                        required
                        :error-messages="emailErrors"></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex>
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
                    <v-spacer></v-spacer>
                    <v-flex md8>
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
                    <v-flex md6>
                      <v-select
                        v-model="member.country"
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
              </v-layout>

            </v-layout>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveMember">
            <v-icon left>person_add</v-icon>
            Create member
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { isDate } from '~/utils/validators/date'
import moment from 'moment'

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

  data () {
    return {
      member: {
        country: 'DEU'
      },
      availableCountries: [
        { text: 'Germany', value: 'DEU' },
        { text: 'Austria', value: 'AUT', },
        { text: 'Switzerland', value: 'CHE', }
      ],
    }
  },
  methods: {
    async saveMember () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return this.$toast.error('Invalid data.')
      }

      try {
        member = await this.$store.dispatch('members/createMember', this.member)
        this.redirect('/members/' + member.id)
        this.$toast.success('Member was created.')
      } catch (error) {
        this.$toast.error('Something went wrong while creating the member.')
      }
    },
  },
  computed: {
    today () {
      return moment().format('DD.MM.YYYY')
    },
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
    }
  }
}
</script>

