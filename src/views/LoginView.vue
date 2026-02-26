<template>
  <div class="auth-container">
    <div class="glow-orb orb-1"></div>
    <div class="form-box glass-effect">
      <h2>{{ isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ' }}</h2>
      <form @submit.prevent="handleAuth">
        <div class="input-group">
          <label>Tên đăng nhập</label>
          <input v-model="userForm.username" type="text" placeholder="Nhập username..." required />
        </div>
        
        <div v-if="!isLogin" class="input-group">
          <label>Email</label>
          <input v-model="userForm.email" type="email" placeholder="Nhập email..." required />
        </div>

        <div class="input-group">
          <label>Mật khẩu</label>
          <input v-model="userForm.password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn-orange">
          {{ isLogin ? 'Đăng nhập ngay' : 'Tạo tài khoản' }}
        </button>
      </form>

      <p @click="isLogin = !isLogin" class="toggle-text">
        {{ isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(true);
const userForm = ref({ username: '', password: '', email: '' });

const handleAuth = () => {
  // 1. Lấy danh sách tài khoản đã đăng ký từ máy (nếu chưa có thì tạo mảng rỗng)
  const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

  if (isLogin.value) {
    // --- LOGIC ĐĂNG NHẬP ---
    
    // Kiểm tra tài khoản admin cứng trước
    const isAdmin = userForm.value.username === 'adminnhom4' && userForm.value.password === '123456';
    
    // Tìm tài khoản trong danh sách đã đăng ký
    const existingUser = registeredUsers.find(
      u => u.username === userForm.value.username && u.password === userForm.value.password
    );

    if (isAdmin || existingUser) {
      const userData = { 
        username: userForm.value.username, 
        role: isAdmin ? 'admin' : 'user',
        loginAt: new Date().toISOString()
      };

      localStorage.setItem('user_session', JSON.stringify(userData));
      alert('Đăng nhập thành công!');
      window.location.href = '/'; 
    } else {
      // Nếu không khớp bất kỳ tài khoản nào
      alert('Tài khoản hoặc mật khẩu không chính xác!');
    }

  } else {
    // --- LOGIC ĐĂNG KÝ ---
    
    // Kiểm tra xem username đã bị trùng chưa
    const isExisted = registeredUsers.some(u => u.username === userForm.value.username);
    
    if (isExisted) {
      alert('Tên đăng nhập này đã có người sử dụng!');
      return;
    }

    // Lưu người dùng mới vào danh sách
    registeredUsers.push({
      username: userForm.value.username,
      password: userForm.value.password,
      email: userForm.value.email
    });

    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    
    alert('Đăng ký thành công! Hãy đăng nhập bằng tài khoản vừa tạo.');
    isLogin.value = true; // Chuyển về màn hình đăng nhập
    userForm.value.password = ''; // Xóa mật khẩu cho an toàn
  }
};
</script>

<style scoped>
/* CSS giữ nguyên phong cách Glassmorphism của bạn */
.auth-container { 
  display: flex; justify-content: center; align-items: center; 
  min-height: 90vh; position: relative; overflow: hidden; background: #030303;
}
.glass-effect {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 102, 0, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.form-box { padding: 40px; border-radius: 24px; width: 100%; max-width: 400px; z-index: 10; }
h2 { color: #fff; text-align: center; margin-bottom: 30px; font-weight: 800; letter-spacing: 1px; }
.input-group { margin-bottom: 20px; }
.input-group label { display: block; color: #888; font-size: 0.8rem; margin-bottom: 8px; text-transform: uppercase; font-weight: 700; }
input { 
  width: 100%; padding: 12px 16px; background: #0a0a0a; border: 1px solid #222; 
  color: white; border-radius: 12px; outline: none; transition: 0.3s;
}
input:focus { border-color: #ff6600; background: #111; }
.btn-orange { 
  width: 100%; padding: 14px; background: #ff6600; color: white; border: none; 
  border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; margin-top: 10px;
}
.btn-orange:hover { background: #e65c00; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255, 102, 0, 0.2); }
.toggle-text { color: #666; text-align: center; margin-top: 20px; cursor: pointer; font-size: 0.9rem; transition: 0.3s; }
.toggle-text:hover { color: #ff6600; }
.orb-1 { position: absolute; width: 500px; height: 500px; background: #ff6600; filter: blur(120px); opacity: 0.1; top: -10%; right: -10%; }
</style>