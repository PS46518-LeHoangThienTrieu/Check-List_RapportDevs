import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SkillView from '../views/SkillView.vue'
import BlogView from '../views/BlogView.vue'
import SubjectDetailView from '../views/SubjectDetailView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/contact', name: 'contact', component: ContactView },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },

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

// Guard
router.beforeEach((to, from, next) => {
  const loggedInUser = localStorage.getItem('user_session')

  if (to.meta.requiresAuth && !loggedInUser) {
    alert('Bạn cần đăng nhập!')
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router