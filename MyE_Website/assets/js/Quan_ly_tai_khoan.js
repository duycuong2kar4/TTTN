document.addEventListener("DOMContentLoaded", function() {
    renderGiaoDien();
});

// Hàm chính để vẽ lại giao diện dựa trên LocalStorage
function renderGiaoDien() {
    // Giả lập lấy loại đăng nhập (Mặc định là facebook, bấm nút Test để đổi sang Google)
    let loginType = localStorage.getItem('loginType') || 'facebook'; 
    let isSynced = localStorage.getItem('trangThaiDongBo'); 

    // Lấy các DOM elements cần thiết
    const blockChuaDongBo = document.getElementById('block-chua-dong-bo');
    const blockFormDongBo = document.getElementById('block-form-dong-bo');
    const blockDaDongBo = document.getElementById('block-da-dong-bo');
    const bannerThanhCong = document.getElementById('banner-thanh-cong');
    
    // --- BƯỚC 1: SET GIAO DIỆN ICON & TÊN TÀI KHOẢN (FB HAY GOOGLE) ---
    let iconHTML = '';
    let accountID = '';
    let heroHTML = '';

    if (loginType === 'facebook') {
        iconHTML = `<i class="bi bi-facebook text-primary" style="font-size: 40px;"></i>`;
        accountID = 'fb.231244';
        heroHTML = `<i class="bi bi-person-fill me-2"></i>Tài khoản: ${accountID}`;
        blockDaDongBo.classList.remove('mye-card-active-blue'); // Xóa viền xanh nếu là FB
    } else { // Google
        iconHTML = `<div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm bg-white" style="width: 40px; height: 40px; border: 1px solid #EAEAEA;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="20" height="20">
                    </div>`;
        accountID = 'gg.01020';
        heroHTML = `<i class="bi bi-google me-2"></i>Tài khoản: ${accountID}`;
        blockDaDongBo.classList.add('mye-card-active-blue'); // Thêm viền xanh nếu là Google
    }

    // Đổ dữ liệu vào HTML
    document.getElementById('hero-account-id').innerHTML = heroHTML;
    document.getElementById('icon-login-type').innerHTML = iconHTML;
    document.getElementById('icon-login-type-form').innerHTML = iconHTML;
    document.getElementById('icon-login-type-success').innerHTML = iconHTML;
    
    document.getElementById('text-login-id').innerText = accountID;
    document.getElementById('text-login-id-form').innerText = accountID;
    document.getElementById('text-login-id-success').innerText = accountID;

    // --- BƯỚC 2: QUYẾT ĐỊNH HIỂN THỊ KHỐI NÀO ---
    // Reset toàn bộ về ẩn
    blockChuaDongBo.style.display = 'none';
    blockFormDongBo.style.display = 'none';
    blockDaDongBo.style.display = 'none';

    if (isSynced === 'true') {
        // Nếu ĐÃ ĐỒNG BỘ
        blockDaDongBo.style.display = 'block';
        
        // Nếu vừa mới bấm nút Đồng bộ xong (có cờ showBanner)
        if (sessionStorage.getItem('showBanner') === 'true') {
            bannerThanhCong.style.setProperty('display', 'flex', 'important');
            sessionStorage.removeItem('showBanner'); // Xóa cờ để lần sau F5 không hiện nữa
        } else {
            bannerThanhCong.style.setProperty('display', 'none', 'important');
        }
    } else {
        // Nếu CHƯA ĐỒNG BỘ
        blockChuaDongBo.style.display = 'block';
    }
}

// Hàm xử lý khi bấm vào mũi tên để mở form nhập mật khẩu
function moFormDongBo() {
    document.getElementById('block-chua-dong-bo').style.display = 'none';
    document.getElementById('block-form-dong-bo').style.display = 'block';
}

// Hàm xử lý khi bấm mũi tên đóng form quay lại
function dongFormDongBo() {
    document.getElementById('block-form-dong-bo').style.display = 'none';
    document.getElementById('block-chua-dong-bo').style.display = 'block';
}

// Hàm mô phỏng xác nhận submit form
function xacNhanDongBo() {
    localStorage.setItem('trangThaiDongBo', 'true');
    sessionStorage.setItem('showBanner', 'true'); // Cắm cờ để hàm render biết phải hiện Dải xanh thành công
    renderGiaoDien();
}

// --- CÁC HÀM DÙNG CHO CÔNG CỤ TEST (Xóa khi code thật) ---
function setLoginType(type) {
    localStorage.setItem('loginType', type);
    renderGiaoDien();
}

function resetData() {
    localStorage.removeItem('trangThaiDongBo');
    renderGiaoDien();
}cd