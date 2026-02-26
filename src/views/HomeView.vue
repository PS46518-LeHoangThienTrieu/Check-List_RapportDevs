<template>
  <div class="home-dark">
    <div class="glow-shape shape-1"></div>
    <div class="glow-shape shape-2"></div>

    <div class="container">
      <header class="hero-split">
        <div class="hero-text">
          <span class="hero-badge">Dành cho Tân sinh viên CNTT</span>
          <h1>Khởi đầu hành trình <span class="text-highlight">Dev</span> đầy bản lĩnh.</h1>
          <p class="hero-desc">
            Đừng để "cú sốc" năm nhất đánh gục bạn. Chúng tôi cung cấp lộ trình chuẩn FPT Poly, tài liệu thực chiến và cộng đồng để bạn tự tin vượt qua mọi môn học.
          </p>
          
          <div class="hero-actions">
            <button class="btn-primary-orange" @click="$router.push('/skills')">
              Khám phá lộ trình <span class="arrow">→</span>
            </button>
          </div>
          
          <div class="hero-stats">
            <div class="stat-item">
              <strong>500+</strong> <span>Sinh viên</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <strong>120+</strong> <span>Bài học</span>
            </div>
          </div>
        </div>

        <div class="hero-illustration">
           <div class="tech-box">
             <div class="code-window">
               <div class="window-header">
                 <span class="dot red"></span>
                 <span class="dot yellow"></span>
                 <span class="dot green"></span>
               </div>
               <div class="window-body">
                 <div class="code-line"><span class="c-purple">const</span> <span class="c-blue">student</span> = <span class="c-orange">new</span> <span class="c-yellow">Freshman</span>();</div>
                 <div class="code-line"><span class="c-blue">student</span>.<span class="c-yellow">learn</span>(<span class="c-string">'Java Core'</span>);</div>
                 <div class="code-line"><span class="c-blue">student</span>.<span class="c-yellow">debug</span>(<span class="c-int">24/7</span>);</div>
                 <div class="code-line"><span class="c-blue">student</span>.<span class="c-yellow">levelUp</span>(); <span class="c-comment">// Success! 🚀</span></div>
               </div>
             </div>

             <div class="floating-tag t1">☕ Java Core</div>
             <div class="floating-tag t2">🌐 Web Design</div>
             <div class="floating-tag t3">💾 SQL Server</div>
           </div>
        </div>
      </header>

      <section class="features-dark">
        <div class="section-header text-center">
          <h2>Vũ khí bí mật của bạn</h2>
          <p>Công cụ đắc lực giúp bạn không bị "lạc trôi" giữa đại dương kiến thức.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card" @click="$router.push('/skills')">
            <div class="icon-box icon-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
            </div>
            <h3>Lộ trình chuẩn</h3>
            <p>Hệ thống hóa các môn học học kỳ 1 & 2. Biết chính xác cần học gì, thi gì.</p>
          </div>
          
          <div class="feature-card" @click="$router.push('/blog')">
            <div class="icon-box icon-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 5.472m0 0a9.09 9.09 0 00-3.279 3.298m.944-5.463A11.955 11.955 0 0112 2.944a11.955 11.955 0 015.516 5.516l.001.042C15.729 10.204 15 11.138 15 12.188a3.15 3.15 0 00.158 1.05m-3.158-9.838A5.973 5.973 0 006 12c0 2.316 1.061 4.478 2.842 5.864m5.684 0A5.973 5.973 0 0112 12c.55 0 1.075.069 1.58.198" /></svg>
            </div>
            <h3>Cộng đồng Blog</h3>
            <p>Học hỏi kinh nghiệm thực chiến, chia sẻ code và xin tài liệu từ khóa trên.</p>
          </div>

          <div class="feature-card" @click="$router.push('/contact')">
            <div class="icon-box icon-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            </div>
            <h3>Hỗ trợ 24/7</h3>
            <p>Kết nối trực tiếp với Mentor và đội ngũ tư vấn viên khi gặp Bug khó.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* --- 1. VARIABLES & CONFIG --- */
.home-dark {
  background-color: #050505; 
  color: #ffffff;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

/* --- 2. HERO SECTION --- */
.hero-split {
  display: flex;
  align-items: center;
  min-height: 85vh;
  gap: 60px;
  padding: 60px 0;
}

.hero-text { flex: 1; }

.hero-badge {
  display: inline-block;
  background: rgba(255, 102, 0, 0.1);
  color: #ff6600;
  padding: 6px 14px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 1px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 102, 0, 0.3);
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 25px;
  color: white;
}

.text-highlight {
  color: #ff6600;
  position: relative;
  display: inline-block;
}

.text-highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background: #ff6600;
  opacity: 0.3;
  box-shadow: 0 0 15px #ff6600;
  z-index: -1;
}

.hero-desc {
  font-size: 1.1rem;
  color: #a1a1aa;
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 90%;
}

.hero-actions { display: flex; gap: 20px; margin-bottom: 50px; }

.btn-primary-orange {
  background: #ff6600;
  color: white;
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1rem;
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.2);
}

.btn-primary-orange:hover {
  transform: translateY(-2px);
  background: #e65c00;
  box-shadow: 0 0 30px rgba(255, 102, 0, 0.4);
}

.btn-outline-white {
  background: transparent;
  color: white;
  border: 1px solid #333;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-outline-white:hover {
  border-color: white;
  background: rgba(255,255,255,0.05);
}

.hero-stats { display: flex; align-items: center; gap: 30px; }
.stat-item strong { display: block; font-size: 2rem; font-weight: 800; color: white; }
.stat-item span { color: #a1a1aa; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.stat-divider { width: 1px; height: 40px; background: #333; }

/* --- 3. ILLUSTRATION (CODE EDITOR) --- */
.hero-illustration { flex: 1; display: flex; justify-content: center; position: relative; }

.tech-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.code-window {
  background: #0f0f0f;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
  position: relative;
  z-index: 2;
}

.window-header { display: flex; gap: 8px; margin-bottom: 20px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }

.window-body { font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.95rem; line-height: 1.8; }
.code-line { color: #ccc; }
.c-purple { color: #c678dd; } .c-blue { color: #61afef; } .c-orange { color: #d19a66; } .c-yellow { color: #e5c07b; } .c-string { color: #98c379; } .c-int { color: #d19a66; } .c-comment { color: #5c6370; font-style: italic; }

.floating-tag {
  position: absolute;
  background: #18181b;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid #333;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  z-index: 3;
  animation: float 4s ease-in-out infinite;
}

.t1 { top: -20px; right: -10px; border-left: 3px solid #ff6600; animation-delay: 0s; }
.t2 { bottom: 40px; left: -30px; border-left: 3px solid #61afef; animation-delay: 1.5s; }
.t3 { bottom: -20px; right: 20px; border-left: 3px solid #98c379; animation-delay: 2.5s; }

@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

/* --- 4. FEATURES SECTION --- */
.features-dark { padding: 80px 0; border-top: 1px solid #111; }
.text-center { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 2.2rem; margin-bottom: 10px; color: white; }
.section-header p { color: #a1a1aa; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

.feature-card {
  background: #111;
  padding: 35px;
  border-radius: 16px;
  border: 1px solid #222;
  transition: 0.4s;
  cursor: pointer; /* Thêm con trỏ tay để báo hiệu có thể nhấn */
}

.feature-card:hover {
  background: #161616;
  border-color: #ff6600;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.icon-box {
  width: 50px; height: 50px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.icon-box svg { width: 24px; height: 24px; }
.icon-orange { background: rgba(255, 102, 0, 0.1); color: #ff6600; }
.icon-white { background: rgba(255, 255, 255, 0.1); color: white; }

.feature-card h3 { font-size: 1.3rem; margin-bottom: 10px; color: white; }
.feature-card p { color: #a1a1aa; font-size: 0.95rem; line-height: 1.6; }

/* --- 5. BACKGROUND GLOW SHAPES --- */
.glow-shape {
  position: absolute;
  width: 500px; height: 500px;
  background: #ff6600;
  filter: blur(180px);
  opacity: 0.06;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.shape-1 { top: -150px; left: -100px; }
.shape-2 { bottom: -100px; right: -100px; background: #ffffff; opacity: 0.02; }

@media (max-width: 992px) {
  .hero-split { flex-direction: column; text-align: center; padding-top: 40px; }
  .hero-actions { justify-content: center; }
  .hero-stats { justify-content: center; }
  .tech-box { margin-top: 40px; }
  .floating-tag { display: none; }
}
</style>