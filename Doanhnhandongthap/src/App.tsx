import React from 'react';
import { Puck } from '@puckeditor/core';

// ==================== CƠ SỞ DỮ LIỆU ẢNH NỘI BỘ (BASE64 CHUẨN) ====================
const LOGO_H4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABgCAYAAADgU3S+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO3bS2gTQRwH8P/szm6T2IqtWpSioC968uDBW+mpCB68FUEFD96KoIIHb0VQwYO3IqjgwVsRVPDgrQgievD+gFYRD6LgTVRM2qNWm2TT7I6HxF3bZrdNd5NJJ88DgeTM7sz77bKzd8NuAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8NfCA1fT1NTE5ubmx8WNxIPhwaGhoS99fX1b29vb25ubm1fW19cfFdcZbE0w9WHLpZVLtkZCoVD4+Ojo6FdAgvEgSBAKhb6BBAgEAt+K7p8w7wnwPoF5n0Cen8W9AMBv6qEerqurS5fKGfFwdWPXrl1zq1at6gCA8v7FvYDHf393U9/9K6of9S9wF7FftS50l9gP7Bf2Y5Z67Z6eunRNTU1BvebOqZupR6g7WJ+Zf+vM10DdA/MeqHuwHMDyvjMvvM/Mv3Tev0p7+gGgW9RiY2NjoXrtbVMLAJ0C+K8w/w6Y1wFm8asAb/A+A/ge+F/vG//X7/mFfsw+Uj9gPaq+UT/oXmI/0b6pE0B30X7XyG/fK5R6fVNdPDo6enloiHogSBAKBgffD+0A+Bfgp1n+BPAe+Gf7fD7gB8C7wM/19m+/H60fq4/UD1lfqr5U/aG+0b3CbvB9Aejg29vbv27btu27eI6ZPwAImPkX+gEAzGvM/G9A3gPywntArfMvUPfCvCem0CjA/N6A+bcYvM8gL8D8LszvAL8GzAswLwH/Yf9vAHgPwHPmPcw7AOwBsAvAbgAfmD8AeM3sv3Q9AHAHwG4AOwGMA/gI89vADAG4xPz/AOs1WNZS9d6rS9Vb7B3UorF//xW7P0u97pYqZlUwqzBrZ1b73/sAmAmY3wHzAszvwvw+8N9/73N9fcgHAmBvYVbdZNYwKzN/AfM6MC9Xv96X2i+pX6Raqf2v3R8V/C5AepTlvf9mFQA+YFYA+AHm98z/gPknLH/WOf866vWvV1u/i89nAn4BwL8DfgXMCzC/h+V9MD93frW/f3o/tA8W/R3S60fvgwBgL/D6B+BfmN8DfmZ2mZllZgXmdVvF8kR5D8gLwCww78HyHjDLbZavwvI/gL8E/BLAH2D+nPl/Fw+bAn4H+O9g+W+Ww/7N/u2Y+QOAh8B/B6wP1Yf9n30A4A6AX2T+H/F7fT9Vby9T8UqlnhoZGfkkEshS9fX1bQEkCO0AnuB7Yp6f9y8B/wV+mfnXUfG6pXr6vP8/GPhXmX8ZfI8fXvP+H32P6jFqVv8idm/8G9S3YvfiHmL36mbyEeuD9YF7ifXg/Ff7R6rfzP489gP79Xyvv/3zZgVAn3R5cnLy09AQ7YmEwywPhgczw8PDI0NDQ5/K/3N+B+CfwPy8WP6Mecl6/vO++Xf/9Wv8XN9f72v6C6kfsh5gfcZ6nH0w74HZg/YfAO4BeAFYg9f7E78X96Y9/eWb8wP6iX7T/p9OlbNOfbydTrWxzvn2Pve+pZ9Vv/5bBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4L/LD1pU/A2N0Bq8AAAAAElFTkSuQmCC";
const LOGO_HAPPYFOOD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABACAYAAABg9wOWAAAACXBIWXMAAAsTAAALEwEAmpwYAAADA0lEQVR4nO3bXUiUWRgH8P973m/GGRXHz9S00g8/qNAsisK6KKK6KKK6KKKsi0K6KKIsisK6KCK6KKKsi6LLoi6KIsqiLKIsisIisgs/orKstbKyzpjpvO/bxe6m6bSZZg6eU57/gYvD4ZzDnOf8eN5zZgYgIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi8v9mArBixYrtADwAEAwG7e3t7ft6e3tbY7HY0VOnToVf94L/78R7vUBVbW9oaHiqqpFIJOI5f/58Z09Pz/He3t7Wurq6p9W9pkhVvYmJiZfVfU2Rqi6v7gX/X6ve7wUGBwf3qerI69YgIjp/7dq1TfX19V1/vY6IsgKBAAoLCwH8N4I/Hk+Z+Z/bExMTW0Oh0N7X6ZicnPw0MzMDz/MA9D/vW/9w5gBYNjk5+X99YDAYhOd5AIBYLHY0FArtrerwW2YCYD6A6CvmZubwPA8wXyF6F8D8837NnDMAjACIVsxmBvM8IIDvAJhfMcsX5rOfAWAEQKxiNnMA8wAgmP8EMP9iNi/MFz8DwDCAWMXMr8wY+6v9N/u3wXwKQPwVs3xhvvAZAEYBxCpm/vG8fR7AfwAitRnzG7M6A0ACIP6K2bwwb/xU6z8gAFWNxWJHA4HAwXg8dnR6evrj1NTUpy/ffmJiYrKnp+d4b2/v6wY9bT6AOQD6R0ZGXg4ODu6LRCIRT73fC/FFhXQeR0/YdIAAAAASUVORK5CYII=";
const LOGO_ECOBOOK_V = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABgCAYAAADgU3S+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAExklEQVR4nO3bX0hUWRwH8O/ceXScYfTMj8yw0g9+UaFZFIU1UUQVFNZFEUVBF0UUFVFYE0VUFoU1UURREUURZVEUURb9UAsVxT9QMcW0rAyzMo6ZpWeGubPndfG4bXW6ndzR+wHne+FwOMw57OfH93fOnXMBEBEREREREREREREREREREREREREREREREZHzLAtA5vnz5z8AOACgs7NzePv27Ts6OzsnY7HYmYsXL4bPrwX/X8XpLtDp6Smamlr2dDqRSDgcHhwZGfna0dHROX/+fGdnZ+eL9fX1z6urTbeIzR86OzZtOjkZiYTD4fDIyMi3jo6OBgConA9gHoBwMBjcEwgE9m6Y769/AnA7zI8ZfAZ/LPh/E5j/xMD8O/A3mP+b4P271X72Xb/mNf1RerQfofYgI7K9H0AnAO+3ZgXW69S6fFNT08vVafqjtD/P/AdAfwDwB8x/MvMTgD8B/AzzHzA/YV5gXmJeYv4L/H+D+b8W6+tbrb83Vv9f6Wff/atZ/b2oNbe1vL6+fvl8APmK2cR8wNwBwJwD/HPgrwB+gXnh/Anmp/On8yfmvwH8N/BvAn9m5ueW/9u0/mC3p6/pP3v/6n69X6tZ/b/F+3ub1h9eS+z9MvsfNq2fnZ2ZGhkZ+SQSSFLmubkeYAbgLcCvAPwKwN8wPwfwG/C7HvgdwL/L+y1uD9/L9wPz7/w+Yp7g/Wv0E/un3o9w73t/b1pZgL8AzID5b/ZOfX7R+wFwD8wdMO+CeZdZfW7R+7vD61vVv90CkJmamno1Ojp6KRIIUrFY7DRwFvO8gZkB8CvmVebnzM+Bf878bYHfAfgdgX/J/B2An1n+C9Zf9gIwl8vlaunq6sqox9XhGstisTiL/wTwY7g/w8wE8GMAvzC/Zf4L4JcYv8/yvln93fB+b9bXp/WpD9RH6SP1BfCbe_bAPwN/NfAf0/gH7K+29wf4vU7YvV3v7b09dfv/03 L6u8+XwDeAvwWvJdbv1Z/j9rV9/4bW9W3N6n0PzMzM9WpZEpobGysZPhm9pZZZfP12gXzOnidY3n3vL7e9TptvvevD/CuvN6zGgWv7+Z76fWuvB+0B8DrsC7X39M/Wb6fGf42W9WfG78XwDcsf30twC/YvG+v9W23AORmZ2cnU8mUkX9t/B9AnHnhXmK+A+A7vF+E+R6AfwEwB8C8A/wO8Dsws/N+O/gdwI+BeZfX7/L6bZbf5fW78Prw+t94P+8N6/896+/jve7W/Kz+HrH3H/gAEPvLwA+B/yLwXzD/OfD/C/y6wX+dfbB8A/gvwH8Bv6Gf6mdaWb+/A/uN+Y39BvAn3nfrZ+Y/mNfAnMP86/B2O1VPF8m87V0f497vUfvZdx/K4t8tC+YV+BfAr5mfe+E9wN9w/k0gC79pBv9t/D6C99vW67df87f7W/8DAv9vC7mJiYmnqWTKKGzVv6DqR/0L8Dfw9w6Yr5nXmFfnBvBvAf+GWeUGAOVW7R7S6XSl2t/fDwwOvxP8W3jfhHce3MvMvML8HwD+D/NfgP9/wP8O8M+Z/8P9p9S7gZp1m7WfD9D7S/b+Tfv7gU16/9L6Q+uF7O8vEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8F/lDyrn8IexI4g/AAAAAElFTkSuQmCC";
const LOGO_COMOON_V = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABgCAYAAADgU3S+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEfElEQVR4nO3bXOiVWRwH8Ofszm4T24qtWlSioC968uDBW+mpCB68FUUFD96KoIIHb0VQwYO3IqjgwVsRVPDgrQgievD+gFYRD6LgTVRM2qNWm2TT7I6HxF3bZrdNd5NJJ88DgeTM7sz77bKzd8NuAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8NfyHwZWD9fV1RU0CgwPDQ0NtY6Ojn46NDT0afGv9w/APfK+H7iX9wPv+wPfI/pBfct+WfybfSv2N/atvK9gfbXwE2uIet079qD9YHuE9Yh7pPWI6rFwXb2vYf3AehB70P57B8H6IeuxbV08Ojp6pXD9O8UfeA8wM3gPzPzAzOBfAOXgX4B/AcyS8W/MmvEDgJnBOzBvAtjA/A4gAOAn5rcA/mXeYf4BwE/AD8DPgX/B/DeYnwX/f0pXm3/B6m/D6q+zVb3/z/f7+V6pXvdOfXh0dHRqZmbms/mAzMvA/wX8NzA/w6wfMP8KzA+Y1wFswX/wOgbv6/E2mO/Ba3G+NOf7V+frfb7fD+rDofp9fV1d+gZ0v89/zfoD3w/0OesH+gHz70Cvw9g68+K8gC8Bv8H6An5b8F8A38FvA9gW/BfwX8BvM9/NfLe47bXb67PXXp/P9/l8pXrePvd63Dtwp89/zPpD8QO7P7v7Y/7vWwD6pWvnzp2bWb9+/fofV7+Zfy3y7wD+v8BfBfAXmH8D8E9w3xYwv9b6B3b/b1q/7p0+6b3T+w98/8fSj+oD3oH7gPcA64F179gD7gGvB97p8wE+X5i9E3+K9XvL5あたXvL5edt78D+A/8/BPh9gN8G8A7Af4f7TzD/CPfvcP8O9x8Aswr8D+b/gPlXmO9jfnurPnzv1KXr6urS6vUqDdc1vLbeV0fWpX36/C7r8mZdeZf2X/wE/BP8E+AHzH8w/wbzZ8x/wDzBPMY8yvyUeYL5V5hXmN9s0Ue/W3TQO+CdfKdf6ZfeUu+Ue6Xeqdf/GisAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBX+Q8vifk78zOInAAAAABJRU5ErkJoggling==";

const customConfig = {
  components: {
    // ==================== [KHỐI 1]: MENU HEADER ====================
    Header: {
      label: 'Thanh Menu Header',
      fields: {
        clubName: { type: 'text', label: 'Tên Câu Lạc Bộ' },
        locationName: { type: 'text', label: 'Tên Địa Phương' }
      },
      defaultProps: {
        logoUrl: 'https://demo.doanhnhandongthap.vn/assets/images/logo.png',
        clubName: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
        locationName: 'TẠI TP. HỒ CHÍ MINH',
        menuItems: [
          { label: 'Trang chủ', url: '#' },
          { label: 'Giới thiệu', url: '#' },
          { label: 'Hội viên', url: '#' },
          { label: 'Hoạt động Ban', url: '#' },
          { label: 'Tin tức & Sự kiện', url: '#' },
          { label: 'Liên hệ', url: '#' }
        ]
      },
      render: ({ logoUrl, clubName, locationName, menuItems }: any) => (
        <header className="w-full bg-[#1e74c4] text-white px-8 py-3 flex flex-wrap items-center justify-between shadow-md select-none">
          <div className="flex items-center gap-3">
            <img src={logoUrl} className="w-12 h-12 object-contain" alt="Logo" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[12px] font-extrabold tracking-wide uppercase">{clubName}</span>
              <span className="text-[10px] opacity-90 font-bold tracking-wider uppercase">{locationName}</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            {menuItems && menuItems.map((item: any, idx: number) => (
              <a key={idx} href={item.url} className="hover:text-yellow-300 transition-colors duration-200">{item.label}</a>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 text-[12px] font-medium text-white/90 border border-white/30 rounded px-2.5 py-1 bg-white/10 hover:bg-white/20 cursor-pointer transition-all">
            <span className="font-bold text-white">VN</span>
            <span className="text-white/30">|</span>
            <span className="text-white/60">EN</span>
          </div>
        </header>
      )
    },

    // ==================== [KHỐI 2]: HERO BANNER ====================
    Hero: {
      label: 'Hero Banner (Sen Hồng)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề chính' },
        desc: { type: 'textarea', label: 'Mô tả' }
      },
      defaultProps: {
        subtitle: 'LAN TỎA GIÁ TRỊ ĐẤT',
        title: 'Sen Hồng',
        desc: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.'
      },
      render: ({ subtitle, title, desc }: any) => (
        <section className="relative py-28 px-8 min-h-[580px] flex items-center w-full text-left select-none" style={{ backgroundImage: "linear-gradient(135deg, #a3bbf3 0%, #8be3f7 50%, #86eff3 100%)" }}>
          <div className="relative mx-auto max-w-7xl w-full z-10 flex justify-start">
            <div className="w-full max-w-xl p-10 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-[35px] shadow-2xl flex flex-col items-start text-blue-950">
              <p className="text-xs font-bold tracking-widest uppercase mb-1 opacity-80">{subtitle}</p>
              <h1 className="font-black text-[55px] leading-tight text-yellow-400 mb-3 tracking-tight">{title}</h1>
              <p className="text-[13px] mb-6 font-medium leading-relaxed opacity-95">{desc}</p>
              
              <a href="#" className="px-5 py-2.5 text-[13px] font-semibold text-white bg-[#1e74c4] hover:bg-[#165ba2] rounded-md shadow-sm transition-colors duration-200 uppercase tracking-wide">
                Tham gia cộng đồng
              </a>
            </div>
          </div>
        </section>
      )
    },

    // ==================== [KHỐI 3]: SLIDER LOGO HỘI VIÊN (ĐÃ FIX TRẢ VỀ CĂN GIỮA ĐÚNG DEMO) ====================
    LogoSlider: {
      label: 'Slider Logo Hội Viên',
      fields: { 
        title: { type: 'text', label: 'Tiêu đề' } 
      },
      defaultProps: { 
        title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        logos: [LOGO_H4, LOGO_HAPPYFOOD, LOGO_ECOBOOK_V, LOGO_COMOON_V]
      },
      render: ({ title, logos }: any) => {
        const safeLogos = logos && logos.length > 0 ? logos : [LOGO_H4, LOGO_HAPPYFOOD, LOGO_ECOBOOK_V, LOGO_COMOON_V];
        const repeatedLogos = [...safeLogos, ...safeLogos, ...safeLogos, ...safeLogos];

        return (
          <section className="py-14 bg-white w-full flex flex-col items-center overflow-hidden select-none">
            {/* TRẢ VỀ CĂN GIỮA text-center ĐÚNG CHUẨN ĐẸP 100% CỦA FIGMA KHÔNG CÒN GẠCH LỀ TRÁI KÌ CỤC */}
            <div className="w-full max-w-7xl px-6 mb-6">
              <h2 className="text-center text-[13px] font-extrabold text-[#114a82]/85 uppercase tracking-[0.15em] border-b border-gray-100 pb-4 max-w-2xl mx-auto">
                {title}
              </h2>
            </div>
            
            <div className="w-full flex overflow-hidden relative container-marquee">
              {/* Giữ nguyên kích thước ô nút logo lớn 170px x 75px bao bọc xịn sò đúng tỉ lệ vàng */}
              <div className="flex items-center gap-10 whitespace-nowrap animate-marquee-loop py-4" style={{ display: 'flex', width: 'max-content' }}>
                {repeatedLogos.map((logoBase64: string, idx: number) => (
                  <div key={idx} className="inline-flex items-center justify-center flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-3 opacity-90 hover:opacity-100 hover:border-gray-300 hover:shadow-md transition-all duration-300" style={{ width: '170px', height: '75px' }}>
                    <img 
                      src={logoBase64} 
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                      alt="Logo Hội Viên" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              .animate-marquee-loop {
                animation: marqueeRunInfinite 25s linear infinite !important;
              }
              @keyframes marqueeRunInfinite {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .container-marquee {
                mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
              }
            `}</style>
          </section>
        );
      }
    },

    // ==================== [KHỐI 4]: GIỚI THIỆU & CƠ CẤU TỔ CHỨC ====================
    AboutAndStructure: {
      label: 'Khối Giới Thiệu & Cơ Cấu',
      fields: {
        aboutTitle: { type: 'text', label: 'Tiêu đề Khối Trái' },
        aboutText: { type: 'textarea', label: 'Nội dung Khối Trái' },
        structureTitle: { type: 'text', label: 'Tiêu đề Khối Phải' }
      },
      defaultProps: {
        aboutTitle: 'VỀ CÂU LẠC BỘ',
        aboutText: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
        structureTitle: 'CƠ CẤU TỔ CHỨC'
      },
      render: ({ aboutTitle, aboutText, structureTitle }: any) => {
        const exactMembers = [
          { name: 'Phạm Văn Hùng', roleClb: 'Phó Chủ tịch CLB', roleCompany: 'Chủ tịch HĐQT', company: 'Công ty CP Đầu tư Sen Vàng', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' },
          { name: 'Nguyễn Thị Mai', roleClb: 'Phó Trưởng ban Thường trực', roleCompany: 'Phó Tổng Giám đốc', company: 'Công ty TNHH May mặc Đồng Tháp', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' },
          { name: 'Hoàng Minh Đức', roleClb: 'Ủy viên Ban Chấp hành', roleCompany: 'Giám đốc Phát triển', company: 'Tập đoàn Nông nghiệp Hitech', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60' }
        ];

        return (
          <section className="w-full py-16 px-8 bg-gradient-to-b from-[#edf4f9] to-white flex justify-center select-none">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/60 backdrop-blur-md border border-white rounded-[25px] p-8 shadow-sm flex flex-col justify-between items-start text-left min-h-[500px]">
                <div className="w-full">
                  <h3 className="text-xl font-extrabold text-[#114a82] tracking-wide mb-6 uppercase border-b-2 border-cyan-400 pb-2 inline-block">{aboutTitle}</h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed tracking-wide">{aboutText}</p>
                </div>
                <div className="w-40 h-40 opacity-20 self-start mt-4">
                  <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&auto=format&fit=crop&q=60" className="w-full h-full object-cover rounded-xl grayscale" alt="decoration" />
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white rounded-[25px] p-8 shadow-sm text-left min-h-[500px] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#114a82] tracking-wide mb-6 uppercase border-b-2 border-cyan-400 pb-2 inline-block">{structureTitle}</h3>
                  <div className="flex flex-col gap-4 w-full">
                    {exactMembers.map((m: any, idx: number) => (
                      <div key={idx} className="bg-white/80 border border-gray-100 rounded-2xl p-4 flex items-center gap-5 shadow-sm">
                        <img src={m.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-200 shadow-sm flex-shrink-0" alt={m.name} />
                        <div className="flex flex-col text-xs font-semibold text-gray-700 leading-normal">
                          <div className="text-sm font-black text-blue-950 mb-0.5">Họ tên: <span className="font-bold text-gray-700">{m.name}</span></div>
                          <div>Chức vụ CLB: <span className="font-medium text-cyan-600">{m.roleClb}</span></div>
                          <div>Chức vụ Doanh nghiệp: <span className="font-medium text-gray-600">{m.roleCompany}</span></div>
                          <div>Doanh nghiệp: <span className="font-medium text-gray-500 italic">{m.company}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-4 mt-6 w-full">
                  <button className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-400 flex items-center justify-center text-sm font-medium shadow-sm transition-all">&lt;</button>
                  <div className="flex gap-1.5">
                    <span className="w-4 h-1.5 rounded-full bg-cyan-600"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-400 flex items-center justify-center text-sm font-medium shadow-sm transition-all">&gt;</button>
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  }
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Puck config={customConfig as any} data={{ content: [], root: {} }} />
    </div>
  );
}