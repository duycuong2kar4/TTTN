const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('⏳ Đang quét và lấp đầy dữ liệu ảnh phụ, màu sắc, thông số...');

  // 1. Lấy toàn bộ sản phẩm trong Database
  const products = await prisma.product.findMany();
  let updatedCount = 0;

  // 2. Duyệt qua từng sản phẩm
  for (const product of products) {
    // Nếu thấy sản phẩm nào bị null ở 1 trong 3 trường này thì cập nhật
    if (!product.gallery || !product.specs || !product.colors) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          colors: ["Đen", "Trắng"],
          gallery: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000",
            "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1000"
          ],
          specs: {
            "Thương hiệu": "Hàng Chính Hãng",
            "Bảo hành": "24 Tháng",
            "Tình trạng": "Mới 100%"
          }
        }
      });
      updatedCount++;
    }
  }

  console.log(`✅ Đã lấp đầy dữ liệu JSON thành công cho ${updatedCount} sản phẩm!`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());