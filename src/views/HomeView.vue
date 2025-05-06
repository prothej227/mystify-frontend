<template>
    <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card shadow-lg">
              <div class="card-header text-bg-dark font-monospace">// home - anonymmize your url //</div>
              <div class="card-body">
                <form @submit.prevent="shortenUrl">
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text fw-light">
                        <FontAwesomeIcon :icon="['fas', 'link']" class="me-2"/>
                        URL
                      </div>
                    </div>
                    <input
                      type="url"
                      class="form-control"
                      id="urlInput"
                      v-model="url"
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text fw-light">
                        <FontAwesomeIcon :icon="['fas', 'hammer']" class="me-2"/>
                        Method
                      </div>
                    </div>
                    <select id="selectStrategy" class="form-select" v-model="strategy">
                      <option value="hash">Hash</option>
                      <option value="random">Random</option>
                      <option value="keyword">Keyword</option>
                      <option value="custom">Custom Alias</option>
                    </select>
                  </div>
                  <transition name="fade">
                  <div class="input-group mb-2" v-if="strategy === 'custom'">
                    <div class="input-group-prepend">
                      <div class="input-group-text fw-light">
                        <FontAwesomeIcon :icon="['fas', 'hashtag']" class="me-2"/>
                        Custom Alias
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="aliasInput"
                      v-model="customAlias"
                      placeholder="Input your url alias"
                      required
                    />
                  </div>
                  </transition>
                  <div class="d-grid">
                    <button type="submit" class="btn btn-outline-dark">
                      <FontAwesomeIcon :icon="['fas', 'fa-link-slash']" />
                      Mystify
                    </button>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text fw-light">
                        <FontAwesomeIcon :icon="['fas', 'link-slash']" class="me-2"/>
                        New URL
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newUrl"
                      readonly
                    />
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
import {ref} from 'vue';
import { BASE_PATH, API_ENDPOINTS } from '@/constants/api';
export default {
  name: 'HomeView',
  components: {

  },
  setup () {
    const url = ref('')
    const strategy = ref('hash')
    const customAlias = ref('')
    const newUrl = ref('')
    const bearerToken = localStorage.getItem('access_token')
    const shortenUrl = async () => {
      try {
        const payload = {
          strategy: strategy.value,
          original_url: url.value,
          custom_code: customAlias.value
        }
        const headers = {
              "Authorization": `Bearer ${bearerToken}`,
              "Content-Type": 'application/json'
        }
        const response = await axios.post(
          API_ENDPOINTS.SHORTEN_URL, 
          payload, 
          {
            headers: headers
          }
        )
        newUrl.value = `${BASE_PATH}/${response.data.short_code}`;

      } catch (error) {
        console.log("Error: ", error)
      }

    }
    return {
      url,
      strategy,
      customAlias,
      shortenUrl,
      newUrl
    }
  }
}

</script>
<style>

</style>
