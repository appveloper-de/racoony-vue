<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-dialog max-width="550px" v-model="editDialog" @keydown.esc="closeEditDialog">
          <v-btn class="primary mb-3" slot="activator">Neuen Beitrag anlegen</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Create membership fee</span>
            </v-card-title>
            <v-card-text>
              <v-tooltip bottom>
                <v-select slot="activator" :items="available_types" v-model="itemEditing.type" label="Beitragsart" disabled></v-select>
                <span>Momentan wird nur der Beitragstyp "Standard" unterstützt.</span>
              </v-tooltip>
              <v-text-field label="Betrag" suffix="€ / Monat" v-model="itemEditing.amount"></v-text-field>
              <v-text-field label="Bezeichnung" v-model="itemEditing.description"></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeEditDialog">Cancel</v-btn>
              <v-btn class="primary" @click="saveItem">Beitrag anlegen</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px" @keydown.esc="closeDeleteDialog">
          <v-card>
            <v-card-title class="headline">Confirm deletion</v-card-title>
            <v-card-text>
              <p>You are about to delete "{{ itemDeleting.description }}"</p>
              You cannot undo this change - do you really want to delete this membership fee?
            </v-card-text>
            <v-card-actions>

              <v-btn flat @click="closeDeleteDialog">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="error" @click="deleteItem(itemDeleting.id)">Confirm delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-data-table :headers="headers" :items="membership_fees" hide-actions class="elevation-1">
          <template slot="items" slot-scope="membership_fees">
            <td>{{ mapType(membership_fees.item.type) }}</td>
            <td>{{ formatAmount(membership_fees.item.amount) }}</td>
            <td>{{ membership_fees.item.description }}</td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="editItem(membership_fees.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="openDeleteDialog(membership_fees.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template slot="no-data">
            There are no membership fees set up, yet.
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      indexEditing: -1,
      itemDeleting: {},
      itemEditing: {
        type: 'default',
        description: '',
        amount: '',
      },
      defaultItem: {
        type: 'default',
        description: '',
        amount: '',
      },
      headers: [
        { text: 'Typ', value: 'type' },
        { text: 'Beitrag (monatlich)', value: 'amount' },
        { text: 'Beschreibung', value: 'description', sortable: false },
        { text: 'Aktionen' }
      ],
      editDialog: false,
      deleteDialog: false,
      available_types: [
        { text: 'Standard', value: 'default' },
      ],
    }
  },
  async fetch ({ store }) {
    await store.dispatch('settings/membership_fees/fetchAll')
  },
  methods: {
    closeEditDialog () {
      this.editDialog = false
      setTimeout(() => {
        this.itemEditing = Object.assign({}, this.defaultItem)
        this.indexEditing = -1
      }, 200)
    },
    openEditDialog () {
      this.editDialog = true
    },
    openDeleteDialog (item) {
      this.itemDeleting = Object.assign({}, item)
      this.deleteDialog = true
    },
    closeDeleteDialog () {
      this.deleteDialog = false
      setTimeout(() => {
        this.itemDeleting = {}
      }, 200)
    },
    mapType (type) {
      switch (type) {
        case 'default':
          return 'Standard'
        default:
          return 'Standard'
      }
    },
    formatAmount (amount) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount / 100)
    },
    deleteItem (id) {
      this.$store.dispatch('settings/membership_fees/delete', id)
      this.closeDeleteDialog()
    },
    async saveItem () {
      let data = {
        id: this.itemEditing.id,
        type: this.itemEditing.type,
        description: this.itemEditing.description,
        amount: this.itemEditing.amount * 100
      }

      if (this.indexEditing > -1) {
        await this.$store.dispatch('settings/membership_fees/update', data)
      } else {
        await this.$store.dispatch('settings/membership_fees/store', data)
      }
      this.closeDialog()
    },
    editItem (item) {
      this.indexEditing = this.membership_fees.indexOf(item)
      this.itemEditing = Object.assign({}, item)
      this.itemEditing.amount = new Intl.NumberFormat().format(this.itemEditing.amount / 100)
      this.openEditDialog()
    }
  },
  computed: {
    membership_fees() {
      return this.$store.state.settings.membership_fees.list
    }
  },
  watch: {
    editDialog (val) {
      val || this.closeEditDialog()
    },
    deleteDialog (val) {
      val || this.closeDeleteDialog()
    }
  }
}
</script>

