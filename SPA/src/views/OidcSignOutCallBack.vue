<template>
  <div></div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  name: 'OidcSignOutCallBack',
  data () {
    return {
      toastNotification: useToast()
    }
  },
  created () {
    this.$oidc.completeLogout()
      .then(() => {
        this.$router.push('/')
      })
      .catch((err) => {
        this.toastNotification.error(err.message)
      })
  }
}
</script>
