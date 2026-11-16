import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToHash from './components/common/ScrollToHash';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CustomSolutionsPage from './pages/CustomSolutionsPage';
import CaseDetailPage from './pages/CaseDetailPage';
import AdminPage from './pages/AdminPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import { addZhPrefix } from './utils/locale';

/**
 * 页面路由表：同一套页面同时挂载英文（无前缀）与中文（/zh 前缀）两个版本，
 * 让每个语言版本都有独立、可被搜索引擎索引的 URL。
 *
 * 英文保留无前缀，是为了不破坏 Google 已经收录的既有 URL；
 * 中文用 /zh 前缀，是因为切换语言不改 URL 的话，
 * 中文内容对搜索引擎近乎不可见（见 VISUAL-SPEC.md 附录 B.4）。
 */
const pageRoutes: { path: string; element: React.ReactElement }[] = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
  { path: '/solutions', element: <CustomSolutionsPage /> },
  { path: '/cases/:id', element: <CaseDetailPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },
];

const App: React.FC = () => {
  return (
    <>
      {/* 补上 React Router v6 缺失的锚点滚动（详见组件内注释） */}
      <ScrollToHash />
      <Routes>
      <Route element={<Layout />}>
        {/* 英文版 */}
        {pageRoutes.map((r) => (
          <Route key={`en${r.path}`} path={r.path} element={r.element} />
        ))}
        {/* 中文版：同一套页面 + /zh 前缀 */}
        {pageRoutes.map((r) => (
          <Route key={`zh${r.path}`} path={addZhPrefix(r.path)} element={r.element} />
        ))}
        {/* 旧别名：/cases → /solutions，/inquiry → /contact */}
        <Route path="/cases" element={<Navigate to="/solutions" replace />} />
        <Route path="/inquiry" element={<Navigate to="/contact" replace />} />
        <Route path="/zh/cases" element={<Navigate to="/zh/solutions" replace />} />
        <Route path="/zh/inquiry" element={<Navigate to="/zh/contact" replace />} />
        {/* Catch-all 404 (inside Layout so header/footer still render) */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;
