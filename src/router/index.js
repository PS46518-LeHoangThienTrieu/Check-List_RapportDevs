import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SkillView from '../views/SkillView.vue'
import BlogView from '../views/BlogView.vue'
import SubjectDetailView from '../views/SubjectDetailView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue' //

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/contact', name: 'contact', component: ContactView },
    
    // TRANG THÔNG TIN CÁ NHÂN (MỚI BỔ SUNG)
    { 
      path: '/profile', 
      name: 'profile', 
      component: ProfileView, 
      meta: { requiresAuth: true } // Yêu cầu đăng nhập mới được xem Profile
    },
    
    // Các trang bảo vệ - Yêu cầu đăng nhập
    { 
      path: '/skills', 
      name: 'skills', 
      component: SkillView, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/skills/:id', 
      name: 'subject-detail', 
      component: SubjectDetailView, 
      props: true,
      meta: { requiresAuth: true } 
    },
    { 
      path: '/blog', 
      name: 'blog', 
      component: BlogView, 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/blog/:id', 
      name: 'post-detail', 
      component: PostDetailView, 
      props: true,
      meta: { requiresAuth: true } 
    },
  ],
})

// LOGIC BẢO VỆ TUYẾN ĐƯỜNG
router.beforeEach((to, from, next) => {
  const loggedInUser = localStorage.getItem('user_session');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Nếu trang yêu cầu đăng nhập mà chưa có session
    if (!loggedInUser) {
      alert("Bạn cần đăng nhập để xem nội dung này!");
      next({ name: 'login' });
    } else {
      next(); // Cho phép truy cập
    }
  } else {
    next(); // Trang tự do
  }
});

export default router