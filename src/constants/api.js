// src/constants/api.js
const BASE_PATH = process.env.VUE_APP_API_BASE_URL

export const API_ENDPOINTS = {
  LOGIN: `${BASE_PATH}/auth/token`,
  REGISTER: `${BASE_PATH}/auth/create`,
  GET_ACTIVE_USER: `${BASE_PATH}/auth/get_active_user`,
  GET_ANALYTICS: (short_code) => `${BASE_PATH}/${short_code}/info`,
  DELETE_SHORTCODE: (short_code) => `${BASE_PATH}/${short_code}`,
  GET_USER_URLS: `${BASE_PATH}/user/all_urls`,
  SHORTEN_URL: `${BASE_PATH}/shorten`,
}

export { BASE_PATH }