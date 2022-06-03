import { createApp } from 'vue'
import { router } from '@/app/router'
import App from './App.vue'
import Vueland from 'vueland'
import { ServicesController } from '@app/controller/services.controller'
import 'vueland/dist/vueland-base.css'
import 'vueland/dist/themes/vueland-theme.css'

const app = createApp(App)

app.use(Vueland)
app.use(ServicesController)
app.use(router)

router.isReady().then(() => app.mount('#app'))
