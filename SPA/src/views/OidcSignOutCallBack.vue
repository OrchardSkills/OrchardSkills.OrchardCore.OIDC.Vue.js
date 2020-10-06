<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OidcSignOutCallback',
  methods: {
    ...mapActions('oidcStore', ['signOutOidcCallback'])
  },
  created () {
    this.signOutOidcCallback()
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>
