import React from 'react';

// =========================================================================
// BỘ DỮ LIỆU CẤU HÌNH LĨNH VỰC HOẠT ĐỘNG (SECTOR DATABASE)
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
// BỘ DỮ LIỆU CƠ SỞ TIN TỨC (NEWS DATABASE)
// =========================================================================
const newsDatabase = [
  { id: 1, tag: 'Hoạt động', tagColor: 'bg-amber-100 text-amber-600', t: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu', img: '/news-teambuilding.jpg', desc: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.', date: '26 tháng 6, 2026', time: '02:54', relatedIds: [2], content: [
    'Hòa chung không khí rực lửa, đại gia đình HHC đã cùng nhau tham gia các hoạt động tham quan, dã ngoại và tăng cường sự gắn kết tại vùng đảo xinh đẹp của Vinpearl Nha Trang. Tại đây, các thành viên cùng người thân đã được trải nghiệm những giây phút ý nghĩa, ấm áp và nhận được những giá trị xứng đáng.',
    'Teambuilding không chỉ là hoạt động để gắn kết tình đồng đội mà còn là dịp để toàn thể các đơn vị, tập thể, và cá nhân cùng nhau nhìn lại và tự hào về những thành tựu đã gặt hái, cũng như những khó khăn, trở ngại mà chúng ta đã cùng nhau vượt qua. Đây chính là bước đà hoàn hảo để chuẩn bị cho một sự khởi đầu trọn vẹn niềm vui, hứa hẹn một hành trình mới với nhiều thắng lợi lớn hơn nữa!',
    'Tạm biệt Vinpearl Nha Trang với vô vàn kỷ niệm đẹp, chúng ta hãy cùng nhau mang nguồn năng lượng tích cực này trở lại công việc, tiếp tục đồng lòng, đoàn kết và vững bước tiến lên để chinh phục những mục tiêu lớn hơn.',
    'HHC - Sẵn sàng bứt phá!',
    '#HexagonCorporation #SGD #Technology'
  ] },
  { id: 2, tag: 'Hoạt động', tagColor: 'bg-amber-100 text-amber-600', t: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', img: '/news-vhu.jpg', desc: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình "VHE Startup Devote".', date: '26 tháng 6, 2026', time: '01:25', relatedIds: [1], content: [
    'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình "VHE Startup Devote".',
    'Trong khuôn khổ cuộc thi, Lục Giác đã hỗ trợ các bạn sinh viên xây dựng mô hình kinh doanh thiết bị công nghệ điện tử, đồng thời chia sẻ phương pháp trình bày kế hoạch kinh doanh chuyên nghiệp và khả thi.',
    'Với kinh nghiệm thực tế từ doanh nghiệp cùng sự sáng tạo và linh hoạt của các bạn sinh viên, đội myU đã xuất sắc chinh phục ban giám khảo và mang về giải thưởng cao nhất - Giải Nhất Khởi Nghiệp.',
    'Thành công này không chỉ khẳng định sự chuyên nghiệp và tiềm năng của sinh viên Đại học Văn Hiến, mà còn thể hiện tầm nhìn phát triển mạnh mẽ của mô hình kinh doanh đến từ Lục Giác. Lục Giác hy vọng sẽ tiếp tục đồng hành cùng các bạn sinh viên trong hành trình lan tỏa tinh thần khởi nghiệp trong kỷ nguyên số.',
    '#HexagonCorporation #SGD #Technology'
  ] },
  { id: 3, tag: 'Sự kiện', tagColor: 'bg-orange-100 text-orange-600', t: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá', img: '/news-sam-tet.jpg', desc: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí.', date: '26 tháng 6, 2026', time: '01:00', relatedIds: [1, 2], content: [
    'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí:',
    'Hiệu năng đỉnh cao.',
    'Thiết kế thời thượng.',
    'Giá tốt bất ngờ kèm quà tặng Tết giá trị.',
    'Đừng chỉ bắt đầu năm mới - hãy chinh phục nó với những công cụ phù hợp!',
    '#HexagonCorporation #SGD #Technology'
  ] },
  { id: 4, tag: 'Tin tức', tagColor: 'bg-blue-100 text-blue-600', t: 'Bài viết 4', img: '/news-code.png', desc: 'Bài viết 4', date: '25 tháng 6, 2026', time: '18:58', relatedIds: [5], content: ['Bài viết 4'] },
  { id: 5, tag: 'Tin tức', tagColor: 'bg-blue-100 text-blue-600', t: 'Bài viết 5', img: '/news-ai-robot.jpg', desc: 'Bài viết 5', date: '25 tháng 6, 2026', time: '12:00', relatedIds: [4], content: ['Bài viết 5'] }
];

const sidebarServices = [
  { slug: 'giai-phap-thi-cong-lap-dat', title: 'Giải pháp thi công & lắp đặt', img: '/field-construct.png', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...' },
  { slug: 'dich-vu-cong-nghe-thong-tin', title: 'Dịch vụ Công nghệ thông tin', img: '/field-services.png', desc: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp...' },
  { slug: 'giai-phap-cong-nghe', title: 'Giải pháp công nghệ', img: '/field-tech.png', desc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt...' },
  { slug: 'cung-cap-thiet-bi-cntt', title: 'Cung cấp thiết bị CNTT', img: '/field-device.png', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và tối ưu hóa...' }
];

// Component dùng chung cho Sidebar của cả 2 trang danh sách và chi tiết tin tức nhằm đảm bảo tính năng đồng bộ
const SharedSidebarCarousel = ({ onScrollToSectors, onNavigateSector, activeIdx, setActiveIdx }: any) => {
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev: number) => (prev - 1 + sidebarServices.length) % sidebarServices.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev: number) => (prev + 1) % sidebarServices.length);
  };

  const activeService = sidebarServices[activeIdx];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm sticky top-6 text-left">
      <div className="bg-[#0f5132] text-white p-4 text-center font-black text-sm uppercase tracking-wider">
        Dịch vụ của chúng tôi
      </div>
      
      <div className="p-5 flex flex-col items-center text-center gap-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full h-[150px] rounded-xl overflow-hidden relative group">
          <img src={activeService.img} alt={activeService.title} className="w-full h-full object-cover transition-all duration-500" />
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between">
            <button onClick={handlePrev} className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-black text-slate-700 hover:bg-slate-100 cursor-pointer">&lt;</button>
            <button onClick={handleNext} className="w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-black text-slate-700 hover:bg-slate-100 cursor-pointer">&gt;</button>
          </div>
        </div>
        
        <div className="text-left w-full">
          <h4 className="font-black text-sm text-slate-900 mb-1">{activeService.title}</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 min-h-[48px]">{activeService.desc}</p>
          <span onClick={() => onNavigateSector(activeService.slug)} className="text-[11px] text-amber-500 font-black mt-2 inline-block cursor-pointer hover:text-amber-600">Tìm hiểu thêm ❯</span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-2">
          {sidebarServices.map((_, dotIdx) => (
            <span key={dotIdx} onClick={() => setActiveIdx(dotIdx)} className={`transition-all duration-300 rounded-full cursor-pointer ${activeIdx === dotIdx ? 'w-4 h-1.5 bg-amber-500' : 'w-1.5 h-1.5 bg-slate-200'}`} />
          ))}
        </div>

        <div className="w-full border-t border-slate-100 pt-3 mt-1">
          <span onClick={onScrollToSectors} className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer block uppercase tracking-wider">Xem tất cả dịch vụ ❯</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 1. HEADER CHUẨN ĐA NGÔN NGỮ - ĐÃ KÍCH HOẠT ĐIỀU HƯỚNG
// =========================================================================
export const HexagonHeader = ({ currentLang, onChangeLang, onNavigate, activeSlug }: any) => {
  const handleMenuClick = (slug: string) => {
    if (slug === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (slug === 'gioi-thieu') {
      onNavigate('home');
      setTimeout(() => {
        const target = document.getElementById('about-block');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (slug === 'dich-vu') {
      onNavigate('home');
      setTimeout(() => {
        const target = document.getElementById('sectors-block');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (slug === 'lien-he') {
      onNavigate('home');
      setTimeout(() => {
        const target = document.getElementById('contact-block');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onNavigate('home');
    }
  };

  return (
    <header className="w-full bg-[#0a5c43] text-white px-8 py-4 flex items-center justify-between border-b border-[#0d7c5a] shadow-md select-none text-left">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleMenuClick('home')}>
        <img src="/hexagon-logo.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-md p-0.5" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
        <span className="font-black text-xl tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Hexagon</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-emerald-100/70 ml-auto mr-10">
        {[
          { slug: 'home', label: 'Trang chủ' },
          { slug: 'gioi-thieu', label: 'Giới thiệu' },
          { slug: 'dich-vu', label: 'Dịch vụ' },
          { slug: 'ho-tro', label: 'Hỗ trợ' },
          { slug: 'lien-he', label: 'Liên hệ' }
        ].map((item) => (
          <span key={item.slug} onClick={() => handleMenuClick(item.slug)} className={`cursor-pointer transition-colors hover:text-emerald-300 ${activeSlug === item.slug ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}>
            {item.label}
          </span>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">
        <img src="/flag-vi.jpg" alt="Tiếng Việt" onClick={() => onChangeLang('vi')} className="w-6 h-auto cursor-pointer transition-all duration-200 hover:scale-110 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/flag-vi.png'; }} />
        <img src="/flag-en.jpg" alt="English" onClick={() => onChangeLang('en')} className="w-6 h-auto cursor-pointer transition-all duration-200 hover:scale-110 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/flag-en.png'; }} />
      </div>
    </header>
  );
};

// =========================================================================
// 2. HỆ THỐNG KHỐI RENDER TRANG CHỦ CLIENT (PUCK COMPONENTS RENDER)
// =========================================================================
export const puckComponentsRender = {
  Hero: () => {
    const phrases = ["Giải pháp công nghệ", "Thi công & lắp đặt", "Cung cấp thiết bị CNTT", "Dịch vụ CNTT"];
    const [currentText, setCurrentText] = React.useState("");
    const [currentPhraseIdx, setCurrentPhraseIdx] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
      let timer: NodeJS.Timeout;
      const fullPhrase = phrases[currentPhraseIdx];
      if (!isDeleting && currentText === fullPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setCurrentText(isDeleting ? fullPhrase.substring(0, currentText.length - 1) : fullPhrase.substring(0, currentText.length + 1));
        }, isDeleting ? 30 : 100);
      }
      return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIdx]);

    return (
      <section className="w-full py-20 px-12 md:px-24 lg:px-32 flex flex-col md:flex-row items-center justify-between text-white bg-gradient-to-br from-[#065f46] via-[#047857] to-[#10b981]/90 text-left relative min-h-[520px] md:min-h-[580px] overflow-hidden">
        <div className="w-full md:w-[50%] max-w-lg flex flex-col items-start gap-4 z-10 pb-10 md:pb-0">
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 font-extrabold text-[11px] uppercase tracking-widest rounded-full border border-yellow-500/30">CÔNG NGHỆ TƯƠNG LAI</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight min-h-[100px] md:min-h-[130px]">
            <span className="block text-white font-bold whitespace-nowrap mb-1">{currentText}<span className="animate-pulse inline-block ml-1 text-emerald-400 font-light">|</span></span>
            <span className="block mt-2 uppercase tracking-wide text-white">HEXAGON <span className="bg-gradient-to-r from-emerald-300 via-[#a7f3d0] to-[#f59e0b] bg-clip-text text-transparent inline-block normal-case font-bold tracking-normal">Solutions</span></span>
          </h1>
          <p className="text-emerald-100/80 text-xs md:text-sm leading-relaxed mt-2">HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.</p>
          <div className="flex items-center gap-3 mt-4">
            <button className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-medium text-sm rounded-xl shadow-md transition-transform hover:scale-[1.02]">Khám phá Dịch vụ</button>
            <button className="px-5 py-3 bg-white/5 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors hover:bg-white/10">Liên hệ Tư vấn</button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-10 md:mt-0 relative">
          <video src="/tech-globe.mp4" autoPlay loop muted playsInline className="w-full max-w-[530px] h-auto md:max-w-[600px] object-contain mix-blend-screen transition-all duration-300" />
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
    return (
      <section id="sectors-block" className="w-full bg-[#f8fafc] py-20 px-8 text-center scroll-mt-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-3">Lĩnh vực hoạt động</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {[
            { t: 'Giải pháp công nghệ', slug: 'giai-phap-cong-nghe', img: '/field-tech.png' },
            { t: 'Giải pháp thi công & lắp đặt', slug: 'giai-phap-thi-cong-lap-dat', img: '/field-construct.png' },
            { t: 'Cung cấp thiết bị CNTT', slug: 'cung-cap-thiet-bi-cntt', img: '/field-device.png' },
            { t: 'Dịch vụ Công nghệ thông tin', slug: 'dich-vu-cong-nghe-thong-tin', img: '/field-services.png' }
          ].map((s, i) => (
            <div key={i} onClick={() => { if (onNavigate) onNavigate(s.slug); }} className="relative rounded-2xl overflow-hidden shadow-md h-[340px] sm:h-[380px] group cursor-pointer bg-white border border-slate-100">
              <div className="absolute inset-0 w-full h-full transition-all duration-500 transform opacity-100 group-hover:opacity-0 group-hover:scale-95 pointer-events-none"><img src={s.img} alt={s.t} className="w-full h-full object-cover" /></div>
              <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-start text-left bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]/10 transition-all duration-500 transform opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 z-10 bg-white">
                <h4 className="font-black text-lg text-[#f59e0b] leading-tight tracking-wide mb-3">{s.t}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Hệ thống giải pháp chuyên sâu mang tính ứng dụng cao...</p>
                <span className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1 w-max">Xem chi tiết →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  },

  NewsGrid: ({ onNavigateAllNews, onNavigateDetailNews }: { onNavigateAllNews?: () => void; onNavigateDetailNews?: (id: number) => void }) => (
    <section className="w-full bg-white py-16 px-8 text-center">
      <h2 className="text-2xl font-black text-slate-900 mb-1">Tin tức</h2>
      <div className="w-12 h-1 bg-yellow-500 mx-auto mb-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left max-w-6xl mx-auto">
        {newsDatabase.slice(0, 2).map((news) => (
          <div key={news.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white flex flex-col">
            <div className="w-full aspect-[21/9] overflow-hidden shrink-0"><img src={news.img} alt={news.t} className="w-full h-full object-cover" /></div>
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div><h3 className="font-bold text-sm text-slate-900 mb-2 leading-snug">{news.t}</h3><p className="text-[11px] text-slate-500 mb-4 leading-relaxed line-clamp-2">{news.desc}</p></div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                <span>📅 {news.date}</span><span onClick={() => onNavigateDetailNews && onNavigateDetailNews(news.id)} className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer">Xem chi tiết →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left mb-10 max-w-6xl mx-auto">
        {newsDatabase.slice(2, 5).map((news) => (
          <div key={news.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white flex flex-col">
            <div className="w-full aspect-[16/7] overflow-hidden shrink-0"><img src={news.img} alt={news.t} className="w-full h-full object-cover" /></div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div><h4 className="font-bold text-xs text-slate-900 mb-1 line-clamp-1">{news.t}</h4><p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{news.desc}</p></div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold pt-3 mt-2 border-t border-slate-50">
                <span>📅 {news.date}</span><span onClick={() => onNavigateDetailNews && onNavigateDetailNews(news.id)} className="text-amber-500 cursor-pointer">Xem chi tiết →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { if(onNavigateAllNews) onNavigateAllNews(); }} className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors tracking-wide cursor-pointer">Xem tất cả bài viết ❯</button>
    </section>
  ),

  Partners: () => {
    const logos = [
      'logo-1-happyfood.png', 
      'logo-2-ecobook.png', 
      'logo-3-comoon.png', 
      'logo-4-hexagon-blue.png', 
      'logo-5-hexagon-sun.png', 
      'logo-6-hexagon-book.png', 
      'logo-7-hexagon-shield.png', 
      'logo-8-hexagon-fade.png'
    ];
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
            {[...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm w-[145px] h-[90px] flex items-center justify-center shrink-0">
                <img src={`/${logo}`} alt="Partner" className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },

  Contact: () => (
    <div className="w-full flex flex-col bg-white">
      <section id="contact-block" className="w-full py-16 px-8 flex flex-col md:flex-row gap-10 text-left max-w-6xl mx-auto items-center scroll-mt-12">
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
        <div className="w-full md:w-1/2 border border-slate-100 p-1.5 bg-white rounded-2xl shadow-xs">
          <img src="/google-maps-demo.png" alt="Maps" className="w-full h-[270px] object-cover rounded-xl" />
        </div>
      </section>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  )
};

// =========================================================================
// 3. KHỐI CHI TIẾT LĨNH VỰC HOẠT ĐỘNG (SECTOR DETAIL VIEW) - KHÔI PHỤC ĐẦY ĐỦ 100%
// =========================================================================
export const HexagonSectorDetail = ({ slug, onBack }: { slug: string; onBack: () => void }) => {
  const current = sectorDatabase[slug] || sectorDatabase['giai-phap-cong-nghe'];

  React.useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [slug]);

  return (
    <div className="w-full bg-white text-left font-sans select-none antialiased flex flex-col min-h-screen">
      <div className="flex-1 w-full pt-6 pb-20 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto flex flex-col gap-12">
        
        {/* Breadcrumb điều hướng */}
        <div className="text-xs text-slate-400 font-medium tracking-wide">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onBack}>Trang chủ</span>
          <span className="mx-2">&gt;</span>
          <span className="text-slate-600 font-semibold">{current.breadcrumb}</span>
        </div>

        {/* Section Banner giới thiệu chính */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between w-full">
          <div className="w-full lg:w-[50%] flex flex-col items-start gap-5">
            <h1 className="text-3xl md:text-5xl font-black text-amber-500 tracking-tight leading-tight uppercase">{current.title}</h1>
            <div className="w-12 h-1 bg-amber-500 rounded-full my-1"></div>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">{current.desc}</p>
          </div>
          <div className="w-full lg:w-[50%] flex justify-end">
            <img src={current.banner} alt={current.title} className="w-full max-w-[620px] h-[360px] rounded-3xl shadow-xl border border-slate-100 object-cover object-[position:center_65%]" />
          </div>
        </div>

        {/* Section Highlights - Đặc điểm nổi bật */}
        <div className="w-full flex flex-col gap-6 mt-4">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight border-l-4 border-emerald-600 pl-3 uppercase">Đặc điểm nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {current.highlights.map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl shadow-2xs flex flex-col gap-3 hover:shadow-xs transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm">0{idx + 1}</div>
                <h3 className="font-black text-sm md:text-base text-slate-950 leading-snug tracking-tight">{item.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Quy trình triển khai */}
        <div className="w-full flex flex-col gap-6 mt-4">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight border-l-4 border-emerald-600 pl-3 uppercase">Quy trình triển khai</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {current.steps.map((step, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-2xs flex items-start gap-4 relative">
                <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 text-amber-600 font-black text-xs shrink-0 flex items-center justify-center shadow-2xs">
                  {idx + 1}
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bước {idx + 1}</span>
                  <p className="text-xs md:text-sm font-black text-slate-800 leading-snug tracking-tight">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút quay lại trang chủ dưới cùng */}
        <div className="w-full flex justify-center mt-6">
          <button onClick={onBack} className="px-6 py-3 bg-[#0a5c43] hover:bg-[#0d7c5a] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-colors cursor-pointer">
            ❮ Quay lại trang chủ
          </button>
        </div>

      </div>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none mt-auto">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  );
};

// =========================================================================
// 4. KHỐI DANH SÁCH BÀI VIẾT TIN TỨC (NEWS LIST VIEW)
// =========================================================================
export const HexagonNewsList = ({ onBack, onNavigateSector, onScrollToSectors, onNavigateDetailNews }: { onBack: () => void; onNavigateSector: (slug: string) => void; onScrollToSectors: () => void; onNavigateDetailNews: (id: number) => void }) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => { setActiveIdx((prev) => (prev + 1) % sidebarServices.length); }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white text-left font-sans select-none antialiased flex flex-col min-h-screen">
      <div className="flex-1 w-full pt-6 pb-20 px-4 md:px-10 lg:px-14 max-w-[1440px] mx-auto">
        <div className="text-xs text-slate-400 font-medium mb-6 tracking-wide px-2"><span className="hover:text-emerald-600 cursor-pointer" onClick={onBack}>Trang chủ</span><span className="mx-2">&gt;</span><span className="text-slate-600 font-semibold">Tin tức</span></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9 flex flex-col gap-6 px-2">
            <div className="mb-4">
              <h1 className="text-4xl font-black text-amber-500 tracking-tight mb-2">Tin tức</h1>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.</p>
              <div className="w-12 h-1 bg-amber-500 mt-3 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {newsDatabase.map((news) => (
                <div key={news.id} className="border border-slate-100 rounded-3xl overflow-hidden shadow-xs bg-white flex flex-col hover:shadow-md transition-all duration-300 w-full">
                  <div className="w-full aspect-[16/10] overflow-hidden shrink-0"><img src={news.img} alt={news.t} className="w-full h-full object-cover" /></div>
                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className={`px-2.5 py-1 text-[10px] font-black rounded-md uppercase tracking-wider inline-block mb-2.5 ${news.tagColor}`}>{news.tag}</span>
                      <h3 onClick={() => onNavigateDetailNews(news.id)} className="font-black text-sm md:text-base text-slate-900 leading-snug tracking-tight mb-2 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 min-h-[44px]">{news.t}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{news.desc}</p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] md:text-[11px] text-slate-400 font-bold pt-3 border-t border-slate-100">
                      <span>📅 {news.date}</span><span onClick={() => onNavigateDetailNews(news.id)} className="text-amber-500 font-black flex items-center gap-0.5 cursor-pointer hover:text-amber-600">Xem thêm →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <SharedSidebarCarousel onScrollToSectors={onScrollToSectors} onNavigateSector={onNavigateSector} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
          </div>
        </div>
      </div>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none mt-auto">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  );
};

// =========================================================================
// 5. KHỐI CHI TIẾT BÀI VIẾT TIN TỨC (NEWS DETAIL VIEW)
// =========================================================================
export const HexagonNewsDetail = ({ newsId, onBack, onNavigateList, onNavigateSector, onNavigateDetailNews }: { newsId: number; onBack: () => void; onNavigateList: () => void; onNavigateSector: (slug: string) => void; onNavigateDetailNews: (id: number) => void }) => {
  const currentNews = newsDatabase.find(n => n.id === newsId) || newsDatabase[0];
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => { setActiveIdx((prev) => (prev + 1) % sidebarServices.length); }, 2000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [newsId]);

  const relatedNewsItems = newsDatabase.filter(n => currentNews.relatedIds?.includes(n.id));

  return (
    <div className="w-full bg-[#f8fafc] text-left font-sans select-none antialiased flex flex-col min-h-screen">
      <div className="flex-1 w-full pt-6 pb-16 px-4 md:px-10 lg:px-14 max-w-[1440px] mx-auto">
        
        {/* Breadcrumb chỉ mục gọn gàng 1 dòng và kích hoạt sử dụng được */}
        <div className="text-xs text-slate-400 font-medium mb-6 tracking-wide px-2 flex items-center flex-wrap gap-y-1">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onBack}>Trang chủ</span>
          <span className="mx-2 text-slate-300">&gt;</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onNavigateList}>Bài viết</span>
          <span className="mx-2 text-slate-300">&gt;</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onNavigateList}>{currentNews.tag}</span>
          <span className="mx-2 text-slate-300">&gt;</span>
          <span className="text-slate-600 font-semibold truncate max-w-[180px] sm:max-w-[300px] md:max-w-[450px]" title={currentNews.t}>{currentNews.t}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">{currentNews.t}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-semibold select-none">
              <span>📅 {currentNews.date}</span>
              {currentNews.time && <span>🕒 {currentNews.time}</span>}
              <span className="text-amber-500">🇻🇳 Tiếng Việt</span>
            </div>
            <div className="w-full h-[1px] bg-slate-100 my-1" />
            <p className="text-sm md:text-base font-bold text-slate-700 leading-relaxed italic">{currentNews.desc}</p>
            {currentNews.id <= 3 && (
              <div className="w-full rounded-2xl overflow-hidden shadow-2xs border border-slate-100">
                <img src={currentNews.img} alt={currentNews.t} className="w-full h-auto object-contain" />
              </div>
            )}
            <div className="flex flex-col gap-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {currentNews.content?.map((paragraph, pIdx) => (
                <p key={pIdx} className={paragraph.startsWith('#') ? "text-emerald-700 font-bold" : paragraph.toUpperCase() === paragraph ? "font-bold text-slate-800 mt-2" : ""}>
                  {paragraph}
                </p>
              ))}
              {currentNews.id <= 2 && (
                <div className="border-t border-slate-100 pt-4 mt-4 font-mono text-[11px] text-slate-500 flex flex-col gap-0.5">
                  <p className="font-bold text-slate-800 uppercase tracking-wide">HEXAGON CORPORATION</p>
                  <p>Address: 615 Au Co Str, Tan Phu Ward, HCMC</p>
                  <p>Hotline: +84 70 390 9333</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6 sticky top-6">
            <span onClick={onNavigateList} className="text-xs font-black text-amber-500 hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1 select-none px-1">
              ❮ Quay lại danh sách
            </span>
            <SharedSidebarCarousel onScrollToSectors={onBack} onNavigateSector={onNavigateSector} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
          </div>
        </div>

        {/* Khối bài viết liên quan dưới cùng */}
        {relatedNewsItems.length > 0 && (
          <div className="w-full border-t border-slate-200/60 pt-10 mt-12 px-2 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2 border-l-4 border-amber-500 pl-3">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Bài viết liên quan</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedNewsItems.map((news) => (
                <div key={news.id} onClick={() => onNavigateDetailNews(news.id)} className="border border-slate-100 rounded-2xl overflow-hidden shadow-2xs bg-white flex flex-col w-full cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                  <div className="w-full aspect-[16/10] overflow-hidden shrink-0"><img src={news.img} alt={news.t} className="w-full h-full object-cover" /></div>
                  <div className="p-4 flex flex-col gap-1">
                    <h4 className="font-bold text-xs md:text-sm text-slate-900 leading-snug line-clamp-2 min-h-[38px] hover:text-emerald-700 transition-colors">{news.t}</h4>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none mt-auto">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  );
};