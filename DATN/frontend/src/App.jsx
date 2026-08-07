import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from './context/AuthContext';
import { CartContext } from './context/CartContext';

import Login from './pages/Login'; 
import Register from './pages/Register';  
import Profile from './pages/Profile';

// ==========================================
// 1. TRANG CHỦ
// ==========================================
function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [activeBanners, setActiveBanners] = useState([]); 
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortOption, setSortOption] = useState('');
const uiSettings = JSON.parse(localStorage.getItem('app_ui_settings')) || { showSale: true, showCategories: true, showNews: true };
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
      }
  }, []);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === activeBanners.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
    axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data));
    axios.get('http://localhost:5000/api/brands').then(res => setBrands(res.data));
    axios.get('http://localhost:5000/api/banners/active').then(res => setActiveBanners(res.data)).catch(err => console.log(err));
    axios.get('http://localhost:5000/api/news').then(res => setNewsList(res.data.slice(0, 4))).catch(err => console.log(err));
  }, []);

  let processedProducts = products.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === '' || item.categoryId.toString() === selectedCategory;
    const matchBrand = selectedBrand === '' || item.brandId.toString() === selectedBrand;
    let matchPrice = true;
    if (priceRange === 'under5') matchPrice = item.price < 5000000;
    else if (priceRange === '5to15') matchPrice = item.price >= 5000000 && item.price <= 15000000;
    else if (priceRange === 'over15') matchPrice = item.price > 15000000;
    return matchSearch && matchCategory && matchBrand && matchPrice;
  });

  if (sortOption === 'priceAsc') processedProducts.sort((a, b) => a.price - b.price);
  else if (sortOption === 'priceDesc') processedProducts.sort((a, b) => b.price - a.price);
  else if (sortOption === 'nameAsc') processedProducts.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortOption === 'nameDesc') processedProducts.sort((a, b) => b.name.localeCompare(a.name));

  const clearFilters = () => { setSearchTerm(''); setSelectedCategory(''); setSelectedBrand(''); setPriceRange(''); setSortOption(''); }

  // LỌC CÁC SẢN PHẨM CÓ TÍCH Ô "ĐANG GIẢM GIÁ" TỪ ADMIN
  const discountedProducts = products.filter(item => item.isSale);
const newProducts = products.filter(item => item.isNew); // Lấy hàng mới
  const bestProducts = products.filter(item => item.isBest);
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* 1. KHỐI BANNER */}
      {activeBanners.length > 0 && (
        <div className="mb-12 w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative bg-slate-900 group">
          <div 
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {activeBanners.map((banner, index) => (
              <div key={banner.id} className="flex-none w-full relative" style={{ flex: '0 0 100%' }}>
                {banner.link ? (
                  <Link to={banner.link} className="block w-full h-full">
                    <img 
                      src={`http://localhost:5000${banner.imageUrl}`} 
                      alt={banner.title || `Banner ${index}`} 
                      className="block w-full h-[250px] md:h-[400px] object-cover hover:opacity-95 transition-opacity" 
                    />
                  </Link>
                ) : (
                  <img 
                    src={`http://localhost:5000${banner.imageUrl}`} 
                    alt={banner.title || `Banner ${index}`} 
                    className="block w-full h-[250px] md:h-[400px] object-cover" 
                  />
                )}
              </div>
            ))}
          </div>

          {activeBanners.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {activeBanners.map((_, idx) => (
                      <button 
                          key={idx} 
                          onClick={() => setCurrentBanner(idx)}
                          className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${currentBanner === idx ? 'bg-blue-600 w-8' : 'bg-white/70 w-2.5 hover:bg-white'}`}
                          aria-label={`Chuyển đến banner ${idx + 1}`}
                      />
                  ))}
              </div>
          )}
        </div>
      )}

      {/* 2. KHỐI SẢN PHẨM GIẢM GIÁ (Đã liên kết với cờ isSale) */}
      {discountedProducts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 uppercase tracking-wider flex items-center gap-2">
              ⚡ Ưu Đãi Tháng Này
            </h2>
            <div className="h-px bg-blue-200 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {discountedProducts.slice(0, 8).map(item => (
              <div key={`discount-${item.id}`} className="bg-white rounded-2xl flex flex-col border border-blue-100 overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] transition-all duration-300 hover:-translate-y-1 relative">
                
              {/* TEM NHÃN CHO HÀNG GIẢM GIÁ (ĐÃ LÀM MỚI UI) */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    {item.isNew && (
                        <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(56,189,248,0.4)] uppercase tracking-widest border border-white/50 backdrop-blur-sm">
                            <span className="text-xs">✨</span> MỚI
                        </span>
                    )}
                    {item.isBest && (
                        <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(245,158,11,0.4)] uppercase tracking-widest border border-white/50 backdrop-blur-sm">
                            <span className="text-xs">🔥</span> HOT
                        </span>
                    )}
                </div>
                <div className="absolute top-3 right-3 flex items-center justify-center bg-gradient-to-tr from-red-600 to-rose-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.4)] z-20 uppercase tracking-widest border-2 border-white">
                  Giảm Giá
                </div>

                <Link to={`/product/${item.id}`} className="block relative w-full h-64 p-6 bg-white flex items-center justify-center overflow-hidden">
                  {item.image ? 
                    <img src={`http://localhost:5000${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" /> 
                  : <div className="text-slate-300 text-sm font-medium">Chưa có ảnh</div>}
                </Link>
                <div className="p-5 flex flex-col flex-1 bg-blue-50/30 border-t border-blue-50">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 block">{item.category?.name || 'Đang Sale'}</span>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-base font-bold text-slate-800 mb-4 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem] leading-snug">{item.name}</h3>
                  </Link>
                  <div className="mt-auto">
                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-xl font-black text-blue-600 block">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                        <span className="text-sm font-semibold text-slate-400 line-through mb-0.5">{Number(item.price * 1.15).toLocaleString('vi-VN')} đ</span>
                      </div>
                      <button onClick={() => addToCart(item)} className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all duration-300 active:scale-95 shadow-md flex items-center justify-center gap-2">
                        Mua Ngay
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
{/* ======================================= */}
      {/* KHỐI SẢN PHẨM MỚI RA MẮT */}
      {/* ======================================= */}
      {newProducts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-600 uppercase tracking-wider flex items-center gap-2">
              ✨ Sản Phẩm Mới Lên Kệ
            </h2>
            <div className="h-px bg-cyan-200 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map(item => (
              <div key={`new-${item.id}`} className="bg-white rounded-2xl flex flex-col border border-slate-100 overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.15)] hover:border-cyan-300 transition-all duration-300 hover:-translate-y-1 relative">
                
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(56,189,248,0.4)] uppercase tracking-widest border border-white/50 backdrop-blur-sm">
                        <span className="text-xs">✨</span> MỚI
                    </span>
                    {item.isBest && <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-widest border border-white/50 backdrop-blur-sm"><span className="text-xs">🔥</span> HOT</span>}
                </div>
                {item.isSale && <div className="absolute top-3 right-3 flex items-center justify-center bg-gradient-to-tr from-red-600 to-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm z-20 uppercase tracking-widest border-2 border-white">Giảm Giá</div>}

                <Link to={`/product/${item.id}`} className="block relative w-full h-64 p-6 bg-white flex items-center justify-center overflow-hidden">
                  {item.image ? <img src={`http://localhost:5000${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" /> : <div className="text-slate-300 text-sm font-medium">Chưa có ảnh</div>}
                </Link>
                <div className="p-5 flex flex-col flex-1 bg-cyan-50/30 border-t border-cyan-50">
                  <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-2 block">{item.category?.name || 'Hàng Mới'}</span>
                  <Link to={`/product/${item.id}`}><h3 className="text-base font-bold text-slate-800 mb-4 hover:text-cyan-600 transition-colors line-clamp-2 min-h-[3rem] leading-snug">{item.name}</h3></Link>
                  <div className="mt-auto">
                      <div className="flex items-end gap-2 mb-4">
                          {item.sale_price > 0 ? (
                              <><span className="text-xl font-black text-red-600 block">{Number(item.sale_price).toLocaleString('vi-VN')} đ</span><span className="text-sm font-semibold text-slate-400 line-through mb-0.5">{Number(item.price).toLocaleString('vi-VN')} đ</span></>
                          ) : (
                              <span className="text-xl font-black text-cyan-700 block">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                          )}
                      </div>
                      <button onClick={() => addToCart(item)} className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-cyan-600 transition-all duration-300 active:scale-95 shadow-md">Mua Ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* KHỐI SẢN PHẨM BÁN CHẠY NHẤT */}
      {/* ======================================= */}
      {bestProducts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-orange-500 uppercase tracking-wider flex items-center gap-2">
              🏆 Bán Chạy Nhất
            </h2>
            <div className="h-px bg-orange-200 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestProducts.slice(0, 4).map(item => (
              <div key={`best-${item.id}`} className="bg-white rounded-2xl flex flex-col border border-slate-100 overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:border-orange-300 transition-all duration-300 hover:-translate-y-1 relative">
                
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(245,158,11,0.4)] uppercase tracking-widest border border-white/50 backdrop-blur-sm">
                        <span className="text-xs">🔥</span> HOT
                    </span>
                    {item.isNew && <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-widest border border-white/50 backdrop-blur-sm"><span className="text-xs">✨</span> MỚI</span>}
                </div>
                {item.isSale && <div className="absolute top-3 right-3 flex items-center justify-center bg-gradient-to-tr from-red-600 to-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm z-20 uppercase tracking-widest border-2 border-white">Giảm Giá</div>}

                <Link to={`/product/${item.id}`} className="block relative w-full h-64 p-6 bg-white flex items-center justify-center overflow-hidden">
                  {item.image ? <img src={`http://localhost:5000${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" /> : <div className="text-slate-300 text-sm font-medium">Chưa có ảnh</div>}
                </Link>
                <div className="p-5 flex flex-col flex-1 bg-orange-50/30 border-t border-orange-50">
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2 block">{item.category?.name || 'Bán Chạy'}</span>
                  <Link to={`/product/${item.id}`}><h3 className="text-base font-bold text-slate-800 mb-4 hover:text-orange-600 transition-colors line-clamp-2 min-h-[3rem] leading-snug">{item.name}</h3></Link>
                  <div className="mt-auto">
                      <div className="flex items-end gap-2 mb-4">
                          {item.sale_price > 0 ? (
                              <><span className="text-xl font-black text-red-600 block">{Number(item.sale_price).toLocaleString('vi-VN')} đ</span><span className="text-sm font-semibold text-slate-400 line-through mb-0.5">{Number(item.price).toLocaleString('vi-VN')} đ</span></>
                          ) : (
                              <span className="text-xl font-black text-orange-700 block">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                          )}
                      </div>
                      <button onClick={() => addToCart(item)} className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 active:scale-95 shadow-md">Mua Ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 3. BỘ LỌC VÀ KHU VỰC HIỂN THỊ THEO DANH MỤC */}
      <div className="flex items-center justify-center gap-4 mb-8 mt-12">
         <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
         <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white text-center uppercase tracking-wider">Danh Mục Sản Phẩm</h2>
         <div className="h-px bg-slate-200 flex-1 max-w-[100px]"></div>
      </div>
      
      {/* THANH TÌM KIẾM & BỘ LỌC */}
      <div className="max-w-6xl mx-auto mb-14 bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
        <div className="flex flex-col lg:flex-row gap-4">
          
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input type="text" placeholder="Tìm kiếm máy ảnh, ống kính..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-slate-50 focus:bg-white font-medium text-slate-700" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none bg-slate-50 focus:bg-white font-medium text-slate-600 transition-all cursor-pointer text-sm">
              <option value="">📦 Mọi danh mục</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="px-3 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none bg-slate-50 focus:bg-white font-medium text-slate-600 transition-all cursor-pointer text-sm">
              <option value="">🏷️ Mọi hãng</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>

            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="px-3 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none bg-slate-50 focus:bg-white font-medium text-slate-600 transition-all cursor-pointer text-sm">
              <option value="">💰 Mọi mức giá</option>
              <option value="under5">Dưới 5 triệu</option>
              <option value="5to15">Từ 5 - 15 triệu</option>
              <option value="over15">Trên 15 triệu</option>
            </select>

            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="px-3 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none bg-slate-50 focus:bg-white font-medium text-slate-600 transition-all cursor-pointer text-sm">
              <option value="">↕️ Sắp xếp</option>
              <option value="priceAsc">Giá: Thấp đến Cao</option>
              <option value="priceDesc">Giá: Cao đến Thấp</option>
              <option value="nameAsc">Tên: A - Z</option>
              <option value="nameDesc">Tên: Z - A</option>
            </select>
          </div>
          
        </div>
      </div>

      {/* HIỂN THỊ SẢN PHẨM THEO TỪNG DANH MỤC */}
      {processedProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mb-12">
            <span className="text-5xl mb-4 block">🧐</span>
            <p className="text-slate-500 text-lg font-medium">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
            <button onClick={clearFilters} className="mt-6 text-white font-bold bg-slate-900 px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-md">Xóa bộ lọc</button>
        </div>
      ) : (
        categories.map(category => {
            const categoryProducts = processedProducts.filter(item => 
                item.categoryId === category.id || item.categoryId?.toString() === category.id.toString()
            );

            if (categoryProducts.length === 0) return null;

            return (
                <div key={`cat-${category.id}`} className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                            {category.name}
                        </h2>
                        <div className="h-0.5 bg-blue-600 w-16"></div>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryProducts.slice(0, 8).map(item => (
                            <div key={item.id} className="bg-white rounded-2xl flex flex-col border border-slate-100 overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 relative">
                                
                               {/* TEM NHÃN CHO HÀNG BÌNH THƯỜNG (ĐÃ LÀM MỚI UI) */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                                    {item.isNew && (
                                        <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(56,189,248,0.4)] uppercase tracking-widest border border-white/50 backdrop-blur-sm">
                                            <span className="text-xs">✨</span> MỚI
                                        </span>
                                    )}
                                    {item.isBest && (
                                        <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_4px_10px_rgba(245,158,11,0.4)] uppercase tracking-widest border border-white/50 backdrop-blur-sm">
                                            <span className="text-xs">🔥</span> HOT
                                        </span>
                                    )}
                                </div>
                                {item.isSale && (
                                    <div className="absolute top-3 right-3 flex items-center justify-center bg-gradient-to-tr from-red-600 to-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.4)] z-20 uppercase tracking-widest border-2 border-white">
                                        Giảm Giá
                                    </div>
                                )}

                                <Link to={`/product/${item.id}`} className="block relative w-full h-64 p-6 bg-white flex items-center justify-center overflow-hidden">
                                    {item.image ? 
                                    <img src={`http://localhost:5000${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" /> 
                                    : <div className="text-slate-300 text-sm font-medium">Chưa có ảnh</div>}
                                </Link>
                                <div className="p-5 flex flex-col flex-1 bg-slate-50/50 border-t border-slate-50">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{item.category?.name || 'Phụ kiện'}</span>
                                    <Link to={`/product/${item.id}`}>
                                    <h3 className="text-base font-bold text-slate-800 mb-4 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem] leading-snug">{item.name}</h3>
                                    </Link>
                                    <div className="mt-auto">
                                        <span className="text-xl font-black text-slate-900 block mb-4">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                                        <button onClick={() => addToCart(item)} className="w-full bg-white border-2 border-slate-900 text-slate-900 py-2.5 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn">
                                            <svg className="w-5 h-5 text-slate-900 group-hover/btn:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        })
      )}

      {/* 4. TIN TỨC & ĐÁNH GIÁ */}
      {newsList.length > 0 && (
        <div className="mt-16 border-t border-slate-100 pt-16 mb-8">
          <div className="flex justify-between items-end mb-8"><h2 className="text-3xl font-extrabold text-slate-800 dark:text-white uppercase tracking-wide">Tin Tức & Đánh Giá</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsList.map(news => (
              <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <Link to={`/news/${news.id}`} className="block overflow-hidden relative">
                  {news.thumbnail ? <img src={`http://localhost:5000${news.thumbnail}`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" alt={news.title}/> : <div className="w-full h-48 bg-slate-50 flex items-center justify-center text-slate-400">Chưa có ảnh</div>}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded shadow uppercase tracking-wide">Mới</div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <Link to={`/news/${news.id}`}><h3 className="font-bold text-base text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">{news.title}</h3></Link>
                  <div className="mt-auto flex justify-between items-center text-xs text-slate-500 font-bold pt-4 border-t border-slate-50 uppercase"><span>{new Date(news.createdAt).toLocaleDateString('vi-VN')}</span><span className="flex items-center gap-1">👁️ {news.views}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// ==========================================
// 2. TRANG CHI TIẾT SẢN PHẨM 
// ==========================================
// 2. TRANG CHI TIẾT SẢN PHẨM 
// ==========================================
function ProductDetail() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [addQty, setAddQty] = useState(1);

  // MỚI THÊM: State quản lý trạng thái Yêu thích (Đã thả tim hay chưa)
  const [isFavorite, setIsFavorite] = useState(false);

  // Ép trình duyệt cuộn lên đầu trang (Tọa độ X: 0, Y: 0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); 

  useEffect(() => {
    // 1. Tải thông tin sản phẩm hiện tại
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
         setProduct(res.data);
         if (res.data.image) setActiveImg(`http://localhost:5000${res.data.image}`);
         else if (res.data.gallery && res.data.gallery.length > 0) setActiveImg(res.data.gallery[0]); 
         if (res.data.colors && res.data.colors.length > 0) setSelectedColor(res.data.colors[0]);

         // MỚI: Lấy danh sách sản phẩm liên quan (Cùng Category, trừ chính nó ra)
         axios.get('http://localhost:5000/api/products')
            .then(allRes => {
                const filtered = allRes.data.filter(p => p.categoryId === res.data.categoryId && p.id !== res.data.id).slice(0, 4);
                setRelatedProducts(filtered);
            }).catch(err => console.log(err));

      }).catch(err => console.error(err));
      
    // 2. Tải đánh giá
    axios.get(`http://localhost:5000/api/products/${id}/reviews`).then(res => setReviews(res.data)).catch(err => console.error(err));

    // 3. MỚI THÊM: Kiểm tra xem sản phẩm này đã có trong danh sách yêu thích chưa
    const checkWishlistStatus = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await axios.get('http://localhost:5000/api/wishlist', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Nếu sản phẩm hiện tại có nằm trong list trả về -> Bật cờ isFavorite = true
                const isFav = res.data.some(item => item.productId === parseInt(id));
                setIsFavorite(isFav);
            } catch (error) {
                console.error("Lỗi kiểm tra trạng thái yêu thích:", error);
            }
        }
    };
    checkWishlistStatus();
  }, [id]);

  // MỚI THÊM: Hàm xử lý bấm thả tim
  const toggleFavorite = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
          toast.warning("Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích!");
          navigate('/login');
          return;
      }
      try {
          const res = await axios.post('http://localhost:5000/api/wishlist/toggle', { productId: id }, {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          // Cập nhật lại UI dựa theo phản hồi của Backend
          setIsFavorite(res.data.isLiked);
          if (res.data.isLiked) {
              toast.success("Đã lưu vào Danh sách yêu thích! ❤️");
          } else {
              toast.info("Đã bỏ khỏi Danh sách yêu thích.");
          }
      } catch (error) {
          toast.error("Lỗi khi cập nhật danh sách yêu thích!");
      }
  };

  const submitReview = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) { toast.warning("Vui lòng đăng nhập để gửi đánh giá!"); navigate('/login'); return; }
      if (!reviewForm.comment.trim()) { toast.warning("Vui lòng nhập nội dung đánh giá!"); return; }
      try {
          await axios.post(`http://localhost:5000/api/products/${id}/reviews`, reviewForm, { headers: { Authorization: `Bearer ${token}` } });
          toast.success("Đánh giá thành công!");
          setReviewForm({ rating: 5, comment: '' });
          const res = await axios.get(`http://localhost:5000/api/products/${id}/reviews`);
          setReviews(res.data);
      } catch (error) { toast.error("Có lỗi xảy ra khi gửi đánh giá!"); }
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : 0;
  
  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Đang tải dữ liệu sản phẩm...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Nút Back */}
      <button onClick={() => navigate(-1)} className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors w-fit">
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
        Quay lại
      </button>
      
      {/* KHỐI THÔNG TIN CHÍNH */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col lg:flex-row gap-12 mb-12">
        
        {/* Cột trái: Hình ảnh */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="w-full aspect-[4/3] bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden relative group">
            {activeImg ? (
                <img src={activeImg} className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" alt={product.name} />
            ) : (
                <span className="text-slate-300 font-medium flex flex-col items-center gap-2"><span className="text-4xl">📷</span>Chưa có hình ảnh</span>
            )}
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.image && (
                <img src={`http://localhost:5000${product.image}`} onClick={() => setActiveImg(`http://localhost:5000${product.image}`)} className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl border-2 cursor-pointer transition-all flex-shrink-0 ${activeImg === `http://localhost:5000${product.image}` ? 'border-blue-600 shadow-md ring-4 ring-blue-50' : 'border-slate-100 hover:border-blue-300 opacity-70 hover:opacity-100'}`} alt="Main"/>
            )}
            {product.gallery && product.gallery.map((imgUrl, index) => (
                <img key={index} src={imgUrl} onClick={() => setActiveImg(imgUrl)} className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl border-2 cursor-pointer transition-all flex-shrink-0 ${activeImg === imgUrl ? 'border-blue-600 shadow-md ring-4 ring-blue-50' : 'border-slate-100 hover:border-blue-300 opacity-70 hover:opacity-100'}`} alt={`Gallery ${index}`} />
            ))}
          </div>

          {/* Khối Đặc quyền / Chính sách mua hàng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">🛡️</div>
                  <div>
                      <p className="font-extrabold text-slate-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">Bảo hành 24 tháng</p>
                      <p className="text-xs text-slate-500 font-medium">Chính hãng toàn quốc</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">🔄</div>
                  <div>
                      <p className="font-extrabold text-slate-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">Lỗi là đổi mới</p>
                      <p className="text-xs text-slate-500 font-medium">Trong 30 ngày đầu tiên</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">📦</div>
                  <div>
                      <p className="font-extrabold text-slate-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">Miễn phí giao hàng</p>
                      <p className="text-xs text-slate-500 font-medium">Cho đơn từ 5.000.000đ</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">💳</div>
                  <div>
                      <p className="font-extrabold text-slate-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">Thanh toán an toàn</p>
                      <p className="text-xs text-slate-500 font-medium">Hỗ trợ trả góp 0%</p>
                  </div>
              </div>
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-3">
              <span className="bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md">{product.category?.name || 'Sản phẩm'}</span>
              {product.brand && <span className="text-slate-500 text-sm font-bold border-l pl-3">Hãng: {product.brand.name}</span>}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center text-orange-400 text-lg">
                {"★".repeat(Math.round(avgRating))}{"☆".repeat(5 - Math.round(avgRating))}
              </div>
              <span className="text-slate-900 font-bold">{avgRating}</span>
              <span className="text-slate-400 font-medium text-sm">({reviews.length} đánh giá)</span>
          </div>

          <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
              <span className="text-4xl font-black text-slate-900">{Number(product.price).toLocaleString('vi-VN')} đ</span>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
                <h3 className="font-bold text-slate-800 mb-3 uppercase tracking-wide text-sm">Màu sắc lựa chọn:</h3>
                <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                        <button key={index} onClick={() => setSelectedColor(color)} className={`px-6 py-2.5 rounded-full border-2 font-bold transition-all ${selectedColor === color ? 'border-blue-600 text-blue-700 bg-blue-50 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                            {color}
                        </button>
                    ))}
                </div>
            </div>
          )}

         {/* MỚI: Khối hiển thị tồn kho và Chọn số lượng */}
          <div className="mb-8 flex flex-col gap-4">
             {product.quantity > 0 ? (
                 <div className="flex flex-wrap items-center gap-6">
                     <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg font-bold border border-green-100">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                         Còn hàng ({product.quantity} sản phẩm)
                     </div>
                     
                     {/* BỘ CHỌN SỐ LƯỢNG MỚI */}
                     <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                        <button 
                            onClick={() => setAddQty(prev => prev > 1 ? prev - 1 : 1)} 
                            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600 font-bold transition text-lg"
                        >-</button>
                        <span className="font-bold w-12 text-center text-slate-800 text-lg">{addQty}</span>
                        <button 
                            onClick={() => setAddQty(prev => prev < product.quantity ? prev + 1 : prev)} 
                            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600 font-bold transition text-lg"
                        >+</button>
                    </div>
                 </div>
             ) : (
                 <div className="inline-flex items-center w-fit gap-2 text-red-700 bg-red-50 px-4 py-2 rounded-lg font-bold border border-red-100">
                     <span className="w-2 h-2 rounded-full bg-red-500"></span>
                     Tạm hết hàng
                 </div>
             )}
          </div>

          <div className="flex gap-4">
              <button 
                  onClick={() => { 
                      if (product.colors && product.colors.length > 0 && !selectedColor) { 
                          toast.warning("Vui lòng chọn một màu sắc trước khi mua!"); return; 
                      } 
                      // Truyền số lượng addQty vào giỏ hàng
                      addToCart({ ...product, selectedColor }, addQty); 
                  }} 
                  disabled={product.quantity === 0} // Khóa nút nếu hết hàng
                  className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${product.quantity > 0 ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)] active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  THÊM VÀO GIỎ HÀNG
              </button>

              {/* Nút thả tim (Yêu thích) */}
              <button 
                  onClick={toggleFavorite} 
                  title="Thêm vào danh sách yêu thích" 
                  className={`w-16 flex-shrink-0 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 active:scale-95 group ${isFavorite ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-white border-slate-200 hover:border-red-200 hover:bg-red-50'}`}
              >
                  {isFavorite ? (
                      <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  ) : (
                      <svg className="w-7 h-7 text-slate-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  )}
              </button>
          </div>

          {/* Thông số kỹ thuật */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-10 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="font-black text-slate-800 uppercase tracking-wide">Thông số kỹ thuật</h3>
                </div>
                <div className="flex flex-col">
                    {Object.entries(product.specs).map(([key, value], index) => (
                        <div key={index} className={`flex justify-between px-6 py-4 border-b border-slate-100 last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                            <span className="text-slate-500 font-medium w-1/3">{key}</span>
                            <span className="font-bold text-slate-900 w-2/3 text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
          )}
        </div>
      </div>

      {/* KHỐI ĐÁNH GIÁ SẢN PHẨM */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-600">💬</span> Đánh Giá Sản Phẩm
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12">
              {/* Cột gửi đánh giá */}
              <div className="lg:w-1/3">
                  <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-inner">
                      <h3 className="font-bold text-lg mb-6 text-slate-800">Chia sẻ trải nghiệm của bạn</h3>
                      {user ? (
                          <form onSubmit={submitReview} className="flex flex-col gap-5">
                              <div>
                                  <label className="block text-sm font-bold mb-3 text-slate-600">Chất lượng sản phẩm:</label>
                                  <div className="flex gap-2">
                                      {[1, 2, 3, 4, 5].map(star => (
                                          <button type="button" key={star} onClick={() => setReviewForm({...reviewForm, rating: star})} className={`text-3xl transition-transform hover:scale-110 ${reviewForm.rating >= star ? 'text-orange-400' : 'text-slate-300'}`}>
                                              ★
                                          </button>
                                      ))}
                                  </div>
                              </div>
                              <div>
                                  <textarea rows="4" required placeholder="Nhập cảm nhận của bạn về sản phẩm này..." value={reviewForm.comment} onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})} className="w-full px-5 py-4 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 resize-none text-slate-700 bg-white transition-all"></textarea>
                              </div>
                              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                                  Gửi Đánh Giá <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                              </button>
                          </form>
                      ) : (
                          <div className="text-center py-10 bg-white rounded-xl border border-slate-200">
                              <span className="text-4xl mb-3 block opacity-50">🔒</span>
                              <p className="text-slate-500 mb-5 text-sm px-4">Vui lòng đăng nhập để lại bình luận cho sản phẩm này.</p>
                              <Link to="/login" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md">
                                  Đăng Nhập Ngay
                              </Link>
                          </div>
                      )}
                  </div>
              </div>

              {/* Cột danh sách đánh giá */}
              <div className="lg:w-2/3 flex flex-col gap-5">
                  {reviews.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-2xl border border-dashed border-slate-300 py-16">
                          <span className="text-5xl mb-4 opacity-30">💭</span>
                          <p className="text-slate-500 font-medium">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                      </div>
                  ) : (
                      reviews.map(review => (
                          <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-5 hover:shadow-md transition-shadow hover:border-blue-100 group">
                              {review.user?.avatar ? (
                                  <img src={`http://localhost:5000${review.user.avatar}`} alt="avatar" className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 bg-slate-50 flex-shrink-0" /> 
                              ) : (
                                  <div className="w-14 h-14 bg-blue-100 text-blue-600 font-black flex items-center justify-center rounded-full border-2 border-blue-200 flex-shrink-0 text-xl">
                                      {review.user?.name ? review.user.name.charAt(0).toUpperCase() : 'U'}
                                  </div>
                              )}
                              <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                      <div>
                                          <h4 className="font-bold text-slate-900 text-lg">{review.user?.name || 'Khách hàng'}</h4>
                                          <div className="flex text-orange-400 text-sm mt-1 tracking-wider">
                                              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                          </div>
                                      </div>
                                      <span className="text-sm text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                          {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                      </span>
                                  </div>
                                  <p className="text-slate-700 text-base leading-relaxed mt-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                      {review.comment}
                                  </p>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>
      </div>
      {/* KHỐI SẢN PHẨM LIÊN QUAN */}
      {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-wider flex items-center gap-3">
                  <span className="text-blue-600">🔗</span> Sản Phẩm Cùng Danh Mục
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {relatedProducts.map(item => (
                      <div key={`related-${item.id}`} className="bg-white rounded-2xl flex flex-col border border-slate-100 overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                          <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0,0)} className="block relative w-full h-56 p-4 bg-white flex items-center justify-center overflow-hidden">
                              {item.image ? 
                                <img src={`http://localhost:5000${item.image}`} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" /> 
                              : <div className="text-slate-300 text-sm font-medium">Chưa có ảnh</div>}
                          </Link>
                          <div className="p-5 flex flex-col flex-1 bg-slate-50/50 border-t border-slate-50">
                              <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0,0)}>
                                  <h3 className="text-sm font-bold text-slate-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">{item.name}</h3>
                              </Link>
                              <div className="mt-auto">
                                  {item.sale_price > 0 ? (
                                      <div className="flex flex-col">
                                          <span className="text-lg font-black text-red-600 block">{Number(item.sale_price).toLocaleString('vi-VN')} đ</span>
                                          <span className="text-xs font-semibold text-slate-400 line-through">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                                      </div>
                                  ) : (
                                      <span className="text-lg font-black text-slate-900 block">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  )
}

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/${id}`).then(res => setArticle(res.data)).catch(err => console.error("Lỗi lấy bài viết:", err));
  }, [id]);

  if (!article) return <div className="text-center mt-20 text-xl font-medium h-64 flex items-center justify-center">Đang tải bài viết...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 font-bold hover:underline flex items-center gap-2">← Quay lại</button>
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{article.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-8 border-b border-gray-100 pb-6 font-medium"><span className="bg-gray-100 px-3 py-1 rounded-full">🕒 Đăng ngày: {new Date(article.createdAt).toLocaleDateString('vi-VN')}</span><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">👁️ {article.views} lượt xem</span>{article.author && <span className="bg-gray-100 px-3 py-1 rounded-full">✍️ Tác giả: {article.author.name}</span>}</div>
        {article.thumbnail && <img src={`http://localhost:5000${article.thumbnail}`} alt={article.title} className="w-full h-auto rounded-xl mb-10 shadow-sm object-cover max-h-[500px]" />}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
}

// ==========================================
// 3. TRANG GIỎ HÀNG 
// ==========================================
// 3. TRANG GIỎ HÀNG 
function Cart() {
  const { cart, updateQty, removeItem, clearCart, clearSelectedItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // =====================================
  // TÍNH NĂNG CHỌN SẢN PHẨM THANH TOÁN
  // =====================================
  const [selectedKeys, setSelectedKeys] = useState([]); 
  const hasInitialized = useRef(false); // Fix lỗi tự động chọn lại tất cả

  // Chỉ tự động chọn tất cả 1 LẦN DUY NHẤT khi mới vào giỏ hàng
  useEffect(() => {
      if (cart.length > 0 && !hasInitialized.current) {
          setSelectedKeys(cart.map(item => `${item.id}-${item.selectedColor}`));
          hasInitialized.current = true;
      }
  }, [cart]);

  // Tính toán dữ liệu CHỈ CHO NHỮNG SẢN PHẨM ĐƯỢC CHỌN
  const selectedCartItems = cart.filter(item => selectedKeys.includes(`${item.id}-${item.selectedColor}`));
  const selectedTotalPrice = selectedCartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Xử lý Checkbox từng sản phẩm
  const handleToggleItem = (item) => {
      const key = `${item.id}-${item.selectedColor}`;
      setSelectedKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  // Xử lý Checkbox Chọn tất cả
  const handleToggleAll = () => {
      if (selectedKeys.length === cart.length) {
          setSelectedKeys([]); // Bỏ chọn hết
      } else {
          setSelectedKeys(cart.map(item => `${item.id}-${item.selectedColor}`)); // Chọn tất cả
      }
  };
  // =====================================

  const paymentOptions = [
      { id: 'COD', title: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán bằng tiền mặt hoặc quẹt thẻ máy POS khi nhận hàng.', icon: '💵' },
      { id: 'BANK_TRANSFER', title: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản thủ công qua Internet Banking hoặc Mobile Banking.', icon: '🏦' },
      { id: 'PAYOS', title: 'Cổng thanh toán tự động (PayOS)', desc: 'Thanh toán an toàn bằng thẻ ATM, Visa, MasterCard qua cổng PayOS.', icon: '💳' },
      { id: 'EWALLET', title: 'Ví điện tử', desc: 'Quét mã QR thanh toán qua MoMo, ZaloPay, VNPay, Viettel Money.', icon: '📱' }
  ];

  // Xử lý PayOS Return
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    if (status === 'success') { 
        toast.success('🎉 Chúc mừng! Bạn đã thanh toán thành công.'); 
        
        const pending = JSON.parse(localStorage.getItem('pending_checkout') || '[]');
        if (pending.length > 0) {
            clearSelectedItems(pending); // Chỉ xóa MÓN ĐÃ THANH TOÁN
            localStorage.removeItem('pending_checkout');
        } else {
            clearCart(); 
        }
        window.history.replaceState(null, '', '/cart'); 
    } 
    else if (status === 'cancel') { 
        toast.error('❌ Bạn đã hủy giao dịch thanh toán.'); 
        localStorage.removeItem('pending_checkout');
        window.history.replaceState(null, '', '/cart'); 
    }
  }, []); // Cần để mảng [] rỗng để chạy đúng 1 lần khi load trang

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (user) {
        setShippingInfo(prev => ({ ...prev, fullName: user.fullName || user.name || '', phone: user.phone || '' }));
        if (token) {
            axios.get('http://localhost:5000/api/addresses', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                const addresses = res.data;
                if (addresses.length > 0) {
                    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
                    setShippingInfo({ fullName: defaultAddr.fullName, phone: defaultAddr.phone, address: defaultAddr.fullAddress });
                }
            }).catch(err => console.log("Chưa lấy được sổ địa chỉ", err));
        }
    }
  }, [user]);

  const handleProceedToCheckout = () => {
    if (!user) { toast.warning("Vui lòng đăng nhập để tiến hành thanh toán!"); setTimeout(() => window.location.href = '/login', 1500); return; }
    if (selectedCartItems.length === 0) { toast.warning("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng!"); return; }
    setShowCheckoutForm(true);
  };

  const submitCheckoutForm = async (e) => {
    e.preventDefault();
    if (selectedCartItems.length === 0) return toast.warning("Vui lòng chọn sản phẩm!");
    
    try {
      const btn = document.getElementById('checkoutBtn');
      if (btn) { btn.innerHTML = 'Đang xử lý...'; btn.disabled = true; }
      
      // LƯU TẠM VÀO LOCALSTORAGE TRƯỚC KHI ĐI PAYOS
      localStorage.setItem('pending_checkout', JSON.stringify(selectedCartItems));

      const res = await axios.post('http://localhost:5000/api/checkout', { 
          cartItems: selectedCartItems, // Chỉ gửi dữ liệu các SP được tích chọn
          totalAmount: selectedTotalPrice, // Gửi Tổng tiền đã lọc
          userId: user.id, 
          shippingInfo: shippingInfo,
          paymentMethod: paymentMethod 
      });
      
      if (res.data.checkoutUrl) {
          window.location.href = res.data.checkoutUrl;
      } else if (res.data.success) {
          toast.success('🎉 Đặt hàng thành công! Đang chuyển hướng...');
          setTimeout(() => {
              clearSelectedItems(selectedCartItems); // Xóa ĐÚNG món đã mua
              localStorage.removeItem('pending_checkout');
              navigate('/profile');
          }, 1500); 
      }
    } catch (error) {
      toast.error("Lỗi tạo thanh toán. Kiểm tra lại server!");
      const btn = document.getElementById('checkoutBtn');
      if(btn) { btn.innerHTML = 'Xác nhận & Đặt hàng'; btn.disabled = false; }
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
     <h2 className="text-3xl font-extrabold mb-8 text-slate-800 dark:text-white">Giỏ Hàng Của Bạn</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-5xl mb-4 block">🛒</span>
            <p className="text-slate-500 font-medium mb-6">Giỏ hàng của bạn đang trống.</p>
            <Link to="/" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-600 transition-all">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
            
            {/* Thanh Chọn Tất Cả */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <input 
                    type="checkbox" 
                    checked={cart.length > 0 && selectedKeys.length === cart.length} 
                    onChange={handleToggleAll} 
                    className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0 rounded" 
                />
                <span className="font-bold text-slate-800 text-lg">Chọn tất cả ({cart.length} sản phẩm)</span>
            </div>

            {cart.map(item => (
              <div key={`${item.id}-${item.selectedColor}`} className="flex items-center gap-4 py-5 border-b border-slate-50 last:border-0 last:pb-0 transition-colors hover:bg-slate-50/50 p-2 rounded-xl">
                
                {/* Checkbox cho từng SP */}
                <input 
                    type="checkbox" 
                    checked={selectedKeys.includes(`${item.id}-${item.selectedColor}`)} 
                    onChange={() => handleToggleItem(item)} 
                    className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0 rounded" 
                />

                <div className="w-24 h-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={`http://localhost:5000${item.image}`} className="w-full h-full object-cover mix-blend-multiply" alt={item.name} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 line-clamp-2 leading-snug hover:text-blue-600 cursor-pointer transition" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                  {item.selectedColor && <p className="text-xs text-slate-500 font-bold mt-1.5 bg-slate-100 w-fit px-2 py-1 rounded">Màu: {item.selectedColor}</p>}
                  <p className="text-red-600 font-black mt-2 text-base">{Number(item.price).toLocaleString('vi-VN')} đ</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600 font-bold transition">-</button>
                        <span className="font-bold w-8 text-center text-sm text-slate-800">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600 font-bold transition">+</button>
                    </div>
                    {/* Sửa lại hàm Xóa để nhận chính xác ID và Màu */}
                    <button onClick={() => removeItem(item.id, item.selectedColor)} className="text-slate-400 hover:text-red-600 text-sm font-bold flex items-center gap-1 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Xóa
                    </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-2/5 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                <h3 className="text-xl font-bold border-b border-slate-100 pb-4 mb-5 text-slate-800">Tóm tắt đơn hàng</h3>
                <div className="flex justify-between mb-3 text-slate-600 font-medium">
                    <span>Đã chọn ({selectedCartItems.reduce((sum, item) => sum + item.qty, 0)} sản phẩm):</span>
                    <span className="text-slate-900 font-bold">{selectedTotalPrice.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between mb-5 text-slate-600 font-medium"><span>Phí vận chuyển:</span><span className="text-green-600 font-bold">Miễn phí</span></div>
                <div className="flex justify-between items-center mb-6 border-t border-slate-100 pt-5">
                    <span className="text-slate-800 font-bold text-lg">Tổng thanh toán:</span>
                    <span className="font-black text-red-600 text-2xl">{selectedTotalPrice.toLocaleString('vi-VN')} đ</span>
                </div>
                {!showCheckoutForm ? (
                    <button 
                        onClick={handleProceedToCheckout} 
                        disabled={selectedCartItems.length === 0}
                        className={`w-full py-4 rounded-xl font-bold transition-all shadow-md text-lg ${selectedCartItems.length > 0 ? 'bg-slate-900 text-white hover:bg-blue-600 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                        Tiến Hành Đặt Hàng
                    </button>
                ) : null}
              </div>

              {showCheckoutForm && (
                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-blue-200 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
                    <h3 className="text-xl font-black mb-6 text-slate-800 flex items-center gap-2">
                        <span className="text-blue-600">📍</span> Thông tin nhận hàng
                    </h3>
                    
                    <form onSubmit={submitCheckoutForm} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Họ và Tên người nhận</label>
                            <input type="text" required value={shippingInfo.fullName} onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})} className="w-full px-5 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition bg-slate-50 focus:bg-white" placeholder="Nhập tên đầy đủ..." />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại</label>
                            <input type="text" required value={shippingInfo.phone} onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})} className="w-full px-5 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition bg-slate-50 focus:bg-white" placeholder="Nhập số điện thoại liên hệ..." />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Địa chỉ giao hàng chi tiết</label>
                            <textarea required rows="3" value={shippingInfo.address} onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})} className="w-full px-5 py-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition bg-slate-50 focus:bg-white resize-y" placeholder="Ví dụ: Số 123, Đường ABC, Phường X, Quận Y..." ></textarea>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">💳</span> Phương thức thanh toán
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-3">
                                {paymentOptions.map((opt) => (
                                    <label key={opt.id} className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${paymentMethod === opt.id ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50'}`}>
                                        <input type="radio" name="paymentMethod" value={opt.id} checked={paymentMethod === opt.id} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                                        
                                        <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 transition-all duration-300 ${paymentMethod === opt.id ? 'border-[6px] border-blue-600' : 'border-slate-300'}`}></div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{opt.icon}</span>
                                                <p className="font-bold text-slate-800">{opt.title}</p>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1 pl-8 leading-relaxed">{opt.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {paymentMethod === 'BANK_TRANSFER' && (
                                <div className="mt-4 p-5 bg-white rounded-2xl border border-blue-200 text-sm space-y-2.5 text-slate-700 shadow-sm animate-fade-in relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                                    <p className="flex justify-between items-center"><span className="text-slate-500 font-medium">Ngân hàng:</span> <strong className="text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">Vietcombank</strong></p>
                                    <p className="flex justify-between items-center"><span className="text-slate-500 font-medium">Số tài khoản:</span> <strong className="text-slate-900 text-lg tracking-wider">1012345678</strong></p>
                                    <p className="flex justify-between items-center"><span className="text-slate-500 font-medium">Chủ tài khoản:</span> <strong className="text-slate-900 uppercase">NGUYEN TAM DUY CUONG</strong></p>
                                    <div className="border-t border-slate-100 pt-3 mt-3">
                                        <p className="text-slate-500 font-medium text-xs mb-1.5">Nội dung chuyển khoản (Bắt buộc ghi chính xác):</p>
                                        <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-center flex items-center justify-center gap-2">
                                            <span className="font-mono text-blue-700 font-black text-lg tracking-wider">THANHTOAN {user?.phone || 'DONHANG'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <button type="submit" id="checkoutBtn" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-[0_4px_12px_rgba(37,99,235,0.2)] active:scale-[0.98] text-lg">
                                Xác nhận & Thanh toán
                            </button>
                            <button type="button" onClick={() => setShowCheckoutForm(false)} className="w-full bg-slate-100 text-slate-600 hover:text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-200 transition">
                                Quay lại
                            </button>
                        </div>
                    </form>
                 </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
// 4. TRANG QUẢN TRỊ ADMIN (DASHBOARD PRO V2)
// ==========================================
function Admin() {
  const navigate = useNavigate(); 
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin_token') !== null);
  const [adminRole, setAdminRole] = useState(() => localStorage.getItem('admin_role') || 'ADMIN');
  const [activeTab, setActiveTab] = useState(() => {
     const role = localStorage.getItem('admin_role');
     return role === 'EDITOR' ? 'news' : 'dashboard'; 
  }); 

  const [orders, setOrders] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [productPage, setProductPage] = useState(1);
  const [totalProductPages, setTotalProductPages] = useState(1);
  const [categories, setCategories] = useState([]); 
  const [brands, setBrands] = useState([]);
  const [users, setUsers] = useState([]); 
  const [banners, setBanners] = useState([]);
  const [news, setNews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerForm, setBannerForm] = useState({ title: '', link: '' });
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [newsFile, setNewsFile] = useState(null);
  const [newsForm, setNewsForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null); 
  const [imageFile, setImageFile] = useState(null);
  

  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [selectedAdminOrder, setSelectedAdminOrder] = useState(null);
  
  // --- STATE MỚI CHO BÁO CÁO DOANH THU PRO ---
  // --- STATE MỚI CHO BÁO CÁO DOANH THU PRO ---
  const [dashboardData, setDashboardData] = useState(null);
  const [dateRange, setDateRange] = useState('30days'); 
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const dashboardPrintRef = useRef(null);
  const adminPrintRef = useRef(null);

  // State cho Danh mục
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [editingCatId, setEditingCatId] = useState(null);

  // Khai báo formData duy nhất (chứa đầy đủ các cờ isNew, isSale, isBest)
const [formData, setFormData] = useState({ 
      name: '', price: '', salePrice: '', quantity: '10', categoryId: '', brandId: '', 
      colors: '', gallery: '', specs: '', 
      isNew: true, isSale: false, isBest: false 
  });

  // Màu sắc cho biểu đồ Tròn
  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B5CF6'];
// STATE CHO CÀI ĐẶT GIAO DIỆN
  const [uiSettings, setUiSettings] = useState(() => {
      return JSON.parse(localStorage.getItem('app_ui_settings')) || { 
          shopName: 'CAMERA', shopHighlight: 'SHOP', 
          showSale: true, showCategories: true, showNews: true 
      };
  });

  const saveSettings = (e) => {
      e.preventDefault();
      localStorage.setItem('app_ui_settings', JSON.stringify(uiSettings));
      toast.success("Cập nhật giao diện thành công! Hệ thống sẽ tự tải lại để áp dụng.");
      setTimeout(() => window.location.reload(), 1500);
  };
  const handlePrintDashboard = useReactToPrint({
      contentRef: dashboardPrintRef,
      content: () => dashboardPrintRef.current,
      documentTitle: `Bao_Cao_Tong_Quan_CameraShop_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}`,
  });

  const handleAdminPrint = useReactToPrint({
    contentRef: adminPrintRef,
    content: () => adminPrintRef.current,
    documentTitle: `Phieu_Giao_Hang_${selectedAdminOrder?.orderCode}`,
    onAfterPrint: () => toast.success("Đã in phiếu giao hàng thành công!")
  });

  // Xuất Excel Pro
  const exportToExcel = () => {
      if (!dashboardData) return toast.warning("Không có dữ liệu!");
      let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; 
      
      csvContent += "THỐNG KÊ TỔNG QUAN\n";
      csvContent += `Tổng Doanh Thu,${dashboardData.overview.totalRevenue}\n`;
      csvContent += `Tổng Khách Hàng,${dashboardData.overview.totalCustomers}\n`;
      csvContent += `Sản Phẩm Đã Bán,${dashboardData.overview.totalProductsSold}\n\n`;

      csvContent += "CHI TIẾT TOP SẢN PHẨM BÁN CHẠY\n";
      csvContent += "Mã SP,Tên Sản Phẩm,Số Lượng Bán,Doanh Thu Thu Về,Tồn Kho Hiện Tại\n";
      dashboardData.topProducts.forEach(p => {
          csvContent += `#${p.id},"${p.name}",${p.totalSold},${p.revenue},${p.stock}\n`;
      });

      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `BaoCao_CameraShop_${dateRange}.csv`);
      document.body.appendChild(link);
      link.click(); link.remove();
      toast.success("Đã xuất file báo cáo chi tiết!");
  };
// Dán hàm này vào đây:
  const fetchPaginatedProducts = (page = 1) => {
      axios.get(`http://localhost:5000/api/products?page=${page}&limit=5`)
      .then(res => {
          setProducts(res.data.data);
          setTotalProductPages(res.data.totalPages);
          setProductPage(res.data.currentPage);
      })
      .catch(err => console.error(err));
  };

  const fetchData = () => {
    if (!isAuthenticated) return; 
    axios.get('http://localhost:5000/api/banners').then(res => setBanners(res.data)).catch(err => console.log(err));
    axios.get('http://localhost:5000/api/news').then(res => setNews(res.data)).catch(err => console.log(err));
    
    if (adminRole === 'ADMIN' || adminRole === 'SUPERADMIN') {
       fetchPaginatedProducts(1);
        axios.get('http://localhost:5000/api/categories').then(res => { setCategories(res.data); if(res.data.length > 0) setFormData(p => ({ ...p, categoryId: res.data[0].id.toString() })) });
        axios.get('http://localhost:5000/api/brands').then(res => { setBrands(res.data); if(res.data.length > 0) setFormData(p => ({ ...p, brandId: res.data[0].id.toString() })) });
        axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data)).catch(err => console.error(err));
        axios.get('http://localhost:5000/api/admin/reviews').then(res => setAllReviews(res.data)).catch(err => console.log(err));
    }
    if (adminRole === 'SUPERADMIN') {
        axios.get('http://localhost:5000/api/admin/users').then(res => setUsers(res.data)).catch(err => console.error(err));
    }
  };

  useEffect(() => { fetchData() }, [isAuthenticated, adminRole]);

  // Gọi API Dashboard Pro
  useEffect(() => {
      if (activeTab === 'dashboard' && (adminRole === 'ADMIN' || adminRole === 'SUPERADMIN')) {
          let url = `http://localhost:5000/api/admin/dashboard?range=${dateRange}`;
          if (dateRange === 'custom' && customStart && customEnd) {
              url += `&startDate=${customStart}&endDate=${customEnd}`;
          }
          if (dateRange !== 'custom' || (customStart && customEnd)) {
             axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } })
             .then(res => setDashboardData(res.data)).catch(err => console.log(err));
          }
      }
  }, [dateRange, customStart, customEnd, activeTab, adminRole]);

  const filteredAdminOrders = orders.filter(o => {
      const matchStatus = orderFilter === 'ALL' || o.status === orderFilter;
      const searchStr = orderSearch.toLowerCase();
      const matchSearch = String(o.orderCode || '').toLowerCase().includes(searchStr) || 
                          (o.shippingName || '').toLowerCase().includes(searchStr) || 
                          (o.shippingPhone || '').includes(searchStr);
      return matchStatus && matchSearch;
  });

  const handleLogout = () => {
    if (window.confirm("Bạn muốn đăng xuất khỏi trang Quản trị?")) {
      localStorage.removeItem('admin_token'); localStorage.removeItem('admin_role'); 
      localStorage.removeItem('token'); localStorage.removeItem('user');
      setIsAuthenticated(false); window.location.href = '/login'; 
    }
  };

const handleChange = (e) => { 
      let { name, value } = e.target; 
      if (name === 'price' || name === 'salePrice' || name === 'quantity') value = value.replace(/[^0-9]/g, ''); 
      setFormData({ ...formData, [name]: value }); 
  };
  const handleFileChange = (e) => setImageFile(e.target.files[0]);
  
const handleSubmit = (e) => { 
    e.preventDefault(); 
    const data = new FormData(); 
    data.append('name', formData.name); 
    data.append('price', formData.price); 
    data.append('sale_price', formData.salePrice || 0); // Đẩy giá khuyến mãi lên backend
    data.append('quantity', formData.quantity); 
    data.append('categoryId', formData.categoryId || '1'); 
    data.append('brandId', formData.brandId || '1'); 
    if (formData.colors) data.append('colors', formData.colors); 
    if (formData.gallery) data.append('gallery', formData.gallery); 
    if (formData.specs) data.append('specs', formData.specs); 
    if (imageFile) data.append('image', imageFile); 
    data.append('isNew', formData.isNew);
    data.append('isSale', formData.isSale);
    data.append('isBest', formData.isBest);
    
    const req = editingId 
        ? axios.put(`http://localhost:5000/api/products/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('admin_token')}` }}) 
        : axios.post('http://localhost:5000/api/products', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('admin_token')}` }}); 
    
    req.then(() => { 
        toast.success(editingId ? "Cập nhật thành công!" : "Thêm thành công!"); 
        fetchData(); 
        handleCancelEdit(); // Gọi hàm reset cho gọn
        const fileInput = document.getElementById('imageInput'); 
        if (fileInput) fileInput.value = ''; 
    }).catch(err => toast.error("LỖI kết nối")); 
  };
  const handleDelete = (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
          axios.delete(`http://localhost:5000/api/products/${id}`)
          .then(() => {
              toast.success("Đã xóa sản phẩm thành công!");
              fetchPaginatedProducts(productPage); // Tải lại đúng trang hiện tại
          })
          .catch(() => toast.error("Có lỗi xảy ra khi xóa!"));
      }
  };
 const handleEdit = (product) => { 
      setEditingId(product.id); 
      setFormData({ 
          name: product.name, 
          price: product.price ? product.price.toString() : '', 
          salePrice: product.sale_price ? product.sale_price.toString() : '', 
          quantity: product.quantity ? product.quantity.toString() : '0', 
          categoryId: product.categoryId ? product.categoryId.toString() : '', 
          brandId: product.brandId ? product.brandId.toString() : '', 
          colors: product.colors ? JSON.stringify(product.colors) : '', 
          gallery: product.gallery ? JSON.stringify(product.gallery) : '', 
          specs: product.specs ? JSON.stringify(product.specs) : '',
          isNew: product.isNew || false, 
          isSale: product.isSale || false, 
          isBest: product.isBest || false 
      }); 
      setActiveTab('products'); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };
  
  const handleCancelEdit = () => { 
      setEditingId(null); 
      setImageFile(null); 
      setFormData({ 
          name: '', price: '', salePrice: '', quantity: '10', categoryId: formData.categoryId, brandId: formData.brandId, 
          colors: '', gallery: '', specs: '', 
          isNew: true, isSale: false, isBest: false 
      }); 
  };
  
  const handleUpdateOrderStatus = async (orderId, newStatus) => { 
      const statusMap = { 'SHIPPING': 'GIAO HÀNG', 'PAID': 'ĐÃ HOÀN THÀNH', 'CANCELLED': 'ĐÃ HỦY' };
      if (window.confirm(`Xác nhận đổi trạng thái đơn hàng #${orderId} thành: ${statusMap[newStatus]}?`)) { 
          try { 
              await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }); 
              toast.success("Cập nhật trạng thái thành công!"); 
              fetchData(); 
              if (selectedAdminOrder && selectedAdminOrder.id === orderId) {
                  setSelectedAdminOrder({...selectedAdminOrder, status: newStatus});
              }
          } catch (error) { toast.error("Lỗi cập nhật!"); } 
      } 
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const NavButton = ({ id, icon, label }) => (
    <button onClick={() => { setActiveTab(id); setSelectedAdminOrder(null); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 ${activeTab === id ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md translate-x-1' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}>
        <span className="text-xl">{icon}</span><span>{label}</span>
    </button>
  );

  return (
// Mới:
<div className="flex flex-col md:flex-row min-h-[calc(100vh-76px)] bg-slate-100 dark:bg-slate-900 print:bg-white print:block transition-colors duration-300">
        <aside className="w-full md:w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col print:hidden shadow-sm z-10 md:sticky top-[76px] md:h-[calc(100vh-76px)] transition-colors duration-300">
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-hide">
                <div className="px-4 pb-3 pt-2 flex flex-col gap-1">
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bảng Điều Khiển</p>
                    <span className={`text-[10px] w-fit font-bold px-2 py-1 rounded uppercase ${adminRole === 'SUPERADMIN' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300' : adminRole === 'ADMIN' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300' : 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300'}`}>Quyền: {adminRole}</span>
                </div>
                {(adminRole === 'SUPERADMIN' || adminRole === 'ADMIN') && (
                    <><NavButton id="dashboard" icon="📊" label="Thống Kê Doanh Thu" /><NavButton id="orders" icon="📝" label="Quản Lý Đơn Hàng" /><NavButton id="products" icon="📦" label="Kho Sản Phẩm" /><NavButton id="reviews" icon="⭐" label="Đánh Giá & Bình Luận" /></>
                )}
                {adminRole === 'SUPERADMIN' && (<NavButton id="users" icon="👥" label="Quản Lý Người Dùng" />)}
                <NavButton id="banners" icon="🖼️" label="Banner Quảng Cáo" />
                <NavButton id="news" icon="📰" label="Tin Tức Chuyên Trang" />
                <NavButton id="categories" icon="🗂️" label="Quản Lý Danh Mục" />
                <NavButton id="settings" icon="⚙️" label="Cài Đặt Giao Diện" />
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col gap-2 transition-colors duration-300">
    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold px-4 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-300">🚪 Đăng xuất</button>
</div>
        </aside>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden print:p-0 print:m-0">
             
             {/* ========================================================= */}
             {/* 1. GIAO DIỆN BÁO CÁO DOANH THU ĐƯỢC LÀM MỚI TOÀN BỘ       */}
             {/* ========================================================= */}
             {activeTab === 'dashboard' && (
                 <div className="space-y-6">
                     
                     {/* Thanh công cụ: Bộ lọc & Xuất Báo Cáo */}
                     <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:hidden">
                         <div>
                             <h2 className="text-2xl font-black text-slate-800">Báo Cáo Hoạt Động</h2>
                             <p className="text-sm text-slate-500 mt-1">Hệ thống phân tích dữ liệu đa chiều</p>
                         </div>
                         <div className="flex flex-wrap items-center gap-3">
                             <select value={dateRange} onChange={(e) => {setDateRange(e.target.value); setCustomStart(''); setCustomEnd('');}} className="bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl font-bold outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer shadow-sm text-sm">
                                 <option value="today">⚡ Hôm nay</option>
                                 <option value="7days">📅 7 Ngày qua</option>
                                 <option value="thisMonth">📅 Tháng này</option>
                                 <option value="thisQuarter">📅 Quý này</option>
                                 <option value="thisYear">📅 Năm nay</option>
                                 <option value="custom">⚙️ Tùy chọn khoảng ngày</option>
                             </select>
                             
                             {dateRange === 'custom' && (
                                 <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-300">
                                     <input type="date" value={customStart} onChange={e=>setCustomStart(e.target.value)} className="px-2 py-1 bg-transparent outline-none text-sm font-medium text-slate-700" />
                                     <span className="text-slate-400">-</span>
                                     <input type="date" value={customEnd} onChange={e=>setCustomEnd(e.target.value)} className="px-2 py-1 bg-transparent outline-none text-sm font-medium text-slate-700" />
                                 </div>
                             )}

                             <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition active:scale-95 text-sm">
                                 📥 Xuất Excel (.xlsx)
                             </button>
                             <button onClick={() => handlePrintDashboard()} className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition active:scale-95 text-sm">
                                 🖨️ Xuất PDF / In
                             </button>
                         </div>
                     </div>

                     {/* Vùng chứa dữ liệu Dashboard (để In) */}
                     <div ref={dashboardPrintRef} className="print:bg-white print:p-0">
                         {/* Header chỉ hiện khi in ra giấy */}
                         <div className="hidden print:block text-center mb-8 border-b-2 border-slate-800 pb-4">
                             <h1 className="text-3xl font-black text-slate-900 uppercase">Báo Cáo Tổng Quan Cửa Hàng</h1>
                             <p className="text-lg text-slate-600 mt-2 font-medium">Thời gian: {dateRange === 'custom' ? `${customStart} đến ${customEnd}` : dateRange}</p>
                         </div>

                         {!dashboardData ? (
                             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                                 <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                 <p className="text-slate-500 mt-4 font-medium">Đang tổng hợp dữ liệu...</p>
                             </div>
                         ) : (
                             <div className="space-y-6">
                                 
                               {/* 1. THỐNG KÊ TỔNG QUAN (5 CARDS) */}
<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 border-b-4 border-b-blue-500 print:border-b-2 print:border-slate-800">
        <p className="text-[10px] lg:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider flex items-center gap-1">💰 Tổng Doanh Thu</p>
        <h3 className="text-xl xl:text-xl 2xl:text-2xl font-black text-blue-700 print:text-black whitespace-nowrap">
            {Number(dashboardData.overview.totalRevenue).toLocaleString('vi-VN')} đ
        </h3>
    </div>
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 border-b-4 border-b-slate-800 print:border-b-2 print:border-slate-800">
        <p className="text-[10px] lg:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider flex items-center gap-1">🛒 Tổng Số Đơn</p>
        <h3 className="text-xl xl:text-xl 2xl:text-2xl font-black text-slate-800">{dashboardData.overview.totalOrders}</h3>
    </div>
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 border-b-4 border-b-green-500 print:border-b-2 print:border-slate-800">
        <p className="text-[10px] lg:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider flex items-center gap-1">📦 Đã Hoàn Thành</p>
        <h3 className="text-xl xl:text-xl 2xl:text-2xl font-black text-green-600 print:text-black">{dashboardData.overview.completedOrders}</h3>
    </div>
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 border-b-4 border-b-red-500 print:border-b-2 print:border-slate-800">
        <p className="text-[10px] lg:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider flex items-center gap-1">❌ Đơn Đã Hủy</p>
        <h3 className="text-xl xl:text-xl 2xl:text-2xl font-black text-red-600 print:text-black">{dashboardData.overview.cancelledOrders}</h3>
    </div>
    <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 border-b-4 border-b-purple-500 print:border-b-2 print:border-slate-800">
        <p className="text-[10px] lg:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider flex items-center gap-1">👥 Khách Hàng</p>
        <h3 className="text-xl xl:text-xl 2xl:text-2xl font-black text-purple-600 print:text-black">{dashboardData.overview.totalCustomers}</h3>
    </div>
</div>

                                 {/* 2 & 3. BIỂU ĐỒ DOANH THU THỜI GIAN THỰC */}
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                     <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:break-inside-avoid">
                                         <h3 className="text-base font-bold text-slate-800 mb-6 uppercase tracking-wider border-b pb-3">📈 Biểu đồ Doanh thu theo thời gian</h3>
                                         {dashboardData.chartData.length === 0 ? (
                                             <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200"><p className="text-slate-500">Chưa có giao dịch.</p></div>
                                         ) : (
                                             <div className="h-[300px] w-full">
                                                 <ResponsiveContainer width="100%" height="100%">
                                                     <LineChart data={dashboardData.chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                                                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                         <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                                                         <YAxis tickFormatter={(v) => new Intl.NumberFormat('vi-VN', { notation: "compact" }).format(v)} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                                                         <Tooltip formatter={(value) => [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value), 'Doanh Thu']} labelStyle={{ color: '#0f172a', fontWeight: 'bold' }} />
                                                         <Line type="monotone" dataKey="revenue" name="Doanh thu" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6'}} activeDot={{r: 6}} />
                                                     </LineChart>
                                                 </ResponsiveContainer>
                                             </div>
                                         )}
                                     </div>

                                     {/* 8. THỐNG KÊ TRẠNG THÁI ĐƠN HÀNG (Bar Chart dọc) */}
                                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:break-inside-avoid flex flex-col">
                                         <h3 className="text-base font-bold text-slate-800 mb-6 uppercase tracking-wider border-b pb-3">Tỉ lệ trạng thái đơn</h3>
                                         <div className="flex-1 flex flex-col justify-center gap-4">
                                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-600 font-bold">Chờ duyệt:</span><span className="font-black text-orange-500 text-lg">{dashboardData.statusStats.PENDING || 0}</span></div>
                                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-600 font-bold">Đang giao:</span><span className="font-black text-blue-500 text-lg">{dashboardData.statusStats.SHIPPING || 0}</span></div>
                                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-600 font-bold">Đã hoàn thành:</span><span className="font-black text-green-600 text-lg">{dashboardData.statusStats.PAID || 0}</span></div>
                                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-600 font-bold">Đã hủy:</span><span className="font-black text-red-500 text-lg">{dashboardData.statusStats.CANCELLED || 0}</span></div>
                                         </div>
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     {/* 6. THỐNG KÊ DANH MỤC SẢN PHẨM (Pie Chart) */}
                                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:break-inside-avoid">
                                         <h3 className="text-base font-bold text-slate-800 mb-2 uppercase tracking-wider border-b pb-3">Phân bổ Danh mục bán ra</h3>
                                         {dashboardData.categoryChart.length === 0 ? <p className="text-center text-slate-400 py-10">Chưa có dữ liệu</p> : (
                                             <div className="h-[250px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={dashboardData.categoryChart} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" nameKey="name" label>
                                                            {dashboardData.categoryChart.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                                                        </Pie>
                                                        <Tooltip />
                                                        <Legend verticalAlign="bottom" height={36}/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                             </div>
                                         )}
                                     </div>

                                     {/* 7. THỐNG KÊ PHƯƠNG THỨC THANH TOÁN (Pie Chart) */}
                                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:break-inside-avoid">
                                         <h3 className="text-base font-bold text-slate-800 mb-2 uppercase tracking-wider border-b pb-3">Phương thức thanh toán</h3>
                                         {dashboardData.paymentChart.length === 0 ? <p className="text-center text-slate-400 py-10">Chưa có dữ liệu</p> : (
                                             <div className="h-[250px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={dashboardData.paymentChart} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" nameKey="name">
                                                            {dashboardData.paymentChart.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                                                        </Pie>
                                                        <Tooltip />
                                                        <Legend verticalAlign="bottom" height={36}/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                             </div>
                                         )}
                                     </div>
                                 </div>

                                 {/* 4 & 5. TOP SẢN PHẨM BÁN CHẠY NHẤT VÀ THỐNG KÊ SẢN PHẨM */}
                                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 print:break-inside-avoid">
                                     <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider border-b pb-3">🏆 Bảng Xếp Hạng Sản Phẩm (Top 20)</h3>
                                     {dashboardData.topProducts.length === 0 ? (
                                         <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p className="text-slate-500">Chưa có sản phẩm nào được bán ra.</p></div>
                                     ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50 text-slate-600 border-y border-slate-200 print:border-y-2 print:border-slate-800">
                                                        <th className="p-4 font-bold">Top</th>
                                                        <th className="p-4 font-bold">Sản phẩm</th>
                                                        <th className="p-4 font-bold text-center">Đã bán</th>
                                                        <th className="p-4 font-bold text-right">Doanh thu thu về</th>
                                                        <th className="p-4 font-bold text-center">Tồn kho</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dashboardData.topProducts.map((prod, idx) => (
                                                        <tr key={prod.id} className="border-b border-slate-100 hover:bg-slate-50 transition print:border-slate-400">
                                                            <td className="p-4">
                                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-slate-200 text-slate-600' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>#{idx + 1}</span>
                                                            </td>
                                                            <td className="p-4">
                                                                <div className="flex items-center gap-3">
                                                                    {prod.image ? <img src={`http://localhost:5000${prod.image}`} className="w-10 h-10 rounded border object-cover print:hidden" /> : <div className="w-10 h-10 bg-slate-100 rounded print:hidden"></div>}
                                                                    <span className="font-bold text-slate-800 max-w-[200px] md:max-w-[400px] truncate block">{prod.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-center font-black text-blue-600">{prod.totalSold}</td>
                                                            <td className="p-4 text-right font-black text-slate-800">{Number(prod.revenue).toLocaleString('vi-VN')} đ</td>
                                                            <td className="p-4 text-center">
                                                                <span className={`font-bold px-2 py-1 rounded-md text-xs ${prod.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{prod.stock}</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                     )}
                                 </div>
                             </div>
                         )}
                     </div>
                 </div>
             )}
             {/* COMPONENT QUẢN LÝ DANH MỤC */}
             {activeTab === 'categories' && (
                 <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8 animate-fade-in">
                     <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
                         <div className="w-12 h-12 bg-gradient-to-tr from-pink-600 to-rose-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
                             🗂️
                         </div>
                         <div>
                             <h2 className="text-2xl font-black text-slate-800 leading-tight">
                                 {editingCatId ? "Cập Nhật Danh Mục" : "Thêm Danh Mục Mới"}
                             </h2>
                             <p className="text-sm text-slate-500 font-medium mt-1">Phân loại sản phẩm giúp khách hàng tìm kiếm dễ dàng hơn.</p>
                         </div>
                     </div>

                     <form onSubmit={async (e) => {
                         e.preventDefault();
                         try {
                             if (editingCatId) {
                                 await axios.put(`http://localhost:5000/api/categories/${editingCatId}`, categoryForm, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });
                                 toast.success("Đã cập nhật danh mục!");
                             } else {
                                 await axios.post('http://localhost:5000/api/categories', categoryForm, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } });
                                 toast.success("Thêm danh mục thành công!");
                             }
                             fetchData(); // Tải lại danh sách
                             setCategoryForm({ name: '', description: '' });
                             setEditingCatId(null);
                         } catch (error) {
                             toast.error(error.response?.data?.error || "Có lỗi xảy ra!");
                         }
                     }} className="flex flex-col gap-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Tên danh mục <span className="text-red-500">*</span></label>
                                 <input type="text" required placeholder="VD: Máy ảnh Mirrorless..." value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-50 outline-none transition font-bold text-slate-800" />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-slate-700 mb-2">Mô tả ngắn</label>
                                 <input type="text" placeholder="Mô tả danh mục (tùy chọn)..." value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-50 outline-none transition font-medium text-slate-800" />
                             </div>
                         </div>
                         <div className="flex gap-4 pt-4 border-t border-slate-100">
                             <button type="submit" className="bg-pink-600 text-white px-10 py-3.5 rounded-xl font-bold shadow-[0_8px_20px_rgba(219,39,119,0.24)] hover:bg-pink-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2">
                                 {editingCatId ? "💾 Lưu Thay Đổi" : "✨ Thêm Danh Mục"}
                             </button>
                             {editingCatId && (
                                 <button type="button" onClick={() => { setEditingCatId(null); setCategoryForm({name: '', description: ''}); }} className="bg-slate-100 text-slate-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95">
                                     Hủy Bỏ
                                 </button>
                             )}
                         </div>
                     </form>

                     {/* DANH SÁCH CATEGORY */}
                     <div className="mt-12">
                         <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">Danh sách phân loại ({categories.length})</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                             {categories.map(cat => (
                                 <div key={cat.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-pink-300 transition-all group flex flex-col">
                                     <h4 className="font-black text-lg text-slate-800 mb-1">{cat.name}</h4>
                                     <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[2.5rem]">{cat.description || 'Chưa có mô tả'}</p>
                                     <div className="flex justify-end gap-2 border-t border-slate-50 pt-4 mt-auto">
                                         <button onClick={() => { setEditingCatId(cat.id); setCategoryForm({ name: cat.name, description: cat.description || '' }); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="px-4 py-2 bg-blue-50 text-blue-600 text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-blue-100 transition">Sửa</button>
                                         <button onClick={async () => {
                                             if(window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.name}"?`)) {
                                                 try {
                                                     await axios.delete(`http://localhost:5000/api/categories/${cat.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }});
                                                     toast.success("Xóa thành công!");
                                                     fetchData();
                                                 } catch(e) { toast.error("Không thể xóa danh mục đang có sản phẩm!"); }
                                             }
                                         }} className="px-4 py-2 bg-red-50 text-red-600 text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-red-100 transition">Xóa</button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             )}
       {/* COMPONENT QUẢN LÝ SẢN PHẨM */}
{activeTab === 'products' && (
    <div>
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
                    📦
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 leading-tight">
                        {editingId ? "Cập Nhật Thông Tin Máy Ảnh" : "Thêm Sản Phẩm Mới"}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Điền đầy đủ các trường có dấu (*) để cấu hình sản phẩm.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* 1. THÔNG TIN CƠ BẢN */}
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="text-blue-500 text-lg">■</span> Thông tin cơ bản
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        <div className="md:col-span-4">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tên sản phẩm <span className="text-red-500">*</span></label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nhập tên sản phẩm..." className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition font-bold text-slate-800" required />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Giá niêm yết (VNĐ) <span className="text-red-500">*</span></label>
                            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition font-black text-slate-600 line-through" required />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Giá khuyến mãi (VNĐ)</label>
                            <input type="text" name="salePrice" value={formData.salePrice} onChange={handleChange} placeholder="Bỏ trống nếu không giảm" className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition font-black text-red-600" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tồn kho <span className="text-red-500">*</span></label>
                            <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="10" className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition font-bold text-slate-800" required />
                        </div>
                    </div>
                </div>

                {/* 2. PHÂN LOẠI & HÌNH ẢNH */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="text-orange-400 text-lg">■</span> Phân loại & Hình ảnh
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Danh mục <span className="text-red-500">*</span></label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition cursor-pointer font-bold text-slate-700">
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Thương hiệu <span className="text-red-500">*</span></label>
                            <select name="brandId" value={formData.brandId} onChange={handleChange} className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition cursor-pointer font-bold text-slate-700">
                                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Ảnh đại diện (Thumbnail)</label>
                            <input type="file" id="imageInput" onChange={handleFileChange} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-600 cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition" />
                        </div>
                    </div>
                </div>

            {/* 3. DỮ LIỆU NÂNG CAO JSON */}
<div>
    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
        <span className="text-purple-500 text-lg">■</span> Dữ liệu nâng cao (JSON)
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                <span>Màu sắc <span className="text-[11px] font-semibold text-slate-400 ml-1 uppercase tracking-wider">(Mảng JSON)</span></span>
            </label>
            <textarea name="colors" value={formData.colors} onChange={handleChange} placeholder='VD: ["Đen", "Bạc", "Đỏ"]' className="border border-slate-300 rounded-xl px-5 py-4 w-full text-sm font-mono leading-relaxed bg-slate-50 text-slate-800 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition placeholder:text-slate-400 shadow-inner" rows="3" />
        </div>
        <div>
            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                <span>Ảnh phụ Gallery <span className="text-[11px] font-semibold text-slate-400 ml-1 uppercase tracking-wider">(Mảng URL JSON)</span></span>
            </label>
            <textarea name="gallery" value={formData.gallery} onChange={handleChange} placeholder='VD: ["https://link1.jpg", "https://link2.jpg"]' className="border border-slate-300 rounded-xl px-5 py-4 w-full text-sm font-mono leading-relaxed bg-slate-50 text-slate-800 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition placeholder:text-slate-400 shadow-inner" rows="3" />
        </div>
        <div className="md:col-span-2">
            <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                <span>Thông số kỹ thuật <span className="text-[11px] font-semibold text-slate-400 ml-1 uppercase tracking-wider">(Object JSON)</span></span>
            </label>
            <textarea name="specs" value={formData.specs} onChange={handleChange} placeholder='VD: {"Hãng": "Canon", "Cảm biến": "Full-frame"}' className="border border-slate-300 rounded-xl px-5 py-4 w-full text-sm font-mono leading-relaxed bg-slate-50 text-slate-800 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition placeholder:text-slate-400 shadow-inner" rows="4" />
        </div>
    </div>
</div>
{/* 4. TRẠNG THÁI SẢN PHẨM (FLAGS) */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="text-green-500 text-lg">■</span> Phân loại trạng thái hiển thị
                    </h3>
                    <div className="flex flex-wrap gap-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" checked={formData.isNew} onChange={(e) => setFormData({...formData, isNew: e.target.checked})} className="w-6 h-6 accent-blue-600 rounded cursor-pointer transition-transform group-hover:scale-110" />
                            <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">🌟 Sản phẩm Mới</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" checked={formData.isSale} onChange={(e) => setFormData({...formData, isSale: e.target.checked})} className="w-6 h-6 accent-red-600 rounded cursor-pointer transition-transform group-hover:scale-110" />
                            <span className="font-bold text-slate-700 group-hover:text-red-600 transition-colors">🔥 Đang Giảm Giá</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" checked={formData.isBest} onChange={(e) => setFormData({...formData, isBest: e.target.checked})} className="w-6 h-6 accent-orange-500 rounded cursor-pointer transition-transform group-hover:scale-110" />
                            <span className="font-bold text-slate-700 group-hover:text-orange-500 transition-colors">🏆 Bán Chạy Nhất</span>
                        </label>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 pt-6 border-t border-slate-100">
                    <button type="submit" className="bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold shadow-[0_8px_20px_rgba(37,99,235,0.24)] hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2">
                        {editingId ? "💾 Lưu Thay Đổi" : "🚀 Xuất Bản Sản Phẩm"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="bg-slate-100 text-slate-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95">
                            Hủy Bỏ
                        </button>
                    )}
                </div>
            </form>
        </div>
                     <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                         <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-slate-800">Danh Sách Kho Hàng</h2>
                         <div className="space-y-4">
                             {products.map(item => (
                                 <div key={item.id} className="p-4 bg-white rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition">
                                     <div className="flex items-center gap-4 w-full md:w-auto">
                                         {item.image ? <img src={`http://localhost:5000${item.image}`} className="w-16 h-16 object-cover rounded-lg border" /> : <div className="w-16 h-16 bg-slate-100 rounded-lg flex justify-center items-center text-xs text-slate-400">Trống</div>}
                                         <div><span className="font-black text-slate-800 text-lg block">{item.name}</span><span className="text-sm font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded mt-1 inline-block">{item.category?.name}</span></div>
                                     </div>
                                     <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                         <span className="text-base font-black text-green-700 bg-green-50 px-4 py-2 rounded-lg border border-green-100 flex-grow text-center md:flex-grow-0">{Number(item.price).toLocaleString('vi-VN')} đ</span>
                                         <button onClick={() => handleEdit(item)} className="text-blue-700 bg-blue-50 px-4 py-2 rounded-lg font-bold border border-blue-100 hover:bg-blue-100 flex-grow md:flex-grow-0 transition">Sửa</button>
                                         <button onClick={() => handleDelete(item.id)} className="text-red-700 bg-red-50 px-4 py-2 rounded-lg font-bold border border-red-100 hover:bg-red-100 flex-grow md:flex-grow-0 transition">Xóa</button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                         {/* --- GIAO DIỆN PHÂN TRANG --- */}
{totalProductPages > 1 && (
    <div className="flex justify-center items-center gap-2 mt-8 border-t border-slate-100 pt-6">
        <button 
            onClick={() => fetchPaginatedProducts(productPage - 1)}
            disabled={productPage === 1}
            className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition shadow-sm"
        >
            ← Trước
        </button>
        
        {[...Array(totalProductPages)].map((_, i) => (
            <button
                key={i}
                onClick={() => fetchPaginatedProducts(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition shadow-sm ${productPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-200 border border-slate-200'}`}
            >
                {i + 1}
            </button>
        ))}

        <button 
            onClick={() => fetchPaginatedProducts(productPage + 1)}
            disabled={productPage === totalProductPages}
            className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition shadow-sm"
        >
            Sau →
        </button>
    </div>
)}
                     </div>
                 </div>
             )}
             
             {/* ========================================================= */}
             {/* COMPONENT QUẢN LÝ ĐƠN HÀNG DÀNH CHO ADMIN                 */}
             {/* ========================================================= */}
             {activeTab === 'orders' && !selectedAdminOrder && (
                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
                         <h2 className="text-2xl font-bold text-slate-800">Quản Lý Đơn Hàng</h2>
                         <div className="relative w-full lg:w-80">
                             <input type="text" placeholder="Tìm mã đơn, tên khách, SĐT..." value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:border-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition" />
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                         </div>
                     </div>

                     <div className="flex overflow-x-auto gap-2 mb-6 pb-2 custom-scrollbar">
                         {[
                             { id: 'ALL', label: 'Tất cả đơn' },
                             { id: 'PENDING', label: 'Chờ duyệt' },
                             { id: 'SHIPPING', label: 'Đang giao' },
                             { id: 'PAID', label: 'Hoàn thành' },
                             { id: 'CANCELLED', label: 'Đã hủy' }
                         ].map(tab => (
                             <button key={tab.id} onClick={() => setOrderFilter(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition ${orderFilter === tab.id ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                                 {tab.label}
                             </button>
                         ))}
                     </div>

                     {filteredAdminOrders.length === 0 ? (
                         <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                             <span className="text-5xl mb-3 block opacity-50">📭</span>
                             <p className="text-slate-500 font-medium">Không tìm thấy đơn hàng nào.</p>
                         </div>
                     ) : (
                         <div className="space-y-4">
                             {filteredAdminOrders.map(order => (
                                 <div key={order.id} className="border border-slate-200 rounded-xl bg-white shadow-sm hover:border-blue-400 transition overflow-hidden">
                                     <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                         <div className="flex items-center gap-3">
                                             <span className="font-black text-slate-800 tracking-wide">#{order.orderCode}</span>
                                             <span className="text-slate-300">|</span>
                                             <span className="text-xs font-medium text-slate-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
                                         </div>
                                         <span className={`px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider border ${order.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' : order.status === 'SHIPPING' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                             {order.status === 'PAID' ? '✅ HOÀN THÀNH' : order.status === 'CANCELLED' ? '❌ ĐÃ HỦY' : order.status === 'SHIPPING' ? '🚚 ĐANG GIAO' : '⏳ CHỜ DUYỆT'}
                                         </span>
                                     </div>
                                     
                                     <div className="p-5 flex flex-col md:flex-row justify-between gap-4">
                                         <div className="text-sm text-slate-600 space-y-1.5 flex-1">
                                             <p><strong className="text-slate-800">Khách hàng:</strong> {order.shippingName || (order.user ? order.user.name : 'Khách vãng lai')}</p>
                                             <p><strong className="text-slate-800">Điện thoại:</strong> {order.shippingPhone}</p>
                                             <p className="line-clamp-1"><strong className="text-slate-800">Giao đến:</strong> {order.shippingAddress}</p>
                                         </div>
                                         <div className="text-right flex-shrink-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                             <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Tổng thu</p>
                                             <p className="text-xl font-black text-red-600">{Number(order.totalAmount).toLocaleString('vi-VN')} đ</p>
                                             <p className="text-xs text-slate-400 font-medium mt-1">{order.items.length} sản phẩm</p>
                                         </div>
                                     </div>

                                     <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap justify-end gap-2">
                                         {order.status === 'PENDING' && (
                                             <button onClick={() => handleUpdateOrderStatus(order.id, 'SHIPPING')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition">Chốt & Giao Hàng</button>
                                         )}
                                         {order.status === 'SHIPPING' && (
                                             <button onClick={() => handleUpdateOrderStatus(order.id, 'PAID')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm transition">Xác Nhận Đã Thu Tiền</button>
                                         )}
                                         {(order.status === 'PENDING' || order.status === 'SHIPPING') && (
                                             <button onClick={() => handleUpdateOrderStatus(order.id, 'CANCELLED')} className="px-4 py-2 bg-white border border-slate-300 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 hover:border-red-300 shadow-sm transition">Hủy Đơn</button>
                                         )}
                                         <button onClick={() => { setSelectedAdminOrder(order); window.scrollTo(0,0); }} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 shadow-sm transition">Xem Chi Tiết</button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     )}
                 </div>
             )}

             {/* CHI TIẾT ĐƠN HÀNG DÀNH CHO ADMIN */}
             {activeTab === 'orders' && selectedAdminOrder && (
                 <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 animate-fade-in" ref={adminPrintRef}>
                     <div className="flex justify-between items-center mb-6 border-b pb-4">
                         <button onClick={() => { setSelectedAdminOrder(null); window.scrollTo(0,0); }} className="text-slate-500 hover:text-blue-600 font-bold text-sm flex items-center gap-2 print:hidden transition">
                             ← Trở lại danh sách
                         </button>
                         <div className="flex gap-2 print:hidden">
                             <button onClick={() => handleAdminPrint()} className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition flex items-center gap-2 shadow-sm">🖨️ In Phiếu Giao</button>
                         </div>
                     </div>

                     <div className="hidden print:flex justify-between items-center border-b-2 border-slate-800 pb-4 mb-6">
                         <div>
                             <h1 className="text-2xl font-black text-slate-900">CAMERA SHOP</h1>
                             <p className="text-sm text-slate-600">Hotline: 0327.075.390</p>
                         </div>
                         <div className="text-right">
                             <h2 className="text-xl font-bold uppercase">Phiếu Giao Hàng</h2>
                             <p className="font-mono text-sm">Mã đơn: #{selectedAdminOrder.orderCode}</p>
                         </div>
                     </div>

                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200 print:bg-white print:border-none print:p-0 print:mb-6">
                         <div>
                             <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide print:hidden">Chi Tiết Đơn #{selectedAdminOrder.orderCode}</h3>
                             <p className="text-sm text-slate-500 mt-1 font-medium">Ngày đặt: {new Date(selectedAdminOrder.createdAt).toLocaleString('vi-VN')}</p>
                         </div>
                         <span className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg shadow-sm print:hidden text-white ${selectedAdminOrder.status === 'PAID' ? 'bg-green-600' : selectedAdminOrder.status === 'CANCELLED' ? 'bg-red-600' : selectedAdminOrder.status === 'SHIPPING' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                              {selectedAdminOrder.status === 'PAID' ? 'HOÀN THÀNH' : selectedAdminOrder.status === 'CANCELLED' ? 'ĐÃ HỦY' : selectedAdminOrder.status === 'SHIPPING' ? 'ĐANG GIAO' : 'CHỜ DUYỆT'}
                         </span>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:grid-cols-2 print:gap-4">
                         <div className="border border-slate-200 p-5 rounded-2xl shadow-sm bg-white print:border-slate-800 print:shadow-none print:rounded-none">
                             <h4 className="font-bold text-slate-800 mb-4 text-base uppercase tracking-wide border-b pb-2">Người Nhận</h4>
                             <div className="text-sm text-slate-700 space-y-2.5">
                                 <p><strong className="w-24 inline-block text-slate-800">Họ và tên:</strong> {selectedAdminOrder.shippingName}</p>
                                 <p><strong className="w-24 inline-block text-slate-800">Điện thoại:</strong> {selectedAdminOrder.shippingPhone}</p>
                                 <p className="flex"><strong className="w-24 flex-shrink-0 text-slate-800">Địa chỉ:</strong> <span>{selectedAdminOrder.shippingAddress}</span></p>
                             </div>
                         </div>
                         <div className="border border-slate-200 p-5 rounded-2xl shadow-sm bg-white print:border-slate-800 print:shadow-none print:rounded-none">
                             <h4 className="font-bold text-slate-800 mb-4 text-base uppercase tracking-wide border-b pb-2">Thanh Toán</h4>
                             <div className="text-sm text-slate-700 space-y-2.5">
                                 <p><strong className="w-28 inline-block text-slate-800">Trạng thái TT:</strong> {selectedAdminOrder.status === 'PAID' ? 'Đã thu tiền' : selectedAdminOrder.status === 'CANCELLED' ? 'Hủy' : 'Chưa thu tiền'}</p>
                                 <p><strong className="w-28 inline-block text-slate-800">Tiền hàng:</strong> {Number(selectedAdminOrder.totalAmount).toLocaleString('vi-VN')} đ</p>
                                 <p><strong className="w-28 inline-block text-slate-800">Phí giao hàng:</strong> 0 đ</p>
                             </div>
                         </div>
                     </div>

                     <h4 className="font-bold text-slate-800 mb-4 text-lg">Danh Sách Sản Phẩm</h4>
                     <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8 shadow-sm print:rounded-none print:border-slate-800">
                         <table className="w-full text-left text-sm print:border-collapse">
                             <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 print:bg-white print:border-b-2 print:border-slate-800">
                                 <tr>
                                     <th className="p-4 font-bold print:border print:border-slate-800">Mã SP</th>
                                     <th className="p-4 font-bold print:border print:border-slate-800">Sản phẩm</th>
                                     <th className="p-4 font-bold text-center print:border print:border-slate-800">Đơn giá</th>
                                     <th className="p-4 font-bold text-center print:border print:border-slate-800">SL</th>
                                     <th className="p-4 font-bold text-right print:border print:border-slate-800">Thành tiền</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {selectedAdminOrder.items.map(item => (
                                     <tr key={item.id} className="border-b border-slate-100 last:border-0 bg-white print:border print:border-slate-800">
                                         <td className="p-4 text-slate-500 font-mono print:border print:border-slate-800">#{item.productId}</td>
                                         <td className="p-4 print:border print:border-slate-800">
                                             <div className="flex items-center gap-3">
                                                 <img src={`http://localhost:5000${item.product.image}`} className="w-10 h-10 object-cover rounded border border-slate-200 print:hidden" />
                                                 <span className="font-bold text-slate-800">{item.product.name}</span>
                                             </div>
                                         </td>
                                         <td className="p-4 text-center font-medium text-slate-600 print:border print:border-slate-800">{Number(item.price).toLocaleString('vi-VN')} đ</td>
                                         <td className="p-4 text-center font-bold text-slate-800 print:border print:border-slate-800">{item.quantity}</td>
                                         <td className="p-4 text-right font-black text-slate-800 print:border print:border-slate-800">{Number(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>

                     <div className="flex justify-end border-t border-slate-200 pt-6 print:border-none print:pt-2">
                         <div className="w-full md:w-1/2 space-y-3 text-sm">
                             <div className="flex justify-between items-center border-t border-slate-800 pt-4 mt-2">
                                 <span className="text-slate-800 font-black text-xl">TỔNG CẦN THU:</span> 
                                 <span className="font-black text-red-600 text-3xl print:text-black">{Number(selectedAdminOrder.totalAmount).toLocaleString('vi-VN')} đ</span>
                             </div>
                             <div className="text-right text-slate-500 italic text-xs mt-2 print:block hidden">
                                 (Chữ ký người nhận hàng)
                             </div>
                         </div>
                     </div>
                     
                     <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3 print:hidden">
                         {selectedAdminOrder.status === 'PENDING' && (
                             <button onClick={() => handleUpdateOrderStatus(selectedAdminOrder.id, 'SHIPPING')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition">Duyệt & Giao Hàng</button>
                         )}
                         {selectedAdminOrder.status === 'SHIPPING' && (
                             <button onClick={() => handleUpdateOrderStatus(selectedAdminOrder.id, 'PAID')} className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md transition">Xác Nhận Đã Thu Tiền</button>
                         )}
                     </div>
                 </div>
             )}
             
           {/* COMPONENT QUẢN LÝ NGƯỜI DÙNG */}
{activeTab === 'users' && (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
                👥
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800 leading-tight">Hồ Sơ Người Dùng</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Quản lý danh sách tài khoản và thiết lập phân quyền hệ thống.</p>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest">
                        <th className="p-4 font-bold rounded-tl-2xl w-16">ID</th>
                        <th className="p-4 font-bold">Họ & Tên</th>
                        <th className="p-4 font-bold">Email Liên Hệ</th>
                        <th className="p-4 font-bold">Ngày Tham Gia</th>
                        <th className="p-4 font-bold rounded-tr-2xl w-52">Phân Quyền</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {/* Lưu ý: Thay 'users' bằng tên biến mảng chứa danh sách người dùng của bạn */}
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50/70 transition-colors group">
                            <td className="p-4 text-slate-400 font-bold text-sm">#{user.id}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    {/* Tạo Avatar từ chữ cái đầu tiên của tên */}
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm border border-indigo-100/50 shadow-sm">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="font-bold text-slate-800 capitalize">{user.name}</div>
                                </div>
                            </td>
                            <td className="p-4 text-slate-600 font-medium text-sm">{user.email}</td>
                            <td className="p-4 text-slate-500 text-sm font-medium">
                                {user.createdAt || user.date ? new Date(user.createdAt || user.date).toLocaleDateString('vi-VN') : '6/8/2026'}
                            </td>
                            <td className="p-4">
                                {/* Hãy thêm lại hàm onChange cập nhật database của bạn vào thẻ select này */}
                                <select 
                                    defaultValue={user.role || 'Khách Hàng'}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none cursor-pointer transition-all hover:border-indigo-300 shadow-sm"
                                >
                                    <option value="Khách Hàng">Khách Hàng</option>
                                    <option value="Editor Content">Editor Content</option>
                                    <option value="Quản Trị Viên">Quản Trị Viên</option>
                                    <option value="Super Admin">Super Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}
             
             {/* COMPONENT QUẢN LÝ BANNERS */}
             {activeTab === 'banners' && (
             <div>
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
        <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
            🖼️
        </div>
        <div>
            <h2 className="text-2xl font-black text-slate-800 leading-tight">
                {editingBannerId ? "Cập Nhật Banner Quảng Cáo" : "Tạo Banner Quảng Cáo Mới"}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Thiết kế các banner nổi bật để thu hút khách hàng.</p>
        </div>
    </div>
    <form onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', bannerForm.title);
        data.append('link', bannerForm.link);
        if (bannerFile) data.append('image', bannerFile);
        
        try {
            if (editingBannerId) {
                await axios.put(`http://localhost:5000/api/banners/${editingBannerId}`, data, { headers: { 'Content-Type': 'multipart/form-data' }});
                toast.success("Đã cập nhật Banner!");
            } else {
                if (!bannerFile) return toast.warning("Vui lòng chọn ảnh!");
                await axios.post('http://localhost:5000/api/banners', data, { headers: { 'Content-Type': 'multipart/form-data' }});
                toast.success("Upload Banner thành công!");
            }
            
            fetchData();
            setBannerForm({ title: '', link: '' }); 
            setBannerFile(null);
            setEditingBannerId(null);
            const fileInput = document.getElementById('bannerImageInput');
            if (fileInput) fileInput.value = '';
        } catch(err) { toast.error("Lỗi xử lý!"); }
    }} className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Dòng tiêu đề phụ (Tùy chọn)</label>
                <input type="text" placeholder="VD: Khuyến mãi mùa hè..." value={bannerForm.title} onChange={e => setBannerForm({...bannerForm, title: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-400" />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Đường dẫn trỏ đến (Tùy chọn)</label>
                <input type="text" placeholder="VD: /category/1" value={bannerForm.link} onChange={e => setBannerForm({...bannerForm, link: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-400" />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Hình ảnh Banner <span className="text-red-500">*</span></label>
                <input type="file" id="bannerImageInput" onChange={e => setBannerFile(e.target.files[0])} className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-sm text-slate-600 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition" />
            </div>
        </div>
        
        <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button type="submit" className="bg-purple-600 text-white px-10 py-3.5 rounded-xl font-bold shadow-[0_8px_20px_rgba(147,51,234,0.24)] hover:bg-purple-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2">
                {editingBannerId ? "💾 Lưu Thay Đổi" : "✨ Đẩy Lên Giao Diện"}
            </button>
            
            {editingBannerId && (
                <button type="button" onClick={() => { 
                    setEditingBannerId(null); 
                    setBannerForm({title: '', link: ''}); 
                    setBannerFile(null); 
                    const fileInput = document.getElementById('bannerImageInput');
                    if (fileInput) fileInput.value = '';
                }} className="bg-slate-100 text-slate-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95">
                    Hủy Bỏ
                </button>
            )}
        </div>
    </form>
</div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-slate-800">Tất Cả Banner Đang Chạy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {banners.map(b => (
                            <div key={b.id} className="border border-slate-200 p-5 rounded-2xl flex flex-col gap-4 bg-slate-50 shadow-sm relative overflow-hidden group">
                                <div className="w-full h-40 bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                                    <img src={`http://localhost:5000${b.imageUrl}`} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="flex flex-wrap gap-2 justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm mt-auto">
                                    <button className={`px-4 py-2 rounded-lg text-sm font-black tracking-wide border-2 transition ${b.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'}`} onClick={async () => {await axios.put(`http://localhost:5000/api/banners/${b.id}/toggle`);fetchData();}}>
                                        {b.isActive ? "⚡ ĐANG PHÁT" : "⏸ ĐÃ TẠM DỪNG"}
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        <button onClick={() => { 
                                            setEditingBannerId(b.id); 
                                            setBannerForm({title: b.title || '', link: b.link || ''}); 
                                            window.scrollTo({top: 0, behavior: 'smooth'}); 
                                        }} className="text-blue-600 bg-blue-50 border-2 border-transparent px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 hover:border-blue-200 transition">
                                            Sửa
                                        </button>
                                        
                                        <button onClick={async () => {if(window.confirm("Thực sự muốn xóa banner này?")) {await axios.delete(`http://localhost:5000/api/banners/${b.id}`);fetchData();}}} className="text-red-600 bg-red-50 border-2 border-transparent px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 hover:border-red-200 transition">
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
             )}
             
             {/* COMPONENT QUẢN LÝ TIN TỨC */}
             {activeTab === 'news' && (
                 <div>
                     <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
        <div className="w-12 h-12 bg-gradient-to-tr from-green-600 to-green-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
            📰
        </div>
        <div>
            <h2 className="text-2xl font-black text-slate-800 leading-tight">Soạn Thảo Tin Tức</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Viết bài chia sẻ, đánh giá hoặc tin tức công nghệ mới nhất.</p>
        </div>
    </div>
    <form onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', newsForm.title);
        data.append('content', newsForm.content);
        if (newsFile) data.append('thumbnail', newsFile);
        try {
            await axios.post('http://localhost:5000/api/news', data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('admin_token')}` }});
            toast.success("Bài viết đã xuất bản!");
            fetchData();
            setNewsForm({ title: '', content: '' }); 
            setNewsFile(null);
        } catch(err) { toast.error("Có lỗi xảy ra!"); }
    }} className="flex flex-col gap-6">
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Tiêu đề bài viết <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Nhập tiêu đề hấp dẫn..." value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3.5 bg-slate-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition font-black text-slate-800 text-lg placeholder:font-normal placeholder:text-slate-400 placeholder:text-base" required />
        </div>
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Ảnh Bìa (Thumbnail) <span className="text-red-500">*</span></label>
            <input type="file" onChange={e => setNewsFile(e.target.files[0])} className="w-full md:w-1/2 border border-slate-300 rounded-xl px-4 py-3 bg-white text-sm text-slate-600 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition" />
        </div>
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nội dung chi tiết <span className="text-[11px] font-semibold text-slate-400 ml-1 uppercase tracking-wider">(Hỗ trợ HTML)</span> <span className="text-red-500">*</span></label>
            <textarea placeholder="<p>Bắt đầu viết nội dung của bạn ở đây...</p>" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-4 h-80 bg-slate-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition text-slate-800 font-medium resize-y leading-relaxed" required />
        </div>
        
        <div className="pt-4 border-t border-slate-100">
            <button type="submit" className="bg-green-600 text-white px-10 py-3.5 rounded-xl font-bold shadow-[0_8px_20px_rgba(22,163,74,0.24)] hover:bg-green-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 w-full md:w-auto justify-center">
                🚀 Xuất Bản Ngay
            </button>
        </div>
    </form>
</div>
                     <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                         <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-slate-800">Kho Lưu Trữ Bài Viết</h2>
                         <div className="space-y-4">
                             {news.map(n => (
                                 <div key={n.id} className="border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row gap-5 bg-white shadow-sm hover:shadow-md transition items-start md:items-center justify-between">
                                     <div className="flex gap-5 items-center w-full md:w-auto">
                                         {n.thumbnail ? <img src={`http://localhost:5000${n.thumbnail}`} className="w-24 h-24 object-cover rounded-lg border shadow-sm" /> : <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">Trống</div>}
                                         <div className="flex-1">
                                             <h3 className="font-black text-lg text-slate-800 line-clamp-2 leading-tight">{n.title}</h3>
                                             <div className="flex flex-wrap gap-3 mt-2 text-sm">
                                                 <span className="bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded">🗓 {new Date(n.createdAt).toLocaleDateString('vi-VN')}</span>
                                                 <span className="bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded">👁️ Lượt xem: {n.views}</span>
                                             </div>
                                         </div>
                                     </div>
                                     <button onClick={async () => {
                                         if(window.confirm("Cảnh báo: Hành động này không thể hoàn tác. Xóa?")) {
                                             await axios.delete(`http://localhost:5000/api/news/${n.id}`);
                                             fetchData();
                                         }
                                     }} className="text-red-600 bg-red-50 border border-transparent px-6 py-2.5 rounded-xl font-bold hover:bg-red-100 hover:border-red-200 transition w-full md:w-auto text-center">Gỡ Bỏ</button>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             )}
             {/* COMPONENT QUẢN LÝ CÀI ĐẶT GIAO DIỆN */}
             {activeTab === 'settings' && (
                 <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8 animate-fade-in">
                     <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
                         <div className="w-12 h-12 bg-gradient-to-tr from-slate-700 to-slate-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
                             ⚙️
                         </div>
                         <div>
                             <h2 className="text-2xl font-black text-slate-800 leading-tight">Cài Đặt Giao Diện Website</h2>
                             <p className="text-sm text-slate-500 font-medium mt-1">Tùy chỉnh Logo và Bật/Tắt các khu vực hiển thị trên Trang chủ.</p>
                         </div>
                     </div>

                     <form onSubmit={saveSettings} className="space-y-8">
                         {/* Logo Settings */}
                         <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2"><span className="text-blue-500">■</span> Tùy Chỉnh Logo (Dạng Chữ)</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 mb-2">Phần chữ chính (Màu Xanh)</label>
                                     <input type="text" value={uiSettings.shopName} onChange={e => setUiSettings({...uiSettings, shopName: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 font-bold" />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-bold text-slate-700 mb-2">Phần chữ nổi bật (Màu Trắng/Đen)</label>
                                     <input type="text" value={uiSettings.shopHighlight} onChange={e => setUiSettings({...uiSettings, shopHighlight: e.target.value})} className="w-full border border-slate-300 rounded-xl px-5 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 font-bold" />
                                 </div>
                             </div>
                         </div>

                         {/* Section Toggles */}
                         <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2"><span className="text-purple-500">■</span> Ẩn/Hiện Khu Vực Trang Chủ</h3>
                             <div className="space-y-4">
                                 <label className="flex items-center gap-3 cursor-pointer group">
                                     <input type="checkbox" checked={uiSettings.showSale} onChange={e => setUiSettings({...uiSettings, showSale: e.target.checked})} className="w-6 h-6 accent-blue-600 rounded cursor-pointer" />
                                     <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Hiển thị khu vực "⚡ Ưu Đãi Tháng Này" (Sản phẩm Giảm Giá)</span>
                                 </label>
                                 <label className="flex items-center gap-3 cursor-pointer group">
                                     <input type="checkbox" checked={uiSettings.showCategories} onChange={e => setUiSettings({...uiSettings, showCategories: e.target.checked})} className="w-6 h-6 accent-blue-600 rounded cursor-pointer" />
                                     <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Hiển thị khu vực "📦 Danh Mục Sản Phẩm"</span>
                                 </label>
                                 <label className="flex items-center gap-3 cursor-pointer group">
                                     <input type="checkbox" checked={uiSettings.showNews} onChange={e => setUiSettings({...uiSettings, showNews: e.target.checked})} className="w-6 h-6 accent-blue-600 rounded cursor-pointer" />
                                     <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Hiển thị khu vực "📰 Tin Tức & Đánh Giá"</span>
                                 </label>
                             </div>
                         </div>

                         <div className="pt-4 border-t border-slate-100">
                             <button type="submit" className="bg-slate-900 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-md">
                                 💾 Lưu Cài Đặt & Khởi Động Lại
                             </button>
                         </div>
                     </form>
                 </div>
             )}
             {/* COMPONENT KIỂM DUYỆT ĐÁNH GIÁ */}
{activeTab === 'reviews' && (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 to-orange-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
                ⭐
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800 leading-tight">Kiểm Duyệt Đánh Giá</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Quản lý phản hồi và trải nghiệm của khách hàng về sản phẩm.</p>
            </div>
        </div>

        <div className="space-y-6">
            {allReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <span className="text-5xl mb-4 opacity-50">💬</span>
                    <p className="text-slate-500 font-medium text-lg">Hệ thống chưa nhận được phản hồi nào.</p>
                </div>
            ) : (
                allReviews.map(review => (
                    <div key={review.id} className="border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row gap-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 items-start justify-between relative group">
                        
                        {/* Thông tin SP và User */}
                        <div className="flex gap-5 w-full md:w-auto flex-1">
                            <div className="w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden p-2">
                                {review.product.image ? <img src={`http://localhost:5000${review.product.image}`} className="w-full h-full object-cover rounded-xl" /> : <span className="text-xs text-slate-400">Trống</span>}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-lg hover:text-blue-600 transition cursor-pointer mb-2 line-clamp-1">{review.product.name}</h3>
                                
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg text-xs flex items-center gap-1.5">
                                        👤 {review.user.name}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                                        🕒 {new Date(review.createdAt).toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                
                                <div className="flex text-yellow-400 text-lg mb-4 drop-shadow-sm">
                                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                </div>
                                
                                {/* Khung bình luận dạng Bubble */}
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
                                    <span className="absolute -top-4 left-4 text-4xl text-slate-300 font-serif leading-none">"</span>
                                    <p className="text-slate-700 text-sm font-medium italic leading-relaxed relative z-10 pt-1">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Nút Xóa */}
                        <button onClick={async () => {
                            if(window.confirm("Xóa vĩnh viễn bình luận này khỏi hệ thống?")) {
                                try {
                                    await axios.delete(`http://localhost:5000/api/admin/reviews/${review.id}`);
                                    fetchData();
                                    toast.success("Đã lọc đánh giá!");
                                } catch(e) { toast.error("Lỗi hệ thống"); }
                            }
                        }} className="text-red-600 bg-white border-2 border-red-100 px-8 py-3 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-all w-full md:w-auto shadow-sm flex-shrink-0 active:scale-95">
                            Xóa Bỏ
                        </button>
                    </div>
                ))
            )}
        </div>
    </div>
)}
        </main>
    </div>
  );
}
// 5. COMPONENT BỌC NỘI DUNG VÀ ĐIỀU HƯỚNG
// ==========================================
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const { totalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
const uiSettings = JSON.parse(localStorage.getItem('app_ui_settings')) || { shopName: 'CAMERA', shopHighlight: 'SHOP' };
  // 1. Thêm State quản lý Dark Mode
  // 1. Lấy trạng thái Dark Mode riêng biệt dựa theo URL (Admin hay Khách)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storageKey = window.location.pathname.startsWith('/admin') ? 'admin_theme' : 'client_theme';
    return localStorage.getItem(storageKey) === 'dark';
  });

  // 2. Tự động đổi màu nền ngay khi người dùng chuyển tab giữa Khách <-> Admin
  useEffect(() => {
    const storageKey = isAdminRoute ? 'admin_theme' : 'client_theme';
    setIsDarkMode(localStorage.getItem(storageKey) === 'dark');
  }, [isAdminRoute]);

  // 3. Cập nhật giao diện và lưu đúng vào vùng nhớ của trang hiện tại
  useEffect(() => {
    const storageKey = isAdminRoute ? 'admin_theme' : 'client_theme';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(storageKey, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(storageKey, 'light');
    }
  }, [isDarkMode, isAdminRoute]);

  // Tự động cuộn lên đầu trang mỗi khi chuyển route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
   <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col print:bg-white transition-colors duration-300">
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold text-blue-400 tracking-wider hover:text-white transition">
            {uiSettings.shopName}<span className="text-white">{uiSettings.shopHighlight}</span>
          </Link>
          
          {!isAdminRoute ? (
            <div className="flex items-center gap-6 font-medium">
                <Link to="/" className="hover:text-blue-400 transition">Trang Chủ</Link>
                <Link to="/cart" className="relative text-white hover:text-blue-400 transition flex items-center gap-2">
                  Giỏ Hàng
                  {totalItems > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full absolute -top-2 -right-4">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {user ? (
                 <div className="relative group ml-4 cursor-pointer">
                    <div className="flex items-center gap-2 text-white hover:text-blue-400 transition py-2">
                    {user.avatar ? (
                      <img src={`http://localhost:5000${user.avatar}`} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                    ) : (
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                    <span>Chào, {user.name || user.fullName || 'Bạn'}</span>
                  </div>
                    
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl text-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                       <Link to="/profile" className="block px-5 py-3 hover:bg-slate-50 border-b font-medium">
                          👤 Quản lý tài khoản
                       </Link>
                       <button onClick={() => { logout(); window.location.href = '/login'; }} className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 font-bold transition">
                          🚪 Đăng xuất
                       </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="hover:bg-blue-600 hover:text-white transition border border-blue-400 text-blue-400 px-4 py-2 rounded-lg ml-4">
                    Đăng Nhập
                  </Link>
                )}
                {/* THÊM NÚT DARK MODE CHO KHÁCH HÀNG Ở ĐÂY */}
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-10 h-10 ml-4 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95 text-lg"
                    title={isDarkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
                {/* Nút bật/tắt Dark/Light Mode */}
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95 text-lg"
                    title={isDarkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner">
                        <svg className="w-5 h-5 animate-[spin_10s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="font-extrabold text-white uppercase tracking-[0.15em] text-sm md:text-base leading-none">
                            Quản Trị <span className="text-blue-400">Hệ Thống</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
                            Dành Cho Quản Trị Viên
                        </span>
                    </div>
                </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex-1 print:m-0 print:p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      
      {/* KHỐI FOOTER MỚI */}
      {!isAdminRoute && (
          <footer className="bg-slate-900 text-slate-300 py-12 text-sm mt-16 print:hidden border-t-4 border-blue-600">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Cột 1: Thông tin Đồ án & Sinh viên */}
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-2xl font-extrabold text-blue-400 tracking-wider hover:text-white transition inline-block mb-2">
                  CAMERA<span className="text-white">SHOP</span>
                </Link>
                <p className="text-slate-400 leading-relaxed text-justify">
                  Hệ thống cửa hàng thương mại điện tử chuyên cung cấp thiết bị nhiếp ảnh chính hãng. Giao diện được thiết kế tối ưu trải nghiệm người dùng, xây dựng hoàn toàn bằng MERN Stack.
                </p>
                <div className="mt-4 p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-inner">
                  <p className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Thông tin đồ án</p>
                  <ul className="space-y-1 text-slate-300">
                    <li>Trường: <span className="text-white font-medium">Đại học Văn Hiến</span></li>
                    <li>Sinh viên: <span className="text-white font-medium">Nguyễn Tâm Duy Cường</span></li>
                    <li>MSSV: <span className="text-blue-400 font-bold">221A010933</span></li>
                    <li>Ngành: <span className="text-white font-medium">Công Nghệ Phần Mềm</span></li>
                  </ul>
                </div>
              </div>

              {/* Cột 2: Thông tin liên hệ */}
              <div className="flex flex-col gap-4 md:pl-10">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 border-b border-slate-700 pb-2">Liên Hệ</h3>
                <p className="flex items-start gap-3 hover:text-blue-400 transition cursor-pointer">
                  <span className="text-lg">📍</span> 
                  <span>Trụ sở: Thành phố Hồ Chí Minh</span>
                </p>
                <p className="flex items-center gap-3 hover:text-blue-400 transition cursor-pointer">
                  <span className="text-lg">📞</span> 
                  <span>Hotline: <strong className="text-white">0327.075.390</strong></span>
                </p>
                <p className="flex items-center gap-3 hover:text-blue-400 transition cursor-pointer">
                  <span className="text-lg">✉️</span> 
                  <span>Email: duycuongghe@camerashop.vn</span>
                </p>
              </div>

              {/* Cột 3: Liên kết nhanh & Chính sách */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 border-b border-slate-700 pb-2">Hỗ Trợ Khách Hàng</h3>
                
                {/* Menu liên kết */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className="flex flex-col gap-3">
                    <Link to="/" className="hover:text-blue-400 transition flex items-center gap-2">
                      <span className="text-blue-500">▪</span> Trang Chủ
                    </Link>
                    <Link to="/cart" className="hover:text-blue-400 transition flex items-center gap-2">
                      <span className="text-blue-500">▪</span> Giỏ Hàng
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="hover:text-blue-400 transition flex items-center gap-2 cursor-pointer">
                      <span className="text-blue-500">▪</span> Chính sách bảo hành
                    </span>
                    <span className="hover:text-blue-400 transition flex items-center gap-2 cursor-pointer">
                      <span className="text-blue-500">▪</span> Chính sách đổi trả
                    </span>
                  </div>
                </div>

                {/* Form Đăng ký nhận bản tin */}
                <div className="mt-2 bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 shadow-inner">
                  <p className="font-bold text-white mb-1 text-sm tracking-wide">ĐĂNG KÝ NHẬN KHUYẾN MÃI</p>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">Đừng bỏ lỡ các voucher giảm giá cực sốc hàng tháng!</p>
                  <form className="flex shadow-sm" onSubmit={(e) => { 
                      e.preventDefault(); 
                      alert('Cảm ơn bạn đã đăng ký nhận bản tin!'); 
                      e.target.reset();
                  }}>
                    <input 
                      type="email" 
                      placeholder="Email của bạn..." 
                      required 
                      className="w-full bg-slate-900 text-white px-3 py-2.5 rounded-l-lg outline-none border border-slate-700 focus:border-blue-500 text-sm transition-colors" 
                    />
                    <button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-r-lg font-bold transition-colors text-sm"
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Dòng Copyright */}
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; 2026 Camera Shop. All rights reserved.</p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/dcuong2kar4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white cursor-pointer transition"
                >
                  Facebook
                </a>
                <a 
                  href="https://github.com/duycuong2kar4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white cursor-pointer transition"
                >
                  Github
                </a>
              </div>
            </div>
          </footer>
      )}
      <ToastContainer position="bottom-right" autoClose={2000} className="print:hidden" />
    </div>
  )
}

// ==========================================
// 6. MAIN ROUTER 
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}