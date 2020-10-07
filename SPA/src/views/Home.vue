<template>
  <div class="container">
    <div v-if="authUser">
      <div class="d-flex justify-content-end mb-4">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >
          Add
        </button>
      </div>
      <hr />
      <div
        class="table-editor"
        id="table_1"
        data-entries="5"
        data-entries-options="[5, 10, 15]"
      >
        <table class="table">
          <thead>
            <tr>
              <th class="th-sm" data-width="250">First Name</th>
              <th class="th-sm" data-width="250">Last Name</th>
              <th class="th-sm" data-width="250" data-sort="false">Email</th>
              <th class="th-sm" data-sort="false">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="Subscribers.lenght === 0">
              <td></td>
              <div class="text-center">
                There is no subscribers
              </div>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="subscriber in Subscribers" :key="subscriber">
              <template
                v-if="
                  subscriberToEdit?.contentItemId !== subscriber.contentItemId
                "
              >
                <td>{{ subscriber.firstName }}</td>
                <td>{{ subscriber.lastName }}</td>
                <td>{{ subscriber.email }}</td>
              </template>
              <template
                v-if="
                  editing &&
                    subscriberToEdit?.contentItemId == subscriber.contentItemId
                "
              >
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    aria-label="First Name"
                    name="firstName"
                    v-model="subscriber.firstName"
                  />
                </td>

                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    aria-label="First Name"
                    name="lastName"
                    v-model="subscriber.lastName"
                  />
                </td>

                <td>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    name="email"
                    v-model="subscriber.email"
                  />
                </td>

                <td>
                  <div class="row">
                    <div class="col-md-6">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        @click="updateSubscriber(subscriber)"
                      >
                        Update
                      </button>
                    </div>
                    <div class="col-md-6">
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="closeEditSubscriber"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              </template>

              <template v-if="!editing">
                <td>
                  <div class="row">
                    <div class="col-md-3">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        @click="OpenEditSubscriber(subscriber)"
                      >
                        Edit
                      </button>
                    </div>
                    <div class="col-md-3">
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteSubscriber(subscriber.contentItemId)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-center">
      Please login to enable CRUD operations.
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Add New Subscriber
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <!-- 2 column grid layout with text inputs for the first and last names -->
              <div class="row mb-4">
                <div class="col">
                  <label for="form3Example1">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    aria-label="First Name"
                    name="firstName"
                    v-model="addSubsribersData.firstName"
                  />
                </div>
                <div class="col">
                  <label for="form3Example2">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    name="lastName"
                    v-model="addSubsribersData.lastName"
                  />
                </div>
              </div>

              <!-- Email input -->
              <div class="mb-4">
                <label for="form3Example3">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  name="email"
                  v-model="addSubsribersData.email"
                />
              </div>

              <!-- Submit button -->
              <button
                data-dismiss="modal"
                type="submit"
                class="btn btn-primary btn-block mb-4"
                @click="addSubscriber(addSubsribersData)"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { environment } from '../config/config'
const urlApiContent = environment.stsAuthority + 'api/content/'

const urlApiGraphql = environment.stsAuthority + 'api/graphql'

export default {
  name: 'Home',
  data () {
    return {
      authUser: Boolean,
      oidcAccessToken: '',
      Subscribers: [],
      subscriberToEdit: {
        createdUtc: '',
        displayText: '',
        email: '',
        firstName: '',
        lastName: '',
        modifiedUtc: '',
        publishedUtc: '',
        contentItemId: ''
      },
      editing: false,
      addSubsribersData: {
        createdUtc: '',
        displayText: '',
        email: '',
        firstName: '',
        lastName: '',
        modifiedUtc: '',
        publishedUtc: '',
        contentItemId: ''
      }
    }
  },
  methods: {
    closeEditSubscriber () {
      this.editing = false
      this.subscriberToEdit = null
    },
    OpenEditSubscriber (subscriber) {
      this.editing = true
      this.subscriberToEdit = subscriber
    },
    async getSubscribers () {
      // GET request using axios with set headers
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // eslint-disable-next-line quote-props
        Authorization: 'Bearer ' + this.oidcAccessToken
      }
      const url =
        urlApiGraphql +
        '?query={subscriber {createdUtc, displayText email firstName lastName modifiedUtc publishedUtc contentItemId }}'
      try {
        const response = await axios.get(url, { headers: headers })
        this.Subscribers = response.data.data.subscriber
        console.log('data', response.data.data.subscriber)
      } catch (err) {
        console.log('error', err.message)
      }
    },
    async updateSubscriber (subscriber) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.oidcAccessToken
      }

      const url = urlApiContent

      const body = {
        ContentItemId: subscriber.contentItemId,
        DisplayText: subscriber.firstName + ' ' + subscriber.lastName,
        TitlePart: {
          Title: subscriber.firstName + ' ' + subscriber.lastName
        },
        Subscriber: {
          FirstName: {
            Text: subscriber.firstName
          },
          LastName: {
            Text: subscriber.lastName
          },
          Email: {
            Text: subscriber.email
          }
        },
        ContainedPart: {
          ListContentItemId: '462m1ps5kkzkp2k5da5pfhh2ww',
          Order: 0
        }
      }
      try {
        await axios.post(url, body, { headers: headers })
      } catch (err) {
        console.log('error', err.message)
      }
      this.closeEditSubscriber()
    },
    async deleteSubscriber (id) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.oidcAccessToken
      }
      const url = urlApiContent + id

      try {
        await axios.delete(url, { headers: headers })
        await this.getSubscribers()
      } catch (err) {
        console.log('error', err.message)
      }
    },
    async addSubscriber (subscriber) {
      console.log('sub', subscriber)
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.oidcAccessToken
      }

      const url = urlApiContent

      const body = {
        ContentType: 'Subscriber',
        Latest: true,
        Published: true,
        Owner: 'sales',
        Author: 'sales',
        DisplayText: subscriber.firstName + ' ' + subscriber.lastName,
        TitlePart: {
          Title: subscriber.firstName + ' ' + subscriber.lastName
        },
        Subscriber: {
          FirstName: {
            Text: subscriber.firstName
          },
          LastName: {
            Text: subscriber.lastName
          },
          Email: {
            Text: subscriber.email
          }
        },
        ContainedPart: {
          ListContentItemId: '462m1ps5kkzkp2k5da5pfhh2ww',
          Order: 0
        }
      }
      try {
        await axios.post(url, body, { headers: headers })
        await this.getSubscribers()
      } catch (err) {
        console.log('error', err.message)
      }
    }
  },
  async mounted () {
    const token = await this.$oidc.getAccessToken()
    this.authUser = await this.$oidc.isLoggedIn()
    if (token) {
      this.oidcAccessToken = token
      this.getSubscribers()
    }
  }
}
</script>
