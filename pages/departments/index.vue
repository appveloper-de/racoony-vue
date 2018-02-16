<template>
  <v-layout>
    <v-flex>
      <v-dialog v-model="editDialog" max-width="500px" @keydown.esc="closeEditDialog">
        <v-btn color="primary" slot="activator" class="mb-3">
          <v-icon left>add</v-icon>
          New department
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-layout column>

                <v-flex xs12>
                  <v-text-field label="Department name" v-model="editedItem.name" />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    label="Description"
                    v-model="editedItem.description"
                    multi-line />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeEditDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="saveDepartment">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="500px" @keydown.esc="closeDeleteDialog">
        <v-card>
          <v-card-title class="headline">Confirm delete department "{{ departmentToDelete.name }}"?</v-card-title>
          <v-card-text>You cannot undo this change - do you really want to delete the department?</v-card-text>
          <v-card-actions>

            <v-btn flat @click="closeDeleteDialog">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="error" @click="deleteDepartment(departmentToDelete.id)">Confirm delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table :headers="headers" :items="departments" hide-actions class="elevation-1">
        <template slot="items" slot-scope="departments">
          <td>{{ departments.item.id }}</td>
          <td>{{ departments.item.name }}</td>
          <td>{{ departments.item.description }}</td>
          <td>{{ departments.item.number_of_members }}</td>
          <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(departments.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="openDeleteDialog(departments.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
        </template>
        <template slot="no-data">
          FML no departments!
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Number of members', value: 'number_of_members' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
    },
    defaultItem: {
      name: '',
      description: '',
    },
    departmentToDelete: {},
    editDialog: false,
    deleteDialog: false,
  }),
  async fetch ({ store }) {
    await store.dispatch('departments/fetchAll')
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.departments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },
    openDeleteDialog (department) {
      this.departmentToDelete = Object.assign({}, department)
      this.deleteDialog = true
    },
    deleteDepartment (departmentId) {
      this.$store.dispatch('departments/delete', departmentId)
      this.closeDeleteDialog()
    },
    closeEditDialog () {
      this.editDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    closeDeleteDialog () {
      this.deleteDialog = false
      setTimeout(() => {
        this.departmentToDelete = {}
      }, 300)
    },
    saveDepartment () {
      if (this.editedIndex > -1) {
        // update
        this.$store.dispatch('departments/update', this.editedItem)
      } else {
        // create
        this.$store.dispatch('departments/store', this.editedItem)
      }
      this.closeEditDialog()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    departments () {
      return this.$store.state.departments.list
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
