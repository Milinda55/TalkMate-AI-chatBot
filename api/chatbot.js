export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { userMessage } = req.body;
        if (!userMessage || typeof userMessage !== 'string') {
            return res.status(400).json({ error: 'Invalid message format' });
        }

        const API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
        const API_KEY = process.env.HUGGINGFACE_API_KEY;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();

        if (!response.ok || !data[0]?.generated_text) {
            return res.status(500).json({ error: 'AI response failed', details: data });
        }

        return res.status(200).json({ generated_text: data[0].generated_text });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
