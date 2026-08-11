const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Đang tiến hành nạp 35 sản phẩm mẫu vào Database...');

  const products = [
    // 1. MÁY ẢNH MIRRORLESS (categoryId = 1)
    { name: 'Canon EOS R7 Body', price: 35000000, quantity: 15, description: 'Cảm biến APS-C 32.5MP, lấy nét Dual Pixel CMOS AF II siêu nhanh, quay video 4K 60p không crop. Cỗ máy hoàn hảo cho chụp thể thao và nhiếp ảnh thiên nhiên hoang dã.', categoryId: 1, brandId: 2, isNew: true, isSale: false, isBest: true },
    { name: 'Sony Alpha A7C II Body', price: 50000000, salePrice: 48000000, quantity: 10, description: 'Thiết kế nhỏ gọn nhưng mang sức mạnh Full-frame 33MP. Tích hợp AI lấy nét tự động thông minh, quay 4K 60p 10-bit màu chuẩn điện ảnh.', categoryId: 1, brandId: 1, isNew: true, isSale: true, isBest: false },
    { name: 'Fujifilm X-T30 II Kit 15-45mm', price: 25000000, quantity: 12, description: 'Sự kết hợp hoàn hảo giữa thiết kế hoài cổ và hiệu năng hiện đại. Cảm biến 26.1MP, bộ màu giả lập phim (Film Simulation) độc quyền, gọn nhẹ lý tưởng cho du lịch.', categoryId: 1, brandId: 4, isNew: false, isSale: false, isBest: true },
    { name: 'Nikon Z6 II Body', price: 40000000, quantity: 8, description: 'Khả năng chụp thiếu sáng ấn tượng, quay video 4K xuất sắc. Hỗ trợ hai khe cắm thẻ nhớ, chống rung IBIS mạnh mẽ dành cho dân quay chụp chuyên nghiệp.', categoryId: 1, brandId: 3, isNew: true, isSale: false, isBest: false },
    { name: 'Panasonic Lumix S5 Body', price: 32000000, salePrice: 29900000, quantity: 6, description: 'Máy ảnh Full-frame giá tốt nhất phân khúc. Quay video V-Log 10-bit màu, dải nhạy sáng rộng 14+ stop, sự lựa chọn tối ưu cho dân làm phim độc lập.', categoryId: 1, brandId: 5, isNew: false, isSale: true, isBest: false },

    // 2. ỐNG KÍNH / LENS (categoryId = 2)
    { name: 'Sony FE 24-70mm f/2.8 GM II', price: 45000000, quantity: 10, description: 'Ống kính zoom tiêu chuẩn cao cấp nhất của Sony. Sắc nét từ tâm đến rìa, lấy nét siêu êm, thiết kế nhẹ hơn 20% so với thế hệ trước.', categoryId: 2, brandId: 1, isNew: true, isSale: false, isBest: true },
    { name: 'Canon RF 50mm f/1.8 STM', price: 4500000, quantity: 25, description: 'Ống kính quốc dân ngàm RF. Nhỏ gọn, khẩu độ lớn f/1.8 chụp chân dung xóa phông mượt mà, hiệu năng vượt trội trong tầm giá.', categoryId: 2, brandId: 2, isNew: false, isSale: false, isBest: true },
    { name: 'Sigma 18-50mm f/2.8 DC DN (for Sony E)', price: 12000000, salePrice: 11000000, quantity: 14, description: 'Ống kính đa dụng khẩu lớn dành cho cảm biến Crop. Nét căng ngay tại f/2.8, siêu nhẹ, sinh ra để dành cho các Vlogger và nhiếp ảnh du lịch.', categoryId: 2, brandId: 1, isNew: true, isSale: true, isBest: false },
    { name: 'Nikon Z 85mm f/1.8 S', price: 18000000, quantity: 9, description: 'Chuyên gia chân dung của hệ sinh thái Nikon Z. Hiệu ứng bokeh tuyệt đẹp, độ nét ấn tượng, lấy nét yên tĩnh hoàn toàn.', categoryId: 2, brandId: 3, isNew: false, isSale: false, isBest: false },
    { name: 'Fujinon XF 35mm f/1.4 R', price: 11000000, quantity: 11, description: 'Ống kính prime huyền thoại của Fujifilm. Cung cấp góc nhìn tự nhiên tương đương 50mm trên full-frame, chất ảnh cổ điển và nổi khối tuyệt vời.', categoryId: 2, brandId: 4, isNew: false, isSale: false, isBest: true },

    // 3. MÁY ẢNH DSLR (categoryId = 3)
    { name: 'Canon EOS 5D Mark IV Body', price: 45000000, quantity: 7, description: 'Cỗ máy cày bừa đáng tin cậy của dân thợ ảnh chuyên nghiệp. Cảm biến Full-frame 30.4MP, hệ thống lấy nét 61 điểm, thân máy hợp kim magie siêu bền bỉ.', categoryId: 3, brandId: 2, isNew: false, isSale: false, isBest: true },
    { name: 'Nikon D850 Body', price: 65000000, salePrice: 62000000, quantity: 5, description: 'Chiếc DSLR hoàn hảo nhất của Nikon. Độ phân giải siêu cao 45.7MP không có bộ lọc AA, chụp 7fps, lý tưởng cho ảnh phong cảnh và ảnh thương mại.', categoryId: 3, brandId: 3, isNew: false, isSale: true, isBest: true },
    { name: 'Canon EOS 6D Mark II Body', price: 30000000, quantity: 8, description: 'Lựa chọn Full-frame DSLR cực kỳ dễ tiếp cận. Màn hình xoay lật đa góc linh hoạt, lấy nét Dual Pixel mượt mà, tối ưu cho chụp sự kiện và chân dung cưới.', categoryId: 3, brandId: 2, isNew: false, isSale: false, isBest: false },
    { name: 'Nikon D500 Body', price: 18000000, quantity: 6, description: 'Vua crop DSLR mạnh mẽ. Kế thừa hệ thống lấy nét 153 điểm của dòng flagship D5, quay video 4K, sinh ra để chụp thể thao, chim thú và hành động nhanh.', categoryId: 3, brandId: 3, isNew: true, isSale: false, isBest: false },
    { name: 'Canon EOS 90D Kit 18-135mm', price: 25000000, quantity: 12, description: 'Combo hoàn chỉnh cho người chơi hệ DSLR. Chụp liên tiếp 10fps, cảm biến 32.5MP chi tiết cao, ống kính zoom đa dụng bao trọn mọi góc nhìn từ phong cảnh đến chân dung.', categoryId: 3, brandId: 2, isNew: true, isSale: false, isBest: true },

    // 4. MÁY ẢNH COMPACT (categoryId = 4)
    { name: 'Sony ZV-1 II', price: 22000000, salePrice: 20500000, quantity: 15, description: 'Máy ảnh vlog bỏ túi đỉnh cao. Ống kính góc rộng 18-50mm bao trọn khung hình, cảm biến 1 inch, tích hợp mic định hướng thông minh và chế độ Cinematic Vlog.', categoryId: 4, brandId: 1, isNew: true, isSale: true, isBest: true },
    { name: 'Ricoh GR IIIx', price: 28000000, quantity: 8, description: 'Biểu tượng của nhiếp ảnh đường phố (Street Photography). Ống kính 40mm lý tưởng, cảm biến APS-C sắc nét, cho ra màu sắc nghệ thuật độc đáo không cần hậu kỳ.', categoryId: 4, brandId: 4, isNew: false, isSale: false, isBest: true },
    { name: 'Canon PowerShot V10', price: 10000000, quantity: 20, description: 'Thiết kế dạng dọc độc lạ tối ưu cho thao tác quay vlog một tay. Tích hợp sẵn chân đế, mic thu âm lớn, kết nối app mượt mà để livestream mọi lúc mọi nơi.', categoryId: 4, brandId: 2, isNew: true, isSale: false, isBest: false },
    { name: 'Panasonic Lumix LX100 II', price: 15000000, quantity: 9, description: 'Nhỏ gọn nhưng mang cảm biến Micro Four Thirds lớn. Ống kính Leica DC f/1.7-2.8 siêu sáng, hỗ trợ quay video 4K chất lượng cao.', categoryId: 4, brandId: 5, isNew: false, isSale: false, isBest: false },
    { name: 'Sony Cyber-shot RX100 VA', price: 20000000, salePrice: 18500000, quantity: 10, description: 'Sát thủ tốc độ trong thân hình hạt tiêu. Chụp liên tiếp 24 khung hình/giây, hệ thống lấy nét lai theo pha, quay slow-motion siêu chậm lên đến 960fps.', categoryId: 4, brandId: 1, isNew: false, isSale: true, isBest: false },

    // 5. MÁY QUAY PHIM CHUYÊN DỤNG (categoryId = 5)
    { name: 'Sony FX30 Cinema Line', price: 45000000, quantity: 7, description: 'Máy quay điện ảnh ngàm E dễ tiếp cận nhất của Sony. Quay 4K 120p, tích hợp quạt tản nhiệt, hỗ trợ S-Cinetone mang lại màu sắc phim Hollywood ngay trên máy.', categoryId: 5, brandId: 1, isNew: true, isSale: false, isBest: true },
    { name: 'Blackmagic Pocket Cinema Camera 4K', price: 35000000, quantity: 6, description: 'Sức mạnh điện ảnh trong thân máy gọn nhẹ. Quay video RAW nội bộ, dải nhạy sáng 13 stop, màn hình cảm ứng 5 inch khổng lồ giúp theo dõi khung hình dễ dàng.', categoryId: 5, brandId: 5, isNew: false, isSale: false, isBest: true },
    { name: 'Canon EOS C70 Cinema', price: 120000000, quantity: 3, description: 'Máy quay ngàm RF thế hệ mới dành cho dân chuyên. Tích hợp kính lọc ND vật lý, quay 4K 120p 4:2:2 10-bit trực tiếp vào thẻ SD, thiết kế thông minh.', categoryId: 5, brandId: 2, isNew: true, isSale: false, isBest: false },
    { name: 'Red Komodo 6K', price: 150000000, quantity: 2, description: 'Tiêu chuẩn phim điện ảnh thu nhỏ. Cảm biến Super35 Global Shutter loại bỏ hoàn toàn hiện tượng nghiêng hình, màu sắc Redcode RAW đỉnh cao thế giới.', categoryId: 5, brandId: 4, isNew: false, isSale: false, isBest: false },
    { name: 'Panasonic Lumix BS1H', price: 80000000, salePrice: 75000000, quantity: 4, description: 'Máy quay dạng Box (hộp) linh hoạt cho mọi setup. Quay 6K 24p, dễ dàng gắn lên drone bay, gimbal tự động hoặc setup hệ thống đa góc quay chuyên nghiệp.', categoryId: 5, brandId: 5, isNew: false, isSale: true, isBest: false },

    // 6. FLYCAM & THIẾT BỊ CHỐNG RUNG (categoryId = 6)
    { name: 'DJI Mavic 3 Pro (DJI RC)', price: 40000000, quantity: 10, description: 'Flycam trang bị hệ thống 3 camera vô song. Cảm biến tránh va chạm đa hướng, quay phim 5.1K đẳng cấp điện ảnh từ trên cao.', categoryId: 6, brandId: 6, isNew: true, isSale: false, isBest: true },
    { name: 'DJI RS 3 Mini', price: 6500000, quantity: 18, description: 'Gimbal chống rung siêu nhẹ (chỉ 795g) dành cho máy ảnh mirrorless nhỏ. Hỗ trợ ngàm quay dọc tự nhiên cho TikTok/Reels, tải trọng lên đến 2kg mạnh mẽ.', categoryId: 6, brandId: 6, isNew: false, isSale: false, isBest: true },
    { name: 'Zhiyun Weebill 3S', price: 8000000, salePrice: 7200000, quantity: 12, description: 'Gimbal cầm tay thiết kế công thái học Sling 2.5 với điểm tựa tay thoải mái. Pin cực trâu dùng cả ngày, thuật toán chống rung thế hệ thứ 10 siêu mượt.', categoryId: 6, brandId: 6, isNew: false, isSale: true, isBest: false },
    { name: 'Insta360 Ace Pro', price: 10000000, quantity: 14, description: 'Action camera đỉnh cao hợp tác cùng thương hiệu Leica. Màn hình lật 2.4 inch tiện lợi, tích hợp chip AI khử nhiễu video giúp quay đêm siêu sạch và rõ nét.', categoryId: 6, brandId: 6, isNew: true, isSale: false, isBest: false },
    { name: 'DJI Avata 2 Explorer Combo', price: 25000000, quantity: 8, description: 'Trải nghiệm bay FPV sống động và cực kỳ an toàn. Quay video 4K/60fps HDR góc siêu rộng, nhào lộn dễ dàng với tay cầm Motion 3.', categoryId: 6, brandId: 6, isNew: true, isSale: false, isBest: true },

    // 7. BALO & TÚI ĐỰNG MÁY ẢNH (categoryId = 7)
    { name: 'Balo Peak Design Everyday Backpack 20L', price: 7500000, quantity: 20, description: 'Balo máy ảnh cao cấp nhất nhì thế giới. Chốt khóa nam châm MagLatch độc quyền, thiết kế thông minh, chất liệu chống nước tuyệt đối, bảo hành trọn đời.', categoryId: 7, brandId: 7, isNew: true, isSale: false, isBest: true },
    { name: 'Túi xách PGYTECH Everyday Sling 6L', price: 2500000, salePrice: 2200000, quantity: 30, description: 'Túi đeo chéo thời trang, form cứng cáp, lấy máy ảnh cực nhanh. Vách ngăn gập linh hoạt Origami, phù hợp mang 1 thân máy và 2 ống kính dạo phố.', categoryId: 7, brandId: 7, isNew: false, isSale: true, isBest: false },
    { name: 'Balo Lowepro Tahoe BP 150', price: 1500000, quantity: 25, description: 'Lựa chọn balo quốc dân bền bỉ. Thiết kế gọn nhẹ, sức chứa tốt (1 body, 2-3 lens, đèn flash), đệm mút chống sốc dày dặn bảo vệ thiết bị tối ưu.', categoryId: 7, brandId: 7, isNew: false, isSale: false, isBest: true },
    { name: 'Túi máy ảnh Vanguard Vesta Start 14', price: 800000, quantity: 40, description: 'Túi đeo chéo nhỏ gọn, giá bình dân. Rất thích hợp cho người dùng máy ảnh mirrorless cơ bản với 1 ống kính kit đi kèm, chống sốc tốt, nhẹ nhàng.', categoryId: 7, brandId: 7, isNew: false, isSale: false, isBest: false },
    { name: 'Balo K&F Concept Alpha 25L', price: 2200000, quantity: 15, description: 'Balo đa năng dung tích lớn. Mở cả mặt trước và mặt hông, tích hợp ngăn đựng quần áo riêng biệt, có dây đai móc treo chân máy, lý tưởng cho dân đi phượt.', categoryId: 7, brandId: 7, isNew: true, isSale: false, isBest: false },
  ];

  try {
    const result = await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log(`✅ Thành công! Đã thêm ${result.count} sản phẩm vào cơ sở dữ liệu.`);
  } catch (error) {
    console.error('❌ Lỗi khi thêm dữ liệu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();