import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { API_BASE } from '../config';

interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  photos: string[];
  createdAt: string;
}

const PAGE_SIZE = 20;

const AdminPage: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [authenticated, setAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('admin_token');
          setAuthenticated(false);
          setToken('');
          return;
        }
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setInquiries(data);
      setAuthenticated(true);
    } catch {
      setError('加载询盘数据失败');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_token', token);
    fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这条询盘吗？删除后不可恢复。')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        if (selected?.id === id) setSelected(null);
      } else {
        alert('删除失败');
      }
    } catch {
      alert('删除失败');
    }
  };

  const handleExport = async (format: 'xlsx' | 'csv') => {
    setExporting(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/inquiries/export.${format}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inquiries-${Date.now()}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('导出失败');
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (token) fetchInquiries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived data ──
  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const withPhotos = inquiries.filter((i) => i.photos.length > 0).length;
    const thisMonth = inquiries.filter((i) => new Date(i.createdAt).getTime() >= monthStart).length;
    const interestMap = new Map<string, number>();
    inquiries.forEach((i) => {
      const key = i.productInterest?.trim() || '未填写';
      interestMap.set(key, (interestMap.get(key) || 0) + 1);
    });
    const topInterests = Array.from(interestMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    return { total: inquiries.length, thisMonth, withPhotos, topInterests };
  }, [inquiries]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter((i) =>
      [i.name, i.company, i.email, i.phone, i.productInterest].some((v) =>
        (v || '').toLowerCase().includes(q)
      )
    );
  }, [inquiries, searchTerm]);

  const maxPage = Math.max(0, Math.ceil(filtered.length / PAGE_SIZE) - 1);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [maxPage, page]);

  // ── Login screen ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <img src="/images/logo.png" alt="Quark Dairy" className="w-14 h-14 object-contain mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-brand-green">询盘管理后台</h1>
            <p className="text-sm text-gray-500 mt-1">Quark Dairy Admin</p>
          </div>
          <form onSubmit={handleLogin} className="card p-8 space-y-4">
            <div>
              <label className="text-sm font-semibold text-brand-green block mb-1.5">访问密钥</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="请输入 Admin Token"
                className="w-full px-4 py-2.5 rounded-xl bg-brand-cream/60 border border-brand-support-green/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-colors text-brand-green"
                autoFocus
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              登录
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-green via-[#0f2920] to-brand-green text-white px-6 py-3 flex items-center justify-between gap-4 flex-wrap sticky top-0 z-20 shadow-header">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
          <div>
            <h1 className="text-base font-bold leading-tight">询盘管理后台</h1>
            <p className="text-[11px] text-gray-500 leading-tight">Quark Dairy · Inquiry Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('xlsx')}
            disabled={exporting}
            className="btn-primary !px-4 !py-2 text-sm disabled:opacity-60"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            {exporting ? '导出中…' : '导出 Excel'}
          </button>
          <button
            onClick={() => handleExport('csv')}
            disabled={exporting}
            className="px-3 py-2 text-sm rounded-xl border border-white/20 text-gray-200 hover:bg-white/10 transition-colors disabled:opacity-60"
          >
            CSV
          </button>
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="px-3 py-2 text-sm rounded-xl border border-white/20 text-gray-200 hover:bg-white/10 transition-colors disabled:opacity-60"
          >
            {loading ? '刷新中…' : '刷新'}
          </button>
          <button
            onClick={() => { localStorage.removeItem('admin_token'); setAuthenticated(false); setToken(''); }}
            className="px-3 py-2 text-sm rounded-xl bg-white/10 text-gray-200 hover:bg-red-500/80 transition-colors"
          >
            退出登录
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className="container-custom px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card !rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-1">询盘总数</p>
            <p className="text-3xl font-bold text-brand-green">{stats.total}</p>
          </div>
          <div className="card !rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-1">本月新增</p>
            <p className="text-3xl font-bold text-brand-support-green">{stats.thisMonth}</p>
          </div>
          <div className="card !rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-1">带照片询盘</p>
            <p className="text-3xl font-bold text-brand-orange">{stats.withPhotos}</p>
          </div>
          <div className="card !rounded-2xl p-5 col-span-2 md:col-span-1">
            <p className="text-xs text-gray-500 mb-2">意向产品 Top 5</p>
            {stats.topInterests.length === 0 ? (
              <p className="text-sm text-gray-500">暂无数据</p>
            ) : (
              <div className="space-y-1.5">
                {stats.topInterests.map(([label, count]) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className="truncate text-gray-600 flex-1">{label}</span>
                    <span className="font-semibold text-brand-green">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search + pagination */}
      <div className="container-custom px-6 pb-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <svg className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            placeholder="搜索姓名 / 公司 / 邮箱 / 电话 / 意向产品…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-brand-support-green/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm text-brand-green transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="w-8 h-8 rounded-lg bg-white border border-brand-support-green/20 flex items-center justify-center text-brand-green hover:bg-brand-cream transition-colors disabled:opacity-30"
          >
            ‹
          </button>
          <span className="px-2 text-gray-500">
            第 {page + 1} / {maxPage + 1} 页 · 共 {filtered.length} 条
          </span>
          <button
            onClick={() => setPage(Math.min(maxPage, page + 1))}
            disabled={page >= maxPage}
            className="w-8 h-8 rounded-lg bg-white border border-brand-support-green/20 flex items-center justify-center text-brand-green hover:bg-brand-cream transition-colors disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>

      {/* Main: list + detail */}
      <div className="container-custom px-6 pb-8 flex-1">
        {loading && filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">加载中…</p>
        ) : pageItems.length === 0 ? (
          <div className="card !rounded-2xl text-center py-16 text-gray-500">
            {searchTerm ? '没有匹配的询盘' : '暂无询盘记录'}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 items-start">
            {/* List */}
            <div className="xl:col-span-3 space-y-3">
              {pageItems.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelected(inq)}
                  className={`card !rounded-2xl p-4 cursor-pointer ${
                    selected?.id === inq.id ? '!border-brand-orange !shadow-button ring-2 ring-brand-orange/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-brand-green truncate">{inq.name}</p>
                        {inq.photos.length > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-support-green/10 text-brand-support-green font-semibold flex-shrink-0">
                            📷 {inq.photos.length}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {inq.company} · {inq.email}
                      </p>
                      {inq.productInterest && (
                        <p className="text-xs text-brand-orange truncate mt-0.5">{inq.productInterest}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(inq.id); }}
                        className="text-xs px-2.5 py-1.5 rounded-lg text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail drawer */}
            <div className="xl:col-span-2 xl:sticky xl:top-24">
              {!selected ? (
                <div className="card !rounded-2xl text-center py-16 text-gray-500">
                  点击左侧询盘查看详情
                </div>
              ) : (
                <div className="card !rounded-2xl p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-brand-cream pb-3">
                    <div>
                      <h2 className="text-lg font-bold text-brand-green">{selected.name}</h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(selected.createdAt).toLocaleString('zh-CN')} · #{selected.id.slice(0, 8)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="w-7 h-7 rounded-lg hover:bg-brand-cream flex items-center justify-center text-gray-500 transition-colors"
                      title="关闭"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      ['公司', selected.company],
                      ['邮箱', selected.email],
                      ['电话', selected.phone || '—'],
                      ['意向产品', selected.productInterest || '—'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex gap-3 text-sm">
                        <span className="text-gray-500 w-16 flex-shrink-0">{label}</span>
                        <span className="text-brand-green font-medium break-all">{value}</span>
                      </div>
                    ))}
                  </div>

                  {selected.message && (
                    <div className="bg-brand-cream/70 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1.5">留言内容</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                    </div>
                  )}

                  {selected.photos.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">照片（{selected.photos.length}）</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.photos.map((photo, idx) => (
                          <a key={idx} href={`${API_BASE}${photo}`} target="_blank" rel="noopener noreferrer">
                            <img
                              src={`${API_BASE}${photo}`}
                              alt={`照片 ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded-xl border border-brand-support-green/10 hover:border-brand-orange transition-colors"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    删除这条询盘
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-brand-support-green/10 py-4 text-center text-xs text-gray-500">
        Quark Dairy Inquiry Admin · 数据存储于本地 SQLite 数据库
      </footer>
    </div>
  );
};

export default AdminPage;
