export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { userMessage } = req.body;

        if (!userMessage || typeof userMessage !== 'string') {
            return res.status(400).json({ error: 'Invalid input: userMessage is required' });
        }

        const API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
        const API_KEY = process.env.HUGGINGFACE_API_KEY;

        if (!API_KEY) {
            console.error('HuggingFace API key is missing');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('HuggingFace API error:', errorData);
            return res.status(response.status).json({
                error: 'AI service error',
                details: errorData.error || errorData
            });
        }

        const data = await response.json();

        if (!data || !Array.isArray(data) || data.length === 0 || !data[0].generated_text) {
            return res.status(500).json({ error: 'Unexpected response format from AI service' });
        }

        return res.status(200).json({
            generated_text: data[0].generated_text
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}