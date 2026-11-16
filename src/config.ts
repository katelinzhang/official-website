/** Client-side app configuration — fill in real values before production */

// WhatsApp business number (international format, no + sign)
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '36303969879';

// LinkedIn company page (full URL)
export const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/company/quark-dairy';

// Contact email
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'info@quarkdairy.cn';

// Backend API base URL
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';
