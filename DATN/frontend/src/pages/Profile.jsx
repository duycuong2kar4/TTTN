import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import { useReactToPrint } from 'react-to-print';

export default function Profile() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 

  const [activeTab, setActiveTab] = useState('orders'); // Đặt mặc định mở tab đơn hàng
  const [orders, setOrders] = useState([]);
  
  // --- STATE QUẢN LÝ ĐƠN HÀNG MỚI ---
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const componentRef = useRef(); // Dùng để in hóa đơn

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', gender: 'Nam', dob: '', address: '', avatar: ''
  });

  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    fullName: '', phone: '', fullAddress: '', isDefault: false
  });

  const [wishlist, setWishlist] = useState([]);

  // --- STATE CHO POPUP ĐÁNH GIÁ ---
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  // --- HÀM THÔNG MINH XỬ LÝ TOKEN ---
  const getValidToken = () => {
    const t = localStorage.getItem('token');
    if (!t || t === 'undefined' || t === 'null') return null;
    return t;
  };

  const handleAuthError = () => {
    toast.error("Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại!");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(() => { window.location.href = '/login'; }, 1500);
  };
  
  // --- HÀM IN HÓA ĐƠN ---
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Hoa_Don_${selectedOrder?.orderCode || 'CameraShop'}`,
    onAfterPrint: () => toast.success("Đã in hóa đơn thành công!")
  });

  // ------------------------------------

  const fetchAddresses = async () => {
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      const res = await axios.get('http://localhost:5000/api/addresses', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setAddresses(res.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
    }
  };

  const fetchWishlist = async () => {
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setWishlist(res.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
    }
  };

  useEffect(() => {
    if (activeTab === 'address') fetchAddresses();
    else if (activeTab === 'wishlist') fetchWishlist();
  }, [activeTab]);

  // --- FIX LỖI NHẢY TRANG: TỰ ĐỘNG CUỘN TỨC THÌ LÊN ĐẦU ---
  useEffect(() => {
    // Dùng 0, 0 để trang nhảy lập tức lên đầu, không bị hiệu ứng trượt từ dưới lên
    window.scrollTo(0, 0); 
  }, [selectedOrder, activeTab]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      await axios.post('http://localhost:5000/api/addresses', addressForm, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      toast.success("Thêm địa chỉ thành công!");
      setAddressForm({ fullName: '', phone: '', fullAddress: '', isDefault: false });
      fetchAddresses(); 
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
      else toast.error("Lỗi khi thêm địa chỉ!");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return;
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      toast.success("Đã xóa địa chỉ!");
      fetchAddresses(); 
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
      else toast.error("Lỗi khi xóa địa chỉ!");
    }
  };

  const handleRemoveWishlist = async (productId) => {
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      await axios.post('http://localhost:5000/api/wishlist/toggle', { productId }, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      toast.success("Đã bỏ yêu thích!");
      fetchWishlist(); 
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
      else toast.error("Lỗi hệ thống!");
    }
  };

  useEffect(() => {
    const currentToken = getValidToken();
    if (!currentToken) {
      toast.error('Vui lòng đăng nhập lại để xem thông tin!');
      navigate('/login');
    } else {
      fetchProfile();
      fetchOrders();
    }
  }, [navigate]);

  const fetchProfile = async () => {
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const user = res.data;
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Nam',
        dob: user.dob ? user.dob.split('T')[0] : '', 
        address: user.address || '',
        avatar: user.avatar || ''
      });
      if (user.avatar) setPreviewImage(`http://localhost:5000${user.avatar}`);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
    }
  };

  const fetchOrders = async () => {
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return;

      const res = await axios.get(`http://localhost:5000/api/orders/user/${currentUser.id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setOrders(res.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) handleAuthError();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();

    let payload;
    let headers = { Authorization: `Bearer ${currentToken}` };

    if (imageFile) {
      payload = new FormData();
      payload.append('name', formData.name);
      payload.append('phone', formData.phone);
      payload.append('gender', formData.gender);
      payload.append('dob', formData.dob);
      payload.append('address', formData.address);
      payload.append('avatar', imageFile);
    } else {
      payload = {
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address
      };
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await axios.put('http://localhost:5000/api/users/profile', payload, { headers });
      
      toast.success(res.data?.message || "Cập nhật thành công!");
      
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { 
        ...currentUser, 
        name: res.data?.user?.name || formData.name, 
        avatar: res.data?.user?.avatar || currentUser?.avatar 
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleAuthError();
      } else {
        toast.error(error.response?.data?.message || 'Lỗi cập nhật thông tin!');
      }
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const currentToken = getValidToken();
    if (!currentToken) return handleAuthError();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Mật khẩu xác nhận không khớp!");
    }
    if (passwordData.newPassword.length < 6) {
      return toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
    }

    try {
      const res = await axios.put('http://localhost:5000/api/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      toast.success(res.data.message);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); 
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleAuthError();
      } else {
        toast.error(error.response?.data?.message || 'Lỗi khi đổi mật khẩu!');
      }
    }
  };

  // --- CÁC HÀM XỬ LÝ ĐƠN HÀNG NÂNG CAO ---
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
    try {
      const token = getValidToken();
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: 'CANCELLED' }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Đã hủy đơn hàng thành công!");
      fetchOrders();
      if(selectedOrder && selectedOrder.id === orderId) setSelectedOrder(null);
    } catch (error) { toast.error("Không thể hủy đơn hàng lúc này!"); }
  };

  const handleConfirmReceived = async (orderId) => {
    if (!window.confirm("Xác nhận bạn đã nhận được hàng nguyên vẹn?")) return;
    try {
      const token = getValidToken();
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: 'PAID' }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Cảm ơn bạn đã mua sắm!");
      fetchOrders();
    } catch (error) { toast.error("Lỗi hệ thống khi xác nhận!"); }
  };

  const handleRebuy = (items) => {
      items.forEach(item => { addToCart(item.product); });
      toast.success("Đã thêm toàn bộ sản phẩm vào giỏ hàng!");
      navigate('/cart');
  };

  const handleOpenReview = (product) => {
      setReviewingProduct(product);
      setReviewForm({ rating: 5, comment: '' });
      setShowReviewModal(true);
  };

  const handleSubmitReview = async (e) => {
      e.preventDefault();
      const currentToken = getValidToken();
      if (!currentToken) return handleAuthError();

      if (!reviewForm.comment.trim()) {
          return toast.warning("Vui lòng nhập nội dung đánh giá!");
      }

      try {
          await axios.post(`http://localhost:5000/api/products/${reviewingProduct.id}/reviews`, reviewForm, {
              headers: { Authorization: `Bearer ${currentToken}` }
          });
          toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
          setShowReviewModal(false);
          setReviewingProduct(null);
      } catch (error) {
          toast.error("Có lỗi xảy ra khi gửi đánh giá!");
      }
  };

  // --- BỘ LỌC VÀ TÌM KIẾM ĐƠN HÀNG ---
  const filteredOrders = orders.filter(order => {
      const matchStatus = statusFilter === 'ALL' || order.status === statusFilter;
      const matchSearch = order.orderCode.toString().includes(searchQuery) || 
                          order.items.some(item => item.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchStatus && matchSearch;
  });

  const NavButton = ({ id, icon, label }) => (
    <button 
        onClick={() => { setActiveTab(id); setSelectedOrder(null); }} 
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 text-sm ${
            activeTab === id 
            ? 'bg-blue-50 text-blue-700 shadow-sm' 
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
    >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8 relative">
      
      {/* MENU SIDEBAR BÊN TRÁI */}
      <aside className="w-full md:w-72 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 h-fit md:sticky top-24">
        <div className="flex flex-col items-center mb-6 border-b border-slate-100 pb-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-200 shadow-sm mb-3">
             {previewImage ? (
                <img src={previewImage} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
                <span className="text-2xl font-black text-slate-400 uppercase">{formData.name ? formData.name.charAt(0) : 'U'}</span>
             )}
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tài khoản của</p>
          <p className="font-black text-slate-800 text-lg text-center leading-tight truncate w-full px-2">{formData.name || 'Thành Viên'}</p>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <NavButton id="orders" icon="📦" label="Quản Lý Đơn Hàng" />
          <NavButton id="profile" icon="👤" label="Hồ Sơ Của Tôi" />
          <NavButton id="address" icon="📍" label="Sổ Địa Chỉ" />
          <NavButton id="wishlist" icon="❤️" label="Yêu Thích" />
          <NavButton id="password" icon="🔒" label="Đổi Mật Khẩu" />
        </nav>
      </aside>

      {/* NỘI DUNG CHÍNH BÊN PHẢI */}
      <main className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[600px]">
        
        {/* ========================================================= */}
        {/* TAB: QUẢN LÝ ĐƠN HÀNG (LIST & BỘ LỌC)                     */}
        {/* ========================================================= */}
        {activeTab === 'orders' && !selectedOrder && (
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-800">Quản Lý Đơn Hàng</h2>
                
                {/* Thanh tìm kiếm */}
                <div className="relative w-full lg:w-72">
                    <input 
                        type="text" 
                        placeholder="Tìm mã đơn, tên sản phẩm..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:border-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                </div>
            </div>

            {/* Bộ lọc trạng thái */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2 custom-scrollbar">
                {[
                    { id: 'ALL', label: 'Tất cả' },
                    { id: 'PENDING', label: 'Chờ xác nhận' },
                    { id: 'SHIPPING', label: 'Đang giao' }, 
                    { id: 'PAID', label: 'Hoàn thành' },
                    { id: 'CANCELLED', label: 'Đã hủy' }
                ].map(tab => (
                    <button 
                        key={tab.id} onClick={() => setStatusFilter(tab.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition ${statusFilter === tab.id ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Danh sách Order */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <span className="text-5xl mb-3 block opacity-50">📦</span>
                <p className="text-slate-500 font-medium text-sm">Không tìm thấy đơn hàng nào.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <div key={order.id} className="border border-slate-200 rounded-2xl bg-white shadow-sm hover:border-blue-300 transition-colors overflow-hidden">
                    
                    {/* Header Đơn Hàng */}
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3">
                        <div className="flex items-center gap-3">
                            <span className="font-black text-slate-800 text-sm tracking-wide">Mã: #{order.orderCode}</span>
                            <span className="text-slate-300 hidden md:inline">|</span>
                            <span className="text-xs font-medium text-slate-500 hidden md:inline">📅 {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <span className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider border ${
                            order.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : 
                            order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                            order.status === 'SHIPPING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                            {order.status === 'PAID' ? '✅ HOÀN THÀNH' : order.status === 'CANCELLED' ? '❌ ĐÃ HỦY' : order.status === 'SHIPPING' ? '🚚 ĐANG GIAO' : '⏳ CHỜ XÁC NHẬN'}
                        </span>
                    </div>
                    
                    {/* Body: Danh sách sản phẩm thu gọn */}
                    <div className="p-5 cursor-pointer hover:bg-slate-50 transition" onClick={() => setSelectedOrder(order)}>
                      {order.items.slice(0, 2).map(item => (
                        <div key={item.id} className="flex items-center gap-4 border-b border-slate-50 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                          {item.product.image ? (
                            <img src={`http://localhost:5000${item.product.image}`} className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white" />
                          ) : (
                            <div className="w-16 h-16 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-[10px] text-slate-400">Trống</div>
                          )}
                          <div className="flex-1">
                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-sm font-semibold text-slate-500 bg-white inline-block px-2 py-1 rounded mt-1 border border-slate-100">x{item.quantity}</p>
                          </div>
                          <div className="font-bold text-slate-800 text-sm">
                              {Number(item.price * item.quantity).toLocaleString('vi-VN')} đ
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                          <div className="text-center text-xs text-blue-600 font-bold mt-2">
                              + Xem thêm {order.items.length - 2} sản phẩm...
                          </div>
                      )}
                    </div>
                    
                    {/* Footer: Tính năng thao tác nhanh */}
                    <div className="bg-slate-50 px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200">
                      <div className="text-sm text-slate-600 font-medium">
                          Tổng tiền: <span className="font-black text-red-600 text-xl ml-1">{Number(order.totalAmount).toLocaleString('vi-VN')} đ</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 w-full md:w-auto">
                          {order.status === 'PENDING' && (
                              <button onClick={() => handleCancelOrder(order.id)} className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition shadow-sm">Hủy Đơn</button>
                          )}
                          
                          {order.status === 'PENDING' && (
                              <button onClick={() => toast.info('Đang tích hợp cổng thanh toán lại...')} className="flex-1 md:flex-none px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition shadow-sm">Thanh toán lại</button>
                          )}

                          {order.status === 'SHIPPING' && (
                              <button onClick={() => handleConfirmReceived(order.id)} className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition shadow-sm">Đã nhận hàng</button>
                          )}

                          {(order.status === 'PAID' || order.status === 'CANCELLED') && (
                              <button onClick={() => handleRebuy(order.items)} className="flex-1 md:flex-none px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition shadow-sm">Mua lại</button>
                          )}
                          
                          <button onClick={() => setSelectedOrder(order)} className="flex-1 md:flex-none px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition shadow-sm">Xem Chi Tiết</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: CHI TIẾT ĐƠN HÀNG (IN HÓA ĐƠN & THEO DÕI)              */}
        {/* ========================================================= */}
        {activeTab === 'orders' && selectedOrder && (
            <div className="animate-fade-in bg-white" ref={componentRef}>
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <button onClick={() => setSelectedOrder(null)} className="text-slate-500 hover:text-blue-600 font-bold text-sm flex items-center gap-2 print:hidden transition">
                        ← Trở lại danh sách
                    </button>
                    <button onClick={handlePrint} className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition flex items-center gap-2 print:hidden shadow-sm">
                        🖨️ In Hóa Đơn
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide">Chi Tiết Đơn Hàng #{selectedOrder.orderCode}</h3>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}</p>
                    </div>
                    <span className="px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-md">
                         {selectedOrder.status === 'PAID' ? 'HOÀN THÀNH' : selectedOrder.status === 'CANCELLED' ? 'ĐÃ HỦY' : selectedOrder.status === 'SHIPPING' ? 'ĐANG GIAO' : 'CHỜ XÁC NHẬN'}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-slate-200 p-5 rounded-2xl shadow-sm bg-white">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="text-blue-600">📍</span> Thông tin người nhận</h4>
                        <div className="text-sm text-slate-600 space-y-2.5">
                            <p className="flex"><strong className="w-24 text-slate-800">Họ và tên:</strong> {selectedOrder.shippingName || formData.name}</p>
                            <p className="flex"><strong className="w-24 text-slate-800">Điện thoại:</strong> {selectedOrder.shippingPhone || formData.phone}</p>
                            <p className="flex"><strong className="w-24 text-slate-800">Địa chỉ:</strong> <span className="flex-1">{selectedOrder.shippingAddress}</span></p>
                        </div>
                    </div>
                    
                    <div className="border border-slate-200 p-5 rounded-2xl shadow-sm bg-white">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="text-blue-600">🚚</span> Vận chuyển & Thanh toán</h4>
                        <div className="text-sm text-slate-600 space-y-2.5">
                            <p className="flex"><strong className="w-28 text-slate-800">Đơn vị VC:</strong> Giao Hàng Nhanh (Dự kiến)</p>
                            <p className="flex"><strong className="w-28 text-slate-800">Mã vận đơn:</strong> <span className="text-orange-600 font-bold">Đang cập nhật</span></p>
                            <p className="flex"><strong className="w-28 text-slate-800">Phí ship:</strong> <span className="text-green-600 font-bold">Miễn phí</span></p>
                        </div>
                    </div>
                </div>

                <h4 className="font-bold text-slate-800 mb-4 text-lg">Sản phẩm đã đặt</h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                            <tr>
                                <th className="p-4 font-bold">Sản phẩm</th>
                                <th className="p-4 font-bold text-center">Đơn giá</th>
                                <th className="p-4 font-bold text-center">SL</th>
                                <th className="p-4 font-bold text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder.items.map(item => (
                                <tr key={item.id} className="border-b border-slate-100 last:border-0 bg-white">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <img src={`http://localhost:5000${item.product.image}`} className="w-14 h-14 object-cover rounded-xl border border-slate-200 p-1 bg-slate-50" />
                                            <div>
                                                <p className="font-bold text-slate-800 line-clamp-2">{item.product.name}</p>
                                                {selectedOrder.status === 'PAID' && (
                                                    <button onClick={() => handleOpenReview(item.product)} className="text-xs text-blue-600 font-bold mt-1.5 hover:underline print:hidden transition">
                                                        ⭐ Viết đánh giá
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center font-medium text-slate-600">{Number(item.price).toLocaleString('vi-VN')} đ</td>
                                    <td className="p-4 text-center font-bold text-slate-800">x{item.quantity}</td>
                                    <td className="p-4 text-right font-black text-slate-800">{Number(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end border-t border-slate-200 pt-6">
                    <div className="w-full md:w-1/2 space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500 font-medium">Tạm tính:</span> <span className="font-bold text-slate-800">{Number(selectedOrder.totalAmount).toLocaleString('vi-VN')} đ</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 font-medium">Phí vận chuyển:</span> <span className="font-bold text-slate-800">0 đ</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 font-medium">Mã giảm giá:</span> <span className="font-bold text-slate-800">0 đ</span></div>
                        <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
                            <span className="text-slate-800 font-black text-lg">Tổng thanh toán:</span> 
                            <span className="font-black text-red-600 text-2xl">{Number(selectedOrder.totalAmount).toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center print:hidden shadow-sm">
                    <p className="text-sm text-slate-700 mb-4 font-bold">Bạn cần hỗ trợ thêm về đơn hàng này?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-6 py-2.5 bg-white text-blue-700 border border-blue-200 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition">📞 Gọi Hotline 1900 xxxx</button>
                        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition">💬 Nhắn tin Cửa hàng</button>
                    </div>
                </div>
            </div>
        )}

        {/* --- TAB 1: THÔNG TIN CÁ NHÂN --- */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Hồ Sơ Của Tôi</h2>
            <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col-reverse md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1.5">Email đăng nhập (Không thể đổi)</label>
                  <input type="email" value={formData.email} disabled className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1.5">Họ và Tên</label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm text-slate-800 font-medium" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1.5">Số điện thoại</label>
                  <input type="text" name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm text-slate-800 font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1.5">Địa chỉ giao hàng</label>
                  <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm text-slate-800 font-medium" placeholder="Nhập địa chỉ nhận hàng mặc định..." />
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 pt-2">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-600 mb-2">Giới tính</label>
                    <div className="flex items-center gap-5 mt-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="gender" value="Nam" checked={formData.gender === 'Nam'} onChange={handleChange} className="w-4 h-4 accent-blue-600" /> Nam</label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="gender" value="Nữ" checked={formData.gender === 'Nữ'} onChange={handleChange} className="w-4 h-4 accent-blue-600" /> Nữ</label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="gender" value="Khác" checked={formData.gender === 'Khác'} onChange={handleChange} className="w-4 h-4 accent-blue-600" /> Khác</label>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">Ngày sinh</label>
                    <input type="date" name="dob" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm text-slate-800 font-medium" />
                  </div>
                </div>

                <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-md transition mt-4">
                  Lưu Thông Tin
                </button>
              </div>

              {/* Khu vực upload Avatar */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-start border-l-0 md:border-l border-slate-100 pl-0 md:pl-8 pt-4 md:pt-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-slate-300 shadow-sm mb-5 bg-slate-50 flex items-center justify-center p-1">
                   {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
                   ) : (
                      <span className="text-slate-400 text-sm font-medium">Chưa có ảnh</span>
                   )}
                </div>
                <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 font-bold text-sm transition">
                  Chọn Ảnh
                  <input type="file" onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png" />
                </label>
                <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed">Dung lượng file tối đa 1 MB<br/>Định dạng: .JPEG, .PNG</p>
              </div>
            </form>
          </div>
        )}

        {/* --- TAB 3: ĐỔI MẬT KHẨU --- */}
        {activeTab === 'password' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Đổi Mật Khẩu</h2>
            <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
            
            <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1.5">Mật khẩu hiện tại</label>
                <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1.5">Mật khẩu mới</label>
                <input type="password" name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1.5">Xác nhận mật khẩu mới</label>
                <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition text-sm" required />
              </div>
              
              <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition mt-4 block">
                Cập Nhật Mật Khẩu
              </button>
            </form>
          </div>
        )}

        {/* --- TAB 4: SỔ ĐỊA CHỈ --- */}
        {activeTab === 'address' && (
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Sổ Địa Chỉ</h2>
                    <p className="text-sm text-slate-500">Quản lý địa chỉ nhận hàng của bạn</p>
                </div>
            </div>
            
            <form onSubmit={handleAddAddress} className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📍 Thêm địa chỉ mới</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Họ và Tên người nhận" required value={addressForm.fullName} onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})} className="px-4 py-2.5 border border-slate-300 bg-white rounded-xl outline-none focus:border-blue-500 text-sm font-medium" />
                <input type="text" placeholder="Số điện thoại liên hệ" required value={addressForm.phone} onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})} className="px-4 py-2.5 border border-slate-300 bg-white rounded-xl outline-none focus:border-blue-500 text-sm font-medium" />
              </div>
              <textarea placeholder="Địa chỉ chi tiết (Số nhà, Đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố)..." required value={addressForm.fullAddress} onChange={(e) => setAddressForm({...addressForm, fullAddress: e.target.value})} className="w-full px-4 py-3 border border-slate-300 bg-white rounded-xl outline-none focus:border-blue-500 mb-4 text-sm font-medium resize-y" rows="3"></textarea>
              
              <div className="flex items-center gap-2 mb-5">
                <input type="checkbox" id="isDefault" checked={addressForm.isDefault} onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})} className="w-4 h-4 cursor-pointer accent-blue-600 rounded" />
                <label htmlFor="isDefault" className="cursor-pointer text-slate-700 text-sm font-bold">Đặt làm địa chỉ mặc định</label>
              </div>
              
              <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-slate-800 transition">
                + Thêm Địa Chỉ
              </button>
            </form>

            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Địa chỉ đã lưu ({addresses.length})</h3>
            <div className="space-y-4">
              {addresses.length === 0 && (
                <div className="text-center text-slate-400 py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-sm">
                  Bạn chưa lưu địa chỉ nào.
                </div>
              )}
              {addresses.map((addr) => (
                <div key={addr.id} className="p-5 border border-slate-200 rounded-2xl flex justify-between items-start hover:border-blue-300 transition bg-white shadow-sm relative overflow-hidden">
                  {addr.isDefault && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>}
                  <div className="pl-2">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-black text-slate-800 text-base border-r border-slate-300 pr-3">{addr.fullName}</span>
                      <span className="text-slate-600 font-semibold text-sm">{addr.phone}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase font-black border border-blue-100 tracking-wider">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{addr.fullAddress}</p>
                  </div>
                  <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-600 hover:text-white text-sm font-bold border-2 border-red-100 px-4 py-2 rounded-xl transition hover:bg-red-500 hover:border-red-500 shadow-sm ml-4">
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: DANH SÁCH YÊU THÍCH --- */}
        {activeTab === 'wishlist' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Danh Sách Yêu Thích</h2>
            <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">Những sản phẩm bạn đã "thả tim"</p>
            
            {wishlist.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="text-4xl mb-3">💔</div>
                <p className="text-slate-500 mb-4 text-sm font-medium">Danh sách yêu thích của bạn đang trống.</p>
                <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition">
                  Khám phá thêm sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-slate-200 rounded-2xl bg-white hover:shadow-md hover:border-blue-200 transition">
                    <div className="w-24 h-24 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden border border-slate-100 bg-slate-50" onClick={() => navigate(`/product/${item.product.id}`)}>
                      {item.product.image ? (
                        <img src={`http://localhost:5000${item.product.image}`} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">Trống</div>
                      )}
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 
                          className="font-bold text-slate-800 text-sm line-clamp-2 cursor-pointer hover:text-blue-600 transition leading-snug"
                          onClick={() => navigate(`/product/${item.product.id}`)}
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-red-600 font-black mt-1.5 text-base">
                          {Number(item.product.price).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-end gap-2 mt-3">
                        <button 
                          onClick={() => handleRemoveWishlist(item.productId)}
                          className="text-slate-400 hover:text-red-500 transition text-sm font-bold px-2 py-1.5 rounded-lg hover:bg-red-50"
                          title="Bỏ yêu thích"
                        >
                          Xóa
                        </button>
                        <button 
                          onClick={() => {
                              addToCart(item.product);
                              navigate('/cart');
                          }}
                          className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition shadow-sm"
                        >
                          Mua Ngay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- POPUP ĐÁNH GIÁ SẢN PHẨM --- */}
      {showReviewModal && reviewingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-all">
           <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-fade-in relative border border-slate-100">
               
               {/* Nút đóng */}
               <button 
                  onClick={() => setShowReviewModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
               >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>

               <h3 className="font-black text-2xl mb-6 text-slate-800 flex items-center gap-3">
                   <span className="text-blue-600">✍️</span> Đánh giá sản phẩm
               </h3>
               
               {/* Thông পুরা tin sản phẩm vắn tắt */}
               <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {reviewingProduct.image ? (
                     <img src={`http://localhost:5000${reviewingProduct.image}`} className="w-16 h-16 object-cover rounded-xl border border-white shadow-sm bg-white" />
                  ) : (
                     <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-500">Trống</div>
                  )}
                  <div>
                      <span className="font-bold text-base text-slate-800 line-clamp-2 leading-snug">{reviewingProduct.name}</span>
                      <span className="text-sm font-black text-red-600 mt-1 block">{Number(reviewingProduct.price).toLocaleString('vi-VN')} đ</span>
                  </div>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmitReview}>
                  <div className="mb-6">
                      <label className="block text-sm font-bold mb-3 text-slate-700">Mức độ hài lòng của bạn:</label>
                      <div className="flex gap-2 bg-slate-50 w-fit p-3 rounded-2xl border border-slate-100">
                          {[1, 2, 3, 4, 5].map(star => (
                              <button 
                                  type="button" 
                                  key={star} 
                                  onClick={() => setReviewForm({...reviewForm, rating: star})} 
                                  className={`text-4xl transition-all transform hover:scale-125 hover:-rotate-12 ${reviewForm.rating >= star ? 'text-orange-400 drop-shadow-md' : 'text-slate-300 grayscale opacity-50'}`}
                              >
                                  ★
                              </button>
                          ))}
                      </div>
                  </div>
                  
                  <div className="mb-6">
                      <label className="block text-sm font-bold mb-2 text-slate-700">Chia sẻ trải nghiệm của bạn:</label>
                      <textarea 
                          rows="4" 
                          required 
                          placeholder="Sản phẩm dùng có tốt không? Đóng gói có cẩn thận không?..." 
                          value={reviewForm.comment} 
                          onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})} 
                          className="w-full px-5 py-4 border border-slate-300 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 resize-none text-base text-slate-700 shadow-inner bg-slate-50 focus:bg-white transition-all"
                      />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={() => setShowReviewModal(false)} className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition text-sm">Hủy bỏ</button>
                      <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2">
                          Gửi Đánh Giá <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                      </button>
                  </div>
               </form>
           </div>
        </div>
      )}
    </div>
  );
}