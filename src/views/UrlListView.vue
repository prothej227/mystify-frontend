<template>
    <div class="container m-4">
      <div class="row justify-content-center">
          <div class="col-md-9">
            <div class="card shadow-lg">
              <div class="card-header text-bg-dark font-monospace">// my-urls //</div>
              <div class="card-body">
                <!-- Loader -->
                <div
                    v-if="isFetching"
                    class="d-flex justify-content-center align-items-center"
                    style="min-height: 200px;"
                    >
                    <RingLoader color="#0d6efd" />
                </div>

                <!-- Data Table -->
                <Transition name="fade">
                <EasyDataTable
                    v-if="!isFetching"
                    alternating
                    :headers="tableHeaders"
                    :items="urls"
                    :rows-per-page="6"
                >
                    <!-- Custom Headers -->
                    <template #header-action>
                        <a>
                            <FontAwesomeIcon :icon="['fas', 'wrench']" />
                            Actions
                        </a>
                    </template>

                    <template #header-original_url>
                        <a>
                            <FontAwesomeIcon :icon="['fas', 'link']" />
                            Original URL
                        </a>
                    </template>

                    <template #header-short_code>
                        <a>
                            <FontAwesomeIcon :icon="['fas', 'hashtag']" />
                            Short Code
                        </a>
                    </template>
                    <template #header-created_at>
                        <a>
                            <FontAwesomeIcon :icon="['fas', 'calendar-days']" />
                            Created On
                        </a>
                    </template>
                    <template #header-accessed_count>
                        <a>
                            <FontAwesomeIcon :icon="['fas', 'computer-mouse']" />
                            Hits/Visits
                        </a>
                    </template>
                    <!-- Custom Body Cell for Actions -->
                    <template #item-action="{ short_code }">
                        <button @click="showModal(short_code)" class="btn btn-primary btn-sm me-1">
                            <FontAwesomeIcon :icon="['fas', 'chart-line']" />
                        </button>
                        <button @click="deleteUrl(short_code)" class="btn btn-danger btn-sm">
                            <FontAwesomeIcon :icon="['far', 'trash-can']" />
                        </button>
                    </template>
                    <template #item-created_at="{ created_at }">
                    {{ formatDate(created_at) }}
                    </template>
                    <template #empty-message>
                        <a>No links mystified yet.</a>
                    </template>
                </EasyDataTable>
                </Transition>
              </div>
              <div class="card-footer" v-if="errorText">
                {{ errorText }}
              </div>
            </div>
            <Modal 
                :title="`View Analytics - ${selectedShortCode}`" 
                :faHeaderIcon="['fas', 'chart-line']" 
                ref="thisModal"
            >
                <template #body v-if="fetchedAnalytics">
                    <div >
                        <EasyDataTable
                            :headers="analyticsTableHeaders"
                            :items="fetchedAnalytics"
                        >
                            <template #empty-message>
                                <a>No analytics for this url yet.</a>
                            </template>
                        </EasyDataTable>
                    </div>
                </template>
            </Modal>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import { API_ENDPOINTS } from '@/constants/api'

export default {
    name: "UrlListView",
    components: {
        RingLoader,
        Modal
    },
    setup() {
    const thisModal = ref(null)
    const isFetching = ref(true)
    const bearerToken = localStorage.getItem('access_token')
    const headers = {
        "Authorization": `Bearer ${bearerToken}`,
        "Content-Type": 'application/json'
    }
    
    const tableHeaders = [
        { text: "Action", value: "action", width: 150 },
        { text: "Original URL", value: "original_url", width: 300 },
        { text: "Short Code", value: "short_code" },
        { text: "Created On", value: "created_at" },
        { text: "Hits / Visits", value: "accessed_count" }
    ]

    const urls = ref([])
    const errorText = ref("")
    const fetchedAnalytics = ref([])
    const selectedShortCode = ref("")

    const analyticsTableHeaders = [
        { text: "Event ID", value: "id" },
        { text: "IP Address", value: "ip_address" },
        { text: "Accessed On", value: "accessed_at" },
        { text: "User Agent", value: "user_agent" },
    ]
    
    const fetchUrls = async () => {
        try {
            const { data } = await axios.get(API_ENDPOINTS.GET_USER_URLS, { headers })
            if (data) urls.value = data
        } catch (err) {
            errorText.value = err.message || "Error fetching URLs."
        }
        isFetching.value = false
    }

    const formatDate = (datetime) => {
        const date = new Date(datetime)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    const showModal = async (shortCode) => {
        selectedShortCode.value = shortCode
        const bearerToken = localStorage.getItem("access_token")
        try {
            const response = await axios.get(
                API_ENDPOINTS.GET_ANALYTICS(shortCode),
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`
                    }
                }
            )
            fetchedAnalytics.value = response.data
        } catch (err) {
            fetchedAnalytics.value = []
        }
        thisModal.value?.show()
    }

    const deleteUrl = async (shortCode) => {
        const bearerToken = localStorage.getItem("access_token")
        try {
            const response = await axios.delete(
                API_ENDPOINTS.DELETE_SHORTCODE(shortCode),
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`
                    }
                }
            )
            if (response.status === 200) {
                fetchUrls()
            }
            console.log(response)
            
        } catch (err) {
            console.log(err)
        }
    }

    onMounted(() => {
        fetchUrls()
    })

    return {
        tableHeaders,
        urls,
        errorText,
        isFetching,
        formatDate,
        thisModal,
        showModal,
        fetchedAnalytics,
        selectedShortCode,
        analyticsTableHeaders,
        deleteUrl
    };
}

}
</script>

<style lang="scss" scoped>

</style>