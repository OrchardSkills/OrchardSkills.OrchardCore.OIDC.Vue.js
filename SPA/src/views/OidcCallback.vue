<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'OidcCallback',

  created () {
    this.$oidc.completeLogin()
      .then((redirectPath) => {
        this.$router.push('/')
      })
      .catch((err) => {
        console.error(err)
        this.$router.push('/signin-oidc-error') // Handle errors any way you want
      })
  }
}
</script>
