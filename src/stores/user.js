import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '@/constants/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const fetchUser = async () => {
    const token = localStorage.getItem('access_token')

    if (!token) {
      user.value = null
      return
    }

    try {
      const res = await axios.get(API_ENDPOINTS.GET_ACTIVE_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      user.value = res.data
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem('access_token')
      }
      user.value = null
      
    }
  }

  const setUser = (u) => {
    user.value = u
  }

  return { user, fetchUser, setUser }
})
