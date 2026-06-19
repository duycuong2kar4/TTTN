import React from 'react';

const AdminHero = () => {
  // Gán cứng thông số giả lập khít rịt theo thiết kế Ảnh 1
  const title = "Sen Hồng";
  const titleColor = "#facc15"; // Màu chữ vàng rực
  const subtitle = "LAN TỎA GIÁ TRỊ ĐẤT";
  const desc = "CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.";
  const buttonText = "Tham gia cộng đồng";
  
  // Link ảnh dải lụa sóng 3D trừu tượng làm nền phía sau
  const imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920";

  return (
    <section 
      className="relative py-32 px-4 overflow-hidden min-h-[600px] flex items-center" 
      style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative mx-auto max-w-7xl w-full flex justify-start">
        
        {/* KHỐI HỘP MỜ HIỆU ỨNG KÍNH (CỤM SEN HỒNG) NẰM BÊN TRÁI */}
        <div 
          className="w-full max-w-2xl p-10 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-start"
          style={{ borderRadius: '30px' }} // Bo góc khối mờ 30px theo thiết kế
        >
          {/* Chữ nhỏ trên cùng */}
          <p className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 text-white/90">
            {subtitle}
          </p>
          
          {/* Tiêu đề chính */}
          <h1 className="font-bold mb-4 leading-tight text-5xl" style={{ color: titleColor }}>
            {title}
          </h1>

          {/* Đoạn mô tả dài */}
          <p className="text-sm md:text-base mb-6 opacity-95 text-white max-w-xl leading-relaxed text-left whitespace-pre-wrap">
            {desc}
          </p>
          
          {/* Nút bấm bo tròn tuyệt đối màu xanh */}
          <a 
            href="#" 
            className="px-8 py-2.5 font-medium transition-all duration-200 hover:scale-105 shadow-md flex items-center justify-center text-sm text-white bg-blue-600"
            style={{ borderRadius: '9999px' }}
          >
            {buttonText}
          </a>
        </div>

      </div>
    </section>
  );
};

export default AdminHero;