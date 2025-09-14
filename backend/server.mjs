import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/image-proxy', async (req, res) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ error: 'URL required' });
        }

        console.log('Fetching:', url);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)',
            },
            timeout: 10000
        });

        if (!response.ok) {
            return res.status(response.status).json({ 
                error: `Failed to fetch: ${response.statusText}` 
            });
        }

        res.set({
            'Content-Type': response.headers.get('content-type') || 'image/jpeg',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*'
        });

        response.body.pipe(res);

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Image proxy server running on http://localhost:${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/image-proxy?url=<image-url>`);
});