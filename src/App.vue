<template>
  <div class="app-layout">
    <header class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="container nav-container">
        <router-link to="/" class="logo">
          CheckList<span class="orange-dot">.</span>IT
        </router-link>

        <nav class="nav-links">
          <router-link to="/">Trang chủ</router-link>
          
          <template v-if="user">
            <router-link to="/skills">Lộ trình</router-link>
            <router-link to="/blog">Blog</router-link>
          </template>

          <router-link to="/about">Giới thiệu</router-link>
          <router-link to="/contact">Liên hệ</router-link>
        </nav>

        <div class="user-action">
         <div v-if="user" class="profile-badge" @click="$router.push('/profile')" style="cursor: pointer;">
  <img :src="user.avatar || 'https://i.pravatar.cc/150?img=11'" class="avatar-circle" />
  <span class="username">{{ user.username }}</span>
  </div>
          
          <router-link v-else to="/login" class="btn-login-orange">
            Đăng nhập
          </router-link>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer-dark">
      <div class="container footer-content">
        <div class="footer-left">
          <strong>CHECK-LIST IT</strong>
          <p>&copy; 2026 Dự án Nhóm 4. FPT Polytechnic.</p>
        </div>
        <div class="footer-right">
          <a href="#">Facebook</a>
          <a href="#">Threads</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);

// Hàm cập nhật trạng thái user từ localStorage
const checkUserSession = () => {
  const session = localStorage.getItem('user_session');
  user.value = session ? JSON.parse(session) : null;
};

// Xử lý hiệu ứng Scroll Navbar
const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  checkUserSession();
  window.addEventListener('scroll', handleScroll);
  // Lắng nghe thay đổi từ tab khác hoặc từ chính trang login
  window.addEventListener('storage', checkUserSession);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('storage', checkUserSession);
});

const logout = () => {
  localStorage.removeItem('user_session');
  user.value = null;
  router.push('/login');
};
</script>

<style>
:root {
  /* Bảng màu được tinh chỉnh lại cho sang trọng hơn */
  --primary-orange: #ff6600;
  --primary-glow: rgba(255, 102, 0, 0.3);
  --primary-hover: #ff8533;
  --bg-body: #0a0a0a; /* Đen sâu hơn */
  --bg-surface: #161617;
  --text-main: #f5f5f7;
  --text-muted: #86868b;
  --border-color: rgba(255, 255, 255, 0.1);
  --navbar-height: 70px;
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

* { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

body {
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  background-color: var(--bg-body);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Scrollbar tinh tế cho Dark Mode */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-body); }
::-webkit-scrollbar-thumb { 
  background: #333; 
  border-radius: 10px; 
}
::-webkit-scrollbar-thumb:hover { background: #444; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* NAVBAR UPGRADE: Hiệu ứng kính mờ (Glassmorphism) */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  z-index: 1000;
  background: transparent;
  transition: var(--transition);
  display: flex;
  align-items: center;
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* LOGO: Hiệu ứng Gradient */
.logo {
  font-weight: 800;
  font-size: 1.6rem;
  color: var(--text-main);
  text-decoration: none;
  letter-spacing: -0.8px;
  display: flex;
  align-items: center;
}

.orange-dot { 
  color: var(--primary-orange);
  text-shadow: 0 0 10px var(--primary-glow);
}

/* NAV LINKS: Hover tinh tế */
.nav-links { display: flex; gap: 32px; }
.nav-links a {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  transition: var(--transition);
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-orange);
  transition: var(--transition);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--text-main);
}

/* PROFILE BADGE: Sang trọng hơn */
.profile-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 14px 6px 6px;
  border-radius: 40px;
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.profile-badge:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 102, 0, 0.5);
}

.avatar-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--bg-surface);
}

.username {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* BUTTONS */
.btn-login-orange {
  background: var(--primary-orange);
  color: white;
  padding: 10px 26px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition);
  box-shadow: 0 4px 15px var(--primary-glow);
}

.btn-login-orange:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--primary-glow);
}

.btn-icon-logout {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
  transition: var(--transition);
}

.btn-icon-logout:hover {
  background: #ff4d4d;
  color: white;
  transform: rotate(15deg);
}

/* MAIN CONTENT & FOOTER */
.main-content {
  padding-top: calc(var(--navbar-height) + 40px);
  min-height: calc(100vh - 150px);
}

.footer-dark {
  background: var(--bg-body);
  border-top: 1px solid var(--border-color);
  padding: 60px 0;
  margin-top: 100px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
}

/* TRANSITIONS */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>