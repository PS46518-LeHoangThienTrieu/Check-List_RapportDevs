import { createApp } from 'vue'
import './style.css'
import './assets/base.css' 
import App from './App.vue'
import router from './router' // Import cấu hình từ thư mục router

const app = createApp(App)
app.use(router) // Kích hoạt sử dụng Router
app.mount('#app')