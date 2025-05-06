<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-header text-bg-dark font-monospace">Mystify | Login</div>
                    <div class="card-body font-monospace">
                        <form @submit.prevent="login">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                            <div class="input-group-text input-lbl-fixed">
                                <FontAwesomeIcon :icon="['far', 'user']"/>
                                <span class="ms-1">username</span>
                            </div>
                            </div>
                            <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model="username"
                            required
                            />
                        </div>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                            <div class="input-group-text input-lbl-fixed">
                                <FontAwesomeIcon :icon="['fas', 'key']"/>
                                <span class="ms-1">password</span>
                            </div>
                            </div>
                            <input
                            type="password"
                            v-model="password"
                            class="form-control"
                            id="password"
                            required
                            />
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-sm btn-outline-dark"><FontAwesomeIcon :icon="['fas', 'right-to-bracket']" class="me-1"/>Login</button>
                        </div>
                        </form>
                    </div>
                    <div v-if="error" class="card-footer font-monospace d-flex justify-content-start">
                        <small class="text-danger">Error: {{ error }}</small>
                    </div>
                    <div v-else class="card-footer">
                        <small class="text-secondary">No account yet?
                            <RouterLink to="/register" class="text-dark">Register here</RouterLink>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { API_ENDPOINTS } from '@/constants/api'

export default {
    name: "LoginVue",
    setup () {
        // reactive state
        const userStore = useUserStore()
        const username = ref('')
        const password = ref('')
        const error = ref(null)

        const router = useRouter()

        // login function
        const login = async () => {
        try {
            const formData = new URLSearchParams()
            formData.append('username', username.value)
            formData.append('password', password.value)
            const response = await axios.post(API_ENDPOINTS.LOGIN, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
            })
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            await userStore.fetchUser()
            router.push('/')
        } catch (err) {
            error.value = 'Invalid credentials or unathorized user.'
        }
        }
        return {
            username,
            password,
            error,
            login
        }
    }
}



</script>

<style>

</style>