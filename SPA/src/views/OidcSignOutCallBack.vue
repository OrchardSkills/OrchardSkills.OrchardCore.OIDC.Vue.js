<template>
  <div></div>
</template>

<script>

export default {
  name: 'OidcSignOutCallback',
  created () {
    this.$oidc.completeLogout()
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>
