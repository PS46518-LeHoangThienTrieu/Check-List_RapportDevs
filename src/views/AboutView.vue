<template>
  <div class="about-dark">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>

    <div class="container">
      <header class="about-hero text-center">
        <span class="badge-mission">Sứ mệnh của chúng tôi</span>
        <h1>Người bạn đồng hành <span class="text-orange">Tâm huyết</span></h1>
        <p class="hero-desc">
          CheckList IT là cầu nối giúp Tân sinh viên FPT Polytechnic vượt qua những bỡ ngỡ ban đầu để trở thành những Dev thực thụ.
        </p>
      </header>

      <section class="story-section">
        <div class="story-content">
          <h2>Tại sao dự án ra đời?</h2>
          <div class="story-line"></div>
          <p>
            Bước vào giảng đường FPT Poly, tân sinh viên thường bị choáng ngợp bởi cường độ học tập cao và các kỳ thi liên tục. 
            Việc phải làm chủ cùng lúc các ngôn ngữ như <strong>C, Java</strong> và kỹ thuật <strong>Web Design</strong> trong thời gian ngắn tạo ra một áp lực khổng lồ.
          </p>
          <p>
            Nhiều bạn rơi vào tình trạng "mất gốc" ngay từ những tuần đầu vì không biết bắt đầu từ đâu hoặc tài liệu quá phân tán. 
            <strong>CheckList IT</strong> ra đời như một hệ thống quản trị học tập thu nhỏ, nơi mọi môn học được module hóa thành các bước đi cụ thể.
          </p>
          <p>
            Chúng tôi không chỉ cung cấp tài liệu, mà còn cung cấp một <strong>lộ trình tinh gọn</strong>, giúp bạn biết rõ hôm nay cần học gì, làm Lab nào và chuẩn bị gì cho Assignment. 
            Dự án này là tâm huyết của Nhóm 4 nhằm xây dựng một cộng đồng hỗ trợ lẫn nhau, nơi không có ai bị bỏ lại phía sau.
          </p>
          <div class="stats-row">
            <div class="stat-box"><strong>100%</strong> <span>Miễn phí</span></div>
            <div class="stat-box"><strong>24/7</strong> <span>Hỗ trợ</span></div>
            <div class="stat-box"><strong>500+</strong> <span>Tài liệu</span></div>
          </div>
        </div>
        <div class="story-visual">
          <div class="card-glass">
            <div class="icon-big">🚀</div>
            <h3>From Zero to Hero</h3>
            <p>Lộ trình từ con số 0 đến thực chiến.</p>
          </div>
        </div>
      </section>

      <section class="team-section">
        <h2 class="section-title text-center">Đội ngũ <span class="text-orange">Rapport Devs</span></h2>
        
        <div class="team-wrapper">
          <div class="team-row">
            <div class="member-pill">
              <div class="info">
                <span class="badge">Leader</span>
                <h4>Đoàn Quang Ngọc</h4>
                <p class="slogan">"Code là đam mê, Bug là người tình"</p>
              </div>
            </div>
            <div class="member-pill">
              <div class="info">
                <span class="badge">Designer</span>
                <h4>Trần Thị UI</h4>
                <p class="slogan">"Làm đẹp cho đời, làm đẹp cho Web"</p>
              </div>
            </div>
            <div class="member-pill">
              <div class="info">
                <span class="badge">Content</span>
                <h4>Lê Văn Content</h4>
                <p class="slogan">"Viết code thì khó, viết văn thì hay"</p>
              </div>
            </div>
          </div>

          <div class="team-row">
            <div class="member-pill">
              <div class="info">
                <span class="badge">Developer</span>
                <h4>Trần Minh Hào</h4>
                <p class="slogan">"Làm việc với dữ liệu là hạnh phúc"</p>
              </div>
            </div>
            <div class="member-pill">
              <div class="info">
                <span class="badge">Developer</span>
                <h4>Hoàng Frontend</h4>
                <p class="slogan">"Biến bản vẽ thành hiện thực"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-dark {
  background-color: #050505;
  min-height: 100vh;
  padding-bottom: 20px;
  position: relative;
  overflow-x: hidden;
  color: #fff;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 10; }
.text-orange { color: #ff6600; }
.text-center { text-align: center; }

/* HERO SECTION */
.about-hero { padding: 40px 0 20px; max-width: 800px; margin: 0 auto; }
.badge-mission { display: inline-block; background: rgba(255,255,255,0.05); color: #a1a1aa; padding: 6px 16px; border-radius: 30px; font-size: 0.7rem; text-transform: uppercase; border: 1px solid #333; margin-bottom: 10px; }
.about-hero h1 { font-size: 2.8rem; font-weight: 800; margin-bottom: 10px; }
.hero-desc { color: #a1a1aa; font-size: 1rem; line-height: 1.5; }

/* STORY SECTION */
.story-section { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 40px; align-items: center; margin: 30px 0; }
.story-line { width: 50px; height: 3px; background: #ff6600; margin: 10px 0 15px; }
.story-content h2 { font-size: 1.8rem; margin-bottom: 10px; }
.story-content p { font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px; color: #d4d4d8; }

.stats-row { display: flex; gap: 30px; margin-top: 15px; border-top: 1px solid #222; padding-top: 15px; }
.stat-box strong { display: block; font-size: 1.6rem; color: #ff6600; }
.stat-box span { color: #666; font-size: 0.7rem; text-transform: uppercase; }

.card-glass { background: rgba(20,20,20,0.6); backdrop-filter: blur(15px); border: 1px solid #333; padding: 20px; border-radius: 20px; text-align: center; }
.icon-big { font-size: 3rem; margin-bottom: 10px; }

/* TEAM SECTION */
.team-section { margin-top: 40px; }
.section-title { font-size: 2rem; margin-bottom: 30px; }
.team-wrapper { display: flex; flex-direction: column; gap: 15px; align-items: center; }
.team-row { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; width: 100%; margin-bottom: 10px; }

.member-pill {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #222;
  padding: 15px 25px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  min-width: 280px;
  transition: all 0.3s ease;
}

.member-pill:hover { 
  background: rgba(255, 102, 0, 0.05); 
  border-color: #ff6600; 
  transform: translateY(-5px); 
}

.info { display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
.info h4 { font-size: 1.1rem; margin: 0; font-weight: 700; color: #fff; }
.info .badge { font-size: 0.65rem; color: #ff6600; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; }
.info .slogan { font-size: 0.75rem; color: #888; font-style: italic; margin-top: 5px; }

/* ORBS */
.glow-orb { position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(100px); z-index: 0; opacity: 0.05; pointer-events: none; }
.orb-1 { background: #ff6600; top: 5%; left: -10%; }
.orb-2 { background: #ffffff; bottom: 5%; right: -10%; }

@media (max-width: 768px) {
  .story-section { grid-template-columns: 1fr; }
  .member-pill { width: 100%; min-width: unset; }
}
</style>