import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';
import { sendInquiryNotification } from './mailer.js';
import { createInquiry, getAllInquiries, deleteInquiry, getInquiryCount } from './db.js';

// Load .env (Node 20.12+ built-in)
try {
  process.loadEnvFile();
} catch {
  console.warn('[Env] .env file not found, using system environment only');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-change-me';

// ── Middleware ──
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// ── Multer config ──
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and WebP images are allowed'));
    }
  },
});

// ── Data store path ──
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'inquiries.json');

// ── One-time migration: JSON file → SQLite ──
function migrateJsonToSqlite() {
  if (!fs.existsSync(dataFile)) return;
  try {
    const legacy: any[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    let migrated = 0;
    for (const item of legacy) {
      const exists = getAllInquiries().some((r) => r.id === item.id);
      if (exists) continue;
      createInquiry({
        id: item.id,
        name: item.name,
        company: item.company,
        email: item.email,
        phone: item.phone || '',
        productInterest: item.productInterest || '',
        message: item.message || '',
        photos: item.photos || [],
        createdAt: item.createdAt || new Date().toISOString(),
      });
      migrated++;
    }
    if (migrated > 0) {
      console.log(`[DB] Migrated ${migrated} record(s) from inquiries.json to SQLite`);
    }
    // Rename to keep as backup, don't delete
    fs.renameSync(dataFile, dataFile + '.bak');
    console.log('[DB] inquiries.json renamed to inquiries.json.bak (backup)');
  } catch (error: any) {
    console.warn('[DB] Migration skipped:', error.message);
  }
}
migrateJsonToSqlite();

// ── POST /api/inquiry ──
app.post('/api/inquiry', upload.array('photos', 5), (req, res) => {
  try {
    const { name, company, email, phone, productInterest, message } = req.body;
    const files = req.files as Express.Multer.File[];

    // Validate required fields
    if (!name || !company || !email) {
      return res.status(400).json({ error: 'Name, company, and email are required.' });
    }

    // Build inquiry record
    const inquiry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      company,
      email,
      phone: phone || '',
      productInterest: productInterest || '',
      message: message || '',
      photos: files.map((f) => `/uploads/${f.filename}`),
      createdAt: new Date().toISOString(),
    };

    createInquiry(inquiry);

    console.log(`[Inquiry] New inquiry #${inquiry.id} from ${name} (${company}), ${files.length} photo(s)`);

    // Send email notification (fire-and-forget)
    sendInquiryNotification({
      name,
      company,
      email,
      phone: phone || '',
      productInterest: productInterest || '',
      message: message || '',
      photoUrls: files.map((f) => `${BASE_URL}/uploads/${f.filename}`),
      inquiryId: inquiry.id,
    });

    res.json({
      success: true,
      id: inquiry.id,
      message: 'Inquiry submitted successfully.',
    });
  } catch (error: any) {
    console.error('[Inquiry] Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ── Health check ──
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── Admin auth middleware ──
function adminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ── GET /api/admin/inquiries ──
app.get('/api/admin/inquiries', adminAuth, (_req, res) => {
  res.json(getAllInquiries());
});

// ── GET /api/admin/inquiries/export.csv ──
app.get('/api/admin/inquiries/export.csv', adminAuth, (_req, res) => {
  const inquiries = getAllInquiries();
  const header = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Product Interest', 'Message', 'Photos', 'Created At'];
  const escape = (value: string) => `"${String(value || '').replace(/"/g, '""')}"`;
  const rows = inquiries.map((inq) =>
    [
      inq.id,
      inq.name,
      inq.company,
      inq.email,
      inq.phone,
      inq.productInterest,
      inq.message,
      inq.photos.join('; '),
      inq.createdAt,
    ].map(escape).join(',')
  );
  const csv = '\uFEFF' + [header.map(escape).join(','), ...rows].join('\n'); // BOM for Excel
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="inquiries-${Date.now()}.csv"`);
  res.send(csv);
});

// ── GET /api/admin/inquiries/export.xlsx ──
app.get('/api/admin/inquiries/export.xlsx', adminAuth, (_req, res) => {
  const inquiries = getAllInquiries();
  const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Product Interest', 'Message', 'Photos', 'Created At'];
  const rows = inquiries.map((inq) => [
    inq.id,
    inq.name,
    inq.company,
    inq.email,
    inq.phone,
    inq.productInterest,
    inq.message,
    inq.photos.join('; '),
    inq.createdAt,
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  // Column widths + freeze header row + auto filter
  ws['!cols'] = [
    { wch: 14 }, { wch: 20 }, { wch: 28 }, { wch: 30 }, { wch: 18 },
    { wch: 24 }, { wch: 60 }, { wch: 40 }, { wch: 24 },
  ];
  ws['!freeze'] = 'A2';
  ws['!autofilter'] = { ref: `A1:I${rows.length + 1}` };
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inquiries');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="inquiries-${Date.now()}.xlsx"`);
  res.send(buf);
});

// ── DELETE /api/admin/inquiries/:id ──
app.delete('/api/admin/inquiries/:id', adminAuth, (req, res) => {
  const id = String(req.params.id);
  const removed = deleteInquiry(id);
  if (!removed) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  // Delete associated photo files
  removed.photos?.forEach((photoPath: string) => {
    const filePath = path.join(__dirname, photoPath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  console.log(`[Admin] Deleted inquiry #${id}`);
  res.json({ success: true });
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] Uploads dir: ${uploadsDir}`);
  console.log(`[Server] Database: ${path.join(dataDir, 'inquiries.db')} (${getInquiryCount()} record(s))`);
});
