<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-header text-bg-dark font-monospace">Mystify | Registration</div>
                    <div class="card-body font-monospace">
                        <form @submit.prevent="submit">
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
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                            <div class="input-group-text input-lbl-fixed">
                                <FontAwesomeIcon :icon="['fas', 'envelope']"/>
                                <span class="ms-1">email</span>
                            </div>
                            </div>
                            <input
                            type="email"
                            v-model="email"
                            class="form-control"
                            id="email"
                            required
                            />
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-sm btn-outline-dark"><FontAwesomeIcon :icon="['fas', 'right-to-bracket']" class="me-1"/>Submit</button>
                        </div>
                        </form>
                    </div>
                    <div v-if="error" class="card-footer font-monospace d-flex justify-content-start">
                        <small class="text-danger">Error: {{ error }}</small>
                    </div>
                    <div v-else class="card-footer">
                        <small class="text-secondary">Already have an account?
                            <RouterLink to="/login" class="text-dark">Login here</RouterLink>
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
import { API_ENDPOINTS } from '@/constants/api'
export default {
    name: "RegisterView",
    setup () {
        // reactive state
        const username = ref('')
        const password = ref('')
        const email = ref('')
        const error = ref(null)

        const router = useRouter()

        // login function
        const submit = async () => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.REGISTER, 
                {
                    "username": username.value,
                    "password": password.value,
                    "email": email.value,
                    "is_admin": false
                }
            )
            router.push('/login')
        } catch (err) {
            error.value = "An error occurred"
            console.log(err)
        }
        }
        return {
            username,
            password,
            error,
            submit,
            email
        }
    }
}



</script>

<style>

</style>