import React from 'react';
import { Puck } from '@puckeditor/core';

// ==================== CƠ SỞ DỮ LIỆU ĐƯỜNG DẪN ẢNH LOCAL (FOLDER PUBLIC) ====================
const LOGO_HỘI_VIÊN_1 = "/logo1.png";
const LOGO_HỘI_VIÊN_2 = "/logo2.png";
const LOGO_HỘI_VIÊN_3 = "/logo3.png";
const LOGO_HỘI_VIÊN_4 = "/logo4.png";
const LOGO_HỘI_VIÊN_5 = "/logo5.png";
const LOGO_HỘI_VIÊN_6 = "/logo6.png";
const LOGO_HỘI_VIÊN_7 = "/logo7.png";
const LOGO_HỘI_VIÊN_8 = "/logo8.png";

// Đường dẫn ảnh của khối Giới Thiệu & Cơ Cấu
const ABOUT_BG_TECH = "/about-bg.png";
const AVATAR_HUNG = "/member1.png";
const AVATAR_MAI = "/member2.png";
const AVATAR_DUC = "/member3.png";

const customConfig = {
  components: {
    // ==================== [KHỐI 1 & 2: HEADER & HERO BANNER] ====================
    HeaderAndHero: {
      label: 'Khối Menu & Hero Banner',
      fields: {
        clubName: { type: 'text', label: 'Tên Câu Lạc Bộ' },
        locationName: { type: 'text', label: 'Tên Địa Phương' },
        logoUrl: { type: 'text', label: 'Đường dẫn ảnh Logo Header' },
        subtitle: { type: 'text', label: 'Nhãn phụ Hero' },
        title: { type: 'text', label: 'Tiêu đề chính Hero' },
        desc: { type: 'textarea', label: 'Mô tả chi tiết Hero' }
      },
      defaultProps: {
        logoUrl: '/logo.png', 
        clubName: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
        locationName: 'TẠI TP. HỒ CHÍ MINH',
        menuItems: [
          { label: 'Trang chủ', url: '#' },
          { label: 'Giới thiệu', url: '#' },
          { label: 'Hội viên', url: '#' },
          { label: 'Hoạt động Ban', url: '#' },
          { label: 'Tin tức & Sự kiện', url: '#' },
          { label: 'Liên hệ', url: '#' }
        ],
        subtitle: 'LAN TỎA GIÁ TRỊ ĐẤT',
        title: 'Sen Hồng',
        desc: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.'
      },
      render: ({ logoUrl, clubName, locationName, menuItems, subtitle, title, desc }: any) => (
        <div className="w-full relative flex flex-col select-none overflow-hidden">
          <header className="absolute top-0 left-0 w-full bg-transparent text-white px-10 py-6 flex flex-wrap items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center gap-3">
              <img src={logoUrl} className="w-14 h-14 object-contain" alt="Logo CLB" />
              <div className="flex flex-col text-center leading-tight drop-shadow-md">
                <span className="text-[13px] font-extrabold tracking-wide uppercase">{clubName}</span>
                <span className="text-[10px] opacity-90 font-bold tracking-wider uppercase text-white/90">{locationName}</span>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold drop-shadow-md">
              {menuItems && menuItems.map((item: any, idx: number) => (
                <a key={idx} href={item.url} className="hover:text-yellow-300 transition-colors duration-200">{item.label}</a>
              ))}
            </nav>
            <div className="flex items-center relative rounded-full p-0.5 cursor-pointer shadow-md select-none transition-all duration-300" style={{ background: "linear-gradient(180deg, #ffd97d 0%, #f1b846 100%)", width: '76px', height: '34px' }}>
              <div className="absolute flex items-center justify-center rounded-full shadow-sm font-black text-[12px]" style={{ backgroundColor: '#522900', color: '#f8c354', width: '30px', height: '30px', left: '2px', top: '2px' }}>VN</div>
              <div className="absolute font-extrabold text-[12px] flex items-center justify-center" style={{ color: '#522900', right: '12px', top: '8px' }}>EN</div>
            </div>
          </header>

          <section className="relative pt-48 pb-36 px-12 min-h-[720px] flex items-center w-full text-left overflow-hidden z-10" style={{ backgroundImage: "linear-gradient(180deg, #1868b8 0%, #4f9bdb 70%, #90d1ff 100%)" }}>
            <div className="absolute inset-0 z-0 bg-no-repeat opacity-50 pointer-events-none" style={{ backgroundImage: "url('https://webdemo.hexagon.xyz/medias/hieuunghero.webp')", mixBlendMode: 'screen', backgroundSize: 'cover', backgroundPosition: 'center 35%' }}></div>
            <div className="relative mx-auto max-w-7xl w-full z-10 flex justify-start">
              <div className="w-full max-w-xl p-12 bg-white/10 backdrop-blur-2xl border border-white/20 flex flex-col items-start text-white" style={{ borderRadius: "35px 120px 35px 120px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), inset 0 1px 0px 0px rgba(255, 255, 255, 0.2)" }}>
                <p className="text-[11px] font-bold tracking-[0.2em] mb-3 text-white/90 drop-shadow-sm">{subtitle}</p>
                <h1 className="font-black text-4xl lg:text-[52px] leading-tight text-yellow-400 mb-5 tracking-tight drop-shadow-md">{title}</h1>
                <p className="text-[14px] mb-10 font-normal leading-relaxed text-white/90 tracking-wide drop-shadow-sm">{desc}</p>
                <div className="w-full flex justify-center">
                  <a href="#" className="px-10 py-2.5 text-[13px] font-extrabold text-white uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 inline-block text-center select-none" style={{ background: "linear-gradient(90deg, #00bfff 0%, #0077ff 100%)", border: "1px solid rgba(255, 255, 255, 0.25)", borderRadius: "6px 28px 6px 28px", boxShadow: "0 12px 35px -5px rgba(0, 153, 255, 0.4), 0 4px 15px 0 rgba(0, 153, 255, 0.2)" }}>Tham gia cộng đồng</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },

    // ==================== [KHỐI 3: SLIDER LOGO HỘI VIÊN] ====================
    LogoSlider: {
      label: 'Slider Logo Hội Viên',
      fields: { 
        title: { type: 'text', label: 'Tiêu đề khối' } 
      },
      defaultProps: { 
        title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH'
      },
      render: ({ title }: any) => {
        const localLogos = [LOGO_HỘI_VIÊN_1, LOGO_HỘI_VIÊN_2, LOGO_HỘI_VIÊN_3, LOGO_HỘI_VIÊN_4, LOGO_HỘI_VIÊN_5, LOGO_HỘI_VIÊN_6, LOGO_HỘI_VIÊN_7, LOGO_HỘI_VIÊN_8];
        const continuousLogos = [...localLogos, ...localLogos, ...localLogos, ...localLogos];

        return (
          <section 
            className="py-14 w-full flex flex-col items-center overflow-hidden select-none relative"
            style={{ background: "linear-gradient(180deg, #90d1ff 0%, #bce2ff 45%, #dcf0ff 100%)" }}
          >
            <div className="w-full max-w-7xl px-6 mb-8 relative z-10">
              <h2 className="text-center text-[15px] font-extrabold text-[#114a82] uppercase tracking-[0.12em] max-w-3xl mx-auto">
                {title}
              </h2>
            </div>

            <div className="w-full flex overflow-hidden relative container-marquee-fade z-10">
              <div className="flex items-center gap-6 whitespace-nowrap animate-marquee-continuous py-2" style={{ display: 'flex', width: 'max-content' }}>
                {continuousLogos.map((logoPath: string, idx: number) => (
                  <div key={idx} className="inline-flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 transform hover:scale-105" style={{ width: '150px', height: '110px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 16px -6px rgba(0,0,0,0.03)' }}>
                    <img src={logoPath} className="max-w-full max-h-full object-contain" alt="Logo Hội Viên" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60"; e.currentTarget.style.filter = "grayscale(100%) opacity(30%)"; }} />
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              .animate-marquee-continuous { animation: marqueeRun 35s linear infinite !important; }
              @keyframes marqueeRun { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
              .container-marquee-fade {
                mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
              }
            `}</style>
          </section>
        );
      }
    },

    // ==================== [KHỐI 4: GIỚI THIỆU & CƠ CẤU TỔ CHỨC - PHÓNG TO HÌNH + THÊM SEN NỀN GIỮA] ====================
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
          { name: 'Trần Văn Khang', roleClb: 'Ủy viên BCH', roleCompany: 'Tổng Giám đốc', company: 'Công ty CP Logistics Đồng Tháp', avatar: AVATAR_HUNG },
          { name: 'Đỗ Thu Trang', roleClb: 'Thủ quỹ CLB', roleCompany: 'Giám đốc Tài chính', company: 'Công ty TNHH Sen Việt', avatar: AVATAR_MAI },
          { name: 'Vũ Hoàng Long', roleClb: 'Ủy viên BCH', roleCompany: 'Giám đốc Điều hành', company: 'Công ty Công nghệ số Mekong', avatar: AVATAR_DUC }
        ];

        return (
          /* ĐÃ CẬP NHẬT: Thêm một lớp ảnh hoa sen xanh mờ ẩn ở background chính giữa section đè lên dải màu loang */
          <section 
            className="w-full py-20 px-8 lg:px-16 flex justify-center select-none relative"
            style={{ 
              backgroundImage: "url('https://webdemo.hexagon.xyz/medias/hoasen-bg-blur.png'), linear-gradient(180deg, #dcf0ff 0%, #e8f1f7 45%, #f4f7fa 100%)",
              backgroundRepeat: "no-repeat, no-repeat",
              backgroundPosition: "center center, center center",
              backgroundSize: "420px, cover"
            }}
          >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch relative z-10">
              
              {/* --- Ô TRÁI: VỀ CÂU LẠC BỘ (HÌNH CÔNG NGHỆ ĐÃ ĐƯỢC PHÓNG TO) --- */}
              <div 
                className="bg-white border border-white/80 rounded-[32px] p-10 flex flex-col justify-between items-start text-left relative overflow-hidden shadow-xl"
                style={{ minHeight: '540px' }}
              >
                <div className="w-full relative z-10">
                  <h3 className="text-xl font-black text-[#114a82] tracking-wide mb-6 uppercase inline-block">
                    {aboutTitle}
                  </h3>
                  <p className="text-[14px] font-semibold text-gray-700 leading-relaxed tracking-wide max-w-[95%]">
                    {aboutText}
                  </p>
                </div>
                {/* ĐÃ SỬA: Tăng kích thước từ w-[62%] h-[52%] lên hẳn w-[80%] h-[60%] giúp hình to rõ, nổi bật sắc nét ôm trọn góc trái */}
                <div className="absolute left-0 bottom-0 w-[80%] h-[60%] z-0 pointer-events-none">
                  <img 
                    src={ABOUT_BG_TECH} 
                    className="w-full h-full object-contain object-left-bottom transform translate-y-1" 
                    alt="Tech Background" 
                    onError={(e)=>{e.currentTarget.style.display='none'}} 
                  />
                </div>
              </div>

              {/* --- Ô PHẢI: CƠ CẤU TỔ CHỨC --- */}
              <div 
                className="bg-white border border-white/80 rounded-[32px] p-10 flex flex-col justify-between text-left shadow-xl"
                style={{ minHeight: '540px' }}
              >
                <div>
                  <h3 className="text-xl font-black text-[#114a82] tracking-wide mb-6 uppercase inline-block">
                    {structureTitle}
                  </h3>
                  
                  {/* Danh sách thẻ thành viên */}
                  <div className="flex flex-col gap-4 w-full">
                    {exactMembers.map((m: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="bg-gradient-to-r from-white to-gray-50/30 border border-gray-100/80 rounded-[20px] p-4 flex items-center gap-5 shadow-sm hover:shadow-md hover:border-cyan-100 transition-all duration-300"
                      >
                        {/* Viền Avatar màu trắng tinh tế */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-inner flex-shrink-0">
                          <img 
                            src={m.avatar} 
                            className="w-full h-full object-cover" 
                            alt={m.name} 
                            onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"}} 
                          />
                        </div>
                        {/* Chi tiết thông tin chữ */}
                        <div className="flex flex-col text-[12px] font-bold text-gray-700 leading-normal gap-0.5">
                          <div className="text-[14px] font-black text-blue-950 mb-0.5">
                            Họ tên: <span className="font-bold text-gray-700 ml-1">{m.name}</span>
                          </div>
                          <div>Chức vụ CLB: <span className="font-extrabold text-cyan-600 ml-1">{m.roleClb}</span></div>
                          <div>Chức vụ Doanh nghiệp: <span className="font-medium text-gray-500 ml-1">{m.roleCompany}</span></div>
                          <div>Doanh nghiệp: <span className="font-medium text-gray-400 italic ml-1">{m.company}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Thanh điều hướng Slider */}
                <div className="flex justify-center items-center gap-4 mt-6 w-full">
                  <button className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-800 hover:border-gray-400 flex items-center justify-center text-sm font-bold shadow-sm transition-all">&lt;</button>
                  <div className="flex gap-2">
                    <span className="w-6 h-1.5 rounded-full bg-cyan-500 shadow-sm transition-all"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-800 hover:border-gray-400 flex items-center justify-center text-sm font-bold shadow-sm transition-all">&gt;</button>
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
    <div className="w-screen h-screen" style={{ width: '100vw', height: '100vh' }}>
      <Puck config={customConfig as any} data={{ content: [], root: {} }} />
    </div>
  );
}