<template>
  <div></div>
</template>

<script>

import Oidc from '../config/authService'
const oidc = new Oidc()
export default {
  name: 'OidcSignOutCallback',
  created () {
    oidc.completeLogout()
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>
