<template>
  <v-container fluid>
    <v-card>
      <v-card-row>
        <v-card-title>
          Vereinsdaten
        </v-card-title>
      </v-card-row>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Offizieller Name des Vereins</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="name" label="Vereinsname" id="name" v-model="name"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Ansprechpartner / Kontakt</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="contact" label="Ansprechpartner" id="contact" v-model="contact"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Adresse</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="address" label="Straße und Hausnr." id="address" v-model="address"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">PLZ / Ort</div>
            </v-flex>
            <v-flex xs1>
              <v-text-field name="postal_code" label="PLZ" id="postal_code" v-model="postal_code"></v-text-field>  
            </v-flex>
            <v-flex xs3>
              <v-text-field name="city" label="Ort" id="city" v-model="city"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Telefon</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="phone" label="Telefonnummer" id="phone" v-model="phone"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Email</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="email" label="Email-Adresse" id="email" v-model="email"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Webseite</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="website" label="Webseite" id="website" v-model="website"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Gründungsdatum</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="founding_date" label="Gründungsdatum" id="founding_date" v-model="founding_date"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline>
            <v-flex xs4>
              <div class="subheading">Eingetragener Verein (e.V.)</div>
            </v-flex>
            <v-flex xs4>
              <v-switch v-model="registered_association"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row align-baseline v-if="registered_association">
            <v-flex xs3 offset-xs1>
              <div class="subheading">Zuständiges Amtsgericht</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="registry_court" label="Amtsgericht" id="registry_court" v-model="registry_court"></v-text-field>  
            </v-flex>
          </v-layout>
          <v-layout row align-baseline v-if="registered_association">
            <v-flex xs3 offset-xs1>
              <div class="subheading">Registernummer</div>
            </v-flex>
            <v-flex xs4>
              <v-text-field name="registry_number" label="Registernummer" id="registry_number" v-model="registry_number"></v-text-field>  
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-btn flat class="green--text darken-1">Speichern</v-btn>
      </v-card-row>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        contact: '',
        address: '',
        postal_code: '',
        city: '',
        phone: '',
        email: '',
        website: '',
        founding_date: '',
        registered_association: false,
        registry_court: '',
        registry_number: ''
      }
    },
    asyncData ({ error, store }) {
      return store.dispatch('settings/getSettingsClubGeneral')
      .then((response) => {
        return Object.assign({}, response.data, { loading: false })
      })
      .catch((err) => {
        console.log(err)
        return { loading: false }
      })
    }
  }
</script>