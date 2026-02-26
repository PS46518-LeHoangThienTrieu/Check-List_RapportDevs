<template>
  <div class="subject-detail">
    <div class="background-system">
      <div class="noise-layer"></div>
      <div class="grid-overlay"></div>
      <div class="glow-orb orb-main"></div>
      <div class="glow-orb orb-secondary"></div>
      <div class="glow-orb orb-accent"></div>
      <div class="star-field">
        <div v-for="n in 25" :key="n" class="star" 
             :style="`--x: ${Math.random()*100}%; --y: ${Math.random()*100}%; --d: ${3+Math.random()*5}s` ">
        </div>
      </div>
    </div>

    <div class="container">
      <div class="top-nav">
        <button @click="$router.back()" class="btn-action-back">
          <span class="btn-icon">←</span> Quay lại lộ trình
        </button>
        <button v-if="isAdmin" @click="deleteWholeSubject" class="btn-action-danger">
          Xóa môn học này
        </button>
      </div>

      <div v-if="subject" class="content-wrapper">
        <header class="detail-header">
          <div class="header-main">
            <div class="icon-wrapper">
              <span class="detail-icon">{{ subject.icon }}</span>
              <button v-if="isAdmin" class="btn-mini-edit overlay" @click="openEditModal('header')">✎</button>
            </div>
            <div class="header-info">
              <span class="detail-badge">Học kỳ {{ subject.term }} | {{ subject.category }}</span>
              <h1>{{ subject.name }}</h1>
              <p class="subject-desc">{{ subject.desc }}</p>
            </div>
          </div>
        </header>

        <div class="detail-grid">
          
          <div class="grid-column">
            <section class="detail-section glass-card">
              <div class="section-header">
                <h2 class="section-title">📚 Tài liệu chi tiết</h2>
                <div class="admin-controls" v-if="isAdmin">
                  <label class="btn-admin-upload">
                    <input type="file" multiple @change="handleFileUpload($event, 'slides')" hidden />
                    📁 Slide
                  </label>
                  <label class="btn-admin-upload">
                    <input type="file" multiple @change="handleFileUpload($event, 'labs')" hidden />
                    🛠️ Lab
                  </label>
                </div>
              </div>

              <div class="resource-split">
                <div class="res-block">
                  <h3 class="res-subtitle">Slides Bài giảng</h3>
                  <div class="res-list">
                    <div v-for="(slide, idx) in subject.details.slides" :key="idx" class="res-item">
                      <span class="res-name">📄 {{ slide }}</span>
                      <div v-if="isAdmin" class="item-actions">
                        <button class="btn-icon-edit" @click="openEditModal('slides', idx)">✎</button>
                        <button class="btn-icon-delete" @click="removeItem('slides', idx)">✕</button>
                      </div>
                    </div>
                  </div>
                  <button v-if="!isAdmin" class="btn-user-download-small" @click="openPreview('Tất cả Slide bài giảng', 'slides')">
                    ⬇️ Tải Slide
                  </button>
                </div>

                <div class="res-block">
                  <h3 class="res-subtitle">Bài tập Lab</h3>
                  <div class="res-list">
                    <div v-for="(lab, idx) in subject.details.labs" :key="idx" class="res-item">
                      <span class="res-name">🛠️ {{ lab }}</span>
                      <div v-if="isAdmin" class="item-actions">
                        <button class="btn-icon-edit" @click="openEditModal('labs', idx)">✎</button>
                        <button class="btn-icon-delete" @click="removeItem('labs', idx)">✕</button>
                      </div>
                    </div>
                  </div>
                  <button v-if="!isAdmin" class="btn-user-download-small" @click="openPreview('Tất cả Bài tập Lab', 'labs')">
                    ⬇️ Tải Lab
                  </button>
                </div>
              </div>
            </section>

            <section class="detail-section glass-card asm-card">
              <div class="section-header">
                <h2 class="section-title">🔥 Assignment</h2>
                <button v-if="isAdmin" class="btn-admin-upload" @click="openEditModal('assignment')">✎ Sửa mô tả</button>
              </div>
              <div class="asm-body">
                <div class="asm-info">
                  <h3>{{ subject.details.assignment.title }}</h3>
                  <p>{{ subject.details.assignment.description }}</p>
                </div>
                <div class="asm-phases">
                  <div v-for="(req, idx) in subject.details.assignment.requirements" :key="idx" class="phase-item">
                    <div class="phase-badge">Phase {{ idx + 1 }}</div>
                    <div class="phase-content">{{ req }}</div>
                    <div v-if="isAdmin" class="item-actions">
                      <button class="btn-icon-edit" @click="openEditModal('requirements', idx)">✎</button>
                      <button class="btn-icon-delete" @click="removeItem('requirements', idx)">✕</button>
                    </div>
                  </div>
                </div>
                <button v-if="!isAdmin" class="btn-user-main-download orange" @click="openPreview('Yêu cầu dự án mẫu', 'assignment')">
                  ⬇️ Tải yêu cầu dự án
                </button>
              </div>
            </section>
          </div>

          <div class="grid-column">
            <section class="detail-section glass-card">
              <div class="section-header">
                <h2 class="section-title">🎯 Kỹ năng đạt được</h2>
                <button v-if="isAdmin" class="btn-admin-round-add" @click="openEditModal('skills')">+</button>
              </div>
              <div class="skill-cloud">
                <div v-for="(skill, idx) in subject.details.skills" :key="idx" class="skill-tag">
                  {{ skill }}
                  <div v-if="isAdmin" class="tag-actions">
                    <button @click="openEditModal('skills', idx)">✎</button>
                    <button @click="removeItem('skills', idx)">×</button>
                  </div>
                </div>
              </div>
            </section>

            <section class="detail-section glass-card advice-card">
              <div class="section-header">
                <h2 class="section-title">💡 Mentor Advice</h2>
                <button v-if="isAdmin" class="btn-admin-round-add" @click="openEditModal('advices')">+</button>
              </div>
              <div class="advice-list">
                <div v-for="(advice, idx) in subject.details.advices" :key="idx" class="advice-box">
                  <div class="quote-icon">“</div>
                  <p>{{ advice }}</p>
                  <div v-if="isAdmin" class="item-actions top-right">
                    <button class="btn-icon-edit" @click="openEditModal('advices', idx)">✎</button>
                    <button class="btn-icon-delete" @click="removeItem('advices', idx)">✕</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showPreview || showModal" class="modal-overlay" @click.self="closeAllModals">
        
        <div v-if="showPreview" class="modal-card glass-card preview-wide">
          <div class="modal-header">
            <h3>📋 Xác nhận tải xuống</h3>
            <button class="close-modal" @click="closeAllModals">✕</button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <div class="file-icon-large">{{ previewFile.type === 'slides' ? '📂' : '🛠️' }}</div>
              <h2 class="file-name-display">{{ previewFile.name }}</h2>
              <div class="info-tag status">Tổng số tệp: {{ previewFile.list?.length || 0 }}</div>
            </div>

            <div class="preview-list-container">
              <p class="preview-label">Danh sách tài liệu bên trong:</p>
              <div class="preview-items-scroll">
                <div v-for="(item, idx) in previewFile.list" :key="idx" class="preview-item">
                  <span class="item-index">{{ idx + 1 }}.</span>
                  <span class="item-name">{{ item }}</span>
                </div>
                <div v-if="!previewFile.list?.length" class="empty-list-msg">Chưa có tài liệu nào được cập nhật.</div>
              </div>
            </div>

            <div class="modal-footer-actions mt-4">
              <button class="btn-user-main-download orange" @click="confirmDownload">
                Bắt đầu tải về máy
              </button>
            </div>
          </div>
        </div>

        <div v-if="showModal" class="modal-card glass-card">
          <div class="modal-header">
            <h3>{{ modalTitle }}</h3>
            <button class="close-modal" @click="closeAllModals">✕</button>
          </div>
          <div class="modal-body">
             <textarea v-model="tempData.content" class="modal-input" rows="5" placeholder="Nhập nội dung mới..."></textarea>
             <button class="btn-user-main-download orange" @click="saveChanges">Lưu thay đổi</button>
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { allSkills } from '../data/curriculum';

const route = useRoute();
const router = useRouter();
const subject = ref(null);
const isAdmin = ref(false);

const showModal = ref(false);
const showPreview = ref(false);
const modalTitle = ref('');
const editType = ref('');
const editIndex = ref(null);
const tempData = ref({});
const previewFile = ref({ name: '', type: '', list: [] });

onMounted(() => {
  const session = JSON.parse(localStorage.getItem('user_session') || 'null');
  isAdmin.value = session?.role === 'admin';
  const id = parseInt(route.params.id);
  subject.value = allSkills.find(s => s.id === id);
  window.scrollTo(0, 0);
});

// LOGIC XỬ LÝ MODAL PREVIEW
const openPreview = (name, type) => { 
  let listData = [];
  if (type === 'slides') listData = subject.value.details.slides;
  else if (type === 'labs') listData = subject.value.details.labs;
  else if (type === 'assignment') listData = subject.value.details.assignment.requirements;

  previewFile.value = { 
    name: name, 
    type: type, 
    list: listData 
  }; 
  showPreview.value = true; 
};

const closeAllModals = () => { showModal.value = false; showPreview.value = false; };
const confirmDownload = () => { alert(`Đang tải dữ liệu: ${previewFile.value.name}`); closeAllModals(); };

// LOGIC QUẢN TRỊ ADMIN
const openEditModal = (type, index = null) => {
  editType.value = type;
  editIndex.value = index;
  modalTitle.value = index !== null ? `Sửa ${type}` : `Thêm ${type}`;
  tempData.value = { content: index !== null ? (type === 'requirements' ? subject.value.details.assignment.requirements[index] : subject.value.details[type][index]) : '' };
  showModal.value = true;
};

const saveChanges = () => {
  if (editType.value === 'requirements') {
    subject.value.details.assignment.requirements[editIndex.value] = tempData.value.content;
  } else if (editIndex.value !== null) {
    subject.value.details[editType.value][editIndex.value] = tempData.value.content;
  } else {
    subject.value.details[editType.value].push(tempData.value.content);
  }
  closeAllModals();
};

const handleFileUpload = (event, type) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    if (type === 'requirements') subject.value.details.assignment.requirements.push(files[i].name);
    else subject.value.details[type].push(files[i].name);
  }
};

const removeItem = (type, index) => {
  if (confirm('Xác nhận xóa mục này khỏi danh sách?')) {
    if (type === 'requirements') subject.value.details.assignment.requirements.splice(index, 1);
    else subject.value.details[type].splice(index, 1);
  }
};

const deleteWholeSubject = () => { if (confirm('CẢNH BÁO: Xóa vĩnh viễn toàn bộ môn học?')) router.push('/skills'); };
</script>

<style scoped>
/* --- 1. BIẾN & NỀN CAM RỰC RỠ --- */
.subject-detail {
  background: #080400;
  min-height: 100vh;
  color: #fff;
  padding: 60px 0;
  position: relative;
  overflow-x: hidden;
}

.background-system { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.noise-layer { position: absolute; inset: 0; background-image: url("https://grainy-gradients.vercel.app/noise.svg"); opacity: 0.15; z-index: 1; }
.grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 102, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 102, 0, 0.05) 1px, transparent 1px); background-size: 50px 50px; }

.glow-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.6; animation: floatOrb 15s infinite alternate ease-in-out; }
.orb-main { width: 800px; height: 800px; background: radial-gradient(circle, rgba(255, 102, 0, 0.15) 0%, transparent 70%); top: -200px; right: -100px; }
.orb-secondary { width: 600px; height: 600px; background: radial-gradient(circle, rgba(255, 80, 0, 0.1) 0%, transparent 70%); bottom: -100px; left: -100px; animation-delay: -5s; }

@keyframes floatOrb { from { transform: translate(0, 0); } to { transform: translate(120px, 60px); } }

.star { position: absolute; width: 2px; height: 2px; background: #ff6600; border-radius: 50%; top: var(--y); left: var(--x); animation: starFlash var(--d) infinite; }
@keyframes starFlash { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }

/* --- 2. BỐ CỤC 50/50 & GLASS CARD --- */
.container { max-width: 1400px; margin: 0 auto; padding: 0 30px; position: relative; z-index: 10; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.grid-column { display: flex; flex-direction: column; gap: 40px; }

.glass-card {
  background: rgba(15, 10, 5, 0.65);
  backdrop-filter: blur(25px) saturate(160%);
  border: 1px solid rgba(255, 102, 0, 0.2);
  border-radius: 32px;
  padding: 35px;
}

/* --- 3. TÀI LIỆU CHIA ĐÔI & NÚT TẢI RIÊNG --- */
.resource-split { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 20px; }
.res-subtitle { font-size: 1.1rem; color: #ffae70; margin-bottom: 15px; border-left: 3px solid #ff6600; padding-left: 10px; font-weight: 800; }

.btn-user-download-small {
  background: rgba(255, 102, 0, 0.08);
  border: 1px solid rgba(255, 102, 0, 0.3);
  color: #ff6600;
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  font-weight: 700;
  margin-top: 15px;
  transition: 0.3s;
}
.btn-user-download-small:hover { background: #ff6600; color: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 102, 0, 0.4); }

/* --- 4. PREVIEW MODAL STYLES --- */
.preview-wide { max-width: 650px !important; }
.preview-list-container { background: rgba(0, 0, 0, 0.3); border-radius: 20px; padding: 25px; border: 1px solid rgba(255, 102, 0, 0.15); }
.preview-label { color: #ffae70; font-weight: 800; margin-bottom: 15px; font-size: 0.95rem; }
.preview-items-scroll { max-height: 250px; overflow-y: auto; padding-right: 12px; }
.preview-items-scroll::-webkit-scrollbar { width: 5px; }
.preview-items-scroll::-webkit-scrollbar-thumb { background: rgba(255, 102, 0, 0.3); border-radius: 10px; }
.preview-item { display: flex; gap: 15px; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.item-index { color: #ff6600; font-weight: 800; }
.empty-list-msg { text-align: center; color: #666; font-style: italic; padding: 20px; }

/* --- 5. HỆ THỐNG NÚT BẤM VÀ TEXT --- */
button, .btn-admin-upload {
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s;
}
button:hover { background: rgba(255, 102, 0, 0.1); border-color: #ff6600; }

.btn-user-main-download {
  background: linear-gradient(135deg, #ff8533, #ff6600);
  border: none; width: 100%; margin-top: 20px; box-shadow: 0 10px 20px rgba(255, 102, 0, 0.3);
}
.btn-user-main-download:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(255, 102, 0, 0.5); }

.btn-action-danger { color: #ef4444; border-color: rgba(239, 68, 68, 0.3); }
.btn-action-danger:hover { background: #ef4444; color: #fff; }

.phase-badge { background: #ff6600; color: #fff; padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; margin-bottom: 10px; width: fit-content; }
h1 { font-size: 3.8rem; font-weight: 950; background: linear-gradient(to right, #fff, #ffae70); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(15px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-input { width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 18px; border-radius: 15px; margin-bottom: 20px; font-family: inherit; }
.text-center { text-align: center; }
.mb-4 { margin-bottom: 2rem; }
.mt-4 { margin-top: 2rem; }

@media (max-width: 1100px) { .detail-grid { grid-template-columns: 1fr; } }
</style>