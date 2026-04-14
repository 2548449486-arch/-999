const OR_KEY = process.env.OR_KEY || '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';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  try {
    const { messages, model, max_tokens } = req.body;
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OR_KEY}`,
        'HTTP-Referer': 'https://viral.zenithsmart.xin',
        'X-Title': 'AI Viral Factory'
      },
      body: JSON.stringify({
        model: model || 'google/gemini-flash-1.5',
        messages,
        max_tokens: max_tokens || 1400
      })
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
}
