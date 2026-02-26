<template>
  <div class="post-detail-dark">
    <div class="glow-orb orb-1"></div>

    <div v-if="isAdmin && post" class="admin-top-bar">
      <div class="container bar-flex">
        <span class="status-info">
          Trạng thái: 
          <span :class="['badge', post.approved ? 'approved' : 'pending']">
            {{ post.approved ? 'Đã duyệt' : 'Chờ duyệt' }}
          </span>
        </span>
        <div class="admin-btns">
          <button v-if="!post.approved" class="btn-admin-success" @click="approvePost">Duyệt bài</button>
          <button class="btn-admin-edit" @click="openEditModal">✎ Sửa nội dung</button>
          <button class="btn-admin-danger" @click="deletePost">✕ Xóa bài viết</button>
        </div>
      </div>
    </div>

    <div class="container">
      <button @click="$router.push('/blog')" class="back-btn">← Quay lại Blog</button>

      <div v-if="post" class="content-wrapper">
        <div class="detail-grid">
          <div class="main-column">
            <article class="glass-card post-article">
              <div class="article-header">
                <div class="badge-group">
                  <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
                </div>
                <h1>{{ post.title }}</h1>
                <div class="author-info">
                  <img :src="post.avatar" alt="Avatar" class="author-avatar" />
                  <div class="author-text">
                    <span class="name">{{ post.author }}</span>
                    <span class="date">Đăng lúc {{ post.date }} • 5 phút đọc</span>
                  </div>
                </div>
              </div>

              <div class="article-body">
                <p class="lead">{{ post.excerpt }}</p>
                <div class="content-rich-text">
                   <div class="full-content" v-html="post.content || 'Nội dung đang được cập nhật...'"></div>
                </div>
              </div>

              <div class="article-footer">
                <div class="reactions">
                  <button class="react-btn">❤️ {{ post.likes }} Thích</button>
                  <button class="react-btn">💬 {{ post.comments }} Bình luận</button>
                </div>
                <div class="share-options">
                  <span>Chia sẻ:</span>
                  <button class="share-icon">FB</button>
                  <button class="share-icon">TG</button>
                </div>
              </div>
            </article>

            <section class="glass-card comment-section">
              <h2>Bình luận ({{ post.comments }})</h2>
              <div class="comment-input">
                <textarea placeholder="Viết bình luận của bạn..."></textarea>
                <button class="btn-submit-comment">Gửi bình luận</button>
              </div>
              <div class="comment-list">
                <div class="comment-item">
                  <img src="https://i.pravatar.cc/150?u=u5" class="avatar-tiny" />
                  <div class="comment-body">
                    <strong>Hùng Nguyễn</strong>
                    <p>Bài viết rất hữu ích cho tân sinh viên như mình, cảm ơn Admin!</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="side-column">
            <div class="glass-card side-widget">
              <h3>Về tác giả</h3>
              <div class="author-card">
                <img :src="post.avatar" alt="Avatar" class="avatar-large" />
                <h4>{{ post.author }}</h4>
                <p>Thành viên tích cực tại Group 4 - CheckList IT. Chuyên gia gỡ rối Bug cho sinh viên Poly.</p>
              </div>
            </div>

            <div class="glass-card side-widget">
              <h3>Chủ đề tương quan</h3>
              <div class="related-tags">
                <span class="tag">#LậpTrình</span>
                <span class="tag">#FPTPoly</span>
                <span class="tag">#Assignment</span>
                <span class="tag">#HọcTập</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
        <div class="modal-card glass-effect">
          <div class="modal-header">
            <h3>Chỉnh sửa bài viết</h3>
            <button @click="showEditModal = false" class="close-btn">✕</button>
          </div>
          <div class="modal-body">
            <label class="modal-label">Tiêu đề bài viết</label>
            <input v-model="tempPost.title" class="modal-input" />
            
            <label class="modal-label">Nội dung chi tiết</label>
            <textarea v-model="tempPost.content" class="modal-input" rows="8"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showEditModal = false">Hủy</button>
            <button class="btn-confirm" @click="savePostChanges">Lưu thay đổi</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const isAdmin = ref(false);
const showEditModal = ref(false);
const tempPost = ref({ title: '', content: '' });

onMounted(() => {
  // 1. Kiểm tra quyền admin từ session
  const session = JSON.parse(localStorage.getItem('user_session') || 'null');
  isAdmin.value = session?.role === 'admin';

  const id = parseInt(route.params.id);
  
  // 2. Lấy dữ liệu từ localStorage để đảm bảo thấy bài mới tạo
  const savedPosts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  post.value = savedPosts.find(p => p.id === id);

  if (!post.value) {
    alert('Không tìm thấy dữ liệu bài viết!');
    router.push('/blog');
  }
  window.scrollTo(0, 0);
});

// --- ADMIN FUNCTIONS ---
const openEditModal = () => {
  tempPost.value = { 
    title: post.value.title, 
    content: post.value.content || post.value.excerpt 
  };
  showEditModal.value = true;
};

const savePostChanges = () => {
  const savedPosts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  const idx = savedPosts.findIndex(p => p.id === post.value.id);
  
  if (idx !== -1) {
    savedPosts[idx].title = tempPost.value.title;
    savedPosts[idx].content = tempPost.value.content;
    savedPosts[idx].excerpt = tempPost.value.content.substring(0, 100);
    
    // Cập nhật giao diện và bộ nhớ
    post.value = { ...savedPosts[idx] };
    localStorage.setItem('blog_posts', JSON.stringify(savedPosts));
    showEditModal.value = false;
    alert('Đã cập nhật bài viết!');
  }
};

const approvePost = () => {
  const savedPosts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
  const idx = savedPosts.findIndex(p => p.id === post.value.id);
  if (idx !== -1) {
    savedPosts[idx].approved = true;
    post.value.approved = true;
    localStorage.setItem('blog_posts', JSON.stringify(savedPosts));
    alert('Bài viết đã được duyệt công khai!');
  }
};

const deletePost = () => {
  if (confirm('Xác nhận xóa bài viết này vĩnh viễn?')) {
    const savedPosts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
    const newPosts = savedPosts.filter(p => p.id !== post.value.id);
    localStorage.setItem('blog_posts', JSON.stringify(newPosts));
    alert('Đã xóa bài viết!');
    router.push('/blog');
  }
};
</script>

<style scoped>
/* --- STYLE CHO ADMIN BAR --- */
.admin-top-bar {
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.bar-flex { display: flex; justify-content: space-between; align-items: center; }
.status-info { font-weight: 700; color: #888; }
.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; margin-left: 8px; }
.badge.approved { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.badge.pending { background: rgba(234, 179, 8, 0.2); color: #eab308; }

.admin-btns { display: flex; gap: 10px; }
.admin-btns button { padding: 8px 16px; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
.btn-admin-success { background: #22c55e; color: white; }
.btn-admin-edit { background: #3b82f6; color: white; }
.btn-admin-danger { background: #ef4444; color: white; }

/* MODAL GLASSMOPHISM */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
  z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-card { background: #111; border: 1px solid #333; width: 100%; max-width: 600px; border-radius: 24px; overflow: hidden; }
.modal-header { padding: 20px 25px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
.modal-body { padding: 25px; }
.modal-label { display: block; font-size: 0.75rem; color: #ff6600; text-transform: uppercase; font-weight: 800; margin-bottom: 8px; }
.modal-input { width: 100%; background: #000; border: 1px solid #333; color: white; padding: 12px; border-radius: 12px; margin-bottom: 20px; outline: none; font-family: inherit; }
.modal-footer { padding: 15px 25px; background: #161616; display: flex; justify-content: flex-end; gap: 10px; }
.btn-confirm { background: #ff6600; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.btn-cancel { background: #333; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }

/* ... Các style khác giữ nguyên ... */
.post-detail-dark { background-color: #030303; min-height: 100vh; color: #f8fafc; padding: 40px 0; position: relative; overflow-x: hidden; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 10; }
.back-btn { background: rgba(255,102,0,0.1); border: 1px solid #ff6600; color: #ff6600; padding: 10px 20px; border-radius: 12px; cursor: pointer; margin-bottom: 30px; font-weight: 700; transition: 0.3s; }
.detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
.glass-card { background: rgba(20, 20, 20, 0.6); backdrop-filter: blur(15px); border: 1px solid #222; border-radius: 32px; padding: 40px; margin-bottom: 30px; }
.article-header h1 { font-size: 3rem; font-weight: 900; margin: 20px 0; line-height: 1.2; }
.tag { background: rgba(255,102,0,0.1); color: #ff6600; padding: 4px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; margin-right: 10px; }
.article-body { padding: 40px 0; line-height: 1.8; color: #94a3b8; font-size: 1.1rem; }
.lead { font-size: 1.3rem; color: #cbd5e1; margin-bottom: 30px; font-weight: 500; }
.orb-1 { position: absolute; width: 600px; height: 600px; background: #ff6600; top: -100px; right: -100px; opacity: 0.05; filter: blur(150px); }
</style>