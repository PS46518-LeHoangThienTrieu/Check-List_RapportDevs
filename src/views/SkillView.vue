<template>
  <div class="skills-dark">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>

    <div class="container">
      <header class="skills-header text-center">
        <div class="header-badge">FPT Polytechnic Roadmap</div>
        <h1>Lộ trình <span class="text-orange-gradient">Chinh Phục</span></h1>
        <p class="header-desc">Hệ thống hóa kỹ năng, tối ưu hóa con đường trở thành lập trình viên thực thụ.</p>
        
        <div v-if="isAdmin" class="admin-top-actions">
          <button class="btn-admin-add" @click="openModal()">
            <span class="plus-icon">+</span> Thêm môn học mới
          </button>
        </div>
      </header>

      <div class="filter-sticky">
        <div class="glass-filter">
          <div class="search-main">
            <div class="search-group">
              <span class="search-icon">🔍</span>
              <input type="text" v-model="search" @input="currentPage = 1" placeholder="Tìm kiếm môn học..." />
              <button v-if="search" @click="search = ''; currentPage = 1" class="clear-btn">✕</button>
            </div>
          </div>

          <div class="filter-options">
            <div class="custom-select-group">
              <label>Kỳ học</label>
              <select v-model="selectedTerm" @change="currentPage = 1">
                <option value="">Tất cả</option>
                <option value="1">Học kỳ 1</option>
                <option value="2">Học kỳ 2</option>
              </select>
            </div>
            <div class="custom-select-group">
              <label>Lĩnh vực</label>
              <select v-model="selectedCategory" @change="currentPage = 1">
                <option value="">Tất cả</option>
                <option value="Programming">Lập trình</option>
                <option value="Design">Thiết kế</option>
                <option value="Foundation">Cơ bản</option>
              </select>
            </div>
            <div class="custom-select-group">
              <label>Sắp xếp</label>
              <select v-model="sortBy" @change="currentPage = 1">
                <option value="default">Mặc định</option>
                <option value="rating">Đánh giá cao</option>
                <option value="views">Lượt xem</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="skills-grid">
        <div v-for="skill in paginatedSkills" :key="skill.id" class="skill-card-modern">
          <div v-if="isAdmin" class="admin-card-actions">
            <button class="admin-btn edit" @click.stop="openModal(skill)" title="Chỉnh sửa">✎</button>
            <button class="admin-btn delete" @click.stop="deleteSkill(skill.id)" title="Xóa môn học">✕</button>
          </div>

          <div class="card-inner">
            <div class="card-header">
              <div class="badge-group">
                <span class="badge term" :class="'t' + skill.term">HK {{ skill.term }}</span>
                <span class="badge category">{{ skill.category }}</span>
              </div>
              <div class="card-icon">{{ skill.icon }}</div>
            </div>

            <div class="card-content">
              <h3>{{ skill.name }}</h3>
              <p>{{ skill.desc }}</p>

              <div class="progress-section">
                <div class="progress-labels">
                  <span>Tiến độ học tập</span>
                  <span class="percentage">{{ skill.progress }}%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-bar-fill" :style="{ width: skill.progress + '%' }">
                    <div v-if="skill.progress > 0" class="bar-glow"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer-modern">
              <div class="stats">
                <div class="stat"><span class="icon">👁️</span> {{ formatNumber(skill.views) }}</div>
                <div class="stat"><span class="icon star">⭐</span> {{ skill.rating }}</div>
              </div>
              <button class="learn-btn" @click="$router.push(`/skills/${skill.id}`)">
                Bắt đầu học <span class="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="pagination-wrapper">
        <button class="page-btn nav" :disabled="currentPage === 1" @click="currentPage--">
          ← Trước
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="page-btn num" 
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>

        <button class="page-btn nav" :disabled="currentPage === totalPages" @click="currentPage++">
          Sau →
        </button>
      </div>

      <Transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
          <div class="modal-content glass-effect">
            <div class="modal-header">
               <h3>{{ isEditMode ? 'Cập nhật thông tin' : 'Môn học mới' }}</h3>
               <p>{{ isEditMode ? 'Chỉnh sửa các thông số khóa học' : 'Thiết lập lộ trình mới cho sinh viên' }}</p>
            </div>
            <form @submit.prevent="saveSkill">
              <div class="form-grid">
                <div class="form-group full-width">
                  <label>Tên môn học</label>
                  <input v-model="currentSkill.name" required />
                </div>
                <div class="form-group">
                  <label>Emoji Icon</label>
                  <input v-model="currentSkill.icon" required />
                </div>
                <div class="form-group">
                  <label>Học kỳ</label>
                  <select v-model.number="currentSkill.term">
                    <option value="1">Kỳ 1</option>
                    <option value="2">Kỳ 2</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Lĩnh vực</label>
                  <select v-model="currentSkill.category">
                    <option value="Programming">Lập trình</option>
                    <option value="Design">Thiết kế</option>
                    <option value="Foundation">Cơ bản</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tiến độ (%)</label>
                  <input type="number" v-model.number="currentSkill.progress" min="0" max="100" />
                </div>
              </div>
              <div class="form-group">
                <label>Mô tả ngắn</label>
                <textarea v-model="currentSkill.desc" rows="3"></textarea>
              </div>
              <div class="modal-btns">
                <button type="button" class="btn-cancel" @click="showModal = false">Hủy</button>
                <button type="submit" class="btn-save">Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const isAdmin = ref(false);
const showModal = ref(false);
const isEditMode = ref(false);
const currentPage = ref(1);
const itemsPerPage = 6; // Phân trang 6 bài/trang

const initialSkill = { name: '', term: 1, category: 'Programming', desc: '', icon: '📚', views: 0, rating: 5.0, progress: 0 };
const currentSkill = ref({ ...initialSkill });

onMounted(() => {
  const session = localStorage.getItem('user_session');
  if (session) {
    isAdmin.value = JSON.parse(session).role === 'admin';
  }
});

// Tất cả môn học được đưa về 0% tiến độ
const skills = ref([
  { id: 1, name: 'Nhập môn Lập trình (C)', term: 1, category: 'Programming', desc: 'Nền tảng tư duy logic thông qua ngôn ngữ C truyền thống.', icon: '💻', views: 12500, rating: 4.8, progress: 0 },
  { id: 2, name: 'Xây dựng trang Web', term: 1, category: 'Design', desc: 'Làm chủ HTML5, CSS3 và các kỹ thuật layout hiện đại.', icon: '🌐', views: 9800, rating: 4.7, progress: 0 },
  { id: 3, name: 'Tin học cơ sở', term: 1, category: 'Foundation', desc: 'Cấu trúc máy tính, mạng và hệ điều hành căn bản.', icon: '🖥️', views: 4500, rating: 4.0, progress: 0 },
  { id: 4, name: 'Lập trình Java 1', term: 2, category: 'Programming', desc: 'Tiếp cận lập trình hướng đối tượng (OOP) mạnh mẽ.', icon: '☕', views: 15200, rating: 4.9, progress: 0 },
  { id: 5, name: 'Thiết kế UI/UX cơ bản', term: 2, category: 'Design', desc: 'Tư duy thiết kế trải nghiệm và giao diện người dùng.', icon: '🎨', views: 8000, rating: 4.5, progress: 0 },
  { id: 6, name: 'Cơ sở dữ liệu (SQL)', term: 2, category: 'Foundation', desc: 'Quản trị và truy vấn dữ liệu với SQL Server.', icon: '💾', views: 11000, rating: 4.6, progress: 0 },
  { id: 7, name: 'Cấu trúc dữ liệu & Giải thuật', term: 2, category: 'Programming', desc: 'Tối ưu hóa mã nguồn và giải quyết bài toán phức tạp.', icon: '🧠', views: 7200, rating: 4.9, progress: 0 },
  { id: 8, name: 'Dự án mẫu (Frontend)', term: 2, category: 'Design', desc: 'Thực hành xây dựng ứng dụng Web thực tế từ đầu.', icon: '🛠️', views: 5400, rating: 4.8, progress: 0 }
]);

const search = ref('');
const selectedTerm = ref('');
const selectedCategory = ref('');
const sortBy = ref('default');

const filteredSkills = computed(() => {
  let result = skills.value.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.value.toLowerCase());
    const matchTerm = selectedTerm.value ? s.term.toString() === selectedTerm.value : true;
    const matchCat = selectedCategory.value ? s.category === selectedCategory.value : true;
    return matchSearch && matchTerm && matchCat;
  });
  if (sortBy.value === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sortBy.value === 'views') result.sort((a, b) => b.views - a.views);
  return result;
});

// LOGIC PHÂN TRANG
const totalPages = computed(() => Math.ceil(filteredSkills.value.length / itemsPerPage));
const paginatedSkills = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSkills.value.slice(start, end);
});

const openModal = (skill = null) => {
  if (skill) {
    isEditMode.value = true;
    currentSkill.value = { ...skill };
  } else {
    isEditMode.value = false;
    currentSkill.value = { ...initialSkill, id: Date.now() };
  }
  showModal.value = true;
};

const saveSkill = () => {
  if (isEditMode.value) {
    const index = skills.value.findIndex(s => s.id === currentSkill.value.id);
    if (index !== -1) skills.value[index] = { ...currentSkill.value };
  } else {
    skills.value.push({ ...currentSkill.value });
  }
  showModal.value = false;
};

const deleteSkill = (id) => {
  if (confirm('Xác nhận xóa môn học này khỏi lộ trình?')) {
    skills.value = skills.value.filter(s => s.id !== id);
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value || 1;
  }
};

const formatNumber = (num) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
</script>

<style scoped>
/* Toàn bộ Style giữ nguyên sự đồng bộ Glassmorphism của bạn */
.skills-dark { background-color: #050505; min-height: 100vh; padding-bottom: 120px; position: relative; overflow: hidden; color: #fff; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 10; }

.glow-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; opacity: 0.1; }
.orb-1 { width: 600px; height: 600px; background: #ff6600; top: -150px; left: -150px; }
.orb-2 { width: 500px; height: 500px; background: #3b82f6; bottom: -100px; right: -100px; }
.orb-3 { width: 300px; height: 300px; background: #fff; top: 40%; left: 50%; opacity: 0.05; }

.skills-header { padding: 60px 0 40px; }
h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 15px; }
.text-orange-gradient { background: linear-gradient(to right, #ff6600, #ffae00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.header-badge { display: inline-block; background: rgba(255,102,0,0.1); color: #ff6600; padding: 5px 15px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(255,102,0,0.2); margin-bottom: 15px; }
.header-desc { color: #888; font-size: 1.1rem; }

.btn-admin-add { margin-top: 30px; background: rgba(255, 102, 0, 0.05); color: #ff6600; border: 1px dashed #ff6600; padding: 12px 25px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s; }
.btn-admin-add:hover { background: #ff6600; color: #fff; box-shadow: 0 0 20px rgba(255, 102, 0, 0.3); }

.filter-sticky { position: sticky; top: 20px; z-index: 100; margin-bottom: 50px; }
.glass-filter { background: rgba(20, 20, 20, 0.7); backdrop-filter: blur(15px); border: 1px solid #333; border-radius: 20px; padding: 15px 25px; display: flex; gap: 20px; align-items: center; }

.search-main { flex: 1; }
.search-group { display: flex; align-items: center; background: #000; border: 1px solid #222; border-radius: 12px; padding: 0 15px; }
.search-group input { flex: 1; background: transparent; border: none; color: #fff; padding: 12px; outline: none; }

.filter-options { display: flex; gap: 15px; }
.custom-select-group label { font-size: 0.6rem; color: #555; text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 4px; }
.custom-select-group select { background: #111; border: 1px solid #222; color: #aaa; padding: 8px; border-radius: 8px; outline: none; }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 30px; min-height: 500px; }
.skill-card-modern { position: relative; }
.card-inner { background: rgba(20, 20, 20, 0.6); border: 1px solid #222; border-radius: 24px; padding: 25px; height: 100%; display: flex; flex-direction: column; transition: 0.3s; }
.skill-card-modern:hover .card-inner { border-color: #ff6600; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

.admin-card-actions { position: absolute; top: -10px; right: -10px; display: flex; gap: 8px; z-index: 50; }
.admin-btn { width: 32px; height: 32px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; font-size: 0.8rem; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.admin-btn.edit { background: #3b82f6; }
.admin-btn.delete { background: #ef4444; }

.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; margin-right: 5px; }
.badge.term.t1 { background: rgba(255, 102, 0, 0.1); color: #ff6600; }
.badge.category { background: rgba(255, 255, 255, 0.05); color: #888; }
.card-icon { font-size: 2rem; background: #111; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; border-radius: 15px; border: 1px solid #222; }

.card-content h3 { font-size: 1.3rem; margin-bottom: 10px; font-weight: 700; }
.card-content p { color: #666; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px; }

.progress-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: #555; margin-bottom: 6px; }
.progress-track { height: 6px; background: #111; border-radius: 10px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: #ff6600; position: relative; }
.bar-glow { position: absolute; top: 0; right: 0; height: 100%; width: 10px; background: #fff; filter: blur(4px); opacity: 0.5; }

.card-footer-modern { margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid #222; }
.stats { display: flex; gap: 12px; color: #555; font-size: 0.8rem; font-weight: 600; }
.learn-btn { background: transparent; border: 1px solid #333; color: #888; padding: 8px 16px; border-radius: 10px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: 0.3s; }
.learn-btn:hover { background: #ff6600; color: #fff; border-color: #ff6600; }

/* Pagination Styles */
.pagination-wrapper { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 60px; }
.page-numbers { display: flex; gap: 10px; }
.page-btn { background: rgba(255,255,255,0.05); border: 1px solid #222; color: #888; padding: 10px 18px; border-radius: 12px; cursor: pointer; font-weight: 700; transition: 0.3s; }
.page-btn:hover:not(:disabled) { border-color: #ff6600; color: #ff6600; }
.page-btn.active { background: #ff6600; color: #fff; border-color: #ff6600; box-shadow: 0 5px 15px rgba(255,102,0,0.3); }
.page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.page-btn.nav { background: transparent; border: none; }

/* Modal Styles */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-content { background: #111; border: 1px solid #333; border-radius: 24px; width: 100%; max-width: 550px; padding: 35px; }
.modal-header h3 { font-size: 1.5rem; color: #ff6600; margin-bottom: 5px; }
.modal-header p { color: #555; font-size: 0.85rem; margin-bottom: 30px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.full-width { grid-column: span 2; }
.form-group label { font-size: 0.65rem; color: #ff6600; text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 6px; }
.form-group input, .form-group select, .form-group textarea { background: #000; border: 1px solid #222; color: #fff; padding: 12px; border-radius: 10px; width: 100%; outline: none; }
.modal-btns { display: flex; gap: 15px; margin-top: 30px; }
.btn-save { flex: 2; background: #ff6600; color: #fff; border: none; padding: 15px; border-radius: 12px; font-weight: 800; cursor: pointer; }
.btn-cancel { flex: 1; background: #222; color: #666; border: none; padding: 15px; border-radius: 12px; cursor: pointer; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>