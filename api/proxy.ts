import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const target = req.query.url as string;

    if (!target) {
        res.status(400).json({ error: "URL required" });
        return;
    }

    try {
        const response = await fetch(target, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; ImageProxy/1.0)",
            },
        });

        if (!response.ok) {
            res.status(response.status).json({ error: `Failed to fetch: ${response.statusText}` });
            return;
        }

        res.setHeader("Content-Type", response.headers.get("content-type") ?? "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Access-Control-Allow-Origin", "*");

        const arrayBuffer = await response.arrayBuffer();
        res.end(Buffer.from(arrayBuffer));
    } catch (error) {
        res.status(500).json({ error: "Proxy error: " + (error as Error).message });
    }
}