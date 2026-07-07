import React from 'react';

// =========================================================================
// BỘ DỮ LIỆU ĐÃ CẬP NHẬT CHUẨN 100% THEO ĐÚNG 4 ẢNH GIAO DIỆN DEMO CỦA BỒ
// =========================================================================
const sectorDatabase: Record<string, {
  title: string;
  breadcrumb: string;
  desc: string;
  banner: string;
  highlights: { title: string; desc: string }[];
  steps: string[];
}> = {
  'giai-phap-cong-nghe': {
    title: 'Giải pháp công nghệ',
    breadcrumb: 'Giải pháp công nghệ',
    desc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
    banner: '/field-tech.png',
    highlights: [
      { title: 'Phát triển phần mềm theo yêu cầu', desc: 'Thiết kế và xây dựng phần mềm “đo ni đóng giày” theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh.' },
      { title: 'Giải pháp chuyển đổi số doanh nghiệp', desc: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng.' },
      { title: 'Xây dựng hệ thống nền tảng & tích hợp', desc: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt.' }
    ],
    steps: ['Khảo sát & phân tích yêu cầu', 'Thiết kế giải pháp & kiến trúc hệ thống', 'Phát triển & Thử nghiệm', 'Triển khai & Bảo trì']
  },
  'giai-phap-thi-cong-lap-dat': {
    title: 'Giải pháp thi công & lắp đặt',
    breadcrumb: 'Giải pháp thi công & lắp đặt',
    desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.',
    banner: '/field-construct.png',
    highlights: [
      { title: 'Đánh giá hiện trạng & mức độ trưởng thành số', desc: 'Phân tích toàn diện hệ thống, quy trình và năng lực công nghệ hiện tại, từ đó xác định mức độ sẵn sàng chuyển đổi số của doanh nghiệp.' },
      { title: 'Xây dựng chiến lược chuyển đổi số tổng thể', desc: 'Tư vấn lộ trình chuyển đổi số theo từng giai đoạn, phù hợp với mục tiêu kinh doanh, nguồn lực và ngành nghề của doanh nghiệp.' },
      { title: 'Tư vấn lựa chọn công nghệ & giải pháp triển khai', desc: 'Đề xuất các nền tảng, công nghệ và mô hình triển khai tối ưu (Cloud, AI, Data, CRM, ERP...), đảm bảo hiệu quả đầu tư và khả năng mở rộng.' }
    ],
    steps: ['Khảo sát & đánh giá doanh nghiệp', 'Xác định mục tiêu & định hướng chuyển đổi', 'Xây dựng lộ trình & giải pháp', 'Đồng hành triển khai & tối ưu']
  },
  'cung-cap-thiet-bi-cntt': {
    title: 'Cung cấp thiết bị CNTT',
    breadcrumb: 'Cung cấp thiết bị CNTT',
    desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.',
    banner: '/field-device.png',
    highlights: [
      { title: 'Xây dựng hệ thống dữ liệu tập trung', desc: 'Thiết kế và triển khai hệ thống lưu trữ dữ liệu tập trung, giúp doanh nghiệp quản lý, đồng bộ và khai thác dữ liệu hiệu quả.' },
      { title: 'Phân tích dữ liệu & trực quan hóa', desc: 'Khai thác dữ liệu thông qua báo cáo, dashboard và mô hình phân tích, hỗ trợ ra quyết định nhanh và chính xác.' },
      { title: 'Ứng dụng AI & Machine Learning', desc: 'Triển khai các mô hình AI như dự đoán, phân loại, chatbot, nhận diện hình ảnh... giúp tự động hóa và tối ưu vận hành.' }
    ],
    steps: ['Thu thập & chuẩn hóa dữ liệu', 'Thiết kế kiến trúc dữ liệu', 'Phát triển mô hình & hệ thống', 'Triển khai & tối ưu liên tục']
  },
  'dich-vu-cong-nghe-thong-tin': {
    title: 'Dịch vụ Công nghệ thông tin',
    breadcrumb: 'Dịch vụ Công nghệ thông tin',
    desc: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.',
    banner: '/field-services.png',
    highlights: [
      { title: 'Giải pháp hệ thống camera giám sát', desc: 'Thiết kế và lắp đặt hệ thống camera an ninh cho văn phòng, nhà xưởng, cửa hàng... với khả năng giám sát từ xa, lưu trữ và cảnh báo thông minh.' },
      { title: 'Giải pháp mạng WIFI doanh nghiệp', desc: 'Triển khai hệ thống WIFI phủ sóng ổn định, bảo mật cao, đáp ứng số lượng lớn người dùng và thiết bị trong môi trường doanh nghiệp.' },
      { title: 'Giải pháp hạ tầng mạng & tích hợp', desc: 'Thi công hệ thống mạng tổng thể (LAN, Switch, Router, Server...), đồng bộ với camera và WIFI để đảm bảo vận hành xuyên suốt.' }
    ],
    steps: ['Khảo sát & tư vấn giải pháp', 'Thiết kế sơ đồ & cấu hình hệ thống', 'Thi công & lắp đặt', 'Bàn giao & bảo trì']
  }
};

// =========================================================================
// 1. HEADER CHUẨN ĐA NGÔN NGỮ ĐÃ ĐỔI TÔNG MÀU XANH NHẠT TƯƠI THEO DEMO GỐC
// =========================================================================
export const HexagonHeader = ({ currentLang, onChangeLang, onNavigate, activeSlug }: any) => (
  <header className="w-full bg-[#0a5c43] text-white px-8 py-4 flex items-center justify-between border-b border-[#0d7c5a] shadow-md select-none text-left">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
      <img src="/hexagon-logo.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-md p-0.5" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
      <span className="font-black text-xl tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Hexagon</span>
    </div>
    
    <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-emerald-100/70">
      {['home', 'gioi-thieu', 'dich-vu', 'ho-tro', 'lien-he'].map((slug) => (
        <span 
          key={slug} 
          onClick={() => onNavigate(slug)} 
          className={`cursor-pointer transition-colors hover:text-emerald-300 ${activeSlug === slug ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}
        >
          {slug === 'home' ? (currentLang === 'vi' ? 'Trang chủ' : 'Home') :
           slug === 'gioi-thieu' ? (currentLang === 'vi' ? 'Giới thiệu' : 'About') :
           slug === 'dich-vu' ? (currentLang === 'vi' ? 'Dịch vụ' : 'Services') :
           slug === 'ho-tro' ? (currentLang === 'vi' ? 'Hỗ trợ' : 'Support') :
           (currentLang === 'vi' ? 'Liên hệ' : 'Contact')}
        </span>
      ))}
    </nav>
    
    <div className="flex items-center gap-2 border border-emerald-700 bg-[#064e3b] p-1 rounded-lg">
      <button onClick={() => onChangeLang('vi')} className={`px-2.5 py-1 text-[11px] font-black rounded-md transition-all ${currentLang === 'vi' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-600/50'}`}>🇻🇳 VI</button>
      <button onClick={() => onChangeLang('en')} className={`px-2.5 py-1 text-[11px] font-black rounded-md transition-all ${currentLang === 'en' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-600/50'}`}>🇬🇧 EN</button>
    </div>
  </header>
);

// =========================================================================
// 2. HỆ THỐNG CÁC KHỐI ĐỔ SẴN DỮ LIỆU RENDER TRANG CHỦ CLIENT
// =========================================================================
export const puckComponentsRender = {
 Hero: () => {
    const phrases = [
      "Giải pháp công nghệ",
      "Thi công & lắp đặt",
      "Cung cấp thiết bị CNTT",
      "Dịch vụ CNTT"
    ];

    const [currentPhraseIdx, setCurrentPhraseIdx] = React.useState(0);
    const [currentText, setCurrentText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
      let timer: NodeJS.Timeout;
      const fullPhrase = phrases[currentPhraseIdx];
      const typingSpeed = isDeleting ? 30 : 100;

      if (!isDeleting && currentText === fullPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setCurrentText(
            isDeleting 
              ? fullPhrase.substring(0, currentText.length - 1)
              : fullPhrase.substring(0, currentText.length + 1)
          );
        }, typingSpeed);
      }

      return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIdx]);

    return (
      <section className="w-full py-20 px-12 md:px-24 lg:px-32 flex flex-col md:flex-row items-center justify-between text-white bg-gradient-to-br from-[#065f46] via-[#047857] to-[#10b981]/90 text-left relative min-h-[520px] md:min-h-[580px] overflow-hidden">
        <div className="w-full md:w-[50%] max-w-lg flex flex-col items-start gap-4 z-10 pb-10 md:pb-0">
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 font-extrabold text-[11px] uppercase tracking-widest rounded-full border border-yellow-500/30">CÔNG NGHỆ TƯƠNG LAI</span>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight min-h-[100px] md:min-h-[130px]">
            <span className="block text-white font-bold whitespace-nowrap mb-1">
              {currentText}
              <span className="animate-pulse inline-block ml-1 text-emerald-400 font-light">|</span>
            </span>
            
            <span className="block mt-2 uppercase tracking-wide text-white">
              HEXAGON{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-[#a7f3d0] to-[#f59e0b] bg-clip-text text-transparent inline-block normal-case font-bold tracking-normal">
                Solutions
              </span>
            </span>
          </h1>
          
          <p className="text-emerald-100/80 text-xs md:text-sm leading-relaxed mt-2">HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.</p>
          <div className="flex items-center gap-3 mt-4">
            <button className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-medium text-sm rounded-xl shadow-md transition-transform hover:scale-[1.02]">
              Khám phá Dịch vụ
            </button>
            <button className="px-5 py-3 bg-white/5 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors hover:bg-white/10">
              Liên hệ Tư vấn
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-10 md:mt-0 relative">
          <video 
            src="/tech-globe.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full max-w-[530px] h-auto md:max-w-[600px] object-contain mix-blend-screen transition-all duration-300"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-emerald-300/40 text-[10px] font-mono uppercase tracking-widest select-none z-20">
          <span>Cuộn xuống để khám phá</span>
          <span className="animate-bounce text-xs font-black">↓</span>
        </div>
      </section>
    );
  },

  About: () => (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center text-left max-w-[1440px] mx-auto">
      <div className="w-full lg:w-[50%] relative p-6 bg-[#d1f5e3] rounded-[2rem] shadow-sm shrink-0">
        <img src="/hexagon-office.jpg" alt="Office" className="w-full h-[460px] object-cover rounded-2xl shadow-sm" />
        <div className="absolute bottom-3 right-3 translate-x-2 translate-y-2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100/60 z-20 w-full max-w-[310px] flex flex-col gap-2">
          <p className="text-sm font-bold text-slate-800 italic leading-relaxed text-left">
            "Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"
          </p>
          <span className="text-[11px] font-black text-[#eab308] text-right block tracking-wider uppercase">
            — HEXAGON CULTURE
          </span>
        </div>
      </div>

      <div className="w-full lg:w-[50%] flex flex-col gap-6 pl-0 lg:pl-4">
        <h2 className="text-3xl font-black text-[#0f172a] tracking-tight border-b-4 border-emerald-500 pb-2 w-max">
          Về Hexagon
        </h2>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Chúng tôi đồng hành cùng doanh nghiệp trên hành trình chuyển đổi số toàn diện.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100/80 shadow-2xs">
            <h4 className="font-bold text-emerald-700 text-lg mb-1.5">Sứ mệnh</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Kiến tạo tương lai số bằng các giải pháp tiên tiến.</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100/80 shadow-2xs">
            <h4 className="font-bold text-emerald-700 text-lg mb-1.5">Tầm nhìn</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100/80 shadow-2xs">
            <h4 className="font-bold text-emerald-700 text-lg mb-1.5">Giá trị cốt lõi</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Đổi mới - Đồng hành - Tiên phong - Minh bạch.</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100/80 shadow-2xs">
            <h4 className="font-bold text-emerald-700 text-lg mb-1.5">Nền tảng</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Hệ sinh thái đa ngành, vững chắc và linh hoạt.</p>
          </div>
        </div>
      </div>
    </section>
  ),

  Sectors: ({ onNavigate }: any) => {
    const sectorsData = [
      { t: 'Giải pháp công nghệ', slug: 'giai-phap-cong-nghe', img: '/field-tech.png', desc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt...' },
      { t: 'Giải pháp thi công & lắp đặt', slug: 'giai-phap-thi-cong-lap-dat', img: '/field-construct.png', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng cường...' },
      { t: 'Cung cấp thiết bị CNTT', slug: 'cung-cap-thiet-bi-cntt', img: '/field-device.png', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và tối ưu hóa...' },
      { t: 'Dịch vụ Công nghệ thông tin', slug: 'dich-vu-cong-nghe-thong-tin', img: '/field-services.png', desc: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi...' }
    ];

    return (
      <section className="w-full bg-[#f8fafc] py-20 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-3">Lĩnh vực hoạt động</h2>
        <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {sectorsData.map((s, i) => (
            <div 
              key={i} 
              onClick={() => { if (onNavigate) onNavigate(s.slug); }} 
              className="relative rounded-2xl overflow-hidden shadow-md h-[340px] sm:h-[380px] group cursor-pointer bg-white border border-slate-100"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-500 transform opacity-100 group-hover:opacity-0 group-hover:scale-95 pointer-events-none">
                <img src={s.img} alt={s.t} className="w-full h-full object-cover" />
              </div>
              
              <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-start text-left bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]/10 transition-all duration-500 transform opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 z-10 bg-white">
                <h4 className="font-black text-lg text-[#f59e0b] leading-tight tracking-wide mb-3">{s.t}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{s.desc}</p>
                <span className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1 w-max">
                  Xem chi tiết →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  },

  NewsGrid: () => (
    <section className="w-full bg-white py-16 px-8 text-center">
      <h2 className="text-2xl font-black text-slate-900 mb-1">Tin tức</h2>
      <div className="w-12 h-1 bg-yellow-500 mx-auto mb-2"></div>
      <p className="text-xs text-slate-500 mb-10">Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left max-w-6xl mx-auto">
        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white flex flex-col">
          <div className="w-full aspect-[21/9] overflow-hidden shrink-0"><img src="/news-teambuilding.jpg" alt="News 1" className="w-full h-full object-cover" /></div>
          <div className="p-5 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2 leading-snug">Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu</h3>
              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed line-clamp-2">Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...</p>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-50">
              <span>📅 26 thg 6, 2026</span><span className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer">Xem chi tiết →</span>
            </div>
          </div>
        </div>

        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white flex flex-col">
          <div className="w-full aspect-[21/9] overflow-hidden shrink-0"><img src="/news-vhu.jpg" alt="News 2" className="w-full h-full object-cover" /></div>
          <div className="p-5 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2 leading-snug">Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên</h3>
              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed line-clamp-2">Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến tron...</p>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-50">
              <span>📅 26 thg 6, 2026</span><span className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer">Xem chi tiết →</span>
            </div>
          </div>
        </div>
      </div>

      <button className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors tracking-wide">Xem tất cả bài viết ❯</button>
    </section>
  ),

  Partners: () => {
    const logos = ['logo-1-happyfood.png', 'logo-2-ecobook.png', 'logo-3-comoon.png', 'logo-4-hexagon-blue.png', 'logo-5-hexagon-sun.png', 'logo-6-hexagon-book.png', 'logo-7-hexagon-shield.png', 'logo-8-hexagon-fade.png'];
    const doubleLogos = [...logos, ...logos];
    return (
      <section className="w-full bg-gradient-to-b from-[#0a5c43] via-[#10b981] to-[#6ee7b7]/60 py-14 px-8 text-center overflow-hidden">
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-infinite { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        `}</style>
        <h3 className="text-3xl font-black text-slate-950 mb-10 tracking-wide">Các đối tác liên kết</h3>
        <div className="w-full max-w-6xl mx-auto overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#10b981]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#6ee7b7]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="animate-marquee-infinite gap-6 flex items-center">
            {doubleLogos.map((logo, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm w-[145px] h-[90px] flex items-center justify-center shrink-0"><img src={`/${logo}`} alt="Partner" className="max-w-full max-h-full object-contain" /></div>
            ))}
          </div>
        </div>
      </section>
    );
  },

  Contact: () => (
    <div className="w-full flex flex-col bg-white">
      <section className="w-full py-16 px-8 flex flex-col md:flex-row gap-10 text-left max-w-6xl mx-auto items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-black text-slate-900">Liên hệ với chúng tôi</h2>
          <p className="text-xs text-slate-500 leading-relaxed">Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.</p>
          <div className="flex flex-col gap-4 text-xs text-slate-700 font-medium mt-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold">📍</div>
              <p><b>Trụ sở chính:</b> 615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold">✉️</div>
              <p><b>Email:</b> info@hexagon.xyz</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 border border-slate-100 p-1.5 bg-white rounded-2xl shadow-xs"><img src="/google-maps-demo.png" alt="Maps" className="w-full h-[270px] object-cover rounded-xl" /></div>
      </section>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  )
};

// =========================================================================
// 3. KHỐI HIỂN THỊ CHI TIẾT TĨNH CHO 4 LĨNH VỰC - ĐÃ ĐIỀU CHỈNH TỌA ĐỘ NHẤC CAO ẢNH
// =========================================================================
export const HexagonSectorDetail = ({ slug, onBack }: { slug: string; onBack: () => void }) => {
  const current = sectorDatabase[slug] || sectorDatabase['giai-phap-cong-nghe'];

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  return (
    <div className="w-full bg-white text-left font-sans select-none antialiased">
      {/* Khối 1: Hero trang chi tiết dịch vụ */}
      <section className="w-full bg-white pt-10 pb-20 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto">
        <div className="text-xs text-slate-400 font-medium mb-12 tracking-wide">
          <span className="hover:text-emerald-600 cursor-pointer" onClick={onBack}>Trang chủ</span>
          <span className="mx-2">&gt;</span><span className="text-slate-400">Dịch vụ</span>
          <span className="mx-2">&gt;</span><span className="text-slate-600 font-semibold">{current.title}</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">
          <div className="w-full lg:w-[50%] flex flex-col items-start gap-6">
            <h1 className="text-4xl md:text-5xl font-black text-amber-500 tracking-tight leading-tight">{current.title}</h1>
            <p className="text-base text-slate-600 leading-relaxed font-medium max-w-xl">{current.desc}</p>
            <button className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-bold text-sm rounded-xl shadow-md">Liên hệ tư vấn</button>
          </div>
          
          <div className="w-full lg:w-[50%] flex justify-end">
            {/* ĐÃ CHỈNH SỬA TỌA ĐỘ: Đổi từ object-bottom sang object-[position:center_65%] 
                giúp camera nhấc cao lên một chút, hiển thị trọn vẹn đỉnh thành phố cực đẹp hệt bản demo */}
            <img 
              src={current.banner} 
              alt={current.title} 
              className="w-full max-w-[620px] h-[340px] rounded-3xl shadow-xl border border-slate-100/50 object-cover object-[position:center_65%] transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Khối 2: Giải pháp nổi bật */}
      <section className="w-full bg-[#f8fafc] py-20 px-6 md:px-12 lg:px-24 border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Giải pháp nổi bật</h2>
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {current.highlights.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] flex items-center justify-center text-emerald-600 font-bold text-sm">✓</div>
                <h3 className="font-black text-slate-900 text-lg leading-snug tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Khối 3: Quy trình thực hiện */}
      <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Quy trình thực hiện</h2>
            <p className="text-sm text-slate-400 font-semibold tracking-wide">Quy trình chuyên nghiệp, minh bạch và hiệu quả.</p>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {current.steps.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-100 shadow-2xs flex flex-col items-center text-center gap-3">
                <span className="text-3xl font-black text-amber-400 tracking-tight block">{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-bold text-slate-800 text-sm leading-snug max-w-[180px]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Khối 4: Sẵn sàng triển khai */}
      <section className="w-full bg-white pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto bg-[#0a5c43] text-white p-12 md:p-16 rounded-[2rem] text-center shadow-lg flex flex-col items-center gap-6 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Sẵn sàng triển khai?</h2>
          <p className="text-sm md:text-base text-emerald-100/80 font-medium max-w-xl leading-relaxed">Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.</p>
          <div className="flex items-center gap-4 mt-2">
            <button onClick={onBack} className="px-6 py-3 bg-white/10 text-white border border-white/20 font-bold text-sm rounded-xl transition-colors hover:bg-white/20">Về trang chủ</button>
            <button className="px-6 py-3 bg-amber-500 text-white font-bold text-sm rounded-xl shadow-md">Liên hệ ngay</button>
          </div>
        </div>
      </section>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  );
};