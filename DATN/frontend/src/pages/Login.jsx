import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // MỚI THÊM: Biến trạng thái để tạo hiệu ứng Loading cho nút bấm
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext); 

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Vừa bấm nút là bật hiệu ứng Loading ngay lập tức

    try {
      const response = await axios.post('[https://camerashop-backend-xlx8.onrender.com](https://camerashop-backend-xlx8.onrender.com)/api/users/login', formData);
      const userData = response.data.user;
      const serverToken = response.data.accessToken || response.data.token;

      if (!serverToken) {
         setIsLoading(false);
         return toast.error("Lỗi hệ thống: Backend không cấp Token!");
      }

      localStorage.setItem('token', serverToken);
      localStorage.setItem('user', JSON.stringify(userData));

      if (login) {
          try { login(userData, serverToken); } catch(err) {}
      }

      localStorage.setItem('token', serverToken);
      localStorage.setItem('user', JSON.stringify(userData));

      if (userData.role && ['SUPERADMIN', 'ADMIN', 'EDITOR'].includes(userData.role.toUpperCase())) {
          localStorage.setItem('admin_token', serverToken);
          localStorage.setItem('admin_role', userData.role.toUpperCase());
          toast.success(`Đăng nhập Quản trị thành công!`);
          
          // Giảm thời gian chờ xuống 500ms cho nhanh gọn
          setTimeout(() => { window.location.href = '/admin'; }, 500); 
      } else {
          toast.success('Đăng nhập thành công!');
          setTimeout(() => { window.location.href = '/'; }, 500);
      }
    } catch (error) {
      setIsLoading(false); // Nếu lỗi (sai pass) thì tắt Loading để user thử lại
      toast.error(error.response?.data?.message || 'Sai email hoặc mật khẩu!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input 
              type="email" name="email" required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn"
              disabled={isLoading} 
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" name="password" required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white font-bold py-2.5 px-4 rounded-md transition duration-300 flex justify-center items-center gap-2 ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {/* Đổi chữ và thêm icon xoay xoay khi đang xử lý */}
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản? <Link to="/register" className="text-blue-500 hover:underline">Đăng ký tại đây</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;