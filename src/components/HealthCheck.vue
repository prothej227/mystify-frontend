<template>
<div class="d-flex justify-content-center align-items-center gap-2 mb-3">
    <FontAwesomeIcon :icon="['fas', 'server']" />
    <a>Server: </a>
    <span v-if="isHealthy" class="text-success">● Good</span>
    <div v-else class="grap-3" >
        <button @click.prevent="toggleShowInfo" class="btn btn-small btn-outline-danger mr-3">● Down</button>
    </div>
</div>
<Transition name="fade">
<div v-if="showInfo" class="card border-danger mb-3">
  <div class="card-header bg-transparent border-danger text-center">The server is down.</div>
  <div class="card-body bg-transparent border-danger text-center">
    <p class="card-text">Please wait 60 seconds for it to boot up, then refresh the page.</p>
  </div>
</div>
</Transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { BASE_PATH } from '@/constants/api'
import axios from 'axios'

const isHealthy = ref(false)
const showInfo = ref(false)

const toggleShowInfo = () => {
    showInfo.value = !showInfo.value
}

const checkServerHealth = async () => {
    try {
        const serverResponse = await axios.get(BASE_PATH)
        isHealthy.value = serverResponse.data.status_code === 200
    } catch (error) {
        isHealthy.value = false
    }
}

onMounted(() => {
    checkServerHealth()
})

</script>

<style lang="scss" scoped>

</style>