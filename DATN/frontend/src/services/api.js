import axios from 'axios';

// Đặt sẵn base URL ở đây để sau này lúc public website chỉ cần đổi 1 dòng này
const BASE_URL = 'https://camerashop-backend-xlx8.onrender.com/api';

// 1. API Gửi yêu cầu Thanh Toán (Checkout)
export const checkoutAPI = async (cartItems, totalAmount) => {
    try {
        const response = await axios.post(`${BASE_URL}/checkout`, {
            cartItems: cartItems,
            totalAmount: totalAmount
        });
        return response.data; // Trả về data (chứa checkoutUrl) cho Frontend
    } catch (error) {
        console.error("Lỗi gọi API Thanh toán:", error);
        throw error; // Đẩy lỗi ngược lại cho giao diện xử lý
    }
};

// 2. API Lấy danh sách Sản Phẩm (Mẫu để bạn thấy cách tách logic)
export const getProductsAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Lỗi gọi API Sản phẩm:", error);
        throw error;
    }
};

// Bạn có thể tự viết thêm các hàm addProductAPI, deleteProductAPI... vào đây sau này