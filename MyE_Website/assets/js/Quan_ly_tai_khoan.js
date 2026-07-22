document.addEventListener("DOMContentLoaded", function() {
    renderGiaoDien();
});

// Hàm chính để vẽ lại giao diện dựa trên LocalStorage
function renderGiaoDien() {
    // Lấy loại đăng nhập (facebook, google, hoặc mye)
    let loginType = localStorage.getItem('loginType') || 'facebook'; 
    let isSynced = localStorage.getItem('trangThaiDongBo'); 

    // Lấy các DOM elements cần thiết
    const blockChuaDongBo = document.getElementById('block-chua-dong-bo');
    const blockFormDongBo = document.getElementById('block-form-dong-bo');
    const blockDaDongBo = document.getElementById('block-da-dong-bo');
    
    // Hai DOM mới cho trường hợp MYE
    const blockMyeThuGon = document.getElementById('block-mye-thu-gon');
    const blockMyeMoRong = document.getElementById('block-mye-mo-rong');
    
    const bannerThanhCong = document.getElementById('banner-thanh-cong');
    
    // --- BƯỚC 1: XÓA HIỂN THỊ TẤT CẢ CÁC KHỐI TRƯỚC KHI TÍNH TOÁN ---
    blockChuaDongBo.style.display = 'none';
    blockFormDongBo.style.display = 'none';
    blockDaDongBo.style.display = 'none';
    blockMyeThuGon.style.display = 'none';
    blockMyeMoRong.style.display = 'none';

    // --- BƯỚC 2: QUYẾT ĐỊNH HIỂN THỊ DỰA TRÊN LOẠI TÀI KHOẢN ---
    if (loginType === 'mye') {
        // NẾU LÀ TÀI KHOẢN MYE
        document.getElementById('hero-account-id').innerHTML = `<i class="bi bi-person-fill me-2"></i>Tài khoản: myepro1123`;
        blockMyeThuGon.style.display = 'block'; // Hiển thị khối không khả dụng mặc định
        
    } else {
        // NẾU LÀ FACEBOOK HOẶC GOOGLE (Luồng cũ)
        let iconHTML = '';
        let accountID = '';
        let heroHTML = '';

        if (loginType === 'facebook') {
            iconHTML = `<i class="bi bi-facebook text-primary" style="font-size: 40px;"></i>`;
            accountID = 'fb.112314335';
            heroHTML = `<i class="bi bi-person-fill me-2"></i>Tài khoản: ${accountID}`;
            blockDaDongBo.classList.remove('mye-card-active-blue'); 
        } else if (loginType === 'google') { 
            iconHTML = `<div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm bg-white" style="width: 40px; height: 40px; border: 1px solid #EAEAEA;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="20" height="20">
                        </div>`;
            accountID = 'gg.01020';
            heroHTML = `<i class="bi bi-google me-2"></i>Tài khoản: ${accountID}`;
            blockDaDongBo.classList.add('mye-card-active-blue'); 
        }

        // Đổ dữ liệu text và icon
        document.getElementById('hero-account-id').innerHTML = heroHTML;
        document.getElementById('icon-login-type').innerHTML = iconHTML;
        document.getElementById('icon-login-type-form').innerHTML = iconHTML;
        document.getElementById('icon-login-type-success').innerHTML = iconHTML;
        
        document.getElementById('text-login-id').innerText = accountID;
        document.getElementById('text-login-id-form').innerText = accountID;
        document.getElementById('text-login-id-success').innerText = accountID;

        // Bật khối đồng bộ tương ứng
        if (isSynced === 'true') {
            blockDaDongBo.style.display = 'block';
            if (sessionStorage.getItem('showBanner') === 'true') {
                bannerThanhCong.style.setProperty('display', 'flex', 'important');
                sessionStorage.removeItem('showBanner'); 
            } else {
                bannerThanhCong.style.setProperty('display', 'none', 'important');
            }
        } else {
            blockChuaDongBo.style.display = 'block';
        }
    }
}

// ================= CÁC HÀM XỬ LÝ SỰ KIỆN CLICK =================

// 1. Dành cho luồng FB/Google
function moFormDongBo() {
    document.getElementById('block-chua-dong-bo').style.display = 'none';
    document.getElementById('block-form-dong-bo').style.display = 'block';
}
function dongFormDongBo() {
    document.getElementById('block-form-dong-bo').style.display = 'none';
    document.getElementById('block-chua-dong-bo').style.display = 'block';
}
function xacNhanDongBo() {
    localStorage.setItem('trangThaiDongBo', 'true');
    sessionStorage.setItem('showBanner', 'true'); 
    renderGiaoDien();
}

// 2. Dành cho luồng Tài khoản MYE
function moKhungMye() {
    document.getElementById('block-mye-thu-gon').style.display = 'none';
    document.getElementById('block-mye-mo-rong').style.display = 'block';
}
function dongKhungMye() {
    document.getElementById('block-mye-mo-rong').style.display = 'none';
    document.getElementById('block-mye-thu-gon').style.display = 'block';
}

// --- CÁC HÀM DÙNG CHO CÔNG CỤ TEST ---
function setLoginType(type) {
    localStorage.setItem('loginType', type);
    renderGiaoDien();
}
function resetData() {
    localStorage.removeItem('trangThaiDongBo');
    renderGiaoDien();
}