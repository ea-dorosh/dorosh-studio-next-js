import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const headersIn = request.headers;
    const xff = headersIn.get(`x-forwarded-for`);
    const xri = headersIn.get(`x-real-ip`);
    const cfc = headersIn.get(`cf-connecting-ip`);
    const ua = headersIn.get(`user-agent`);
    const ref = headersIn.get(`referer`);

    // Debug logs
    console.log(`QR DEBUG API: incoming headers`, {
      xff, xri, cfc, ua, ref,
    });

    // Prefer local backend to avoid external proxy issues
    const base = `http://127.0.0.1:3500/`;
    const targetUrl = `${base}api/public/tracking/qr-scan`;
    console.log(`QR DEBUG API: proxy to`, targetUrl);

    const res = await fetch(targetUrl, {
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
        trackedAt: body?.trackedAt || new Date().toISOString(),
        source: `server-side`,
      }),
      cache: `no-store`,
    });

    let responseText = ``;
    try { responseText = await res.text(); } catch (error) {
      console.error(`QR DEBUG API: error`, error);
    }
    console.log(`QR DEBUG API: backend response`, {
      status: res.status, ok: res.ok, body: responseText?.slice(0, 300),
    });

    if (!res.ok) {
      return NextResponse.json({
        error: `Upstream error`, upstreamStatus: res.status, body: responseText,
      }, { status: 502 });
    }

    return NextResponse.json({ message: `proxied ok` }, { status: 200 });
  } catch (error) {
    console.error(`QR DEBUG API: error`, error);
    return NextResponse.json({ error: `Proxy failed` }, { status: 500 });
  }
}