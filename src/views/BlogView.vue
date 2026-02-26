<template>
  <div class="blog-dark">
    <div class="glow-blur blur-1"></div>

    <div class="container">
      <header class="blog-header text-center">
        <span class="sub-title">Cộng đồng CheckList IT</span>
        <h1>Chia sẻ & <span class="text-orange">Kết nối</span></h1>
        <p>Nơi trao đổi kiến thức, mẹo học tập và tài liệu từ các "tiền bối" FPT Poly.</p>
      </header>

      <div class="blog-toolbar">
        <div class="search-box-modern">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon-search-inner">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Tìm bài viết hoặc hashtag..." @input="currentPage = 1" />
          <button v-if="searchQuery" @click="clearSearch" class="btn-clear-inner">✕</button>
        </div>
        
        <div class="toolbar-actions">
          <button @click="openModal()" class="btn-primary-orange">
            <span class="plus-icon">+</span> Viết bài mới
          </button>
        </div>
      </div>

      <div class="post-grid">
        <div v-for="post in paginatedPosts" :key="post.id" class="post-card">
          <div v-if="isAdmin" class="admin-actions">
            <button v-if="!post.approved" class="btn-action-small approve" @click="approvePost(post.id)" title="Duyệt bài">✓</button>
            <button class="btn-action-small edit" @click="openModal(post)" title="Sửa bài">✎</button>
            <button class="btn-action-small delete" @click="deletePost(post.id)" title="Xóa bài">✕</button>
          </div>

          <div v-if="!post.approved" class="status-badge-pending">Chờ duyệt</div>

          <div class="card-content">
            <div class="author-meta">
              <img :src="post.avatar" alt="Avatar" class="avatar-tiny-modern" />
              <div class="meta-info">
                <span class="author-name">{{ post.author }}</span>
                <span class="post-date">{{ post.date }}</span>
              </div>
            </div>

            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}...</p>

            <div class="post-tags-modern">
              <span 
                v-for="tag in post.tags" 
                :key="tag" 
                class="tag-modern" 
                @click="filterByTag(tag)"
                :class="{ active: searchQuery.toLowerCase() === tag.toLowerCase() }"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <div class="card-footer-modern">
            <div class="stats-modern">
              <span>❤️ {{ post.likes }}</span>
              <span>💬 {{ post.comments }}</span>
            </div>
            <button class="btn-read-more-orange" @click="$router.push('/blog/' + post.id)">
              Đọc tiếp <span class="arrow-modern">→</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="pagination-modern">
        <button :disabled="currentPage === 1" @click="currentPage--" class="btn-page-orange">←</button>
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="btn-page-orange" :class="{ active: currentPage === page }">
          {{ page }}
        </button>
        <button :disabled="currentPage === totalPages" @click="currentPage++" class="btn-page-orange">→</button>
      </div>

      <div v-if="paginatedPosts.length === 0" class="empty-state-modern text-center">
        <p>Không tìm thấy bài viết nào phù hợp.</p>
        <button @click="clearSearch" class="btn-read-more-orange">Quay lại danh sách</button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box-modern glass-effect">
          <div class="modal-header-modern">
            <h3>{{ isEditing ? 'Chỉnh sửa bài viết' : 'Sáng tạo nội dung' }}</h3>
            <button @click="closeModal" class="btn-close-round">✕</button>
          </div>
          <div class="modal-body-modern">
            <div class="form-input-group">
              <label>Tiêu đề bài viết</label>
              <input v-model="currentPost.title" type="text" placeholder="Ghi tiêu đề tại đây..." />
            </div>
            <div class="form-input-group">
              <label>Nội dung chia sẻ</label>
              <textarea v-model="currentPost.content" rows="6" placeholder="Chia sẻ kiến thức của bạn..."></textarea>
            </div>
            <div class="form-input-group">
              <label>Hashtags</label>
              <input v-model="currentPost.tagsString" type="text" placeholder="Java, Web, Tips..." />
            </div>
          </div>
          <div class="modal-footer-modern">
            <button @click="closeModal" class="btn-modal-cancel">Hủy bỏ</button>
            <button @click="submitPost" class="btn-modal-submit">
              {{ isEditing ? 'Lưu cập nhật' : 'Đăng bài ngay' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const isAdmin = ref(false);
const showModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 6;

const defaultPosts = [
  { id: 1, author: 'Admin Nhom 4', avatar: 'https://i.pravatar.cc/150?u=admin', date: '09:45 04/02/2026', title: 'Tổng hợp tài liệu Java 1 (MOB1014)', excerpt: 'Chia sẻ bộ slide và bài tập Lab 1-8 môn Java 1 dành cho sinh viên...', content: 'Nội dung chi tiết tài liệu...', tags: ['Java', 'TaiLieu'], likes: 45, comments: 12, approved: true },
  { id: 2, author: 'Tân Binh Coder', avatar: 'https://i.pravatar.cc/150?u=user1', date: '08:20 04/02/2026', title: 'Lỗi "NullPointerException" cứu em với!', excerpt: 'Em đang code bài Assignment 1 thì bị lỗi này khi chạy hàm Login...', content: 'Nội dung chi tiết lỗi...', tags: ['Help', 'Bug'], likes: 2, comments: 5, approved: true }
];

const posts = ref([]);
const currentPost = ref({ title: '', content: '', tagsString: '' });

// HÀM TẠO THỜI GIAN ĐÚNG CHUẨN
const getCurrentFormattedDate = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${time} ${date}`;
};

onMounted(() => {
  const session = JSON.parse(localStorage.getItem('user_session') || 'null');
  isAdmin.value = session?.role === 'admin';

  const savedPosts = localStorage.getItem('blog_posts');
  posts.value = savedPosts ? JSON.parse(savedPosts) : defaultPosts;
});

watch(posts, (newVal) => {
  localStorage.setItem('blog_posts', JSON.stringify(newVal));
}, { deep: true });

const openModal = (post = null) => {
  if (post) {
    isEditing.value = true;
    editingId.value = post.id;
    currentPost.value = { title: post.title, content: post.content || post.excerpt, tagsString: post.tags.join(', ') };
  } else {
    isEditing.value = false;
    currentPost.value = { title: '', content: '', tagsString: '' };
  }
  showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const submitPost = () => {
  if (!currentPost.value.title || !currentPost.value.content) return alert("Vui lòng nhập đủ thông tin!");
  const tagList = currentPost.value.tagsString.split(',').map(t => t.trim()).filter(t => t);

  if (isEditing.value) {
    const idx = posts.value.findIndex(p => p.id === editingId.value);
    posts.value[idx] = { ...posts.value[idx], title: currentPost.value.title, excerpt: currentPost.value.content.substring(0, 100), content: currentPost.value.content, tags: tagList };
  } else {
    posts.value.unshift({
      id: Date.now(),
      author: isAdmin.value ? 'Admin' : 'Người dùng',
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      date: getCurrentFormattedDate(), // THỜI GIAN ĐĂNG BÀI ĐÚNG CHUẨN
      title: currentPost.value.title,
      excerpt: currentPost.value.content.substring(0, 100),
      content: currentPost.value.content,
      tags: tagList,
      likes: 0, comments: 0, 
      approved: isAdmin.value 
    });
  }
  closeModal();
};

const approvePost = (id) => {
  const post = posts.value.find(p => p.id === id);
  if (post) post.approved = true; 
};

const deletePost = (id) => {
  if (confirm('Xóa bài viết vĩnh viễn?')) {
    posts.value = posts.value.filter(p => p.id !== id);
  }
};

const filteredPosts = computed(() => {
  let result = isAdmin.value ? posts.value : posts.value.filter(p => p.approved);
  const query = searchQuery.value.toLowerCase().trim();
  if (query) result = result.filter(p => p.title.toLowerCase().includes(query) || p.tags.some(tag => tag.toLowerCase() === query));
  return result;
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return filteredPosts.value.slice(start, start + postsPerPage);
});
const filterByTag = (tag) => { searchQuery.value = tag; currentPage.value = 1; };
const clearSearch = () => { searchQuery.value = ''; currentPage.value = 1; };
</script>

<style scoped>
/* --- THIẾT KẾ TOOLBAR VÀ Ô TÌM KIẾM MỚI THEO ẢNH MẪU --- */
.blog-toolbar {
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 12px 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 40px;
  position: sticky;
  top: 90px;
  z-index: 100;
}

.search-box-modern {
  flex: 1;
  display: flex;
  align-items: center;
  background: #000;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 0 14px;
}
.icon-search-inner { width: 18px; color: #555; }
.search-box-modern input { flex: 1; background: transparent; border: none; color: white; padding: 10px; font-size: 0.9rem; outline: none; }
.btn-clear-inner { background: none; border: none; color: #ff6600; cursor: pointer; font-weight: bold; }

/* --- CSS NÚT BẤM ĐỒNG BỘ MÀU CAM --- */
.btn-primary-orange {
  background: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}
.btn-primary-orange:hover { background: #e65c00; transform: translateY(-2px); }

.btn-read-more-orange {
  background: rgba(255, 102, 0, 0.1);
  color: #ff6600;
  border: 1px solid rgba(255, 102, 0, 0.3);
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}
.btn-read-more-orange:hover { background: #ff6600; color: white; transform: translateX(5px); }

.btn-page-orange {
  background: #0a0a0a;
  border: 1px solid #222;
  color: #555;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}
.btn-page-orange.active { background: #ff6600; color: white; border-color: #ff6600; }

/* --- POST CARD & ADMIN --- */
.post-card { 
  background: rgba(15, 15, 15, 0.9);
  border: 1px solid #1a1a1a;
  border-radius: 24px;
  padding: 30px;
  position: relative;
  transition: 0.3s;
}
.post-card:hover { border-color: #ff660044; }

.admin-actions { position: absolute; top: 15px; right: 15px; display: flex; gap: 6px; }
.btn-action-small { width: 32px; height: 32px; border-radius: 8px; border: none; cursor: pointer; color: white; }
.btn-action-small.approve { background: #22c55e; }
.btn-action-small.edit { background: #3b82f6; }
.btn-action-small.delete { background: #ef4444; }

.avatar-tiny-modern { width: 40px; height: 40px; border-radius: 10px; object-fit: cover; }
.post-date { color: #555; font-size: 0.8rem; font-weight: 600; }

/* --- MODAL --- */
.btn-modal-submit { background: #ff6600; color: white; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 800; cursor: pointer; }
.btn-modal-cancel { background: transparent; color: #555; border: 1px solid #222; padding: 12px 25px; border-radius: 12px; cursor: pointer; }

/* --- REUSED LAYOUT --- */
.blog-dark { background-color: #030303; min-height: 100vh; padding-bottom: 80px; color: #f8fafc; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 10; }
.text-orange { background: linear-gradient(135deg, #ff6600, #ffae00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 32px; }
.status-badge-pending { background: rgba(255, 166, 0, 0.1); color: #ffae00; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 900; margin-bottom: 15px; display: inline-block; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(15px); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box-modern { background: #0c0c0c; border: 1px solid #222; border-radius: 32px; padding: 40px; width: 100%; max-width: 600px; }
.form-input-group { margin-bottom: 20px; }
.form-input-group label { display: block; color: #555; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 8px; }
.form-input-group input, .form-input-group textarea { width: 100%; background: #000; border: 1px solid #222; border-radius: 12px; padding: 12px; color: white; outline: none; }
.form-input-group input:focus { border-color: #ff6600; }
</style>