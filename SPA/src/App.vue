<template>
  <div id="app">
    <!-- Navbar -->
    <nav
      v-if="hasAccess"
      id="nav"
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="#">Orchard Skills</a>

        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="ml-auto">
            <button @click="signOut" v-if="authUser" type="button" class="btn btn-danger">
              Logout
            </button>
            <button @click="signIn" v-else type="button" class="btn btn-primary">
              Login
            </button>
          </div>
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <br />
    <!-- Navbar -->

    <router-view />
  </div>
</template>

<script>
import Oidc from './config/authService'
export default {
  name: 'App',
  computed: {
    hasAccess: function () {
      return this.$route.meta.isPublic
    }
  },
  data () {
    return {
      oidc: new Oidc(),
      authUser: Boolean
    }
  },
  methods: {
    signIn () {
      this.oidc.login()
    },
    signOut: function () {
      this.oidc.logout()
    }
  },
  mounted () {
    setTimeout(() => {
      this.oidc.isLoggedIn().then((auth) => {
        this.authUser = auth
      })
    }, 500)
  },
  unmounted () {
  }
}
</script>
