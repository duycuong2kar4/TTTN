const nodemailer = require('nodemailer');

// Cấu hình tài khoản gửi mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'duycuongghe@gmail.com', // Thay bằng email thật của Cường
        pass: 'irzu rlop nikw smlm' // Dán 16 ký tự ở Bước 2 vào đây (viết liền, không có dấu cách)
    }
});

// Hàm gửi mail hóa đơn
const sendInvoiceEmail = async (customerEmail, orderInfo) => {
    try {
        // Tạo danh sách sản phẩm bằng HTML
        const itemsHtml = orderInfo.items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${Number(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: '"CameraShop Admin" <EMAIL_CUA_CUONG@gmail.com>', // Nhớ thay email của bạn vào đây
            to: customerEmail,
            subject: `🎉 Xác nhận thanh toán thành công đơn hàng #${orderInfo.orderCode}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-w-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #2563eb; text-align: center;">CẢM ƠN BẠN ĐÃ MUA HÀNG!</h2>
                    <p>Chào <strong>${orderInfo.user ? orderInfo.user.name : 'Quý khách'}</strong>,</p>
                    <p>CameraShop xác nhận đơn hàng <strong>#${orderInfo.orderCode}</strong> của bạn đã được thanh toán thành công.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr style="background-color: #f8fafc; text-align: left;">
                            <th style="padding: 10px;">Sản phẩm</th>
                            <th style="padding: 10px; text-align: center;">SL</th>
                            <th style="padding: 10px; text-align: right;">Thành tiền</th>
                        </tr>
                        ${itemsHtml}
                    </table>
                    
                    <h3 style="text-align: right; color: #dc2626; margin-top: 20px;">Tổng thanh toán: ${Number(orderInfo.totalAmount).toLocaleString('vi-VN')} đ</h3>
                    
                    <hr style="border: none; border-top: 1px dashed #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #666; text-align: center;">Đây là email tự động, vui lòng không trả lời email này.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Đã gửi email hóa đơn thành công đến: ${customerEmail}`);
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
    }
};

module.exports = { sendInvoiceEmail };