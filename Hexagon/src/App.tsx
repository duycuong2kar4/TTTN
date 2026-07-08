import React, { useState } from 'react';
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
    slug: 'home', lang: 'vi', status: 'Đã xuất bản', updatedAt: '8/7/2026',
    puckData: {
      content: [
        { type: 'Hero', props: puckComponentsRender.Hero.defaultProps },
        { type: 'About', props: puckComponentsRender.About.defaultProps },
        { type: 'Sectors', props: puckComponentsRender.Sectors.defaultProps },
        { type: 'NewsGrid', props: puckComponentsRender.NewsGrid.defaultProps },
        { type: 'Partners', props: puckComponentsRender.Partners.defaultProps },
        { type: 'Contact', props: puckComponentsRender.Contact.defaultProps }
      ],
      root: {}
    }
  }
];

export default function App() {
  const [pages, setPages] = useState<PageItem[]>(INITIAL_PAGES);
  const [viewMode, setViewMode] = useState<'manager' | 'editor' | 'preview'>('manager');
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [previewSlug, setPreviewSlug] = useState('home');
  const [previewLang, setPreviewLang] = useState<'vi' | 'en'>('vi');
  const [selectedNewsId, setSelectedNewsId] = useState<number>(1);

  // States cho Modal tạo trang mới
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputSlug, setInputSlug] = useState('');
  const [inputLang, setInputLang] = useState<'vi' | 'en'>('vi');

  const puckConfig = {
    components: {
      Hero: { fields: puckComponentsRender.Hero.fields, defaultProps: puckComponentsRender.Hero.defaultProps, render: puckComponentsRender.Hero.render },
      About: { fields: puckComponentsRender.About.fields, defaultProps: puckComponentsRender.About.defaultProps, render: puckComponentsRender.About.render },
      Sectors: { fields: puckComponentsRender.Sectors.fields, defaultProps: puckComponentsRender.Sectors.defaultProps, render: (props: any) => <puckComponentsRender.Sectors.render {...props} onNavigate={(slug: string) => setPreviewSlug(slug)} /> },
      NewsGrid: { fields: puckComponentsRender.NewsGrid.fields, defaultProps: puckComponentsRender.NewsGrid.defaultProps, render: (props: any) => <puckComponentsRender.NewsGrid.render {...props} onNavigateAllNews={() => setPreviewSlug('all-news')} onNavigateDetailNews={(id: number) => { setSelectedNewsId(id); setPreviewSlug('detail-news'); }} /> },
      Partners: { fields: puckComponentsRender.Partners.fields, defaultProps: puckComponentsRender.Partners.defaultProps, render: puckComponentsRender.Partners.render },
      Contact: { fields: puckComponentsRender.Contact.fields, defaultProps: puckComponentsRender.Contact.defaultProps, render: puckComponentsRender.Contact.render }
    }
  };

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle || !inputSlug) return alert('Vui lòng điền đủ thông tin!');
    const newPage: PageItem = {
      id: `page-${Date.now()}`, title: inputTitle, seoTitle: `SEO: ${inputTitle}`,
      slug: inputSlug.trim().toLowerCase(), lang: inputLang, status: 'Nháp', updatedAt: new Date().toLocaleDateString('vi-VN'), puckData: { content: [], root: {} }
    };
    setPages([newPage, ...pages]);
    setInputTitle(''); setInputSlug('');
    setIsCreateModalOpen(false);
  };

  const handleCloneToTranslation = (sourcePage: PageItem) => {
    const targetLang = sourcePage.lang === 'vi' ? 'en' : 'vi';
    if (pages.some(p => p.slug === sourcePage.slug && p.lang === targetLang)) return alert(`Trang này đã có bản dịch ${targetLang.toUpperCase()} rồi!`);
    const clonedPage: PageItem = {
      id: `page-${Date.now()}`, title: `${sourcePage.title} (${targetLang.toUpperCase()})`, seoTitle: sourcePage.seoTitle,
      slug: sourcePage.slug, lang: targetLang, status: 'Nháp', updatedAt: new Date().toLocaleDateString('vi-VN'), puckData: JSON.parse(JSON.stringify(sourcePage.puckData))
    };
    setPages([clonedPage, ...pages]);
    setActivePageId(clonedPage.id);
    setViewMode('editor');
  };

  const handleDeletePage = (id: string) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa trang này không?')) setPages(pages.filter(p => p.id !== id));
  };

  if (viewMode === 'editor' && activePageId) {
    const targetPage = pages.find(p => p.id === activePageId);
    return (
      <div className="w-screen h-screen flex flex-col bg-slate-950 text-white text-left">
        <div className="w-full bg-[#111827] px-6 py-3 flex items-center justify-between border-b border-gray-800">
          <span className="text-xs font-bold text-emerald-400">Editor: {targetPage?.title} ({targetPage?.lang.toUpperCase()})</span>
          <button onClick={() => setViewMode('manager')} className="px-3 py-1 bg-gray-800 text-xs font-bold rounded text-gray-300 cursor-pointer hover:bg-gray-700">Quay lại Dashboard</button>
        </div>
        <div className="flex-1 w-full overflow-hidden bg-slate-900 relative">
          <Puck config={puckConfig as any} data={targetPage?.puckData || { content: [], root: {} }} onPublish={(data) => {
            setPages(prev => prev.map(p => p.id === activePageId ? { ...p, status: 'Đã xuất bản', puckData: data, updatedAt: new Date().toLocaleDateString('vi-VN') } : p));
            setViewMode('manager');
          }} />
        </div>
      </div>
    );
  }

  if (viewMode === 'preview') {
    const matchedPage = pages.find(p => p.slug === previewSlug && p.lang === previewLang);
    const isServiceSlug = ['giai-phap-cong-nghe', 'giai-phap-thi-cong-lap-dat', 'cung-cap-thiet-bi-cntt', 'dich-vu-cong-nghe-thong-tin'].includes(previewSlug);

    return (
      <div className="w-full min-h-screen bg-white text-slate-800 flex flex-col font-sans">
        <div className="w-full bg-emerald-900 text-white py-2 px-8 text-xs font-bold flex justify-between items-center select-none z-50">
          <span>Chế độ Xem Trước Client (Đang xem: /{previewSlug} - Ngôn ngữ: {previewLang.toUpperCase()})</span>
          <div className="flex items-center gap-2">
            {previewSlug !== 'home' && <button onClick={() => setPreviewSlug('home')} className="bg-amber-600 px-3 py-1 rounded text-white text-xs font-black cursor-pointer">← Về Trang Chủ</button>}
            <button onClick={() => setViewMode('manager')} className="bg-emerald-600 px-3 py-1 rounded text-white text-xs font-black cursor-pointer">Thoát Xem Trước</button>
          </div>
        </div>
        
        <HexagonHeader currentLang={previewLang} onChangeLang={setPreviewLang} onNavigate={setPreviewSlug} activeSlug={previewSlug} />
        
        <main className="flex-1 w-full bg-slate-50">
          {previewSlug === 'home' ? (
            matchedPage ? matchedPage.puckData?.content?.map((item: any, idx: number) => {
              const Comp = (puckConfig.components as any)[item.type];
              return Comp ? <Comp.render key={idx} {...item.props} /> : null;
            }) : (
              <div className="w-full py-32 flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4"><span className="text-2xl font-black">!</span></div>
                <h2 className="text-xl font-black text-slate-800 mb-2">Chưa có dữ liệu ngôn ngữ {previewLang.toUpperCase()}</h2>
                <p className="text-sm text-slate-500 max-w-md leading-relaxed">Bạn vừa chuyển sang tiếng Anh (EN) nhưng trang này chưa được nhân bản. Vui lòng thoát ra ngoài Dashboard và bấm <b>📋 Clone</b> để tạo bản dịch.</p>
                <button onClick={() => setPreviewLang('vi')} className="mt-6 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-700 cursor-pointer">Quay lại Tiếng Việt</button>
              </div>
            )
          ) : previewSlug === 'all-news' ? (
            <HexagonNewsList currentLang={previewLang} onBack={() => setPreviewSlug('home')} onNavigateSector={(slug: string) => setPreviewSlug(slug)} onNavigateDetailNews={(id: number) => { setSelectedNewsId(id); setPreviewSlug('detail-news'); }} onScrollToSectors={() => { setPreviewSlug('home'); setTimeout(() => { const t = document.getElementById('sectors-block'); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 100); }} />
          ) : previewSlug === 'detail-news' ? (
            <HexagonNewsDetail currentLang={previewLang} newsId={selectedNewsId} onBack={() => setPreviewSlug('home')} onNavigateList={() => setPreviewSlug('all-news')} onNavigateSector={(slug: string) => setPreviewSlug(slug)} onNavigateDetailNews={(id: number) => setSelectedNewsId(id)} />
          ) : isServiceSlug ? (
            <HexagonSectorDetail currentLang={previewLang} slug={previewSlug} onBack={() => setPreviewSlug('home')} />
          ) : (
            matchedPage ? matchedPage.puckData?.content?.map((item: any, idx: number) => {
              const Comp = (puckConfig.components as any)[item.type];
              return Comp ? <Comp.render key={idx} {...item.props} /> : null;
            }) : <div className="w-full py-20 text-center"><h2 className="text-lg font-bold text-slate-400">Trang con trống!</h2></div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-6 md:p-10 w-full flex justify-center text-left select-none relative">
      <div className="max-w-[1200px] w-full flex flex-col">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Quản lý Pages
            </h1>
            <p className="text-sm text-slate-500 mt-1">Tạo và quản lý các trang với PUCK Visual Builder</p>
          </div>
          <button onClick={() => setIsCreateModalOpen(true)} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
            <span className="text-lg leading-none">+</span> Tạo Page Mới
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8fafc] border-b border-slate-200">
              <tr className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Tiêu Đề</th>
                <th className="px-4 py-4">Slug</th>
                <th className="px-4 py-4 text-center">Ngôn Ngữ</th>
                <th className="px-4 py-4">Trạng Thái</th>
                <th className="px-4 py-4">Cập Nhật</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{page.title}</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">{page.seoTitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-[12px] font-mono">/{page.slug}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="bg-[#eff6ff] text-[#2563eb] px-2.5 py-1 rounded text-[11px] font-bold tracking-wide">
                      {page.lang.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-[#f0fdf4] text-[#16a34a] px-2.5 py-1 rounded text-[12px] font-medium">
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600 text-[13px]">
                    {page.updatedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button onClick={() => { setPreviewSlug(page.slug); setPreviewLang(page.lang); setViewMode('preview'); }} className="hover:text-blue-600 transition-colors" title="Xem trước">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                      <button onClick={() => handleCloneToTranslation(page)} className="hover:text-amber-600 transition-colors font-bold text-xs flex items-center gap-1" title="Nhân bản (Clone) đa ngôn ngữ">📋 Clone</button>
                      <button onClick={() => { setActivePageId(page.id); setViewMode('editor'); }} className="hover:text-blue-600 transition-colors" title="Sửa bằng Puck">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => handleDeletePage(page.id)} className="hover:text-red-500 transition-colors" title="Xóa">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Tạo Page Mới</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form onSubmit={handleCreatePage} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Tiêu đề trang</label>
                <input type="text" placeholder="Nhập tên trang..." value={inputTitle} onChange={e => setInputTitle(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Đường dẫn (Slug)</label>
                <input type="text" placeholder="Ví dụ: gioi-thieu" value={inputSlug} onChange={e => setInputSlug(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Ngôn ngữ gốc</label>
                <select value={inputLang} onChange={e => setInputLang(e.target.value as any)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                  <option value="vi">Tiếng Việt (VI)</option>
                  <option value="en">Tiếng Anh (EN)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">Hủy bỏ</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer">Xác nhận tạo</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}