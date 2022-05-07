import { createApp } from 'vue'
import { router } from '@/app/router'
import App from './App.vue'
import vueland from 'vueland'
import 'vueland/dist/vueland-base.css'
import 'vueland/dist/themes/vueland-theme.css'

const app = createApp(App)
app.use(vueland)
app.use(router)

router.isReady().then(() => app.mount('#app'))
