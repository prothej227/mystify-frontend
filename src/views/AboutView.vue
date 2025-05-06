<template>
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-header text-bg-dark font-monospace">// about //</div>
            <div class="card-body">
              <h2 class="card-title text-center">
                <FontAwesomeIcon :icon="['fas', 'fa-link-slash']" />
                Mystify v1
              </h2>
              <p class="card-text font-monospace text-center">A URL shortener / anonymizer built using FastAPI</p>
              <hr>
                <h5 class="card-title">Authors</h5>
                <ul>
                  <li>prothej227</li>
                </ul>
              <hr>
              <h5 class="card-title">Tech Stack</h5>
                <ul>
                  <li>FastAPI</li>
                  <li>VueJS + Bootstrap</li>
                  <li>SQLite3</li>
                </ul>
              <hr>
              <h5 class="card-title">UserInfo</h5>
                <ul v-if="!!userStore.user?.current_active_username">
                  <li>
                    <span class="badge bg-dark me-1">Username</span>
                    <span class="badge bg-primary"> {{ userStore.user.current_active_username }}</span>
                  </li>
                  <li>
                    <span class="badge bg-dark me-1">User ID</span>
                    <span class="badge bg-success"> {{ userStore.user.current_active_uuid }}</span>
                  </li>
                </ul>
            </div>
            </div>
          </div>
      </div>
    </div>

</template>
<script>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

export default {
  name: "AboutView",
  setup() {
    const userStore = ref(useUserStore())
    return {
      userStore
    }
  }
}
</script>
