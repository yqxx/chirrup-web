import { createApp } from 'vue'
import App from './App.vue'
import { initCloudflareAnalytics } from './analytics'
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import './styles/global.scss'

initCloudflareAnalytics()
createApp(App).mount('#app')
