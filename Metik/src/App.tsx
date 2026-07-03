import React, { useState, useEffect } from 'react';
import { Puck } from '@puckeditor/core';

const TikTokIcon = () => (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A139.5,139.5,0,1,1,185.75,210.13a137.74,137.74,0,0,1,77.46,23.86v-88.7A224.52,224.52,0,0,0,185.75,122,227.5,227.5,0,1,0,413.25,349.38V257.65A177.37,177.37,0,0,0,448,209.91Z"/>
  </svg>
);

const MetikCommonHeader = ({ activeTab }: { activeTab: string }) => (
  <header className="w-full bg-white px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
    <div className="flex items-center cursor-pointer"><img src="/logo.png" className="h-12 object-contain" alt="Metik Logo" /></div>
    <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-gray-700">
      <span className={`${activeTab === 'home' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'hover:text-orange-500'} cursor-pointer`}>Trang Chủ</span>
      <span className={`${activeTab === 'about' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'hover:text-orange-500'} cursor-pointer`}>Giới Thiệu</span>
      <span className={`${activeTab === 'product' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'hover:text-orange-500'} cursor-pointer`}>Sản Phẩm</span>
      <span className="hover:text-orange-500 cursor-pointer">Tin Tức</span>
      <span className={`${activeTab === 'contact' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'hover:text-orange-500'} cursor-pointer`}>Liên Hệ</span>
    </nav>
    <div className="flex items-center gap-2.5">
      <span className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer">f</span>
      <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer"><TikTokIcon /></span>
      <span className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer">in</span>
    </div>
  </header>
);

const MetikCommonFooter = ({ hotline, email, address }: any) => (
  <footer className="w-full bg-[#f3b923] text-gray-900 pt-12 px-8 border-t-4 border-orange-500 flex flex-col mt-auto">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 w-full">
      <div className="md:col-span-5 flex flex-col items-start gap-4">
        <img src="/logo.png" className="h-14 object-contain" alt="Metik Logo" />
        <p className="text-xs font-bold text-gray-800 leading-relaxed max-w-md text-justify">
          METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.
        </p>
      </div>
      <div className="md:col-span-7 flex flex-col items-start gap-4 text-xs font-black text-gray-800">
        <span className="text-sm font-black uppercase tracking-wider text-[#2e8b37] border-b border-gray-300/60 pb-1 mb-1 w-full">
          THÔNG TIN LIÊN HỆ
        </span>
        <div className="flex items-center gap-2"><span className="text-sm">📞</span> <span>{hotline}</span></div>
        <div className="flex items-center gap-2"><span className="text-sm">✉️</span> <span>{email}</span></div>
        <div className="flex items-start gap-2 leading-tight"><span className="mt-0.5 text-sm">📍</span> <span>{address}</span></div>
      </div>
    </div>
    <div className="w-full bg-orange-600/95 py-3 text-center text-[10px] font-bold text-white tracking-wider -mx-8 px-8">
      Copyright 2026 © <span className="uppercase font-black">METIK.</span> All rights reserved
    </div>
  </footer>
);

const productDataDetail: Record<string, any> = {
  bap: {
    name: 'Snack vị Bắp', img: '/product-bap.png', title1: 'Hương vị bắp đặc trưng, kết cấu giòn:',
    desc: 'Snack metik vị Bắp là dòng snack được phát triển từ hương vị bắp quen thuộc, kết hợp giữa nguyên liệu chọn lọc và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm đậm vị bắp tự nhiên, dễ ăn, cuốn miệng, mang đến trải nghiệm ăn vặt mới mẻ.',
    txt1: 'Snack bắp có mùi thơm rõ của bắp, vị sữa bắp béo nhẹ, hậu vị ngọt tự nhiên, mang hương vị hấp dẫn khi ăn.',
    txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
    txt3: 'Snack Bắp METIK có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung đạm đậu nành, có thể dán nhãn "source of protein", và bổ sung xơ, có thể dán nhãn "source of fiber".'
  },
  bbq: {
    name: 'Snack vị BBQ', img: '/product-bbq.png', title1: 'Hương vị BBQ đậm đà, kết cấu giòn:',
    desc: 'Snack METIK vị BBQ là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM, mang đến trải nghiệm ăn vặt tuyệt vời. Sản phẩm sử dụng gia vị thịt nướng, lấy cảm hứng từ phong cách BBQ quen thuộc.',
    txt1: 'Snack có mùi thơm rõ của gia vị BBQ, vị mặn ngọt hài hòa, xen lẫn hậu vị khói nhẹ, mang đến hương vị hấp dẫn khi ăn.',
    txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
    txt3: 'Snack vị BBQ OCHAO có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có thể dán nhãn "source of fiber".'
  },
  phomai: {
    name: 'Snack vị Phô mai', img: '/product-phomai.png', title1: 'Hương vị phô mai béo nhẹ, kết cấu giòn:',
    desc: 'Snack Phô Mai METIK là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm có thành phần phô mai thơm nhẹ, dễ ăn và mang đến trải nghiệm ăn vặt hấp dẫn.',
    txt1: 'Snack có mùi thơm phô mai rõ nét, vị béo ngậy vừa phải, hòa quyện cùng vị umami và thoang thoảng mùi khói nhẹ, mang đến hương vị hấp dẫn khi ăn.',
    txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
    txt3: 'Snack Phô Mai METIK có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có thể dán nhãn "source of fiber".'
  },
  taobien: {
    name: 'Snack vị Tảo biển', img: '/product-taobien.png', title1: 'Hương vị hấp dẫn, kết cấu giòn:',
    desc: 'Snack METIK vị Tảo Biển là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm sử dụng gia vị tảo biển Nori, tạo hương vị umami nhẹ nhàng, dễ ăn và phù hợp nhiều nhóm người tiêu dùng.',
    txt1: 'Snack tảo biển có mùi rong biển nhẹ, hòa quyện cùng vị bùi của đậu và vị umami tự nhiên, mang đến hương vị hấp dẫn khi ăn.',
    txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
    txt3: 'Snack tảo biển METIK có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung đạm đậu nành, có thể dán nhãn "source of protein".'
  }
};

const BaseDetailRender = ({ data, relatedProducts, hotline, email, address }: any) => (
  <div className="w-full flex flex-col font-sans select-none text-left bg-white text-gray-800 min-h-screen">
    <MetikCommonHeader activeTab="product" />
    <section className="w-full bg-[#f4f4f4] py-3.5 px-8 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between w-full text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        <div className="flex items-center gap-1"><span>Trang chủ</span> <span className="text-gray-300">/</span> <span>Sản phẩm</span> <span className="text-gray-300">/</span> <span className="text-gray-500 font-extrabold">Các sản phẩm bánh Metik</span></div>
        <div className="flex items-center gap-1 text-sm text-gray-400 select-none"><span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200">‹</span><span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200">›</span></div>
      </div>
    </section>
    <section className="py-12 px-8 max-w-6xl mx-auto w-full flex-1">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 w-full aspect-square overflow-hidden flex items-center justify-center border border-gray-100 rounded-sm shadow-sm bg-gray-50"><img src={data.img} className="w-full h-full object-cover" alt={data.name} /></div>
        <div className="md:col-span-7 flex flex-col gap-4 text-left">
          <h2 className="text-2xl font-black text-gray-800 tracking-wide pb-2 border-b border-gray-100">{data.name}</h2>
          <p className="text-sm font-medium text-gray-500 leading-relaxed text-justify">{data.desc}</p>
          <div className="text-[11px] font-bold text-gray-400 tracking-wide pt-2">Danh mục: <span className="text-green-600 font-extrabold cursor-pointer hover:underline">Các sản phẩm bánh METIK</span></div>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-6 h-6 rounded-full bg-[#3b5998] text-white flex items-center justify-center font-bold text-[10px] cursor-pointer shadow-sm hover:scale-110 transition-transform">f</span>
            <span className="w-6 h-6 rounded-full bg-[#0077b5] text-white flex items-center justify-center font-bold text-[10px] cursor-pointer shadow-sm hover:scale-110 transition-transform">in</span>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-16 relative"><div className="w-full h-[1px] bg-gray-200 absolute top-1/2 left-0 z-0"></div><span className="bg-white px-5 text-xs font-black text-gray-700 uppercase tracking-widest relative z-10 border border-gray-200/80 py-1.5 rounded-sm">Chi tiết sản phẩm</span></div>
      <div className="flex flex-col gap-6 text-xs text-gray-600 leading-relaxed text-left max-w-4xl">
        <p><span className="font-black text-black block mb-1 uppercase tracking-wide text-[10px]">{data.title1}</span>{data.txt1}</p>
        <p><span className="font-black text-black block mb-1 uppercase tracking-wide text-[10px]">Công thức được nghiên cứu bài bản, sản xuất trên dây chuyền hiện đại:</span>{data.txt2}</p>
        <p><span className="font-black text-black block mb-1 uppercase tracking-wide text-[10px]">Đa dạng hình thức chế biến, phù hợp nhiều thị trường:</span>{data.txt3}</p>
      </div>
      <div className="mt-20 pt-10 border-t border-gray-100 w-full">
        <div className="mb-8 text-left"><h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Sản phẩm liên quan</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((p: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-sm shadow-md overflow-hidden flex flex-col items-center p-0 group cursor-pointer">
              <div className="w-full aspect-square bg-gray-50 overflow-hidden flex items-center justify-center border-b border-gray-100"><img src={p.img} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" alt={p.name} /></div>
              <div className="w-full py-4 bg-white text-center"><h3 className="text-xs font-black text-[#ff6600] tracking-wide uppercase group-hover:text-orange-600">{p.name}</h3></div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <MetikCommonFooter hotline={hotline} email={email} address={address} />
  </div>
);

const customConfig = {
  components: {
    
    MetikHomepageContainer: {
      label: 'Metik - 1. Trang Chủ (Full Toàn Bộ)',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        const products = [
          { name: 'Snack Vị Tảo Biển', img: '/product-taobien.png' },
          { name: 'Snack Vị BBQ', img: '/product-bbq.png' },
          { name: 'Snack Vị Bắp', img: '/product-bap.png' },
          { name: 'Snack Vị Phô Mai', img: '/product-phomai.png' }
        ];
        const banners = ['/banner-hero1.png', '/banner-hero2.png'];
        const [currentSlide, setCurrentSlide] = useState(0);

        useEffect(() => {
          const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
          }, 4000);
          return () => clearInterval(timer);
        }, []);

        return (
          <div className="w-full flex flex-col font-sans select-none text-left bg-[#fffdf6] text-gray-800">
            <MetikCommonHeader activeTab="home" />
            <section className="w-full relative min-h-[340px] md:min-h-[420px] lg:min-h-[480px] flex items-end overflow-hidden border-b-8 border-[#30973a]">
              <div className="flex w-[200%] h-full absolute inset-0 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 50}%)` }}>
                {banners.map((src, index) => (
                  <div key={index} className="w-1/2 h-full relative flex-shrink-0"><img src={src} className="w-full h-full object-cover object-center" alt="Banner" /></div>
                ))}
              </div>
            </section>
            <section className="py-16 px-8 max-w-6xl mx-auto w-full">
              <div className="mb-10 text-left"><h2 className="text-2xl font-black text-[#2e8b37] uppercase tracking-wide inline bg-gradient-to-t from-[#ffcc00] from-45% to-transparent to-45% pb-1 pr-1">Sản Phẩm Mới</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center p-0 group cursor-pointer">
                    <div className="w-full aspect-square bg-gray-50 overflow-hidden flex items-center justify-center border-b border-gray-100"><img src={p.img} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" alt={p.name} /></div>
                    <div className="w-full py-4 bg-white text-center"><h3 className="text-sm font-black text-[#ff6600] tracking-wide">{p.name}</h3></div>
                  </div>
                ))}
              </div>
            </section>
            <section className="py-12 px-8 max-w-6xl mx-auto w-full bg-white">
              <div className="flex flex-col gap-12">
                <div className="text-left"><h2 className="text-2xl font-black text-[#2e8b37] inline bg-gradient-to-t from-[#ffcc00] from-45% to-transparent to-45% pb-1 pr-1">Giới Thiệu về Metik</h2></div>
                <p className="text-sm font-medium text-gray-600 leading-relaxed text-justify -mt-4"><span className="font-bold text-black">Metik</span> là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-6 rounded-2xl overflow-hidden shadow-md group border border-gray-100"><img src="/about-snack.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Khay Snack Metik" /></div>
                  <div className="md:col-span-6 text-sm font-medium text-gray-600 leading-relaxed text-justify"><p>Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                  <div className="md:col-span-6 text-sm font-medium text-gray-600 leading-relaxed"><ul className="flex flex-col gap-4 list-disc pl-5 text-gray-600 font-semibold text-justify"><li>Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.</li><li>Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.</li><li>Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.</li></ul></div>
                  <div className="md:col-span-6 rounded-2xl overflow-hidden shadow-md group border border-gray-100"><img src="/about-nhamay.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Nhà máy Ochao" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                  <div className="md:col-span-6 rounded-2xl overflow-hidden shadow-md group border border-gray-100"><img src="/about-cogai.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cô gái" /></div>
                  <div className="md:col-span-6 text-sm font-medium text-gray-600 leading-relaxed text-justify"><p>Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.</p></div>
                </div>
              </div>
            </section>
            <section className="py-16 px-8 bg-[#fffbe8]">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 flex flex-col items-start">
                  <div className="mb-6 text-left"><h2 className="text-xl font-black text-[#2e8b37] inline bg-gradient-to-t from-[#ffcc00] from-45% to-transparent to-45% pb-1 pr-1">Về Chúng Tôi</h2></div>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed mb-4 text-justify">Với tinh thần “Chạm mê tít – Snap into Joy”, <span className="font-bold text-black">metik</span> mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày.</p>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed text-justify"><span className="font-bold text-black">metik</span> là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.</p>
                </div>
                <div className="md:col-span-6 w-full aspect-video rounded-2xl shadow-xl overflow-hidden border-4 border-white bg-black relative"><video src="/video-metik.mp4" controls autoPlay muted loop className="w-full h-full object-cover" /></div>
              </div>
            </section>
            <section className="py-16 px-8 max-w-6xl mx-auto w-full">
              <div className="mb-10 text-left"><h2 className="text-xl font-black text-[#2e8b37] uppercase tracking-wide inline bg-gradient-to-t from-[#ffcc00] from-45% to-transparent to-45% pb-1 pr-1">Khách Hàng Nói Gì?</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-md flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0 bg-gray-50 flex items-center justify-center"><img src="/avatar-vinh.png" className="w-full h-full object-cover" alt="Huỳnh Vĩnh" /></div>
                  <div className="flex flex-col text-left"><div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div><p className="text-xs font-medium text-gray-600 italic leading-relaxed">"Snack Metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường!"</p><span className="text-[11px] font-black text-gray-400 mt-3 uppercase tracking-wider">Sinh viên Huỳnh Vĩnh, TP.HCM</span></div>
                </div>
                <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-md flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 flex-shrink-0 bg-gray-50 flex items-center justify-center"><img src="/avatar-duyen.png" className="w-full h-full object-cover" alt="Mỹ Duyên" /></div>
                  <div className="flex flex-col text-left"><div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div><p className="text-xs font-medium text-gray-600 italic leading-relaxed">"Metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa."</p><span className="text-[11px] font-black text-gray-400 mt-3 uppercase tracking-wider">Bạn Mỹ Duyên, Đồng Tháp</span></div>
                </div>
              </div>
            </section>
            <MetikCommonFooter hotline={hotline} email={email} address={address} />
          </div>
        );
      }
    },

    MetikAboutContainer: {
      label: 'Metik - 2. Trang Giới Thiệu (Full)',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        return (
          <div className="w-full flex flex-col font-sans select-none text-left bg-white text-gray-800 min-h-screen">
            <MetikCommonHeader activeTab="about" />
            <section className="py-20 px-8 max-w-6xl mx-auto w-full flex-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-6 w-full aspect-video rounded-sm shadow-lg overflow-hidden border border-gray-200 bg-black"><video src="/video-about.mp4" controls autoPlay muted loop className="w-full h-full object-cover" /></div>
                <div className="md:col-span-6 flex flex-col gap-6 text-sm font-semibold text-gray-500 leading-relaxed text-justify">
                  <p>Với tinh thần “Chạm mê tít – Snap into Joy”, <span className="font-bold text-black">metik</span> mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, <span className="font-bold text-black">metik</span> mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung and đầy cảm hứng.</p>
                  <p><span className="font-bold text-black">metik</span> không chỉ là một sản phẩm snack. <span className="font-bold text-black">metik</span> là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.</p>
                </div>
              </div>
            </section>
            <MetikCommonFooter hotline={hotline} email={email} address={address} />
          </div>
        );
      }
    },

    MetikProductsContainer: {
      label: 'Metik - 3. Danh Sách Sản Phẩm',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        const listProducts = [
          { name: 'Snack Vị Bắp', img: '/product-bap.png' }, { name: 'Snack Vị BBQ', img: '/product-bbq.png' },
          { name: 'Snack Vị Phô Mai', img: '/product-phomai.png' }, { name: 'Snack Vị Tảo Biển', img: '/product-taobien.png' }
        ];
        return (
          <div className="w-full flex flex-col font-sans select-none text-left bg-white text-gray-800 min-h-screen">
            <MetikCommonHeader activeTab="product" />
            <section className="w-full relative min-h-[220px] md:min-h-[280px] lg:min-h-[320px] overflow-hidden border-b-8 border-[#1e73be]"><img src="/banner-hero1.png" className="w-full h-full object-cover object-center absolute inset-0" alt="Snack Banner" /></section>
            <section className="pt-8 px-8 max-w-6xl mx-auto w-full"><div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider"><span>Trang chủ</span> <span className="mx-1 text-gray-300">/</span> <span className="text-orange-500">Sản phẩm</span></div></section>
            <section className="py-8 px-8 max-w-6xl mx-auto w-full flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listProducts.map((p, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center p-0 group cursor-pointer">
                    <div className="w-full aspect-square bg-gray-50 overflow-hidden flex items-center justify-center border-b border-gray-100"><img src={p.img} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" alt={p.name} /></div>
                    <div className="w-full py-4 bg-white text-center"><h3 className="text-xs font-black text-[#ff6600] tracking-wide uppercase group-hover:text-orange-600">{p.name}</h3></div>
                  </div>
                ))}
              </div>
            </section>
            <MetikCommonFooter hotline={hotline} email={email} address={address} />
          </div>
        );
      }
    },

    MetikProductDetail_Bap: {
      label: 'Metik - 4A. Chi Tiết - Vị Bắp',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        const data = {
          name: 'Snack vị Bắp', img: '/product-bap.png', title1: 'Hương vị bắp đặc trưng, kết cấu giòn:',
          desc: 'Snack metik vị Bắp là dòng snack được phát triển từ hương vị bắp quen thuộc, kết hợp giữa nguyên liệu chọn lọc và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm đậm vị bắp tự nhiên, dễ ăn, cuốn miệng, mang đến trải nghiệm ăn vặt mới mẻ.',
          txt1: 'Snack bắp có mùi thơm rõ của bắp, vị sữa bắp béo nhẹ, hậu vị ngọt tự nhiên, mang hương vị hấp dẫn khi ăn.',
          txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
          txt3: 'Snack Bắp METIK có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung đạm đậu nành, có thể dán nhãn "source of protein", và bổ sung xơ, có thể dán nhãn "source of fiber".'
        };
        const related = [productDataDetail['bbq'], productDataDetail['phomai'], productDataDetail['taobien']];
        return <BaseDetailRender data={data} relatedProducts={related} hotline={hotline} email={email} address={address} />;
      }
    },
    MetikProductDetail_BBQ: {
      label: 'Metik - 4B. Chi Tiết - Vị BBQ',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        const data = {
          name: 'Snack vị BBQ', img: '/product-bbq.png', title1: 'Hương vị BBQ đậm đà, kết cấu giòn:',
          desc: 'Snack METIK vị BBQ là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM, mang đến trải nghiệm ăn vặt tuyệt vời. Sản phẩm sử dụng gia vị thịt nướng, lấy cảm hứng từ phong cách BBQ quen thuộc.',
          txt1: 'Snack có mùi thơm rõ của gia vị BBQ, vị mặn ngọt hài hòa, xen lẫn hậu vị khói nhẹ, mang đến hương vị hấp dẫn khi ăn.',
          txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
          txt3: 'Snack vị BBQ OCHAO có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có thể dán nhãn "source of fiber".'
        };
        const related = [productDataDetail['bap'], productDataDetail['phomai'], productDataDetail['taobien']];
        return <BaseDetailRender data={data} relatedProducts={related} hotline={hotline} email={email} address={address} />;
      }
    },
    MetikProductDetail_PhoMai: {
      label: 'Metik - 4C. Chi Tiết - Vị Phô Mai',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        const data = {
          name: 'Snack vị Phô mai', img: '/product-phomai.png', title1: 'Hương vị phô mai béo nhẹ, kết cấu giòn:',
          desc: 'Snack Phô Mai METIK là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm có thành phần phô mai thơm nhẹ, dễ ăn và mang đến trải nghiệm ăn vặt hấp dẫn.',
          txt1: 'Snack có mùi thơm phô mai rõ nét, vị béo ngậy vừa phải, hòa quyện cùng vị umami và thoang thoảng mùi khói nhẹ, mang đến hương vị hấp dẫn khi ăn.',
          txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
          txt3: 'Snack Phô Mai METIK có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có thể dán nhãn "source of fiber".'
        };
        const related = [productDataDetail['bap'], productDataDetail['bbq'], productDataDetail['taobien']];
        return <BaseDetailRender data={data} relatedProducts={related} hotline={hotline} email={email} address={address} />;
      }
    },
    MetikProductDetail_TaoBien: {
      label: 'Metik - 4D. Chi Tiết - Vị Tảo Biển',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        const data = {
          name: 'Snack vị Tảo biển', img: '/product-taobien.png', title1: 'Hương vị hấp dẫn, kết cấu giòn:',
          desc: 'Snack METIK vị Tảo Biển là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM. Sản phẩm sử dụng gia vị tảo biển Nori, tạo hương vị umami nhẹ nhàng, dễ ăn và phù hợp nhiều nhóm người tiêu dùng.',
          txt1: 'Snack tảo biển có mùi rong biển nhẹ, hòa quyện cùng vị bùi của đậu và vị umami tự nhiên, mang đến hương vị hấp dẫn khi ăn.',
          txt2: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.',
          txt3: 'Snack tảo biển METIK có thể phát triển dạng phôi bánh, dạng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung đạm đậu nành, có thể dán nhãn "source of protein".'
        };
        const related = [productDataDetail['bap'], productDataDetail['bbq'], productDataDetail['phomai']];
        return <BaseDetailRender data={data} relatedProducts={related} hotline={hotline} email={email} address={address} />;
      }
    },

    MetikContactContainer: {
      label: 'Metik - 5. Trang Liên Hệ (Bản Đồ Lớn)',
      fields: { hotline: { type: 'text' }, email: { type: 'text' }, address: { type: 'text' } },
      defaultProps: { hotline: '(+84) 79 721 3333', email: 'sale@ochao.vn', address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM' },
      render: ({ hotline, email, address }: any) => {
        return (
          <div className="w-full flex flex-col font-sans select-none text-left bg-white text-gray-800">
            <MetikCommonHeader activeTab="contact" />
            <section className="w-full overflow-hidden bg-gray-100 flex">
              <img src="/map-ochao.png" className="w-full h-auto object-cover block" alt="Google Map Ochao HungHau" />
            </section>
            <MetikCommonFooter hotline={hotline} email={email} address={address} />
          </div>
        );
      }
    }

  }
};

export default function App() {
  return (
    <div className="w-screen h-screen" style={{ width: '100vw', height: '100vh' }}>
      <Puck 
        config={customConfig as any} 
        data={{ 
          content: [
            { type: 'MetikHomepageContainer', props: { id: 'default-home-page' } }
          ], 
          root: {} 
        }} 
      />
    </div>
  );
}