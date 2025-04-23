export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    console.log('Environment check - API key exists:', !!process.env.HUGGINGFACE_API_KEY);
    console.log('API key length:', process.env.HUGGINGFACE_API_KEY ? process.env.HUGGINGFACE_API_KEY.length : 0);

    const API_KEY = process.env.HUGGINGFACE_API_KEY || '';

    if (!API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: 'Message required' });
        }

        console.log('Processing message:', userMessage);

        const response = await fetch(
            'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputs: userMessage }),
                // Adding timeout for the fetch request
                signal: AbortSignal.timeout(20000)
            }
        ).catch(err => {
            console.error('Fetch error:', err.message);
            throw new Error(`Fetch to Hugging Face failed: ${err.message}`);
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'No error details');
            console.error('HF API error:', response.status, errorText);
            return res.status(response.status).json({
                error: `HuggingFace API error: ${response.status}`,
                details: errorText
            });
        }

        const data = await response.json();

        return res.status(200).json({
            generated_text: data[0]?.generated_text || "No response from AI"
        });

    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}