export const allSkills = [
  { 
    id: 1, name: 'Nhập môn Lập trình (C)', term: 1, category: 'Programming', icon: '💻',
    desc: 'Nền tảng tư duy logic thông qua ngôn ngữ C truyền thống.',
    details: {
      slides: Array.from({length: 8}, (_, i) => `Slide ${i + 1}: ${['Tổng quan', 'Biến & Kiểu dữ liệu', 'Toán tử', 'Nhập xuất', 'Điều kiện', 'Vòng lặp', 'Mảng', 'Hàm'][i]}`),
      labs: Array.from({length: 8}, (_, i) => `Lab ${i + 1}: Thực hành kiến thức Slide ${i + 1}`),
      assignment: {
        title: 'Quản lý học viên cơ bản',
        description: 'Xây dựng ứng dụng C hoàn chỉnh điều điểm và thông tin sinh viên.',
        requirements: ['Giai đoạn 1: Thiết kế Menu & nhập xuất mảng', 'Giai đoạn 2: Thuật toán sắp xếp & tìm kiếm']
      },
      skills: ['Tư duy thuật toán', 'Cú pháp C', 'Memory Management'],
      advices: ['Hãy vẽ sơ đồ khối trước khi code.', 'Luyện tập kỹ thuật Debug để tìm lỗi vòng lặp.']
    }
  },
  { 
    id: 2, name: 'Xây dựng trang Web', term: 1, category: 'Design', icon: '🌐',
    desc: 'Làm chủ HTML5, CSS3 và các kỹ thuật layout hiện đại.',
    details: {
      slides: Array.from({length: 8}, (_, i) => `Slide ${i + 1}: ${['HTML5 Tags', 'CSS Selectors', 'Box Model', 'Flexbox', 'Grid', 'Responsive', 'Animations', 'Hosting'][i]}`),
      labs: Array.from({length: 8}, (_, i) => `Lab ${i + 1}: Xây dựng Layout bài ${i + 1}`),
      assignment: {
        title: 'Website bán hàng / Tin tức',
        description: 'Thiết kế giao diện Website đa thiết bị (Mobile/Tablet/Desktop).',
        requirements: ['Giai đoạn 1: Wireframe & HTML/CSS cơ bản', 'Giai đoạn 2: Hoàn thiện Responsive & Animation']
      },
      skills: ['UI/UX Căn bản', 'Responsive Design', 'Sass/SCSS'],
      advices: ['Ưu tiên Mobile-First khi viết CSS.', 'Kiểm tra độ tương phản màu sắc để tăng trải nghiệm người dùng.']
    }
  },
  { 
    id: 3, name: 'Tin học cơ sở', term: 1, category: 'Foundation', icon: '🖥️',
    desc: 'Cấu trúc máy tính, mạng và hệ điều hành căn bản.',
    details: {
      slides: Array.from({length: 8}, (_, i) => `Slide ${i + 1}: ${['Hardware', 'OS', 'Networking', 'Security', 'Office Skills', 'Binary/Hex', 'Cloud Computing', 'IoT Intro'][i]}`),
      labs: Array.from({length: 8}, (_, i) => `Lab ${i + 1}: Cấu hình & Sử dụng hệ thống bài ${i + 1}`),
      assignment: {
        title: 'Báo cáo hạ tầng CNTT Doanh nghiệp',
        description: 'Phân tích và đề xuất giải pháp phần cứng, phần mềm cho một công ty giả định.',
        requirements: ['Giai đoạn 1: Khảo sát thiết bị', 'Giai đoạn 2: Dự toán ngân sách & Bảo mật']
      },
      skills: ['System Admin', 'Troubleshooting', 'Office 365'],
      advices: ['Nắm vững kiến thức về IP và Subnet Mask.', 'Thực hành ảo hóa để hiểu về Server.']
    }
  },
  { 
    id: 4, name: 'Lập trình Java 1', term: 2, category: 'Programming', icon: '☕',
    desc: 'Tiếp cận lập trình hướng đối tượng (OOP) mạnh mẽ.',
    details: {
      slides: Array.from({length: 8}, (_, i) => `Slide ${i + 1}: ${['Java Syntax', 'OOP Intro', 'Inheritance', 'Polymorphism', 'Interfaces', 'Exceptions', 'Collections', 'File I/O'][i]}`),
      labs: Array.from({length: 8}, (_, i) => `Lab ${i + 1}: Xử lý hướng đối tượng bài ${i + 1}`),
      assignment: {
        title: 'Hệ thống quản lý nhân sự chuyên sâu',
        description: 'Ứng dụng Java Console quản lý danh sách nhân viên đa dạng (tiếp thị, trưởng phòng).',
        requirements: ['Giai đoạn 1: Class Diagram & CRUD cơ bản', 'Giai đoạn 2: Áp dụng OOP & Xuất file dữ liệu']
      },
      skills: ['OOP Principles', 'Collection Framework', 'Error Handling'],
      advices: ['Hiểu rõ tính kế thừa để tránh trùng lặp code.', 'Sử dụng ArrayList thay vì mảng tĩnh.']
    }
  },
  { 
    id: 5, name: 'Thiết kế UI/UX cơ bản', term: 2, category: 'Design', icon: '🎨',
    desc: 'Tư duy thiết kế trải nghiệm và giao diện người dùng.',
    details: {
      slides: Array.from({length: 8}, (_, i) => `Slide ${i + 1}: ${['Design Thinking', 'Typography', 'Color Theory', 'Layout Systems', 'Figma Intro', 'Prototyping', 'User Research', 'Testing'][i]}`),
      labs: Array.from({length: 8}, (_, i) => `Lab ${i + 1}: Thiết kế Prototype bài ${i + 1}`),
      assignment: {
        title: 'Thiết kế ứng dụng Mobile App',
        description: 'Hoàn thiện bộ giao diện người dùng cho ứng dụng đặt đồ ăn hoặc du lịch.',
        requirements: ['Giai đoạn 1: User Flow & Low-fi Wireframe', 'Giai đoạn 2: High-fi Design & Prototype']
      },
      skills: ['Figma Mastery', 'User Research', 'Visual Communication'],
      advices: ['Lấy người dùng làm trung tâm, không phải ý thích cá nhân.', 'Thường xuyên cập nhật xu hướng thiết kế trên Behance.']
    }
  },
  { 
    id: 6, name: 'Cơ sở dữ liệu (SQL)', term: 2, category: 'Foundation', icon: '💾',
    desc: 'Quản trị và truy vấn dữ liệu với SQL Server.',
    details: {
      slides: Array.from({length: 8}, (_, i) => `Slide ${i + 1}: ${['DBMS Intro', 'ERD Modeling', 'Normal Forms', 'Select Basic', 'Joins', 'Aggregate Functions', 'Subqueries', 'Transactions'][i]}`),
      labs: Array.from({length: 8}, (_, i) => `Lab ${i + 1}: Truy vấn SQL Server bài ${i + 1}`),
      assignment: {
        title: 'Thiết kế CSDL Quản lý bán hàng',
        description: 'Từ sơ đồ thực thể đến việc cài đặt và truy vấn báo cáo dữ liệu.',
        requirements: ['Giai đoạn 1: Vẽ ERD & Chuẩn hóa 3NF', 'Giai đoạn 2: Viết câu lệnh SQL & Truy vấn phức tạp']
      },
      skills: ['Database Design', 'SQL Queries', 'Data Normalization'],
      advices: ['Vẽ ERD thật chuẩn trước khi gõ lệnh Create Table.', 'Học kỹ các loại Join để xử lý dữ liệu liên kết.']
    }
  }
];