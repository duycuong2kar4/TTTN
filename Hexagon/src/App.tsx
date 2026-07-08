import React, { useState, useEffect } from 'react';
import { Puck } from '@puckeditor/core';
import "@puckeditor/core/dist/index.css";
import { HexagonHeader, puckComponentsRender, HexagonSectorDetail, HexagonNewsList, HexagonNewsDetail } from './HexagonComponents';

interface PageItem {
  id: string; title: string; seoTitle: string; slug: string;
  lang: 'vi' | 'en'; status: 'Nháp' | 'Đã xuất bản'; updatedAt: string; puckData: any;
}

const INITIAL_PAGES: PageItem[] = [
  {
    id: 'hex-home-vi', title: 'Trang Chủ - Hexagon', seoTitle: 'SEO: Giải Pháp Công Nghệ - HEXAGON Solutions',
    slug: 'home', lang: 'vi', status: 'Đã xuất bản', updatedAt: '7/7/2026',
    puckData: {
      content: [
        { type: 'Hero', props: { id: 'h1' } },
        { type: 'About', props: { id: 'a1' } },
        { type: 'Sectors', props: { id: 's1' } },
        { type: 'NewsGrid', props: { id: 'n1' } },
        { type: 'Partners', props: { id: 'p1' } },
        { type: 'Contact', props: { id: 'c1' } }
      ],
      root: {}
    }
  },
  { id: 'sub-tech', title: 'Giải pháp công nghệ', seoTitle: 'SEO: Công nghệ', slug: 'giai-phap-cong-nghe', lang: 'vi', status: 'Đã xuất bản', updatedAt: '7/7/2026', puckData: { content: [{ type: 'Hero', props: {} }], root: {} } },
  { id: 'sub-construct', title: 'Giải pháp thi công & lắp đặt', seoTitle: 'SEO: Thi công', slug: 'giai-phap-thi-cong-lap-dat', lang: 'vi', status: 'Đã xuất bản', updatedAt: '7/7/2026', puckData: { content: [{ type: 'Contact', props: {} }], root: {} } },
  { id: 'sub-device', title: 'Cung cấp thiết bị CNTT', seoTitle: 'SEO: Thiết bị', slug: 'cung-cap-thiet-bi-cntt', lang: 'vi', status: 'Đã xuất bản', updatedAt: '7/7/2026', puckData: { content: [{ type: 'About', props: {} }], root: {} } },
  { id: 'sub-services', title: 'Dịch vụ Công nghệ thông tin', seoTitle: 'SEO: Dịch vụ', slug: 'dich-vu-cong-nghe-thong-tin', lang: 'vi', status: 'Đã xuất bản', updatedAt: '7/7/2026', puckData: { content: [{ type: 'NewsGrid', props: {} }], root: {} } }
];

export default function App() {
  const [pages, setPages] = useState<PageItem[]>(INITIAL_PAGES);
  const [viewMode, setViewMode] = useState<'manager' | 'editor' | 'preview'>('manager');
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [previewSlug, setPreviewSlug] = useState('home');
  const [previewLang, setPreviewLang] = useState<'vi' | 'en'>('vi');
  const [selectedNewsId, setSelectedNewsId] = useState<number>(1);

  const [inputTitle, setInputTitle] = useState('');
  const [inputSlug, setInputSlug] = useState('');
  const [inputLang, setInputLang] = useState<'vi' | 'en'>('vi');

  const puckConfig = {
    components: {
      Hero: { render: puckComponentsRender.Hero },
      About: { render: puckComponentsRender.About },
      // FIX KHỐI SECTORS TRANG CHỦ: Click card lật trang con chi tiết dịch vụ chuẩn xác
      Sectors: { render: () => <puckComponentsRender.Sectors onNavigate={(slug: string) => setPreviewSlug(slug)} /> },
      // FIX KHỐI NEWSGRID TRANG CHỦ: Bấm xem tất cả nhảy sang 'all-news', bấm chi tiết nhảy 'detail-news' kèm ID
      NewsGrid: { render: () => <puckComponentsRender.NewsGrid onNavigateAllNews={() => setPreviewSlug('all-news')} onNavigateDetailNews={(id) => { setSelectedNewsId(id); setPreviewSlug('detail-news'); }} /> },
      Partners: { render: puckComponentsRender.Partners },
      Contact: { render: puckComponentsRender.Contact }
    }
  };

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle || !inputSlug) return alert('Vui lòng điền đủ thông tin!');
    const newPage: PageItem = {
      id: `page-${Date.now()}`, title: inputTitle, seoTitle: `SEO: ${inputTitle}`,
      slug: inputSlug.trim().toLowerCase(), lang: inputLang, status: 'Nháp', updatedAt: '7/7/2026', puckData: { content: [], root: {} }
    };
    setPages([newPage, ...pages]);
    setInputTitle(''); setInputSlug('');
  };

  const handleCloneToTranslation = (sourcePage: any) => {
    const targetLang = sourcePage.lang === 'vi' ? 'en' : 'vi';
    if (pages.some(p => p.slug === sourcePage.slug && p.lang === targetLang)) return alert('Đã có bản dịch rồi!');
    const clonedPage: PageItem = {
      id: `page-${Date.now()}`, title: `${sourcePage.title} (${targetLang.toUpperCase()})`, seoTitle: `SEO: ${sourcePage.title}`,
      slug: sourcePage.slug, lang: targetLang, status: 'Nháp', updatedAt: '7/7/2026', puckData: JSON.parse(JSON.stringify(sourcePage.puckData))
    };
    setPages([clonedPage, ...pages]);
    alert('Nhân bản dịch thành công!');
  };

  if (viewMode === 'editor' && activePageId) {
    const targetPage = pages.find(p => p.id === activePageId);
    return (
      <div className="w-screen h-screen flex flex-col bg-slate-950 text-white text-left">
        <div className="w-full bg-[#111827] px-6 py-3 flex items-center justify-between border-b border-gray-800">
          <span className="text-xs font-bold text-emerald-400">Editor: {targetPage?.title}</span>
          <button onClick={() => setViewMode('manager')} className="px-3 py-1 bg-gray-800 text-xs font-bold rounded text-gray-300 cursor-pointer">Quay lại</button>
        </div>
        <div className="flex-1 w-full overflow-hidden bg-slate-900 relative">
          <Puck config={puckConfig as any} data={targetPage?.puckData || { content: [], root: {} }} onPublish={(data) => {
            setPages(prev => prev.map(p => p.id === activePageId ? { ...p, status: 'Đã xuất bản', puckData: data } : p));
            setViewMode('manager');
          }} />
        </div>
      </div>
    );
  }

  // --- HỆ THỐNG PHÂN LUỒNG PREVIEW CLIENT TOÀN DIỆN KHÔNG LỖI SÓT ---
  if (viewMode === 'preview') {
    const matchedPage = pages.find(p => p.slug === previewSlug && p.lang === previewLang);
    const isServiceSlug = ['giai-phap-cong-nghe', 'giai-phap-thi-cong-lap-dat', 'cung-cap-thiet-bi-cntt', 'dich-vu-cong-nghe-thong-tin'].includes(previewSlug);

    return (
      <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans">
        <div className="w-full bg-emerald-900 text-white py-2 px-8 text-xs font-bold flex justify-between items-center select-none z-50">
          <span>Chế độ Xem Trước Client (Đang xem: /{previewSlug})</span>
          <div className="flex items-center gap-2">
            {previewSlug !== 'home' && <button onClick={() => setPreviewSlug('home')} className="bg-amber-600 px-3 py-1 rounded text-white text-xs font-black cursor-pointer">← Về Trang Chủ</button>}
            <button onClick={() => setViewMode('manager')} className="bg-emerald-600 px-3 py-1 rounded text-white text-xs font-black cursor-pointer">Thoát Xem Trước</button>
          </div>
        </div>
        
        <HexagonHeader currentLang={previewLang} onChangeLang={setPreviewLang} onNavigate={setPreviewSlug} activeSlug={previewSlug} />
        
        <main className="flex-1 w-full">
          {previewSlug === 'home' ? (
            // Luồng 1: Trang chủ kéo thả từ CMS
            matchedPage ? matchedPage.puckData?.content?.map((item: any, idx: number) => {
              const Comp = (puckConfig.components as any)[item.type];
              return Comp ? <Comp.render key={idx} /> : null;
            }) : null
          ) : previewSlug === 'all-news' ? (
            // Luồng 2: Trang danh sách toàn bộ tin tức
            <HexagonNewsList 
              onBack={() => setPreviewSlug('home')} 
              onNavigateSector={(slug: string) => setPreviewSlug(slug)}
              onNavigateDetailNews={(id) => { setSelectedNewsId(id); setPreviewSlug('detail-news'); }}
              onScrollToSectors={() => {
                setPreviewSlug('home');
                setTimeout(() => {
                  const target = document.getElementById('sectors-block');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          ) : previewSlug === 'detail-news' ? (
            // Luồng 3: Trang chi tiết 1 bài viết tin tức động
            <HexagonNewsDetail 
              newsId={selectedNewsId} 
              onBack={() => setPreviewSlug('home')} 
              onNavigateList={() => setPreviewSlug('all-news')} 
              onNavigateSector={(slug: string) => setPreviewSlug(slug)}
              onNavigateDetailNews={(id) => setSelectedNewsId(id)}
            />
          ) : isServiceSlug ? (
            // Luồng 4: TÁO BẠO KHÔI PHỤC - Ép render trang chi tiết tĩnh của 4 lĩnh vực dịch vụ con khi click điều hướng
            <HexagonSectorDetail slug={previewSlug} onBack={() => setPreviewSlug('home')} />
          ) : (
            // Luồng dự phòng khi sửa trang trống từ Editor
            matchedPage ? matchedPage.puckData?.content?.map((item: any, idx: number) => {
              const Comp = (puckConfig.components as any)[item.type];
              return Comp ? <Comp.render key={idx} /> : null;
            }) : (
              <div className="w-full py-20 text-center">
                <h2 className="text-lg font-bold text-slate-400">Giao diện trang con trống!</h2>
              </div>
            )
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-6 md:p-10 w-full flex justify-center text-left select-none">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        <div className="border-b border-slate-200 pb-4"><h1 className="text-2xl font-black text-slate-900">📄 Quản lý Pages</h1></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleCreatePage} className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase text-emerald-600 tracking-wider border-b border-slate-100 pb-2">➕ Thêm Trang Mới</h3>
            <div className="flex flex-col gap-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tiêu đề trang</label><input type="text" placeholder="Tên trang..." value={inputTitle} onChange={e => setInputTitle(e.target.value)} className="border border-slate-300 bg-slate-50 rounded px-3 py-2 text-xs focus:outline-none" /></div>
            <div className="flex flex-col gap-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Slug</label><input type="text" placeholder="Ví dụ: gioi-thieu" value={inputSlug} onChange={e => setInputSlug(e.target.value)} className="border border-slate-300 bg-slate-50 rounded px-3 py-2 text-xs focus:outline-none" /></div>
            <div className="flex flex-col gap-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Ngôn ngữ gốc</label><select value={inputLang} onChange={e => setInputLang(e.target.value as any)} className="border border-slate-300 bg-slate-50 rounded px-3 py-2 text-xs font-bold"><option value="vi">vi (Tiếng Việt)</option><option value="en">en (Tiếng Anh)</option></select></div>
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm cursor-pointer hover:bg-emerald-700 transition-colors">+ Tạo Page Mới</button>
          </form>
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead><tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-gray-50"><th className="px-6 py-4">Tiêu Đề</th><th className="px-4 py-4">Slug</th><th className="px-4 py-4 text-center">Ngôn Ngữ</th><th className="px-4 py-4">Trạng Thái</th><th className="px-6 py-4 text-right">Thao Tác</th></tr></thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4"><div className="flex flex-col"><span className="font-bold text-slate-900 text-sm">{page.title}</span></div></td>
                    <td className="px-4 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-mono">/{page.slug}</span></td>
                    <td className="px-4 py-4 text-center"><span className={`px-2 py-0.5 rounded text-[10px] font-black ${page.lang === 'vi' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{page.lang.toUpperCase()}</span></td>
                    <td className="px-4 py-4"><span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700"> {page.status}</span></td>
                    <td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-1.5"><button type="button" onClick={() => handleCloneToTranslation(page)} className="px-2 py-1 bg-emerald-50 text-emerald-600 font-bold rounded text-[11px] cursor-pointer hover:bg-emerald-100">📋 Clone</button><button type="button" onClick={() => { setActivePageId(page.id); setViewMode('editor'); }} className="px-2 py-1 bg-amber-50 text-amber-600 font-bold rounded text-[11px] cursor-pointer hover:bg-amber-100">📝 Sửa</button><button type="button" onClick={() => { setPreviewSlug(page.slug); setPreviewLang(page.lang); setViewMode('preview'); }} className="px-2 py-1 bg-slate-100 text-slate-600 font-bold rounded text-[11px] cursor-pointer hover:bg-slate-200">👁️ Xem</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}