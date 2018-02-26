<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <div class="headline">Club information</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Official club name</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Clubname" :value="settings.name" @input="updateField('name', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Contact person</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Contact person" :value="settings.contact" @input="updateField('contact', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Club address</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Street address with house number" :value="settings.address" @input="updateField('address', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">PLZ / Ort</div>
            </v-flex>
            <v-flex xs6>
              <v-layout>
                <v-flex xs3>
                <v-text-field label="PLZ" :value="settings.postal_code" @input="updateField('postal_code', $event)"></v-text-field>
                </v-flex>
                <v-flex xs8 offset-xs1>
                  <v-text-field label="Ort" :value="settings.city" @input="updateField('city', $event)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Phone number</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Phonenumber" :value="settings.phone" @input="updateField('phone', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Email</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Email address" :value="settings.email" @input="updateField('email', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Website</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Website" :value="settings.website" @input="updateField('website', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Founding date</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Founded on" :value="settings.founding_date" @input="updateField('founding_date', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs5>
              <div class="subheading">Registered association</div>
            </v-flex>
            <v-flex xs6>
              <v-switch value
                :input-value="settings.registered_association"
                @change="updateField('registered_association', $event)"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline v-if="settings.registered_association">
            <v-flex xs4 offset-xs1>
              <div class="subheading">Responsible local court</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Responsible local court" :value="settings.registry_court" @input="updateField('registry_court', $event)"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline v-if="settings.registered_association">
            <v-flex xs4 offset-xs1>
              <div class="subheading">Registry number</div>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Registry number" :value="settings.registry_number" @input="updateField('registry_number', $event)"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat class="green--text darken-1" @click.native="saveSettings">Speichern</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    async fetch ({ store }) {
      await store.dispatch('settings/getGeneral')
    },
    methods: {
      updateField (field, value) {
        this.$store.commit('settings/updateGeneralSettings', {field, value});
      },
      async saveSettings () {
        await this.$store.dispatch('settings/saveGeneral', this.settings);
      },
    },
    computed: {
      settings () {
        return this.$store.state.settings.general
      }
    }
  }
</script>
