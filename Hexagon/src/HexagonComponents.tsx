import React, { useState, useEffect } from 'react';

// =========================================================================
// BỘ DỮ LIỆU CẤU HÌNH LĨNH VỰC HOẠT ĐỘNG (SONG NGỮ VI/EN)
// =========================================================================
const sectorDatabase: any = {
  vi: {
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
  },
  en: {
    'giai-phap-cong-nghe': {
      title: 'Technology Solutions',
      breadcrumb: 'Technology Solutions',
      desc: 'Develop and deploy customized software solutions, optimize business operations, improve performance, respond flexibly to needs and long-term development orientation.',
      banner: '/field-tech.png',
      highlights: [
        { title: 'Custom Software Development', desc: 'Design tailor-made software according to the private operating procedures of the enterprise, helping to optimize performance.' },
        { title: 'Digital Transformation Solutions', desc: 'Integrate technology into all activities (management, sales, operations), helping businesses automate processes.' },
        { title: 'Platform Building & Integration', desc: 'Develop central systems (CRM, ERP, Dashboard...) and connect existing platforms into a synchronous ecosystem.' }
      ],
      steps: ['Survey & Requirement Analysis', 'Solution & Architecture Design', 'Development & Testing', 'Deployment & Maintenance']
    },
    'giai-phap-thi-cong-lap-dat': {
      title: 'Construction & Installation',
      breadcrumb: 'Construction & Installation',
      desc: 'Comprehensive digital transformation strategy consulting, helping businesses optimize processes, enhance customer experience and achieve sustainable growth.',
      banner: '/field-construct.png',
      highlights: [
        { title: 'Current Status Assessment', desc: 'Comprehensively analyze current systems, processes and technological capabilities to determine readiness.' },
        { title: 'Overall Digital Strategy', desc: 'Consulting on a digital transformation roadmap by stages, suitable for business goals and resources.' },
        { title: 'Technology Selection Consulting', desc: 'Propose optimal platforms, technologies and deployment models (Cloud, AI, Data, CRM, ERP...).' }
      ],
      steps: ['Business Survey', 'Define Goals & Orientation', 'Build Roadmap & Solutions', 'Co-implementation & Optimization']
    },
    'cung-cap-thiet-bi-cntt': {
      title: 'IT Equipment Supply',
      breadcrumb: 'IT Equipment Supply',
      desc: 'Providing artificial intelligence and data analytics solutions, supporting smart decision making, automating processes and maximizing value.',
      banner: '/field-device.png',
      highlights: [
        { title: 'Centralized Data Systems', desc: 'Design and deploy centralized data storage systems, helping businesses manage and exploit data effectively.' },
        { title: 'Data Visualization', desc: 'Exploit data through reports, dashboards and analytical models, supporting fast and accurate decision making.' },
        { title: 'AI & Machine Learning Applications', desc: 'Deploy AI models such as prediction, classification, chatbots, image recognition... to optimize operations.' }
      ],
      steps: ['Data Collection & Standardization', 'Data Architecture Design', 'Model & System Development', 'Deployment & Continuous Optimization']
    },
    'dich-vu-cong-nghe-thong-tin': {
      title: 'Information Tech Services',
      breadcrumb: 'Information Tech Services',
      desc: 'Construction and installation of surveillance camera systems, professional wifi networks, ensuring security, stable connections for all business sizes.',
      banner: '/field-services.png',
      highlights: [
        { title: 'Surveillance Camera Solutions', desc: 'Design and install security camera systems for offices, factories, shops... with remote monitoring capabilities.' },
        { title: 'Corporate WIFI Solutions', desc: 'Deploy stable, highly secure WIFI systems to accommodate a large number of users and devices.' },
        { title: 'Network Infrastructure Solutions', desc: 'Construct overall network systems (LAN, Switch, Router, Server...) synchronized with cameras and WIFI.' }
      ],
      steps: ['Consulting & Survey', 'Schematic & Configuration Design', 'Construction & Installation', 'Handover & Maintenance']
    }
  }
};

// =========================================================================
// BỘ DỮ LIỆU CƠ SỞ TIN TỨC (SONG NGỮ VI/EN)
// =========================================================================
const newsDatabase: any = {
  vi: [
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
  ],
  en: [
    { id: 1, tag: 'Activities', tagColor: 'bg-amber-100 text-amber-600', t: 'Joyful atmosphere at myH25 Teambuilding Program at Hung Hau House', img: '/news-teambuilding.jpg', desc: 'Looking back at the memorable and beautiful moments of the HHC family in the TEAMBUILDING MYH25 program, held at Vinpearl Nha Trang resort.', date: 'June 26, 2026', time: '02:54', relatedIds: [2], content: [
      'Joining the fiery atmosphere, the HHC family participated in sightseeing, picnic activities and enhanced bonding at the beautiful island of Vinpearl Nha Trang. Here, members and their loved ones experienced meaningful, warm moments and received worthy values.',
      'Teambuilding is not only an activity to connect teammates but also an opportunity for all units, collectives, and individuals to look back and be proud of the achievements gained, as well as the difficulties and obstacles that we have overcome together. This is the perfect stepping stone to prepare for a completely joyful beginning, promising a new journey with even greater victories!',
      'Goodbye Vinpearl Nha Trang with countless beautiful memories, let us bring this positive energy back to work, continue to unite, unite and step forward firmly to conquer larger goals.',
      'HHC - Ready to break through!',
      '#HexagonCorporation #SGD #Technology'
    ] },
    { id: 2, tag: 'Activities', tagColor: 'bg-amber-100 text-amber-600', t: 'Accompanying Van Hien University Students at the Student Festival', img: '/news-vhu.jpg', desc: 'Hexagon Joint Stock Company is honored to accompany Information Technology students - Van Hien University in the "VHE Startup Devote" program.', date: 'June 26, 2026', time: '01:25', relatedIds: [1], content: [
      'Hexagon Joint Stock Company is honored to accompany Information Technology students - Van Hien University in the "VHE Startup Devote" program.',
      'Within the framework of the competition, Hexagon supported students to build business models for electronic technology equipment, and simultaneously shared methods to present professional and feasible business plans.',
      'With practical experience from businesses along with the creativity and flexibility of students, the myU team excellently conquered the judges and brought home the highest award - First Prize in Startup.',
      'This success not only affirms the professionalism and potential of Van Hien University students, but also demonstrates the strong development vision of Hexagon’s business model. Hexagon hopes to continue accompanying students in the journey to spread the startup spirit in the digital era.',
      '#HexagonCorporation #SGD #Technology'
    ] },
    { id: 3, tag: 'Events', tagColor: 'bg-orange-100 text-orange-600', t: 'Tech Shopping for Tet - Upgrading equipment, a breakthrough start', img: '/news-sam-tet.jpg', desc: 'New year, new opportunities, new equipment too! Investing in technology is investing in the future. Visit \'Hexagon\' to choose super products that effectively support your work and entertainment.', date: 'June 26, 2026', time: '01:00', relatedIds: [1, 2], content: [
      'New year, new opportunities, new equipment too! Investing in technology is investing in the future. Visit \'Hexagon\' to choose super products that effectively support your work and entertainment:',
      'Top performance.',
      'Trendy design.',
      'Unexpectedly good prices with valuable Tet gifts.',
      'Don’t just start the new year - conquer it with the right tools!',
      '#HexagonCorporation #SGD #Technology'
    ] },
    { id: 4, tag: 'News', tagColor: 'bg-blue-100 text-blue-600', t: 'Article 4', img: '/news-code.png', desc: 'Article 4', date: 'June 25, 2026', time: '18:58', relatedIds: [5], content: ['Article 4 content'] },
    { id: 5, tag: 'News', tagColor: 'bg-blue-100 text-blue-600', t: 'Article 5', img: '/news-ai-robot.jpg', desc: 'Article 5', date: 'June 25, 2026', time: '12:00', relatedIds: [4], content: ['Article 5 content'] }
  ]
};

const sidebarServices: any = {
  vi: [
    { slug: 'giai-phap-thi-cong-lap-dat', title: 'Giải pháp thi công & lắp đặt', img: '/field-construct.png', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...' },
    { slug: 'dich-vu-cong-nghe-thong-tin', title: 'Dịch vụ Công nghệ thông tin', img: '/field-services.png', desc: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp...' },
    { slug: 'giai-phap-cong-nghe', title: 'Giải pháp công nghệ', img: '/field-tech.png', desc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt...' },
    { slug: 'cung-cap-thiet-bi-cntt', title: 'Cung cấp thiết bị CNTT', img: '/field-device.png', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và tối ưu hóa...' }
  ],
  en: [
    { slug: 'giai-phap-thi-cong-lap-dat', title: 'Construction & Installation', img: '/field-construct.png', desc: 'Comprehensive digital transformation strategy consulting, helping businesses optimize processes, enhance customer experience and achieve sustainable growth...' },
    { slug: 'dich-vu-cong-nghe-thong-tin', title: 'Information Tech Services', img: '/field-services.png', desc: 'Construction and installation of surveillance camera systems, professional wifi networks, ensuring security, stable connections for all business sizes...' },
    { slug: 'giai-phap-cong-nghe', title: 'Technology Solutions', img: '/field-tech.png', desc: 'Develop and deploy customized software solutions, optimize business operations, improve performance, respond flexibly...' },
    { slug: 'cung-cap-thiet-bi-cntt', title: 'IT Equipment Supply', img: '/field-device.png', desc: 'Providing artificial intelligence and data analytics solutions, supporting smart decision making, automating processes and maximizing value...' }
  ]
};

// =========================================================================
// COMPONENT DÙNG CHUNG CHO SIDEBAR
// =========================================================================
const SharedSidebarCarousel = ({ onScrollToSectors, onNavigateSector, activeIdx, setActiveIdx, currentLang = 'vi' }: any) => {
  const handlePrev = (e: React.MouseEvent) => { e.stopPropagation(); setActiveIdx((prev: number) => (prev - 1 + sidebarServices[currentLang].length) % sidebarServices[currentLang].length); };
  const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); setActiveIdx((prev: number) => (prev + 1) % sidebarServices[currentLang].length); };

  const services = sidebarServices[currentLang] || sidebarServices['vi'];
  const activeService = services[activeIdx];
  const textTitle = currentLang === 'en' ? 'Our Services' : 'Dịch vụ của chúng tôi';
  const textBtn = currentLang === 'en' ? 'Learn more ❯' : 'Tìm hiểu thêm ❯';
  const textAll = currentLang === 'en' ? 'View all services ❯' : 'Xem tất cả dịch vụ ❯';

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm sticky top-6 text-left">
      <div className="bg-[#0f5132] text-white p-4 text-center font-black text-sm uppercase tracking-wider">{textTitle}</div>
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
          <span onClick={() => onNavigateSector(activeService.slug)} className="text-[11px] text-amber-500 font-black mt-2 inline-block cursor-pointer hover:text-amber-600">{textBtn}</span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-2">
          {services.map((_: any, dotIdx: number) => (
            <span key={dotIdx} onClick={() => setActiveIdx(dotIdx)} className={`transition-all duration-300 rounded-full cursor-pointer ${activeIdx === dotIdx ? 'w-4 h-1.5 bg-amber-500' : 'w-1.5 h-1.5 bg-slate-200'}`} />
          ))}
        </div>

        <div className="w-full border-t border-slate-100 pt-3 mt-1">
          <span onClick={onScrollToSectors} className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer block uppercase tracking-wider">{textAll}</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 1. HEADER CHUẨN ĐA NGÔN NGỮ
// =========================================================================
export const HexagonHeader = ({ currentLang, onChangeLang, onNavigate, activeSlug }: any) => {
  const navLinks = currentLang === 'en' ? [
    { slug: 'home', label: 'HOME' }, { slug: 'gioi-thieu', label: 'ABOUT US' }, { slug: 'dich-vu', label: 'SERVICES' }, { slug: 'ho-tro', label: 'SUPPORT' }, { slug: 'lien-he', label: 'CONTACT' }
  ] : [
    { slug: 'home', label: 'TRANG CHỦ' }, { slug: 'gioi-thieu', label: 'GIỚI THIỆU' }, { slug: 'dich-vu', label: 'DỊCH VỤ' }, { slug: 'ho-tro', label: 'HỖ TRỢ' }, { slug: 'lien-he', label: 'LIÊN HỆ' }
  ];

  const handleMenuClick = (slug: string) => {
    if (slug === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['gioi-thieu', 'dich-vu', 'lien-he'].includes(slug)) {
      onNavigate('home');
      setTimeout(() => {
        const target = document.getElementById(`${slug === 'gioi-thieu' ? 'about' : slug === 'dich-vu' ? 'sectors' : 'contact'}-block`);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onNavigate('home');
    }
  };

  return (
    <header className="w-full bg-[#0a5c43] text-white px-8 py-4 flex items-center justify-between border-b border-[#0d7c5a] shadow-md select-none text-left z-50 sticky top-0">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleMenuClick('home')}>
        <img src="/hexagon-logo.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-md p-0.5" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
        <span className="font-black text-xl tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Hexagon</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-emerald-100/70 ml-auto mr-10">
        {navLinks.map((item) => (
          <span key={item.slug} onClick={() => handleMenuClick(item.slug)} className={`cursor-pointer transition-colors hover:text-emerald-300 ${activeSlug === item.slug ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : ''}`}>
            {item.label}
          </span>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">
        <img src="/flag-vi.jpg" alt="Tiếng Việt" onClick={() => onChangeLang('vi')} className={`w-7 h-auto cursor-pointer transition-all duration-200 hover:scale-110 object-contain rounded-sm ${currentLang === 'vi' ? 'ring-2 ring-offset-2 ring-offset-[#0a5c43] ring-emerald-400 opacity-100' : 'opacity-40 hover:opacity-80'}`} onError={(e) => { (e.target as HTMLImageElement).src = '/flag-vi.png'; }} />
        <img src="/flag-en.jpg" alt="English" onClick={() => onChangeLang('en')} className={`w-7 h-auto cursor-pointer transition-all duration-200 hover:scale-110 object-contain rounded-sm ${currentLang === 'en' ? 'ring-2 ring-offset-2 ring-offset-[#0a5c43] ring-emerald-400 opacity-100' : 'opacity-40 hover:opacity-80'}`} onError={(e) => { (e.target as HTMLImageElement).src = '/flag-en.png'; }} />
      </div>
    </header>
  );
};

// =========================================================================
// 2. KHỐI CHI TIẾT LĨNH VỰC HOẠT ĐỘNG (TỰ ĐỘNG DỊCH THEO CỜ)
// =========================================================================
export const HexagonSectorDetail = ({ slug, onBack, currentLang = 'vi' }: any) => {
  const db = sectorDatabase[currentLang] || sectorDatabase['vi'];
  const current = db[slug] || db['giai-phap-cong-nghe'];
  
  const textHome = currentLang === 'en' ? 'Home' : 'Trang chủ';
  const textBack = currentLang === 'en' ? '❮ BACK TO HOME' : '❮ QUAY LẠI TRANG CHỦ';
  const textHighlight = currentLang === 'en' ? 'HIGHLIGHTS' : 'ĐẶC ĐIỂM NỔI BẬT';
  const textProcess = currentLang === 'en' ? 'IMPLEMENTATION PROCESS' : 'QUY TRÌNH TRIỂN KHAI';
  const textStep = currentLang === 'en' ? 'STEP' : 'BƯỚC';

  React.useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [slug, currentLang]);

  return (
    <div className="w-full bg-white text-left font-sans select-none antialiased flex flex-col min-h-screen">
      <div className="flex-1 w-full pt-10 pb-20 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto flex flex-col gap-16">
        
        <div className="text-xs text-slate-400 font-medium tracking-wide">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onBack}>{textHome}</span>
          <span className="mx-2">&gt;</span>
          <span className="text-slate-600 font-semibold">{current.breadcrumb}</span>
        </div>

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

        <div className="w-full flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f5132] tracking-tight uppercase flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#0f5132]"></div>
            {textHighlight}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {current.highlights.map((item: any, idx: number) => (
              <div key={idx} className="p-8 bg-[#f8fafc] rounded-2xl flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d1fae5] flex items-center justify-center text-[#047857] font-black text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-black text-base text-slate-950 leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f5132] tracking-tight uppercase flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#0f5132]"></div>
            {textProcess}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {current.steps.map((step: string, idx: number) => (
              <div key={idx} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-amber-200 text-amber-500 font-black text-sm shrink-0 flex items-center justify-center">
                  {idx + 1}
                </div>
                <div className="flex flex-col gap-1 pt-0.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{textStep} {idx + 1}</span>
                  <p className="text-sm font-black text-slate-900 leading-snug">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
          <button onClick={onBack} className="px-8 py-3.5 bg-[#0f5132] hover:bg-[#0a3622] text-white font-black text-sm uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-md">
            <span>❮</span> {textBack}
          </button>
        </div>

      </div>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none mt-auto">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  );
};

// =========================================================================
// 3. KHỐI DANH SÁCH BÀI VIẾT TIN TỨC (TỰ ĐỘNG DỊCH THEO CỜ)
// =========================================================================
export const HexagonNewsList = ({ onBack, onNavigateSector, onScrollToSectors, onNavigateDetailNews, currentLang = 'vi' }: any) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const db = newsDatabase[currentLang] || newsDatabase['vi'];

  const textHome = currentLang === 'en' ? 'Home' : 'Trang chủ';
  const textNews = currentLang === 'en' ? 'News' : 'Tin tức';
  const textDesc = currentLang === 'en' ? 'Latest news and updates from Hexagon Corporation.' : 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.';
  const textMore = currentLang === 'en' ? 'Read more →' : 'Xem thêm →';

  React.useEffect(() => {
    const timer = setInterval(() => { setActiveIdx((prev) => (prev + 1) % sidebarServices[currentLang].length); }, 2000);
    return () => clearInterval(timer);
  }, [currentLang]);

  return (
    <div className="w-full bg-white text-left font-sans select-none antialiased flex flex-col min-h-screen">
      <div className="flex-1 w-full pt-6 pb-20 px-4 md:px-10 lg:px-14 max-w-[1440px] mx-auto">
        <div className="text-xs text-slate-400 font-medium mb-6 tracking-wide px-2"><span className="hover:text-emerald-600 cursor-pointer" onClick={onBack}>{textHome}</span><span className="mx-2">&gt;</span><span className="text-slate-600 font-semibold">{textNews}</span></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9 flex flex-col gap-6 px-2">
            <div className="mb-4">
              <h1 className="text-4xl font-black text-amber-500 tracking-tight mb-2">{textNews}</h1>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{textDesc}</p>
              <div className="w-12 h-1 bg-amber-500 mt-3 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {db.map((news: any) => (
                <div key={news.id} className="border border-slate-100 rounded-3xl overflow-hidden shadow-xs bg-white flex flex-col hover:shadow-md transition-all duration-300 w-full">
                  <div className="w-full aspect-[16/10] overflow-hidden shrink-0"><img src={news.img} alt={news.t} className="w-full h-full object-cover" /></div>
                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className={`px-2.5 py-1 text-[10px] font-black rounded-md uppercase tracking-wider inline-block mb-2.5 ${news.tagColor}`}>{news.tag}</span>
                      <h3 onClick={() => onNavigateDetailNews(news.id)} className="font-black text-sm md:text-base text-slate-900 leading-snug tracking-tight mb-2 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 min-h-[44px]">{news.t}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{news.desc}</p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] md:text-[11px] text-slate-400 font-bold pt-3 border-t border-slate-100">
                      <span>📅 {news.date}</span><span onClick={() => onNavigateDetailNews(news.id)} className="text-amber-500 font-black flex items-center gap-0.5 cursor-pointer hover:text-amber-600">{textMore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <SharedSidebarCarousel currentLang={currentLang} onScrollToSectors={onScrollToSectors} onNavigateSector={onNavigateSector} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
          </div>
        </div>
      </div>
      <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none mt-auto">Copyright 2026 © Hexagon Corporation. All rights reserved.</footer>
    </div>
  );
};

// =========================================================================
// 4. KHỐI CHI TIẾT BÀI VIẾT TIN TỨC (TỰ ĐỘNG DỊCH THEO CỜ)
// =========================================================================
export const HexagonNewsDetail = ({ newsId, onBack, onNavigateList, onNavigateSector, onNavigateDetailNews, currentLang = 'vi' }: any) => {
  const db = newsDatabase[currentLang] || newsDatabase['vi'];
  const currentNews = db.find((n: any) => n.id === newsId) || db[0];
  const relatedNewsItems = db.filter((n: any) => currentNews.relatedIds?.includes(n.id));
  const [activeIdx, setActiveIdx] = React.useState(0);

  const textHome = currentLang === 'en' ? 'Home' : 'Trang chủ';
  const textNews = currentLang === 'en' ? 'News' : 'Bài viết';
  const textBackList = currentLang === 'en' ? '❮ Back to list' : '❮ Quay lại danh sách';
  const textRelated = currentLang === 'en' ? 'Related News' : 'Bài viết liên quan';

  React.useEffect(() => {
    const timer = setInterval(() => { setActiveIdx((prev) => (prev + 1) % sidebarServices[currentLang].length); }, 2000);
    return () => clearInterval(timer);
  }, [currentLang]);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [newsId, currentLang]);

  return (
    <div className="w-full bg-[#f8fafc] text-left font-sans select-none antialiased flex flex-col min-h-screen">
      <div className="flex-1 w-full pt-6 pb-16 px-4 md:px-10 lg:px-14 max-w-[1440px] mx-auto">
        
        <div className="text-xs text-slate-400 font-medium mb-6 tracking-wide px-2 flex items-center flex-wrap gap-y-1">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onBack}>{textHome}</span>
          <span className="mx-2 text-slate-300">&gt;</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={onNavigateList}>{textNews}</span>
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
              <span className="text-amber-500">{currentLang === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}</span>
            </div>
            <div className="w-full h-[1px] bg-slate-100 my-1" />
            <p className="text-sm md:text-base font-bold text-slate-700 leading-relaxed italic">{currentNews.desc}</p>
            {currentNews.id <= 3 && (
              <div className="w-full rounded-2xl overflow-hidden shadow-2xs border border-slate-100">
                <img src={currentNews.img} alt={currentNews.t} className="w-full h-auto object-contain" />
              </div>
            )}
            <div className="flex flex-col gap-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {currentNews.content?.map((paragraph: string, pIdx: number) => (
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
              {textBackList}
            </span>
            <SharedSidebarCarousel currentLang={currentLang} onScrollToSectors={onBack} onNavigateSector={onNavigateSector} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
          </div>
        </div>

        {relatedNewsItems.length > 0 && (
          <div className="w-full border-t border-slate-200/60 pt-10 mt-12 px-2 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2 border-l-4 border-amber-500 pl-3">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{textRelated}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedNewsItems.map((news: any) => (
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

// =========================================================================
// 5. HỆ THỐNG PUCK EDITOR CUSTOM PROPS & RENDER MAP (Yêu cầu x1.5 Mentor)
// =========================================================================
export const puckAdvancedFields = {
  bgType: { type: 'select', options: [ { label: 'Màu sắc', value: 'color' }, { label: 'Gradient', value: 'gradient' }, { label: 'Hình ảnh', value: 'image' }, { label: 'Hình ảnh & Gradient', value: 'image+gradient' }, { label: 'Hình ảnh & Màu sắc', value: 'image+color' } ] },
  gradDir: { type: 'select', options: [ { label: 'Trái → Phải', value: 'to right' }, { label: 'Phải → Trái', value: 'to left' }, { label: 'Trên → Dưới', value: 'to bottom' }, { label: 'Góc trên-trái → dưới-phải', value: 'to bottom right' }, { label: 'Góc trên-phải → dưới-trái', value: 'to bottom left' } ] },
  bgColor: { type: 'text', label: 'Mã màu nền (VD: #ffffff hoặc bg-white)' },
  gradStart: { type: 'text', label: 'Màu Gradient Bắt đầu' },
  gradEnd: { type: 'text', label: 'Màu Gradient Kết thúc' },
  bgImage: { type: 'text', label: 'Link Hình ảnh (URL)' },
  textColor: { type: 'text', label: 'Mã màu chữ (VD: text-white)' },
  animate: { type: 'radio', options: [{ label: 'Bật', value: 'true' }, { label: 'Tắt', value: 'false' }] },
  hasBtn: { type: 'radio', options: [{ label: 'Hiển thị Nút', value: 'true' }, { label: 'Ẩn Nút', value: 'false' }] },
  btnText: { type: 'text', label: 'Nội dung Nút' }
};

const getSectionStyle = (props: any) => {
  let style: any = {};
  let className = "relative w-full overflow-hidden ";
  if (props.textColor) className += `${props.textColor} `;
  if (props.animate === 'true') className += "transition-all duration-1000 hover:scale-[1.01] ";

  const gradDirMap: Record<string, string> = { 'to right': 'bg-gradient-to-r', 'to left': 'bg-gradient-to-l', 'to bottom': 'bg-gradient-to-b', 'to bottom right': 'bg-gradient-to-br', 'to bottom left': 'bg-gradient-to-bl' };
  const gradClass = `${gradDirMap[props.gradDir] || 'bg-gradient-to-r'} ${props.gradStart || 'from-transparent'} ${props.gradEnd || 'to-transparent'}`;

  switch (props.bgType) {
    case 'color': if (props.bgColor?.startsWith('bg-') || props.bgColor?.startsWith('#')) { props.bgColor.startsWith('bg-') ? className += `${props.bgColor} ` : style.backgroundColor = props.bgColor; } break;
    case 'gradient': className += `${gradClass} `; break;
    case 'image': style.backgroundImage = `url(${props.bgImage})`; className += "bg-cover bg-center "; break;
    case 'image+color': case 'image+gradient': style.backgroundImage = `url(${props.bgImage})`; className += "bg-cover bg-center "; break;
  }
  return { style, className, gradClass };
};

const SectionWrapper = ({ props, children, sectionId }: any) => {
  const { style, className, gradClass } = getSectionStyle(props);
  return (
    <section id={sectionId} className={className} style={style}>
      {props.bgType === 'image+color' && <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: props.bgColor || 'rgba(0,0,0,0.5)' }}></div>}
      {props.bgType === 'image+gradient' && <div className={`absolute inset-0 pointer-events-none ${gradClass} opacity-80`}></div>}
      
      {/* KHÔNG CÓ Z-INDEX Ở ĐÂY - ĐẢM BẢO TÁCH NỀN HOẠT ĐỘNG */}
      <div className="relative w-full h-full flex flex-col">
        {children}
        {props.hasBtn === 'true' && (
          <div className="w-full flex justify-center mt-8 pb-8 z-10">
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-colors">{props.btnText || 'Click here'}</button>
          </div>
        )}
      </div>
    </section>
  );
};

export const puckComponentsRender = {
  Hero: {
    fields: {
      ...puckAdvancedFields,
      badgeText: { type: 'text', label: 'Nhãn (Badge)' },
      phrases: { type: 'textarea', label: 'Các cụm từ thay đổi (cách nhau bởi dấu phẩy)' },
      subTitle: { type: 'text', label: 'Tiêu đề phụ' },
      descText: { type: 'textarea', label: 'Mô tả' },
      btn1Text: { type: 'text', label: 'Chữ Nút 1' },
      btn2Text: { type: 'text', label: 'Chữ Nút 2' }
    },
    defaultProps: { bgType: 'gradient', gradDir: 'to bottom right', gradStart: 'from-[#065f46]', gradEnd: 'to-[#10b981]', animate: 'true', textColor: 'text-white' },
    render: (props: any) => {
      const phraseList = props.phrases ? props.phrases.split(',').map((p:string) => p.trim()) : ["Giải pháp công nghệ", "Thi công & lắp đặt", "Cung cấp thiết bị CNTT", "Dịch vụ CNTT"];
      const [currentText, setCurrentText] = React.useState("");
      const [currentPhraseIdx, setCurrentPhraseIdx] = React.useState(0);
      const [isDeleting, setIsDeleting] = React.useState(false);

      React.useEffect(() => {
        let timer: NodeJS.Timeout;
        const fullPhrase = phraseList[currentPhraseIdx] || phraseList[0];
        if (!isDeleting && currentText === fullPhrase) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentPhraseIdx((prev) => (prev + 1) % phraseList.length);
        } else {
          timer = setTimeout(() => {
            setCurrentText(isDeleting ? fullPhrase.substring(0, currentText.length - 1) : fullPhrase.substring(0, currentText.length + 1));
          }, isDeleting ? 30 : 100);
        }
        return () => clearTimeout(timer);
      }, [currentText, isDeleting, currentPhraseIdx, phraseList]);

      return (
        <SectionWrapper props={props} sectionId="hero-block">
          <div className="w-full py-20 px-12 md:px-24 lg:px-32 flex flex-col md:flex-row items-center justify-between text-left relative min-h-[520px] md:min-h-[580px]">
            <div className="w-full md:w-[50%] max-w-lg flex flex-col items-start gap-4 z-10 pb-10 md:pb-0">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 font-extrabold text-[11px] uppercase tracking-widest rounded-full border border-yellow-500/30">{props.badgeText || 'CÔNG NGHỆ TƯƠNG LAI'}</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight min-h-[100px] md:min-h-[130px]">
                <span className="block font-bold whitespace-nowrap mb-1">{currentText}<span className="animate-pulse inline-block ml-1 text-emerald-400 font-light">|</span></span>
                <span className="block mt-2 uppercase tracking-wide">HEXAGON <span className="bg-gradient-to-r from-emerald-300 via-[#a7f3d0] to-[#f59e0b] bg-clip-text text-transparent inline-block normal-case font-bold tracking-normal">{props.subTitle || 'Solutions'}</span></span>
              </h1>
              <p className="text-emerald-100/80 text-xs md:text-sm leading-relaxed mt-2">{props.descText || 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.'}</p>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-medium text-sm rounded-xl shadow-md transition-transform hover:scale-[1.02]">{props.btn1Text || 'Khám phá Dịch vụ'}</button>
                <button className="px-5 py-3 bg-white/5 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors hover:bg-white/10">{props.btn2Text || 'Liên hệ Tư vấn'}</button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-10 md:mt-0 relative">
              {/* VIDEO CLASS CHUẨN TAILWIND */}
              <video src="/tech-globe.mp4" autoPlay loop muted playsInline className="w-full max-w-[530px] h-auto md:max-w-[600px] object-contain mix-blend-screen transition-all duration-300" style={{ mixBlendMode: 'screen' }} />
            </div>
          </div>
        </SectionWrapper>
      );
    }
  },
  About: {
    fields: {
      ...puckAdvancedFields,
      quote: { type: 'text', label: 'Câu Quote trên ảnh' },
      sectionTitle: { type: 'text', label: 'Tiêu đề chính' },
      mainDesc: { type: 'textarea', label: 'Mô tả chính' },
      mTitle: { type: 'text', label: 'Tiêu đề ô 1' }, mDesc: { type: 'text', label: 'Mô tả ô 1' },
      vTitle: { type: 'text', label: 'Tiêu đề ô 2' }, vDesc: { type: 'text', label: 'Mô tả ô 2' },
      cTitle: { type: 'text', label: 'Tiêu đề ô 3' }, cDesc: { type: 'text', label: 'Mô tả ô 3' },
      pTitle: { type: 'text', label: 'Tiêu đề ô 4' }, pDesc: { type: 'text', label: 'Mô tả ô 4' }
    },
    defaultProps: { bgType: 'color', bgColor: 'bg-white', animate: 'false', textColor: 'text-slate-800' },
    render: (props: any) => (
      <SectionWrapper props={props} sectionId="about-block">
        <div className="w-full py-24 px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center text-left max-w-[1440px] mx-auto scroll-mt-12">
          <div className="w-full lg:w-[50%] relative p-6 bg-[#d1f5e3] rounded-[2rem] shadow-sm shrink-0">
            <img src="/hexagon-office.jpg" alt="Office" className="w-full h-[460px] object-cover rounded-2xl shadow-sm" />
            <div className="absolute bottom-3 right-3 translate-x-2 translate-y-2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100/60 z-20 w-full max-w-[310px] flex flex-col gap-2">
              <p className="text-sm font-bold text-slate-800 italic leading-relaxed text-left">"{props.quote || 'Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^'}"</p>
              <span className="text-[11px] font-black text-[#eab308] text-right block tracking-wider uppercase">— HEXAGON CULTURE</span>
            </div>
          </div>
          <div className="w-full lg:w-[50%] flex flex-col gap-6 pl-0 lg:pl-4">
            <h2 className="text-3xl font-black text-[#0f172a] tracking-tight border-b-4 border-emerald-500 pb-2 w-max">{props.sectionTitle || 'Về Hexagon'}</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{props.mainDesc || 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-slate-50 rounded-xl shadow-2xs border border-slate-100/60">
                <h4 className="font-bold text-emerald-700 text-sm mb-1">{props.mTitle || 'Sứ mệnh'}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{props.mDesc || 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl shadow-2xs border border-slate-100/60">
                <h4 className="font-bold text-emerald-700 text-sm mb-1">{props.vTitle || 'Tầm nhìn'}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{props.vDesc || 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl shadow-2xs border border-slate-100/60">
                <h4 className="font-bold text-emerald-700 text-sm mb-1">{props.cTitle || 'Giá trị cốt lõi'}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{props.cDesc || 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl shadow-2xs border border-slate-100/60">
                <h4 className="font-bold text-emerald-700 text-sm mb-1">{props.pTitle || 'Nền tảng'}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{props.pDesc || 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.'}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    )
  },

  Sectors: {
    fields: {
      ...puckAdvancedFields,
      secTitle: { type: 'text', label: 'Tiêu đề' },
      s1: { type: 'text', label: 'Tên Dịch vụ 1' },
      s2: { type: 'text', label: 'Tên Dịch vụ 2' },
      s3: { type: 'text', label: 'Tên Dịch vụ 3' },
      s4: { type: 'text', label: 'Tên Dịch vụ 4' },
      sDesc: { type: 'text', label: 'Mô tả dịch vụ (Dùng chung)' },
      sBtn: { type: 'text', label: 'Chữ Nút Xem chi tiết' }
    },
    defaultProps: { bgType: 'color', bgColor: 'bg-[#f8fafc]', animate: 'false', textColor: 'text-slate-900' },
    render: ({ onNavigate, ...props }: any) => (
      <SectionWrapper props={props} sectionId="sectors-block">
        <div className="w-full py-20 px-8 text-center scroll-mt-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{props.secTitle || 'Lĩnh vực hoạt động'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[{ t: props.s1 || 'Giải pháp công nghệ', slug: 'giai-phap-cong-nghe', img: '/field-tech.png' }, { t: props.s2 || 'Giải pháp thi công & lắp đặt', slug: 'giai-phap-thi-cong-lap-dat', img: '/field-construct.png' }, { t: props.s3 || 'Cung cấp thiết bị CNTT', slug: 'cung-cap-thiet-bi-cntt', img: '/field-device.png' }, { t: props.s4 || 'Dịch vụ Công nghệ thông tin', slug: 'dich-vu-cong-nghe-thong-tin', img: '/field-services.png' }].map((s, i) => (
              <div key={i} onClick={() => { if (onNavigate) onNavigate(s.slug); }} className="relative rounded-2xl overflow-hidden shadow-md h-[340px] sm:h-[380px] group cursor-pointer bg-white border border-slate-100">
                <div className="absolute inset-0 w-full h-full transition-all duration-500 transform opacity-100 group-hover:opacity-0 group-hover:scale-95 pointer-events-none"><img src={s.img} alt={s.t} className="w-full h-full object-cover" /></div>
                <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-start text-left bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]/10 transition-all duration-500 transform opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 z-10 bg-white">
                  <h4 className="font-black text-lg text-[#f59e0b] leading-tight tracking-wide mb-3">{s.t}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{props.sDesc || 'Hệ thống giải pháp chuyên sâu mang tính ứng dụng cao...'}</p>
                  <span className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1 w-max">{props.sBtn || 'Xem chi tiết →'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    )
  },

  NewsGrid: {
    fields: {
      ...puckAdvancedFields,
      newsTitle: { type: 'text', label: 'Tiêu đề' },
      btnAllText: { type: 'text', label: 'Chữ Nút Xem tất cả' }
    },
    defaultProps: { bgType: 'color', bgColor: 'bg-white', animate: 'false', textColor: 'text-slate-900' },
    render: ({ onNavigateAllNews, onNavigateDetailNews, ...props }: any) => (
      <SectionWrapper props={props} sectionId="news-block">
        <div className="w-full py-16 px-8 text-center">
          <h2 className="text-2xl font-black mb-1">{props.newsTitle || 'Tin tức'}</h2>
          <div className="w-12 h-1 bg-yellow-500 mx-auto mb-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left max-w-6xl mx-auto">
            {newsDatabase['vi'].slice(0, 2).map((news: any) => (
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
            {newsDatabase['vi'].slice(2, 5).map((news: any) => (
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
          <button onClick={() => { if(onNavigateAllNews) onNavigateAllNews(); }} className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors tracking-wide cursor-pointer">{props.btnAllText || 'Xem tất cả bài viết ❯'}</button>
        </div>
      </SectionWrapper>
    )
  },

  Partners: {
    fields: { ...puckAdvancedFields, partnerTitle: { type: 'text', label: 'Tiêu đề' } },
    defaultProps: { bgType: 'gradient', gradDir: 'to bottom', gradStart: 'from-[#0a5c43]', gradEnd: 'to-[#10b981]', animate: 'false', textColor: 'text-slate-950' },
    render: (props: any) => {
      const logos = ['logo-1-happyfood.png', 'logo-2-ecobook.png', 'logo-3-comoon.png', 'logo-4-hexagon-blue.png', 'logo-5-hexagon-sun.png', 'logo-6-hexagon-book.png', 'logo-7-hexagon-shield.png', 'logo-8-hexagon-fade.png'];
      return (
        <SectionWrapper props={props} sectionId="partners-block">
          <div className="w-full py-14 px-8 text-center overflow-hidden">
            <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee-infinite { display: flex; width: max-content; animation: marquee 25s linear infinite; }`}</style>
            <h3 className="text-3xl font-black mb-10 tracking-wide">{props.partnerTitle || 'Các đối tác liên kết'}</h3>
            <div className="w-full max-w-6xl mx-auto overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-emerald-500/50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-emerald-500/50 to-transparent z-10 pointer-events-none"></div>
              <div className="animate-marquee-infinite gap-6 flex items-center">
                {[...logos, ...logos].map((logo, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm w-[145px] h-[90px] flex items-center justify-center shrink-0">
                    <img src={`/${logo}`} alt="Partner" className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      );
    }
  },

  Contact: {
    fields: {
      ...puckAdvancedFields,
      contactTitle: { type: 'text', label: 'Tiêu đề' },
      contactDesc: { type: 'textarea', label: 'Mô tả ngắn' },
      hqLabel: { type: 'text', label: 'Nhãn Trụ sở' }, hqText: { type: 'text', label: 'Địa chỉ' },
      mailLabel: { type: 'text', label: 'Nhãn Email' }, mailText: { type: 'text', label: 'Email' },
      phoneLabel: { type: 'text', label: 'Nhãn Hotline' }, phoneText: { type: 'text', label: 'Hotline' },
      copyRight: { type: 'text', label: 'Bản quyền Footer' }
    },
    defaultProps: { bgType: 'color', bgColor: 'bg-white', animate: 'false', textColor: 'text-slate-800' },
    render: (props: any) => (
      <SectionWrapper props={props} sectionId="contact-block">
        <div className="w-full flex flex-col">
          <div className="w-full py-16 px-8 flex flex-col md:flex-row gap-10 text-left max-w-6xl mx-auto items-center scroll-mt-12">
            <div className="w-full md:w-1/2 flex flex-col gap-4 z-10">
              <h2 className="text-2xl font-black">{props.contactTitle || 'Liên hệ với chúng tôi'}</h2>
              <p className="text-xs leading-relaxed mb-2">{props.contactDesc || 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.'}</p>
              
              <div className="flex flex-col gap-5 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-sm">📍</div>
                  <div className="flex flex-col"><p className="font-bold mb-0.5">{props.hqLabel || 'Trụ sở chính'}</p><p className="text-[11px] opacity-80">{props.hqText || '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh'}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-sm">✉️</div>
                  <div className="flex flex-col"><p className="font-bold mb-0.5">{props.mailLabel || 'Email'}</p><p className="text-[11px] opacity-80">{props.mailText || 'info@hexagon.xyz'}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-sm">📞</div>
                  <div className="flex flex-col"><p className="font-bold mb-0.5">{props.phoneLabel || 'Hotline'}</p><p className="text-[11px] opacity-80">{props.phoneText || '096 446 0333'}</p></div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 border-t border-slate-100/50 pt-5">
                {['Facebook', 'Linkedin', 'YouTube', 'Zalo'].map(social => (
                  <button key={social} className="px-4 py-1.5 bg-[#f0fdf4] text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer">{social}</button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 p-1.5 border border-slate-100/50 rounded-2xl shadow-xs bg-white/10 z-10">
              <img src="/google-maps-demo.png" alt="Maps" className="w-full h-[320px] object-cover rounded-xl" />
            </div>
          </div>
          <footer className="w-full bg-[#052e16] text-emerald-200/60 text-[11px] font-medium py-4 text-center border-t border-emerald-950 select-none mt-auto z-10">
            {props.copyRight || 'Copyright 2026 © Hexagon Corporation. All rights reserved.'}
          </footer>
        </div>
      </SectionWrapper>
    )
  }
};