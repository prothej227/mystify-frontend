import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "/src/assets/main.css";
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
    faKey, 
    faRightToBracket, 
    faWrench, 
    faCircleInfo, 
    faRightFromBracket, 
    faToolbox,
    faLinkSlash,
    faCircleUser,
    faLink,
    faHammer,
    faHashtag,
    faCalendarDays,
    faComputerMouse,
    faChartLine,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import {
    faUser,
    faTrashCan,
    faEye
} from '@fortawesome/free-regular-svg-icons'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';


// Add icons to the library
library.add(
    faUser,
    faKey, 
    faRightToBracket,
    faWrench,
    faCircleInfo,
    faRightFromBracket,
    faToolbox,
    faLinkSlash,
    faCircleUser,
    faLink,
    faHammer,
    faTrashCan,
    faEye,
    faHashtag,
    faCalendarDays,
    faComputerMouse,
    faChartLine,
    faEnvelope
)

const app = createApp(App)
const pinia = createPinia()

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(pinia)
app.use(router)
app.mount('#app')
