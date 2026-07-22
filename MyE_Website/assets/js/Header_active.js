document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy các thành phần HTML cần điều khiển
    const unloggedState = document.getElementById('unlogged-state');
    const loggedState = document.getElementById('logged-state');
    const btnLogin = document.getElementById('btn-login-action');
    const btnLogout = document.getElementById('btn-logout-action');

    // 2. Kiểm tra bộ nhớ trình duyệt xem người dùng đã đăng nhập chưa
    // Nếu chưa có dữ liệu, mặc định sẽ là 'false' (chưa đăng nhập)
    let isLoggedIn = localStorage.getItem('mye_logged_in') === 'true';

    // 3. Hàm quyết định sẽ hiển thị nút nào trên Header
    function updateHeaderUI() {
        if(isLoggedIn) {
            // Đã đăng nhập: Hiện Avatar, Ẩn nút Cam
            if(unloggedState) unloggedState.style.display = 'none';
            if(loggedState) loggedState.style.display = 'block';
        } else {
            // Chưa đăng nhập: Hiện nút Cam, Ẩn Avatar
            if(unloggedState) unloggedState.style.display = 'block';
            if(loggedState) loggedState.style.display = 'none';
        }
    }

    // Chạy hàm cập nhật ngay khi vừa load xong trang
    updateHeaderUI();

    // 4. Bắt sự kiện khi bấm nút ĐĂNG NHẬP
    if(btnLogin) {
        btnLogin.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn trình duyệt chuyển trang
            isLoggedIn = true;
            localStorage.setItem('mye_logged_in', 'true'); // Lưu trạng thái vào trình duyệt
            updateHeaderUI(); // Cập nhật lại giao diện ngay lập tức
        });
    }

    // 5. Bắt sự kiện khi bấm nút ĐĂNG XUẤT
    if(btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn trình duyệt chuyển trang
            isLoggedIn = false;
            localStorage.setItem('mye_logged_in', 'false'); // Cập nhật lại trạng thái thành false
            updateHeaderUI(); // Cập nhật lại giao diện về trạng thái chưa đăng nhập
            
            // Tùy chọn: Xóa luôn trạng thái đồng bộ khi đăng xuất để test cho dễ
            // localStorage.removeItem('trangThaiDongBo'); 
        });
    }
});