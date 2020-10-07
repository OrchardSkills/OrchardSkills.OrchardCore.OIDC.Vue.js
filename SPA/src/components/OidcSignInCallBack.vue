<template>
  <div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  name: 'OidcSigInCallBack',
  data () {
    return {
      toastNotification: useToast()
    }
  },
  created () {
    this.$oidc.completeLogin()
      .then((redirectPath) => {
        this.$router.push('/')
      })
      .catch((err) => {
        this.toastNotification.error(err.message)
      })
  }
}
</script>
