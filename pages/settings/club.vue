<template>
  <div>
    club
  </div>
</template>

<script>
  export default {
    asyncData ({ error, store }) {
      return store.dispatch('settings/getSettingsClubGeneral')
      .then((response) => {
        return {
          loading: false
        }
      })
      .catch((err) => {
        console.log(err)
        return { loading: false }
      })
    }
  }
</script>