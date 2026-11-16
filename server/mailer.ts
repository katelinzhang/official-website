import nodemailer from 'nodemailer';

interface InquiryEmailData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  productInterest?: string;
  message?: string;
  photoUrls: string[];
  inquiryId: string;
}

export async function sendInquiryNotification(data: InquiryEmailData): Promise<boolean> {
  const to = process.env.NOTIFY_EMAIL || 'info@quarkdairy.cn';

  // Skip if SMTP not configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Mailer] SMTP not configured — skipping email notification');
    return false;
  }

  // Create transporter lazily so .env values are already loaded
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.qq.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  const photoList = data.photoUrls.length > 0
    ? data.photoUrls.map((url, i) => `  ${i + 1}. ${url}`).join('\n')
    : '  (none)';

  const html = `
    <h2>New Inquiry #${data.inquiryId}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${data.company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Product Interest</td><td style="padding:8px;border:1px solid #ddd">${data.productInterest || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Photos</td><td style="padding:8px;border:1px solid #ddd"><pre style="margin:0;white-space:pre-wrap">${photoList}</pre></td></tr>
    </table>
    <p style="color:#999;font-size:12px">Received at ${new Date().toISOString()}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `[Quark Dairy] New Inquiry from ${data.company} — #${data.inquiryId}`,
      html,
    });
    console.log(`[Mailer] Notification sent to ${to} for inquiry #${data.inquiryId}`);
    return true;
  } catch (error: any) {
    console.error('[Mailer] Failed to send email:', error.message);
    return false;
  }
}
