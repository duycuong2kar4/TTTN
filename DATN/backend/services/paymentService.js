// File: services/paymentService.js

const { PayOS } = require('@payos/node');

// Khởi tạo PayOS truyền vào 1 Object chứa 3 mã
const payos = new PayOS({
    clientId: "4aef6226-5ad2-40a3-9dbb-7f51cb00bd9c",
    apiKey: "1b512188-0a5e-4f5d-b643-a8a064d6988e",
    checksumKey: "67bf233afa2298c70082c92384b7c4368d00041acf522090b44a28b7b26dfbdf"
});

const createPaymentLink = async (orderData) => {
    try {
        const requestData = {
            // Ép orderCode sang kiểu Số (Number) tại đây để PayOS chấp nhận
            orderCode: Number(orderData.orderCode), 
            amount: orderData.totalAmount,
            description: `Thanh toan may anh`,
            cancelUrl: `http://localhost:5173/cart?status=cancel`,
            returnUrl: `http://localhost:5173/cart?status=success`,
            // Map đúng trường 'items' được truyền từ index.js và bọc thêm String()
            items: (orderData.items || []).map(item => ({
                name: String(item.name || 'Sản phẩm').substring(0, 200),
                quantity: item.qty || item.quantity || 1,
                price: Number(item.price)
            }))
        };

        // Sử dụng đúng hàm paymentRequests.create() của phiên bản PayOS mới
        const paymentLink = await payos.paymentRequests.create(requestData);
        
        return paymentLink.checkoutUrl; 
    } catch (error) {
        console.error("Lỗi trong Payment Service:", error);
        throw error;
    }
};

module.exports = { createPaymentLink };