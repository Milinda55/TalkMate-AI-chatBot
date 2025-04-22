export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only handle POST requests
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

        console.log("Forwarding to HuggingFace:", userMessage);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        // Handle HuggingFace specific response
        const data = await response.json();
        console.log("HuggingFace Response:", data);

        if (!response.ok) {
            console.error("HuggingFace Error:", data);
            return res.status(500).json({
                error: 'AI service error',
                details: data.error || data
            });
        }

        if (!Array.isArray(data) || !data[0]?.generated_text) {
            console.error("Unexpected Response Format:", data);
            return res.status(500).json({
                error: 'Unexpected response format from AI'
            });
        }

        return res.status(200).json({
            generated_text: data[0].generated_text
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}