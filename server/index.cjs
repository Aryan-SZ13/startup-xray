const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 4000;

// Simple, zero-dependency Node HTTP Backend API Service
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health endpoint
  if (pathname === '/api/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ONLINE',
      service: 'Startup X-Ray Intelligence API',
      version: '2.4.0',
      uptimeSec: Math.round(process.uptime()),
      vectorEntitiesIndexed: 536,
      connectedSources: [
        'SEC_EDGAR_REALTIME',
        'MCA_CORPORATE_REGISTRY',
        'PATENT_GAZETTE_STREAM',
        'TALENT_FLOW_GRAPH',
        'VENTURE_SYNDICATION_FEED'
      ],
      capabilities: {
        vectorSearch: true,
        ragAnalyst: true,
        mlSignalRanking: true,
        recommendationEngine: true
      }
    }));
    return;
  }

  // Real-time SSE stream endpoint
  if (pathname === '/api/realtime/stream' && method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    sendEvent({ type: 'CONNECTED', message: 'Startup X-Ray Real-time Stream Connected', timestamp: new Date().toISOString() });

    const interval = setInterval(() => {
      sendEvent({
        type: 'SIGNAL',
        id: `sig_${Date.now()}`,
        source: 'SEC_EDGAR',
        headline: 'Form D Filing: Growth tranche registered with accredited institutional syndicate',
        timestamp: 'Just now',
        confidence: 'HIGH'
      });
    }, 12000);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
    return;
  }

  // 404 for other endpoints
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
});

server.listen(PORT, () => {
  console.log(`[Startup X-Ray Intelligence Server] Running on http://localhost:${PORT}`);
});
