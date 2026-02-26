<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col brand">
          <h2 class="footer-logo">CHECK-LIST <span class="orange">IT</span></h2>
          <p class="brand-desc">
            Hệ thống quản lý lộ trình học tập và kỹ năng dành riêng cho sinh viên ngành CNTT - FPT Polytechnic.
          </p>
          <div class="newsletter">
            <input type="email" placeholder="Email nhận tin mới..." />
            <button class="btn-sub">Gửi</button>
          </div>
        </div>

        <div class="footer-col links">
          <h4>KHÁM PHÁ</h4>
          <ul>
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/skills">Lộ trình học</router-link></li>
            <li><router-link to="/blog">Cộng đồng Blog</router-link></li>
            <li><router-link to="/about">Về chúng tôi</router-link></li>
          </ul>
        </div>

        <div class="footer-col contact">
          <h4>LIÊN HỆ</h4>
          <p><span class="icon">📍</span> Phòng 201, Tòa nhà Innovation, TP. Hồ Chí Minh</p>
          <p><span class="icon">📧</span> support@checklist-it.edu.vn</p>
          <p><span class="icon">📞</span> 0912.345.678</p>
        </div>

        <div class="footer-col social">
          <h4>CỘNG ĐỒNG</h4>
          <p>Theo dõi chúng tôi để cập nhật tài liệu mới nhất.</p>
          <div class="social-box">
            <a href="#" class="social-link fb">Facebook</a>
            <a href="#" class="social-link ins">Instagram</a>
            <a href="#" class="social-link thr">Threads</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 <strong>Dự án Nhóm 4</strong>. Made with ❤️ for FPT Students.</p>
        <div class="bottom-links">
          <span>Điều khoản</span>
          <span>Bảo mật</span>
        </div>
      </div>
      </div>
  </footer>
</template>


<style scoped>
.footer {
  background: #050505;
  border-top: 1px solid #1a1a1a;
  padding: 80px 0 30px;
  margin-top: 100px;
  color: #888;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr 1fr;
  gap: 50px;
  margin-bottom: 60px;
}

/* Brand Style */
.footer-logo {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 20px;
}

.brand-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.newsletter {
  display: flex;
  background: #111;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #222;
}

.newsletter input {
  background: transparent;
  border: none;
  padding: 10px;
  color: white;
  flex: 1;
  outline: none;
}

.btn-sub {
  background: var(--primary-orange);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

/* Col Styling */
.footer-col h4 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 25px;
  position: relative;
}

.footer-col h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 30px;
  height: 2px;
  background: var(--primary-orange);
}

.footer-col ul { list-style: none; padding: 0; }
.footer-col ul li { margin-bottom: 12px; }

.footer-col a {
  color: #888;
  text-decoration: none;
  transition: 0.3s;
}

.footer-col a:hover { color: var(--primary-orange); padding-left: 5px; }

/* Social Links */
.social-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.social-link {
  font-size: 0.8rem;
  padding: 5px 12px;
  border: 1px solid #333;
  border-radius: 20px;
}

/* Bottom Footer */
.footer-bottom {
  border-top: 1px solid #1a1a1a;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .footer-grid { grid-template-columns: 1fr; gap: 40px; }
  .footer-bottom { flex-direction: column; gap: 15px; text-align: center; }
}
</style>

<script setup> 


</script>