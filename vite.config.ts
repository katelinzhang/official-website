import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { quarkdairySitemap } from './vite-plugins/sitemap'

// Build-time date injection (replaced into source via vite define)
const _d = new Date();
const _buildDateIso = _d.toISOString().slice(0, 10);
const _buildDateZh = `${_d.getFullYear()} 年 ${_d.getMonth() + 1} 月 ${_d.getDate()} 日`;
const _monthsEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const _buildDateEn = `${_monthsEn[_d.getMonth()]} ${_d.getDate()}, ${_d.getFullYear()}`;

export default defineConfig({
  plugins: [react(), quarkdairySitemap()],
  define: {
    __BUILD_DATE_ISO__: JSON.stringify(_buildDateIso),
    __BUILD_DATE_ZH__: JSON.stringify(_buildDateZh),
    __BUILD_DATE_EN__: JSON.stringify(_buildDateEn),
  },
})
