// Logic xử lý User và Admin
const loginUser = (username, password) => {
  let userData = {};
  
  if (username === 'adminnhom4' && password === '123456') {
    userData = { 
      username: 'adminnhom4', 
      role: 'admin', 
      fullName: 'Quản trị viên', 
      avatar: 'https://i.pravatar.cc/150?u=admin' 
    };
  } else {
    // Giả lập user bình thường (Trong thực tế sẽ gọi API)
    userData = { 
      username: username, 
      role: 'user', 
      fullName: '', 
      avatar: 'https://i.pravatar.cc/150?u=' + username 
    };
  }

  // Lưu vào localStorage để tắt web không bị mất
  localStorage.setItem('currentUser', JSON.stringify(userData));
  return userData;
};