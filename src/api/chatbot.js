export default async function handler(req, res) {
    // Set CORS headers to allow requests from localhost (development environment)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // If it's a preflight OPTIONS request, respond with a 200 status
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only handle POST requests (your frontend sends POST requests)
    if (req.method === 'POST') {
        const { userMessage } = req.body;

        // Your logic to handle the API call goes here
        const API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
        const API_KEY = process.env.HUGGINGFACE_API_KEY;


        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: userMessage })
            });

            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const generatedText = data[0].generated_text;
                return res.status(200).json({ generated_text: generatedText });
            } else {
                return res.status(500).json({ error: 'Failed to generate response' });
            }

        } catch (error) {
            console.error('Error fetching AI response:', error);
            return res.status(500).json({ error: 'Oops! Something went wrong. Please try again.' });
        }
    }

    // Handle other request types (GET, PUT, etc.) if needed
    return res.status(405).json({ error: 'Method Not Allowed' });
}
