import type { VercelRequest, VercelResponse } from 'vercel';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, source = 'unknown' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const message = `🧠 MUNDO\n\n${text}\n\nsource: ${source}`;

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message
    }),
  });

  return res.json({ ok: true });
}