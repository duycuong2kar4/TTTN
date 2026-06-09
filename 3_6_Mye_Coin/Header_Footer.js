// Header_Footer.js

// 1. DỮ LIỆU ĐỔ VÀO MENU HEADER TỰ ĐỘNG TỪ JS KHÔNG VIẾT CỨNG HTML
const navigationLinks = [
    { name: "Trang Chủ", url: "#", active: false },
    { name: "Trò Chơi", url: "#", active: false },
    { name: "Nạp Game", url: "#", active: true }, // Trang hiện tại đang đứng
    { name: "Tin Tức", url: "#", active: false },
    { name: "Hỗ Trợ", url: "#", active: false }
];

// 2. Hàm vẽ Header dựa theo trạng thái đăng nhập (isLoggedIn)
window.renderGlobalHeader = function(isLoggedIn, username, balance) {
    const headerContainer = document.getElementById("global-header");
    if (!headerContainer) return;

    // Tạo chuỗi HTML cho danh sách Menu động
    const menuItemsHTML = navigationLinks.map(link => {
        if (link.active) {
            return `<a href="${link.url}" class="text-[#d97706] font-extrabold border-b-2 border-[#d97706] pb-1 whitespace-nowrap transition-all">${link.name}</a>`;
        }
        return `<a href="${link.url}" class="text-[#25396f] font-bold hover:text-[#d97706] whitespace-nowrap transition-colors">${link.name}</a>`;
    }).join('');

    let authZoneHTML = '';
    if (isLoggedIn) {
        // TRẠNG THÁI ĐÃ ĐĂNG NHẬP: Hiển thị phẳng tối giản theo Figma
        authZoneHTML = `
        <div class="flex items-center gap-2 select-none text-[11px] ml-2">
            <div class="w-7 h-7 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-100">
                <img src="./images/nữMye.png" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col text-left leading-tight min-w-[65px]">
                <span class="font-bold text-orange-600 truncate">${username}</span>
                <span class="text-[9px] text-slate-400 font-medium">MyE ID: 12233548</span>
            </div>
            <div class="flex items-center gap-1 shrink-0 pl-1">
                <img src="./images/coin M.png" class="w-3.5 h-3.5 object-contain" />
                <span class="font-bold text-slate-700 font-mono">${balance.toLocaleString('vi-VN')}</span>
            </div>
        </div>
        `;
    } else {
        // TRẠNG THÁI CHƯA ĐĂNG NHẬP: Khớp nút bấm liền kề menu
        authZoneHTML = `
        <button onclick="handleLoginClick()" 
                class="bg-gradient-to-b from-[#ff8a00] to-[#e65c00] hover:from-[#ff961a] hover:to-[#f56300] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider transition-all transform active:scale-95 shadow-[0_3px_6px_rgba(230,92,0,0.25)] border border-[#cc5200]/20 shrink-0 ml-2">
            Đăng nhập
        </button>
        `;
    }

    // ĐỔ GIAO DIỆN HEADER HOÀN CHỈNH
    headerContainer.innerHTML = `
    <header class="w-full bg-white border-b border-slate-200/50 shadow-sm shadow-slate-50/50">
        <div class="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
            
            <div class="flex items-center gap-8 w-full justify-start">
                
                <div class="shrink-0 flex items-center pl-[74px]">
                    <img src="./images/Logo-myE.png" alt="MyE Logo" class="h-16 w-auto object-contain cursor-pointer block" />
                </div>
                
                <nav class="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
                    ${menuItemsHTML}
                </nav>
                
                <div id="auth-header-zone" class="flex items-center shrink-0">
                    ${authZoneHTML}
                </div>
            </div>
            
        </div>
        
        <div class="w-full border-t border-slate-100 bg-white py-2">
            <div class="max-w-4xl mx-auto pl-16 pr-4">
                <div class="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 select-none">
                    <span class="text-[#25396f] hover:text-blue-600 cursor-pointer">Nạp Game</span> 
                    <span class="text-slate-400 font-mono text-[9px]">&gt;</span> 
                    <span class="text-[#d97706]">MyE Coin</span>
                </div>
            </div>
        </div>
    </header>
    `;
}

// Hàm vẽ Footer chân trang 
window.renderGlobalFooter = function() {
    const footerContainer = document.getElementById("global-footer");
    if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer class="bg-[#EAEAEA] text-[#555555] py-10 text-xs mt-12 border-t border-slate-300">
        <div class="max-w-5xl mx-auto px-4 text-center space-y-4">
            <div class="flex items-center justify-center">
                <img src="./images/Logo-myE.png" alt="MyE Logo" class="h-24 object-contain" />
            </div>
            <div class="text-[13px] font-medium text-slate-700 space-y-0.5">
                <p>Email: hotro@mye.vn</p>
                <p>Hotline: 0902 500 198</p>
            </div>
            <div class="space-y-1 text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                <p class="font-extrabold text-slate-800 text-xs uppercase tracking-wide">CÔNG TY CỔ PHẦN MYE</p>
                <p>Chịu trách nhiệm quản lí nội dung: Ông Lâm Trung Hiệp</p>
                <p>Địa chỉ: 477/22 Âu Cơ, Phường Phú Trung, Quận Tân Phú, Thành phố Hồ Chí Minh, Việt Nam</p>
                <p>Giấy phép G1 số: Số 297/GP-BTTTT. Ngày cấp 14/07/2020, Nơi cấp Bộ Thông Tin và Truyền Thông</p>
            </div>
            <div class="pt-2 text-[11px] text-slate-500 flex justify-center gap-4 font-medium">
                <a href="#" class="hover:underline">Điều khoản dịch vụ</a>
                <span class="text-slate-300">|</span>
                <a href="#" class="hover:underline">Chính sách bảo mật</a>
            </div>
            <div class="text-[11px] text-slate-400 pt-1">
                ©Copyright © 2026 MYE. All Rights Reserved.
            </div>
        </div>
    </footer>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    renderGlobalFooter();
});