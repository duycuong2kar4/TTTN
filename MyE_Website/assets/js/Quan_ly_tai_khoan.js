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
// ================= HỆ THỐNG CHỈNH SỬA THÔNG TIN CÁ NHÂN =================

// Khởi tạo và tải dữ liệu người dùng ngay khi vừa load xong trang
document.addEventListener("DOMContentLoaded", function() {
    loadUserInfo();
});

function loadUserInfo() {
    // 1. Dữ liệu mặc định ban đầu nếu người dùng chưa từng sửa
    const defaultInfo = {
        name: "Nguyễn Văn A",
        gender: "Nam",
        dob: "1999-01-01", // Chuẩn YYYY-MM-DD để hiển thị lên thẻ input type="date"
        address: "TP.Hồ Chí Minh"
    };

    // 2. Lấy dữ liệu từ bộ nhớ trình duyệt
    const savedInfo = JSON.parse(localStorage.getItem('mye_user_info')) || defaultInfo;

    // 3. Đổ dữ liệu ra giao diện (Chế độ Xem)
    document.getElementById('view-name').innerText = savedInfo.name;
    document.getElementById('view-gender').innerText = savedInfo.gender;
    document.getElementById('view-address').innerText = savedInfo.address;
    
    // Xử lý đảo ngược hiển thị ngày sinh (Từ YYYY-MM-DD thành DD/MM/YYYY)
    if(savedInfo.dob) {
        const [year, month, day] = savedInfo.dob.split('-');
        document.getElementById('view-dob').innerText = `${day}/${month}/${year}`;
    }
    
    // 4. (Tùy chọn) Cập nhật luôn tên người dùng trên thanh Banner xanh dương
    const heroNameElement = document.querySelector('.profile-hero h2');
    if (heroNameElement) heroNameElement.innerText = savedInfo.name;
}

// Hàm bật/tắt form chỉnh sửa
function toggleEditMode(isEdit) {
    const viewMode = document.getElementById('info-view-mode');
    const editMode = document.getElementById('info-edit-mode');
    const btnEdit = document.getElementById('btn-edit-container');
    const btnSave = document.getElementById('btn-save-container');

    if (isEdit) {
        // Mở Form: Ẩn chế độ Xem, Bật chế độ Sửa và Đổi Nút
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
        btnEdit.style.setProperty('display', 'none', 'important');
        btnSave.style.setProperty('display', 'flex', 'important');

        // Lấy dữ liệu hiện tại gắn vào các thanh Input để người dùng sửa tiếp
        const currentInfo = JSON.parse(localStorage.getItem('mye_user_info')) || {
            name: "Nguyễn Văn A", gender: "Nam", dob: "1999-01-01", address: "TP.Hồ Chí Minh"
        };
        
        document.getElementById('edit-name').value = currentInfo.name;
        document.getElementById('edit-gender').value = currentInfo.gender;
        document.getElementById('edit-dob').value = currentInfo.dob;
        document.getElementById('edit-address').value = currentInfo.address;
    } else {
        // Bấm Nút Hủy: Trả lại như cũ
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
        btnEdit.style.setProperty('display', 'block', 'important');
        btnSave.style.setProperty('display', 'none', 'important');
    }
}

// Hàm lưu dữ liệu
function saveUserInfo() {
    // 1. Gom dữ liệu mới từ các ô input
    const newInfo = {
        name: document.getElementById('edit-name').value,
        gender: document.getElementById('edit-gender').value,
        dob: document.getElementById('edit-dob').value,
        address: document.getElementById('edit-address').value
    };

    // 2. Lưu đè vào bộ nhớ trình duyệt
    localStorage.setItem('mye_user_info', JSON.stringify(newInfo));

    // 3. Đổi chữ "Chưa hoàn thiện" (Màu Đỏ) thành "Đã cập nhật" (Màu Xanh)
    const statusSpan = document.getElementById('info-status');
    if (statusSpan) {
        statusSpan.innerText = 'Đã cập nhật';
        statusSpan.classList.remove('text-danger');
        statusSpan.classList.add('text-success');
    }

    // 4. Load lại dữ liệu ra view và đóng chế độ sửa
    loadUserInfo();
    toggleEditMode(false);
}
// Hàm Bật/Tắt khối Lịch sử hoạt động
function toggleHistory() {
    const thuGon = document.getElementById('block-history-thu-gon');
    const moRong = document.getElementById('block-history-mo-rong');
    
    if (thuGon.style.display === 'none') {
        thuGon.style.display = 'block';
        moRong.style.display = 'none';
    } else {
        thuGon.style.display = 'none';
        moRong.style.display = 'block';
    }
}