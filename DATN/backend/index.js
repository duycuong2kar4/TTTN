const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createPaymentLink } = require('./services/paymentService');
const { sendInvoiceEmail } = require('./services/emailService');
const app = express();
const prisma = new PrismaClient();
const crypto = require('crypto');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir) 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.use(cors()); 
app.use(express.json()); 

// ==========================================
// MIDDLEWARE: KIỂM TRA ĐĂNG NHẬP & PHÂN QUYỀN
// ==========================================
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: "Vui lòng đăng nhập!" });

    jwt.verify(token, 'DATN_CAMERA_SHOP_SECRET_KEY', (err, user) => {
        if (err) return res.status(403).json({ message: "Token đã hết hạn hoặc không hợp lệ!" });
        req.user = user; 
        next();
    });
};

// ==========================================
// API PUBLIC & THÊM XÓA SỬA SẢN PHẨM
// ==========================================
app.get('/api/status', (req, res) => {
    res.json({ message: "Server Backend và Database đã sẵn sàng hoạt động!", status: "OK" });
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Lỗi lấy danh mục" });
    }
});
// Thêm Danh Mục Mới
app.post('/api/categories', authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: "Tên danh mục không được để trống!" });
        const newCategory = await prisma.category.create({ data: { name, description } });
        res.status(201).json({ message: "Thêm danh mục thành công!", category: newCategory });
    } catch (error) { res.status(500).json({ error: "Lỗi thêm danh mục" }); }
});

// Sửa Danh Mục
app.put('/api/categories/:id', authenticateToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id: Number(req.params.id) }, data: { name, description }
        });
        res.status(200).json({ message: "Cập nhật danh mục thành công!", category: updatedCategory });
    } catch (error) { res.status(500).json({ error: "Lỗi cập nhật danh mục" }); }
});

// Xóa Danh Mục
app.delete('/api/categories/:id', authenticateToken, async (req, res) => {
    try {
        await prisma.category.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json({ message: "Đã xóa danh mục thành công!" });
    } catch (error) { 
        res.status(500).json({ error: "Không thể xóa danh mục đang chứa sản phẩm!" }); 
    }
});
app.get('/api/brands', async (req, res) => {
    try {
        const brands = await prisma.brand.findMany();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: "Lỗi lấy thương hiệu" });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 5;

        if (page) {
            const skip = (page - 1) * limit;
            const total = await prisma.product.count({ where: { isDeleted: false } }); // Thêm bộ lọc
            const products = await prisma.product.findMany({
                where: { isDeleted: false }, // Thêm bộ lọc
                skip: skip,
                take: limit,
                include: { category: true, brand: true },
                orderBy: { id: 'desc' }
            });
            return res.status(200).json({
                data: products,
                totalItems: total,
                totalPages: Math.ceil(total / limit),
                currentPage: page
            });
        } else {
            const products = await prisma.product.findMany({
                where: { isDeleted: false }, // Thêm bộ lọc
                include: { category: true, brand: true },
                orderBy: { id: 'desc' }
            });
            return res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: "Lỗi server khi lấy dữ liệu" });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { category: true, brand: true }
        });
        
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server nội bộ", error: error.message });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, price, categoryId, brandId, quantity, colors, gallery, specs, isNew, isSale, isBest } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = await prisma.product.create({
            data: {
                name, price: Number(price) || 0, quantity: Number(quantity) || 0,
                categoryId: Number(categoryId), brandId: Number(brandId), image: imagePath,
                colors: colors ? JSON.parse(colors) : null, 
                gallery: gallery ? JSON.parse(gallery) : null, 
                specs: specs ? JSON.parse(specs) : null,
                isNew: isNew === 'true', isSale: isSale === 'true', isBest: isBest === 'true' // THÊM 3 CỜ NÀY
            }
        });
        res.status(201).json({ message: "Thêm máy ảnh thành công!", product: newProduct });
    } catch (error) { res.status(500).json({ error: "Lỗi Server: " + error.message }); }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, categoryId, brandId, quantity, colors, gallery, specs, isNew, isSale, isBest } = req.body;

        let updateData = {
            name, price: Number(price) || 0, quantity: Number(quantity) || 0,
            categoryId: Number(categoryId), brandId: Number(brandId),
            isNew: isNew === 'true', isSale: isSale === 'true', isBest: isBest === 'true' // THÊM 3 CỜ NÀY
        };

        if (colors) updateData.colors = JSON.parse(colors);
        if (gallery) updateData.gallery = JSON.parse(gallery);
        if (specs) updateData.specs = JSON.parse(specs);
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;

        const updatedProduct = await prisma.product.update({
            where: { id: Number(req.params.id) }, data: updateData
        });
        res.status(200).json({ message: "Cập nhật sản phẩm thành công!", product: updatedProduct });
    } catch (error) { res.status(500).json({ error: "Lỗi server khi cập nhật dữ liệu" }); }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        // Chuyển từ lệnh .delete() sang .update()
        await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: { isDeleted: true }
        });
        res.status(200).json({ message: "Đã xóa sản phẩm thành công!" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server khi xóa dữ liệu" });
    }
});

// ==========================================
// API THANH TOÁN (CHECKOUT) & ĐƠN HÀNG
// ==========================================
// ==========================================
// ==========================================
// API THANH TOÁN (CHECKOUT) & ĐƠN HÀNG
// ==========================================
app.post('/api/checkout', async (req, res) => {
    try {
        const { cartItems, totalAmount, userId, shippingInfo, paymentMethod } = req.body; 
        if (!cartItems || cartItems.length === 0) return res.status(400).json({ error: "Giỏ hàng đang trống!" });

        // TẠO MÃ ĐƠN DẠNG CHUỖI (STRING) ĐỂ LƯU VÀO DATABASE KHÔNG BỊ LỖI
        const orderCodeStr = String(Date.now()).slice(-9);
        const safeTotalAmount = Math.max(0, Math.round(Number(totalAmount)));

        const paymentLabel = 
            paymentMethod === 'COD' ? 'Thanh toán tiền mặt (COD)' : 
            paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản thủ công' : 
            paymentMethod === 'PAYOS' ? 'Cổng thanh toán PayOS' :
            paymentMethod === 'ATM' ? 'Thẻ nội địa / PayOS' :
            paymentMethod === 'VISA' ? 'Thẻ quốc tế / PayOS' :
            paymentMethod === 'EWALLET' ? 'Ví điện tử / PayOS' : 'Không xác định';

        const detailedAddress = shippingInfo?.address 
            ? `${shippingInfo.address} (Phương thức: ${paymentLabel})` 
            : `(Phương thức: ${paymentLabel})`;

        const orderData = {
            orderCode: orderCodeStr, // LƯU VÀO DB DẠNG STRING
            totalAmount: safeTotalAmount, status: 'PENDING',
            shippingName: shippingInfo?.fullName || null, 
            shippingPhone: shippingInfo?.phone || null, 
            shippingAddress: detailedAddress,
            items: {
                create: cartItems.map(item => {
                    const dbQty = parseInt(item.qty || item.quantity, 10);
                    return { productId: Number(item.id), quantity: (isNaN(dbQty) || dbQty < 1) ? 1 : dbQty, price: Math.max(0, Math.round(Number(item.price))) };
                })
            }
        };

        if (userId) orderData.user = { connect: { id: Number(userId) } };
        
        // Tiến hành lưu Đơn hàng vào CSDL
        await prisma.order.create({ data: orderData });

        // Trừ số lượng kho
        for (const item of cartItems) {
            const buyQty = parseInt(item.qty || item.quantity, 10);
            const validQty = (isNaN(buyQty) || buyQty < 1) ? 1 : buyQty;
            
            await prisma.product.update({
                where: { id: Number(item.id) },
                data: { quantity: { decrement: validQty } }
            });
        }

        // Nếu là COD hoặc Chuyển khoản thủ công thì dừng lại, trả về thành công luôn
        if (paymentMethod === 'COD' || paymentMethod === 'BANK_TRANSFER') {
            return res.status(200).json({ success: true, orderCode: orderCodeStr, type: 'offline' });
        }

        // Nếu chọn PayOS/ATM/Visa/EWallet thì tạo link thanh toán
        const payosItems = cartItems.map(item => {
            const validQty = Math.max(1, Number(item.qty || item.quantity || 1));
            const validPrice = Math.max(0, Number(item.price || 0));
            return { ...item, name: String(item.name || 'Sản phẩm').substring(0, 200), quantity: validQty, qty: validQty, price: validPrice };
        });

        // Gửi orderCodeStr sang paymentService
        const checkoutUrl = await createPaymentLink({ orderCode: orderCodeStr, items: payosItems, totalAmount: safeTotalAmount });
        res.status(200).json({ checkoutUrl: checkoutUrl, type: 'online' });
    } catch (error) {
        console.error("Lỗi Checkout:", error);
        res.status(500).json({ error: "Không thể tạo mã thanh toán lúc này.", detail: error.message });
    }
});

app.post('/api/webhook', async (req, res) => {
    try {
        const webhookData = req.body;
        if (webhookData.code === "00" || webhookData.success) {
            await prisma.order.update({
                // Tìm kiếm cập nhật đơn hàng bằng dạng STRING
                where: { orderCode: String(webhookData.data.orderCode) }, 
                data: { status: 'PAID' }
            });
        }
        res.status(200).json({ success: true, message: "Webhook received" });
    } catch (error) {
        res.status(200).json({ success: false, message: "Webhook error but acknowledged" }); 
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: { include: { product: true } }, user: true },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ error: "Lỗi server khi lấy đơn hàng" }); }
});

app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const orderId = Number(req.params.id);
        const { status } = req.body; 

        // Lấy thông tin đơn hàng CŨ để kiểm tra xem nó đã bị Hủy trước đó chưa
        const oldOrder = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });

        const updatedOrder = await prisma.order.update({
            where: { id: orderId }, data: { status: status },
            include: { user: true, items: { include: { product: true } } }
        });

        // ========================================================
        // MỚI THÊM: HOÀN TRẢ SỐ LƯỢNG KHI BẤM "HỦY" ĐƠN HÀNG
        // ========================================================
        if (status === 'CANCELLED' && oldOrder.status !== 'CANCELLED') {
            for (const item of updatedOrder.items) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { quantity: { increment: item.quantity } }
                });
            }
        }

        if (status === 'PAID' && updatedOrder.user && updatedOrder.user.email) {
            sendInvoiceEmail(updatedOrder.user.email, updatedOrder); 
        }
        res.status(200).json({ message: "Cập nhật trạng thái thành công", order: updatedOrder });
    } catch (error) { res.status(500).json({ error: "Lỗi server khi cập nhật" }); }
});

// ==========================================
// API ĐĂNG NHẬP ADMIN (CẬP NHẬT PHÂN QUYỀN)
// ==========================================
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body; 
        
        const adminUser = await prisma.user.findFirst({
            where: { 
                email: username,
                role: { in: ['ADMIN', 'SUPERADMIN', 'EDITOR'] } 
            }
        });

        if (!adminUser) return res.status(401).json({ error: 'Tài khoản không tồn tại hoặc không có quyền Quản trị!' });

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) return res.status(401).json({ error: 'Sai mật khẩu!' });

        const token = jwt.sign(
            { id: adminUser.id, email: adminUser.email, role: adminUser.role },
            'DATN_CAMERA_SHOP_SECRET_KEY', 
            { expiresIn: '1d' } 
        );

        res.status(200).json({ success: true, token: token, user: adminUser });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// ==========================================
// API QUẢN LÝ NGƯỜI DÙNG & TÀI KHOẢN KHÁCH HÀNG
// ==========================================
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy danh sách người dùng" }); }
});

app.put('/api/admin/users/:id/role', async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) }, data: { role: req.body.role } 
        });
        res.status(200).json({ message: "Đã cập nhật phân quyền!", user: updatedUser });
    } catch (error) { res.status(500).json({ error: "Lỗi cập nhật quyền" }); }
});

app.post('/api/users/register', async (req, res) => {
    try {
      const { email, password, fullName, phone } = req.body;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Email này đã được sử dụng!" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await prisma.user.create({
        data: { name: fullName, email: email, password: hashedPassword, phone: phone }
      });
      res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) { res.status(500).json({ message: "Lỗi server", error: error.message }); }
});
  
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu!" });
    
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, 
            'DATN_CAMERA_SHOP_SECRET_KEY', { expiresIn: '1d' } 
        );
    
        res.status(200).json({ 
            message: "Đăng nhập thành công!", token, 
            user: { id: user.id, email: user.email, fullName: user.name, role: user.role, avatar: user.avatar } 
        });
    } catch (error) { res.status(500).json({ message: "Lỗi server", error: error.message }); }
});

app.get('/api/revenue', async (req, res) => {
    try {
        const paidOrders = await prisma.order.findMany({
            where: { status: 'PAID' }, select: { totalAmount: true, createdAt: true }, orderBy: { createdAt: 'asc' } 
        });

        const revenueByDate = {};
        paidOrders.forEach(order => {
            const dateStr = new Date(order.createdAt).toLocaleDateString('vi-VN');
            if (!revenueByDate[dateStr]) revenueByDate[dateStr] = 0; 
            revenueByDate[dateStr] += Number(order.totalAmount);
        });

        const chartData = Object.keys(revenueByDate).map(date => ({ date: date, revenue: revenueByDate[date] }));
        res.status(200).json(chartData);
    } catch (error) { res.status(500).json({ error: "Lỗi hệ thống khi lấy dữ liệu thống kê" }); }
});

app.get('/api/users/profile', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, phone: true, avatar: true, gender: true, dob: true, address: true } 
        });
        res.status(200).json(user);
    } catch (error) { res.status(500).json({ message: "Lỗi lấy thông tin", error: error.message }); }
});

app.put('/api/users/profile', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
        const { name, phone, gender, dob, address } = req.body;
        let updateData = { name, phone, gender, address };
        if (dob) updateData.dob = new Date(dob);
        if (req.file) updateData.avatar = `/uploads/${req.file.filename}`;

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id }, data: updateData,
            select: { id: true, name: true, email: true, avatar: true } 
        });
        res.status(200).json({ message: "Cập nhật hồ sơ thành công!", user: updatedUser });
    } catch (error) { res.status(500).json({ message: "Lỗi cập nhật", error: error.message }); }
});

app.get('/api/orders/my-orders', authenticateToken, async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id }, include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ message: "Lỗi lấy lịch sử đơn hàng" }); }
});

app.put('/api/users/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) return res.status(400).json({ message: "Mật khẩu hiện tại không đúng!" });

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({ where: { id: req.user.id }, data: { password: hashedNewPassword } });
        res.status(200).json({ message: "Đổi mật khẩu thành công!" });
    } catch (error) { res.status(500).json({ message: "Lỗi hệ thống" }); }
});

app.get('/api/addresses', authenticateToken, async (req, res) => {
    try {
        const addresses = await prisma.address.findMany({ where: { userId: req.user.id }, orderBy: { isDefault: 'desc' } });
        res.status(200).json(addresses);
    } catch (error) { res.status(500).json({ message: "Lỗi hệ thống" }); }
});

app.post('/api/addresses', authenticateToken, async (req, res) => {
    try {
        const { fullName, phone, fullAddress, isDefault } = req.body;
        if (isDefault) await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } });
        const newAddress = await prisma.address.create({ data: { userId: req.user.id, fullName, phone, fullAddress, isDefault: isDefault || false } });
        res.status(201).json({ message: "Thêm địa chỉ thành công", address: newAddress });
    } catch (error) { res.status(500).json({ message: "Lỗi thêm địa chỉ" }); }
});

app.delete('/api/addresses/:id', authenticateToken, async (req, res) => {
    try {
        await prisma.address.delete({ where: { id: parseInt(req.params.id), userId: req.user.id } });
        res.status(200).json({ message: "Đã xóa địa chỉ" });
    } catch (error) { res.status(500).json({ message: "Lỗi xóa địa chỉ" }); }
});

app.get('/api/wishlist', authenticateToken, async (req, res) => {
    try {
        const wishlist = await prisma.wishlist.findMany({ where: { userId: req.user.id }, include: { product: true }, orderBy: { createdAt: 'desc' } });
        res.status(200).json(wishlist);
    } catch (error) { res.status(500).json({ message: "Lỗi hệ thống" }); }
});

app.post('/api/wishlist/toggle', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const existingItem = await prisma.wishlist.findUnique({ where: { userId_productId: { userId: req.user.id, productId: parseInt(productId) } } });
        if (existingItem) {
            await prisma.wishlist.delete({ where: { id: existingItem.id } });
            return res.status(200).json({ message: "Đã bỏ yêu thích", isLiked: false });
        } else {
            await prisma.wishlist.create({ data: { userId: req.user.id, productId: parseInt(productId) } });
            return res.status(201).json({ message: "Đã thêm vào danh sách yêu thích", isLiked: true });
        }
    } catch (error) { res.status(500).json({ message: "Lỗi hệ thống" }); }
});

// ==========================================
// API QUẢN LÝ BANNER & TIN TỨC
// ==========================================
app.get('/api/banners', async (req, res) => {
    try {
        const banners = await prisma.banner.findMany({ orderBy: { id: 'desc' } });
        res.status(200).json(banners);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy danh sách banner" }); }
});

app.get('/api/banners/active', async (req, res) => {
    try {
        const banners = await prisma.banner.findMany({ where: { isActive: true }, orderBy: { id: 'desc' } });
        res.status(200).json(banners);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy banner trang chủ" }); }
});

app.post('/api/banners', upload.single('image'), async (req, res) => {
    try {
        const { title, link } = req.body;
        if (!req.file) return res.status(400).json({ error: "Vui lòng chọn ảnh banner" });
        const newBanner = await prisma.banner.create({ data: { title, link, imageUrl: `/uploads/${req.file.filename}` } });
        res.status(201).json({ message: "Thêm banner thành công!", banner: newBanner });
    } catch (error) { res.status(500).json({ error: "Lỗi khi thêm banner" }); }
});

app.delete('/api/banners/:id', async (req, res) => {
    try {
        await prisma.banner.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json({ message: "Đã xóa banner" });
    } catch (error) { res.status(500).json({ error: "Lỗi xóa banner" }); }
});

app.put('/api/banners/:id/toggle', async (req, res) => {
    try {
        const banner = await prisma.banner.findUnique({ where: { id: Number(req.params.id) } });
        const updatedBanner = await prisma.banner.update({ where: { id: Number(req.params.id) }, data: { isActive: !banner.isActive } });
        res.status(200).json({ message: "Đã cập nhật trạng thái", banner: updatedBanner });
    } catch (error) { res.status(500).json({ error: "Lỗi cập nhật banner" }); }
});
app.put('/api/banners/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, link } = req.body;
        let updateData = { title, link };
        
        // Nếu người dùng có chọn ảnh mới thì cập nhật, không thì giữ nguyên ảnh cũ
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedBanner = await prisma.banner.update({ 
            where: { id: Number(req.params.id) }, 
            data: updateData 
        });
        res.status(200).json({ message: "Cập nhật thành công!", banner: updatedBanner });
    } catch (error) { 
        res.status(500).json({ error: "Lỗi cập nhật banner" }); 
    }
});
app.get('/api/news', async (req, res) => {
    try {
        const news = await prisma.news.findMany({ include: { author: { select: { name: true } } }, orderBy: { createdAt: 'desc' } });
        res.status(200).json(news);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy danh sách tin tức" }); }
});

app.get('/api/news/:id', async (req, res) => {
    try {
        const article = await prisma.news.findUnique({ where: { id: Number(req.params.id) }, include: { author: { select: { name: true } } } });
        if (article) await prisma.news.update({ where: { id: article.id }, data: { views: article.views + 1 } });
        res.status(200).json(article);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy chi tiết tin tức" }); }
});

app.post('/api/news', authenticateToken, upload.single('thumbnail'), async (req, res) => {
    try {
        const newNews = await prisma.news.create({
            data: { title: req.body.title, content: req.body.content, thumbnail: req.file ? `/uploads/${req.file.filename}` : null, authorId: req.user.id }
        });
        res.status(201).json({ message: "Đăng bài thành công!", news: newNews });
    } catch (error) { res.status(500).json({ error: "Lỗi đăng bài viết" }); }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        await prisma.news.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json({ message: "Đã xóa bài viết" });
    } catch (error) { res.status(500).json({ error: "Lỗi xóa bài viết" }); }
});

app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: Number(req.params.userId) }, include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } 
        });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy lịch sử đơn hàng" }); }
});

app.get('/api/products/:id/reviews', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { productId: parseInt(req.params.id) }, include: { user: { select: { name: true, avatar: true } } }, orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(reviews);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy danh sách đánh giá" }); }
});

app.post('/api/products/:id/reviews', authenticateToken, async (req, res) => {
    try {
        const newReview = await prisma.review.create({
            data: { rating: Number(req.body.rating), comment: req.body.comment, productId: parseInt(req.params.id), userId: req.user.id }
        });
        res.status(201).json({ message: "Cảm ơn bạn đã đánh giá!", review: newReview });
    } catch (error) { res.status(500).json({ error: "Lỗi khi gửi đánh giá" }); }
});

app.get('/api/admin/reviews', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            include: { user: { select: { name: true, email: true } }, product: { select: { name: true, image: true } } }, orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(reviews);
    } catch (error) { res.status(500).json({ error: "Lỗi lấy danh sách đánh giá" }); }
});

app.delete('/api/admin/reviews/:id', async (req, res) => {
    try {
        await prisma.review.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json({ message: "Đã xóa đánh giá" });
    } catch (error) { res.status(500).json({ error: "Lỗi xóa đánh giá" }); }
});
// ==========================================
// API BÁO CÁO THỐNG KÊ (DASHBOARD NÂNG CAO)
// ==========================================
// ==========================================
// API BÁO CÁO THỐNG KÊ (DASHBOARD PRO V2)
// ==========================================
app.get('/api/admin/dashboard', authenticateToken, async (req, res) => {
    try {
        const { range, startDate, endDate } = req.query;
        let start = new Date(0);
        let end = new Date();
        const now = new Date();

        // 1. XỬ LÝ LỌC THỜI GIAN
        if (range === 'today') {
            start = new Date(now.setHours(0, 0, 0, 0));
        } else if (range === '7days') {
            start = new Date(now.setDate(now.getDate() - 7));
        } else if (range === 'thisMonth') {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (range === 'thisQuarter') {
            const quarter = Math.floor(now.getMonth() / 3);
            start = new Date(now.getFullYear(), quarter * 3, 1);
        } else if (range === 'thisYear') {
            start = new Date(now.getFullYear(), 0, 1);
        } else if (range === 'custom' && startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
        }

        // 2. LẤY DỮ LIỆU TỪ DATABASE
        const allOrders = await prisma.order.findMany({
            where: { createdAt: { gte: start, lte: end } },
            include: { items: { include: { product: { include: { category: true } } } } }
        });

        const totalCustomers = await prisma.user.count({ where: { role: 'USER' } });

        // 3. KHỞI TẠO BIẾN THỐNG KÊ
        let totalRevenue = 0;
        let completedOrders = 0;
        let cancelledOrders = 0;
        let totalProductsSold = 0;

        const revenueByDate = {};
        const paymentStats = {};
        const statusStats = { PENDING: 0, SHIPPING: 0, PAID: 0, CANCELLED: 0 };
        const productSales = {};
        const categoryStats = {};

        // 4. XỬ LÝ LOGIC GOM NHÓM
        allOrders.forEach(order => {
            // Thống kê trạng thái đơn hàng
            statusStats[order.status] = (statusStats[order.status] || 0) + 1;
            
            if (order.status === 'CANCELLED') cancelledOrders++;
            if (order.status === 'PAID') {
                completedOrders++;
                totalRevenue += Number(order.totalAmount);

                // Gom nhóm doanh thu theo ngày (Cho Line Chart)
                const dateStr = new Date(order.createdAt).toLocaleDateString('vi-VN');
                revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + Number(order.totalAmount);

                // Nhận diện phương thức thanh toán từ chuỗi Address lưu tạm
                let payMethod = "Khác";
                if (order.shippingAddress?.includes("Thanh toán tiền mặt")) payMethod = "COD";
                else if (order.shippingAddress?.includes("Chuyển khoản thủ công")) payMethod = "Chuyển khoản";
                else if (order.shippingAddress?.includes("PayOS")) payMethod = "Cổng Thanh Toán";
                
                paymentStats[payMethod] = (paymentStats[payMethod] || 0) + 1;

                // Gom nhóm Top sản phẩm & Danh mục
                order.items.forEach(item => {
                    totalProductsSold += item.quantity;
                    
                    // Sản phẩm
                    if (!productSales[item.productId]) {
                        productSales[item.productId] = {
                            id: item.productId,
                            name: item.product.name,
                            image: item.product.image,
                            stock: item.product.quantity,
                            totalSold: 0,
                            revenue: 0
                        };
                    }
                    productSales[item.productId].totalSold += item.quantity;
                    productSales[item.productId].revenue += (item.quantity * Number(item.price));

                    // Danh mục
                    const catName = item.product.category?.name || "Khác";
                    if (!categoryStats[catName]) categoryStats[catName] = { name: catName, value: 0 };
                    categoryStats[catName].value += item.quantity;
                });
            }
        });

        // 5. FORMAT DỮ LIỆU ĐỂ TRẢ VỀ FRONTEND
        const chartData = Object.keys(revenueByDate).map(date => ({ date, revenue: revenueByDate[date] }));
        const paymentChart = Object.keys(paymentStats).map(name => ({ name, value: paymentStats[name] }));
        const categoryChart = Object.values(categoryStats);
        
        // Sắp xếp lấy Top 20 sản phẩm
        const topProducts = Object.values(productSales).sort((a, b) => b.totalSold - a.totalSold).slice(0, 20);

        res.status(200).json({
            overview: {
                totalRevenue,
                totalOrders: allOrders.length,
                completedOrders,
                cancelledOrders,
                totalCustomers,
                totalProductsSold
            },
            chartData, // Biểu đồ đường (Doanh thu)
            paymentChart, // Biểu đồ tròn (Thanh toán)
            categoryChart, // Biểu đồ tròn (Danh mục)
            statusStats, // Thống kê 4 trạng thái đơn
            topProducts // Bảng Top sản phẩm (có doanh thu, tồn kho)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi tổng hợp dữ liệu Dashboard Pro" });
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend Server đang chạy tại: http://localhost:${PORT}`);
});