import https from 'https';
import http from 'http';

const proxyCloudinary = (req, res) => {

    let path = req.params?.path;
    if (!path) {

        const orig = req.originalUrl || req.url || '';

        const withoutQuery = orig.split('?')[0];

        const idx = withoutQuery.indexOf('/cloudinary');
        path = idx >= 0 ? withoutQuery.slice(idx + '/cloudinary'.length) : withoutQuery;

        if (path.startsWith('/')) path = path.slice(1);
    }
    if (!path) return res.status(400).send('Missing resource path');


    const target = `https://res.cloudinary.com/${path}`;


    const client = target.startsWith('https') ? https : http;

    const request = client.get(target, (proxyRes) => {

        res.statusCode = proxyRes.statusCode || 200;
        Object.entries(proxyRes.headers || {}).forEach(([k, v]) => {
            // Avoid setting hop-by-hop headers that might conflict
            if (k.toLowerCase() === 'transfer-encoding') return;
            if (k.toLowerCase() === 'content-encoding') return;
            res.setHeader(k, v);
        });
        proxyRes.pipe(res);
    });

    request.on('error', (err) => {
        console.error('Cloudinary proxy error:', err);
        if (!res.headersSent) res.status(502).send('Bad gateway');
    });
};

export default proxyCloudinary;
