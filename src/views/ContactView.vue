<template>
  <div class="contact-dark">
    <div class="glow-effect effect-1"></div>
    <div class="glow-effect effect-2"></div>

    <div class="container">
      <header class="contact-header text-center">
        <span class="sub-title">Liên hệ hỗ trợ</span>
        <h1>Kết nối với <span class="text-orange">Rapport Devs</span></h1>
        <p>Gặp khó khăn kỹ thuật hoặc cần tư vấn lộ trình? Chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>
      </header>

      <div class="contact-wrapper">
        <div class="admin-card">
          <div class="avatar-box">
            <img src="https://i.pravatar.cc/150?u=admin1" alt="Nguyễn Admin" />
            <div class="status-dot" title="Admin đang Online"></div>
          </div>
          <div class="staff-info">
            <span class="role-badge">Hệ thống</span>
            <h3>Rapport</h3>
            <p class="staff-bio">Chịu trách nhiệm vận hành CheckList IT và phê duyệt bài viết cộng đồng.</p>
          </div>
        </div>

        <div class="info-column">
          <h3 class="column-title">Thông tin liên hệ chung</h3>
          
          <div class="contact-list">
            <a href="tel:0912345678" class="contact-item">
              <span class="icon">📞</span>
              <div>
                <span class="label">Hotline hệ thống</span>
                <strong>0912.345.678</strong>
              </div>
            </a>

            <a href="mailto:contact@checklistit.edu.vn" class="contact-item">
              <span class="icon">✉️</span>
              <div>
                <span class="label">Email chính thức</span>
                <strong>contact@checklistit.edu.vn</strong>
              </div>
            </a>

            <a href="https://facebook.com/checklistit" target="_blank" class="contact-item">
              <span class="icon">💙</span>
              <div>
                <span class="label">Fanpage Cộng đồng</span>
                <strong>CheckList IT - Poly K19</strong>
              </div>
            </a>

            <div class="contact-item chat-highlight" @click="alertChat">
              <span class="icon">💬</span>
              <div>
                <span class="label">Hỗ trợ trực tuyến</span>
                <strong>Nhắn tin ngay</strong>
              </div>
            </div>
          </div>

          <div class="note-box">
            <p>⚠️ <strong>Lưu ý:</strong> Đội ngũ hỗ trợ sẽ phản hồi trong vòng tối đa 24h kể từ khi nhận được yêu cầu.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const alertChat = () => {
  alert('Tính năng Chat Realtime đang được phát triển!');
};
</script>

<style scoped>
/* --- BASE & LAYOUT --- */
.contact-dark {
  background-color: #050505;
  min-height: 100vh;
  padding-bottom: 100px;
  position: relative;
  overflow: hidden;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1000px; /* Thu hẹp lại để cân đối với 1 card duy nhất */
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.text-orange { color: #ff6600; }
.text-center { text-align: center; }

/* --- HEADER --- */
.contact-header { padding: 80px 0 50px; }
.sub-title {
  color: #ff6600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 2px;
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
}
h1 { font-size: 3rem; font-weight: 800; margin-bottom: 15px; }
.contact-header p { color: #a1a1aa; font-size: 1.1rem; }

/* --- WRAPPER 2 CỘT --- */
.contact-wrapper {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  align-items: start;
}

/* --- ADMIN CARD (Cột trái) --- */
.admin-card {
  background: #111;
  border: 1px solid #27272a;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  position: sticky;
  top: 100px;
}

.avatar-box {
  position: relative;
  width: 120px; height: 120px;
  margin: 0 auto 20px;
}

.avatar-box img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ff6600;
}

.status-dot {
  position: absolute;
  bottom: 8px; right: 8px;
  width: 20px; height: 20px;
  background: #22c55e;
  border: 4px solid #111;
  border-radius: 50%;
}

.role-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(255, 102, 0, 0.15);
  color: #ff6600;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.staff-info h3 { font-size: 1.5rem; margin-bottom: 10px; color: white; }
.staff-bio { font-size: 0.95rem; color: #888; line-height: 1.6; }

/* --- INFO COLUMN (Cột phải) --- */
.column-title { font-size: 1.2rem; margin-bottom: 25px; color: #ccc; }

.contact-list { display: flex; flex-direction: column; gap: 15px; }

.contact-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #0a0a0a;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #222;
  text-decoration: none;
  color: white;
  transition: 0.3s ease;
}

.contact-item:hover {
  border-color: #ff6600;
  background: #111;
  transform: translateX(8px);
}

.chat-highlight { cursor: pointer; border-left: 4px solid #ff6600; }

.contact-item .icon { font-size: 1.8rem; }
.contact-item .label { display: block; font-size: 0.8rem; color: #666; text-transform: uppercase; margin-bottom: 2px; }
.contact-item strong { font-size: 1.1rem; }

.note-box {
  margin-top: 30px;
  font-size: 0.85rem;
  color: #888;
  background: rgba(255, 102, 0, 0.03);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 102, 0, 0.1);
}

/* Background Effect */
.glow-effect {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.08;
  pointer-events: none;
}
.effect-1 { background: #ff6600; top: -100px; left: -100px; }
.effect-2 { background: #ffffff; bottom: -100px; right: -100px; opacity: 0.03; }

/* Mobile Responsive */
@media (max-width: 850px) {
  .contact-wrapper { grid-template-columns: 1fr; }
  .admin-card { position: relative; top: 0; }
  h1 { font-size: 2.2rem; }
}
</style>