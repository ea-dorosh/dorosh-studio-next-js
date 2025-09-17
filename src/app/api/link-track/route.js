import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const channel = searchParams.get(`channel`) || `unknown`;
    const target = searchParams.get(`target`) || `/booking`;

    const headersIn = request.headers;
    const xff = headersIn.get(`x-forwarded-for`);
    const xri = headersIn.get(`x-real-ip`);
    const cfc = headersIn.get(`cf-connecting-ip`);
    const ua = headersIn.get(`user-agent`);
    const ref = headersIn.get(`referer`);

    // Try local backend first (works in prod if Next and API are co-located)
    const tryPost = async (baseUrl) => {
      const targetUrl = `${baseUrl.replace(/\/$/, ``)}/api/public/tracking/link-click`;
      return fetch(targetUrl, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
          ...(ua ? { 'user-agent': ua } : {}),
          ...(ref ? { referer: ref } : {}),
          ...(xff ? { 'x-forwarded-for': xff } : {}),
          ...(xri ? { 'x-real-ip': xri } : {}),
          ...(cfc ? { 'cf-connecting-ip': cfc } : {}),
        },
        body: JSON.stringify({
          linkedAt: new Date().toISOString(),
          channel,
          target,
        }),
        cache: `no-store`,
      });
    };

    // Try local backend first (works if Next and API are co-located)
    let res = null;
    try {
      res = await tryPost(`http://127.0.0.1:3500`);
    } catch (_) {
      // Ignore
    }

    // Fallback to explicit SERVER_API_URL in production if provided
    if (!res || !res.ok) {
      const isProd = process.env.NODE_ENV === `production`;
      if (isProd && process.env.SERVER_API_URL) {
        res = await tryPost(process.env.SERVER_API_URL);
      }
    }

    if (!res || !res.ok) {
      return NextResponse.json({ error: `Upstream error` }, { status: 502 });
    }

    return NextResponse.json({ message: `link click logged` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Proxy failed` }, { status: 500 });
  }
}


