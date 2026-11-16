import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'inquiries.db'));

// ── Schema ──
db.pragma('journal_mode = WAL'); // 支持并发读写
db.pragma('busy_timeout = 5000');

db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    product_interest TEXT DEFAULT '',
    message TEXT DEFAULT '',
    photos TEXT DEFAULT '[]',      -- JSON array of photo paths
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
`);

export interface InquiryRecord {
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

function rowToRecord(row: any): InquiryRecord {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    productInterest: row.product_interest,
    message: row.message,
    photos: JSON.parse(row.photos || '[]'),
    createdAt: row.created_at,
  };
}

// ── CRUD ──
export function createInquiry(record: InquiryRecord) {
  const stmt = db.prepare(`
    INSERT INTO inquiries (id, name, company, email, phone, product_interest, message, photos, created_at)
    VALUES (@id, @name, @company, @email, @phone, @productInterest, @message, @photos, @createdAt)
  `);
  stmt.run({
    id: record.id,
    name: record.name,
    company: record.company,
    email: record.email,
    phone: record.phone,
    productInterest: record.productInterest,
    message: record.message,
    photos: JSON.stringify(record.photos),
    createdAt: record.createdAt,
  });
}

export function getAllInquiries(): InquiryRecord[] {
  const rows = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  return rows.map(rowToRecord);
}

export function getInquiryById(id: string): InquiryRecord | null {
  const row = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id);
  return row ? rowToRecord(row) : null;
}

export function deleteInquiry(id: string): InquiryRecord | null {
  const record = getInquiryById(id);
  if (!record) return null;
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(id);
  return record;
}

export function getInquiryCount(): number {
  const row = db.prepare('SELECT COUNT(*) AS count FROM inquiries').get() as { count: number };
  return row.count;
}

export default db;
