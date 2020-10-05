<template>
  <div class="container">
    <div v-if="oidcIsAuthenticated">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <div class="card text-center m-3">
        <h5 class="card-header">GET Request with Set Headers</h5>
        <div class="card-body">Total vue packages: {{ totalVuePackages }}</div>
      </div>
    </div>
    <div v-else>
      Please login to enable CRUD operations.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jsonMarkup from 'json-markup'
import axios from 'axios'
import { environment } from '../config/config'

// const urlApiContent = environment.stsAuthority + 'api/content/'

const urlApiGraphql = environment.stsAuthority + 'api/graphql'
export default {
  name: 'Subscribers',
  computed: {
    ...mapGetters('oidcStore', [
      'oidcIsAuthenticated',
      'oidcUser',
      'oidcAccessToken'
    ]),
    userDisplay: function () {
      return jsonMarkup(this.oidcUser)
    }
  },
  data () {
    return {
      totalVuePackages: null,
      Subscribers: []
    }
  },
  methods: {
    async getSubscribers () {
      // GET request using axios with set headers
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // eslint-disable-next-line quote-props
        Authorization: 'Bearer' + this.oidcAccessToken
      }
      const url = urlApiGraphql
      const body = `
         query {
            subscriber {
              createdUtc
              displayText
              email
              firstName
              lastName
              modifiedUtc
              publishedUtc
            }
          }`
      const response = await axios.post(url, body, { headers: headers })
      this.Subscribers = response.data.subscriber
      console.log('data', this.oidcAccessToken)
    }
  },
  mounted () {
    this.getSubscribers()
  }
}
</script>
