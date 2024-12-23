import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const app = createApp(App)
app.use(
  createVuetify({
    theme: {
      defaultTheme: 'light',
    },
  }),
)
app.mount('#app')
