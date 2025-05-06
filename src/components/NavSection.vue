<template>
<nav v-if="userStore.user && userStore.user.current_active_uuid" class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">
      <FontAwesomeIcon :icon="['fas', 'fa-link-slash']" />
      MystiFy
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" :activeClass="activeBsClass" to="/">
            <FontAwesomeIcon :icon="['fas', 'toolbox']"/>
            Home
          </RouterLink >
        </li>
        <li class="nav-item">
          <RouterLink  class="nav-link" :activeClass="activeBsClass" to="/url-list">
            <FontAwesomeIcon :icon="['fas', 'link']"/>
            My URLs
          </RouterLink >
        </li>
        <li class="nav-item">
          <RouterLink  class="nav-link" :activeClass="activeBsClass" to="/about">
            <FontAwesomeIcon :icon="['fas', 'circle-info']"/>
            About
          </RouterLink >
        </li>
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon :icon="['fas', 'circle-user']" class="fa-lg me-1"/>
            {{ userStore.user.current_active_username }}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li>
              <a class="dropdown-item" @click.prevent="logoutUser">
                <FontAwesomeIcon :icon="['fas', 'fa-right-from-bracket']" />
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'


const activeBsClass = "active bg-primary border border-dark-subtle"
const userStore = useUserStore()
const router = useRouter()

const logoutUser = () => {

  localStorage.removeItem("access_token")
  userStore.setUser(null)
  router.push('/login')
}

onMounted(() => {
  userStore.fetchUser()
})
</script>

<style lang="scss" scoped>

</style>