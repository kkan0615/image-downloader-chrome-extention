import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import App from './App.vue'
/* Quasar */
import { Quasar, Dialog, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
/* Tailwind */
import '@/styles/libs/tailwind.css'
/* Custom Styles */
import '@/styles/index.scss'

const app = createApp(App)
app
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog,
    }
  })
  .use(createPinia())
  .use(router)
  .mount('#app')
