import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      toast.success(response.data.message || 'Đăng ký thành công!');
      navigate('/login'); // Chuyển hướng sang trang đăng nhập
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký Tài Khoản</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Họ và Tên</label>
            <input 
              type="text" name="fullName" required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập họ tên của bạn"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Số điện thoại</label>
            <input 
              type="text" name="phone" required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input 
              type="email" name="email" required 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" name="password" required minLength="6"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Đăng Ký
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản? <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;