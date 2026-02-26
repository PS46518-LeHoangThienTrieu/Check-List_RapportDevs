<template>
  <div class="profile-container lock-screen">
    <div class="glow-orb"></div>
    <div class="container">
      <div class="profile-card glass-effect">
        <div class="profile-header">
          <div class="avatar-wrapper" :class="{ 'is-editing': isEditing }">
            <img 
              :src="isEditing ? (editForm.avatar || 'https://i.pravatar.cc/150?img=11') : (user?.avatar || 'https://i.pravatar.cc/150?img=11')" 
              class="avatar-img"
            />
            
            <div v-if="isEditing" class="avatar-controls-overlay">
              <label class="icon-btn-upload" title="Tải ảnh từ máy">
                <input type="file" accept="image/*" @change="handleFileUpload" hidden />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </label>
              <div class="link-input-wrapper">
                <input v-model="editForm.avatar" placeholder="Dán link ảnh..." class="avatar-url-input" />
              </div>
            </div>
            <div v-else class="online-indicator"></div>
          </div>
          
          <div class="header-content">
            <h2 v-if="!isEditing">{{ user?.displayName || user?.username }}</h2>
            <div v-else class="edit-title-group">
               <input v-model="editForm.displayName" class="edit-input-title" placeholder="Nhập tên hiển thị..." />
               <small>Chỉnh sửa tên hiển thị công khai</small>
            </div>
            <span class="role-tag">{{ user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên' }}</span>
          </div>
        </div>

        <div class="profile-body">
          <div class="info-group">
            <label class="group-label">Thông tin tài khoản</label>
            
            <div class="info-item readonly-item">
              <span class="label">Tên người dùng (ID):</span>
              <span class="value constant-value">@{{ user?.username }}</span>
              <div class="lock-icon" title="Không thể thay đổi tên đăng nhập">🔒</div>
            </div>

            <div class="info-item">
              <span class="label">Địa chỉ Email:</span>
              <span v-if="!isEditing" class="value">{{ user?.email || 'Chưa cập nhật' }}</span>
              <input v-else v-model="editForm.email" type="email" class="edit-field" />
            </div>

            <div class="info-item">
              <span class="label">Ngày gia nhập:</span>
              <span v-if="!isEditing" class="value">{{ formatDate(user?.loginAt) }}</span>
              <input v-else v-model="editForm.loginAt" type="date" class="edit-field date-picker" />
            </div>
          </div>

          <div class="action-footer">
            <template v-if="!isEditing">
              <button @click="startEditing" class="btn-primary-edit">
                <span>Chỉnh sửa hồ sơ</span>
              </button>
              <button @click="handleLogout" class="btn-outline-logout">Đăng xuất</button>
            </template>
            
            <template v-else>
              <button @click="saveProfile" class="btn-save-now">Lưu thay đổi</button>
              <button @click="cancelEditing" class="btn-cancel-now">Hủy bỏ</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);
const isEditing = ref(false);

const editForm = ref({ displayName: '', email: '', avatar: '', loginAt: '' });

onMounted(() => {
  const session = localStorage.getItem('user_session');
  if (session) {
    user.value = JSON.parse(session);
  } else {
    router.push('/login');
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      editForm.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const startEditing = () => {
  editForm.value = {
    displayName: user.value.displayName || user.value.username,
    email: user.value.email || '',
    avatar: user.value.avatar || '',
    loginAt: user.value.loginAt ? new Date(user.value.loginAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  };
  isEditing.value = true;
};

const cancelEditing = () => { isEditing.value = false; };

const saveProfile = () => {
  user.value = { 
    ...user.value, 
    displayName: editForm.value.displayName,
    email: editForm.value.email,
    avatar: editForm.value.avatar,
    loginAt: new Date(editForm.value.loginAt).toISOString() 
  };
  
  localStorage.setItem('user_session', JSON.stringify(user.value));
  isEditing.value = false;
  alert('Cập nhật hồ sơ thành công!');
  window.location.reload(); 
};

const formatDate = (dateStr) => {
  if (!dateStr) return '03/02/2026';
  return new Date(dateStr).toLocaleDateString('vi-VN');
};

const handleLogout = () => {
  localStorage.removeItem('user_session');
  window.location.href = '/login';
};
</script>

<style scoped>
/* CỐ ĐỊNH TRANG */
.lock-screen {
  position: fixed; /* Cố định vị trí tương đối với viewport */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* Triệt tiêu thanh cuộn */
}

.profile-container { 
  background: #050505; 
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; /* Căn giữa card theo chiều ngang */
}

.glow-orb { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,102,0,0.1) 0%, transparent 70%); top: -10%; left: -10%; z-index: 1; }

.profile-card { 
  width: 100%; 
  max-width: 700px; 
  background: rgba(15, 15, 15, 0.8); 
  border: 1px solid #222; 
  backdrop-filter: blur(20px); 
  border-radius: 32px; 
  padding: 40px 50px; 
  position: relative; 
  z-index: 10; 
  box-shadow: 0 40px 100px rgba(0,0,0,0.8); 
}

/* AVATAR STYLES */
.avatar-wrapper { position: relative; width: 140px; height: 140px; flex-shrink: 0; }
.avatar-img { width: 100%; height: 100%; border-radius: 40px; object-fit: cover; border: 3px solid #333; transition: 0.3s; }
.is-editing .avatar-img { border-color: #ff6600; filter: brightness(0.4); }

.avatar-controls-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 10px; z-index: 5; }
.icon-btn-upload { background: #ff6600; color: white; width: 45px; height: 45px; border-radius: 15px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
.icon-btn-upload:hover { transform: scale(1.1); background: #e65c00; }

.avatar-url-input { background: rgba(0,0,0,0.8); border: 1px solid #444; color: white; font-size: 0.7rem; padding: 6px 10px; border-radius: 10px; width: 110%; outline: none; text-align: center; }
.avatar-url-input:focus { border-color: #ff6600; }

/* HEADER CONTENT */
.profile-header { display: flex; align-items: center; gap: 35px; margin-bottom: 35px; }
.header-content h2 { font-size: 2.2rem; font-weight: 800; letter-spacing: -1px; }
.edit-input-title { background: #000; border: 1px solid #444; border-radius: 12px; color: white; font-size: 1.8rem; font-weight: 800; padding: 8px 15px; width: 100%; outline: none; margin-bottom: 5px; }
.edit-input-title:focus { border-color: #ff6600; }
.edit-title-group small { color: #666; display: block; margin-bottom: 10px; font-size: 0.8rem; }
.role-tag { display: inline-block; background: rgba(255,102,0,0.1); color: #ff6600; padding: 6px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(255,102,0,0.2); }

/* INFO GROUP */
.info-group { display: flex; flex-direction: column; gap: 15px; }
.group-label { font-size: 0.75rem; font-weight: 900; color: #444; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; }
.info-item { display: flex; justify-content: space-between; align-items: center; padding: 18px 25px; background: rgba(255,255,255,0.02); border: 1px solid #1a1a1a; border-radius: 18px; transition: 0.3s; position: relative; }

.readonly-item { background: rgba(255,255,255,0.01); border-style: dashed; opacity: 0.8; }
.constant-value { color: #ff6600 !important; font-family: monospace; font-size: 1.1rem; }
.lock-icon { font-size: 0.8rem; margin-left: 10px; opacity: 0.5; }

.info-item .label { color: #888; font-weight: 600; font-size: 0.9rem; }
.info-item .value { font-weight: 700; color: #eee; }

.edit-field { background: #000; border: 1px solid #333; color: white; padding: 8px 15px; border-radius: 10px; width: 50%; outline: none; font-weight: 600; }
.edit-field:focus { border-color: #ff6600; }

/* BUTTONS */
.action-footer { margin-top: 40px; display: flex; gap: 20px; }
.btn-primary-edit { flex: 1; background: #ff6600; color: white; border: none; padding: 15px; border-radius: 18px; font-weight: 800; cursor: pointer; transition: 0.3s; }
.btn-primary-edit:hover { background: #e65c00; transform: translateY(-3px); }

.btn-outline-logout { flex: 0.5; background: transparent; border: 1px solid #333; color: #666; border-radius: 18px; cursor: pointer; transition: 0.3s; }
.btn-outline-logout:hover { border-color: #ef4444; color: #ef4444; background: rgba(239,68,68,0.05); }

.btn-save-now { flex: 1; background: #22c55e; color: white; border: none; padding: 15px; border-radius: 18px; font-weight: 800; cursor: pointer; }
.btn-cancel-now { flex: 0.5; background: #222; color: white; border: none; border-radius: 18px; cursor: pointer; }

@media (max-height: 700px) {
  .profile-card { transform: scale(0.9); } /* Thu nhỏ card nếu màn hình quá ngắn */
}
</style>