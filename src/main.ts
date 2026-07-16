import { createApp } from 'vue'
import App from './App.vue'
import { initCloudflareAnalytics } from './analytics'
import './styles/global.scss'

initCloudflareAnalytics()
createApp(App).mount('#app')
